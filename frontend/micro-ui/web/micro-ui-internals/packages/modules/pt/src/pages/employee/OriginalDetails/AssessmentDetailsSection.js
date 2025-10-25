import React from "react";
import { Dropdown, TextInput } from "@egovernments/digit-ui-react-components";

const AssessmentDetailsSection = ({
  t,

  styles
}) => {
  
  return (
    <div style={styles.formSection}>
      {/* Rate Zone */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>{t("Rate Zone")}<span className="mandatory" style={styles.mandatory}>*</span></div>
        <TextInput
          style={styles.widthInput}
          name="rateZone"
        
          placeholder={t("Auto fetched")}
       
          disabled
        />
    
      </div>

      {/* Road Factor */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>{t("Road Factor")}<span className="mandatory" style={styles.mandatory}>*</span></div>
        <Dropdown
         disabled={true}
          style={styles.widthInput}
          t={t}
     
          optionKey="name"
          placeholder={t("Select")}
        />
      
      </div>

      {/* Old Property ID */}
      {/* <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>{t("Old Property Id")}</div>
        <TextInput
          style={styles.widthInput}
          name="oldPropertyId"
          value={assessmentDetails.oldPropertyId}
          onChange={handleAssessmentInputChange}
          placeholder={t("Enter")}
        />
      </div> */}

      {/* Plot Area */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>{t("Plot Area")}<span className="mandatory" style={styles.mandatory}>*</span></div>
        <TextInput
         disabled={true}
          style={styles.widthInput}
          name="plotArea"
        
          placeholder={t("Enter")}
          type="text"
        />
     
      </div>

      <div style={styles.flex30}></div>
      <div style={styles.flex30}></div>
    </div>
  );
};

export default AssessmentDetailsSection;
