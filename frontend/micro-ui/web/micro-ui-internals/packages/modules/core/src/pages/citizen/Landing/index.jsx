import React, { useState } from 'react';

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
    const [openDropdown, setOpenDropdown] = useState(null);

    // Initialize responsive styles
    React.useEffect(() => {
        createResponsiveStyles();
    }, []);

    const handleDropdownToggle = (cardIndex) => {
        setOpenDropdown(openDropdown === cardIndex ? null : cardIndex);
    };

    const services = [
        {
            title: "Property",
            icon: "property_1",
            dropdownOptions: [
                { label: "Namantran", link: "/namantran" },
                { label: "Cash Desk", link: "/digit-ui/employee/pt/search" },
                { label: "Change in Property", link: "/change-property" },
                { label: "New Property Application", link: "/digit-ui/citizen/pt/property/new-application" }
            ],
            citizenLink: "/digit-ui/citizen/pt/property/Actions",
            isExternal: false
        },
        {
            title: "Rental",
            icon: "rental_1",
            dropdownOptions: [],
            citizenLink: "dashboard/rental",
            isExternal: true
        },
        {
            title: "Water",
            icon: "water_1",
            dropdownOptions: [
                { label: "Water Bill", link: "/water-bill" },
                { label: "Usage History", link: "/usage-history" },
                { label: "Connection Request", link: "/connection-request" },
                { label: "Complaint", link: "/complaint" }
            ],
            citizenLink: "/digit-ui/citizen/ws-home",
            isExternal: false
        }
    ];

    return (
        <div className="revenue-services-container" style={styles.revenueServicesContainer}>
            <h1 className="main-title" style={styles.mainTitle}>Revenue Services</h1>
            <div className="services-grid" style={styles.servicesGrid}>
                {services.map((service, index) => (
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
                ))}
            </div>
        </div>
    );
};

export { ServiceCard };
export default RevenueServices;