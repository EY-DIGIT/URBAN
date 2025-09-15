import {
  BackButton,
  BillsIcon,
  CitizenHomeCard,
  CitizenInfoLabel,
  FSMIcon,
  Loader,
  MCollectIcon,
  OBPSIcon,
  PGRIcon,
  PTIcon,
  TLIcon,
  WSICon,
  Card
} from "@egovernments/digit-ui-react-components";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";
import { ServiceCard } from "../pages/citizen/Landing";
const applicationData = [
  {
    name: "Last 7 days",
    Approved: 18000,
    Pending: 9000,
    Rejected: 9000
  },
  {
    name: "Last 15 days",
    Approved: 18000,
    Pending: 9000,
    Rejected: 9000
  },
  {
    name: "1 Month",
    Approved: 18000,
    Pending: 9000,
    Rejected: 9000
  }
];

const collectionData = [
  { mode: "Cheque", value: 9000, fill: "#FF8A00" },
  { mode: "PoS", value: 18000, fill: "#3BB85E" },
  { mode: "Cash", value: 21000, fill: "#0076CE" },
  { mode: "UPI", value: 27000, fill: "#C5D5EA" },
  { mode: "Online (Web/Mobile)", value: 30000, fill: "#4B1D59" }
];


export const processLinkData = (newData, code, t) => {
  const obj = newData?.[`${code}`];
  if (obj) {
    obj.map((link) => {
      (link.link = link["navigationURL"]), (link.i18nKey = t(link["name"]));
    });
  }
  const newObj = {
    links: obj?.reverse(),
    header: Digit.Utils.locale.getTransformedLocale(`ACTION_TEST_${code}`),
    iconName: `CITIZEN_${code}_ICON`,
  };
  if (code === "FSM") {
    const roleBasedLoginRoutes = [
      {
        role: "FSM_DSO",
        from: "/digit-ui/citizen/fsm/dso-dashboard",
        dashoardLink: "CS_LINK_DSO_DASHBOARD",
        loginLink: "CS_LINK_LOGIN_DSO",
      },
    ];
    //RAIN-7297
    roleBasedLoginRoutes.map(({ role, from, loginLink, dashoardLink }) => {
      if (Digit.UserService.hasAccess(role))
        newObj?.links?.push({
          link: from,
          i18nKey: t(dashoardLink),
        });
      else
        newObj?.links?.push({
          link: "/digit-ui/citizen/login",
          state: { role: "FSM_DSO", from },
          i18nKey: t(loginLink),
        });
    });
  }

  return newObj;
};
const iconSelector = (code) => {
  switch (code) {
    case "PT":
      return <PTIcon className="fill-path-primary-main" />;
    case "WS":
      return <WSICon className="fill-path-primary-main" />;
    case "FSM":
      return <FSMIcon className="fill-path-primary-main" />;
    case "MCollect":
      return <MCollectIcon className="fill-path-primary-main" />;
    case "PGR":
      return <PGRIcon className="fill-path-primary-main" />;
    case "TL":
      return <TLIcon className="fill-path-primary-main" />;
    case "OBPS":
      return <OBPSIcon className="fill-path-primary-main" />;
    case "Bills":
      return <BillsIcon className="fill-path-primary-main" />;
    default:
      return <PTIcon className="fill-path-primary-main" />;
  }
};
const CitizenHome = ({ modules, getCitizenMenu, fetchedCitizen, isLoading }) => {
  const paymentModule = modules.filter(({ code }) => code === "Payment")[0];
  const moduleArr = modules.filter(({ code }) => code !== "Payment");
  const moduleArray = [paymentModule, ...moduleArr];
  const { t } = useTranslation();
  if (isLoading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <div className="citizen-all-services-wrapper">
        <BackButton />
        <div className="citizenAllServiceGrid">
          {moduleArray
            .filter((mod) => mod)
            .map(({ code }, index) => {
              let mdmsDataObj;
              if (fetchedCitizen) mdmsDataObj = fetchedCitizen ? processLinkData(getCitizenMenu, code, t) : undefined;
              if (mdmsDataObj?.links?.length > 0) {
                return (
                  <CitizenHomeCard
                    header={t(mdmsDataObj?.header)}
                    links={mdmsDataObj?.links?.filter((ele) => ele?.link)?.sort((x, y) => x?.orderNumber - y?.orderNumber)}
                    Icon={() => iconSelector(code)}
                    Info={
                      code === "OBPS"
                        ? () => (
                          <CitizenInfoLabel
                            style={{ margin: "0px", padding: "10px" }}
                            info={t("CS_FILE_APPLICATION_INFO_LABEL")}
                            text={t(`BPA_CITIZEN_HOME_STAKEHOLDER_INCLUDES_INFO_LABEL`)}
                          />
                        )
                        : null
                    }
                    isInfo={code === "OBPS" ? true : false}
                  />
                );
              } else return <React.Fragment />;
            })}
        </div>
      </div>
    </React.Fragment>
  );
};
// Section.jsx


const EmployeeHome = ({ modules }) => {
  const { data: { stateInfo, uiHomePage } = {}, isLoading } = Digit.Hooks.useStore.getInitData();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const user = Digit.UserService.getUser();
  const accessToken = user?.access_token;
  const refreshToken = user?.refresh_token;
  const roles = user?.info?.roles?.map(role => role.code) || [];

  // const { data: { stateInfo, uiHomePage } = {}, isLoading } = Digit.Hooks.useStore.getInitData();
    console.log("stateInfo==",stateInfo);
    console.log("uiHomePage==",uiHomePage);

  // Define all favorites
  const allFavorites = [
    {
      label: "Property Register",
      image: stateInfo?.uiImageAssets?.propertyRegister,
      url: "/digit-ui/employee/pt/new-application",
    },
    {
      label: "Property Cash Desk",
      image: stateInfo?.uiImageAssets?.cashDesk,
      url: "/digit-ui/employee/pt/search",
    },
    {
      label: "Track Application",
      image: stateInfo?.uiImageAssets?.trackApplication,
      url: "/digit-ui/employee/pt/application-search",
    },
    {
      label: "Daily Collection Report",
      image: stateInfo?.uiImageAssets?.deleteReceipt,
      url: "/digit-ui/employee/pt/inbox",
    }
  ];

  // Filter favorites based on role
  const filteredFavorites = allFavorites.filter(fav => {
    if (fav.label === "Property Register" && (roles.includes("PT_APPROVER") || roles.includes("PT_CEMP"))) {
      return false; // Hide this card
    }
    return true;
  });

      const services = [
        {
            title: "Property",
            icon: (
                <div style={styles.propertyIcon}>
                    <svg width="153" height="116" viewBox="0 0 153 116" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M152.712 58.0832C152.712 50.5505 150.748 43.0916 146.933 36.1323C143.118 29.173 137.526 22.8496 130.476 17.5232C123.426 12.1968 115.057 7.97161 105.846 5.08897C96.6353 2.20633 86.7632 0.722656 76.7934 0.722656C66.8237 0.722657 56.9515 2.20633 47.7407 5.08897C38.5298 7.97161 30.1607 12.1968 23.111 17.5232C16.0613 22.8496 10.4692 29.173 6.65394 36.1323C2.83869 43.0916 0.874999 50.5505 0.875 58.0832L76.7934 58.0832H152.712Z" fill="#DAE3FB" />
                        <image
                            x="36.6621"
                            y="17.7227"
                            width="90"
                            height="90"
                            preserveAspectRatio="none"
                            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACG0lEQVR4nO2YMWtUQRSFv7gkakIgYCBhCwv9A7Jgk8o25FekiIUKQV3YWv+FVcAuKZMqqYyFhJDY2GibFYsQd4VgIcF98uAuDMOdvJm3b7JvcQ7cYt9999xzZu5dloWEhIRYmAHeAe+Bu0wYmsAnIJM4Ae4zIVgBfhjih3EOPKHmeAr8UcQP4wroUON5zzyjVnvRtObdN2qxF655943zce5F0bz7xlXVe7EGfAe6wGpAXajwaHq6RpOzGhjohuop2yiWgSy0LhlAP6mJuwEbyQD/+w1MAYvEx6L0KtLjhKvgBfANWCYelqXHcw89TrgKTuXzV2Ap0sl/MX7oFelxwlVwaTz7DCxUKH5BOIf8lzEMmA3yOALmKxA/B3y0uE9jGHil5D4AsyOInxUOm/dllQZey/NbwI6S3wdulxCf1+wrfDvSC+kdbOCXUrQpuWlgT8nvSs4X01KTWbFn8Gwq+b4PuXbKA+CZ5O8AB46Ta3jwNxw9DoQb6TVQ3tn2MfAQ+OkwsWHM7qHyzpYH/5ZSd2js0oZDfK7pAZ5oAT2F5C+wbnxvZ0q0r+FtOw7mnuTXpYf9Tk80BeE6Ex0JzcBv+afCRlNyWk1HojLxRSaK4o3C9bYET28U8aOYOFZ4TsYhfohHwEVA83zhbPQD6vvAYypGyE3ki2ljMI6Tt9G6AQMtIqOsAd/xiY5kgHQDo6HsLNdmBxISEhKoDP8A8liUTZUC7ssAAAAASUVORK5CYII=" />
                    </svg>
                </div>
            ),
            dropdownOptions: [
                { label: "Namantran", link: "/namantran" },
                { label: "Cash Desk", link: "/cash-desk" },
                { label: "Change in Property", link: "/change-property" },
                { label: "New Property Application", link: "/digit-ui/employee/pt/PropertyLandingPage" }
            ]
        },
        {
            title: "Rental",
            icon: (
                <div style={styles.rentalIcon}>
                    <svg width="154" height="116" viewBox="0 0 154 116" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M153.587 58.0832C153.587 50.5505 151.601 43.0916 147.742 36.1323C143.883 29.173 138.226 22.8496 131.095 17.5232C123.964 12.1968 115.498 7.97161 106.181 5.08897C96.8643 2.20633 86.8784 0.722656 76.7937 0.722656C66.709 0.722657 56.723 2.20633 47.406 5.08897C38.089 7.97161 29.6233 12.1968 22.4923 17.5232C15.3614 22.8496 9.70481 29.173 5.84557 36.1323C1.98633 43.0916 -8.81631e-07 50.5505 0 58.0832L76.7937 58.0832H153.587Z" fill="#BBCCF8" fill-opacity="0.55" />
                        <g clipPath="url(#clip0_9812_150282)">
                            <path d="M45.1328 28.8893V26.056C44.4781 26.0564 43.8436 26.2835 43.3374 26.6988C42.8312 27.1141 42.4845 27.6919 42.3561 28.334L45.1328 28.8893ZM113.133 28.8893L115.909 28.334C115.781 27.6919 115.434 27.1141 114.928 26.6988C114.422 26.2835 113.788 26.0564 113.133 26.056V28.8893ZM118.799 57.2227V60.056C119.218 60.0557 119.632 59.9625 120.011 59.7831C120.39 59.6037 120.724 59.3425 120.989 59.0184C121.255 58.6943 121.445 58.3153 121.547 57.9088C121.648 57.5022 121.658 57.0782 121.576 56.6673L118.799 57.2227ZM39.4661 57.2227L36.6895 56.6673C36.6074 57.0782 36.6174 57.5022 36.7189 57.9088C36.8203 58.3153 37.0107 58.6943 37.2763 59.0184C37.5419 59.3425 37.876 59.6037 38.2547 59.7831C38.6334 59.9625 39.0471 60.0557 39.4661 60.056V57.2227ZM56.4661 74.2227H53.6328V77.056H56.4661V74.2227ZM101.799 74.2227V77.056H104.633V74.2227H101.799ZM36.6328 99.7227H121.633V94.056H36.6328V99.7227ZM42.2995 57.2227V96.8893H47.9661V57.2227H42.2995ZM110.299 57.2227V96.8893H115.966V57.2227H110.299ZM45.1328 31.7227H113.133V26.056H45.1328V31.7227ZM110.356 29.4447L116.023 57.778L121.576 56.6673L115.909 28.334L110.356 29.4447ZM118.799 54.3893H39.4661V60.056H118.799V54.3893ZM42.2428 57.778L47.9095 29.4447L42.3561 28.334L36.6895 56.6673L42.2428 57.778ZM42.2995 20.3893H115.966V14.7227H42.2995V20.3893ZM53.6328 57.2227V74.2227H59.2995V57.2227H53.6328ZM56.4661 77.056H101.799V71.3893H56.4661V77.056ZM104.633 74.2227V57.2227H98.9661V74.2227H104.633Z" fill="black" />
                        </g>
                        <defs>
                            <clipPath id="clip0_9812_150282">
                                <rect width="85" height="85" fill="white" transform="translate(36.6328 14.7227)" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            ),
            dropdownOptions: [
                { label: "View Rentals", link: "/view-rentals" },
                { label: "Add New Rental", link: "/add-rental" },
                { label: "Rental History", link: "/rental-history" },
                { label: "Payment Status", link: "/payment-status" }
            ]
        },
        {
            title: "Water",
            icon: (
                <div style={styles.waterIcon}>
                    <svg width="154" height="116" viewBox="0 0 154 116" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M153.587 58.0832C153.587 50.5505 151.601 43.0916 147.742 36.1323C143.883 29.173 138.226 22.8496 131.095 17.5232C123.964 12.1968 115.498 7.97161 106.181 5.08897C96.8643 2.20633 86.8784 0.722656 76.7937 0.722656C66.709 0.722657 56.723 2.20633 47.406 5.08897C38.089 7.97161 29.6233 12.1968 22.4923 17.5232C15.3614 22.8496 9.70481 29.173 5.84557 36.1323C1.98633 43.0916 -8.81631e-07 50.5505 0 58.0832L76.7937 58.0832H153.587Z" fill="#BBCCF8" fill-opacity="0.55" />
                        <image
                            x="31.6348"
                            y="12.7227"
                            width="90"
                            height="90"
                            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADIElEQVR4nO2Zy0tVURSHP7MalDWpJAoitZcWlYHNogc1EAp6gfSgidE/EFkDoyRoKNSwRj0MUqgEZ6GTNKGIoiCLIgqihyGUDszSjB3rxmm1rudx98Er3A82yDm/vdZvH/fZe+17oECBAmlyEmhginIE+CXtKFOMncAoMC5tVK5NCaqArwHzmTYErCXPmQe8Nsxn2luglDylGOiawHymdYk272gyzF4ALhrXz5JnbFEvrWu9wExgBnBP3RsDdpAnzAc+KoOfgMUBjfv7s9K4Pq7vpHNdGRvN8nS3Aj+V9hqTTK0xv09PoD9j6GuZJGYDb5SZRzLnszEdeKD6vAPm+DZXHkHTrIx8l00sjDXAiOrb7MnTH1bLKnEX2DhBMG3iXNQEwHnV9wewPIvW7d6t4inSTt4aCOwKscYQTWYazIo5/VyfYIybhq5RPGQ0Lm/ov3dMBa5RmipDU0d8Dhh7Q6XS1Bga5zEr1UBPoEOHobmqgj4FpiUYgOvzTMW6Yug6Avd7xGMobh3vNp7+AmPu7yE5+1SsEckRpEa8eNm5T6iErvIsyiFeEfBKxTxOijxRyXwcF0+pmI9JiSXG0uejtl9olBgul3eOqSSuwvRFj4rtcnnnskri6pq0zhKXSIGHKsk2j7G3q9iuXoqNrhI1H9T9ZfhjpYr9PoG/UMGwul/icQAlKvZwGgMYTHEAc1Xsb2kM4KW6v8LjAFap2H1JBhCG/snkIP44rGJ3kgJNEcrfpLSluET/ZYOxE/tYicqNAnEdKeAKrxcq0S0PMdtVzOekyH7jZXIVqq9CbjzH8jzSE+s1TkkNCeK4jx/6ZNedY3n+D/VAi3G9DPhiPLnbEd8Jd3i/Y/TvB5Ya+hbxEplSNS+tzpuNFy/zYrsV5ZCs7SXSKmWpbBON7jcCbDLy1Ac07VHL9xsq+KA8dWsQ1n8ibuvPYr7M2P2dt1AWAQPqy8quLFqX5H4O5ruzTBsk51BAOyDeIlEnndxBoyJEWySH874Yxt1SuTeCj4rAYSf2Tze7E3xJqZaPF50yoCFpfXLN7bDrY8YsFi8FChTgf34DECXG1oLg/GMAAAAASUVORK5CYII="
                        />
                    </svg>
                </div>
            ),
            dropdownOptions: [
                { label: "Water Bill", link: "/water-bill" },
                { label: "Usage History", link: "/usage-history" },
                { label: "Connection Request", link: "/connection-request" },
                { label: "Complaint", link: "/complaint" }
            ]
        }
    ];

    const [openDropdown, setOpenDropdown] = useState(null);

    const handleDropdownToggle = (cardIndex) => {
        // If the same card is clicked, close it. Otherwise, open the new one and close others.
        setOpenDropdown(openDropdown === cardIndex ? null : cardIndex);
    };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  console.log("module", modules)
  if (window.Digit.SessionStorage.get("PT_CREATE_EMP_TRADE_NEW_FORM")) window.Digit.SessionStorage.set("PT_CREATE_EMP_TRADE_NEW_FORM", {});

  return (
    <div
      className="main-content"
      style={{ display: "flex", flexDirection: "column", transition: "margin-left 0.3s" }}
    >
      <div className="main-content-wrapper" style={{ flex: 1 }}>
        {/* <div
          className="header"
          style={{
            height: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
            backgroundColor: "#801d46",
            color: "white",
            borderBottomLeftRadius: "25px",
            borderBottomRightRadius: "25px"
          }}
        >
          <div className="toggle-btn" id="toggle-sidebar" style={{ fontSize: "20px", cursor: "pointer", position: "absolute" }}>
            <i className="fas fa-bars"></i>
          </div>

          <div className="header-right-nav" style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
            <div className="header-actions" style={{ display: "flex", gap: "20px" }}>
              {["bell", "comment", "gift", "cog"].map((icon) => (
                <a
                  key={icon}
                  href="javascript:void(0);"
                  style={{
                    color: "#fff",
                    fontSize: "18px",
                    background: "rgba(255,255,255,0.15)",
                    padding: "8px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    width: "40px",
                    height: "40px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none"
                  }}
                >
                  <i className={`fas fa-${icon}`}></i>
                </a>
              ))}
            </div>

            <div className="user-profile" style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "20px" }}>
              <span>Hello, Samantha</span>
              <div className="avatar" style={{ width: "35px", height: "35px", borderRadius: "50%", overflow: "hidden", border: "2px solid white" }}>
                <img src="https://i.imgur.com/vT8WQEA.jpg" alt="User Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
          </div>
        </div> */}

        <div className="content-area" style={{ padding: isMobile ? "10px" : "0px", marginTop: isMobile ? "0px" : "40px" }}>
          <div className="content-header" style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", marginBottom: "20px", gap: isMobile ? "10px" : "0" }}>
            {/* <h2>Home</h2> */}
            <div style={styles.servicesGrid}>
                {services.map((service, index) => (
                    <ServiceCard
                        key={index}
                        title={service.title}
                        icon={service.icon}
                        dropdownOptions={service.dropdownOptions}
                        isDropdownOpen={openDropdown === index}
                        onToggle={handleDropdownToggle}
                        cardIndex={index}
                    />
                ))}
            </div>            {/* <div
              className="filter"
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 20px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                width: isMobile ? "100%" : "270px",
                maxWidth: "270px"
              }}
            >
              <div className="filter-container" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <i className="far fa-calendar" style={{ color: "#801d46", fontSize: "24px" }}></i>
                <div>
                  <span style={{ fontSize: "14px", color: "#333" }}>Filter Period</span>
                  <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>17 April 2025 - 21 Jul 2025</p>
                </div>
              </div>
              <i className="fas fa-chevron-down"></i>
            </div> */}
          </div>

          {/* Status Cards */}
          {/* <div
            className="status-cards home-stats-card"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
              marginBottom: "20px"
            }}
          >
            {[
              { url: "/digit-ui/employee/pt/PropertyLandingPage", icon: stateInfo?.uiImageAssets?.property, label: "Property Tax", count: 100, className: "approved", color: "#4caf50" },
              { url: `${stateInfo?.BAPURL}dashboard?type=1&accessToken=${accessToken}&refreshToken=${refreshToken}&module=marriage`, icon: stateInfo?.uiImageAssets?.rental, label: "Marriage Certificate", count: 30, className: "sendback", color: "#2196f3" },
              { url: `${stateInfo?.BAPURL}dashboard?type=4&accessToken=${accessToken}&refreshToken=${refreshToken}&module=rental`, icon: stateInfo?.uiImageAssets?.property, label: "Rental", count: 30, className: "sendback", color: "#4caf50" }

            ].map((card, index) => (
              <div key={index} className="" style={{ backgroundColor: "white", borderRadius: "8px", padding: "20px", display: "flex", alignItems: "center", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
                <div className={`card-icon ${card.className}`} style={{ maxWidth: "70px", width: "70px" }}>
                  <img src={card.icon} alt={card.label} style={{ maxWidth: "100%" }} />
                </div>
                <a
                  href={card.url}
                  // style={{ ...commonStyles.labelText }}
                  data-tip="React-tooltip"
                // data-for={`tooltip-${getModuleName}`}
                >
                  <div className="card-content" style={{ marginLeft: "20px" }}>
                    <h2 style={{ fontSize: "25px", fontWeight: "800", marginBottom: "6px" }}>{card.count}</h2>
                    <p style={{ margin: 0, fontSize: "14px", fontWeight: "500", color: card.color }}>{card.label}</p>
                  </div>
                </a>
              </div>
            ))}
          </div> */}

          {/* Chart Section */}
          {/* <div className="graph-view-area" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", marginBottom: "20px" }}>
            <div className="chart-container" style={{ backgroundColor: "white", borderRadius: "8px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "start", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
              <h2 style={{ fontSize: "18px", marginBottom: "15px" }}>Application Details</h2>
              <canvas id="applicationDetails"></canvas>

            </div>
            <div className="chart-container" style={{ backgroundColor: "white", borderRadius: "8px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "start", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
              <h2 style={{ fontSize: "18px", marginBottom: "15px" }}>Collection</h2>
              <div className="info-container" style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
                {[
                  { label: "Total Till Date", value: "₹ 12,34,567" },
                  { label: "Last 15 days", value: "₹ 12,34,567" }
                ].map((info, idx) => (
                  <div key={idx} className="info-pill" style={{ backgroundColor: "#f1f3f5", padding: "10px 16px", borderRadius: "8px", boxShadow: "0 0 5px rgba(0,0,0,0.05)", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", fontSize: "14px" }}>
                    <span style={{ color: "#555", fontWeight: "500", marginRight: "15px" }}>{info.label}</span>
                    <span style={{ fontWeight: "bold", color: "#111" }}>{info.value}</span>
                  </div>
                ))}
              </div>
              <canvas id="collectionChart"></canvas>
            </div>
          </div> */}
          {/* <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "20px", fontFamily: "Barlow" }}>
            <div
              style={{
                flex: 1,
                background: "white",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 0 8px rgba(0,0,0,0.05)"
              }}
            >
              <h3 style={{ fontWeight: "700", color: "#464255", fontSize: "20px", marginBottom: "10px" }}>
                Application Details
              </h3>
              <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{ width: 12, height: 12, backgroundColor: "#3BB85E" }} />
                  <span style={{ fontSize: "14px", color: "#333" }}>Approved</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{ width: 12, height: 12, backgroundColor: "#FFD400" }} />
                  <span style={{ fontSize: "14px", color: "#333" }}>Pending</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{ width: 12, height: 12, backgroundColor: "#EF4C60" }} />
                  <span style={{ fontSize: "14px", color: "#333" }}>Rejected</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={applicationData} barCategoryGap={20}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Approved" fill="#3BB85E" />
                  <Bar dataKey="Pending" fill="#FFD400" />
                  <Bar dataKey="Rejected" fill="#EF4C60" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div
              style={{
                flex: 1,
                background: "white",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 0 8px rgba(0,0,0,0.05)"
              }}
            >
              <h3 style={{ fontWeight: "700", color: "#464255", fontSize: "20px", marginBottom: "10px" }}>Collection</h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 600,
                  fontSize: "14px",
                  marginBottom: "10px"
                }}
              >
                <span>Total Till date: ₹ 12,34,567</span>
                <span>Last 15 days: ₹ 12,34,567</span>
              </div>
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={collectionData} barSize={40}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="mode" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value">
                    {collectionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div> */}
          {/* <div className="favorite-card">
            <div className="card-header-view" style={{ marginBottom: "15px" }}>
              <h2 style={{ color: "#464255", fontWeight: "700", fontSize: "20px", display: "flex", alignItems: "center", marginLeft: 0, marginTop: 15 }}>
                Favorites
              </h2>
            </div>

            <div
              className="action-cards"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              {filteredFavorites.map((action, index) => (
                <div
                  key={index}
                  className="action-card"
                  style={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    padding: "20px",
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
                      width: "50px",
                      height: "50px",
                      marginBottom: "10px",
                    }}
                  />
                  <a
                    href={action.url}
                    style={{
                      fontSize: "14px",
                      margin: 0,
                      color: "#333",
                      fontWeight: "500",
                      textDecoration: "none",
                    }}
                  >
                    {action.label}
                  </a>
                </div>
              ))}
            </div>

          </div> */}
        </div>
      </div>
    </div>
  );
};

export const AppHome = ({ userType, modules, getCitizenMenu, fetchedCitizen, isLoading }) => {
  if (userType === "citizen") {
    return <CitizenHome modules={modules} getCitizenMenu={getCitizenMenu} fetchedCitizen={fetchedCitizen} isLoading={isLoading} />;
  }
  return <EmployeeHome modules={modules} />;
};

const styles = {
      servicesGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px",
    },
  }


// import {
//   BackButton,
//   BillsIcon,
//   CitizenHomeCard,
//   CitizenInfoLabel,
//   FSMIcon,
//   Loader,
//   MCollectIcon,
//   OBPSIcon,
//   PGRIcon,
//   PTIcon,
//   TLIcon,
//   WSICon,
//   Card
// } from "@egovernments/digit-ui-react-components";
// import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
// import styles from "./Style";

// /*
// Feature :: Citizen All service screen cards
// */
// export const processLinkData = (newData, code, t) => {
//   const obj = newData?.[`${code}`];
//   if (obj) {
//     obj.map((link) => {
//       (link.link = link["navigationURL"]), (link.i18nKey = t(link["name"]));
//     });
//   }
//   const newObj = {
//     links: obj?.reverse(),
//     header: Digit.Utils.locale.getTransformedLocale(`ACTION_TEST_${code}`),
//     iconName: `CITIZEN_${code}_ICON`,
//   };
//   if (code === "FSM") {
//     const roleBasedLoginRoutes = [
//       {
//         role: "FSM_DSO",
//         from: "/digit-ui/citizen/fsm/dso-dashboard",
//         dashoardLink: "CS_LINK_DSO_DASHBOARD",
//         loginLink: "CS_LINK_LOGIN_DSO",
//       },
//     ];
//     //RAIN-7297
//     roleBasedLoginRoutes.map(({ role, from, loginLink, dashoardLink }) => {
//       if (Digit.UserService.hasAccess(role))
//         newObj?.links?.push({
//           link: from,
//           i18nKey: t(dashoardLink),
//         });
//       else
//         newObj?.links?.push({
//           link: "/digit-ui/citizen/login",
//           state: { role: "FSM_DSO", from },
//           i18nKey: t(loginLink),
//         });
//     });
//   }

//   return newObj;
// };
// const iconSelector = (code) => {
//   switch (code) {
//     case "PT":
//       return <PTIcon className="fill-path-primary-main" />;
//     case "WS":
//       return <WSICon className="fill-path-primary-main" />;
//     case "FSM":
//       return <FSMIcon className="fill-path-primary-main" />;
//     case "MCollect":
//       return <MCollectIcon className="fill-path-primary-main" />;
//     case "PGR":
//       return <PGRIcon className="fill-path-primary-main" />;
//     case "TL":
//       return <TLIcon className="fill-path-primary-main" />;
//     case "OBPS":
//       return <OBPSIcon className="fill-path-primary-main" />;
//     case "Bills":
//       return <BillsIcon className="fill-path-primary-main" />;
//     default:
//       return <PTIcon className="fill-path-primary-main" />;
//   }
// };
// const CitizenHome = ({ modules, getCitizenMenu, fetchedCitizen, isLoading }) => {
//   const paymentModule = modules.filter(({ code }) => code === "Payment")[0];
//   const moduleArr = modules.filter(({ code }) => code !== "Payment");
//   const moduleArray = [paymentModule, ...moduleArr];
//   const { t } = useTranslation();
//   if (isLoading) {
//     return <Loader />;
//   }

//   return (
//     <React.Fragment>
//       <div className="citizen-all-services-wrapper">
//         <BackButton />
//         <div className="citizenAllServiceGrid">
//           {moduleArray
//             .filter((mod) => mod)
//             .map(({ code }, index) => {
//               let mdmsDataObj;
//               if (fetchedCitizen) mdmsDataObj = fetchedCitizen ? processLinkData(getCitizenMenu, code, t) : undefined;
//               if (mdmsDataObj?.links?.length > 0) {
//                 return (
//                   <CitizenHomeCard
//                     header={t(mdmsDataObj?.header)}
//                     links={mdmsDataObj?.links?.filter((ele) => ele?.link)?.sort((x, y) => x?.orderNumber - y?.orderNumber)}
//                     Icon={() => iconSelector(code)}
//                     Info={
//                       code === "OBPS"
//                         ? () => (
//                           <CitizenInfoLabel
//                             style={{ margin: "0px", padding: "10px" }}
//                             info={t("CS_FILE_APPLICATION_INFO_LABEL")}
//                             text={t(`BPA_CITIZEN_HOME_STAKEHOLDER_INCLUDES_INFO_LABEL`)}
//                           />
//                         )
//                         : null
//                     }
//                     isInfo={code === "OBPS" ? true : false}
//                   />
//                 );
//               } else return <React.Fragment />;
//             })}
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };


// const EmployeeHome = ({ modules }) => {
//   const [openMenu, setOpenMenu] = useState(null); // which service is open

//   const toggleMenu = (service) => {
//     setOpenMenu(openMenu === service ? null : service);
//   };
//   const containerStyle = {
//     fontFamily: "sans-serif",
//     padding: "20px",
//     backgroundColor: "white",
//     borderRadius: "10px",
//     textAlign: "center",
//     borderRadius: "20px",
//     width: "90%",
//     margin: "auto",
//     height:"614px"
//   };

//   const headerStyle = {
//     fontFamily: 'Noto Sans',
//     fontWeight: 600,
//     fontStyle: 'normal', // 'SemiBold' is not valid; use fontWeight instead
//     fontSize: '32px',
//     lineHeight: '56px',
//     letterSpacing: '0%',
//     textAlign: 'center',
//     verticalAlign: 'middle',
//     color: '#4729A3'
//   };

//   const subHeaderStyle = {
//     fontFamily: 'Noto Sans',
//     fontWeight: 600,            // SemiBold corresponds to font-weight 600
//     fontStyle: 'normal',        // 'SemiBold' is not valid for fontStyle
//     fontSize: '16px',
//     lineHeight: '100%',         // Use string to preserve percentage
//     letterSpacing: '0px',       // 0% letter spacing = 0px
//     color: 'rgb(40, 40, 40)',
//     textAlign: "left"
//   };

//   const gridStyle = {
//     display: "grid",
//     gridTemplateColumns: "repeat(3, 1fr)",
//     gap: "20px",
//     justifyItems: "center",
//     marginBottom: "20px",
//     marginTop: "20px"
//   };

//   const cardStyle = {
//     backgroundColor: "#4729A3",
//     borderRadius: "10px",
//     padding: "10px",
//     boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//     display: "flex",
//     alignItems: "center",
//     width: "322px",
//     // maxWidth: "220px",
//     justifyContent: "space-between",
//     cursor: "pointer",
//     height: "70px"
//   };

//   const iconStyle = {
//     width: "50px",
//     height: "50px",
//     backgroundColor: "#fff",
//     padding: "5px",
//     borderRadius: "10px"
//   };

//   const buttonStyle = {
//     backgroundColor: "#F4D390",
//     border: "none",
//     padding: "7px 15px",
//     borderRadius: "20px",
//     fontFamily: 'Noto Sans',
//     fontWeight: 900,            // 'Black' corresponds to 900
//     fontStyle: 'normal',        // 'Black' is not a valid font-style
//     fontSize: '16px',
//     lineHeight: '24px',
//     letterSpacing: '0px',
//     color: '#282828'
//   };

//   const dropdownStyle = {
//     backgroundColor: "#4729A3",
//     borderRadius: "10px",
//     padding: "10px",
//     marginTop: "5px",
//     color: "#000",
//     position: "absolute",
//     width: "322px"
//   };

//   const dropdownItemStyle = {
//     backgroundColor: "#F4D390",
//     border: "none",
//     padding: "8px",
//     borderRadius: "10px",
//     margin: "5px 0",
//     width: "100%",
//     textAlign: "left",
//     cursor: "pointer",
//     fontFamily: 'Noto Sans',
//     fontWeight: 600,             // 'SemiBold' → fontWeight: 600
//     fontStyle: 'normal',         // 'SemiBold' is not a valid font-style
//     fontSize: '14px',
//     lineHeight: '100%',
//     letterSpacing: '0.48px',     // 3% of 16px font size = 0.03 * 16 = 0.48px
//     verticalAlign: 'middle',
//     color: '#282828'
//   };

//   const viewMoreButton = {
//     height: "45px",
//     width: "217px",
//     backgroundColor: "#4729A3",
//     color: "#FFFFFF",
//     borderRadius: "20px",
//     fontFamily: 'Noto Sans',
//     fontWeight: 500,            // Medium = 500
//     fontStyle: 'normal',        // 'Medium' is not a valid font-style
//     fontSize: '16px',
//     lineHeight: '24px',
//     letterSpacing: '0px',
//     textAlign: 'center',
//     verticalAlign: 'middle'
//   };

//   if (window.Digit.SessionStorage.get("PT_CREATE_EMP_TRADE_NEW_FORM")) window.Digit.SessionStorage.set("PT_CREATE_EMP_TRADE_NEW_FORM", {});


//   return (

//     <div style={styles.containerStyle}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
//         <div style={styles.headerStyle}>Online Services</div>
//         <div>
//           <input
//             type="text"
//             placeholder="🔍 Search"
//             style={{
//               backgroundColor: "#F4D390",
//               border: "1px solid #ccc",
//               padding: "8px 12px",
//               borderRadius: "8px",
//               fontSize: "14px",
//             }}
//           />
//         </div>
//       </div>
//       <div style={styles.subHeaderStyle}>
//         Welcome to Indore Municipal Corporation Portal Which Is Simple & Convenient Way For Users To Access Various Services From Anywhere At Anytime.
//       </div>

//       <div style={styles.gridStyle}>
//         {/* New Application with dropdown */}
//         <div>
//           <div style={styles.cardStyle} onClick={() => toggleMenu("New Application")}>
//             <div style={styles.iconStyle}>🏠</div>
//             <div style={styles.buttonStyle}>New Application</div>
//           </div>

//           {openMenu === "New Application" && (
//             <div style={styles.dropdownStyle}>
//               {[
//                 { label: "New Property Application", route: "/digit-ui/employee/pt/new-application" },
//                 {label: "Search Application Inbox", route: "/digit-ui/employee/pt/application-search"},
//                 { label: "Cash Desk", route: "/digit-ui/employee/pt/search" },
//                 { label: "Change In Property Details", route: "/digit-ui/employee/pt/inbox" },
//                 { label: "Track Application" },
//               ].map((item, idx) => (
//                 <div key={idx} style={styles.dropdownItemStyle}>
//                   {/* &gt; {item}
//                    */}
//                   <a
//                     href={item.route || "#"}
//                     style={{
//                       fontSize: "14px",
//                       color: "#333",
//                       cursor: "pointer",
//                       textDecoration: "none",
//                     }}
//                   >
//                   &gt; {item.label}
//                   </a>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Other services without dropdown */}
//         {[
//           { title: "Tax Payment", icon: "💰" },
//           { title: "Namantaran", icon: "📄" },
//           { title: "Track Application", icon: "📱" },
//           { title: "Other Services", icon: "🏘️" },
//           { title: "Correction", icon: "❌" },
//         ].map((service, index) => (
//           <div key={index} style={styles.cardStyle}>
//             <div style={styles.iconStyle}>{service.icon}</div>
//             <div style={styles.buttonStyle}>{service.title}</div>
//           </div>
//         ))}
//       </div>

//       <button style={styles.viewMoreButton}>View More</button>
//     </div>
//   );
// };

// export const AppHome = ({ userType, modules, getCitizenMenu, fetchedCitizen, isLoading }) => {
//   if (userType === "citizen") {
//     return <CitizenHome modules={modules} getCitizenMenu={getCitizenMenu} fetchedCitizen={fetchedCitizen} isLoading={isLoading} />;
//   }
//   return <EmployeeHome modules={modules} />;
// };