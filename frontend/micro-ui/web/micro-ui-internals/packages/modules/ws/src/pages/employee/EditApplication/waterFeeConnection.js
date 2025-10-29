import React, { useState, useEffect } from "react";
import { Dropdown, TextInput } from "@egovernments/digit-ui-react-components";

const waterFeeConnection = ({
  t,
  WaterConncetionDetails,  
  styles,
}) => {
  
  
  return (
    <div style={{ marginBottom: "20px" }}>
   
         <div style={{ display: "flex" }}>
   
           <div style={styles.checkboxMargin}>
             <div style={{ marginTop: "20px", display: "flex", gap: "20px", alignItems: "center" }}>
               <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                 <input
                   type="radio"
                   name="connectionType"
                   checked={WaterConncetionDetails?.connectionType === "Non Metered"}
                   
                 />
                 <span style={styles.label}>Flat</span>
               </label>
               <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                 <input
                   type="radio"
                   name="connectionType"
                   checked={WaterConncetionDetails?.connectionType === "Metered"}
                   
                 />
                 <span style={styles.label}>Metered</span>
               </label>
   
             </div>
   
           </div>
   
   
   
         </div>
         <div className="form-section" style={styles.formSection}>
           {/* Water Connection Type */}
           <div style={styles.flex30}>
             <div style={styles.poppinsLabel}>
               {t("Uses Type")}<span className="mandatory" style={styles.mandatory}>*</span>
             </div>
              <TextInput
                             style={styles.widthInput}
                             name="doorNo"
                             disabled={true}
                             value={WaterConncetionDetails.UsesType}
                             placeholder={t("Enter")}
                           />
            
           </div>
           {/* Water Connection Typ */}
           <div style={styles.flex30}>
             <div style={styles.poppinsLabel}>
               {t("Water Connection Type")}<span className="mandatory" style={styles.mandatory}>*</span>
             </div>
             <TextInput
                             style={styles.widthInput}
                             name="doorNo"
                             disabled={true}
                             value={WaterConncetionDetails.usageSubType}
                             placeholder={t("Enter")}
                           />
           </div>
           {/* Connection Size */}
           <div style={styles.flex30}>
             <div style={styles.poppinsLabel}>
               {t("Connection Size")}<span className="mandatory" style={styles.mandatory}>*</span>
             </div>
              <TextInput
                             style={styles.widthInput}
                             name="Connectionsize"
                             disabled={true}
                             value={WaterConncetionDetails.doorNo}
                             placeholder={t("Enter")}
                           />
           </div>
          
         </div>
       </div>
  );
};

export default waterFeeConnection;


