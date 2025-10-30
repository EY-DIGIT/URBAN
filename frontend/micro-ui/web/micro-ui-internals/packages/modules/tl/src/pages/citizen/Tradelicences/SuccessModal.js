import React, { useState } from "react";
import styles from "./IndexStyle"
import { Dropdown, CheckBox, TextInput } from "@egovernments/digit-ui-react-components";

const SuccessModal = ({ onClose }) => {
  return (
    <div>
      <div style={{...styles.assessmentStyle, color: "#555555", marginLeft: "10px"}}>Trade License Application</div>
      <div style={styles.successModal}>
        <div style={styles.successIcon}>
          <span style={{ color: "white", fontSize: "1.5rem" }}>✔</span>
        </div>
        <h2 style={{ marginTop: "0.5rem" }}><b>Application Submitted</b></h2>
        <br/>
        <p style={{ color: "gray" }}>
          Application ID: 00000000
          <br /><br />
          A notification has been sent to the registered mobile number and email ID.
        </p>
        <button onClick={onClose} style={{ ...styles.successButton, borderRadius: '8px' }}>
          Home
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
