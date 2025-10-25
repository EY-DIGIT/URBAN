import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const backdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const containerStyle = {
  backgroundColor: "#fff",
  borderRadius: "12px",
  padding: "20px",
  width: "400px",
  maxWidth: "90%",
  boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  animation: "fadeIn 0.2s ease-in-out",
};

const popupStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  borderRadius: '16px',
  padding: '32px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
  width: '400px',
  maxWidth: '90vw',
  zIndex: 1000
};

const backButtonStyle = {
  position: 'absolute',
  top: '16px',
  left: '16px',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  transition: 'background-color 0.2s ease',
  color: '#6B133F'
};

const backButtonHoverStyle = {
  ...backButtonStyle,
  backgroundColor: 'rgba(107, 19, 63, 0.1)'
};

const titleStyle = {
  fontSize: '20px',
  fontWeight: '600',
  color: '#6B133F',
  textAlign: 'center',
  marginBottom: '24px',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
};

const optionsContainerStyle = {
  display: 'flex',
  gap: '16px',
  justifyContent: 'space-between'
};

const optionButtonStyle = {
  flex: 1,
  padding: '24px 20px',
  borderRadius: '12px',
  border: '2px solid transparent',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: '500',
  textAlign: 'center',
  transition: 'all 0.2s ease',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
};

const selectedOptionStyle = {
  ...optionButtonStyle,
  backgroundColor: "#6B133F",
  color: "white",
  border: "2px solid #6B133F"
};

const unselectedOptionStyle = {
  ...optionButtonStyle,
  backgroundColor: "white",
  color: "#333",
  border: "2px solid #e0e0e0"
};

const hoverStyle = {
  ...selectedOptionStyle
};

const Popup = ({ show, onClose }) => {
  const { t } = useTranslation();
  const isMountedRef = useRef(true);
  const [selectedOption, setSelectedOption] = useState('');
  const [hovered, setHovered] = useState(null);
  const [backButtonHovered, setBackButtonHovered] = useState(false);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (show && isMountedRef.current) {
      setSelectedOption('');
      setHovered(null);
    }
  }, [show]);

  if (!show) return null;

  const handleBackClick = () => {
    window.history.back();
  };

  const handleOptionClick = (option) => {
    if (isMountedRef.current) {
      setSelectedOption(option);
    }
    if (onClose) {
      onClose(option);
    }
  };

  const handleMouseEnter = (option) => {
    if (isMountedRef.current) {
      setHovered(option);
    }
  };

  const handleMouseLeave = () => {
    if (isMountedRef.current) {
      setHovered(null);
    }
  };

  const getStyle = (option) => {
    if (selectedOption === option) {
      return selectedOptionStyle;
    }
    if (hovered === option) {
      return hoverStyle;
    }
    return unselectedOptionStyle;
  };

  return (
    <div style={backdropStyle}>
      <div style={containerStyle}>
        <div style={popupStyle}>
          <button
            style={backButtonHovered ? backButtonHoverStyle : backButtonStyle}
            onClick={handleBackClick}
            onMouseEnter={() => setBackButtonHovered(true)}
            onMouseLeave={() => setBackButtonHovered(false)}
            aria-label="Go back"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          
          <h2 style={titleStyle}>{t("PAYING_FOR")}</h2>
          <div style={optionsContainerStyle}>
            <button
              style={getStyle("own")}
              onMouseEnter={() => handleMouseEnter("own")}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleOptionClick('own')}
            >
              {t("OWN_WATER_PROPERTY")}
            </button>
            <button
              style={getStyle("behalf")}
              onMouseEnter={() => handleMouseEnter("behalf")}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleOptionClick("behalf")}
            >
              {t("ON_BEHALF_OF_SOMEONE")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;