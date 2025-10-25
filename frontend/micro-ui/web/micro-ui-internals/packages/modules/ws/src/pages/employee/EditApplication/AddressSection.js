import React, { useState, useEffect } from "react";
import { Dropdown, TextInput } from "@egovernments/digit-ui-react-components";

const AddressSection = ({
  t,
  addressDetails,  
  styles,
}) => {
  //const [boundaryData, setBoundaryData] = useState(null);
  const [zones, setZones] = useState([]);
  const [wards, setWards] = useState([]);
  const [colonies, setColonies] = useState([]);
  //const [rateZones, setRateZones] = useState([]);

  // Fetch boundary data and extract zones
  const stateId = Digit.ULBService.getStateId();
const { data: PropertyCategory } = Digit.Hooks.pt.usePropertyCategoryMDMS(stateId, "common-masters", "PropertyCategory");
const dropdownOptions=(PropertyCategory || []).map((item)=>({
    code:item.code,
    name:t(item.name),
  }))
  
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
                disabled={true}
                value={addressDetails.doorNo}
                placeholder={t("Enter")}
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
                value={addressDetails.address}
               disabled={true}
                placeholder={t("Enter")}
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
                value={addressDetails.pincode}
                disabled={true}
                placeholder={t("Enter")}
              />
            </div>
      
            {/* Zone Dropdown */}
            <div style={styles.flex30}>
              <div style={styles.poppinsLabel}>
                {t("Zone")}<span className="mandatory" style={styles.mandatory}>*</span>
              </div>
             <TextInput
                style={styles.widthInput}
                name="pincode"
                value={addressDetails.zone}
                disabled={true}
                placeholder={t("Enter")}
              />
            </div>
      
            {/* Ward Dropdown */}
            <div style={styles.flex30}>
              <div style={styles.poppinsLabel}>
                {t("Ward")}<span className="mandatory" style={styles.mandatory}>*</span>
              </div>
               <TextInput
                style={styles.widthInput}
                name="pincode"
                value={addressDetails.ward}
                disabled={true}
                placeholder={t("Enter")}
              />
            </div>
      
            {/* Colony Dropdown */}
            <div style={styles.flex30}>
              <div style={styles.poppinsLabel}>
                {t("Colony")}<span className="mandatory" style={styles.mandatory}>*</span>
              </div>
               <TextInput
                style={styles.widthInput}
                name="pincode"
                value={addressDetails.address?.locality?.name}
                disabled={true}
                placeholder={t("Enter")}
              />
            </div>
      {/* Property Type */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          {t("Property Type")}<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <Dropdown
          style={styles.widthInput}
          t={t}
          option={dropdownOptions}
         //selected={dropdownOptions.find(opt => opt.code === propertyCategoryInput)}
         // select={propertyCategoryInputChange}          
          optionKey="name"
          placeholder={t("Select")}
        />
      </div>

      
    </div>
  );
};

export default AddressSection;


