import React from "react";
import { Dropdown, TextInput, SubmitBar } from "@egovernments/digit-ui-react-components";

const OwnershipDetailsSection = ({
  t,
  owners,
  setOwners,
  isJointStarted, styles, formErrors, handleOwnerAadhaarChange, handleOwnerNameChange, handleOwnerContactChange, handleOwnerEmailChange, propertyCategoryInput, propertyCategoryInputChange
}) => {
  const stateId = Digit.ULBService.getStateId();
  const { data: SubOwnerShipCategoryOb, isLoading } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "SubOwnerShipCategory");
  const { data: OwnerShipCategoryOb, isLoading: ownerShipCatLoading } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "OwnerShipCategory");
  const { data: PropertyCategory } = Digit.Hooks.pt.usePropertyCategoryMDMS(stateId, "common-masters", "PropertyCategory");

  const { data: Menu } = Digit.Hooks.pt.useSalutationsMDMS(stateId, "common-masters", "Salutations");
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
 const { data: Relationship } = Digit.Hooks.pt.useRelationshipMDMS(stateId, "common-masters", "Relationship");
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
  const dropdownOptions = (Array.isArray(OwnerShipCategoryOb) ? OwnerShipCategoryOb : []).map(item => ({
    code: item.code,
    name: t(item.name)
  }));

  const propertyCategoryOptions = (PropertyCategory || []).map((item) => ({

    code: item.code,
    name: t(item.name),
  }))

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
                disable={true}
              />
              <TextInput
                disabled
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
                disable={true}
              />
              <TextInput
                style={styles.textBox}
                placeholder={t("यहाँ लिखें")}
                value={owner.hindiName}
                disabled
                onChange={(e) => handleOwnerNameChange(index, "hindiName", e.target.value)}
              />
            </div>
            {/* ✅ CHANGE THIS: Use the dynamic key */}
            {formErrors[`owner-${index}-hindiName`] && (
              <p style={{ color: "red", fontSize: "12px" }}>{formErrors[`owner-${index}-hindiName`]}</p>
            )}
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
               disable={true}   
            //  select={(val) => updateOwner(index, "gender", val.name)}
              optionKey="name"
              placeholder={t("Select")}
              style={styles.widthInput}
            />


            {formErrors?.relationship && (
              <p style={{ color: "red", fontSize: "12px" }}>{formErrors.relationship}</p>
            )}
          </div>
           {/* Mobile */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>
              {t("Mobile Number")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>
            <TextInput
              value={owner.mobile}
              disabled

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
              disabled
              value={owner.altNumber}
              onChange={(e) => handleOwnerContactChange(index, "altNumber", e.target.value)}
              style={styles.widthInput}
              placeholder={t("Enter")}
            />
            {formErrors[`owner-${index}-altNumber`] && (
              <p style={{ color: "red", fontSize: "12px" }}>{formErrors[`owner-${index}-altNumber`]}</p>
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
              disabled={true}
            />
            {formErrors[`owner-${index}-email`] && (
              <p style={{ color: "red", fontSize: "12px" }}>{formErrors[`owner-${index}-email`]}</p>
            )}
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
              disable={true}             
              selected={(Relationship || []).find(opt => opt.code === owner.relationship)}             
              optionKey="name"
              placeholder={t("Select")}
              select={(val) => {
                console.log(val)
              }}
              style={styles.widthInput}
            />
            {formErrors?.relationship && (
              <p style={{ color: "red", fontSize: "12px" }}>{formErrors.relationship}</p>
            )}
          </div>

          {/* Father/Husband Name */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>
              {t("Father/Husband Name")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>
            <TextInput
              disabled
              style={styles.widthInput}
              value={owner.fatherHusbandName }
              onChange={(e) => handleOwnerNameChange(index, "fatherHusbandName", e.target.value)}
              placeholder={t("Enter")}
            />
            {formErrors[`owner-${index}-fatherHusbandName`] && (
              <p style={{ color: "red", fontSize: "12px" }}>{formErrors[`owner-${index}-fatherHusbandName`]}</p>
            )}
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
                         selected={photoIdOptions.find(opt => opt.code === owner.PhotoID)}
                        disable={true}
                         optionKey="name"
                         style={styles.dropdown100}
                         placeholder={t("Select")}
                         placeholderStyle={{ color: "#000" }}
                       />
                       <TextInput
                         style={styles.textBox}
                         placeholder={t("Enter")}
                         disable={true}
                         value={owner.PhotoIDValue}
                          disabled={true}
                         onChange={(e) => 
                         {
                          //handlePhotoIDChange(index, "PhotoIDValue", e.target.value)
         
                         }
                         
                         }
                       />
                     </div>
                     {/* ✅ CHANGE THIS: Use the dynamic key */}
                     {formErrors[`owner-${index}-PhotoIDValue`] && (
                       <p style={{ color: "red", fontSize: "12px" }}>{formErrors[`owner-${index}-PhotoIDValue`]}</p>
                     )}
                   </div>

         
          

        </div>
      </div>
    );
  };

  console.log("propertyCategoryInputpropertyCategoryInput=", propertyCategoryInput)

  return (
    <div>
      <div className="form-section" style={styles.formSection}>

        {/* Name with Title */}



      </div>
      {owners.map((_, index) => renderOwnerForm(index))}

      
    </div>
  );
};

export default OwnershipDetailsSection;
