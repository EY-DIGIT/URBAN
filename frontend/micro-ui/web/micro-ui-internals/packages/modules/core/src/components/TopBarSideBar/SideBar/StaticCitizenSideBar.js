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

const StaticCitizenSideBar = ({ linkData, islinkDataLoading }) => {
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

    // old code menu item

  // const newMenuItems = [
  //   {
  //     title: t("SIDEMENU_HOME"),
  //     link: "/digit-ui/citizen/home",
  //     icon: "home_selected_1",
  //     selectedIcon: "home_selected"
  //   },
  //   {
  //     title: t("SIDEMENU_REVENUE_SERVICES"),
  //     link: "/digit-ui/citizen",
  //     icon: "revenue",
  //     selectedIcon: "revenue_selected"
  //   },
  //   {
  //     title: t("SIDEMENU_CITIZEN_SERVICES"),
  //     link: "/digit-ui/citizen/pt/citizen-services",
  //     icon: "citizen",
  //     selectedIcon: "citizen_selected"
  //   }
  // ];


  // new code added

  const SideMenuData = {
    "HOME": {
      "SIDE_MENU": {
        "Revenue Service": {
          "metadata": {
            "ROLE": [
              "SUPERUSER",
              "employee",
              "BILL_COLLECTOR_RENTAL",
              "ARO_RENTAL",
              "DC_RENTAL",
              "Bill_Collector_Rental",
              "citizen"
            ],
            "Icon": "revenue",
            "URL": {
              "employee": "/digit-ui/employee",
              "citizen": "/digit-ui/citizen"
            },
            "other_data": "Additional metadata for revenue services",
            "metadata": "Metadata for revenue"
          },
          "SUB_MENU": {
            "Property": {
              "metadata": {
                "ROLE": [
                  "SUPERUSER",
                  "employee",
                  "BILL_COLLECTOR_RENTAL",
                  "ARO_RENTAL",
                  "DC_RENTAL",
                  "Bill_Collector_Rental",
                  "citizen"

                ],
                "Icon": "property_1",
                "URL": {
                  "employee": "/revenue/property",
                  "citizen": "/digit-ui/citizen/pt/property/Actions"

                },
                "other_data": "Property related services",
                "matadata": "Property metadata"
              },
              "SUB_MENU": {
                "Namantran": {
                  "Name": "Namantran",
                  "ROLE": [
                    "billcollector",
                    "ARO",
                    "employee"
                  ],
                  "URL": "/namantran",
                  "Icon": "namantranIcon"
                },
                "cashDesk": {
                  "Name": "CashDesk",
                  "ROLE": [

                    "employee"
                  ],
                  "URL": "/digit-ui/employee/pt/search",
                  "Icon": "cashDesk"
                },
                "change_in_property": {
                  "Name": "Change in property",
                  "ROLE": [
                    "billcollector",
                    "employee"

                  ],
                  "URL": "/digit-ui/employee/pt/SearchChangePropertyApp",
                  "Icon": "changeIcon"
                },
                "New_Property": {
                  "Name": "New Property",
                  "ROLE": [
                    "billcollector",
                    "employee"
                  ],
                  "URL": "/digit-ui/employee/pt/PropertyLandingPage",
                  "Icon": "newPropertyIcon"
                }
              }
            },
            "Rental": {
              "metadata": {
                "ROLE": [
                  "SUPERUSER",
                  "employee",
                  "BILL_COLLECTOR_RENTAL",
                  "ARO_RENTAL",
                  "DC_RENTAL",
                  "Bill_Collector_Rental",
                  "citizen"
                ],
                "Icon": "rental_1",
                "URL": {
                  "citizen": "dashboard/rental",
                  "employee": "dashboard/rental"
                },
                "other_data": "Rental services",
                "matadata": "Rental metadata"
              },
              "SUB_MENU": {}
            },
            "Water": {
              "metadata": {
                "ROLE": [
                  "SUPERUSER",
                  "employee",
                  "WS_CLERK",
                  "WS_APPROVER",
                  "WS_FIELD_INSPECTOR",
                  "WS_DOC_VERIFIER",
                  "WS_CEMP",
                  "citizen"
                ],
                "Icon": "water_1",
                "URL": {
                  "employee": "",
                  "citizen": "/digit-ui/citizen/ws-home"
                },
                "other_data": "Water services",
                "matadata": "Water metadata"
              },
              "SUB_MENU": {}
            }
          }
        },
        "Citizen Service": {
          "metadata": {
            "ROLE": [
              "citizen",
              "SUPERUSER",
              "FSM_CREATOR_EMP",
              "FSM_EDITOR_EMP",
              "FSM_VIEW_EMP",
              "FSM_ADMIN",
              "FSM_DSO",
              "FSM_EMP_FSTPO",
              "FSM_COLLECTOR"
            ],
            "Icon": "citizen",
            "URL": {
              "employee": "/digit-ui/employee/pt/citizen-services",
              "citizen": "/digit-ui/citizen/pt/citizen-services"

            },
            "other_data": "Citizen related requests",
            "metadata": "Citizen metadata"
          },
          "SUB_MENU": {
            "Marriage": {
              "metadata": {
                "ROLE": [
                  "citizen",
                  "REGISTRAR"
                ],
                "Icon": "marriage_icon",
                "URL": "dashboard/marriage",
                "other_data": "Marriage registration",
                "metadata": "Marriage metadata"
              }
            },
            "Request for Funeral van": {
              "metadata": {
                "ROLE": [
                  "citizen",
                  "FSM_CREATOR_EMP",
                  "FSM_EDITOR_EMP",
                  "FSM_ADMIN",
                  "FSM_DSO",
                  "FSM_EMP_FSTPO"
                ],
                "Icon": "funeral_van_icon",
                "URL": "dashboard/citizen-services?service=6",
                "other_data": "Funeral van request",
                "metadata": "Funeral metadata"
              }
            },
            "Request for Water Tanker": {
              "metadata": {
                "ROLE": [
                  "citizen",
                  "WS_CLERK",
                  "WS_APPROVER",
                  "WS_FIELD_INSPECTOR",
                  "WS_DOC_VERIFIER",
                  "WS_CEMP"
                ],
                "Icon": "water_tanker_icon",
                "URL": "dashboard/citizen-services?service=5",
                "other_data": "Water tanker request",
                "metadata": "Tanker metadata"
              }
            },
            "Request for Litter Connection": {
              "metadata": {
                "ROLE": [
                  "citizen",
                  "SW_CLERK",
                  "SW_APPROVER",
                  "SW_FIELD_INSPECTOR",
                  "SW_DOC_VERIFIER",
                  "SW_CEMP"
                ],
                "Icon": "litter_collection_icon",
                "URL": "dashboard/citizen-services?service=18",
                "other_data": "Litter connection request",
                "metadata": "Litter metadata"
              }
            },
            "Request for Debris Collection": {
              "metadata": {
                "ROLE": [
                  "citizen",
                  "FSM_CREATOR_EMP",
                  "FSM_EDITOR_EMP",
                  "FSM_ADMIN",
                  "FSM_DSO",
                  "FSM_EMP_FSTPO"
                ],
                "Icon": "debris_icon",
                "URL": "dashboard/citizen-services?service=19",
                "other_data": "Debris collection request",
                "metadata": "Debris metadata"
              }
            },
            "Request for Auditorium Public": {
              "metadata": {
                "Name": "Request for Auditorium Public",
                "ROLE": [
                  "citizen",
                  "FSM_CREATOR_EMP",
                  "FSM_EDITOR_EMP",
                  "FSM_ADMIN",
                  "FSM_DSO",
                  "FSM_EMP_FSTPO"
                ],
                "Icon": "amusement_icon",
                "URL": "dashboard/citizen-services?service=20",
                "other_data": "Auditorium public request",
                "metadata": "Auditorium metadata"
              }
            }
          }
        }

      }
    }
  }

  const isActive = (link) => {
    return pathname === link;
  };

const homeSideMenu = SideMenuData?.HOME?.SIDE_MENU || {};

const filteredMenuKeys = ["Revenue Service", "Citizen Service"];

const newMenuItems = [
  {
    id: "Revenue Service",
    title: t("SIDEMENU_HOME"),
    link: "/digit-ui/citizen/home",
    icon: "home_selected_1",
    selectedIcon: "home_selected",
  },
  ...Object.entries(homeSideMenu)
    .filter(([key]) => filteredMenuKeys.includes(key))
    .map(([key, value]) => {
      const meta = value.metadata || {};
    

      return {
        id: key,
        title: key,
        link: meta.URL.citizen||"", 
        icon: meta.Icon || "",
        selectedIcon: meta.Icon ? `${meta.Icon}_selected` : "",
        subMenu: value.SUB_MENU || null,
      };
    }),
];

const handleClick = (id) => {

  localStorage.setItem("nameIndex", id);

};
// useEffect(()=>{
//   handleClick(newMenuItems[0]?.id);
// },[])

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


  return (
    <React.Fragment>
      <div style={sidebarStyles.container}>
        <div style={sidebarStyles.menuContainer}>

          {/* old code */}

          {/* {newMenuItems?.map((item, index) => {
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
                  <span><img src={stateInfo?.uiImageAssets[active ? item?.selectedIcon : item.icon]} /></span>
                </div>
                {item.title}
              </Link>
            );
          })} */}

            {newMenuItems.map((item) => {
              const active = isActive(item.link);
          
              return (
                <div key={item.id}  onClick={() => handleClick(item.id)}>
                  <Link
                    to={item.link}
                   
                    style={{
                      ...sidebarStyles.menuItem,
                      ...(active ? sidebarStyles.menuItemActive : {}),
                    }}
                    onMouseEnter={(e) => {
                      if (!active) Object.assign(e.target.style, sidebarStyles.menuItemHover);
                    }}
                    onMouseLeave={(e) => {
                      if (!active) e.target.style.backgroundColor = "transparent";
                    }}
                  >
                    <div style={sidebarStyles.iconContainer}>
                      <span>
                        <img
                          src={stateInfo?.uiImageAssets[active ? item.selectedIcon : item.icon]}
                          alt={item.id}
                        />
                      </span>
                    </div>
                    {item.title}
                  </Link>
          
             
                </div>
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

export default StaticCitizenSideBar;