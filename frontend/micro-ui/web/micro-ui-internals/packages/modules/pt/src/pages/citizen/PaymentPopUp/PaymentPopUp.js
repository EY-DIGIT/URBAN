import React, { useState } from "react";

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
  backgroundColor: '#6B133F',
  color: 'white',
  border: '2px solid #6B133F'
};

const unselectedOptionStyle = {
  ...optionButtonStyle,
  backgroundColor: 'white',
  color: '#333',
  border: '2px solid #e0e0e0'
};

const Popup = ({ show, onClose }) => {
  if (!show) return null;

  const [selectedOption, setSelectedOption] = useState('own');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onClose(option);
  };

  return (
    <div style={backdropStyle}>
      <div style={containerStyle}>
        <div style={popupStyle}>
          <h2 style={titleStyle}>Paying For</h2>
          <div style={optionsContainerStyle}>
            <button
              style={selectedOption === 'own' ? selectedOptionStyle : unselectedOptionStyle}
              onClick={() => handleOptionClick('own')}
            >
              Own Property
            </button>
            <button
              style={selectedOption === 'behalf' ? selectedOptionStyle : unselectedOptionStyle}
              onClick={() => handleOptionClick('behalf')}
            >
              On Behalf Of Someone
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
