import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./IndexStyle";
import { Dropdown, CheckBox, TextInput } from "@egovernments/digit-ui-react-components";

const SuccessModal = ({ onClose }) => {
  const history = useHistory();

  const handleHomeClick = () => {
    if (onClose) {
      onClose();
    } else {
      // Navigate to birth module home when used as route component
      history.push("/digit-ui/citizen/birth");
    }
  };

  return (
    <div>
      <div style={{...styles.assessmentStyle, color: "#555555", marginLeft: "10px"}}>Birth Certificate</div>
      <div style={styles.successModal}>
        <div style={styles.successIcon}>
          <span style={{ color: "white", fontSize: "1.5rem" }}>✔</span>
        </div>
        <h2 style={{ marginTop: "0.5rem" }}><b>Application Submitted Successfully</b></h2>
        <br/>
        <p style={{ color: "gray" }}>
          Application ID: xxxxxxxx
          <br /><br />
          A notification has been sent to the registered mobile number and email ID.
        </p>
        <button onClick={handleHomeClick} style={{ ...styles.successButton, borderRadius: '8px' }}>
          Home
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
