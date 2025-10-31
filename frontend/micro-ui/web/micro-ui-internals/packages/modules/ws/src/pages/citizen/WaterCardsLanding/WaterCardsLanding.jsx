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

const WaterCardsLanding = () => {
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
                                    label: t("NEW_WS_APPLICATION"),
                                    image: "new_application",
                                    url: "/digit-ui/citizen/ws/new-application",
                                },
                                {
                                    label: t("TRACK_APPLICATION"),
                                    image: "file_search",
                                    url: "/digit-ui/citizen/ws/water/citizen-search",
                                },
                                // {
                                //     label: t("PAY"),
                                //     image: "inr",
                                //     url: "/digit-ui/employee/ws/water/citizen-search",
                                // },
                                // {
                                //     label: t("MY_APPLICATION"),
                                //     image: "my_properties",
                                //     url: "/digit-ui/citizen/ws/property/my-properties",
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
                                >
                                    <img src={stateInfo?.uiImageAssets[action.image]}/>
                                    <a
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
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WaterCardsLanding;