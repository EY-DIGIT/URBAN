import React from "react";
import { useHistory } from "react-router-dom";

const SuccessModal = () => {
    const history = useHistory();

    const handleHomeClick = () => {
        history.push("/digit-ui/citizen");
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.iconContainer}>
                    <div style={styles.successIcon}>
                        <span style={{ color: "white", fontSize: "1.5rem" }}>✔</span>
                    </div>
                </div>

                <h2 style={styles.title}>Application Submitted Successfully!</h2>

                <div style={styles.infoContainer}>
                    <div style={styles.infoRow}>
                        <span style={styles.label}>Application ID:</span>
                        <span style={styles.value}>xxxxxxxx</span>
                    </div>
                </div>
                
                <p style={styles.message}>
                    A notification has been sent to the registered mobile number and email ID.
                </p>
                
                <button onClick={handleHomeClick} style={styles.button}>
                    Go to Home
                </button>
            </div>
        </div>
    );
};

// Inline styles for modal
const styles = {
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
        padding: "20px",
    },
    modal: {
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "40px",
        maxWidth: "380px",
        width: "100%",
        textAlign: "center",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
        animation: "slideDown 0.3s ease-out",
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
        lineHeight: "1.4",
    },
    infoContainer: {
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "20px",
    },
    infoRow: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "12px",
        fontFamily: "Poppins, sans-serif",
        flexWrap: "wrap",
        gap: "8px",
    },
    label: {
        fontSize: "14px",
        fontWeight: "500",
        color: "#000",
    },
    value: {
        fontSize: "16px",
        fontWeight: "600",
        color: "#333",
        wordBreak: "break-word",
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
        width: "100%",
        maxWidth: "200px",
    },
    successIcon: {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        backgroundColor: "#000",
        border: "3px solid green",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
};

// Add CSS animation
if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.textContent = `
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @media (max-width: 768px) {
      .modal {
        padding: 20px !important;
      }
    }
  `;
    document.head.appendChild(style);
}

export default SuccessModal;