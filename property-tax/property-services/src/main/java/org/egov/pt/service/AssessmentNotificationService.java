package org.egov.pt.service;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import org.apache.http.client.utils.URIBuilder;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.utils.MultiStateInstanceUtil;
import org.egov.pt.config.PropertyConfiguration;
import org.egov.pt.models.Assessment;
import org.egov.pt.models.Property;
import org.egov.pt.models.PropertyCriteria;
import org.egov.pt.models.Assessment.Source;
import org.egov.pt.models.collection.BillResponse;
import org.egov.pt.models.enums.Channel;
import org.egov.pt.models.enums.Status;
import org.egov.pt.models.event.Event;
import org.egov.pt.models.event.EventRequest;
import org.egov.pt.models.workflow.ProcessInstance;
import org.egov.pt.repository.PropertyRepository;
import org.egov.pt.util.NotificationUtil;
import org.egov.pt.util.UnmaskingUtil;
import org.egov.pt.web.contracts.AssessmentRequest;
import org.egov.pt.web.contracts.EmailRequest;
import org.egov.pt.web.contracts.PropertyRequest;
import org.egov.pt.web.contracts.SMSRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import lombok.extern.slf4j.Slf4j;

import static org.egov.pt.util.PTConstants.*;

@Slf4j
@Component
public class AssessmentNotificationService {



    private NotificationUtil util;

    private PropertyService propertyService;

    private PropertyConfiguration config;
    
    private BillingService billingService;

    private MultiStateInstanceUtil centralInstanceUtil;

    private UnmaskingUtil unmaskingUtil;
    
    @Autowired
    private PropertyRepository propertyRepository;
    
    @Autowired
    AssessmentService assessmentService;

    @Autowired
    public AssessmentNotificationService(NotificationUtil util, PropertyService propertyService, PropertyConfiguration config,BillingService billingService, MultiStateInstanceUtil centralInstanceUtil, UnmaskingUtil unmaskingUtil) {

        this.util = util;
        this.propertyService = propertyService;
        this.config = config;
        this.billingService = billingService;
        this.centralInstanceUtil = centralInstanceUtil;
        this.unmaskingUtil = unmaskingUtil;
    }

    public void process(String topicName, AssessmentRequest assessmentRequest){

        RequestInfo requestInfo = assessmentRequest.getRequestInfo();
        Assessment assessment = assessmentRequest.getAssessment();
        String tenantId = assessment.getTenantId();

        PropertyCriteria criteria = PropertyCriteria.builder().tenantId(tenantId)
                                    .propertyIds(Collections.singleton(assessment.getPropertyId()))
                                    .isSearchInternal(Boolean.TRUE)
                                    .build();


        List<Property> properties = propertyService.searchProperty(criteria, requestInfo);

        if(CollectionUtils.isEmpty(properties))
            log.error("NO_PROPERTY_FOUND","No property found for the assessment: "+assessment.getPropertyId());

        Property property = properties.get(0);
        unmaskingUtil.getOwnerDetailsUnmasked(property,requestInfo);

        BillResponse billResponse = billingService.fetchBill(property, requestInfo);
        BigDecimal dueAmount = billResponse.getBill().get(0).getTotalAmount();

        List<String> configuredChannelNamesForAssessment =  util.fetchChannelList(new RequestInfo(), tenantId, PT_BUSINESSSERVICE, ACTION_FOR_ASSESSMENT);

        List<SMSRequest> smsRequests = enrichSMSRequest(topicName, assessmentRequest, property);
        if(configuredChannelNamesForAssessment.contains(CHANNEL_NAME_SMS)) {
            util.sendSMS(smsRequests, tenantId);
        }

        if(configuredChannelNamesForAssessment.contains(CHANNEL_NAME_EVENT)) {
            Boolean isActionReq = false;
            if (topicName.equalsIgnoreCase(config.getCreateAssessmentTopic()) && assessment.getWorkflow() == null)
                isActionReq = true;

            List<Event> events = util.enrichEvent(smsRequests, requestInfo, tenantId, property, isActionReq);
            util.sendEventNotification(new EventRequest(requestInfo, events), tenantId);
        }

        if(configuredChannelNamesForAssessment.contains(CHANNEL_NAME_EMAIL) ){
            List<EmailRequest> emailRequests = util.createEmailRequestFromSMSRequests(requestInfo,smsRequests,tenantId);
            util.sendEmail(emailRequests, tenantId);
        }

        if (dueAmount!=null && dueAmount.compareTo(BigDecimal.ZERO)>0) {

            List<String> configuredChannelNames =  util.fetchChannelList(new RequestInfo(), tenantId, PT_BUSINESSSERVICE, ACTION_FOR_DUES);
            List<SMSRequest> smsRequestsList = new ArrayList<>();
            enrichSMSRequestForDues(smsRequestsList, assessmentRequest, property);

            if(configuredChannelNames.contains(CHANNEL_NAME_SMS)) {
                util.sendSMS(smsRequestsList, tenantId);
            }

            if(configuredChannelNames.contains(CHANNEL_NAME_EVENT)) {
                Boolean isActionRequired = true;
                List<Event> eventsList = util.enrichEvent(smsRequestsList, requestInfo, tenantId, property, isActionRequired);
                util.sendEventNotification(new EventRequest(requestInfo, eventsList), tenantId);
            }

            if(configuredChannelNames.contains(CHANNEL_NAME_EMAIL) ){
                List<EmailRequest> emailRequests = util.createEmailRequestFromSMSRequests(requestInfo,smsRequests,tenantId);
                util.sendEmail(emailRequests, tenantId);
            }
            }

    }



    private void enrichSMSRequestForDues(List<SMSRequest> smsRequests, AssessmentRequest assessmentRequest,
			Property property) {
		
    	String tenantId = assessmentRequest.getAssessment().getTenantId();
    	String stateLevelTenantId = centralInstanceUtil.getStateLevelTenant(tenantId);
    	String localizationMessages = util.getLocalizationMessages(tenantId,assessmentRequest.getRequestInfo());
    	
    	String messageTemplate = util.getMessageTemplate(DUES_NOTIFICATION, localizationMessages);
    	
    	if(messageTemplate.contains(NOTIFICATION_PROPERTYID))
            messageTemplate = messageTemplate.replace(NOTIFICATION_PROPERTYID, property.getPropertyId());

        if(messageTemplate.contains(NOTIFICATION_FINANCIALYEAR))
            messageTemplate = messageTemplate.replace(NOTIFICATION_FINANCIALYEAR, assessmentRequest.getAssessment().getFinancialYear());
        
        if(messageTemplate.contains(NOTIFICATION_PAYMENT_LINK)){

            String UIHost = config.getUiAppHostMap().get(stateLevelTenantId);
            String paymentPath = config.getPayLinkSMS();
            paymentPath = paymentPath.replace("$consumercode",property.getPropertyId());
            paymentPath = paymentPath.replace("$tenantId",property.getTenantId());
            paymentPath = paymentPath.replace("$businessservice",PT_BUSINESSSERVICE);

            String finalPath = UIHost + paymentPath;

            messageTemplate = messageTemplate.replace(NOTIFICATION_PAYMENT_LINK,util.getShortenedUrl(finalPath));
        }
        
        Map<String,String > mobileNumberToOwner = new HashMap<>();
        property.getOwners().forEach(owner -> {
            if(owner.getMobileNumber()!=null)
                mobileNumberToOwner.put(owner.getMobileNumber(),owner.getName());
            if(owner.getAlternatemobilenumber() !=null && !owner.getAlternatemobilenumber().equalsIgnoreCase(owner.getMobileNumber()) ) {
            	mobileNumberToOwner.put(owner.getAlternatemobilenumber() ,owner.getName());
            }
        });
        
        List <SMSRequest> smsRequestsForDues = util.createSMSRequest(messageTemplate,mobileNumberToOwner);
        
        smsRequests.addAll(smsRequestsForDues);
    	
		
	}

	/**
     * Enriches the smsRequest with the customized messages
     * @param request The tradeLicenseRequest from kafka topic
     * @param smsRequests List of SMSRequets
     */
    private List<SMSRequest> enrichSMSRequest(String topicName, AssessmentRequest request, Property property){
    	
        String tenantId = request.getAssessment().getTenantId();
        String localizationMessages = util.getLocalizationMessages(tenantId,request.getRequestInfo());
        String message = getCustomizedMsg(topicName, request, property, localizationMessages);
        if(message==null)
            return Collections.emptyList();

        Map<String,String > mobileNumberToOwner = new HashMap<>();
        property.getOwners().forEach(owner -> {
            if(owner.getMobileNumber()!=null)
                mobileNumberToOwner.put(owner.getMobileNumber(),owner.getName());
            if(owner.getAlternatemobilenumber() !=null && !owner.getAlternatemobilenumber().equalsIgnoreCase(owner.getMobileNumber()) ) {
            	mobileNumberToOwner.put(owner.getAlternatemobilenumber() ,owner.getName());
            }
        });
        return util.createSMSRequest(message,mobileNumberToOwner);
    }


    /**
     *
     * @param topicName
     * @param request
     * @param property
     * @param localizationMessages
     * @return
     */
    private String getCustomizedMsg(String topicName, AssessmentRequest request, Property property, String localizationMessages){

        Assessment assessment = request.getAssessment();

        ProcessInstance processInstance = assessment.getWorkflow();

        String msgCode = null,messageTemplate = null;

        if(processInstance==null){

            if(topicName.equalsIgnoreCase(config.getCreateAssessmentTopic()))
                msgCode = NOTIFICATION_ASSESSMENT_CREATE;

            else msgCode = NOTIFICATION_ASSESSMENT_UPDATE;

            messageTemplate = customize(assessment, property, msgCode, localizationMessages);

        }
        else{
            msgCode = NOTIFICATION_ASMT_PREFIX + assessment.getWorkflow().getState().getState();
            messageTemplate = customize(assessment, property, msgCode, localizationMessages);
        }

        return messageTemplate;

    }


    /**
     * Replaces all place holders with values from assessment and property
     * @param assessment
     * @param property
     * @return
     */
    private String customize(Assessment assessment, Property property, String msgCode, String localizationMessages){

        String messageTemplate = util.getMessageTemplate(msgCode, localizationMessages);
        String stateLevelTenantId = centralInstanceUtil.getStateLevelTenant(property.getTenantId());

        if(messageTemplate.contains(NOTIFICATION_ASSESSMENTNUMBER))
            messageTemplate = messageTemplate.replace(NOTIFICATION_ASSESSMENTNUMBER, assessment.getAssessmentNumber());

        if(messageTemplate.contains(NOTIFICATION_STATUS)){
            String localizationCode = LOCALIZATION_ASMT_PREFIX + assessment.getWorkflow().getState().getState();
            String statusLocalization = util.getMessageTemplate(localizationCode, localizationMessages);
            messageTemplate = messageTemplate.replace(NOTIFICATION_STATUS, statusLocalization);
        }

        if(messageTemplate.contains(NOTIFICATION_PROPERTYID))
            messageTemplate = messageTemplate.replace(NOTIFICATION_PROPERTYID, property.getPropertyId());

        if(messageTemplate.contains(NOTIFICATION_FINANCIALYEAR))
            messageTemplate = messageTemplate.replace(NOTIFICATION_FINANCIALYEAR, assessment.getFinancialYear());

        if(messageTemplate.contains(NOTIFICATION_PAYMENT_LINK)){

            String UIHost = config.getUiAppHostMap().get(stateLevelTenantId);
            String paymentPath = config.getPayLinkSMS();
            paymentPath = paymentPath.replace("$consumercode",property.getPropertyId());
            paymentPath = paymentPath.replace("$tenantId",property.getTenantId());
            paymentPath = paymentPath.replace("$businessservice",PT_BUSINESSSERVICE);

            String finalPath = UIHost + paymentPath;

            messageTemplate = messageTemplate.replace(NOTIFICATION_PAYMENT_LINK,util.getShortenedUrl(finalPath));
        }

        return messageTemplate;
    }
    
    
 // Calling Create Assessment //
    public void callCreateAssessment(PropertyRequest request) {

        Property propertyFromRequest = request.getProperty();

        if (request.getProperty().getWorkflow() != null
                && "APPROVE".equals(request.getProperty().getWorkflow().getAction())) {

            int maxRetries = 5;
            int attempts = 0;
            boolean success = false;

            while (attempts < maxRetries) {
                attempts++;
                log.info("Attempt {} to validate property status ACTIVE", attempts);

                String propertyStatus = propertyRepository.getPropertyStatus(propertyFromRequest.getPropertyId());
                log.info("Status fetched from updated property : {}", propertyStatus);

                if (propertyStatus.equals("ACTIVE")) {
                    LocalDate today = LocalDate.now();
                    int year = today.getYear();
                    int month = today.getMonthValue();

                    String uri = "http://localhost:8080/property-services/assessment/_create";
                    log.info("Sending Request to : {}", uri);

                    Assessment assessment = new Assessment();
                    assessment.setTenantId(propertyFromRequest.getTenantId());
                    assessment.setPropertyId(propertyFromRequest.getPropertyId());
                    assessment.setFinancialYear((month >= 4 ? year : year - 1) + "-" + ((month >= 4 ? year + 1 : year) % 100));
                    assessment.setAssessmentDate(System.currentTimeMillis());
                    assessment.setSource(Source.MUNICIPAL_RECORDS);
                    assessment.setChannel(Channel.CFC_COUNTER);
                    assessment.setStatus(Status.ACTIVE);

                    AssessmentRequest assessementRequest = AssessmentRequest.builder()
                            .requestInfo(request.getRequestInfo())
                            .assessment(assessment)
                            .build();

                    log.info("AssessmentRequest: {}", assessementRequest);

                    Assessment assessmentResponse = assessmentService.createAssessment(assessementRequest);

                    if (assessmentResponse != null) {
                        log.info("Assessment done successfully :: {}", assessmentResponse);
                        success = true;
                        break;
                    }
                }
                // Small wait before retrying (optional, e.g., 2 seconds)
                try {
                    Thread.sleep(2000);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    throw new RuntimeException("Retry interrupted", e);
                }
            }

            if (!success) {
                throw new RuntimeException("Create assessment not executed after " + maxRetries + " attempts");
            }
        }
    }

}
