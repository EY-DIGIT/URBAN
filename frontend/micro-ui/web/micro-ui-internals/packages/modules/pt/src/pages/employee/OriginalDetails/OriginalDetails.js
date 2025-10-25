





import {

  SubmitBar,

} from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./IndexStyle"
import OwnershipDetailsSection from "./OwnershipDetailsSection";
import AddressSection from "./AddressSection";
import AssessmentDetailsSection from "./AssessmentDetailsSection";
import PropertyDetailsTableSection from "./PropertyDetailsTableSection";

// import SuccessModal from "./SuccessModal";
import CorrespondenceAddressSection from "./CorrespondenceAddressSection";


const OriginalDetails = () => {
  const location = useLocation();
  const { state } = useLocation();

  const { t } = useTranslation();

  return (

    <React.Fragment>


      <div >

        <div style={styles.card}>

          <div style={styles.assessmentStyle}>{t("Original Owner Details")}</div>

          <OwnershipDetailsSection
            t={t}

            styles={styles}

          />
        </div>

        <div style={styles.card}>
          <div style={styles.assessmentStyle}>{t("Property Address")}</div>
          <AddressSection
            t={t}

            styles={styles}

          />
        </div>
        <div style={styles.card}>
          <CorrespondenceAddressSection
            t={t}

            styles={styles}

          />
        </div>
        <div style={styles.card}>
          <div style={styles.assessmentStyle}>{t("Assessment Details")}</div>
          <AssessmentDetailsSection
            t={t}

            styles={styles}

          />
        </div>

        <div style={styles.card}>
          <div style={styles.assessmentStyle}>{t("Property Details")}</div>
          <PropertyDetailsTableSection
            t={t}

            styles={styles}

          />

        </div>




        <div style={styles.card}>


          <div style={styles.buttonContainer}>

            <SubmitBar label={t("Back")} style={{ background: "#6b133f" }} />

          </div>
        </div>

      </div>



    </React.Fragment>
  );
};

export default OriginalDetails;





