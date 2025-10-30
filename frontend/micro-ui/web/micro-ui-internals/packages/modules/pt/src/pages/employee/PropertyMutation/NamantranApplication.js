import React from "react";
import { Dropdown, TextInput, SubmitBar } from "@egovernments/digit-ui-react-components";

const OwnershipDetailsSection = ({
    t,
    styles,
    propertyId

}) => {


  

  return (
    <div>
      <div className="form-section" style={styles.formSection}>

        {/* Name with Title */}

        <div style={styles.flex30}>
          <div style={styles.poppinsLabel}>
            {t("Namantaran Purpose")} <span className="mandatory" style={styles.mandatory}>*</span>
          </div>
          <Dropdown
            style={styles.widthInput}
            t={t}
            // option={propertyCategoryOptions}

            // selected={propertyCategoryOptions.find(opt => opt.code === propertyCategoryInput)}
            // select={propertyCategoryInputChange}
            optionKey="name"
            placeholder={t("Select")}
            disable={true}
          />
        
        </div>

    
        <div style={styles.flex30}>
          <div style={styles.poppinsLabel}>
            {t("Property ID")}
          </div>
          <TextInput
             value={propertyId}
            // onChange={handleRestryIdChange}
            style={styles.widthInput}

          />

        </div>
        <div style={styles.flex30}></div>
      </div>
   

    
    </div>
  );
};

export default OwnershipDetailsSection;
