import { Header, MultiLink } from "@egovernments/digit-ui-react-components";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useLocation } from "react-router-dom";
//import ApplicationDetailsTemplate from "../../../../templates/ApplicationDetails";
import { newConfigMutate } from "../../config/Mutate/config";
import TransfererDetails from "../../pageComponents/Mutate/TransfererDetails";
//import MutationApplicationDetails from "./MutationApplicatinDetails";
//import getPTAcknowledgementData from "../../getPTAcknowledgementData";


const SuccessApplications = () => {
    const { t } = useTranslation();
    const { data: storeData } = Digit.Hooks.useStore.getInitData();
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const { tenants } = storeData || {};
    const { id: propertyId } = useParams();
    const location = useLocation();

    const { data } = location.state;
    console.log("workflowActdataion", data)
    const [showToast, setShowToast] = useState(null);
    const [appDetailsToShow, setAppDetailsToShow] = useState({});
    const [showOptions, setShowOptions] = useState(false);
    const [enableAudit, setEnableAudit] = useState(false);
    const [businessService, setBusinessService] = useState("PT.CREATE");
    sessionStorage.setItem("applicationNoinAppDetails", propertyId);

    const { isLoading, isError, data: applicationDetails, error } = Digit.Hooks.pt.useApplicationDetail(t, tenantId, propertyId);

    const {
        isLoading: updatingApplication,
        isError: updateApplicationError,
        data: updateResponse,
        error: updateError,
        mutate,
    } = Digit.Hooks.pt.useApplicationActions(tenantId);

    let workflowDetails = Digit.Hooks.useWorkflowDetails({
        tenantId: applicationDetails?.tenantId || tenantId,
        id: applicationDetails?.applicationData?.acknowldgementNumber,
        moduleCode: businessService,
        role: "PT_CEMP",
    });

    const { isLoading: auditDataLoading, isError: isAuditError, data: auditData } = Digit.Hooks.pt.usePropertySearch(
        {
            tenantId,
            filters: { propertyIds: propertyId, audit: true },
        },
        { enabled: enableAudit, select: (data) => data.Properties?.filter((e) => e.status === "ACTIVE") }
    );

    const showTransfererDetails = React.useCallback(() => {
        if (
            auditData &&
            Object.keys(appDetailsToShow).length &&
            applicationDetails?.applicationData?.status !== "ACTIVE" &&
            applicationDetails?.applicationData?.creationReason === "MUTATION" &&
            !appDetailsToShow?.applicationDetails.find((e) => e.title === "PT_MUTATION_TRANSFEROR_DETAILS")
        ) {
            let applicationDetails = appDetailsToShow.applicationDetails?.filter((e) => e.title === "PT_OWNERSHIP_INFO_SUB_HEADER");
            let compConfig = newConfigMutate.reduce((acc, el) => [...acc, ...el.body], []).find((e) => e.component === "TransfererDetails");
            applicationDetails.unshift({
                title: "PT_MUTATION_TRANSFEROR_DETAILS",
                belowComponent: () => <TransfererDetails userType="employee" formData={{ originalData: auditData[0] }} config={compConfig} />,
            });
            setAppDetailsToShow({ ...appDetailsToShow, applicationDetails });
        }
    }, [setAppDetailsToShow, appDetailsToShow, auditData, applicationDetails, auditData, newConfigMutate]);

    const closeToast = () => {
        setShowToast(null);
    };

    useEffect(() => {
        if (applicationDetails) {
            setAppDetailsToShow(_.cloneDeep(applicationDetails));
            if (applicationDetails?.applicationData?.status !== "ACTIVE" && applicationDetails?.applicationData?.creationReason === "MUTATION") {
                setEnableAudit(true);
            }
        }
    }, [applicationDetails]);

    useEffect(() => {
        showTransfererDetails();
        if (appDetailsToShow?.applicationData?.status === "ACTIVE" && PT_CEMP && businessService == "PT.CREATE") {
            setBusinessService("PT.UPDATE");
        }
    }, [auditData, applicationDetails, appDetailsToShow]);

    useEffect(() => {
        if (workflowDetails?.data?.applicationBusinessService && !(workflowDetails?.data?.applicationBusinessService === "PT.CREATE" && businessService === "PT.UPDATE")) {
            setBusinessService(workflowDetails?.data?.applicationBusinessService);
        }
    }, [workflowDetails.data]);

    const PT_CEMP = Digit.UserService.hasAccess(["PT_CEMP"]) || false;

    if (appDetailsToShow?.applicationData?.status === "ACTIVE" && PT_CEMP) {
        workflowDetails = {
            ...workflowDetails,
            data: {
                ...workflowDetails?.data,
                actionState: {
                    nextActions: [
                        {
                            action: "VIEW_DETAILS",
                            redirectionUrl: {
                                pathname: `/digit-ui/employee/pt/property-details/${propertyId}`,
                            },
                            tenantId: Digit.ULBService.getStateId(),
                        },
                    ],
                },
            },
        };
    }

    if (
        PT_CEMP &&
        workflowDetails?.data?.actionState?.isStateUpdatable &&
        !workflowDetails?.data?.actionState?.nextActions?.find((e) => e.action === "UPDATE")
    ) {
        if (!workflowDetails?.data?.actionState?.nextActions) workflowDetails.data.actionState.nextActions = [];
        workflowDetails?.data?.actionState?.nextActions.push({
            action: "UPDATE",
            redirectionUrl: {
                pathname: `/digit-ui/employee/pt/modify-application/${propertyId}`,
                state: { workflow: { action: "REOPEN", moduleName: "PT", businessService } },
            },
            tenantId: Digit.ULBService.getStateId(),
        });
    }

    if (!(appDetailsToShow?.applicationDetails?.[0]?.values?.[0].title === "PT_PROPERTY_APPLICATION_NO")) {
        appDetailsToShow?.applicationDetails?.unshift({
            values: [
                { title: "PT_PROPERTY_APPLICATION_NO", value: appDetailsToShow?.applicationData?.acknowldgementNumber },
                { title: "PT_SEARCHPROPERTY_TABEL_PTUID", value: appDetailsToShow?.applicationData?.propertyId },
                { title: "ES_APPLICATION_CHANNEL", value: `ES_APPLICATION_DETAILS_APPLICATION_CHANNEL_${appDetailsToShow?.applicationData?.channel}` },
            ],
        });
    }

    if (
        PT_CEMP &&
        workflowDetails?.data?.applicationBusinessService === "PT.MUTATION" &&
        workflowDetails?.data?.actionState?.nextActions?.find((act) => act.action === "PAY")
    ) {
        workflowDetails.data.actionState.nextActions = workflowDetails?.data?.actionState?.nextActions.map((act) => {
            if (act.action === "PAY") {
                return {
                    action: "PAY",
                    forcedName: "WF_EMPLOYEE_PT.MUTATION_PAY",
                    redirectionUrl: { pathname: `/digit-ui/employee/payment/collect/PT.MUTATION/${appDetailsToShow?.applicationData?.acknowldgementNumber}` },
                };
            }
            return act;
        });
    }

    const wfDocs = workflowDetails.data?.timeline?.reduce((acc, { wfDocuments }) => {
        return wfDocuments ? [...acc, ...wfDocuments] : acc;
    }, []);
    let appdetailsDocuments = appDetailsToShow?.applicationDetails?.find((e) => e.title === "PT_OWNERSHIP_INFO_SUB_HEADER")?.additionalDetails
        ?.documents;

    if (appdetailsDocuments && wfDocs?.length && !appdetailsDocuments?.find((e) => e.title === "PT_WORKFLOW_DOCS")) {
        appDetailsToShow.applicationDetails.find((e) => e.title === "PT_OWNERSHIP_INFO_SUB_HEADER").additionalDetails.documents = [
            ...appdetailsDocuments,
            {
                title: "PT_WORKFLOW_DOCS",
                values: wfDocs?.map?.((e) => ({ ...e, title: e.documentType })),
            },
        ];
    }
    const handleDownloadPdf = async () => {
        const Property = appDetailsToShow?.applicationData;
        const tenantInfo = tenants.find((tenant) => tenant.code === Property.tenantId);

        // const data = await getPTAcknowledgementData(Property, tenantInfo, t);
        // Digit.Utils.pdf.generate(data);
    };

    const propertyDetailsPDF = {
        order: 1,
        label: t("PT_APPLICATION"),
        onClick: () => handleDownloadPdf(),
    };
    let dowloadOptions = [propertyDetailsPDF];

    if (applicationDetails?.applicationData?.creationReason === "MUTATION") {
        // return (
        //     <MutationApplicationDetails
        //         propertyId={propertyId}
        //         acknowledgementIds={appDetailsToShow?.applicationData?.acknowldgementNumber}
        //         workflowDetails={workflowDetails}
        //         mutate={mutate}
        //     />
        // )
    }

    

    return (
        <div>
            <div className={"employee-application-details"} style={{ marginBottom: "15px" }}>
                <div style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: "bold",
                    fontSize: '24px',
                    lineHeight: '100%',
                    letterSpacing: '0',
                    textDecorationStyle: 'solid',
                    textDecorationColor: '#6b133f',
                    textDecorationThickness: '1px',
                    textDecorationOffset: '2px',
                    color: '#6b133f',
                    marginBottom: '20px',
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "20px"
                }}>{t("WS_APPLICATION_TITLE")}</div>
                {/* {dowloadOptions && dowloadOptions.length > 0 && (
                    <MultiLink
                        className="multilinkWrapper employee-mulitlink-main-div"
                        onHeadClick={() => setShowOptions(!showOptions)}
                        displayOptions={showOptions}
                        options={dowloadOptions}
                        downloadBtnClassName={"employee-download-btn-className"}
                        optionsClassName={"employee-options-btn-className"}
                    
                    />
                )} */}
            </div>
         
            {(data?.waterWorkflowRequest?.processInstance?.action === "APPROVE") && (
                <div style={styles.successModal}>
                    <div style={{margin:"auto"}}>
                    <div style={styles.successIcon}>
                        <span style={{ color: "white", fontSize: "1.5rem" }}>✔</span>
                    </div>
                    <h2 style={{
                        marginTop: "1rem",
                        //  fontFamily: "Inter",
                        fontWeight: 600,        // Semi Bold
                        fontStyle: "normal",
                        fontSize: "15px",
                        lineHeight: "28px",
                        letterSpacing: "0.25px",
                        textAlign: "center",
                        color: "#000000"
                    }}>
                        {/* Property ID Generated Successfully {" "} */}
                        Application Approved

                    </h2>
                    <div style={{marginTop:"1rem"}}></div>

 <p style={{
                        // fontFamily: "Inter",
                        fontWeight: 400,        // Regular
                        fontStyle: "normal",    // "Regular" = normal
                        fontSize: "16px",
                        lineHeight: "24px",
                        letterSpacing: "0px",
                        textAlign: "center",
                        color: "#717182"
                    }}>
Connection ID Generated Successfully

                    </p>

                    <p style={{
                        // fontFamily: "Inter",
                        fontWeight: 400,        // Regular
                        fontStyle: "normal",    // "Regular" = normal
                        fontSize: "16px",
                        lineHeight: "24px",
                        letterSpacing: "0px",
                        textAlign: "center",
                        color: "#717182"
                    }}>

                        <br />
                        {/* {propertyId && <strong> {propertyId}</strong>} */}
                    </p>
 <div style={{marginTop:"2rem"}}></div>

                    <button onClick={() => window.location.href = "/digit-ui/employee"} style={styles.successButton}>
                        {t("Home")}
                    </button>
                    </div>
                </div>
            )}
            {(data?.waterWorkflowRequest?.processInstance?.action !== "APPROVE") && (
                <div style={styles.successModal}>
                    <div style={{margin:"auto"}}>
                    <div style={styles.successIcon}>
                        <span style={{ color: "white", fontSize: "1.5rem" }}>✔</span>
                    </div>
                    <h2 style={{
                        marginTop: "1rem",
                        //  fontFamily: "Inter",
                        fontWeight: 600,        // Semi Bold
                        fontStyle: "normal",
                        fontSize: "15px",
                        lineHeight: "28px",
                        letterSpacing: "0.25px",
                        textAlign: "center",
                        color: "#000000"
                    }}>
                        {/* Property ID Generated Successfully {" "} */}
                        Application Submited Successfully

                    </h2>
                    <div style={{marginTop:"1rem"}}></div>

 <p style={{
                        // fontFamily: "Inter",
                        fontWeight: 400,        // Regular
                        fontStyle: "normal",    // "Regular" = normal
                        fontSize: "16px",
                        lineHeight: "24px",
                        letterSpacing: "0px",
                        textAlign: "center",
                        color: "#717182"
                    }}>
Application Number

                    </p>

                    <p style={{
                        // fontFamily: "Inter",
                        fontWeight: 400,        // Regular
                        fontStyle: "normal",    // "Regular" = normal
                        fontSize: "16px",
                        lineHeight: "24px",
                        letterSpacing: "0px",
                        textAlign: "center",
                        color: "#717182"
                    }}>

                        <br />
                        {<strong> {data?.WaterConnection?.[0]?.applicationNo}</strong>}
                    </p>

 
 <div style={{marginTop:"2rem"}}></div>

                    <button onClick={() => window.location.href = "/digit-ui/employee"} style={styles.successButton}>
                        {t("Home")}
                    </button>
                    </div>
                </div>
            )}

        </div>
    );
};
const styles = {
    successModal: {
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "2rem",
        marginTop: "2rem",
        textAlign: "center",
        backgroundColor: "#fff",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        width: "340px",
        marginLeft: "auto",
        marginRight: "auto",
        height: "370px",
        display: "flex",
        alignItems: "center"
    },
    successIcon: {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        backgroundColor: "#000",
        border: "3px solid green",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    successButton: {
        marginTop: "1rem",
        padding: "0.5rem 1.5rem",
        backgroundColor: "#6b133f",
        color: "white",
        border: "none",
        borderRadius: "20px",
        cursor: "pointer"
    },
}
export default React.memo(SuccessApplications);
