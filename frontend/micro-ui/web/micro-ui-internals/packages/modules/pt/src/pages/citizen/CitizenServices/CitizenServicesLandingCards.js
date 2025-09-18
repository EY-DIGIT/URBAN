import React, { useEffect } from 'react';

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
        width: '64px',
        height: '64px',
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
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        padding: '24px',
        maxWidth: '1200px',
        margin: '0 auto'
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

// Card data configuration
const cardData = [
    {
        id: 'marriage',
        icon: "marriage_icon",
        title: 'Marriage',
        link: 'dashboard/marriage'
    },
    {
        id: 'funeralVan',
        icon: "funeral_van_icon",
        title: 'Request for funeral van',
        link: 'service/6'
    },
    {
        id: 'waterTanker',
        icon: "water_tanker_icon",
        title: 'Request For Water Tanker',
        link: 'service/5'
    },
    {
        id: 'litterCollection',
        icon: "litter_collection_icon",
        title: 'Request For Litter Collection',
        link: 'service/18'
    },
    {
        id: 'debrisCollection',
        icon: "debris_icon",
        title: 'Request For Debris Collection',
        link: 'service/19'
    },
    {
        id: 'amusementPlaces',
        icon: "amusement_icon",
        title: 'Request For Auditorium / Public Amusement Places / Public Garden',
        link: 'service/20'
    },
];

const CitizenServicesCards = () => {
    const user = Digit.UserService.getUser();
    const accessToken = user?.access_token;
    const refreshToken = user?.refresh_token;

    const { data: { stateInfo, uiHomePage } = {}, isLoading } = Digit.Hooks.useStore.getInitData();
    console.log("stateInfo==", stateInfo);

    const baseURL = `${stateInfo?.BAPURL}`;

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f9fafb',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
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