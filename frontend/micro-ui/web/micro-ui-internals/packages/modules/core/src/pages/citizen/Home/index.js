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
import { CitizenSideBar } from "../../../components/TopBarSideBar/SideBar/CitizenSideBar";
import StaticCitizenSideBar from "../../../components/TopBarSideBar/SideBar/StaticCitizenSideBar";
import { max } from "lodash";
 
const Home = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const user = Digit.UserService.getUser();
  const accessToken = user?.access_token;
  const refreshToken = user?.refresh_token;
  const tenantId = Digit.ULBService.getCitizenCurrentTenant(true);
  const { data: { stateInfo, uiHomePage } = {}, isLoading } = Digit.Hooks.useStore.getInitData();
  // let isMobile = window.Digit.Utils.browser.isMobile();
  if (window.Digit.SessionStorage.get("TL_CREATE_TRADE")) window.Digit.SessionStorage.set("TL_CREATE_TRADE", {});
 
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
    // Digit.SessionStorage.get("locale") === null
    //   ? history.push(`/digit-ui/citizen/select-language`)
    //   : history.push(`/digit-ui/citizen/select-location`);
//  Digit.SessionStorage.get("locale") === null
//       ? history.push(`https://citizenservicesdev.eydemoapp.in/landing/index.html`)
//       : history.push(`/digit-ui/citizen/select-location`);
 window.location.replace("https://citizenservicesdev.eydemoapp.in/landing/index.html");
     
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
            {/* <h2
              style={{
                fontWeight: "700",
                fontSize: isDesktop ? 24 : isTablet ? 20 : 18,
                display: "flex",
                alignItems: "center",
                margin: 0,
              }}
            >
              <i className="fa-regular fa-star" style={{ marginRight: 10 }}></i>
              Payment Cart check
            </h2>
            <div
              className="filter"
              style={{
                backgroundColor: "white",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: `${isDesktop ? 10 : isTablet ? 8 : 6}px ${isDesktop ? 20 : isTablet ? 15 : 10}px`,
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                width: isDesktop ? 270 : isTablet ? 220 : 180,
                marginTop: isMobile ? 15 : 0,
              }}
            >
              <div className="filter-container" style={{ display: "flex", alignItems: "center", gap: 15 }}>
                <i
                  className="far fa-calendar"
                  style={{ color: "#801d46", fontSize: isDesktop ? 26 : isTablet ? 24 : 22 }}
                ></i>
                <div>
                  <span style={{ fontSize: isDesktop ? 14 : isTablet ? 13 : 12, color: "#333" }}>Filter Period</span>
                  <p style={{ fontSize: isDesktop ? 12 : isTablet ? 11 : 10, color: "#666", margin: 0 }}>
                    17 April 2025 - 21 Jul 2025
                  </p>
                </div>
              </div>
              <i className="fas fa-chevron-down"></i>
            </div> */}
          </div>
 
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
                Status Card
              </h2>
            </div>
          <div
            className="status-cards home-stats-card"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "20px",
              marginBottom: "20px"
            }}
          >
            {[
             
              { url: `${stateInfo.BAPURL}dashboard?type=1&accessToken=${accessToken}&refreshToken=${refreshToken}&module=marriage`, icon: stateInfo?.uiImageAssets?.rental, label: "Marriage Certificate", count: 30, className: "sendback", color: "#2196f3" },
            ].map((card, index) => (
              <a href={card.url} key={index} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    flexWrap: "nowrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px",
                    borderRadius: "12px",
                    backgroundColor: "#fff",
                    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                    width: "100%",
                    position: "relative",
                    rowGap: isMobile ? "10px" : "20px",
                    height: isMobile ? "auto" : "150px",
                  }}
                >
                 
                  <div
                    className="card-title"
                  >
                    {card.label}
                  </div>
 
                 
                    <img src={card.icon} alt="Due" style={{ width: "70px", height: "70px" }} />
                   
                  </div>
 
                 
                 
           
              </a>
            ))}
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
                Favorites
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
                  label: "Property Register",
                  image: stateInfo?.uiImageAssets?.propertyRegister,
                  url: "/digit-ui/citizen/pt/property/new-application",
                },
                {
                  label: "Pay",
                  image: stateInfo?.uiImageAssets?.cashDesk,
                  url: "/digit-ui/citizen/pt/property/citizen-search",
                },
                {
                  label: "My Application",
                  image: stateInfo?.uiImageAssets?.trackApplication,
                  url: "/digit-ui/citizen/pt/property/my-applications",
                },
                {
                  label: "Daily Collection Report",
                  image: stateInfo?.uiImageAssets?.deleteReceipt,
                  url: "",
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
                    alignItems: "center",
                    textAlign: "center",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.2s",
                  }}
                >
                  <img
                    src={action.image}
                    alt={action.label}
                    style={{
                      width: isMobile ? 40 : 50,
                      height: isMobile ? 40 : 50,
                      marginBottom: 10,
                    }}
                  />
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
 
export default Home;