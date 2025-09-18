import { ArrowDirection } from "@egovernments/digit-ui-react-components";
import React, { useState, useEffect } from "react";

const DashboardLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024 && window.innerWidth > 768);
  
  // Get tenant ID and user info
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const getUserType = () => Digit.UserService.getType();

  // API keys for different metrics
  const apiKeys = [
    "totalProperties",
    "totalPropertiesCreated", 
    "totalPropertiesForwarded",
    "totalPropertiesApproved",
    "totalPropertiesSentBack",
    "totalPropertiesRejected"
  ];

  // Create API calls for each key
  const apiResponses = {};
  apiKeys.forEach(key => {
    const { isLoading, data: response } = Digit.Hooks.dss.useGetChart({
      key: key,
      type: "metric",
      tenantId: tenantId || "mp.indore",
      filters: {
        tenantId: []
      },
      moduleLevel: "PT"
    });
    
    apiResponses[key] = { isLoading, data: response };
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1024 && window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper function to get value from API response
  const getValueFromResponse = (key, fallbackValue = 0) => {
    const response = apiResponses[key];
    if (response?.isLoading || !response?.data) return fallbackValue;
    return response.data?.responseData?.data?.[0]?.headerValue || fallbackValue;
  };

  // Check if any API is loading
  const isAnyLoading = Object.values(apiResponses).some(response => response.isLoading);

  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f4f2f9",
      fontFamily: "'Inter', sans-serif",
      fontSize: "15px",
      fontWeight: 400,
    },
    sidebar: {
      width: "270px",
      backgroundColor: "white",
      height: "100vh",
      position: "fixed",
      left: 0,
      top: 0,
      transition: "width 0.3s",
      overflowX: "hidden",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      zIndex: 1000,
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      padding: "10px 8px",
      minHeight: "70px",
    },
    logo: {
      maxWidth: "55px",
    },
    logoText: {
      marginLeft: "10px",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
    mainContent: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    header: {
      height: "70px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      backgroundColor: "#6B133F",
      color: "white",
      borderBottomLeftRadius: "25px",
      borderBottomRightRadius: "25px",
    },
    toggleBtn: {
      fontSize: "20px",
      cursor: "pointer",
      position: "absolute",
    },
    headerNav: {
      display: "flex",
      gap: "20px",
      marginLeft: "50px",
    },
    headerNavLink: {
      color: "white",
      textDecoration: "none",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    headerRightNav: {
      display: "flex",
      alignItems: "center",
      marginLeft: "auto",
    },
    headerActions: {
      display: "flex",
      gap: "20px",
    },
    headerActionIcon: {
      color: "#fff",
      fontSize: "18px",
      background: "rgba(255,255,255,0.15)",
      padding: "8px",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      textDecoration: "none",
    },
    userProfile: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginLeft: "20px",
    },
    avatar: {
      width: "35px",
      height: "35px",
      borderRadius: "50%",
      overflow: "hidden",
      border: "2px solid white",
    },
    subHeader: {
      display: "flex",
      backgroundColor: "white",
      padding: "0 20px",
      borderBottom: "1px solid #eee",
    },
    tab: {
      padding: "15px 20px",
      color: "#333",
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      borderBottom: "3px solid transparent",
    },
    tabActive: {
      borderBottomColor: "#6B133F",
      color: "#6B133F",
    },
    contentArea: {
      padding: isMobile ? "10px" : "20px",
    },
    contentHeader: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between",
      alignItems: isMobile ? "flex-start" : "center",
      marginBottom: "20px",
      gap: isMobile ? "15px" : "0",
      fontWeight: 600,
      fontSize: isMobile ? "20px" : "24px",
      color: "#444444",
      fontFamily: "'Barlow', sans-serif",
    },
    filter: {
      backgroundColor: "white",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 20px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      width: isMobile ? "100%" : "270px",
      maxWidth: "270px",
    },
    statusCards: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
      gap: "20px",
      marginBottom: "20px",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "8px",
      padding: isMobile ? "15px" : "20px",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: "center",
      textAlign: isMobile ? "center" : "left",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      opacity: isAnyLoading ? 0.7 : 1,
      transition: "opacity 0.3s",
      justifyContent: "space-around"
    },
    cardContent: {
      marginLeft: isMobile ? "0" : "20px",
      marginTop: isMobile ? "10px" : "0",
      fontFamily: "'Barlow', sans-serif",
    },
    cardContentTitle: {
      fontSize: "25px",
      fontWeight: 800,
      marginBottom: "6px",
    },
    approved: { color: "#4caf50" },
    pending: { color: "#ff9800" },
    rejected: { color: "#f44336" },
    sendback: { color: "#2196f3" },
    tileText: {
      color: "#6B133F",
      fontWeight: 600,
    },
    actionCards: {
      display: "grid",
      gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : isTablet ? "repeat(3, 1fr)" : "repeat(5, 1fr)",
      gap: "20px",
      marginBottom: "20px",
    },
    actionCard: {
      backgroundColor: "white",
      borderRadius: "8px",
      padding: isMobile ? "15px" : "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      justifyContent: "space-between",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      transition: "transform 0.2s",
      minHeight: isMobile ? "120px" : "auto",
      fontFamily: "'Barlow', sans-serif",
    },
    actionIcon: {
      width: "50px",
      height: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "32px",
      marginBottom: "10px",
      color: "#333",
    },
    footer: {
      backgroundColor: "#6B133F",
      color: "white",
      padding: "15px 20px",
      textAlign: "center",
      marginTop: "40px",
    },
    loadingSpinner: {
      display: "inline-block",
      width: "20px",
      height: "20px",
      border: "2px solid #f3f3f3",
      borderTop: "2px solid #6B133F",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    }
  };

  const userInfo = Digit.UserService.getUser();
  const { data: { stateInfo, uiHomePage } = {}, isLoading } = Digit.Hooks.useStore.getInitData();
  const userRoles = userInfo?.info?.roles?.map((roleData) => roleData?.code);
  const billCollectorRoles = ["PT_CEMP", "PT_FIELD_INSPECTOR"];
  const ARORoles = ["PT_APPROVER"];

  const isBillCollector = billCollectorRoles.some(role => userRoles.includes(role));
  const isARO = ARORoles.some(role => userRoles.includes(role));

  // Log API responses for debugging
  console.log("API Responses:", apiResponses);

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      
      <div style={styles.mainContent}>
        <div style={styles.contentArea}>
          <div style={styles.contentHeader}>
            <h2>Overview</h2>
            {isAnyLoading && (
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#666" }}>
                <div style={styles.loadingSpinner}></div>
                Loading data...
              </div>
            )}
          </div>

          {/* Status Cards */}
          <div style={styles.statusCards}>
            {[
              {
                label: "Total Applied", 
                value: getValueFromResponse("totalProperties", 100), 
                key: "totalProperties",
                icon: "total_applied",
                style: styles.tileText
              },
              {
                label: "Created", 
                value: getValueFromResponse("totalPropertiesCreated", 50), 
                key: "totalPropertiesCreated",
                icon: "created",
                style: styles.tileText
              },
              {
                label: "Forwarded", 
                value: getValueFromResponse("totalPropertiesForwarded", 20), 
                key: "totalPropertiesForwarded",
                icon: "forwarded",
                style: styles.tileText
              },
              {
                label: "Approved", 
                value: getValueFromResponse("totalPropertiesApproved", 100), 
                key: "totalPropertiesApproved",
                icon: "approved_1",
                style: styles.tileText
              },
              {
                label: "Send Back", 
                value: getValueFromResponse("totalPropertiesSentBack", 30), 
                key: "totalPropertiesSentBack",
                icon: "sent_back",
                style: styles.tileText
              },
              {
                label: "Rejected", 
                value: getValueFromResponse("totalPropertiesRejected", 30), 
                key: "totalPropertiesRejected",
                icon: "rejected_1",
                style: styles.tileText
              },
            ].map((card) => (
              <div style={styles.card} key={card.key}>
                <div>
                  <img src={stateInfo?.uiImageAssets[card?.icon]}/>
                </div>
                <div style={styles.cardContent}>
                  <h2 style={styles.cardContentTitle}>
                    {apiResponses[card.key]?.isLoading ? (
                      <div style={styles.loadingSpinner}></div>
                    ) : (
                      card.value
                    )}
                  </h2>
                  <p style={card.style}>{card.label}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div style={styles.contentHeader}>
            <h2>Actions</h2>
          </div>
          
          {/* Action Cards */}
          <div style={styles.actionCards}>
            {[
              {
                image: "new_application",
                text: "New Property Application Form",
                link: "/digit-ui/employee/pt/new-application",
              },
              {
                image: "file_search",
                text: "Track Application",
                link: "/digit-ui/employee/pt/application-search",
              },
            ].map((card) => (
              (isBillCollector || card.text !== "New Property Application Form") &&
              <div style={styles.actionCard} key={card.text}>
                <span><img src={stateInfo?.uiImageAssets[card?.image]}/></span>
                <p>
                  <a href={card.link}>{card.text}</a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;