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
      transition: "opacity 0.3s"
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
                icon: <svg
                    width="116"
                    height="115"
                    viewBox="0 0 116 115"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M115.103 57.3606C115.103 49.8279 113.614 42.3689 110.722 35.4096C107.83 28.4503 103.591 22.1269 98.2465 16.8005C92.9023 11.4741 86.5579 7.24895 79.5754 4.36631C72.593 1.48367 65.1092 0 57.5514 0C49.9937 0 42.5099 1.48368 35.5275 4.36632C28.545 7.24896 22.2006 11.4741 16.8564 16.8005C11.5123 22.127 7.27307 28.4503 4.38084 35.4096C1.48861 42.3689 0 49.8279 0 57.3606H57.5515H115.103Z"
                      fill="#BBCCF8"
                      fillOpacity="0.55"
                    />
                    <path
                      d="M54.1824 20.1586C55.1749 19.5294 56.3258 19.1953 57.5009 19.1953C58.676 19.1953 59.827 19.5294 60.8194 20.1586L90.5092 38.9861C91.3913 39.5453 92.1178 40.3184 92.6212 41.2336C93.1246 42.1487 93.3885 43.1762 93.3885 44.2207C93.3885 45.2651 93.1246 46.2926 92.6212 47.2078C92.1178 48.1229 91.3913 48.896 90.5092 49.4553L60.8194 68.2828C59.827 68.912 58.676 69.246 57.5009 69.246C56.3258 69.246 55.1749 68.912 54.1824 68.2828L24.4926 49.4553C23.6105 48.896 22.884 48.1229 22.3806 47.2078C21.8772 46.2926 21.6133 45.2651 21.6133 44.2207C21.6133 43.1762 21.8772 42.1487 22.3806 41.2336C22.884 40.3184 23.6105 39.5453 24.4926 38.9861L54.1824 20.1586ZM57.9755 24.6459C57.8336 24.5558 57.669 24.5079 57.5009 24.5079C57.3328 24.5079 57.1682 24.5558 57.0263 24.6459L27.3365 43.4734C27.2107 43.5533 27.1072 43.6637 27.0354 43.7944C26.9636 43.925 26.926 44.0716 26.926 44.2207C26.926 44.3697 26.9636 44.5164 27.0354 44.647C27.1072 44.7776 27.2107 44.888 27.3365 44.968L57.0263 63.7955C57.1682 63.8856 57.3328 63.9334 57.5009 63.9334C57.669 63.9334 57.8336 63.8856 57.9755 63.7955L87.6653 44.968C87.7911 44.888 87.8947 44.7776 87.9664 44.647C88.0382 44.5164 88.0758 44.3697 88.0758 44.2207C88.0758 44.0716 88.0382 43.925 87.9664 43.7944C87.8947 43.6637 87.7911 43.5533 87.6653 43.4734L57.9755 24.6459Z"
                      fill="black"
                    />
                    <path
                      d="M21.6129 58.6493C21.7997 58.3547 22.0426 58.0997 22.3279 57.899C22.6132 57.6982 22.9352 57.5556 23.2756 57.4793C23.616 57.403 23.968 57.3945 24.3117 57.4543C24.6554 57.514 24.9839 57.6409 25.2786 57.8277L57.0261 77.962C57.1679 78.0521 57.3326 78.1 57.5006 78.1C57.6687 78.1 57.8333 78.0521 57.9752 77.962L89.7227 57.8277C90.0174 57.6407 90.3459 57.5136 90.6897 57.4536C91.0335 57.3936 91.3857 57.4019 91.7262 57.4781C92.0668 57.5542 92.389 57.6967 92.6745 57.8973C92.96 58.098 93.2031 58.3529 93.3901 58.6476C93.5771 58.9422 93.7042 59.2708 93.7642 59.6146C93.8242 59.9583 93.8158 60.3105 93.7397 60.6511C93.6636 60.9916 93.5211 61.3138 93.3204 61.5993C93.1198 61.8848 92.8649 62.128 92.5702 62.315L60.8192 82.4493C59.8267 83.0785 58.6758 83.4126 57.5006 83.4126C56.3255 83.4126 55.1746 83.0785 54.1821 82.4493L22.4311 62.315C21.8366 61.9373 21.4164 61.3389 21.263 60.6515C21.1096 59.9641 21.2355 59.244 21.6129 58.6493Z"
                      fill="black"
                    />
                    <path
                      d="M21.6129 72.8134C21.7997 72.5188 22.0426 72.2638 22.3279 72.063C22.6132 71.8623 22.9352 71.7197 23.2756 71.6434C23.616 71.5671 23.968 71.5586 24.3117 71.6183C24.6554 71.6781 24.9839 71.805 25.2786 71.9917L57.0261 92.1261C57.1679 92.2162 57.3326 92.264 57.5006 92.264C57.6687 92.264 57.8333 92.2162 57.9752 92.1261L89.7227 71.9917C90.3178 71.6141 91.0385 71.4884 91.7262 71.6422C92.414 71.7959 93.0125 72.2166 93.3901 72.8116C93.7677 73.4067 93.8935 74.1274 93.7397 74.8151C93.5859 75.5029 93.1653 76.1014 92.5702 76.479L60.8192 96.6134C59.8267 97.2426 58.6758 97.5767 57.5006 97.5767C56.3255 97.5767 55.1746 97.2426 54.1821 96.6134L22.4311 76.479C21.8366 76.1013 21.4164 75.503 21.263 74.8156C21.1096 74.1282 21.2355 73.408 21.6129 72.8134Z"
                      fill="black"
                    />
                  </svg>,
                style: styles.tileText
              },
              {
                label: "Created", 
                value: getValueFromResponse("totalPropertiesCreated", 50), 
                key: "totalPropertiesCreated",
                icon: <svg width="116" height="115" viewBox="0 0 116 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M115.103 57.3606C115.103 49.8279 113.614 42.3689 110.722 35.4096C107.83 28.4503 103.591 22.1269 98.2465 16.8005C92.9023 11.4741 86.5579 7.24895 79.5754 4.36631C72.593 1.48367 65.1092 0 57.5514 0C49.9937 0 42.5099 1.48368 35.5275 4.36632C28.545 7.24896 22.2006 11.4741 16.8564 16.8005C11.5123 22.127 7.27307 28.4503 4.38084 35.4096C1.48861 42.3689 0 49.8279 0 57.3606H57.5515H115.103Z" fill="#BBCCF8" fillOpacity="0.55"/>
                  <path d="M86.4375 42.5625H65.1875V21.3125H33.3125V85.0625H86.4375V42.5625ZM84.2381 37.25L70.5 23.5119V37.25H84.2381ZM30.6562 16H70.5L91.75 37.25V87.7188C91.75 88.4232 91.4701 89.0989 90.972 89.597C90.4739 90.0952 89.7982 90.375 89.0938 90.375H30.6562C29.9518 90.375 29.2761 90.0952 28.778 89.597C28.2799 89.0989 28 88.4232 28 87.7188V18.6562C28 17.9518 28.2799 17.2761 28.778 16.778C29.2761 16.2799 29.9518 16 30.6562 16ZM57.2188 58.5V47.875H62.5312V58.5H73.1562V63.8125H62.5312V74.4375H57.2188V63.8125H46.5938V58.5H57.2188Z" fill="black"/>
                </svg>,
                style: styles.tileText
              },
              {
                label: "Forwarded", 
                value: getValueFromResponse("totalPropertiesForwarded", 20), 
                key: "totalPropertiesForwarded",
                icon: <svg width="116" height="115" viewBox="0 0 116 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M115.103 57.3606C115.103 49.8279 113.614 42.3689 110.722 35.4096C107.83 28.4503 103.591 22.1269 98.2465 16.8005C92.9023 11.4741 86.5579 7.24895 79.5754 4.36631C72.593 1.48367 65.1092 0 57.5514 0C49.9937 0 42.5099 1.48368 35.5275 4.36632C28.545 7.24896 22.2006 11.4741 16.8564 16.8005C11.5123 22.127 7.27307 28.4503 4.38084 35.4096C1.48861 42.3689 0 49.8279 0 57.3606L57.5515 57.3606H115.103Z" fill="#BBCCF8" fillOpacity="0.55"/>
                  <g clipPath="url(#clip0_10116_96863)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M28.5829 18.4141H22.9162V92.0807H28.5829V18.4141ZM86.9099 58.0807L69.0769 75.9081L73.0889 79.9201L97.7559 55.2474L73.0889 30.5747L69.0769 34.5867L86.9099 52.4141H34.2495V58.0807H86.9099Z" fill="black"/>
                  </g>
                </svg>,
                style: styles.tileText
              },
              {
                label: "Approved", 
                value: getValueFromResponse("totalPropertiesApproved", 100), 
                key: "totalPropertiesApproved",
                icon: <svg width="116" height="115" viewBox="0 0 116 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M115.103 57.3606C115.103 49.8279 113.614 42.3689 110.722 35.4096C107.83 28.4503 103.591 22.1269 98.2465 16.8005C92.9023 11.4741 86.5579 7.24895 79.5754 4.36631C72.593 1.48367 65.1092 0 57.5514 0C49.9937 0 42.5099 1.48368 35.5275 4.36632C28.545 7.24896 22.2006 11.4741 16.8564 16.8005C11.5123 22.127 7.27307 28.4503 4.38084 35.4096C1.48861 42.3689 0 49.8279 0 57.3606L57.5515 57.3606H115.103Z" fill="#BBCCF8" fillOpacity="0.55"/>
                  <path d="M95.2856 73.5825L74.3438 94.562L64.23 84.4106L67.6138 81.0269L74.3438 87.7192L91.9019 70.1987L95.2856 73.5825ZM62.3125 43.0156V23.7656H28.625V91.1406H62.3125V95.9531H23.8125V18.9531H65.7339L86.375 39.5942V67.0781L81.5625 71.8906V43.0156H62.3125ZM67.125 38.2031H78.1411L67.125 27.187V38.2031Z" fill="black"/>
                </svg>,
                style: styles.tileText
              },
              {
                label: "Send Back", 
                value: getValueFromResponse("totalPropertiesSentBack", 30), 
                key: "totalPropertiesSentBack",
                icon: <svg width="116" height="115" viewBox="0 0 116 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M115.103 57.3606C115.103 49.8279 113.614 42.3689 110.722 35.4096C107.83 28.4503 103.591 22.1269 98.2465 16.8005C92.9023 11.4741 86.5579 7.24895 79.5754 4.36631C72.593 1.48367 65.1092 0 57.5514 0C49.9937 0 42.5099 1.48368 35.5275 4.36632C28.545 7.24896 22.2006 11.4741 16.8564 16.8005C11.5123 22.127 7.27307 28.4503 4.38084 35.4096C1.48861 42.3689 0 49.8279 0 57.3606L57.5515 57.3606H115.103Z" fill="#BBCCF8" fillOpacity="0.55"/>
                  <g clipPath="url(#clip0_10116_96865)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M88.4171 17.4141H94.0838V91.0807H88.4171V17.4141ZM30.0901 57.0807L47.9231 74.9081L43.9111 78.9201L19.2441 54.2474L43.9111 29.5747L47.9231 33.5867L30.0901 51.4141H82.7505V57.0807H30.0901Z" fill="black"/>
                  </g>
                </svg>,
                style: styles.tileText
              },
              {
                label: "Rejected", 
                value: getValueFromResponse("totalPropertiesRejected", 30), 
                key: "totalPropertiesRejected",
                icon: <svg width="116" height="115" viewBox="0 0 116 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M115.347 57.3606C115.347 49.8279 113.858 42.3689 110.966 35.4096C108.074 28.4503 103.835 22.1269 98.4906 16.8005C93.1465 11.4741 86.802 7.24895 79.8196 4.36631C72.8371 1.48367 65.3534 0 57.7956 0C50.2378 0 42.7541 1.48368 35.7716 4.36632C28.7891 7.24896 22.4447 11.4741 17.1006 16.8005C11.7564 22.127 7.51721 28.4503 4.62498 35.4096C1.73275 42.3689 0.24414 49.8279 0.244141 57.3606L57.7956 57.3606H115.347Z" fill="#BBCCF8" fillOpacity="0.55"/>
                  <path d="M66.9941 23L86.244 40.5007V77.0931C86.244 78.8432 84.669 80.2751 82.744 80.2751H40.7441C38.8191 80.2751 37.2441 78.8432 37.2441 77.0931V26.1819C37.2441 24.4319 38.8191 23 40.7441 23H66.9941Z" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <path d="M70.4941 24.5938V38.9125H86.2441L70.4941 24.5938Z" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <circle cx="86.2441" cy="73.912" r="15" stroke="black" strokeWidth="4"/>
                  <line x1="79.2441" y1="67.5469" x2="93.2441" y2="80.2747" stroke="black" strokeWidth="4" strokeLinecap="round"/>
                  <line x1="93.2441" y1="67.5469" x2="79.2441" y2="80.2747" stroke="black" strokeWidth="4" strokeLinecap="round"/>
                </svg>,
                style: styles.tileText
              },
            ].map((card) => (
              <div style={styles.card} key={card.key}>
                <div>
                  {card?.icon}
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
                image: <svg width="86" height="85" viewBox="0 0 86 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M69.0379 71.6417C69.0379 72.3664 68.7501 73.0613 68.2377 73.5737C67.7253 74.086 67.0304 74.3739 66.3058 74.3739H42.9187C41.8614 76.0499 40.5898 77.5807 39.1362 78.9275H66.3058C68.2381 78.9275 70.0912 78.1599 71.4576 76.7935C72.8239 75.4272 73.5915 73.574 73.5915 71.6417V34.5909C73.5914 32.6586 72.8238 30.8055 71.4574 29.4392L50.2256 8.20746C50.0678 8.0496 49.8917 7.91603 49.7187 7.78246L49.5487 7.65192C48.6591 6.94064 47.6153 6.44782 46.5008 6.21299C46.0301 6.11843 45.5511 6.07064 45.071 6.07031H20.3147C19.3577 6.07031 18.4101 6.25886 17.5259 6.62519C16.6418 6.99153 15.8385 7.52846 15.1619 8.20532C14.4853 8.88218 13.9487 9.68571 13.5827 10.57C13.2168 11.4543 13.0286 12.402 13.029 13.3591V42.0921C14.4774 41.327 16.0041 40.7204 17.5826 40.2828V13.3591C17.5826 11.8503 18.809 10.6239 20.3147 10.6239H43.2344V30.356C43.2344 31.9663 43.874 33.5106 45.0127 34.6492C46.1513 35.7878 47.6956 36.4275 49.3058 36.4275L69.0379 36.4244V71.6417ZM47.7879 12.2116L67.4533 31.8708L49.3058 31.8739C48.9032 31.8739 48.5172 31.714 48.2325 31.4293C47.9479 31.1447 47.7879 30.7586 47.7879 30.356V12.2116ZM43.3862 62.231C43.3862 67.4643 41.3072 72.4833 37.6068 76.1838C33.9063 79.8843 28.8873 81.9632 23.654 81.9632C18.4207 81.9632 13.4018 79.8843 9.70129 76.1838C6.00079 72.4833 3.92188 67.4643 3.92188 62.231C3.92188 56.9977 6.00079 51.9788 9.70129 48.2783C13.4018 44.5778 18.4207 42.4989 23.654 42.4989C28.8873 42.4989 33.9063 44.5778 37.6068 48.2783C41.3072 51.9788 43.3862 56.9977 43.3862 62.231ZM25.1719 50.0882C25.1719 49.6856 25.012 49.2995 24.7273 49.0149C24.4427 48.7302 24.0566 48.5703 23.654 48.5703C23.2515 48.5703 22.8654 48.7302 22.5807 49.0149C22.2961 49.2995 22.1362 49.6856 22.1362 50.0882V60.7132H11.5112C11.1086 60.7132 10.7225 60.8731 10.4379 61.1577C10.1532 61.4424 9.9933 61.8285 9.9933 62.231C9.9933 62.6336 10.1532 63.0197 10.4379 63.3043C10.7225 63.589 11.1086 63.7489 11.5112 63.7489H22.1362V74.3739C22.1362 74.7764 22.2961 75.1625 22.5807 75.4472C22.8654 75.7318 23.2515 75.8917 23.654 75.8917C24.0566 75.8917 24.4427 75.7318 24.7273 75.4472C25.012 75.1625 25.1719 74.7764 25.1719 74.3739V63.7489H35.7969C36.1994 63.7489 36.5855 63.589 36.8702 63.3043C37.1548 63.0197 37.3147 62.6336 37.3147 62.231C37.3147 61.8285 37.1548 61.4424 36.8702 61.1577C36.5855 60.8731 36.1994 60.7132 35.7969 60.7132H25.1719V50.0882Z" fill="black"/>
                </svg>,
                text: "New Property Application Form",
                link: "/digit-ui/employee/pt/new-application",
              },
              {
                image: <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M35.6191 67.4998H16.8691C12.727 67.4998 9.36911 64.1419 9.36914 59.9998L9.36943 15C9.36946 10.8578 12.7273 7.5 16.8694 7.5H50.6203C54.7624 7.5 58.1203 10.8579 58.1203 15V30M61.8691 61.875L65.6191 65.625M22.4953 22.5H44.9953M22.4953 33.75H44.9953M22.4953 45H33.7453M63.7441 54.375C63.7441 59.5527 59.5468 63.75 54.3691 63.75C49.1915 63.75 44.9941 59.5527 44.9941 54.375C44.9941 49.1973 49.1915 45 54.3691 45C59.5468 45 63.7441 49.1973 63.7441 54.375Z" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>,
                text: "Track Application",
                link: "/digit-ui/employee/pt/application-search",
              },
            ].map((card) => (
              (isBillCollector || card.text !== "New Property Application Form") &&
              <div style={styles.actionCard} key={card.text}>
                <span>{card?.image}</span>
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