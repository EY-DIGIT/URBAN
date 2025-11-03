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
import { useState } from "react";
import styles from "../Namantaran/SearchApplication/IndexStyleee";
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
    // let isMobile = window.Digit.Utils.browser.isMobile();
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


    const [showPopup, setShowPopup] = useState(false);

    const handleCardClick = (action) => {

        console.log("ACTION==", action)
        if (action.label === t("TRACK_APPLICATION")) {
            // Open popup for Track Application
            setShowPopup(true);
        } else {
            // Navigate normally
            window.location.href = action.url;
        }
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

    const stylesss = {
        modalOverlay: {
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
        },
        modalContent: {
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "8px",
            minWidth: "400px",
        },
        modalHeader: {
            color: "blue",
            fontWeight: "bold",
            fontSize: "18px",
            marginBottom: "1rem",
            textDecoration: "underline",
        },
        buttonRow: {
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
        },
        cancelButton: {
            border: "1px solid red",
            color: "red",
            padding: "8px 16px",
            borderRadius: "4px",
            backgroundColor: "white",
            cursor: "pointer",
        },
        submitButton: {
            backgroundColor: "indigo",
            color: "white",
            padding: "8px 16px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
        },
        checkIcon: {
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "black",
            border: "3px solid green",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 1rem",
            fontSize: "28px",
            color: "white",
        },
        header: {
            fontWeight: "bold",
            fontSize: "18px",
            marginBottom: "8px",
            textAlign: "center",
            color: "#6b133f"
        },
        receiptText: {
            color: "gray",
            fontSize: "14px",
            textAlign: "center"
        },
        homeButton: {
            marginTop: "20px",
            padding: "8px 20px",
            backgroundColor: "#6b133f",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex"
        },
        container: {
            padding: "20px",
            fontFamily: "Arial, sans-serif",
            backgroundColor: "white",
            //   minHeight: "10vh"
        },
        searchSection: {
            padding: "20px",
            marginBottom: "20px",
        },
        searchTitle: {
            color: "#6B133F",
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "15px"
        },
        searchContainer: {
            display: "flex",
            gap: "80px",
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: "10px"
        },
        searchInput: {
            minWidth: "120px",
            backgroundColor: "#F7F7F7",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "14px"
        },
        searchLabel: {
            fontSize: "14px",
            color: "#333",
            marginRight: "10px",
            minWidth: "80px"
        },
        buttonContainer: {
            display: "flex",
            gap: "30px",
            flexWrap: "wrap"
        },
        clearButton: {
            backgroundColor: "#6B133F",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500"
        },
        findButton: {
            backgroundColor: "#6B133F",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500"
        },
        propertiesSection: {
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            overflow: "hidden"
        },
        propertiesTitle: {
            color: "#6B133F",
            fontSize: "24px",
            fontWeight: "600",
            padding: "20px",
            borderBottom: "1px solid #eee",
            margin: 0,
        },
        tableContainer: {
            overflowX: "auto"
        },
        table: {
            width: "100%",
            borderCollapse: "collapse"
        },
        tableHeader: {
            backgroundColor: "#6B133F66",
            color: "black"
        },
        tableHeaderCell: {
            padding: "12px",
            textAlign: "left",
            fontWeight: "bold",
            fontSize: "14px"
        },
        tableRow: {
            borderBottom: "1px solid #eee"
        },
        tableRowEven: {
            backgroundColor: "#f9f9f9"
        },
        tableCell: {
            padding: "12px",
            fontSize: "14px",
            verticalAlign: "top"
        },
        actionButtonsContainer: {
            display: "flex",
            flexDirection: "column",
            gap: "5px"
        },
        actionButton: {
            backgroundColor: "transparent",
            color: "#6B133F",
            border: "1px solid #6B133F",
            padding: "6px 12px",
            borderRadius: "15px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "500",
            whiteSpace: "nowrap",
            transition: "all 0.3s ease"
        },
        receiptButton: {
            backgroundColor: "transparent",
            color: "#6B133F",
            border: "1px solid #6B133F",
            padding: "6px 12px",
            borderRadius: "15px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "500",
            whiteSpace: "nowrap",
            transition: "all 0.3s ease"
        },
        pagination: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
            padding: "20px",
            backgroundColor: "white"
        },
        paginationText: {
            fontSize: "14px",
            color: "#666"
        },
        paginationButton: {
            backgroundColor: "#6B133F",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px"
        },
        paginationButtonDisabled: {
            backgroundColor: "#ccc",
            cursor: "not-allowed"
        },
        noResults: {
            textAlign: "center",
            padding: "40px",
            color: "#666",
            fontSize: "16px"
        }
    };

    const handleCard = () => {
        setShowPopup(false);

    };

       const handleUrlNewProperty = () => {
   
 window.location.href = "/digit-ui/citizen/pt/property/trackApplication";
    };
           const handleUrlNamantaran = () => {

 window.location.href = "/digit-ui/citizen/pt/namantaran/trackApplicationNamantaran";
    };

    return isLoading ? (
        <Loader />
    ) : (
        <div
            className="main-content"
            style={{ display: "flex", flexDirection: "column", transition: "margin-left 0.3s", width: "100%" }}
        >



            {showPopup && (
                <div style={stylesss.modalOverlay}>
                    <div style={stylesss.modalContent}>
                        {/* <div style={styles.checkIcon}>✓</div> */}
                        <div style={stylesss.header}>Track Application</div>

                        {/* <br></br> */}
                        <br></br>
                        <div style={stylesss.header}>Please Select</div>


                        <label for="option1" style={{marginLeft:"1rem"}}>New Property</label>   <input type="radio" id="option1" name="myRadioGroup" value="value1" onClick={handleUrlNewProperty} />
                        <label style={{marginLeft:"4rem"}} for="option1">Namantaran</label>   <input type="radio" id="option1" name="myRadioGroup" value="value1" onClick={handleUrlNamantaran}/> 
                         <br></br>
                        <br></br>


                        <button style={stylesss.homeButton} onClick={() => {
                            // window.location.href = "/digit-ui/employee";
                            // proceedToPay(propertyIdd);
                            handleCard();

                        }}>
                            Close
                        </button>
                    </div>
                </div>)}

            <div className="main-content-wrapper" style={{ flex: 1 }}>
                <div className="content-area" style={{ padding: isDesktop ? 20 : isTablet ? 15 : 10 }}>
                    {/* Favorite Cards */}
                    <div className="favorite-card">
                        <div className="card-header-view" style={{ marginBottom: 15 }}>
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
                                    url: "/digit-ui/citizen/pt/property/new-application",
                                },
                                {
                                    label: t("TRACK_APPLICATION"),
                                    image: "file_search",
                                    url: "/digit-ui/citizen/pt/property/trackApplication",
                                },
                                {
                                    label: t("PAY"),
                                    image: "inr",
                                    url: "/digit-ui/citizen/pt/property/citizen-search",
                                },
                                {
                                    label: t("MY_PROPERTIES"),
                                    image: "my_properties",
                                    url: "/digit-ui/citizen/pt/property/my-properties",
                                },
                                {
                                    label: "Namantaran Application",
                                    image: "new_application",
                                    url: "/digit-ui/citizen/pt/namantaran/search",
                                },
                                // {
                                //     label: "Track Namantaran",
                                //     image: "new_application",
                                //     url: "/digit-ui/citizen/pt/namantaran/trackApplicationNamantaran",
                                // },
                                // {
                                //     label: t("PAY"),
                                //     image: "inr",
                                //     url: "/digit-ui/citizen/pt/property/citizen-search",
                                // },
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
                                    }}
                                    onClick={() => handleCardClick(action)}
                                >
                                    <img src={stateInfo?.uiImageAssets[action.image]} />


                                    {/* <a
                                        href={action.url}
                                        style={{
                                            fontSize: isDesktop ? 14 : isTablet ? 13 : 12,
                                            margin: 0,
                                            color: "#333",
                                            fontWeight: 500,
                                            textDecoration: "none",
                                        }}
                                    >
                                        {action.label}
                                    </a> */}

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
        </div>
    );
};

export default PropertyCardsLanding;