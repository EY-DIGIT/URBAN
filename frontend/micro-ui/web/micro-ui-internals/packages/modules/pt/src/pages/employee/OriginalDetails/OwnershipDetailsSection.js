import React from "react";
import { Dropdown, TextInput } from "@egovernments/digit-ui-react-components";

const OwnershipDetailsSection = ({ t,generalDetails, owners = [], styles }) => {
  console.log("Owners in OwnershipDetailsSection:", generalDetails);
  // ✅ Filter only primary owners
  const primaryOwners = owners.filter((owner) => owner?.isPrimaryOwner === true);

  return (
    <div>
      {primaryOwners.length === 0 ? (
        <p style={{ padding: "10px" }}>{t("No primary owner details available")}</p>
      ) : (
        primaryOwners.map((owner, index) => (
          <div key={index}>
            <div className="form-section" style={styles.formSection}>
              {/* Property Category */}

               
              <div style={styles.flex30}>
                <div style={styles.poppinsLabel}>
                  {t("Property Category")} <span style={styles.mandatory}>*</span>
                </div>
                <Dropdown
                  style={styles.widthInput}
                  t={t}
                  optionKey="name"
                  placeholder={t(generalDetails?.propertyCategory || "N/A")}
                  disable={true}
                />
              </div>

              {/* Ownership Type */}
              <div style={styles.flex30}>
                <div style={styles.poppinsLabel}>
                  {t("Provide Ownership Details")} <span style={styles.mandatory}>*</span>
                </div>
                <Dropdown
                  style={styles.widthInput}
                  t={t}
                  optionKey="name"
                  placeholder={t(generalDetails?.ownershipCategory || "N/A")}
                  disable={true}
                />
              </div>

              {/* POA Registration Number */}
              <div style={styles.flex30}>
                <div style={styles.poppinsLabel}>{t("POA Registration Number")}</div>
                <TextInput
                  style={styles.widthInput}
                  value={generalDetails?.registryId || ""}
                  disabled
                />
              </div>
            </div>

            {/* OWNER DETAILS SECTION */}
            <div className="form-section" style={styles.formSection}>
              {/* Owner Name */}
              <div style={styles.flex30}>
                <div style={styles.poppinsLabel}>
                  {t("Owner Name")} <span style={styles.mandatory}>*</span>
                </div>
                <div style={styles.nameInputContainer}>
                  <Dropdown
                    t={t}
                    optionKey="name"
                    style={styles.dropdown30}
                    placeholder={owner?.salutation || t("Mr")}
                    disable={true}
                  />
                  <TextInput
                    disabled
                    style={styles.textBox}
                    value={owner?.name || ""}
                    placeholder={t("Enter")}
                  />
                </div>
              </div>

              {/* Owner Name Hindi */}
              <div style={styles.flex30}>
                <div style={styles.poppinsLabel}>
                  {t("Owner Name (हिंदी में)")} <span style={styles.mandatory}>*</span>
                </div>
                <div style={styles.nameInputContainer}>
                  <Dropdown
                    t={t}
                    optionKey="name"
                    style={styles.dropdown30}
                    placeholder={owner?.salutationHindi || t("श्री")}
                    disable={true}
                  />
                  <TextInput
                    style={styles.textBox}
                    value={owner?.hindiName || ""}
                    placeholder={t("यहाँ लिखें")}
                    disabled
                  />
                </div>
              </div>

              {/* Relationship */}
              <div style={styles.flex30}>
                <div style={styles.poppinsLabel}>
                  {t("Relationship")} <span style={styles.mandatory}>*</span>
                </div>
                <Dropdown
                  t={t}
                  option={[
                    { code: "FATHER", name: t("Father") },
                    { code: "HUSBAND", name: t("Husband") },
                    { code: "GUARDIAN", name: t("Guardian") },
                  ]}
                  disable={true}
                  optionKey="name"
                  placeholder={t(owner?.relationship || "Select")}
                  style={styles.widthInput}
                />
              </div>

              {/* Father/Husband Name */}
              <div style={styles.flex30}>
                <div style={styles.poppinsLabel}>
                  {t("Father/Husband Name")} <span style={styles.mandatory}>*</span>
                </div>
                <TextInput
                  disabled
                  style={styles.widthInput}
                  value={owner?.fatherOrHusbandName || ""}
                  placeholder={t("Enter")}
                />
              </div>

              {/* Email */}
              <div style={styles.flex30}>
                <div style={styles.poppinsLabel}>{t("Email ID")}</div>
                <TextInput
                  style={styles.widthInput}
                  value={owner?.emailId || ""}
                  placeholder={t("Enter")}
                  disabled
                />
              </div>

              {/* Mobile */}
              <div style={styles.flex30}>
                <div style={styles.poppinsLabel}>
                  {t("Mobile Number")} <span style={styles.mandatory}>*</span>
                </div>
                <TextInput
                  disabled
                  style={styles.widthInput}
                  value={owner?.mobileNumber || ""}
                  placeholder={t("Enter")}
                />
              </div>

              {/* Alternative Number */}
              <div style={styles.flex30}>
                <div style={styles.poppinsLabel}>{t("Alternative Number")}</div>
                <TextInput
                  disabled
                  style={styles.widthInput}
                  value={owner?.altContactNumber || ""}
                  placeholder={t("Enter")}
                />
              </div>

              {/* Aadhaar */}
              <div style={styles.flex30}>
                <div style={styles.poppinsLabel}>
                  {t("Aadhaar ID")} <span style={styles.mandatory}>*</span>
                </div>
                <TextInput
                  style={styles.widthInput}
                  value={
                    owner?.aadhaarNumber
                      ? owner.aadhaarNumber.replace(/\d(?=\d{4})/g, "X")
                      : ""
                  }
                  disabled
                  placeholder={t("Enter")}
                />
              </div>

              {/* Samagra ID */}
              <div style={styles.flex30}>
                <div style={styles.poppinsLabel}>
                  {t("Samagra ID")} <span style={styles.mandatory}>*</span>
                </div>
                <TextInput
                  style={styles.widthInput}
                  value={owner?.samagraId || ""}
                  disabled
                  placeholder={t("Enter")}
                />
                <div style={{ marginTop: "4px" }}>
                  <label style={{ fontSize: "14px" }}>
                    <input
                      type="checkbox"
                      checked={!owner?.samagraId}
                      readOnly
                      style={{ marginRight: "8px" }}
                    />
                    {t("I don't have Samagra ID")}
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OwnershipDetailsSection;
