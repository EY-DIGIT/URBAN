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
                    <div
                        className="content-header"
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 20,
                            flexWrap: isMobile ? "wrap" : "nowrap",
                        }}
                    >
                    </div>

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
                                    label: "New Property Application",
                                    image: <svg width="86" height="85" viewBox="0 0 86 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M69.0379 71.6417C69.0379 72.3664 68.7501 73.0613 68.2377 73.5737C67.7253 74.086 67.0304 74.3739 66.3058 74.3739H42.9187C41.8614 76.0499 40.5898 77.5807 39.1362 78.9275H66.3058C68.2381 78.9275 70.0912 78.1599 71.4576 76.7935C72.8239 75.4272 73.5915 73.574 73.5915 71.6417V34.5909C73.5914 32.6586 72.8238 30.8055 71.4574 29.4392L50.2256 8.20746C50.0678 8.0496 49.8917 7.91603 49.7187 7.78246L49.5487 7.65192C48.6591 6.94064 47.6153 6.44782 46.5008 6.21299C46.0301 6.11843 45.5511 6.07064 45.071 6.07031H20.3147C19.3577 6.07031 18.4101 6.25886 17.5259 6.62519C16.6418 6.99153 15.8385 7.52846 15.1619 8.20532C14.4853 8.88218 13.9487 9.68571 13.5827 10.57C13.2168 11.4543 13.0286 12.402 13.029 13.3591V42.0921C14.4774 41.327 16.0041 40.7204 17.5826 40.2828V13.3591C17.5826 11.8503 18.809 10.6239 20.3147 10.6239H43.2344V30.356C43.2344 31.9663 43.874 33.5106 45.0127 34.6492C46.1513 35.7878 47.6956 36.4275 49.3058 36.4275L69.0379 36.4244V71.6417ZM47.7879 12.2116L67.4533 31.8708L49.3058 31.8739C48.9032 31.8739 48.5172 31.714 48.2325 31.4293C47.9479 31.1447 47.7879 30.7586 47.7879 30.356V12.2116ZM43.3862 62.231C43.3862 67.4643 41.3072 72.4833 37.6068 76.1838C33.9063 79.8843 28.8873 81.9632 23.654 81.9632C18.4207 81.9632 13.4018 79.8843 9.70129 76.1838C6.00079 72.4833 3.92188 67.4643 3.92188 62.231C3.92188 56.9977 6.00079 51.9788 9.70129 48.2783C13.4018 44.5778 18.4207 42.4989 23.654 42.4989C28.8873 42.4989 33.9063 44.5778 37.6068 48.2783C41.3072 51.9788 43.3862 56.9977 43.3862 62.231ZM25.1719 50.0882C25.1719 49.6856 25.012 49.2995 24.7273 49.0149C24.4427 48.7302 24.0566 48.5703 23.654 48.5703C23.2515 48.5703 22.8654 48.7302 22.5807 49.0149C22.2961 49.2995 22.1362 49.6856 22.1362 50.0882V60.7132H11.5112C11.1086 60.7132 10.7225 60.8731 10.4379 61.1577C10.1532 61.4424 9.9933 61.8285 9.9933 62.231C9.9933 62.6336 10.1532 63.0197 10.4379 63.3043C10.7225 63.589 11.1086 63.7489 11.5112 63.7489H22.1362V74.3739C22.1362 74.7764 22.2961 75.1625 22.5807 75.4472C22.8654 75.7318 23.2515 75.8917 23.654 75.8917C24.0566 75.8917 24.4427 75.7318 24.7273 75.4472C25.012 75.1625 25.1719 74.7764 25.1719 74.3739V63.7489H35.7969C36.1994 63.7489 36.5855 63.589 36.8702 63.3043C37.1548 63.0197 37.3147 62.6336 37.3147 62.231C37.3147 61.8285 37.1548 61.4424 36.8702 61.1577C36.5855 60.8731 36.1994 60.7132 35.7969 60.7132H25.1719V50.0882Z" fill="black" />
                                    </svg>,
                                    url: "/digit-ui/citizen/pt/property/new-application",
                                },
                                {
                                    label: "Track Application",
                                    image: <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.6191 67.4998H16.8691C12.727 67.4998 9.36911 64.1419 9.36914 59.9998L9.36943 15C9.36946 10.8578 12.7273 7.5 16.8694 7.5H50.6203C54.7624 7.5 58.1203 10.8579 58.1203 15V30M61.8691 61.875L65.6191 65.625M22.4953 22.5H44.9953M22.4953 33.75H44.9953M22.4953 45H33.7453M63.7441 54.375C63.7441 59.5527 59.5468 63.75 54.3691 63.75C49.1915 63.75 44.9941 59.5527 44.9941 54.375C44.9941 49.1973 49.1915 45 54.3691 45C59.5468 45 63.7441 49.1973 63.7441 54.375Z" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>,
                                    url: "/digit-ui/citizen/pt/property/citizen-search",
                                },
                                {
                                    label: "Pay",
                                    image: <svg width="86" height="85" viewBox="0 0 86 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M70.0215 26.5625C70.0215 27.267 69.7416 27.9426 69.2435 28.4408C68.7453 28.9389 68.0697 29.2188 67.3652 29.2188H56.6904C56.7203 29.657 56.7402 30.0986 56.7402 30.5469C56.7341 35.8286 54.6332 40.8922 50.8985 44.627C47.1637 48.3617 42.1001 50.4626 36.8184 50.4688H31.735L55.8703 72.4094C56.1333 72.6426 56.3473 72.9258 56.5 73.2424C56.6527 73.559 56.7411 73.9027 56.76 74.2537C56.7789 74.6047 56.7279 74.956 56.61 75.2871C56.4921 75.6183 56.3097 75.9227 56.0733 76.1829C55.8369 76.443 55.5512 76.6536 55.2328 76.8025C54.9144 76.9514 54.5696 77.0357 54.2184 77.0504C53.8672 77.065 53.5166 77.0098 53.1869 76.888C52.8572 76.7662 52.5549 76.5801 52.2977 76.3406L23.0789 49.7781C22.6822 49.4175 22.4038 48.9453 22.2805 48.4236C22.1572 47.9018 22.1946 47.355 22.3879 46.8549C22.5812 46.3548 22.9212 45.925 23.3634 45.6218C23.8056 45.3186 24.3291 45.1563 24.8652 45.1562H36.8184C40.6917 45.1519 44.4051 43.6112 47.1439 40.8724C49.8827 38.1336 51.4233 34.4202 51.4277 30.5469C51.4277 30.0986 51.4045 29.657 51.3646 29.2188H24.8652C24.1608 29.2188 23.4851 28.9389 22.987 28.4408C22.4888 27.9426 22.209 27.267 22.209 26.5625C22.209 25.858 22.4888 25.1824 22.987 24.6842C23.4851 24.1861 24.1608 23.9062 24.8652 23.9062H49.824C48.6006 21.5089 46.7387 19.496 44.4437 18.0898C42.1487 16.6837 39.5099 15.9388 36.8184 15.9375H24.8652C24.1608 15.9375 23.4851 15.6576 22.987 15.1595C22.4888 14.6614 22.209 13.9857 22.209 13.2812C22.209 12.5768 22.4888 11.9011 22.987 11.403C23.4851 10.9049 24.1608 10.625 24.8652 10.625H67.3652C68.0697 10.625 68.7453 10.9049 69.2435 11.403C69.7416 11.9011 70.0215 12.5768 70.0215 13.2812C70.0215 13.9857 69.7416 14.6614 69.2435 15.1595C68.7453 15.6576 68.0697 15.9375 67.3652 15.9375H50.3453C52.715 18.1298 54.5175 20.8642 55.598 23.9062H67.3652C68.0697 23.9062 68.7453 24.1861 69.2435 24.6842C69.7416 25.1824 70.0215 25.858 70.0215 26.5625Z" fill="black" />
                                    </svg>,
                                    url: "/digit-ui/citizen/pt/property/citizen-search",
                                },
                                {
                                    label: "My Properties",
                                    image: <svg width="86" height="85" viewBox="0 0 86 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_9812_145817)">
                                            <path d="M43.2871 2.83324L44.5564 0.300238C44.1624 0.102803 43.7278 0 43.2871 0C42.8464 0 42.4118 0.102803 42.0178 0.300238L43.2871 2.83324ZM26.2871 48.1666V45.3332H23.4538V48.1666H26.2871ZM48.9538 48.1666H51.7871V45.3332H48.9538V48.1666ZM0.787109 84.9999H85.7871V79.3332H0.787109V84.9999ZM42.0178 0.300238L8.01778 17.3002L10.5564 22.3662L44.5564 5.36624L42.0178 0.300238ZM0.787109 33.9999H85.7871V28.3332H0.787109V33.9999ZM78.5564 17.3002L44.5564 0.300238L42.0178 5.36624L76.0178 22.3662L78.5564 17.3002ZM6.45378 31.1666V82.1666H12.1204V31.1666H6.45378ZM74.4538 31.1666V82.1666H80.1204V31.1666H74.4538ZM29.1204 82.1666V48.1666H23.4538V82.1666H29.1204ZM26.2871 50.9999H48.9538V45.3332H26.2871V50.9999ZM46.1204 48.1666V82.1666H51.7871V48.1666H46.1204Z" fill="black" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_9812_145817">
                                                <rect width="85" height="85" fill="white" transform="translate(0.787109)" />
                                            </clipPath>
                                        </defs>
                                    </svg>,
                                    url: "/digit-ui/citizen/pt/property/my-properties",
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
                                    }}
                                >
                                    <span>
                                        {action.image}
                                    </span>
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

export default PropertyCardsLanding;