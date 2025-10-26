import React from "react";
import { Dropdown, TextInput } from "@egovernments/digit-ui-react-components";

const NamantaranDetails = ({
  t,
  
  styles,
  formErrors
}) => {
  const stateId = Digit.ULBService.getStateId();
  const { data: RoadFactors, isLoading } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "RoadFactor");
  const RoadFactorList = (RoadFactors?.PropertyTax?.RoadFactor || []).map((item) => ({
    code: item.code,
    name: item.name, 
  }));


  const { data: ReasonForTransferList } = Digit.Hooks.pt.useReasonForTransferMDMS(stateId, "PropertyTax", "ReasonForTransfer");
  // const { data: NamantaranTypeList } = Digit.Hooks.pt.useNamantaranTypeMDMS(stateId, "PropertyTax", "NamantaranType");
  // console.log("NamantaranTypeList==============",NamantaranTypeList);
  // console.log("ReasonForTransferList==============",ReasonForTransferList);
 
  //        const NamantaranType = (NamantaranTypeList?.PropertyTax?.NamantaranType || []).map((item) => ({
  //   code: item.code,
  //   name: item.name, 
  // }));

      const ReasonForTransfer = (ReasonForTransferList?.PropertyTax?.ReasonForTransfer || []).map((item) => ({
    code: item.code,
    name: item.name, 
  }));

  console.log("Nammmmmmmmmmmmmmmmmm==============",ReasonForTransfer);
  console.log("Reaaaaaaaaaaaaaaaaaaaaaaa==============",ReasonForTransferList);

//   console.log("RoadFactors", assessmentDetails);
  return (
    <div style={styles.formSection}>
      {/* Rate Zone */}
      {/* <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>{t("Rate Zone")}<span className="mandatory" style={styles.mandatory}>*</span></div>
        <TextInput
          style={styles.widthInput}
          name="rateZone"
        //   value={assessmentDetails.rateZone}
          placeholder={t("Auto fetched")}
        //   onChange={handleAssessmentInputChange}
          disabled
        />
        {formErrors?.rateZone && (
          <p style={{ color: "red", fontSize: "12px" }}>{formErrors.rateZone}</p>
        )}
      </div> */}

      {/* Namantaran Purpose */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>{t("Namantaran Purpose")}<span className="mandatory" style={styles.mandatory}>*</span></div>
        <Dropdown
          style={styles.widthInput}
          t={t}
          option={ReasonForTransferList} // dynamic list
        //   selected={RoadFactorList.find(item => item.code === assessmentDetails?.roadFactor)}
        //   select={handleRoadFactorChange}
          optionKey="name"
          placeholder={t("Select")}
        />
        {formErrors?.roadFactor && (
          <p style={{ color: "red", fontSize: "12px" }}>{formErrors.roadFactor}</p>
        )}
      </div>

      {/* Property ID */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>{t("Property Id")}</div>
        <TextInput
          style={styles.widthInput}
          name="oldPropertyId"
          // value={assessmentDetails.oldPropertyId}
          // onChange={handleAssessmentInputChange}
          placeholder={t("Enter")}
        />
      </div>

      {/* Plot Area */}
      {/* <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>{t("Plot Area")}<span className="mandatory" style={styles.mandatory}>*</span></div>
        <TextInput
          style={styles.widthInput}
          name="plotArea"
        //   value={assessmentDetails.plotArea}
        //   onChange={handleAssessmentInputChange}
          placeholder={t("Enter")}
          type="text"
        />
         {formErrors?.plotArea && (
          <p style={{ color: "red", fontSize: "12px" }}>{formErrors.plotArea}</p>
        )}
      </div> */}

      <div style={styles.flex30}></div>
      <div style={styles.flex30}></div>
    </div>
  );
};

export default NamantaranDetails;
