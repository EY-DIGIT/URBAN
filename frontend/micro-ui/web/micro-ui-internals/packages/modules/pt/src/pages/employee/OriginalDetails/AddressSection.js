


import React, { useState, useEffect } from "react";
import { Dropdown, TextInput } from "@egovernments/digit-ui-react-components";

const AddressSection = ({
  t,

  styles,

}) => {


  // Fetch boundary data and extract zones


  // Update Wards when Zone changes

  // Update RateZones when Colony changes

  return (
    <div className="form-section" style={styles.formSection}>
      {/* Door/House Number */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          {t("Door/House Number")}<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <TextInput
          style={styles.widthInput}
          name="doorNo"
     
          placeholder={t("Enter")}
          disable={true}
        />
        
      </div>

      {/* Address */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          {t("Address")}<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <TextInput
          style={styles.widthInput}
          name="address"
      
          placeholder={t("Enter")}
          disable={true}
        />
        
      </div>

      {/* Pincode */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          {t("Pincode")}<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <TextInput
          style={styles.widthInput}
          name="pincode"
      
          placeholder={t("Enter")}
          disable={true}
        />
       
      </div>

      {/* Zone Dropdown */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          {t("Zone")}<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <Dropdown
        disabled={true}
          style={styles.widthInput}
          t={t}
      
          optionKey="name"
          placeholder={t("Select")}
        />
       
      </div>

      {/* Ward Dropdown */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          {t("Ward")}<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <Dropdown
          style={styles.widthInput}
          t={t}
     
           disabled={true}
       
          optionKey="name"
          placeholder={t("Select")}
        />
       
      </div>

      {/* Colony Dropdown */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          {t("Colony")}<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <Dropdown
          style={styles.widthInput}
          t={t}
     
           disabled={true}
          optionKey="name"
          placeholder={t("Select")}
        />
        
      </div>

    
    </div>
  );
};

export default AddressSection;
