package org.egov.pt.repository.builder;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.egov.common.utils.MultiStateInstanceUtil;
import org.egov.pt.config.PropertyConfiguration;
import org.egov.pt.models.PropertyCriteria;
import org.egov.pt.models.enums.Status;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

@Component
public class PropertyQueryBuilder {
	
	@Autowired
	private MultiStateInstanceUtil centralInstanceUtil;
	
	@Autowired
	private PropertyConfiguration config;
	
	private static final String SELECT = "SELECT ";
	private static final String INNER_JOIN = "INNER JOIN";
	private static final String LEFT_JOIN  =  "LEFT OUTER JOIN";
	
	private static String PROEPRTY_AUDIT_QUERY = "select property from {schema}.eg_pt_property_audit where propertyid=?";

	private static String PROEPRTY_ID_QUERY = "select propertyid from {schema}.eg_pt_property where id in (select propertyid from {schema}.eg_pt_owner where userid IN {replace} AND status='ACTIVE')";

	private static String REPLACE_STRING = "{replace}";
	
	private static String WITH_CLAUSE_QUERY = " WITH propertyresult AS ({replace}) SELECT * FROM propertyresult "
											+ "INNER JOIN (SELECT propertyid, min(statusorder) as minorder FROM propertyresult GROUP BY propertyid) as minresult "
											+ "ON minresult.propertyid=propertyresult.propertyid AND minresult.minorder=propertyresult.statusorder";
	

	 // Select query
	
	private static String propertySelectValues = "property.id as pid, property.propertyid, property.tenantid as ptenantid, surveyid, accountid, oldpropertyid, property.status as propertystatus, acknowldgementnumber, propertytype, ownershipcategory,property.usagecategory as pusagecategory, creationreason, nooffloors, landarea, property.superbuiltuparea as propertysbpa, linkedproperties, source, channel, property.createdby as pcreatedby, property.lastmodifiedby as plastmodifiedby, property.createdtime as pcreatedtime,"
			+ " property.lastmodifiedtime as plastmodifiedtime, property.additionaldetails as padditionaldetails, (CASE WHEN property.status='ACTIVE' then 0 WHEN property.status='INWORKFLOW' then 1 WHEN property.status='INACTIVE' then 2 ELSE 3 END) as statusorder, ";

	private static String addressSelectValues = "address.tenantid as adresstenantid, address.id as addressid, address.propertyid as addresspid, latitude, longitude, doorno, plotno, buildingname, street, landmark, city, pincode, locality, district, region, state, country, address.createdby as addresscreatedby, address.lastmodifiedby as addresslastmodifiedby, address.createdtime as addresscreatedtime, address.lastmodifiedtime as addresslastmodifiedtime, address.additionaldetails as addressadditionaldetails, ward, colony, " ;

	private static String institutionSelectValues = "institution.id as institutionid,institution.propertyid as institutionpid, institution.tenantid as institutiontenantid, institution.name as institutionname, institution.type as institutiontype, designation, nameofauthorizedperson, institution.createdby as institutioncreatedby, institution.lastmodifiedby as institutionlastmodifiedby, institution.createdtime as institutioncreatedtime, institution.lastmodifiedtime as institutionlastmodifiedtime, ";

	private static String propertyDocSelectValues = "pdoc.id as pdocid, pdoc.tenantid as pdoctenantid, pdoc.entityid as pdocentityid, pdoc.documenttype as pdoctype, pdoc.filestoreid as pdocfilestore, pdoc.documentuid as pdocuid, pdoc.status as pdocstatus, ";

	private static String ownerSelectValues = "owner.tenantid as owntenantid, ownerInfoUuid, owner.propertyid as ownpropertyid, userid, owner.status as ownstatus, isprimaryowner, ownertype, ownershippercentage, owner.institutionid as owninstitutionid, relationship, owner.createdby as owncreatedby, owner.createdtime as owncreatedtime,owner.lastmodifiedby as ownlastmodifiedby, owner.lastmodifiedtime as ownlastmodifiedtime, ";

	private static String ownerDocSelectValues = " owndoc.id as owndocid, owndoc.tenantid as owndoctenantid, owndoc.entityid as owndocentityId, owndoc.documenttype as owndoctype, owndoc.filestoreid as owndocfilestore, owndoc.documentuid as owndocuid, owndoc.status as owndocstatus, ";
	
	private static String UnitSelectValues = "unit.id as unitid, unit.tenantid as unittenantid, unit.propertyid as unitpid, floorno, unittype, unit.usagecategory as unitusagecategory, occupancytype, occupancydate, carpetarea, builtuparea, plintharea, unit.superbuiltuparea as unitspba, arv, constructiontype, constructiondate, dimensions, unit.active as isunitactive, unit.createdby as unitcreatedby, unit.createdtime as unitcreatedtime, unit.lastmodifiedby as unitlastmodifiedby, unit.lastmodifiedtime as unitlastmodifiedtime, ratezone, roadfactor, fromdate, todate ";

	private static final String TOTAL_APPLICATIONS_COUNT_QUERY = "select count(*) from eg_pt_property where tenantid = '{}';";
	
	private static final String QUERY = SELECT 
			
			+	propertySelectValues    
			
			+   addressSelectValues     
			
			+   institutionSelectValues 
			
			+   propertyDocSelectValues
			
			+   ownerSelectValues 
			
			+   ownerDocSelectValues  
			
			+   UnitSelectValues
			
			+   " FROM {schema}.eg_pt_PROPERTY property " 
			
			+   INNER_JOIN +  " {schema}.eg_pt_ADDRESS address         ON property.id = address.propertyid " 
			
			+   LEFT_JOIN  +  " {schema}.eg_pt_INSTITUTION institution ON property.id = institution.propertyid " 
			
			+   LEFT_JOIN  +  " {schema}.eg_pt_DOCUMENT pdoc           ON property.id = pdoc.entityid "
			
			+   INNER_JOIN +  " {schema}.eg_pt_OWNER owner             ON property.id = owner.propertyid " 
			
			+   LEFT_JOIN  +  " {schema}.eg_pt_DOCUMENT owndoc         ON owner.ownerinfouuid = owndoc.entityid "
			
			+	LEFT_JOIN  +  " {schema}.eg_pt_UNIT unit		       ON property.id =  unit.propertyid ";

	private static final String ID_QUERY = SELECT

			+   " property.id FROM {schema}.eg_pt_PROPERTY property "

			+   INNER_JOIN +  " {schema}.eg_pt_ADDRESS address         ON property.id = address.propertyid "

			+   LEFT_JOIN  +  " {schema}.eg_pt_INSTITUTION institution ON property.id = institution.propertyid "

			+   LEFT_JOIN  +  " {schema}.eg_pt_DOCUMENT pdoc           ON property.id = pdoc.entityid "

			+   INNER_JOIN +  " {schema}.eg_pt_OWNER owner             ON property.id = owner.propertyid "

			+   LEFT_JOIN  +  " {schema}.eg_pt_DOCUMENT owndoc         ON owner.ownerinfouuid = owndoc.entityid "

			+	LEFT_JOIN  +  " {schema}.eg_pt_UNIT unit		          ON property.id =  unit.propertyid ";
	
	private static final String COUNT_QUERY = SELECT

			+   " count(distinct property.id) FROM EG_PT_PROPERTY property "

			+   INNER_JOIN +  " EG_PT_ADDRESS address         ON property.id = address.propertyid "

			+   LEFT_JOIN  +  " EG_PT_INSTITUTION institution ON property.id = institution.propertyid "

			+   LEFT_JOIN  +  " EG_PT_DOCUMENT pdoc           ON property.id = pdoc.entityid "

			+   INNER_JOIN +  " EG_PT_OWNER owner             ON property.id = owner.propertyid "

			+   LEFT_JOIN  +  " EG_PT_DOCUMENT owndoc         ON owner.ownerinfouuid = owndoc.entityid "

			+	LEFT_JOIN  +  " EG_PT_UNIT unit		          ON property.id =  unit.propertyid ";
	

	private final String paginationWrapper = "SELECT * FROM "
			+ "(SELECT *, DENSE_RANK() OVER (ORDER BY plastmodifiedtime DESC, pid) offset_ FROM " + "({})" + " result) result_offset "
			+ "WHERE offset_ > ? AND offset_ <= ?";

	private String addPaginationWrapper(String query, List<Object> preparedStmtList, PropertyCriteria criteria) {
		
		
		Long limit = config.getDefaultLimit();
		Long offset = config.getDefaultOffset();
		String finalQuery = paginationWrapper.replace("{}", query);

		if (criteria.getLimit() != null && criteria.getLimit() <= config.getMaxSearchLimit())
			limit = criteria.getLimit();

		if (criteria.getLimit() != null && criteria.getLimit() > config.getMaxSearchLimit())
			limit = config.getMaxSearchLimit();

		if (criteria.getOffset() != null)
			offset = criteria.getOffset();

		preparedStmtList.add(offset);
		preparedStmtList.add(limit + offset);

		return finalQuery;
	}

	/**
	 * 
	 * @param criteria
	 * @param preparedStmtList
	 * @return
	 */
	public String getPropertySearchQuery(PropertyCriteria criteria, List<Object> preparedStmtList,Boolean isPlainSearch, Boolean onlyIds) {

		Boolean isEmpty = CollectionUtils.isEmpty(criteria.getPropertyIds())
					&& CollectionUtils.isEmpty(criteria.getAcknowledgementIds())
					&& CollectionUtils.isEmpty(criteria.getOldpropertyids())
					&& CollectionUtils.isEmpty(criteria.getUuids())
					&& null == criteria.getMobileNumber()
					&& null == criteria.getName()
					&& null == criteria.getDoorNo()
					&& null == criteria.getOldPropertyId()
					&& (null == criteria.getFromDate() && null == criteria.getToDate())
					&& CollectionUtils.isEmpty(criteria.getCreationReason());
		
		if(isEmpty)
			throw new CustomException("EG_PT_SEARCH_ERROR"," No criteria given for the property search");

		String tenantId = criteria.getTenantId();
		StringBuilder builder;

		if (onlyIds)
			builder = new StringBuilder(ID_QUERY);
		
		else if (criteria.getIsRequestForCount()) {
			builder = new StringBuilder(COUNT_QUERY);
			
		} else
			builder = new StringBuilder(QUERY);

		if (isPlainSearch) {

			Set<String> tenantIds = criteria.getTenantIds();
			if (!CollectionUtils.isEmpty(tenantIds)) {
				addClauseIfRequired(preparedStmtList, builder);
				builder.append("property.tenantid IN (").append(createQuery(tenantIds)).append(")");
				addToPreparedStatement(preparedStmtList, tenantIds);
			}
		} else if (tenantId != null) {
			appendTenantIdToQuery(preparedStmtList, tenantId, builder, "property");
		}

		if (criteria.getFromDate() != null)
		{
			addClauseIfRequired(preparedStmtList,builder);
			// If user does NOT specify toDate, take today's date as the toDate by default
			if (criteria.getToDate() == null)
			{
				criteria.setToDate(Instant.now().toEpochMilli());
			}
			builder.append("property.createdTime BETWEEN ? AND ?");
			preparedStmtList.add(criteria.getFromDate());
			preparedStmtList.add(criteria.getToDate());
		}
		else
		{
			if(criteria.getToDate()!=null)
			{
				throw new CustomException("INVALID SEARCH", "From Date should be mentioned first");
			}
		}

		Set<String> statusStringList = new HashSet<>();
		if (!CollectionUtils.isEmpty(criteria.getStatus())) {
			criteria.getStatus().forEach(status -> {
				statusStringList.add(status.toString());
			});
			addClauseIfRequired(preparedStmtList,builder);
			builder.append(" property.status IN ( ")
				.append(createQuery(statusStringList))
				.append(" )");
			addToPreparedStatement(preparedStmtList, statusStringList);
		}

		Set<String> creationReasonsList = criteria.getCreationReason();
		if(!CollectionUtils.isEmpty(creationReasonsList)){
			addClauseIfRequired(preparedStmtList, builder);
			builder.append("property.creationreason IN ( ").append(createQuery(creationReasonsList)).append(" )");
			addToPreparedStatement(preparedStmtList, creationReasonsList);
		}
		
		if (null != criteria.getLocality()) {

			addClauseIfRequired(preparedStmtList,builder);
			builder.append("address.locality = ?");
			preparedStmtList.add(criteria.getLocality());
		}

		Set<String> propertyIds = criteria.getPropertyIds();
		if (!CollectionUtils.isEmpty(propertyIds)) {

			addClauseIfRequired(preparedStmtList,builder);
			builder.append("property.propertyid IN (").append(createQuery(propertyIds)).append(")");
			addToPreparedStatementWithUpperCase(preparedStmtList, propertyIds);
		}
		
		Set<String> acknowledgementIds = criteria.getAcknowledgementIds();
		if (!CollectionUtils.isEmpty(acknowledgementIds)) {

			addClauseIfRequired(preparedStmtList,builder);
			builder.append("property.acknowldgementnumber IN (").append(createQuery(acknowledgementIds)).append(")");
			addToPreparedStatementWithUpperCase(preparedStmtList, acknowledgementIds);
		}
		
		Set<String> uuids = criteria.getUuids();
		if (!CollectionUtils.isEmpty(uuids)) {

			addClauseIfRequired(preparedStmtList,builder);
			builder.append("property.id IN (").append(createQuery(uuids)).append(")");
			addToPreparedStatement(preparedStmtList, uuids);
		}

		Set<String> oldpropertyids = criteria.getOldpropertyids();
		if (!CollectionUtils.isEmpty(oldpropertyids)) {

			addClauseIfRequired(preparedStmtList,builder);
			builder.append("property.oldpropertyid IN (").append(createQuery(oldpropertyids)).append(")");
			addToPreparedStatement(preparedStmtList, oldpropertyids);
		}
		
		/* 
		 * Condition to evaluate if owner is active.
		 * Inactive owners should never be shown in results
		*/
		
		addClauseIfRequired(preparedStmtList,builder);
		builder.append("owner.status = ?");
		preparedStmtList.add(Status.ACTIVE.toString());
		

		String withClauseQuery = WITH_CLAUSE_QUERY.replace(REPLACE_STRING, builder);
		if (onlyIds || criteria.getIsRequestForCount())
			return builder.toString();
		else 
			return addPaginationWrapper(withClauseQuery, preparedStmtList, criteria);
	}

	private void appendTenantIdToQuery(List<Object> preparedStmtList, String tenantId, StringBuilder builder, String tableName) {

		if (centralInstanceUtil.isTenantIdStateLevel(tenantId)) {

			addClauseIfRequired(preparedStmtList, builder);
			if (!StringUtils.isEmpty(tableName))
				builder.append(tableName).append(".");
			builder.append(" tenantId LIKE ? ");
			preparedStmtList.add(tenantId + '%');
		} else {

			addClauseIfRequired(preparedStmtList, builder);
			if (!StringUtils.isEmpty(tableName))
				builder.append(tableName).append(".");
			builder.append(" tenantId= ? ");
			preparedStmtList.add(tenantId);
		}
	}


	public String getPropertyQueryForBulkSearch(PropertyCriteria criteria, List<Object> preparedStmtList,Boolean isPlainSearch) {

		Boolean isEmpty = CollectionUtils.isEmpty(criteria.getPropertyIds())
				&& CollectionUtils.isEmpty(criteria.getUuids());

		if(isEmpty)
			throw new CustomException("EG_PT_SEARCH_ERROR"," No propertyid or uuid given for the property Bulk search");

		StringBuilder builder = new StringBuilder(QUERY);

		if (isPlainSearch) {
			Set<String> tenantIds = criteria.getTenantIds();
			if (!CollectionUtils.isEmpty(tenantIds)) {
				addClauseIfRequired(preparedStmtList, builder);
				builder.append("property.tenantid IN (").append(createQuery(tenantIds)).append(")");
				addToPreparedStatement(preparedStmtList, tenantIds);
			}
		} else if (criteria.getTenantId() != null) {
			appendTenantIdToQuery(preparedStmtList, criteria.getTenantId(), builder, "property");
		}

		if (criteria.getFromDate() != null) {
			
			addClauseIfRequired(preparedStmtList, builder);
			/*
			 * If user does NOT specify toDate, take today's date as the toDate by default
			 */
			if (criteria.getToDate() == null)
				criteria.setToDate(Instant.now().toEpochMilli());
			builder.append("property.createdTime BETWEEN ? AND ?");
			preparedStmtList.add(criteria.getFromDate());
			preparedStmtList.add(criteria.getToDate());
		} else if (criteria.getToDate() != null) {
			throw new CustomException("INVALID SEARCH", "From Date should be mentioned first");
		}

		Set<String> propertyIds = criteria.getPropertyIds();
		if (!CollectionUtils.isEmpty(propertyIds)) {
			addClauseIfRequired(preparedStmtList,builder);
			builder.append("property.propertyid IN (").append(createQuery(propertyIds)).append(")");
			addToPreparedStatementWithUpperCase(preparedStmtList, propertyIds);
		}

		Set<String> uuids = criteria.getUuids();
		if (!CollectionUtils.isEmpty(uuids)) {

			addClauseIfRequired(preparedStmtList,builder);
			builder.append("property.id IN (").append(createQuery(uuids)).append(")");
			addToPreparedStatement(preparedStmtList, uuids);
		}
		return addPaginationWrapper(builder.toString(), preparedStmtList, criteria);
	}

	public String getPropertyIdsQuery(Set<String> ownerIds, String tenantId, List<Object> preparedStmtList) {

		StringBuilder query = new StringBuilder("(");
		query.append(createQuery(ownerIds));
		addToPreparedStatement(preparedStmtList, ownerIds);
		query.append(")");

		StringBuilder propertyIdQuery = new StringBuilder(PROEPRTY_ID_QUERY.replace(REPLACE_STRING, query));
		appendTenantIdToQuery(preparedStmtList, tenantId, propertyIdQuery, "");
		return propertyIdQuery.toString();
	}

	private String createQuery(Set<String> ids) {
		StringBuilder builder = new StringBuilder();
		int length = ids.size();
		for (int i = 0; i < length; i++) {
			builder.append(" ?");
			if (i != length - 1)
				builder.append(",");
		}
		return builder.toString();
	}

	private void addToPreparedStatement(List<Object> preparedStmtList, Set<String> ids) {
		ids.forEach(id -> {
			preparedStmtList.add(id);
		});
	}
	
	private void addToPreparedStatementWithUpperCase(List<Object> preparedStmtList, Set<String> ids) {
		ids.forEach(id -> {
			preparedStmtList.add(id.toUpperCase());
		});
	}

	private static void addClauseIfRequired(List<Object> values,StringBuilder queryString) {
		if (values.isEmpty())
			queryString.append(" WHERE ");
		else {
			queryString.append(" AND ");
		}
	}

	public String getpropertyAuditQuery() {
		return PROEPRTY_AUDIT_QUERY;
	}
	
    public String getTotalApplicationsCountQueryString(PropertyCriteria criteria) {
		return TOTAL_APPLICATIONS_COUNT_QUERY.replace("{}",criteria.getTenantId());
    }
}
