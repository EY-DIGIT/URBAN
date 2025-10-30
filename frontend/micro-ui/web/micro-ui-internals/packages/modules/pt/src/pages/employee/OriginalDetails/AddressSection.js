


import React, { useState, useEffect } from "react";
import { Dropdown, TextInput } from "@egovernments/digit-ui-react-components";

const AddressSection = ({
  t,
  address,
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
          value={address?.doorNo}
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
          value={address?.street}
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
          value={address?.pincode || ""}
          placeholder={t("Enter")}
          disable={true}
        />

      </div>

      {/* Zone Dropdown */}
    {/* Zone Dropdown */}
<div style={styles.flex30}>
  <div style={styles.poppinsLabel}>
    {t("Zone")}<span className="mandatory" style={styles.mandatory}>*</span>
  </div>
  <Dropdown
    t={t}
    option={[{ code: address?.zone, name: address?.zone }]} // ✅ wrap in array
    selected={{ code: address?.zone, name: address?.zone }} // ✅ correct prop
    optionKey="name"
    disable={true} // ✅ correct prop name (not disabled)
    style={styles.widthInput}
    placeholder={t("Select")}
  />
</div>

{/* Ward Dropdown */}
<div style={styles.flex30}>
  <div style={styles.poppinsLabel}>
    {t("Ward")}<span className="mandatory" style={styles.mandatory}>*</span>
  </div>
  <Dropdown
    t={t}
    option={[{ code: address?.ward, name: address?.ward }]}
    selected={{ code: address?.ward, name: address?.ward }}
    optionKey="name"
    disable={true}
    style={styles.widthInput}
    placeholder={t("Select")}
  />
</div>

{/* Colony Dropdown */}
<div style={styles.flex30}>
  <div style={styles.poppinsLabel}>
    {t("Colony")}<span className="mandatory" style={styles.mandatory}>*</span>
  </div>
  <Dropdown
    t={t}
    option={[{ code: address?.locality?.code, name: address?.locality?.name }]}
    selected={{ code: address?.locality?.code, name: address?.locality?.name }}
    optionKey="name"
    disable={true}
    style={styles.widthInput}
    placeholder={t("Select")}
  />
</div>



    </div>
  );
};

export default AddressSection;
