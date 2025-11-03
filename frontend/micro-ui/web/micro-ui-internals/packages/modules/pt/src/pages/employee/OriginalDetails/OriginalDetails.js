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
  const { t } = useTranslation();
  const location = useLocation();
 const history = useHistory();
  const {
    generalDetails
  } = location.state || {};

  // ✅ Filter only primary owners
  const primaryOwners = generalDetails?.owners;
  const address = generalDetails?.address || {};

  return (

    <React.Fragment>


      <div >

        <div style={styles.card}>

          <div style={styles.assessmentStyle}>{t("Original Owner Details")}</div>

          <OwnershipDetailsSection
            generalDetails={generalDetails}
            t={t}
            owners={primaryOwners}
            styles={styles}

          />
        </div>

        <div style={styles.card}>
          <div style={styles.assessmentStyle}>{t("Property Address")}</div>
          <AddressSection
            t={t}
            address={address}
            styles={styles}

          />
        </div>
        <div style={styles.card}>
          <CorrespondenceAddressSection
            t={t}
            address={address}
            styles={styles}

          />
        </div>
        <div style={styles.card}>
          <div style={styles.assessmentStyle}>{t("Assessment Details")}</div>
          <AssessmentDetailsSection
            t={t}
application={generalDetails}
            styles={styles}

          />
        </div>

        <div style={styles.card}>
          <div style={styles.assessmentStyle}>{t("Property Details")}</div>
          <PropertyDetailsTableSection
            t={t}
application={generalDetails}
            styles={styles}

          />

        </div>




        <div style={styles.card}>


          <div style={styles.buttonContainer}>

            <SubmitBar label={t("Back")} onSubmit={() => history.goBack()}style={{ background: "#6b133f" }} />

          </div>
        </div>

      </div>



    </React.Fragment>
  );
};

export default OriginalDetails;





