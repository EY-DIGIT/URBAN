import React from "react";

const SuccessModal = ({ t, applicationNumber, applicationId, onClose, styles }) => {
  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <div style={modalStyles.iconContainer}>
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" fill="#28a745" />
            <path
              d="M8 12l2 2 4-4"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2 style={modalStyles.title}>{t("Application Submitted Successfully!")}</h2>

        <div style={modalStyles.infoContainer}>
          <div style={modalStyles.infoRow}>
            <span style={modalStyles.label}>{t("Application Number:")}</span>
            <span style={modalStyles.value}>{applicationNumber}</span>
          </div>
          {applicationId && (
            <div style={modalStyles.infoRow}>
              <span style={modalStyles.label}>{t("Application ID:")}</span>
              <span style={modalStyles.value}>{applicationId}</span>
            </div>
          )}
        </div>

        <p style={modalStyles.message}>
          {t(
            "Your death certificate application has been submitted successfully. You will receive updates on your registered mobile number and email."
          )}
        </p>

        <button onClick={onClose} style={modalStyles.button}>
          {t("Go to Home")}
        </button>
      </div>
    </div>
  );
};

// Inline styles for modal
const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "40px",
    maxWidth: "500px",
    width: "90%",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#6B133F",
    marginBottom: "20px",
    fontFamily: "Poppins, sans-serif",
  },
  infoContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "20px",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
    fontFamily: "Poppins, sans-serif",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#666",
  },
  value: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
  },
  message: {
    fontSize: "14px",
    color: "#666",
    lineHeight: "1.6",
    marginBottom: "24px",
    fontFamily: "Poppins, sans-serif",
  },
  button: {
    backgroundColor: "#6b133f",
    color: "#fff",
    border: "none",
    padding: "12px 32px",
    borderRadius: "4px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    fontFamily: "Poppins, sans-serif",
    transition: "background-color 0.3s",
  },
};

export default SuccessModal;