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
        top: "100%",
        left: "0",
        right: "0",
        background: "white",
        borderRadius: "0 0 12px 12px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
        zIndex: 1000,
        border: "1px solid #e0e0e0",
        borderTop: "none",
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
        if (getUserType() === "citizen") {
            if(isExternal){
                window.location.href = `${baseURL}${citizenLink}?accessToken=${accessToken}&refreshToken=${refreshToken}`;
            }else{
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
                    {icon}
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
                            <a href={option?.isExternal? `${baseURL}${citizenLink}?accessToken=${accessToken}&refreshToken=${refreshToken}` : option.link} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                { label: "Cash Desk", link: "/digit-ui/employee/pt/search" },
                { label: "Change in Property", link: "/change-property" },
                { label: "New Property Application", link: "/digit-ui/citizen/pt/property/new-application" }
            ],
            citizenLink: "/digit-ui/citizen/pt/property/Actions",
            isExternal: false
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
            ],
            citizenLink: "dashboard/rental",
            isExternal: true
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
            ],
            citizenLink: "/dashboard/water",
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