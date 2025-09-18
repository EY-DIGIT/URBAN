import React, { useState } from 'react';

const styles = {
    revenueServicesContainer: {
        minHeight: "100vh",
        width: "100%",
        background: "#f5f5f5",
        padding: "20px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
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
        justifyContent: "space-around",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px",
    },

    serviceCard: {
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "visible",
        display: "flex",
        flexDirection: "column",
    },

    serviceCardHover: {
        transform: "translateY(-2px)",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
    },

    cardContent: {
        padding: "32px 24px 0px", // Removed bottom padding
        textAlign: "center",
        position: "relative",
        flex: "1",
        display: "flex",
        flexDirection: "column",
    },

    iconContainer: {
        width: "80px",
        height: "80px",
        margin: "0 auto 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
    },

    serviceTitle: {
        fontSize: "1.25rem",
        fontWeight: 600,
        color: "#333",
        margin: "0 0 24px 0",
        flex: "1", // This will push the button to the bottom
    },

    viewButton: {
        background: "#6B133F",
        color: "white",
        border: "none",
        padding: "16px 0", // Increased padding for better coverage
        borderRadius: "0 0 12px 12px", // Only bottom corners rounded
        fontSize: "1rem",
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.2s ease",
        width: "100%",
        marginTop: "auto", // Push to bottom
        position: "relative",
    },

    viewButtonHover: {
        background: "#724060",
    },

    viewButtonActive: {
        transform: "translateY(1px)",
    },

    dropdownMenu: {
        position: "absolute",
        top: "0", // Changed from "100%" to "0"
        left: "0",
        right: "0",
        background: "white",
        borderRadius: "12px", // Changed from "0 0 12px 12px" to "12px"
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
        zIndex: 1000,
        border: "1px solid #e0e0e0",
        // Remove borderTop: "none" since we want full border now
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

    // Icons
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

    // Media queries can't directly go into a plain style object
    // If using Material-UI / Emotion / Styled-Components, you'd wrap them differently
    // but here's an indicative structure:
    responsive: {
        "@media (max-width: 768px)": {
            revenueServicesContainer: { padding: "15px" },
            mainTitle: { fontSize: "1.4rem", marginBottom: "30px", paddingLeft: "10px" },
            servicesGrid: { gridTemplateColumns: "1fr", gap: "16px", padding: "0 10px" },
            cardContent: { padding: "28px 20px 0px" },
            iconContainer: { width: "70px", height: "70px" },
            serviceTitle: { fontSize: "1.2rem" },
        },

        "@media (max-width: 480px)": {
            mainTitle: { fontSize: "1.3rem", textAlign: "left" },
            cardContent: { padding: "24px 16px 0px" },
            dropdownMenu: { left: "0", right: "0" },
        },

        "@media (min-width: 1200px)": {
            servicesGrid: { gridTemplateColumns: "repeat(3, 1fr)", maxWidth: "900px" },
        },
    },
};

// Add keyframes for dropdown animation
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
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
`;
if (!document.head.querySelector('style[data-dropdown-animation]')) {
    styleSheet.setAttribute('data-dropdown-animation', 'true');
    document.head.appendChild(styleSheet);
}

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
    // const userType = JSON.parse(sessionStorage.getItem("Digit.userType")).value;
    const getUserType = () => Digit.UserService.getType();
    console.log("userType", getUserType());
    const user = Digit.UserService.getUser();
    const accessToken = user?.access_token;
    const refreshToken = user?.refresh_token;

    const { data: { stateInfo, uiHomePage } = {}, isLoading } = Digit.Hooks.useStore.getInitData();
    // console.log("stateInfo==", stateInfo);

    const baseURL = `${stateInfo?.BAPURL}`;

    const handleViewClick = () => {
        // console.log("checking====>>", getUserType(), title, isExternal)
        // debugger;
        if (getUserType() === "citizen" || title === "Rental") {
            if (isExternal) {
                window.location.href = `${baseURL}${citizenLink}?accessToken=${accessToken}&refreshToken=${refreshToken}`;
            } else {
                window.location.href = citizenLink
            }
        }
        else {
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
            style={cardStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={styles.cardContent}>
                <div style={styles.iconContainer}>
                    <img src={stateInfo?.uiImageAssets[icon]} />
                </div>
                <h3 style={styles.serviceTitle}>{title}</h3>
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

    const handleDropdownToggle = (cardIndex) => {
        // If the same card is clicked, close it. Otherwise, open the new one and close others.
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
            dropdownOptions: [
                // { label: "View Rentals", link: "/view-rentals" },
                // { label: "Add New Rental", link: "/add-rental" },
                // { label: "Rental History", link: "/rental-history" },
                // { label: "Payment Status", link: "/payment-status" }
            ],
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
        <div style={styles.revenueServicesContainer}>
            <h1 style={styles.mainTitle}>Revenue Services</h1>
            <div style={styles.servicesGrid}>
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