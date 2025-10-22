import React,{useEffect} from "react";

const CorrespondenceAddressSection = ({
  t,
  correspondenceAddress,
  handleCorrespondenceChange,
  isSameAsPropertyAddress,
  handleSameAsPropertyToggle,
  styles,formErrors,
  applicationData,
  setIsSameAsPropertyAddress
}) => {
    useEffect(() => {
     setIsSameAsPropertyAddress(true)
        }, [applicationData]);
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={styles.assessmentStyle}>{t("Correspondence Address")}</div>
      <div style={{ display: "flex" }}>
        <textarea
          style={styles.widthInputs}
          placeholder={t("Enter")}
          value={correspondenceAddress}
          onChange={handleCorrespondenceChange}
          disabled

        />
        <div style={styles.checkboxMargin}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              onChange={handleSameAsPropertyToggle}
              checked={isSameAsPropertyAddress}
              style={{ padding: "10px" }}
               disabled={true}
            />
            {"  "} {t("Same as property address")}
          </label>
        </div>
      </div>
    </div>
  );
};

export default CorrespondenceAddressSection;
