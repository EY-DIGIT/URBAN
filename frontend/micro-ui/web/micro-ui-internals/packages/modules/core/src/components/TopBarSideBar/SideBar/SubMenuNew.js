import React, { useEffect, useState } from "react";
import {
  HomeIcon,
  EditPencilIcon,
  LogoutIcon,
  Loader,
  AddressBookIcon,
  PropertyHouse,
  CaseIcon,
  CollectionIcon,
  PTIcon,
  OBPSIcon,
  PGRIcon,
  FSMIcon,
  WSICon,
  MCollectIcon,
  Phone,
  BirthIcon,
  DeathIcon,
  FirenocIcon,
  LoginIcon
} from "@egovernments/digit-ui-react-components";
import { Link, useLocation } from "react-router-dom";
import SideBarMenu from "../../../config/sidebar-menu";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import LogoutDialog from "../../Dialog/LogoutDialog";
import ChangeCity from "../../ChangeCity";

const defaultImage = "";

/* 
Feature :: Citizen Webview sidebar
*/
const Profile = ({ info, stateName, t }) => (
  <div className="profile-section">
    <div className="imageloader imageloader-loaded">
      <img className="img-responsive img-circle img-Profile" src={defaultImage} style={{ height: "42px", width: "42px" }} />
    </div>
    <div id="profile-name" className="label-container name-Profile">
      <div className="label-text" style={{
        fontFamily: "Poppins",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "100%",
        letterSpacing: "0%",
        color: "#1D1616"
      }}
      > {info?.name} </div>
    </div>
    <div id="profile-location" className="label-container loc-Profile">
      <div className="label-text" style={{
        fontFamily: "Poppins",
        fontWeight: 400,
        fontSize: "10px",
        lineHeight: "100%",
        letterSpacing: "0%",
        color: "#B9B9B9"
      }}
      > {info?.mobileNumber} </div>
    </div>
    {info?.emailId && (
      <div id="profile-emailid" className="label-container loc-Profile">
        <div className="label-text"> {info.emailId} </div>
      </div>
    )}
    <div className="profile-divider"></div>
    {window.location.href.includes("/digit-ui/employee") &&
      !window.location.href.includes("/digit-ui/employee/user/login") &&
      !window.location.href.includes("/digit-ui/employee/user/language-selection") && <ChangeCity t={t} mobileView={true} />}
  </div>
);

const IconsObject = {
  CommonPTIcon: <PTIcon className="icon" />,
  OBPSIcon: <OBPSIcon className="icon" />,
  propertyIcon: <PropertyHouse className="icon" />,
  TLIcon: <CaseIcon className="icon" />,
  PGRIcon: <PGRIcon className="icon" />,
  FSMIcon: <FSMIcon className="icon" />,
  WSIcon: <WSICon className="icon" />,
  MCollectIcon: <MCollectIcon className="icon" />,
  BillsIcon: <CollectionIcon className="icon" />,
  BirthIcon: <BirthIcon className="icon" />,
  DeathIcon: <DeathIcon className="icon" />,
  FirenocIcon: <FirenocIcon className="icon" />,
  HomeIcon: <HomeIcon className="icon" />,
  EditPencilIcon: <EditPencilIcon className="icon" />,
  LogoutIcon: <LogoutIcon className="icon" />,
  Phone: <Phone className="icon" />,
  LoginIcon: <LoginIcon className="icon" />,
};

const StaticEmployeeSideBar = ({ linkData, islinkDataLoading }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const { data: storeData, isFetched } = Digit.Hooks.useStore.getInitData();
  const { stateInfo } = storeData || {};
  const user = Digit.UserService.getUser();
  let isMobile = window.Digit.Utils.browser.isMobile();

  const [isEmployee, setisEmployee] = useState(false);
  const [isSidebarOpen, toggleSidebar] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleLogout = () => {
    toggleSidebar(false);
    setShowDialog(true);
  };
  const handleOnSubmit = () => {
    Digit.UserService.logout();
    setShowDialog(false);
  };
  const handleOnCancel = () => {
    setShowDialog(false);
  };

  if (islinkDataLoading || !isFetched) {
    return <Loader />;
  }

  const redirectToLoginPage = () => {
    history.push("/digit-ui/citizen/login");
  };
  const showProfilePage = () => {
    history.push("/digit-ui/citizen/user/profile");
  };
  const tenantId = Digit.ULBService.getCitizenCurrentTenant();
  const filteredTenantContact = storeData?.tenants.filter((e) => e.code === tenantId)[0]?.contactNumber || storeData?.tenants[0]?.contactNumber;

  let menuItems = [...SideBarMenu(t, showProfilePage, redirectToLoginPage, isEmployee, storeData, tenantId)];

  menuItems = menuItems.filter((item) => item.element !== "LANGUAGE");

  const MenuItem = ({ item }) => {
    const leftIconArray = item?.icon || item.icon?.type?.name;
    const leftIcon = leftIconArray ? IconsObject[leftIconArray] : IconsObject.BillsIcon;
    let itemComponent;
    if (item.type === "component") {
      itemComponent = item.action;
    } else {
      itemComponent = item.text;
    }
    const Item = () => (
      <span className="menu-item" {...item.populators}>
        {leftIcon}
        <div className="menu-label" style={{
          color: "#9197B3", fontFamily: "Poppins",
          fontWeight: 400,
          fontSize: "14px",
        }}>{itemComponent}</div>
      </span>
    );
    if (item.type === "external-link") {
      return (
        <a href={item.link} >
          <Item />
        </a>
      );
    }
    if (item.type === "link") {
      return (
        <Link to={item?.link}>
          <Item />
        </Link>
      );
    }

    return <Item />;
  };

  let profileItem;

  if (isFetched && user && user.access_token) {
    profileItem = <Profile info={user?.info} stateName={stateInfo?.name} t={t} />;
    menuItems = menuItems.filter((item) => item?.id !== "login-btn" && item?.id !== "help-line");
    menuItems = [
      ...menuItems,
      {
        text: t("EDIT_PROFILE"),
        element: "PROFILE",
        icon: "EditPencilIcon",
        populators: {
          onClick: showProfilePage,
        },
      },
      {
        text: t("CORE_COMMON_LOGOUT"),
        element: "LOGOUT",
        icon: "LogoutIcon",
        populators: { onClick: handleLogout },
      },
      {
        text: (
          <React.Fragment>
            {t("CS_COMMON_HELPLINE")}
            <div className="telephone" style={{ marginTop: "-10%" }}>
              <div className="link">
                <a href={`tel:${filteredTenantContact}`}>{filteredTenantContact}</a>
              </div>
            </div>
          </React.Fragment>
        ),
        element: "Helpline",
        icon: "Phone",
      },
    ];
  }

  Object.keys(linkData || {})
    ?.sort((x, y) => y.localeCompare(x))
    ?.map((key) => {
      if (linkData[key][0]?.sidebar === "digit-ui-links") {
        menuItems.splice(1, 0, {
          type: linkData[key][0]?.sidebarURL?.includes("digit-ui") ? "link" : "external-link",
          text: t(`ACTION_TEST_${Digit.Utils.locale.getTransformedLocale(key)}`),
          links: linkData[key],
          icon: linkData[key][0]?.leftIcon,
          link: linkData[key][0]?.sidebarURL,
        });
      }
    });

  const newMenuItems = [
    {
      title: "Home",
      link: "/digit-ui/employee/home",
      icon: <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.5 6.66537V16.6654C0.5 16.8864 0.587797 17.0983 0.744078 17.2546C0.900358 17.4109 1.11232 17.4987 1.33333 17.4987H5.5C5.72101 17.4987 5.93297 17.4109 6.08925 17.2546C6.24554 17.0983 6.33333 16.8864 6.33333 16.6654V10.832H9.66667V16.6654C9.66667 16.8864 9.75446 17.0983 9.91074 17.2546C10.067 17.4109 10.279 17.4987 10.5 17.4987H14.6667C14.8877 17.4987 15.0996 17.4109 15.2559 17.2546C15.4122 17.0983 15.5 16.8864 15.5 16.6654V6.66537C15.5 6.53599 15.4699 6.4084 15.412 6.29269C15.3542 6.17697 15.2702 6.07632 15.1667 5.9987L8.5 0.998698C8.35575 0.890513 8.18031 0.832031 8 0.832031C7.81969 0.832031 7.64425 0.890513 7.5 0.998698L0.833333 5.9987C0.729837 6.07632 0.645834 6.17697 0.587977 6.29269C0.530121 6.4084 0.5 6.53599 0.5 6.66537ZM2.16667 7.08203L8 2.70703L13.8333 7.08203V15.832H11.3333V9.9987C11.3333 9.77769 11.2455 9.56572 11.0893 9.40944C10.933 9.25316 10.721 9.16537 10.5 9.16537H5.5C5.27899 9.16537 5.06702 9.25316 4.91074 9.40944C4.75446 9.56572 4.66667 9.77769 4.66667 9.9987V15.832H2.16667V7.08203Z" fill="#464255" />
      </svg>,
    },
    {
      title: "Revenue Services",
      link: "/digit-ui/employee",
      icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.2" d="M12.5 7.1875C12.5 8.26494 12.072 9.29825 11.3101 10.0601C10.5483 10.822 9.51494 11.25 8.4375 11.25H5.625V3.125H8.4375C9.51494 3.125 10.5483 3.55301 11.3101 4.31488C12.072 5.07675 12.5 6.11006 12.5 7.1875Z" fill="#6B133F" />
        <path d="M16.25 6.25C16.25 6.41576 16.1842 6.57473 16.0669 6.69194C15.9497 6.80915 15.7908 6.875 15.625 6.875H13.1133C13.1203 6.97813 13.125 7.08203 13.125 7.1875C13.1236 8.43026 12.6292 9.6217 11.7505 10.5005C10.8717 11.3792 9.68026 11.8736 8.4375 11.875H7.24141L12.9203 17.0375C12.9822 17.0924 13.0325 17.159 13.0685 17.2335C13.1044 17.308 13.1252 17.3889 13.1296 17.4715C13.1341 17.5541 13.1221 17.6367 13.0944 17.7146C13.0666 17.7925 13.0237 17.8642 12.9681 17.9254C12.9125 17.9866 12.8452 18.0361 12.7703 18.0712C12.6954 18.1062 12.6143 18.126 12.5316 18.1295C12.449 18.1329 12.3665 18.12 12.2889 18.0913C12.2113 18.0626 12.1402 18.0189 12.0797 17.9625L5.20469 11.7125C5.11134 11.6277 5.04585 11.5165 5.01683 11.3938C4.98781 11.271 4.99662 11.1423 5.04209 11.0247C5.08757 10.907 5.16759 10.8059 5.27163 10.7345C5.37566 10.6632 5.49885 10.625 5.625 10.625H8.4375C9.34886 10.624 10.2226 10.2615 10.867 9.61704C11.5115 8.97261 11.874 8.09886 11.875 7.1875C11.875 7.08203 11.8695 6.97813 11.8602 6.875H5.625C5.45924 6.875 5.30027 6.80915 5.18306 6.69194C5.06585 6.57473 5 6.41576 5 6.25C5 6.08424 5.06585 5.92527 5.18306 5.80806C5.30027 5.69085 5.45924 5.625 5.625 5.625H11.4977C11.2098 5.06091 10.7717 4.5873 10.2317 4.25644C9.6917 3.92557 9.0708 3.75031 8.4375 3.75H5.625C5.45924 3.75 5.30027 3.68415 5.18306 3.56694C5.06585 3.44973 5 3.29076 5 3.125C5 2.95924 5.06585 2.80027 5.18306 2.68306C5.30027 2.56585 5.45924 2.5 5.625 2.5H15.625C15.7908 2.5 15.9497 2.56585 16.0669 2.68306C16.1842 2.80027 16.25 2.95924 16.25 3.125C16.25 3.29076 16.1842 3.44973 16.0669 3.56694C15.9497 3.68415 15.7908 3.75 15.625 3.75H11.6203C12.1779 4.26583 12.602 4.90923 12.8562 5.625H15.625C15.7908 5.625 15.9497 5.69085 16.0669 5.80806C16.1842 5.92527 16.25 6.08424 16.25 6.25Z" fill="#6B133F" />
      </svg>,
    },
    {
      title: "Citizen Services",
      link: "/digit-ui/citizen/pt/citizen-services",
      icon: ". . ."
    }
  ];

  // Custom sidebar styles
  const sidebarStyles = {
    container: {
      width: "240px",
      height: "100vh",
      backgroundColor: "#FFFFFF",
      borderRight: "1px solid #E5E7EB",
      display: "flex",
      flexDirection: "column",
    },
    menuContainer: {
      padding: "20px 0",
      flex: 1,
    },
    menuItem: {
      display: "flex",
      alignItems: "center",
      padding: "12px 24px",
      marginBottom: "4px",
      cursor: "pointer",
      textDecoration: "none",
      color: "#6B7280",
      fontSize: "14px",
      fontWeight: "500",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      transition: "all 0.2s ease",
      borderLeft: "3px solid transparent",
      fontWeight: "600"
    },
    menuItemActive: {
      backgroundColor: "#6B133F33",
      color: "#6B133F",
      borderLeftColor: "#6B133F",
      borderLeftWidth: "thick",
      borderRadius: "6px",
      fontWeight: "600"
    },
    menuItemHover: {
      backgroundColor: "#F9FAFB",
    },
    iconContainer: {
      width: "20px",
      height: "20px",
      marginRight: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      width: "16px",
      height: "16px",
      fill: "black"
    },
    iconActive: {
      width: "16px",
      height: "16px",
      fill: "#6B133F"
    }
  };

  const isActive = (link) => {
    return pathname === link;
  };

  return (
    <React.Fragment>
      <div style={sidebarStyles.container}>
        <div style={sidebarStyles.menuContainer}>
          {newMenuItems?.map((item, index) => {
            const active = isActive(item.link);
            return (
              <Link
                key={index}
                to={item.link}
                style={{
                  ...sidebarStyles.menuItem,
                  ...(active ? sidebarStyles.menuItemActive : {}),
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    Object.assign(e.target.style, sidebarStyles.menuItemHover);
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.target.style.backgroundColor = "transparent";
                  }
                }}
              >
                <div style={sidebarStyles.iconContainer}>
                  <span>{item.icon}</span>
                </div>
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>
      {showDialog && (
        <LogoutDialog
          onSelect={handleOnSubmit}
          onCancel={handleOnCancel}
          onDismiss={handleOnCancel}
        />
      )}
    </React.Fragment>
  );
};

export default StaticEmployeeSideBar;