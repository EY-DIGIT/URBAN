import React, { useEffect } from "react";

const CorrespondenceAddressSection = ({
  t,
  address,
  styles
}) => {
  const getFullAddress = (address) => {
    if (!address) return "";
    const { doorNo, street, locality, ward, zone, pincode } = address;
    return `${doorNo || ""} ${street || ""} ${locality?.name || ""} ${ward || ""} ${zone || ""} ${pincode || ""}`.trim();
  };
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={styles.assessmentStyle}>{t("Correspondence Address")}</div>
      <div style={{ display: "flex" }}>
        <textarea
          style={styles.widthInputs}
          placeholder={t("Enter")}
          value={getFullAddress(address)}
          disabled

        />
        <div style={styles.checkboxMargin}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked
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
