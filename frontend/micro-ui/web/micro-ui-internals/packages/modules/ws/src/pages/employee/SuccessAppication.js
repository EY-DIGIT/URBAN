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
    const location = useLocation();
    const { data } = location.state;
    

    

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

                    <button onClick={() => window.location.href = "/digit-ui/employee/ws/WaterLandingPage"} style={styles.successButton}>
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
