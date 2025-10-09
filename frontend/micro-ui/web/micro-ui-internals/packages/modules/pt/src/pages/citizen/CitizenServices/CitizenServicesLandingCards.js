import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";

const Card = ({
    icon,
    title,
    subtitle,
    link,
    onClick,
    customStyles = {}
}) => {
    const cardStyles = {
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
        ...customStyles
    };

    const cardHoverStyles = {
        ':hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)'
        }
    };

    const iconContainerStyles = {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: '#f8f9fa',
        border: '2px solid #e9ecef',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 24px auto',
        fontSize: '24px'
    };

    const titleStyles = {
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
    };

    const buttonStyle = {
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
    };

    const [isHovered, setIsHovered] = React.useState(false);

    const finalCardStyles = {
        ...cardStyles,
        ...(isHovered ? {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)'
        } : {})
    };

    const content = {
        padding: '32px 24px',
        flex: '1', // Take available space
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }

    return (
        <a href={link} style={{ textDecoration: 'none' }} >
            <div
                style={finalCardStyles}
                onClick={onClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div style={content}>
                    <div style={iconContainerStyles}>
                        <img src={icon} />
                    </div>
                    <h3 style={titleStyles}>{title}</h3>
                </div>
                <button style={buttonStyle} onClick={() => window.location.href = link}>
                    View
                </button>
            </div>
        </a >
    );
};

// Container for responsive grid
const CardContainer = ({ children }) => {
    const containerStyles = {
        display: "grid",
        justifyContent: "center", // Changed from space-around to center
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 300px))", // Increased minmax values
        gap: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px",
    };

    // Responsive adjustments
    const responsiveStyles = {
        '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr',
            gap: '16px',
            padding: '16px'
        }
    };

    return (
        <div style={containerStyles}>
            {children}
        </div>
    );
};

const CitizenServicesCards = () => {
    const { t } = useTranslation();
    const user = Digit.UserService.getUser();
    const accessToken = user?.access_token;
    const refreshToken = user?.refresh_token;

    // old menu code

    // Card data configuration
    // const cardData = [
    //     {
    //         id: 'marriage',
    //         icon: "marriage_icon",
    //         title: t("MARRIAGE"),
    //         link: 'dashboard/marriage'
    //     },
    //     {
    //         id: 'funeralVan',
    //         icon: "funeral_van_icon",
    //         title: t("REQUEST_FOR_FUNERAL_VAN"),
    //         link: 'service/6'
    //     },
    //     {
    //         id: 'waterTanker',
    //         icon: "water_tanker_icon",
    //         title: t("REQUEST_FOR_WATER_TANKER"),
    //         link: 'service/5'
    //     },
    //     {
    //         id: 'litterCollection',
    //         icon: "litter_collection_icon",
    //         title: t("REQUEST_FOR_LITTER_COLLECTION"),
    //         link: 'service/18'
    //     },
    //     {
    //         id: 'debrisCollection',
    //         icon: "debris_icon",
    //         title: t("REQUEST_FOR_DEBRIS_COLLECTION"),
    //         link: 'service/19'
    //     },
    //     {
    //         id: 'amusementPlaces',
    //         icon: "amusement_icon",
    //         title: t("REQUEST_FOR_AUDITORIUM") + t("PUBLIC_AMUSEMENT_PLACES"),
    //         link: 'service/20'
    //     },
    // ];

    const { data: { stateInfo, uiHomePage } = {}, isLoading } = Digit.Hooks.useStore.getInitData();
    console.log("stateInfo==", stateInfo);

    const baseURL = `${stateInfo?.BAPURL}`;

    const styles = {
        mainTitle: {
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#666",
            marginBottom: "40px",
            textAlign: "left",
            paddingLeft: "20px",
        },
    }

// added new code from here

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
            "Bill_Collector_Rental"
          ],
          "Icon": "revenueIcon",
          "URL": "/revenue-service",
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
              
              ],
              "Icon": "property_1",
              "URL": "/revenue/property",
              "other_data": "Property related services",
              "matadata": "Property metadata"
            },
            "SUB_MENU": {
              "Namantran": {
                "Name": "Namantran",
                "ROLE": [
                  "billcollector",
                  "ARO"
                ],
                "URL": "/namantran",
                "Icon": "namantranIcon"
              },
              "cashDesk": {
                "Name": "CashDesk",
                "ROLE": [
                  "billcollector"
                ],
                "URL": "/digit-ui/employee/pt/search",
                "Icon": "cashDesk"
              },
              "change_in_property": {
                "Name": "Change in property",
                "ROLE": [
                  "billcollector"
                ],
                "URL": "/change-property",
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
                "EMPLOYEE",
                "BILL_COLLECTOR_RENTAL",
                "ARO_RENTAL",
                "DC_RENTAL",
                "Bill_Collector_Rental",
                "CITIZEN"
              ],
              "Icon": "rental_1",
              "URL": "",
              "other_data": "Rental services",
              "matadata": "Rental metadata"
            }
          },
          "Water": {
            "metadata": {
              "ROLE": [
                "SUPERUSER",
                "EMPLOYEE",
                "WS_CLERK",
                "WS_APPROVER",
                "WS_FIELD_INSPECTOR",
                "WS_DOC_VERIFIER",
                "WS_CEMP",
                "CITIZEN"
              ],
              "Icon": "water_1",
              "URL": "",
              "other_data": "Water services",
              "matadata": "Water metadata"
            }
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
          "Icon": "citizenIcon",
          "URL": "/citizen-service",
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


const citizenSubMenu = SideMenuData?.HOME?.SIDE_MENU?.[localStorage.getItem("nameIndex")]?.SUB_MENU || {};


const cardData = Object.entries(citizenSubMenu).map(([key, value]) => {
  const meta = value.metadata || {};
  return {
    id: key.replace(/\s+/g, '_').toLowerCase(),
    icon: meta.Icon || "",
    title: key,
    link: meta.URL || "#",
  };
});


    return (
        <div style={{
            minHeight: '100vh',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            backgroundColor: "#F3F2F7"
        }}>
            <h1 className="main-title" style={styles.mainTitle}>Citizen Services</h1>
            <CardContainer>
                {cardData.map((card) => (
                    <Card
                        key={card.id}
                        icon={stateInfo?.uiImageAssets[card.icon]}
                        title={card.title}
                        subtitle={card.subtitle}
                        link={`${baseURL}${card.link}?accessToken=${accessToken}&refreshToken=${refreshToken}`}
                    />
                ))}
            </CardContainer>
        </div>
    );
};

export default CitizenServicesCards;