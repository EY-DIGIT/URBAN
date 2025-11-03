import React, { useEffect } from "react";
import {
    StandaloneSearchBar,
    Loader,
    CardBasedOptions,
    ComplaintIcon,
    PTIcon,
    CaseIcon,
    DropIcon,
    HomeIcon,
    Calender,
    DocumentIcon,
    HelpIcon,
    WhatsNewCard,
    OBPSIcon,
    WSICon,
    Card
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useHistory, Link } from "react-router-dom";
// import { CitizenSideBar } from "../../../components/TopBarSideBar/SideBar/CitizenSideBar";
// import StaticCitizenSideBar from "../../../components/TopBarSideBar/SideBar/StaticCitizenSideBar";
// import { max } from "lodash";
// import ServiceCard from "../Landing/index";

const PropertyCardsLanding = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const user = Digit.UserService.getUser();
    const accessToken = user?.access_token;
    const refreshToken = user?.refresh_token;
    const tenantId = Digit.ULBService.getCitizenCurrentTenant(true);
    const { data: { stateInfo, uiHomePage } = {}, isLoading } = Digit.Hooks.useStore.getInitData();
    
    // State for popup
    const [showDocumentsPopup, setShowDocumentsPopup] = React.useState(false);
    
    if (window.Digit.SessionStorage.get("TL_CREATE_TRADE")) window.Digit.SessionStorage.set("TL_CREATE_TRADE", {});
    // let userInfo1 = JSON.parse(localStorage.getItem("user-info"));

    // console.log("userInfo1",userInfo1, user);
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
    React.useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = window.innerWidth <= 600; // breakpoint

    const isTablet = windowWidth > 768 && windowWidth <= 998;
    const isDesktop = windowWidth > 998;

    // Handle card click
    const handleCardClick = (action) => {
        if (action.label === t("NEW_PROPERTY_APPLICATION")) {
            setShowDocumentsPopup(true);
        } else if (action.url) {
            window.location.href = action.url;
        }
    };

    // Handle proceed button click
    const handleProceed = () => {
        setShowDocumentsPopup(false);
        //window.location.href = "/digit-ui/citizen/tl/tradelicence/new-application/info";
        window.location.href = "/digit-ui/citizen/tl/tradelicence/tradelicense-application";
    };

    // Handle back button click
    const handleBack = () => {
        setShowDocumentsPopup(false);
    };


    const conditionsToDisableNotificationCountTrigger = () => {
        if (Digit.UserService?.getUser()?.info?.type === "EMPLOYEE") return false;
        if (!Digit.UserService?.getUser()?.access_token) return false;
        return true;
    };

    const { data: EventsData, isLoading: EventsDataLoading } = Digit.Hooks.useEvents({
        tenantId,
        variant: "whats-new",
        config: {
            enabled: conditionsToDisableNotificationCountTrigger(),
        },
    });

    if (!tenantId) {

        window.location.replace(stateInfo?.BAPURL);

    }



    return isLoading ? (
        <Loader />
    ) : (
        <div
            className="main-content"
            style={{ display: "flex", flexDirection: "column", transition: "margin-left 0.3s", width: "100%" }}
        >
            <div className="main-content-wrapper" style={{ flex: 1 }}>
                <div className="content-area" style={{ padding: isDesktop ? 20 : isTablet ? 15 : 10 }}>
                    {/* Favorite Cards */}
                    <div className="favorite-card">
                        <div className="card-header-view" style={{ marginBottom: 15, color: "#555555" }}>
                            <h2
                                style={{
                                    fontWeight: "700",
                                    fontSize: isDesktop ? 24 : isTablet ? 20 : 18,
                                    display: "flex",
                                    alignItems: "center",
                                    margin: 0,
                                }}
                            >
                                <i className="fa-regular fa-star" style={{ marginRight: 10 }}></i>
                                Trade License<br /><br/>
                                Actions
                            </h2>
                        </div>

                        <div
                            className="action-cards"
                            style={{
                                display: "grid",
                                gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
                                gap: 20,
                                marginBottom: 20,
                            }}
                        >
                            {[
                                {
                                    label: t("NEW_PROPERTY_APPLICATION"),
                                    image: "new_application",
                                    //url: "/digit-ui/citizen/pt/property/new-application",
                                    url: "/digit-ui/citizen/tl/tradelicence/new-application/info",
                                },
                                {
                                    label: t("TRACK_APPLICATION"),
                                    image: "file_search",
                                    //url: "/digit-ui/citizen/pt/property/trackApplication",
                                },
                                {
                                    label: t("PAY"),
                                    image: "inr",
                                    //url: "/digit-ui/citizen/pt/property/citizen-search",
                                },
                                {
                                    label: t("MY_PROPERTIES"),
                                    image: "my_properties",
                                    //url: "/digit-ui/citizen/pt/property/my-properties",
                                },
                            ].map((action, index) => (
                                <div
                                    key={index}
                                    className="action-card"
                                    style={{
                                        backgroundColor: "white",
                                        borderRadius: 8,
                                        padding: isDesktop ? 20 : isTablet ? 15 : 12,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        textAlign: "center",
                                        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                                        transition: "transform 0.2s",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => handleCardClick(action)}
                                >
                                    <img src={stateInfo?.uiImageAssets[action.image]}/>
                                    <span
                                        style={{
                                            fontSize: isDesktop ? 14 : isTablet ? 13 : 12,
                                            margin: 0,
                                            color: "#333",
                                            fontWeight: 500,
                                            textDecoration: "none",
                                        }}
                                    >
                                        {action.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Documents Required Popup */}
            {showDocumentsPopup && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                        padding: "20px",
                        boxSizing: "border-box",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "white",
                            borderRadius: 12,
                            padding: "24px",
                            maxWidth: "650px",
                            width: "100%",
                            maxHeight: "65vh",
                            overflowY: "auto",
                            position: "relative",
                            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                            margin: "auto",
                        }}
                    >
                        <h2
                            style={{
                                textAlign: "center",
                                color: "#d32f2f",
                                marginBottom: "24px",
                                fontSize: "18px",
                                fontWeight: "600",
                                letterSpacing: "0.5px",
                            }}
                        >
                            Documents Required
                        </h2>

                        <div style={{ marginBottom: "24px" }}>
                            <h4 style={{ 
                                color: "#333", 
                                marginBottom: "12px", 
                                fontSize: "14px",
                                fontWeight: "600",
                                borderBottom: "1px solid #e0e0e0",
                                paddingBottom: "8px"
                            }}>
                                Applicant and Shop Related Documents
                            </h4>
                            <ol style={{ 
                                paddingLeft: "20px", 
                                lineHeight: "1.6",
                                fontSize: "13px",
                                color: "#444",
                                margin: "0"
                            }}>
                                <p style={{ marginBottom: "4px" }}>1. Passport-size photograph of the applicant</p>
                                <p style={{ marginBottom: "4px" }}>2. Identity proof: Aadhar Card / PAN Card / Driving License</p>
                                <p style={{ marginBottom: "4px" }}>3. Photograph of the Shop</p>
                                <p style={{ marginBottom: "4px" }}>4. Property Tax Paid Receipt (For Current Financial Year)</p>
                                <p style={{ marginBottom: "4px" }}>5. Rent Agreement (If Applicant is Tenant)</p>
                                <p style={{ marginBottom: "4px" }}>6. Notarised Consent Letter on ₹50 Stamp Paper From Property Owner (Property Tax Receipt Not in Owner Name)</p>
                            </ol>
                        </div>

                        <div style={{ marginBottom: "24px" }}>
                            <h4 style={{ 
                                color: "#333", 
                                marginBottom: "12px", 
                                fontSize: "14px",
                                fontWeight: "600",
                                borderBottom: "1px solid #e0e0e0",
                                paddingBottom: "8px"
                            }}>
                                Firm/ Organization Related Documents
                            </h4>
                            <ol style={{ 
                                paddingLeft: "20px", 
                                lineHeight: "1.6",
                                fontSize: "13px",
                                color: "#444",
                                margin: "0"
                            }}>
                                <p style={{ marginBottom: "4px" }}>1. Partnership Deed (for Partnership Firm)</p>
                                <p style={{ marginBottom: "4px" }}>2. Memorandum of Association + Authority Letter (for Private Limited Company)</p>
                                <p style={{ marginBottom: "4px" }}>3. RBI License (for Finance Companies)</p>
                                <p style={{ marginBottom: "4px" }}>4. IRDA License or Approval Letter (for Insurance Businesses)</p>
                            </ol>
                        </div>

                        <div style={{ marginBottom: "24px" }}>
                            <h4 style={{ 
                                color: "#333", 
                                marginBottom: "12px", 
                                fontSize: "14px",
                                fontWeight: "600",
                                borderBottom: "1px solid #e0e0e0",
                                paddingBottom: "8px"
                            }}>
                                Special Business/ Professional License Documents
                            </h4>
                            <ol style={{ 
                                paddingLeft: "20px", 
                                lineHeight: "1.6",
                                fontSize: "13px",
                                color: "#444",
                                margin: "0"
                            }}>
                                <p style={{ marginBottom: "4px" }}>1. Doctor's Certificate: Degree/Certificate from Medical Council</p>
                                <p style={{ marginBottom: "4px" }}>2. Hospital License: Certificate from Chief Medical & Health Officer (CMHO)</p>
                                <p style={{ marginBottom: "4px" }}>3. Beauty Parlour / Spa: Police Verification Report from local police station</p>
                                <p style={{ marginBottom: "4px" }}>4. Security Services: Challan receipt from IG Office</p>
                                <p style={{ marginBottom: "4px" }}>5. Money Lending / Sahukari:
                                    <ul style={{ 
                                        paddingLeft: "20px", 
                                        marginTop: "4px",
                                        listStyleType: "disc"
                                    }}>
                                        <p style={{ marginBottom: "2px" }}>a. Character Certificate from SP Office</p>
                                        <p style={{ marginBottom: "2px" }}>b. Fixed Deposit of ₹50 Lakhs in Commissioner's name</p>
                                        <p style={{ marginBottom: "2px" }}>c. Last 3 years CA-certified Balance Sheet</p>
                                    </ul>
                                </p>
                            </ol>
                        </div>

                        <div style={{ marginBottom: "32px" }}>
                            <h4 style={{ 
                                color: "#333", 
                                marginBottom: "12px", 
                                fontSize: "14px",
                                fontWeight: "600",
                                borderBottom: "1px solid #e0e0e0",
                                paddingBottom: "8px"
                            }}>
                                Other Supporting/ Authority Documents
                            </h4>
                            <ol style={{ 
                                paddingLeft: "20px", 
                                lineHeight: "1.6",
                                fontSize: "13px",
                                color: "#444",
                                margin: "0"
                            }}>
                                <p style={{ marginBottom: "4px" }}>1. If the shop is rented from a municipal market, the license can only be issued in the name mentioned on the market rent receipt</p>
                                <p style={{ marginBottom: "4px" }}>2. Any additional certificate/approval from concerned authority depending on the business type</p>
                            </ol>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                gap: "12px",
                                justifyContent: "center",
                                paddingTop: "16px",
                                borderTop: "1px solid #e0e0e0"
                            }}
                        >
                            <button
                                onClick={handleBack}
                                style={{
                                    backgroundColor: "rgb(107, 19, 63)",
                                    color: "white",
                                    border: "none",
                                    padding: "10px 24px",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    cursor: "pointer",
                                    fontWeight: "500",
                                    minWidth: "80px",
                                    transition: "all 0.2s ease"
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.backgroundColor = "rgb(85, 15, 50)";
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.backgroundColor = "rgb(107, 19, 63)";
                                }}
                            >
                                Back
                            </button>
                            <button
                                onClick={handleProceed}
                                style={{
                                    backgroundColor: "rgb(107, 19, 63)",
                                    color: "white",
                                    border: "none",
                                    padding: "10px 24px",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    cursor: "pointer",
                                    fontWeight: "500",
                                    minWidth: "80px",
                                    transition: "all 0.2s ease"
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.backgroundColor = "rgb(85, 15, 50)";
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.backgroundColor = "rgb(107, 19, 63)";
                                }}
                            >
                                Proceed
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyCardsLanding;