// import React, { useEffect } from "react";
// import {
//   StandaloneSearchBar,
//   Loader,
//   CardBasedOptions,
//   ComplaintIcon,
//   PTIcon,
//   CaseIcon,
//   DropIcon,
//   HomeIcon,
//   Calender,
//   DocumentIcon,
//   HelpIcon,
//   WhatsNewCard,
//   OBPSIcon,
//   WSICon,
// } from "@egovernments/digit-ui-react-components";
// import { useTranslation } from "react-i18next";
// import { useHistory } from "react-router-dom";
// import { CitizenSideBar } from "../../../components/TopBarSideBar/SideBar/CitizenSideBar";
// import StaticCitizenSideBar from "../../../components/TopBarSideBar/SideBar/StaticCitizenSideBar";

// const Home = () => {
//   const { t } = useTranslation();
//   const history = useHistory();
//   const tenantId = Digit.ULBService.getCitizenCurrentTenant(true);
//   const { data: { stateInfo, uiHomePage } = {}, isLoading } = Digit.Hooks.useStore.getInitData();
//   let isMobile = window.Digit.Utils.browser.isMobile();
//   if (window.Digit.SessionStorage.get("TL_CREATE_TRADE")) window.Digit.SessionStorage.set("TL_CREATE_TRADE", {});

//   const conditionsToDisableNotificationCountTrigger = () => {
//     if (Digit.UserService?.getUser()?.info?.type === "EMPLOYEE") return false;
//     if (!Digit.UserService?.getUser()?.access_token) return false;
//     return true;
//   };

//   const { data: EventsData, isLoading: EventsDataLoading } = Digit.Hooks.useEvents({
//     tenantId,
//     variant: "whats-new",
//     config: {
//       enabled: conditionsToDisableNotificationCountTrigger(),
//     },
//   });

//   if (!tenantId) {
//     Digit.SessionStorage.get("locale") === null
//       ? history.push(`/digit-ui/citizen/select-language`)
//       : history.push(`/digit-ui/citizen/select-location`);
//   }

//   const appBannerWebObj = uiHomePage?.appBannerDesktop;
//   const appBannerMobObj = uiHomePage?.appBannerMobile;
//   const citizenServicesObj = uiHomePage?.citizenServicesCard;
//   const infoAndUpdatesObj = uiHomePage?.informationAndUpdatesCard;
//   const whatsAppBannerWebObj = uiHomePage?.whatsAppBannerDesktop;
//   const whatsAppBannerMobObj = uiHomePage?.whatsAppBannerMobile;
//   const whatsNewSectionObj = uiHomePage?.whatsNewSection;

//   const handleClickOnWhatsAppBanner = (obj) => {
//     window.open(obj?.navigationUrl);
//   };

//   const allCitizenServicesProps = {
//     header: t(citizenServicesObj?.headerLabel),
//     sideOption: {
//       name: t(citizenServicesObj?.sideOption?.name),
//       onClick: () => history.push(citizenServicesObj?.sideOption?.navigationUrl),
//     },
//     options: [
//       {
//         name: t(citizenServicesObj?.props?.[0]?.label),
//         Icon: <ComplaintIcon />,
//         onClick: () => history.push(citizenServicesObj?.props?.[0]?.navigationUrl),
//       },
//       {
//         name: t(citizenServicesObj?.props?.[1]?.label),
//         Icon: <PTIcon className="fill-path-primary-main" />,
//         onClick: () => history.push(citizenServicesObj?.props?.[1]?.navigationUrl),
//       },
//       {
//         name: t(citizenServicesObj?.props?.[2]?.label),
//         Icon: <CaseIcon className="fill-path-primary-main" />,
//         onClick: () => history.push(citizenServicesObj?.props?.[2]?.navigationUrl),
//       },
//       // {
//       //     name: t("ACTION_TEST_WATER_AND_SEWERAGE"),
//       //     Icon: <DropIcon/>,
//       //     onClick: () => history.push("/digit-ui/citizen")
//       // },
//       {
//         name: t(citizenServicesObj?.props?.[3]?.label),
//         Icon: <WSICon />,
//         onClick: () => history.push(citizenServicesObj?.props?.[3]?.navigationUrl),
//       },
//     ],
//     styles: { display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" },
//   };
//   const allInfoAndUpdatesProps = {
//     header: t(infoAndUpdatesObj?.headerLabel),
//     sideOption: {
//       name: t(infoAndUpdatesObj?.sideOption?.name),
//       onClick: () => history.push(infoAndUpdatesObj?.sideOption?.navigationUrl),
//     },
//     options: [
//       {
//         name: t(infoAndUpdatesObj?.props?.[0]?.label),
//         Icon: <HomeIcon />,
//         onClick: () => history.push(infoAndUpdatesObj?.props?.[0]?.navigationUrl),
//       },
//       {
//         name: t(infoAndUpdatesObj?.props?.[1]?.label),
//         Icon: <Calender />,
//         onClick: () => history.push(infoAndUpdatesObj?.props?.[1]?.navigationUrl),
//       },
//       {
//         name: t(infoAndUpdatesObj?.props?.[2]?.label),
//         Icon: <DocumentIcon />,
//         onClick: () => history.push(infoAndUpdatesObj?.props?.[2]?.navigationUrl),
//       },
//       {
//         name: t(infoAndUpdatesObj?.props?.[3]?.label),
//         Icon: <DocumentIcon />,
//         onClick: () => history.push(infoAndUpdatesObj?.props?.[3]?.navigationUrl),
//       },
//       // {
//       //     name: t("CS_COMMON_HELP"),
//       //     Icon: <HelpIcon/>
//       // }
//     ],
//     styles: { display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" },
//   };

//   return isLoading ? (
//     <Loader />
//   ) : (
//     <div className="HomePageContainer">
//       {/* <div className="SideBarStatic">
//         <StaticCitizenSideBar />
//       </div> */}
//       <div className="HomePageWrapper">
//         {
//           <div className="BannerWithSearch">
//             {isMobile ? <img src={appBannerMobObj?.bannerUrl} /> : <img src={appBannerWebObj?.bannerUrl} />}
//             {/* <div className="Search">
//             <StandaloneSearchBar placeholder={t("CS_COMMON_SEARCH_PLACEHOLDER")} />
//           </div> */}
//             <div className="ServicesSection">
//               <CardBasedOptions style={{ marginTop: "-30px" }} {...allCitizenServicesProps} />
//               <CardBasedOptions style={isMobile ? {} : { marginTop: "-30px" }} {...allInfoAndUpdatesProps} />
//             </div>
//           </div>
//         }

//         {(whatsAppBannerMobObj || whatsAppBannerWebObj) && (
//           <div className="WhatsAppBanner">
//             {isMobile ? (
//               <img src={whatsAppBannerMobObj?.bannerUrl} onClick={() => handleClickOnWhatsAppBanner(whatsAppBannerMobObj)} />
//             ) : (
//               <img src={whatsAppBannerWebObj?.bannerUrl} onClick={() => handleClickOnWhatsAppBanner(whatsAppBannerWebObj)} />
//             )}
//           </div>
//         )}

//         {conditionsToDisableNotificationCountTrigger() ? (
//           EventsDataLoading ? (
//             <Loader />
//           ) : (
//             EventsData &&
//             EventsData[0] && (
//               <div className="WhatsNewSection">
//                 <div className="headSection">
//                   <h2>{t(whatsNewSectionObj?.headerLabel)}</h2>
//                   <p onClick={() => history.push(whatsNewSectionObj?.sideOption?.navigationUrl)}>{t(whatsNewSectionObj?.sideOption?.name)}</p>
//                 </div>
//                 <WhatsNewCard {...EventsData?.[0]} />
//               </div>
//             )
//           )
//         ) : null}
//       </div>
//     </div>
//   );
// };

// export default Home;


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
  const tenantId = Digit.ULBService.getCitizenCurrentTenant(true);
  const { data: { stateInfo, uiHomePage } = {}, isLoading } = Digit.Hooks.useStore.getInitData();
  console.log("uiHomePage",uiHomePage)
  let isMobile = window.Digit.Utils.browser.isMobile();
  if (window.Digit.SessionStorage.get("TL_CREATE_TRADE")) window.Digit.SessionStorage.set("TL_CREATE_TRADE", {});

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
    Digit.SessionStorage.get("locale") === null
      ? history.push(`/digit-ui/citizen/select-language`)
      : history.push(`/digit-ui/citizen/select-location`);
  }

  const appBannerWebObj = uiHomePage?.appBannerDesktop;
  const appBannerMobObj = uiHomePage?.appBannerMobile;
  const citizenServicesObj = uiHomePage?.citizenServicesCard;
  const infoAndUpdatesObj = uiHomePage?.informationAndUpdatesCard;
  const whatsAppBannerWebObj = uiHomePage?.whatsAppBannerDesktop;
  const whatsAppBannerMobObj = uiHomePage?.whatsAppBannerMobile;
  const whatsNewSectionObj = uiHomePage?.whatsNewSection;

  const handleClickOnWhatsAppBanner = (obj) => {
    window.open(obj?.navigationUrl);
  };

  const allCitizenServicesProps = {
    header: t(citizenServicesObj?.headerLabel),
    sideOption: {
      name: t(citizenServicesObj?.sideOption?.name),
      onClick: () => history.push(citizenServicesObj?.sideOption?.navigationUrl),
    },
    options: [
      {
        name: t(citizenServicesObj?.props?.[0]?.label),
        Icon: <ComplaintIcon />,
        onClick: () => history.push(citizenServicesObj?.props?.[0]?.navigationUrl),
      },
      {
        name: t(citizenServicesObj?.props?.[1]?.label),
        Icon: <PTIcon className="fill-path-primary-main" />,
        onClick: () => history.push(citizenServicesObj?.props?.[1]?.navigationUrl),
      },
      {
        name: t(citizenServicesObj?.props?.[2]?.label),
        Icon: <CaseIcon className="fill-path-primary-main" />,
        onClick: () => history.push(citizenServicesObj?.props?.[2]?.navigationUrl),
      },
      // {
      //     name: t("ACTION_TEST_WATER_AND_SEWERAGE"),
      //     Icon: <DropIcon/>,
      //     onClick: () => history.push("/digit-ui/citizen")
      // },
      {
        name: t(citizenServicesObj?.props?.[3]?.label),
        Icon: <WSICon />,
        onClick: () => history.push(citizenServicesObj?.props?.[3]?.navigationUrl),
      },
    ],
    styles: { display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" },
  };
  const allInfoAndUpdatesProps = {
    header: t(infoAndUpdatesObj?.headerLabel),
    sideOption: {
      name: t(infoAndUpdatesObj?.sideOption?.name),
      onClick: () => history.push(infoAndUpdatesObj?.sideOption?.navigationUrl),
    },
    options: [
      {
        name: t(infoAndUpdatesObj?.props?.[0]?.label),
        Icon: <HomeIcon />,
        onClick: () => history.push(infoAndUpdatesObj?.props?.[0]?.navigationUrl),
      },
      {
        name: t(infoAndUpdatesObj?.props?.[1]?.label),
        Icon: <Calender />,
        onClick: () => history.push(infoAndUpdatesObj?.props?.[1]?.navigationUrl),
      },
      {
        name: t(infoAndUpdatesObj?.props?.[2]?.label),
        Icon: <DocumentIcon />,
        onClick: () => history.push(infoAndUpdatesObj?.props?.[2]?.navigationUrl),
      },
      {
        name: t(infoAndUpdatesObj?.props?.[3]?.label),
        Icon: <DocumentIcon />,
        onClick: () => history.push(infoAndUpdatesObj?.props?.[3]?.navigationUrl),
      },
      // {
      //     name: t("CS_COMMON_HELP"),
      //     Icon: <HelpIcon/>
      // }
    ],
    styles: { display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" },
  };
  const cardStyle = {
    background: "linear-gradient(to right, #f9f9f9, #ffffff)",
    borderRadius: "10px",
    padding: "24px",
    width: "100%",
    maxWidth: "648px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    fontFamily: "sans-serif",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "700",
    color: "#5B21B6", // purple-700
  };

  const linkStyle = {
    fontSize: "14px",
    fontWeight: "600",
    color: "#5B21B6",
    textDecoration: "none",
  };

  const serviceItemStyle = {
    display: "flex",
    alignItems: "center",
    color: "#5B21B6",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "pointer",
  };

  const iconStyle = {
    marginRight: "8px",
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="HomePageContainer">
      {/* <div className="SideBarStatic">
        <StaticCitizenSideBar />
      </div> */}
      <div className="HomePageWrapper">
        {
          <div className="BannerWithSearch">
            {/* {isMobile ? <img src={appBannerMobObj?.bannerUrl} /> : <img src={appBannerWebObj?.bannerUrl} />}
            <div className="Search">
            <StandaloneSearchBar placeholder={t("CS_COMMON_SEARCH_PLACEHOLDER")} />
          </div> */}
            <div className="ServicesSection">
              <CardBasedOptions  {...allCitizenServicesProps} />
              <CardBasedOptions  {...allInfoAndUpdatesProps} />
            </div>
          </div>
        }

        {/* {(whatsAppBannerMobObj || whatsAppBannerWebObj) && (
          <div className="WhatsAppBanner">
            {isMobile ? (
              <img src={whatsAppBannerMobObj?.bannerUrl} onClick={() => handleClickOnWhatsAppBanner(whatsAppBannerMobObj)} />
            ) : (
              <img src={whatsAppBannerWebObj?.bannerUrl} onClick={() => handleClickOnWhatsAppBanner(whatsAppBannerWebObj)} />
            )}
          </div>
        )} */}

        {/* {conditionsToDisableNotificationCountTrigger() ? (
          EventsDataLoading ? (
            <Loader />
          ) : (
            EventsData &&
            EventsData[0] && (
              <div className="WhatsNewSection">
                <div className="headSection">
                  <h2>{t(whatsNewSectionObj?.headerLabel)}</h2>
                  <p onClick={() => history.push(whatsNewSectionObj?.sideOption?.navigationUrl)}>{t(whatsNewSectionObj?.sideOption?.name)}</p>
                </div>
                <WhatsNewCard {...EventsData?.[0]} />
              </div>
            )
          )
        ) : null} */}
      </div>
      {/* <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
          width: "50%",
          height: "231px",
          padding: "16px"
        }}
      >
        <Card
          style={{
            maxWidth: "none",
            border: "1px solid #D1D5DB80",
            background: "linear-gradient(90deg, #EDEDED 0%, #FFFFFF 100%)",
            padding: "16px",
          }}
          onClick={() => history.push("/digit-ui/citizen/pt-home")}
        >
          <div style={headerStyle}>
            <span style={titleStyle}>Citizen services</span>
            <Link to="/view-all" style={linkStyle}>
              View all
            </Link>
          </div>
          <div style={serviceItemStyle}>Property Tax</div>

        </Card>



   
      </div> */}

    </div>
  );
};

export default Home;
