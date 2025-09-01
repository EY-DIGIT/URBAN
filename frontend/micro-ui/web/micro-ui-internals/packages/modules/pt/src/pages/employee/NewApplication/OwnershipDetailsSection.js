import React from "react";
import { Dropdown, TextInput, SubmitBar } from "@egovernments/digit-ui-react-components";

const OwnershipDetailsSection = ({
  t,
  ownershipType,
  handleOwnershipTypeChange,
  handleRestryIdChange,
  registryId,
  owners,
  setOwners,
  addNewOwner,
  isJointStarted, styles, formErrors, handleOwnerAadhaarChange, handleOwnerNameChange, handleOwnerContactChange, handleOwnerEmailChange
}) => {
  const stateId = Digit.ULBService.getStateId();
  const { data: SubOwnerShipCategoryOb, isLoading } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "SubOwnerShipCategory");
  const { data: OwnerShipCategoryOb, isLoading: ownerShipCatLoading } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "OwnerShipCategory");

  const { data: Menu } = Digit.Hooks.pt.useSalutationsMDMS(stateId, "common-masters", "Salutations");
  const { data: Relationship } = Digit.Hooks.pt.useRelationshipMDMS(stateId, "common-masters", "Relationship");
  console.log("Relationship", Relationship)
  const salutationOptions = (Menu || []).map((item) => ({
    code: item.code,
    name: t(item.name), // Use i18nKey for translation
  }));

  const dropdownOptions = (Array.isArray(OwnerShipCategoryOb) ? OwnerShipCategoryOb : []).map(item => ({
    code: item.code,
    name: t(item.name)
  }));

  // const updateOwner = (index, field, value) => {
  //   const updated = [...owners];
  //   updated[index][field] = value;
  //   setOwners(updated);
  // };

  const updateOwner = (index, field, value) => {
    const updated = [...owners];
    updated[index][field] = value;

    // Optional logic: clear samagraID if checkbox ticked
    if (field === "noSamagra" && value === true) {
      updated[index]["samagraID"] = "";
    }

    setOwners(updated);
  };

  const renderOwnerForm = (index) => {
    const owner = owners[index];

    return (
      <div key={index}>
        {(isJointStarted || index > 0) && (
          <div style={styles.poppinsLabel}>{t(`Owner ${index + 1}`)}</div>
        )}

        <div className="form-section" style={styles.formSection}>

          {/* Name with Title */}
          <div style={styles.flex30}>
            <div style={{ ...styles.poppinsLabel, color: "#555" }}>
              {t("Owner Name")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>
            <div style={styles.nameInputContainer}>
              <Dropdown
                t={t}
                option={salutationOptions}
                selected={salutationOptions.find(opt => opt.code === owner.title)}
                select={(val) => updateOwner(index, "title", val.code)}
                optionKey="name"
                style={styles.dropdown30}
                placeholder={t("Mr")}
                placeholderStyle={{ color: "#000" }}
              />
              <TextInput
                style={styles.textBox}
                placeholder={t("Enter")}
                value={owner.name}
                onChange={(e) => handleOwnerNameChange(index, "name", e.target.value)}
              />
            </div>
            {/* ✅ CHANGE THIS: Use the dynamic key */}
            {formErrors[`owner-${index}-name`] && (
              <p style={{ color: "red", fontSize: "12px" }}>{formErrors[`owner-${index}-name`]}</p>
            )}
          </div>
          {/* Hindi Name */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>
              {t("Owner Name (हिंदी में)")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>
            <div style={styles.nameInputContainer}>
              <Dropdown
                t={t}
                option={salutationOptions}
                selected={salutationOptions.find(opt => opt.code === owner.hindiTitle)}
                select={(val) => updateOwner(index, "hindiTitle", val.code)}
                optionKey="name"
                style={styles.dropdown30}
                placeholder={t("Mr")}
              />
              <TextInput
                style={styles.textBox}
                placeholder={t("यहाँ लिखें")}
                value={owner.hindiName}
                onChange={(e) => handleOwnerNameChange(index, "hindiName", e.target.value)}
              />
            </div>
            {/* ✅ CHANGE THIS: Use the dynamic key */}
            {formErrors[`owner-${index}-hindiName`] && (
              <p style={{ color: "red", fontSize: "12px" }}>{formErrors[`owner-${index}-hindiName`]}</p>
            )}
          </div>
          {/* Father/Husband Name */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>
              {t("Father/Husband Name")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>
            <TextInput
              style={styles.widthInput}
              value={owner.fatherHusbandName}
              onChange={(e) => handleOwnerNameChange(index, "fatherHusbandName", e.target.value)}
              placeholder={t("Enter")}
            />
            {formErrors[`owner-${index}-fatherHusbandName`] && (
              <p style={{ color: "red", fontSize: "12px" }}>{formErrors[`owner-${index}-fatherHusbandName`]}</p>
            )}
          </div>
          {/* Relationship */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>
              {t("Relationship")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>
            {/* <Dropdown
              t={t}
              option={[
                { code: "FATHER", name: t("Father") },
                { code: "HUSBAND", name: t("Husband") },
                { code: "GUARDIAN", name: t("Guardian") }
              ]}
              selected={{ name: owner.relationship }}
              select={(val) => updateOwner(index, "relationship", val.name)}
              optionKey="name"
              placeholder={t("Select")}
              style={styles.widthInput}
            /> */}
            <Dropdown
              t={t}
              option={(Relationship || []).map(rel => ({
                code: rel.code,
                name: rel.name, // use i18nKey if available, fallback to name
              }))}
              selected={
                owner.relationship
                  ? {
                    code: owner.relationship,
                    name:
                      (Relationship || []).find(rel => rel.code === owner.relationship)?.name ||
                      owner.relationship,
                  }
                  : null
              }
              select={(val) => updateOwner(index, "relationship", val.code)}
              optionKey="name"
              placeholder={t("Select")}
              style={styles.widthInput}
            />

            {formErrors?.relationship && (
              <p style={{ color: "red", fontSize: "12px" }}>{formErrors.relationship}</p>
            )}
          </div>
          {/* Email */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>{t("Email ID")}</div>
            <TextInput
              value={owner.email}
              onChange={(e) => handleOwnerEmailChange(index, e.target.value)}
              style={styles.widthInput}
              placeholder={t("Enter")}
            />
            {formErrors[`owner-${index}-email`] && (
              <p style={{ color: "red", fontSize: "12px" }}>{formErrors[`owner-${index}-email`]}</p>
            )}
          </div>
          {/* Mobile */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>
              {t("Mobile Number")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>
            <TextInput
              value={owner.mobile}
              onChange={(e) => handleOwnerContactChange(index, "mobile", e.target.value)}
              style={styles.widthInput}
              placeholder={t("Enter")}
            />
            {formErrors[`owner-${index}-mobile`] && (
              <p style={{ color: "red", fontSize: "12px" }}>{formErrors[`owner-${index}-mobile`]}</p>
            )}
          </div>

          {/* Alternative Number */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>{t("Alternative Number")}</div>
            <TextInput
              value={owner.altNumber}
              onChange={(e) => handleOwnerContactChange(index, "altNumber", e.target.value)}
              style={styles.widthInput}
              placeholder={t("Enter")}
            />
            {formErrors[`owner-${index}-altNumber`] && (
              <p style={{ color: "red", fontSize: "12px" }}>{formErrors[`owner-${index}-altNumber`]}</p>
            )}
          </div>
          {/* Aadhaar */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>{t("Aadhaar ID")} <span className="mandatory" style={styles.mandatory}>*</span></div>
            <TextInput
              style={styles.widthInput}
              value={owner.aadhaar}
              // ✅ CHANGE THIS LINE
              // It should now call the new handler passed from the parent
              onChange={(e) => handleOwnerAadhaarChange(index, e.target.value)}
              placeholder={t("Enter")}
            />
            {/* ✅ CHANGE THIS LINE */}
            {/* It should now look for the correct, dynamic error key */}
            {formErrors[`owner-${index}-aadhaar`] && (
              <p style={{ color: "red", fontSize: "12px" }}>{formErrors[`owner-${index}-aadhaar`]}</p>
            )}
          </div>

          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>
              {t("Samagra ID")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>
            <TextInput
              value={owner.samagraID}
              onChange={(e) => updateOwner(index, "samagraID", e.target.value)}
              style={styles.widthInput}
              disabled={owner.noSamagra === true}
              placeholder={t("Enter")}
            />
            <div style={{ marginTop: "4px" }}>
              <label style={{ fontSize: "14px" }}>
                <input
                  type="checkbox"
                  checked={owner.noSamagra}
                  onChange={(e) => updateOwner(index, "noSamagra", e.target.checked)}
                  style={{ marginRight: "8px" }}
                />
                {t("I don't have Samagra ID")}
              </label>
            </div>
            {formErrors?.samagraID && (
              <p style={{ color: "red", fontSize: "12px" }}>{formErrors.samagraID}</p>
            )}
          </div>

        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="form-section" style={styles.formSection}>

        {/* Name with Title */}

        <div style={styles.flex30}>
          <div style={styles.poppinsLabel}>
            {t("Provide Ownership Details")} <span className="mandatory" style={styles.mandatory}>*</span>
          </div>
          <Dropdown
            style={styles.widthInput}
            t={t}
            option={dropdownOptions}
            // selected={"ownershipType"}
            selected={dropdownOptions.find(opt => opt.code === ownershipType)}
            select={handleOwnershipTypeChange}
            optionKey="name"
            placeholder={t("Select")}
          />
          {formErrors?.ownershipType && (
            <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
              {formErrors.ownershipType}
            </p>
          )}
        </div>
        <div style={styles.flex30}>
          <div style={styles.poppinsLabel}>
            {t("POA Registration Number")}
          </div>
          <TextInput
            value={registryId}
            onChange={(e) => handleRestryIdChange(e.target.value)}
            style={styles.widthInput}

          />
          {formErrors?.registryId && (
            <p style={{ color: "red", fontSize: "12px", marginTop: '-18px', marginBottom: '10px' }}>{formErrors.registryId}</p>
          )}
        </div>
        <div style={styles.flex30}></div>
      </div>
      {owners.map((_, index) => renderOwnerForm(index))}

      {ownershipType === "INDIVIDUAL.MULTIPLEOWNERS" && (
        <div style={{ textAlign: "right" }}>
          <SubmitBar label={t("Add New Owner")} onSubmit={addNewOwner} />
        </div>
      )}
    </div>
  );
};

export default OwnershipDetailsSection;
