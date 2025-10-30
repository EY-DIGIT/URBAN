import React, { useState } from "react";
import styles from "./IndexStyle"
import { Dropdown, TextInput } from "@egovernments/digit-ui-react-components";

const OtherDetailsSection = () => {

    return (
     
      <div style={styles.card}>
        <div style={{color: "rgb(107, 19, 63)", fontSize: "14px"}}>Please Select Relationship With Child<span className="mandatory" style={styles.mandatory}>*</span></div>
        <div className="form-section" style={styles.formSection}>
          <div style={styles.flex30}>
            {/* <div style={styles.poppinsLabel}>Firm Type <span className="mandatory" style={styles.mandatory}>*</span></div> */}
            <Dropdown
              option={[
                { code: "Father", value: "Relation" },
                { code: "Mother", value: "Relation" },
                { code: "Relative's/Reporter", value: "Relation" }
              ]}
              optionKey="code"
              t={(key) => key}
              selected=""
              select={() => {}}
              placeholder="Select"
              style={styles.widthInput}
            />
          </div> 

          {/* blank only */}
          <div style={styles.flex30}></div>
          <div style={styles.flex30}></div>

        </div>
      </div>
    );
  };


export default OtherDetailsSection;