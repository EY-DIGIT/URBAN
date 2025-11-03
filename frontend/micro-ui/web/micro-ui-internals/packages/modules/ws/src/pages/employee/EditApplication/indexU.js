import { FormComposer, Header, Loader, Toast,SubmitBar } from "@egovernments/digit-ui-react-components";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useHistory } from "react-router-dom";
import * as func from "../../../utils";
import styles from "../../employee/NewApplication/IndexStyle"
import { newConfig as newConfigLocal } from "../../../config/wsCreateConfig";
import { convertApplicationData, convertEditApplicationDetails } from "../../../utils";
import OwnershipDetailsSection from "./OwnershipDetailsSection";
import AddressSection from "./AddressSection";
import WaterFeeConnection from "./waterFeeConnection"
import SelfDeclaration from "./SelfDeclaration"
import cloneDeep from "lodash/cloneDeep";

const EditApplication = () => {
  const [config, setConfig] = useState({ head: "", body: [] });
  const { t } = useTranslation();
  let { state } = useLocation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  state = state  ? (typeof(state) === "string" ? JSON.parse(state) : state) : {};
   const[addressDetails, setaddressDetails] = useState({})
   const[waterDetails, setwaterDetails] = useState({})
   const[owners, setowners] = useState([])
 const [checkboxes, setCheckboxes] = useState({
       mobileTower: false,
       broadRoad: false,
       advertisement: false,
       seniorCitizenDiscount: false,
       selfDeclaration: true,
     });
     const handleCheckboxChange = (field) => {
    setCheckboxes((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  let applicationDetails = cloneDeep(state?.applicationData);
  // let { isLoading, isError, data: applicationDetails, error } = Digit.Hooks.ws.useWSDetailsPage(t, tenantId, details?.applicationNo, details?.applicationData?.serviceType,{privacy : Digit.Utils.getPrivacyObject() });
  // details = applicationDetails;
  console.log("applicationDetails",applicationDetails)
   useEffect(() => {
      if (applicationDetails?.connectionHolders) {
        setowners(applicationDetails.connectionHolders);
        setaddressDetails(applicationDetails.property.address);
        setwaterDetails(
          {
            WaterConncetionDetails:{
              UsesType:applicationDetails.usageType,
              usageSubType:applicationDetails.usageSubType,
              pipeSize:applicationDetails.pipeSize,
              connectionType:applicationDetails?.connectionType ==="FLAT"?"Metered":"Non Metered" ,
            }
          }
        );
      }
    }, [applicationDetails]);
    
  const handleSubmit = async () => {
  }
    return (
    <React.Fragment>
      <div style={{ marginLeft: "15px" }}>
        <Header>{t("WS_EDIT_APPLICATION")}</Header>
        <div style={styles.card}>

          <div style={styles.assessmentStyle}>{t("Connection Holader Details")}</div>
          {/* <OwnershipDetailsSection
                        t={t}
                        owners={owners}
                        styles={styles}
                      /> */}
        </div>
        <div style={styles.card}>

          <div style={styles.assessmentStyle}>{t("Connection Address")}</div>
          <AddressSection
                        t={t}
                        addressDetails={addressDetails}
                        styles={styles}
                      />
        </div>
        <div style={styles.card}>

          <div style={styles.assessmentStyle}>{t("Water Connection & Fee Details")}</div>
          <WaterFeeConnection
                                      t={t}
                                      waterDetails={waterDetails}
                                      styles={styles}
                                    />
        </div>
        <div style={styles.card}>
          <SelfDeclaration
          t={t}
          checkboxes={checkboxes}
          disabled={true}
          handleCheckboxChange={handleCheckboxChange}
          styles={styles}
          //formErrors={formErrors} 
          />       
          <div style={styles.buttonContainer}>

            <SubmitBar label={t("Edit")} onSubmit={handleSubmit} style={{ background: "#6b133f" }} />

          </div>
        </div>

      </div>

    </React.Fragment>
  );
};

export default EditApplication;
