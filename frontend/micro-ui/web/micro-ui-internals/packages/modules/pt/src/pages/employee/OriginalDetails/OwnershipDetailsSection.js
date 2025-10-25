import React from "react";
import { Dropdown, TextInput, SubmitBar } from "@egovernments/digit-ui-react-components";

const OwnershipDetailsSection = ({
  t,
  styles
}) => {








  return (
    <div>
      <div className="form-section" style={styles.formSection}>

        {/* Name with Title */}

        <div style={styles.flex30}>
          <div style={styles.poppinsLabel}>
            {t("Property Category")} <span className="mandatory" style={styles.mandatory}>*</span>
          </div>
          <Dropdown
            style={styles.widthInput}
            t={t}

            optionKey="name"
            placeholder={t("Select")}
            disable={true}
          />

        </div>

        <div style={styles.flex30}>
          <div style={styles.poppinsLabel}>
            {t("Provide Ownership Details")} <span className="mandatory" style={styles.mandatory}>*</span>
          </div>
          <Dropdown
            style={styles.widthInput}
            t={t}

            optionKey="name"
            placeholder={t("Select")}
            disable={true}
          />

        </div>
        <div style={styles.flex30}>
          <div style={styles.poppinsLabel}>
            {t("POA Registration Number")}
          </div>
          <TextInput

            style={styles.widthInput}

          />

        </div>
        <div style={styles.flex30}></div>
      </div>
      <div >
        <div className="form-section" style={styles.formSection}>

          {/* Name with Title */}
          <div style={styles.flex30}>
            <div style={{ ...styles.poppinsLabel, color: "#555" }}>
              {t("Owner Name")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>
            <div style={styles.nameInputContainer}>
              <Dropdown
                t={t}

                optionKey="name"
                style={styles.dropdown30}
                placeholder={t("Mr")}
                placeholderStyle={{ color: "#000" }}
                disable={true}
              />
              <TextInput
                disabled
                style={styles.textBox}
                placeholder={t("Enter")}

              />
            </div>

          </div>
          {/* Hindi Name */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>
              {t("Owner Name (हिंदी में)")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>
            <div style={styles.nameInputContainer}>
              <Dropdown
                t={t}

                optionKey="name"
                style={styles.dropdown30}
                placeholder={t("Mr")}
                disable={true}
              />
              <TextInput
                style={styles.textBox}
                placeholder={t("यहाँ लिखें")}
                disabled
              />
            </div>

          </div>

          {/* Relationship */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>
              {t("Relationship")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>
            <Dropdown
              t={t}
              option={[
                { code: "FATHER", name: t("Father") },
                { code: "HUSBAND", name: t("Husband") },
                { code: "GUARDIAN", name: t("Guardian") }
              ]}
              disable={true}

              optionKey="name"
              placeholder={t("Select")}
              style={styles.widthInput}
            />

          </div>

          {/* Father/Husband Name */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>
              {t("Father/Husband Name")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>
            <TextInput
              disabled
              style={styles.widthInput}

              placeholder={t("Enter")}
            />

          </div>
          {/* Email */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>{t("Email ID")}</div>
            <TextInput
              style={styles.widthInput}
              placeholder={t("Enter")}
              disabled
            />

          </div>
          {/* Mobile */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>
              {t("Mobile Number")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>
            <TextInput
              disabled

              style={styles.widthInput}
              placeholder={t("Enter")}
            />

          </div>

          {/* Alternative Number */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>{t("Alternative Number")}</div>
            <TextInput
              disabled

              style={styles.widthInput}
              placeholder={t("Enter")}
            />

          </div>
          {/* Aadhaar */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>{t("Aadhaar ID")} <span className="mandatory" style={styles.mandatory}>*</span></div>
            <TextInput
              style={styles.widthInput}
              // value={owner.aadhaar}

              disabled
              // ✅ CHANGE THIS LINE
              // It should now call the new handler passed from the parent

              placeholder={t("Enter")}
            />
            {/* ✅ CHANGE THIS LINE */}
            {/* It should now look for the correct, dynamic error key */}

          </div>

          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>
              {t("Samagra ID")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>
            <TextInput

              style={styles.widthInput}

              disabled
              placeholder={t("Enter")}
            />
            <div style={{ marginTop: "4px" }}>
              <label style={{ fontSize: "14px" }}>
                <input
                  type="checkbox"

                  style={{ marginRight: "8px" }}
                />
                {t("I don't have Samagra ID")}
              </label>
            </div>

          </div>

        </div>
      </div>


    </div>
  );
};

export default OwnershipDetailsSection;
