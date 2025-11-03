import React, { useState } from "react";
import styles from "./IndexStyle"
import { Dropdown, TextInput } from "@egovernments/digit-ui-react-components";

const FirmDetailsSection = () => {

    return (
     
        <div className="form-section" style={styles.formSection}>

          {/* Firm Name */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>Firm Name<span className="mandatory" style={styles.mandatory}>*</span></div>
            <div style={styles.nameInputContainer}>
              <TextInput
                style={{ ...styles.widthInput, backgroundColor: "#f3f6f4" }}
                name="firmName"
                placeholder="Enter"
              />
            </div>
          </div>

         {/* Trade type */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>Trade type <span className="mandatory" style={styles.mandatory}>*</span></div>
            <Dropdown
              option={[
                { code: "retail", value: "Retail Business" },
                { code: "wholesale", value: "Wholesale Business" }
              ]}
              optionKey="code"
              t={(key) => key}
              selected=""
              select={() => {}}
              placeholder="Select"
              style={{ ...styles.widthInput, backgroundColor: "#f3f6f4" }}
            />
          </div>

          {/* Joint Partner (If Any) */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>Joint Partner (If Any) <span className="mandatory" style={styles.mandatory}>*</span></div>
            <Dropdown
              option={[
                { code: "partner1", value: "partner A" },
                { code: "partner2", value: "partner B" }
              ]}
              optionKey="code"
              t={(key) => key}
              selected=""
              select={() => {}}
              placeholder="Enter"
              style={{ ...styles.widthInput, backgroundColor: "#f3f6f4" }}
            />
          </div> 

          {/* Firm Type */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>Firm Type <span className="mandatory" style={styles.mandatory}>*</span></div>
            <Dropdown
              option={[
                { code: "Manufacturer", value: "Manufacturer Firm" },
                { code: "Retailer", value: "Retailer Firm" }
              ]}
              optionKey="code"
              t={(key) => key}
              selected=""
              select={() => {}}
              placeholder="Enter"
              style={{ ...styles.widthInput, backgroundColor: "#f3f6f4" }}
            />
          </div> 

          {/* blank only */}
          <div style={styles.flex30}></div>
          <div style={styles.flex30}></div>

        </div>
    );
  };


export default FirmDetailsSection;