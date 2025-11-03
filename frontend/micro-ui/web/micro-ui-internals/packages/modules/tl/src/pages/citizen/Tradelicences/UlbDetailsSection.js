import React from "react";
//import { ActionBar, Header, Loader, SubmitBar,Card,CardSubHeader,CardSectionHeader,LinkLabel, CardLabel, CardHeader, CardText} from "@egovernments/digit-ui-react-components";
import styles from "./IndexStyle"
import { Dropdown, TextInput } from "@egovernments/digit-ui-react-components";

const UlbDetailsSection = () => {
  return (
       <div className="form-section" style={styles.formSection}>
           {/* Ulb */}
           <div style={styles.flex30}>
             <div style={styles.poppinsLabel}>ULB<span className="mandatory" style={styles.mandatory}>*</span>
             </div>
             <TextInput
               style={styles.widthInput}
               name="ulb"
               placeholder="Enter"
             />
           </div>
     
           {/* PropertyId */}
           <div style={styles.flex30}>
             <div style={styles.poppinsLabel}>Property ID<span className="mandatory" style={styles.mandatory}>*</span></div>
             <TextInput
               style={styles.widthInput}
               name="propertyId"
               placeholder="Enter"
             />
           </div>

           {/* blank only */}
           <div style={styles.flex30}></div>
       </div>
  );
};

export default UlbDetailsSection;
