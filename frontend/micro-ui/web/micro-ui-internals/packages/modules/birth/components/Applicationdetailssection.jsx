import React, { useState, useEffect } from "react";
import { Dropdown, TextInput } from "@egovernments/digit-ui-react-components";

const ApplicationDetailsSection = ({
  t,
  applicationDetails,
  handleInputChange,
  handleDropdownChange,
  formErrors,
  styles,
}) => {
  const stateId = Digit.ULBService.getStateId();

  // Fetch gender options from MDMS
  const { data: GenderData } = Digit.Hooks.pt.usePropertyMDMS(
    stateId,
    "common-masters",
    "GenderType"
  );

  // Fetch zone options
  const { data: ZoneData } = Digit.Hooks.pt.usePropertyMDMS(
    stateId,
    "tenant",
    "tenants"
  );

  // Fetch ward options (you may need to adjust based on your MDMS structure)
  const { data: WardData } = Digit.Hooks.pt.usePropertyMDMS(
    stateId,
    "tenant",
    "Ward"
  );

  // Fetch relationship options
  const { data: RelationshipData } = Digit.Hooks.pt.useRelationshipMDMS(
    stateId,
    "common-masters",
    "Relationship"
  );

  const genderOptions = (GenderData || []).map((item) => ({
    code: item.code,
    name: t(item.name),
  }));

  const placeOfDeathOptions = [
    { code: "HOME", name: t("Home") },
    { code: "HOSPITAL", name: t("Hospital") },
    { code: "OTHER", name: t("Other") },
  ];

  const zoneOptions = (ZoneData || []).map((item) => ({
    code: item.code,
    name: t(item.name || item.code),
  }));

  const wardOptions = (WardData || []).map((item) => ({
    code: item.code,
    name: t(item.name || item.code),
  }));

  const relationshipOptions = (RelationshipData || []).map((item) => ({
    code: item.code,
    name: t(item.name),
  }));

  return (
    <div>
      <div style={inlineStyles.formSection}>
        {/* Date of Death */}
        <div style={inlineStyles.flex30}>
          <div style={inlineStyles.poppinsLabel}>
            {t("Date of Death")} <span style={inlineStyles.mandatory}>*</span>
          </div>
          <TextInput
            type="date"
            style={inlineStyles.widthInput}
            value={applicationDetails.dateOfDeath}
            onChange={(e) => handleInputChange("dateOfDeath", e.target.value)}
            placeholder={t("Enter")}
          />
          {formErrors?.dateOfDeath && (
            <p style={inlineStyles.errorText}>{formErrors.dateOfDeath}</p>
          )}
        </div>

        {/* Gender */}
        <div style={inlineStyles.flex30}>
          <div style={inlineStyles.poppinsLabel}>
            {t("Gender")} <span style={inlineStyles.mandatory}>*</span>
          </div>
          <Dropdown
            t={t}
            option={genderOptions}
            selected={genderOptions.find(
              (opt) => opt.code === applicationDetails.gender?.code || opt.code === applicationDetails.gender
            )}
            select={(val) => handleDropdownChange("gender", val)}
            optionKey="name"
            placeholder={t("Select")}
            style={inlineStyles.widthInput}
          />
          {formErrors?.gender && (
            <p style={inlineStyles.errorText}>{formErrors.gender}</p>
          )}
        </div>

        {/* Father/Husband/Mother/Wife of Deceased */}
        <div style={inlineStyles.flex30}>
          <div style={inlineStyles.poppinsLabel}>
            {t("Father/Husband/Mother/Wife of Deceased")}{" "}
            <span style={inlineStyles.mandatory}>*</span>
          </div>
          <TextInput
            style={inlineStyles.widthInput}
            value={applicationDetails.relationName}
            onChange={(e) => handleInputChange("relationName", e.target.value)}
            placeholder={t("Enter")}
          />
          {formErrors?.relationName && (
            <p style={inlineStyles.errorText}>{formErrors.relationName}</p>
          )}
        </div>

        {/* Place of Death */}
        <div style={inlineStyles.flex30}>
          <div style={inlineStyles.poppinsLabel}>
            {t("Place of Death")} <span style={inlineStyles.mandatory}>*</span>
          </div>
          <Dropdown
            t={t}
            option={placeOfDeathOptions}
            selected={placeOfDeathOptions.find(
              (opt) =>
                opt.code === applicationDetails.placeOfDeath?.code ||
                opt.code === applicationDetails.placeOfDeath
            )}
            select={(val) => handleDropdownChange("placeOfDeath", val)}
            optionKey="name"
            placeholder={t("Select")}
            style={inlineStyles.widthInput}
          />
          {formErrors?.placeOfDeath && (
            <p style={inlineStyles.errorText}>{formErrors.placeOfDeath}</p>
          )}
        </div>

        {/* Place of Cremation */}
        <div style={inlineStyles.flex30}>
          <div style={inlineStyles.poppinsLabel}>
            {t("Place of Cremation")} <span style={inlineStyles.mandatory}>*</span>
          </div>
          <TextInput
            style={inlineStyles.widthInput}
            value={applicationDetails.placeOfCremation}
            onChange={(e) => handleInputChange("placeOfCremation", e.target.value)}
            placeholder={t("Enter")}
          />
          {formErrors?.placeOfCremation && (
            <p style={inlineStyles.errorText}>{formErrors.placeOfCremation}</p>
          )}
        </div>

        {/* Home Address */}
        <div style={inlineStyles.flex30}>
          <div style={inlineStyles.poppinsLabel}>{t("Home Address")}</div>
          <TextInput
            style={inlineStyles.widthInput}
            value={applicationDetails.homeAddress}
            onChange={(e) => handleInputChange("homeAddress", e.target.value)}
            placeholder={t("Enter")}
          />
          {formErrors?.homeAddress && (
            <p style={inlineStyles.errorText}>{formErrors.homeAddress}</p>
          )}
        </div>

        {/* Zone */}
        <div style={inlineStyles.flex30}>
          <div style={inlineStyles.poppinsLabel}>
            {t("Zone")} <span style={inlineStyles.mandatory}>*</span>
          </div>
          <Dropdown
            t={t}
            option={zoneOptions}
            selected={zoneOptions.find(
              (opt) =>
                opt.code === applicationDetails.zone?.code ||
                opt.code === applicationDetails.zone
            )}
            select={(val) => handleDropdownChange("zone", val)}
            optionKey="name"
            placeholder={t("Select")}
            style={inlineStyles.widthInput}
          />
          {formErrors?.zone && (
            <p style={inlineStyles.errorText}>{formErrors.zone}</p>
          )}
        </div>

        {/* Ward */}
        <div style={inlineStyles.flex30}>
          <div style={inlineStyles.poppinsLabel}>
            {t("Ward")} <span style={inlineStyles.mandatory}>*</span>
          </div>
          <Dropdown
            t={t}
            option={wardOptions}
            selected={wardOptions.find(
              (opt) =>
                opt.code === applicationDetails.ward?.code ||
                opt.code === applicationDetails.ward
            )}
            select={(val) => handleDropdownChange("ward", val)}
            optionKey="name"
            placeholder={t("Select")}
            style={inlineStyles.widthInput}
          />
          {formErrors?.ward && (
            <p style={inlineStyles.errorText}>{formErrors.ward}</p>
          )}
        </div>

        {/* Aadhaar Number of Deceased */}
        <div style={inlineStyles.flex30}>
          <div style={inlineStyles.poppinsLabel}>{t("Aadhaar Number of Deceased")}</div>
          <TextInput
            style={inlineStyles.widthInput}
            value={applicationDetails.aadhaarNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 12);
              handleInputChange("aadhaarNumber", value);
            }}
            placeholder={t("Enter")}
            maxLength={12}
          />
          {formErrors?.aadhaarNumber && (
            <p style={inlineStyles.errorText}>{formErrors.aadhaarNumber}</p>
          )}
        </div>

        {/* Relatives/Reporter's Relationship with Deceased */}
        <div style={inlineStyles.flex30}>
          <div style={inlineStyles.poppinsLabel}>
            {t("Relatives/Reporter's Relationship with Deceased")}{" "}
            <span style={inlineStyles.mandatory}>*</span>
          </div>
          <Dropdown
            t={t}
            option={relationshipOptions}
            selected={relationshipOptions.find(
              (opt) =>
                opt.code === applicationDetails.reporterRelationship?.code ||
                opt.code === applicationDetails.reporterRelationship
            )}
            select={(val) => handleDropdownChange("reporterRelationship", val)}
            optionKey="name"
            placeholder={t("Select")}
            style={inlineStyles.widthInput}
          />
          {formErrors?.reporterRelationship && (
            <p style={inlineStyles.errorText}>{formErrors.reporterRelationship}</p>
          )}
        </div>

        {/* Reporter's Name */}
        <div style={inlineStyles.flex30}>
          <div style={inlineStyles.poppinsLabel}>
            {t("Reporter's Name")} <span style={inlineStyles.mandatory}>*</span>
          </div>
          <TextInput
            style={inlineStyles.widthInput}
            value={applicationDetails.reporterName}
            onChange={(e) => handleInputChange("reporterName", e.target.value)}
            placeholder={t("Enter")}
          />
          {formErrors?.reporterName && (
            <p style={inlineStyles.errorText}>{formErrors.reporterName}</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Inline styles
const inlineStyles = {
  formSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "20px",
  },
  flex30: {
    flex: "1 1 30%",
    minWidth: "250px",
  },
  poppinsLabel: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
    marginBottom: "8px",
    fontFamily: "Poppins, sans-serif",
  },
  mandatory: {
    color: "red",
    marginLeft: "4px",
  },
  widthInput: {
    width: "100%",
    minWidth: "250px",
  },
  errorText: {
    color: "red",
    fontSize: "12px",
    marginTop: "4px",
    fontFamily: "Poppins, sans-serif",
  },
};

export default ApplicationDetailsSection;