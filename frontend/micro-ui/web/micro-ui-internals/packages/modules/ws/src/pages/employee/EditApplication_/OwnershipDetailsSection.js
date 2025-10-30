import React, { useState, useEffect } from "react";
import { Dropdown, TextInput, SubmitBar, ActionLinks } from "@egovernments/digit-ui-react-components";

const OwnershipDetailsSection = ({
  t,
  owners,  
   styles,        
}) => {
  const stateId = Digit.ULBService.getStateId();
 const { data: Menu } = Digit.Hooks.pt.useSalutationsMDMS(stateId, "common-masters", "Salutations");
  const { data: MenuHindi } = Digit.Hooks.pt.useSalutationsHindiMDMS(stateId, "common-masters", "SalutationsHindi");
  const { data: Relationship } = Digit.Hooks.pt.useRelationshipMDMS(stateId, "common-masters", "Relationship");
  const { data: genderTypeData } = Digit.Hooks.obps.useMDMS(stateId, "common-masters", ["GenderType"]);
  const genderTypeOptions = (genderTypeData
    && genderTypeData["common-masters"]
    && genderTypeData["common-masters"].GenderType || []).map((item) => ({
      code: item.code,
      name: t(item.code), // Use i18nKey for translation
    }));
  const salutationOptions = (Menu || []).map((item) => ({
    code: item.code,
    name: t(item.name), // Use i18nKey for translation
  }));
  const photoIdOptions = [];
  photoIdOptions.push(
    {
      code: "ADDAAR",
      name: t("ADDAAR Card")
    },
    {
      code: "PAN",
      name: t("Pan Card")
    },
    {
      code: "VOTERID",
      name: t("Voter ID")
    },
    {
      code: "DRIVINGLICENSE",
      name: t("Driving License")
    }
  )
  const salutationOptionsHindi = (MenuHindi || []).map((item) => ({
    code: item.code,
    name: t(item.name), // Use i18nKey for translation
  }));
  

  

  const renderOwnerForm = (index) => {
    const owner = owners[index];

    // const fixedAadhaar = "123412341234";
    // if (owner.aadhaar !== fixedAadhaar) {
    //   handleOwnerAadhaarChange(index, fixedAadhaar);
    // }

    return (
      <div key={index}>
       

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
                disabled={true}
                optionKey="name"
                style={styles.dropdown30}
                placeholder={t("Mr")}
                placeholderStyle={{ color: "#000" }}
              />
              <TextInput
                style={styles.textBox}
                placeholder={t("Enter")}
                value={owner.name}
                disabled={true}
               
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
                option={salutationOptionsHindi}
                disabled={true}
                selected={salutationOptionsHindi.find(opt => opt.code === owner.hindiTitle)}                
                optionKey="name"
                style={styles.dropdown30}
                placeholder={t("श्री")}
              />
              <TextInput
                style={styles.textBox}
                disabled={true}
                placeholder={t("यहाँ लिखें")}
                value={owner.hindiName}                
              />
            </div>
           
          </div>

          {/* gender */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>
              {t("gender")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>
            <Dropdown
              t={t}
              option={genderTypeOptions}

              // option={[
              //   { code: "MALE", name: t("Male") },
              //   { code: "FEMALE", name: t("Female") },
              //   //{ code: "GUARDIAN", name: t("Guardian") }
              // ]}
             // selected={{ name: owner.gender }}
              selected={genderTypeOptions.find(opt => opt.code === owner.gender)}
              disabled={true}
              optionKey="name"
              placeholder={t("Select")}
              style={styles.widthInput}
            />
           
          </div>
          {/* Mobile */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>
              {t("Mobile Number")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>
            <TextInput
              value={owner.mobileNumber}
              disabled={true}
              style={styles.widthInput}
              placeholder={t("Enter")}
            />
           
          </div>

          {/* Alternative Number */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>{t("Alternative Number")}</div>
            <TextInput
              value={owner.alternatemobilenumber}
               disabled={true}
              style={styles.widthInput}
              placeholder={t("Enter")}
            />
          
          </div>
          {/* Email */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>{t("Email ID")}</div>
            <TextInput
              value={owner.email}
               disabled={true}
              style={styles.widthInput}
              placeholder={t("Enter")}
            />
           
          </div>
           {/* Relationship */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>
              {t("Relationship")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>

            <Dropdown
              t={t}
              option={(Relationship || []).map(rel => ({
                code: rel.code,
                name: rel.name, // use i18nKey if available, fallback to name
              }))}
              selected={owner.relationship || "Not Applicable" }
              
             disabled={true}
              
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
              style={styles.widthInput}
              value={owner.guardian?owner.guardian:owner.fatherOrHusbandName}
              disabled={true}
              placeholder={t("Enter")}
            />
           
          </div>
         
         {/* Photo with ID */}
          <div style={styles.flex30}>
            <div style={{ ...styles.poppinsLabel, color: "#555" }}>
              {t("Photo ID")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>
            <div style={styles.nameInputContainer}>
              <Dropdown
                t={t}
                option={photoIdOptions}
                //selected={photoIdOptions.find(opt => opt.code === owner.title)}
                selected={photoIdOptions.find(opt => opt.code === owner.identityType?.identityType)}               
                optionKey="name"
                style={styles.dropdown100}
                placeholder={t("Select")}
                placeholderStyle={{ color: "#000" }}
              />
              <TextInput
                style={styles.textBox}
                placeholder={t("Enter")}
                value={owner.identityType?.identityNumber}
                 disabled={owner.PhotoIDValue?false:false}
                
              />
            </div>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div>

      {owners.map((_, index) => renderOwnerForm(index))}

      
      
    </div>
  );
};


export default OwnershipDetailsSection;
