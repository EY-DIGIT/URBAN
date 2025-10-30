import React, { useState, useEffect } from "react";
import { Dropdown, TextInput, SubmitBar, ActionLinks } from "@egovernments/digit-ui-react-components";

const OwnershipDetailsSection = ({
  t,
  ownershipType,
  owners,
  setOwners,
  addNewOwner,
  setIsJointStarted,
  setFormErrors,
  isJointStarted, styles, formErrors, handleOwnerNameChange,handlePhotoIDChange, handleOwnerContactChange, handleOwnerEmailChange, propertyCategoryInput, propertyCategoryInputChange
}) => {


  // const { data: { stateInfo, uiHomePage } = {}, isLoading } = Digit.Hooks.useStore.getInitData();
  //   console.log("URL==",stateInfo);
  //   console.log("uiHome==",uiHomePage);



  const stateId = Digit.ULBService.getStateId();
  const { data: SubOwnerShipCategoryOb, isLoading } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "SubOwnerShipCategory");
  const { data: OwnerShipCategoryOb, isLoading: ownerShipCatLoading } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "OwnerShipCategory");
 const { data: Menu } = Digit.Hooks.pt.useSalutationsMDMS(stateId, "common-masters", "Salutations");
  const { data: MenuHindi } = Digit.Hooks.pt.useSalutationsHindiMDMS(stateId, "common-masters", "SalutationsHindi");
  const { data: Relationship } = Digit.Hooks.pt.useRelationshipMDMS(stateId, "common-masters", "Relationship");
  //const { data: PropertyCategory } = Digit.Hooks.pt.usePropertyCategoryMDMS(stateId, "common-masters", "PropertyCategory");
// const [PhotoIDValue, setPhotoIDValue] = useState("");
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
  const dropdownOptions = (Array.isArray(OwnerShipCategoryOb) ? OwnerShipCategoryOb : []).map(item => ({
    code: item.code,
    name: t(item.name)
  }));

  const [showFather, setShowFather] = useState("");
  // const propertyCategoryOptions=(PropertyCategory || []).map((item)=>({

  //   code:item.code,
  //   name:t(item.name),
  // }))

  // const updateOwner = (index, field, value) => {
  //   const updated = [...owners];
  //   updated[index][field] = value;
  //   setOwners(updated);
  // };

  const deleteNewOwner = (indexToRemove) => {   
  const updated = [...owners];
 // const updatedItems = updated.filter(item => item.id !== indexToRemove);
 updated.splice(indexToRemove, 1);
  // const filteredArray = updated.filter(obj => Object.keys(obj).length > 0);
  // const { [indexToRemove]: removedItem, ...newObject } = filteredArray;
    setOwners(updated);
    if(updated.length === 0)
    {
     setIsJointStarted(false) 
    }
    else
    {
      setIsJointStarted(true)
    }
   // setIsJointStarted(true)
  };

  const updateOwner = (index, field, value) => {
    const updated = [...owners];
    updated[index][field] = value;
    if (field === "relationship") {
      setShowFather(value);
    }

    setOwners(updated);
  };

  const renderOwnerForm = (index) => {
    const owner = owners[index];

    // const fixedAadhaar = "123412341234";
    // if (owner.aadhaar !== fixedAadhaar) {
    //   handleOwnerAadhaarChange(index, fixedAadhaar);
    // }

    return (
      <div key={index}>
        {(isJointStarted || index > 0) && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={styles.poppinsLabel}>{t(`Owner ${index + 1}`)}</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
             <button
            type="button"
           // onClick={deleteNewOwner}
             onClick={() => deleteNewOwner(index)}
            style={styles.deleteBtn}
          >
            ✕
          </button>
          </div>
          </div>
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
                disabled={owner.title?false:false}
                optionKey="name"
                style={styles.dropdown30}
                placeholder={t("Mr")}
                placeholderStyle={{ color: "#000" }}
              />
              <TextInput
                style={styles.textBox}
                placeholder={t("Enter")}
                value={owner.name}
                disabled={owner.name?false:false}
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
                option={salutationOptionsHindi}
                disabled={owner.hindiTitle?false:false}
                selected={salutationOptionsHindi.find(opt => opt.code === owner.hindiTitle)}
                select={(val) => updateOwner(index, "hindiTitle", val.code)}
                optionKey="name"
                style={styles.dropdown30}
                placeholder={t("श्री")}
              />
              <TextInput
                style={styles.textBox}
                disabled={owner.hindiName?false:false}
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
              disabled={owner.gender?false:false}
              select={(val) => updateOwner(index, "gender", val.code)}
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
              value={owner.mobileNumber}
              disabled={owner.mobileNumber?false:false}
              onChange={(e) => handleOwnerContactChange(index, "mobileNumber", e.target.value)}
              style={styles.widthInput}
              placeholder={t("Enter")}
            />
            {formErrors[`owner-${index}-mobileNumber`] && (
              <p style={{ color: "red", fontSize: "12px" }}>{formErrors[`owner-${index}-mobileNumber`]}</p>
            )}
          </div>

          {/* Alternative Number */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>{t("Alternative Number")}</div>
            <TextInput
              value={owner.alternatemobilenumber}
               disabled={owner.alternatemobilenumber?false:false}
              onChange={(e) => handleOwnerContactChange(index, "alternatemobilenumber", e.target.value)}
              style={styles.widthInput}
              placeholder={t("Enter")}
            />
            {formErrors[`owner-${index}-alternatemobilenumber`] && (
              <p style={{ color: "red", fontSize: "12px" }}>{formErrors[`owner-${index}-alternatemobilenumber`]}</p>
            )}
          </div>
          {/* Email */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>{t("Email ID")}</div>
            <TextInput
              value={owner.email}
               disabled={owner.email?false:false}
              onChange={(e) => handleOwnerEmailChange(index, e.target.value)}
              style={styles.widthInput}
              placeholder={t("Enter")}
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
              // select={(val) => updateOwner(index, "relationship", val.code)}
             disabled={owner.relationship?false:false}
              select={(val) => {
                updateOwner(index, "relationship", val.code);


                if (val.code === "Not applicable") {
                  updateOwner(index, "fatherOrHusbandName", "Not Applicable");
                }
              }}
              optionKey="name"
              placeholder={t("Select")}
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
              style={styles.widthInput}
              value={owner.fatherOrHusbandName}
              disabled={owner.fatherOrHusbandName === "Not applicable" ? false : false}
              onChange={(e) => handleOwnerNameChange(index, "fatherOrHusbandName", e.target.value)}
              placeholder={t("Enter")}
              //disabled={owner.relationship === "Not applicable"}
            />
            {owner.relationship === "Not applicable" ?
              "" : <div>  {formErrors[`owner-${index}-fatherOrHusbandName`] && (
                <p style={{ color: "red", fontSize: "12px" }}>{formErrors[`owner-${index}-fatherOrHusbandName`]}</p>
              )}</div>}

            {/* {formErrors[`owner-${index}-fatherOrHusbandName`] && (
              <p style={{ color: "red", fontSize: "12px" }}>{formErrors[`owner-${index}-fatherOrHusbandName`]}</p>
            )} */}



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
                select={(val) =>
                {
                  //setPhotoIDValue("");
                  updateOwner(index, "PhotoID", val.code)
                  updateOwner(index, "PhotoIDValue", "");
                  const errors = { ...formErrors };
                  // setFormErrors((prev) => {
                  //     const updated = { ...prev, PhotoIDValue: "Enter Photo ID value" };
                  //     return updated;
                  //   });
                 // errors[`owner-${index}-PhotoIDValue`] = "Enter Photo ID value";
                }}
                optionKey="name"
                style={styles.dropdown100}
                placeholder={t("Select")}
                placeholderStyle={{ color: "#000" }}
              />
              <TextInput
                style={styles.textBox}
                placeholder={t("Enter")}
                value={owner.PhotoIDValue}
                 disabled={owner.PhotoIDValue?false:false}
                onChange={(e) => 
                {
                  handlePhotoIDChange(index, "PhotoIDValue", e.target.value)

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

  return (
    <div>

      {owners.map((_, index) => renderOwnerForm(index))}

      {(ownershipType === "No" )  && (
        <div style={{ textAlign: "right" }}>
          {/* <ActionLinks label={t("Add New Owner")} onSubmit={addNewOwner} /> */}
           <button
            type="button"
            onClick={addNewOwner}
           // onSubmit={addNewOwner}
            style={{
              ...stylesbt.addMoreBtn,
              opacity:1,
              cursor:"pointer",
            }}
            disabled={false}
          >
            ADD MORE +
          </button>
        </div>
      )}
      
    </div>
  );
};
const stylesbt = {
  wrapper: {
    background: "#fff",
    // padding: "20px",
    borderRadius: "8px",
    // boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
    // margin: "10px 0",
  },
  header: {
    fontWeight: 700,
    fontSize: "18px",
    marginBottom: "5px",
    color: "#6B133F",
  },
  subHeader: {
    fontSize: "12px",
    color: "#555",
    marginBottom: "20px",
  },
  gridContainer: {
    display: "grid",
    gap: "20px",
  },
  fileBoxff: {
    width: "90%",
  },
  fileBox: {
    width: "90%",
    border: "2px dashed #aaa",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    position: "relative",
    minHeight: "90px",
  },
  iconBox: {
    flexShrink: 0,
  },
  labelArea: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
  },
  fileLabel: {
    fontWeight: "600",
    fontSize: "14px",
    marginBottom: "4px",
    color: "#333",
  },
  descText: {
    fontSize: "12px",
    color: "#888",
  },
  buttonArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "4px",
  },
  selectBtn: {
    backgroundColor: "#fff",
    color: "#6B133F",
    border: "1px solid #6B133F",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "400",
    textAlign: "center",
  },
  selectedFileText: {
    fontSize: "12px",
    color: "#444",
    maxWidth: "140px",
    textAlign: "right",
    wordBreak: "break-word",
  },
  addMoreBtn: {
    backgroundColor: "#fff",
    color: "#6B133F",
    border: "1px solid #6B133F",
    padding: "8px 14px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "400",
  },
  deleteBtn: {
    backgroundColor: "transparent",
    border: "none",
    color: "#aaa",
    fontSize: "16px",
    cursor: "pointer",
    position: "absolute",
    top: "0px",
    right: "5px",
    zIndex: 10,
  }
};

export default OwnershipDetailsSection;
