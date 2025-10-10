import React, { useState } from 'react';
import { useTranslation } from "react-i18next";

const styles = {
    revenueServicesContainer: {
        minHeight: "100vh",
        width: "100%",
        padding: "20px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
        backgroundColor: "#F3F2F7"
    },

    mainTitle: {
        fontSize: "1.5rem",
        fontWeight: 600,
        color: "#666",
        marginBottom: "40px",
        textAlign: "left",
        paddingLeft: "20px",
    },

    servicesGrid: {
        display: "grid",
        justifyContent: "center", // Changed from space-around to center
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 300px))", // Increased minmax values
        gap: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px",
    },

    serviceCard: {
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04)',
        border: '1px solid #f0f0f0',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        maxWidth: '280px',
        width: '100%',
        margin: '0 auto',
        position: 'relative',
        height: '280px', // Fixed height
        display: 'flex',
        flexDirection: 'column',
    },

    serviceCardHover: {
        transform: "translateY(-2px)",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
    },

    cardContent: {
        padding: '32px 24px',
        flex: '1', // Take available space
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },

    iconContainer: {
        width: "80px",
        height: "80px",
        borderRadius: '50%',
        backgroundColor: '#f8f9fa',
        border: '2px solid #e9ecef',
        margin: "0 auto 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
    },

    serviceTitle: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#1a1a1a',
        margin: '0 0 8px 0',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        height: '48px', // Fixed height for 2 lines
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        lineHeight: '1.3',
    },

    viewButton: {
        background: "#6B133F",
        color: "white",
        border: "none",
        padding: "16px 0",
        borderRadius: "0 0 12px 12px",
        fontSize: "1rem",
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.2s ease",
        width: "100%",
        position: "absolute", // Position at bottom
        bottom: "0",
        left: "0",
        right: "0",
    },

    viewButtonHover: {
        background: "#724060",
    },

    viewButtonActive: {
        transform: "translateY(1px)",
    },

    dropdownMenu: {
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
        zIndex: 1000,
        border: "1px solid #e0e0e0",
        animation: "dropdownFadeIn 0.2s ease-out",
    },

    dropdownItem: {
        padding: "12px 16px",
        cursor: "pointer",
        color: "#555",
        fontWeight: 400,
        transition: "all 0.2s ease",
        borderBottom: "1px solid #f0f0f0",
        fontSize: "0.95rem",
    },

    dropdownItemLastChild: {
        borderBottom: "none",
    },

    dropdownItemHover: {
        background: "#f8f9ff",
        color: "#6B133F",
    },

    propertyIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    rentalIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    waterIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    svgIcon: {
        width: "36px",
        height: "36px",
    },
};

// Create comprehensive media query styles
const createResponsiveStyles = () => {
    const mediaQueries = `
        @keyframes dropdownFadeIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Mobile styles */
        @media (max-width: 480px) {
            .revenue-services-container {
                padding: 15px !important;
            }
            .main-title {
                font-size: 1.3rem !important;
                margin-bottom: 30px !important;
                padding-left: 10px !important;
            }
            .services-grid {
                grid-template-columns: 1fr !important;
                gap: 16px !important;
                padding: 0 10px !important;
            }
            .card-content {
                padding: 24px 16px 0px !important;
            }
            .icon-container {
                width: 70px !important;
                height: 70px !important;
            }
            .service-title {
                font-size: 1.2rem !important;
            }
        }

        /* Tablet portrait styles */
        @media (min-width: 481px) and (max-width: 768px) {
            .revenue-services-container {
                padding: 18px !important;
            }
            .main-title {
                font-size: 1.4rem !important;
                margin-bottom: 35px !important;
                padding-left: 15px !important;
            }
            .services-grid {
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 18px !important;
                max-width: 600px !important;
                padding: 0 15px !important;
            }
            .card-content {
                padding: 28px 20px 0px !important;
            }
        }

        /* Tablet landscape and small desktop styles */
        @media (min-width: 769px) and (max-width: 1024px) {
            .services-grid {
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 20px !important;
                max-width: 700px !important;
                padding: 0 20px !important;
            }
        }

        /* Medium desktop styles */
        @media (min-width: 1025px) and (max-width: 1199px) {
            .services-grid {
                grid-template-columns: repeat(3, 1fr) !important;
                gap: 20px !important;
                max-width: 900px !important;
                padding: 0 20px !important;
            }
        }

        /* Large desktop styles */
        @media (min-width: 1200px) {
            .services-grid {
                grid-template-columns: repeat(3, 1fr) !important;
                gap: 24px !important;
                max-width: 950px !important;
                padding: 0 20px !important;
            }
        }
    `;

    // Remove existing stylesheet if it exists
    const existingStylesheet = document.head.querySelector('style[data-revenue-services]');
    if (existingStylesheet) {
        existingStylesheet.remove();
    }

    // Create and append new stylesheet
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.setAttribute('data-revenue-services', 'true');
    styleSheet.innerText = mediaQueries;
    document.head.appendChild(styleSheet);
};

const ServiceCard = ({
    title,
    icon,
    citizenLink,
    isExternal,
    dropdownOptions,
    isDropdownOpen,
    onToggle,
    cardIndex
}) => {
    const { t } = useTranslation();
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    
    const getUserType = () => Digit.UserService.getType();
    console.log("userType", getUserType());
    const user = Digit.UserService.getUser();
    const accessToken = user?.access_token;
    const refreshToken = user?.refresh_token;

    const { data: { stateInfo, uiHomePage } = {}, isLoading } = Digit.Hooks.useStore.getInitData();
    const baseURL = `${stateInfo?.BAPURL}`;

    const handleViewClick = () => {
        if (getUserType() === "citizen" || title === "Rental") {
            if (isExternal) {
                window.location.href = `${baseURL}${citizenLink}?accessToken=${accessToken}&refreshToken=${refreshToken}`;
            } else {
                window.location.href = citizenLink
            }
        } else {
            onToggle(cardIndex);
        }
    };

    const cardStyle = {
        ...styles.serviceCard,
        ...(isHovered ? styles.serviceCardHover : {})
    };

    const buttonStyle = {
        ...styles.viewButton,
        ...(isHovered ? styles.viewButtonHover : {})
    };

    return (
        <div
            className="service-card"
            style={cardStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="card-content" style={styles.cardContent}>
                <div className="icon-container" style={styles.iconContainer}>
                    <img src={stateInfo?.uiImageAssets[icon]} />
                </div>
                <h3 className="service-title" style={styles.serviceTitle}>{title}</h3>
            </div>
            <button style={buttonStyle} onClick={handleViewClick}>
                View
            </button>

            {isDropdownOpen && (
                <div style={styles.dropdownMenu}>
                    {dropdownOptions.map((option, index) => (
                        <div
                            key={index}
                            style={{
                                ...styles.dropdownItem,
                                ...(index === dropdownOptions.length - 1 ? styles.dropdownItemLastChild : {}),
                                ...(hoveredItem === index ? styles.dropdownItemHover : {})
                            }}
                            onMouseEnter={() => setHoveredItem(index)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            <a href={option?.isExternal ? `${baseURL}${citizenLink}?accessToken=${accessToken}&refreshToken=${refreshToken}` : option.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                                {option?.label}
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const RevenueServices = () => {
    const { t } = useTranslation();
    const [openDropdown, setOpenDropdown] = useState(null);

    // Initialize responsive styles
    React.useEffect(() => {
        createResponsiveStyles();
    }, []);

    const handleDropdownToggle = (cardIndex) => {
        setOpenDropdown(openDropdown === cardIndex ? null : cardIndex);
    };

    // const services = [
    //     {
    //         title: t("PROPERTY"),
    //         icon: "property_1",
    //         dropdownOptions: [
    //             { label: t("NAMANTRAN"), link: "/namantran" },
    //             { label: t("CASHDESK"), link: "/digit-ui/employee/pt/search" },
    //             { label: t("CHANGEINPROPERTY"), link: "/change-property" },
    //             { label: t("NEW_PROPERTY_APPLICATION"), link: "/digit-ui/citizen/pt/property/new-application" }
    //         ],
    //         citizenLink: "/digit-ui/citizen/pt/property/Actions",
    //         isExternal: false
    //     },
    //     {
    //         title: t("RENTAL"),
    //         icon: "rental_1",
    //         dropdownOptions: [],
    //         citizenLink: "dashboard/rental",
    //         isExternal: true
    //     },
    //     {
    //         title: t("WATER"),
    //         icon: "water_1",
    //         dropdownOptions: [
    //             { label: t("WATERBILL"), link: "/water-bill" },
    //             { label: t("USAGEHISTORY"), link: "/usage-history" },
    //             { label: t("CONNECTIONREQUEST"), link: "/connection-request" },
    //             { label: t("COMPLAINT"), link: "/complaint" }
    //         ],
    //         citizenLink: "/digit-ui/citizen/ws-home",
    //         isExternal: false
    //     }
    // ];

        const SideMenuData=  {
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
          "URL":{"employee":"/digit-ui/employee",
            "citizen":"/digit-ui/citizen"
          } ,
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
              "URL": { "employee":"/revenue/property",
                "citizen":"/digit-ui/citizen/pt/property/Actions"

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
                  "billcollector"
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
              "URL": {"citizen":"https://citizenservicesdev.eydemoapp.in/dashboard/rental",
                "employee":"https://citizenservicesdev.eydemoapp.in/dashboard/rental"
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
              "URL":{"employee": "",
                "citizen":"/digit-ui/citizen/ws-home"
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
          "URL":{ "employee":"/digit-ui/employee/pt/citizen-services",
            "citizen":"/digit-ui/citizen/pt/citizen-services"

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
              "URL": "service/6",
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
              "URL": "service/5",
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
              "URL": "service/18",
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
              "URL": "service/19",
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
              "URL": "service/20",
              "other_data": "Auditorium public request",
              "metadata": "Auditorium metadata"
            }
          }
        }
      }

    }
  }
}

  const revenueService = SideMenuData?.HOME?.SIDE_MENU?.["Revenue Service"];
  const services = Object.entries(revenueService?.SUB_MENU || {})
    .filter(([_, value]) => value?.metadata?.ROLE?.includes("citizen"))
    .map(([key, value]) => {
      const subMenus = Object.entries(value?.SUB_MENU || {})
        .filter(([_, subValue]) => subValue?.ROLE?.includes("citizen"))
     

        .map(([subKey, subValue]) => ({
          label: subValue?.Name || subKey,
          link: subValue?.URL,
          icon: subValue?.Icon
        }));

      return {
        title: key,
        icon: value?.metadata?.Icon,
        dropdownOptions: subMenus,
        citizenLink: value?.metadata?.URL.citizen,
        isExternal: false
      };
    });

 console.log("SUBMENUUUUUUUUU=",services)



    return (
        <div className="revenue-services-container" style={styles.revenueServicesContainer}>
            <h1 className="main-title" style={styles.mainTitle}>{t("SIDEMENU_REVENUE_SERVICES")}</h1>
            <div className="services-grid" style={styles.servicesGrid}>
                {/* {services.map((service, index) => (
                    <ServiceCard
                        key={index}
                        title={service.title}
                        icon={service.icon}
                        citizenLink={service.citizenLink}
                        isExternal={service.isExternal}
                        dropdownOptions={service.dropdownOptions}
                        isDropdownOpen={openDropdown === index}
                        onToggle={handleDropdownToggle}
                        cardIndex={index}
                    />
                ))} */}
   {services.map((service, index) => (
        <ServiceCard
          key={index}
          title={service.title}
          icon={service.icon}
          dropdownOptions={service.dropdownOptions}
          isDropdownOpen={openDropdown === index}
          onToggle={handleDropdownToggle}
          cardIndex={index}
          citizenLink={service.citizenLink}
          isExternal={service.isExternal}
        />
      ))}
            </div>
        </div>
    );
};


export { ServiceCard };
export default RevenueServices;