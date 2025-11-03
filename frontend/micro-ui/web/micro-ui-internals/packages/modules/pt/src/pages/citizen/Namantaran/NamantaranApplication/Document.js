




// import React, { useState, useEffect } from "react";

// const AttachmentsSection = ({
//   t = (label) => label,
//   handleFileChange,
//   formErrors = {},
//   resetKey,
//   documents = {},
//   submitForm,namantaranPurposeInput
// }) => {
//   const [fileUrls, setFileUrls] = useState({});
//   const [isMobile, setIsMobile] = useState(false);
//   const [othersFields, setOthersFields] = useState([]);
//   console.log("namantaranPurposeInput===namantaranPurposeInputnamantaranPurposeInputnamantaranPurposeInput==",namantaranPurposeInput)

//   // Prepare fileStoreIds array to fetch URLs
//   useEffect(() => {
//     const fileStoreIds = Object.values(documents)
//       .filter(Boolean)
//       .map((doc) => doc.fileStoreId)
//       .filter(Boolean);

//     if (fileStoreIds.length) {
//       Digit.UploadServices.Filefetch(fileStoreIds, Digit.ULBService.getStateId())
//         .then((res) => setFileUrls(res?.data || {}))
//         .catch(() => setFileUrls({}));
//     }
//   }, [documents]);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const onFileChange = (key, file) => {
//     handleFileChange(key, file);
//   };

//   const handleSubmitForm=()=>{
//     submitForm();
//   }

//   const renderSvg = () => (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="32"
//       height="32"
//       fill="none"
//       stroke="#6b133f"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       viewBox="0 0 24 24"
//     >
//       <path d="M21.44 11.05L12.97 19.51a5.25 5.25 0 01-7.42-7.42l8.48-8.48a3.5 3.5 0 014.95 4.95l-8.49 8.48a1.75 1.75 0 01-2.47-2.47l7.78-7.78" />
//     </svg>
//   );

//   const renderFileInput = (id, label, isRequired = false, showDelete = false) => {
//     const doc = documents[id];
//     const fileStoreId = doc?.fileStoreId;
//     const fileUrl = fileStoreId ? fileUrls[fileStoreId]?.split(",")[0] : null;

//     // If user already selected a new file, display its name, else display existing doc name or placeholder
//     const selectedFileName = doc?.file?.name;

//     return (
//       <div key={id} style={styles.fileBox}>
//         <div style={styles.iconBox}>{renderSvg()}</div>
//         <div style={styles.labelArea}>
//           <label style={styles.fileLabel}>
//             {t(label)} {isRequired && <span style={{ color: "red" }}>*</span>}
//           </label>
//           {/* <div style={styles.descText}>JPG, PNG or PDF, file size no more than 2MB</div> */}
//           {/* <div style={styles.descText}>Accepts: Aadhaar, Driving License, Pan Card, Voter ID</div> */}
//         </div>

//         <input
//           key={`${id}_${resetKey}`}
//           id={id}
//           type="file"
//           style={{ display: "none" }}
//           accept=".jpg,.jpeg,.png,.pdf"
//           onChange={(e) => onFileChange(id, e.target.files[0])}
//         />

//         <div style={styles.buttonArea}>
//           {/* Show View link only if file URL is available */}
//           {/* {fileUrl && (
//             <a
//               href={fileUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               style={{ ...styles.selectBtn, marginRight: "10px" }}
//             >
//               View
//             </a>
//           )} */}

//           <label htmlFor={id} style={styles.selectBtn}>
//             {selectedFileName || "SELECT FILE"}
//           </label>

//         </div>

//         {showDelete && (
//           <button
//             type="button"
//             onClick={() => handleDeleteField(id)}
//             style={styles.deleteBtn}
//           >
//             ✕
//           </button>
//         )}

//         {(formErrors?.[id]) && (
//           <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
//             {formErrors[id]}
//           </p>
//         )}
//       </div>
//     );
//   };

//   const handleAddMore = () => {
//     setOthersFields((prev) => [...prev, `others_${prev.length + 1}`]);
//   };

//   const handleDeleteField = (fieldId) => {
//     setOthersFields((prev) => prev.filter((id) => id !== fieldId));
//   };

//   return (
//     <div style={styles.wrapper}>
//       <h3 style={styles.header}>Attachments</h3>
//       <p style={styles.subHeader}>
//         (*Accepted File Type: JPG/PNG/PDF **Maximum File Size: 2MB)
//       </p>



//            {namantaranPurposeInput==="COURTORDER"?   
//         <div
//         style={{
//           ...styles.gridContainer,
//           gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
//         }}
//       >

//                 {renderFileInput("photoId", "Past Sale Deed/Property Tax Receipt (Ancestor's Name)", true)}


//         {renderFileInput("photoId", "Court Order", true)}

//         {renderFileInput("photoId", "Aadhaar Card", true)}
//        {renderFileInput("ownershipDoc", "Death Certificate", true)}
//         {renderFileInput("ownershipDoc", "Last Paid Property Tax Receipt", true)}
//         {renderFileInput("ownershipDoc", "Water Charges Receipt/Affidavit In Case Of No Connection", true)}
//       </div>:
//       <div></div>
// }


//            {namantaranPurposeInput==="DHARANADHIKAR"?   
//         <div
//         style={{
//           ...styles.gridContainer,
//           gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
//         }}
//       >

//          {renderFileInput("photoId", "Electricity Bill", true)}

//             {renderFileInput("photoId", "Goverment Office Correspondence", true)}
//         {renderFileInput("photoId", "Census 2011 Address Proof", true)}

//         {renderFileInput("photoId", "Voter List Entry", true)}
//        {renderFileInput("ownershipDoc", "Aadhaar Card", true)}
//         {renderFileInput("ownershipDoc", "Last Paid Property Tax Receipt", true)}
//         {renderFileInput("ownershipDoc", "Water Charges Receipt/Affidavit In Case Of No Connection", true)}
//       </div>:
//       <div></div>
// }


//       {namantaranPurposeInput==="REGISTEREDUNREGISTEREDWILL"?   
//         <div
//         style={{
//           ...styles.gridContainer,
//           gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
//         }}
//       >
//         {renderFileInput("photoId", "Past Sale Deed/Property Tax Receipt (Ancestor's Name)", true)}
//         {renderFileInput("photoId", "Will Document", true)}
//         {renderFileInput("ownershipDoc", "Aadhaar Card", true)}
//         {renderFileInput("photoId", "Death Certificate", true)}
//         {renderFileInput("photoId", "3 Witness Statements", true)}

//         {renderFileInput("photoId", "Ownership Document Of Previous Owner", true)}

//         {renderFileInput("ownershipDoc", "Last Paid Property Tax Receipt", true)}
//         {renderFileInput("ownershipDoc", "Water Charges Receipt/Affidavit In Case Of No Connection", true)}
//       </div>:
//       <div></div>
// }

//       {namantaranPurposeInput==="AUTHORITYLETTER"?   
//         <div
//         style={{
//           ...styles.gridContainer,
//           gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
//         }}
//       >
//         {renderFileInput("AUTHORITYLETTER", "Past Sale Deed/Property Tax Receipt (Ancestor's Name)", true)}
//         {renderFileInput("RegisteredAuthorityLetter", "Registered Authority Letter", true)}
//          {renderFileInput("AadhaarCard", "Aadhaar Card", true)}
//         {renderFileInput("OwnershipDocumentOfPreviousOwner", "Ownership Document Of Previous Owner", true)}
//         {renderFileInput("DeathCertificate", "Death Certificate", true)}
//         {renderFileInput("LastPaidPropertyTaxReceipt", "Last Paid Property Tax Receipt", true)}
//         {renderFileInput("WaterChargesReceipt/AffidavitInCaseOfNoConnection", "Water Charges Receipt/Affidavit In Case Of No Connection", true)}
//       </div>:
//       <div></div>
// }
//   {namantaranPurposeInput==="REGISTEREDDEED"?   
//         <div
//         style={{
//           ...styles.gridContainer,
//           gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
//         }}
//       >
//         {renderFileInput("INHERITENCE", "Registered Sale Document", true)}
//         {renderFileInput("AadhaarCard", "Aadhaar Card", true)}
//         {renderFileInput("LastPaidPropertyTaxReceipt", "Last Paid Property Tax Receipt", true)}
//         {renderFileInput("WaterChargesReceipt/AffidavitInCaseOfNoConnection", "Water Charges Receipt/Affidavit In Case Of No Connection", true)}
//       </div>:
//       <div></div>
// }

//       {namantaranPurposeInput==="INHERITENCE"?   
//         <div
//         style={{
//           ...styles.gridContainer,
//           gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
//         }}
//       >
//         {renderFileInput("INHERITENCE", "Registered Sale Document", true)}
//         {renderFileInput("AadhaarCard", "Aadhaar Card", true)}
//         {renderFileInput("LastPaidPropertyTaxReceipt", "Last Paid Property Tax Receipt", true)}
//         {renderFileInput("WaterChargesReceipt/AffidavitInCaseOfNoConnection", "Water Charges Receipt/Affidavit In Case Of No Connection", true)}
//       </div>:
//       <div></div>
// }


//       {/* <div
//         style={{
//           ...styles.gridContainer,
//           gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
//         }}
//       >


//         {renderFileInput("photoId", "Proof of Identity", true)}
//         {renderFileInput("ownershipDoc", "Proof of Ownership", true)}
//         {renderFileInput("sellersRegistry", "Others", false)}








//       </div> */}


//         <div style={buttonGroupStyle}>

//                         <button
//                             onClick={() => {

//                                 // handleOwner();
//                                 handleSubmitForm();
//                             }
//                             }
//                             style={findButtonStyle}
//                         >
//                             {t("Submit")}
//                         </button>
//                     </div>
//     </div>
//   );
// };

// // Example styles object (adjust as needed)

// const baseButtonStyle = {
//   padding: "8px 32px",
//   borderRadius: "4px",
//   fontSize: "14px",
//   fontWeight: 500,
//   cursor: "pointer",
//   transition: "all 0.2s",
//   border: "none",
//   minWidth: "80px",
// };
// const buttonGroupStyle = {
//   display: "flex",
//   gap: "32px",
//   marginTop: "20px",
//   justifyContent:"center"
// };
// const findButtonStyle = {
//   ...baseButtonStyle,
//   backgroundColor: "#6B133F",
//   color: "#fff",
// };
// const styles = {
//   wrapper: {
//     background: "#fff",
//     // padding: "20px",
//     borderRadius: "8px",
//     // boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
//     // margin: "10px 0",
//   },
//   header: {
//     fontWeight: 700,
//     fontSize: "18px",
//     marginBottom: "5px",
//     color: "#6B133F",
//   },
//   subHeader: {
//     fontSize: "12px",
//     color: "#555",
//     marginBottom: "20px",
//   },
//   gridContainer: {
//     display: "grid",
//     gap: "20px",
//   },
//   fileBoxff: {
//     width: "90%",
//   },
//   fileBox: {
//     width: "90%",
//     border: "2px dashed #aaa",
//     borderRadius: "8px",
//     padding: "16px",
//     display: "flex",
//     alignItems: "center",
//     gap: "12px",
//     position: "relative",
//     minHeight: "90px",
//   },
//   iconBox: {
//     flexShrink: 0,
//   },
//   labelArea: {
//     flex: "1",
//     display: "flex",
//     flexDirection: "column",
//   },
//   fileLabel: {
//     fontWeight: "600",
//     fontSize: "14px",
//     marginBottom: "4px",
//     color: "#333",
//   },
//   descText: {
//     fontSize: "12px",
//     color: "#888",
//   },
//   buttonArea: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "flex-end",
//     gap: "4px",
//   },
//   selectBtn: {
//     backgroundColor: "#fff",
//     color: "#6B133F",
//     border: "1px solid #6B133F",
//     padding: "6px 12px",
//     borderRadius: "4px",
//     cursor: "pointer",
//     fontSize: "12px",
//     fontWeight: "400",
//     textAlign: "center",
//   },
//   selectedFileText: {
//     fontSize: "12px",
//     color: "#444",
//     maxWidth: "140px",
//     textAlign: "right",
//     wordBreak: "break-word",
//   },
//   addMoreBtn: {
//     backgroundColor: "#fff",
//     color: "#6B133F",
//     border: "1px solid #6B133F",
//     padding: "8px 14px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     fontSize: "14px",
//     fontWeight: "400",
//   },
//   deleteBtn: {
//     backgroundColor: "transparent",
//     border: "none",
//     color: "#aaa",
//     fontSize: "16px",
//     cursor: "pointer",
//     position: "absolute",
//     top: "0px",
//     right: "5px",
//     zIndex: 10,
//   }
// };

// export default AttachmentsSection;




import React, { useState, useEffect } from "react";

const AttachmentsSection = ({ t = (label) => label, handleFileChange, formErrors = {}, resetKey, documents, submitForm, namantaranPurposeInput }) => {
  console.log("documents in attachments", documents);
  const [localErrors, setLocalErrors] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [othersFields, setOthersFields] = useState(["others_1"]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onFileChange = (key, file) => {
    handleFileChange(key, file);
  };
  const renderSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      stroke="#6b133f"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M21.44 11.05L12.97 19.51a5.25 5.25 0 01-7.42-7.42l8.48-8.48a3.5 3.5 0 014.95 4.95l-8.49 8.48a1.75 1.75 0 01-2.47-2.47l7.78-7.78" />
    </svg>
  );
  const renderFileInput = (id, label, isRequired = false, showDelete = false) => (

    <div key={id} style={styles.fileBox}>
      <div style={styles.iconBox}>{renderSvg()}</div>
      <div style={styles.labelArea}>
        <label style={styles.fileLabel}>
          {t(label)} {isRequired && <span style={{ color: "red" }}>*</span>}
        </label>
        <div style={styles.descText}>JPG, PNG or PDF, file size no more than 2MB</div>
        {/* <div style={styles.descText}>Accepts: Aadhaar, Driving License, Pan Card, Voter ID</div> */}
      </div>

      <input
        key={`${id}_${resetKey}`}
        id={id}
        type="file"
        style={{ display: "none" }}
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={(e) => onFileChange(id, e.target.files[0])}
      />

      <div style={styles.buttonArea}>
        <label htmlFor={id} style={styles.selectBtn}>
          {documents[id]?.file?.name || "SELECT FILE"}
        </label>
      </div>

      {showDelete && (
        <button
          type="button"
          onClick={() => handleDeleteField(id)}
          style={styles.deleteBtn}
        >
          ✕
        </button>
      )}


      {(localErrors?.[id] || formErrors?.[id]) && (
        <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
          {localErrors?.[id] || formErrors?.[id]}
        </p>
      )}
    </div>
  );

  const handleAddMore = () => {
    setOthersFields((prev) => [...prev, `others_${prev.length + 1}`]);
  };


  const handleDeleteField = (fieldId) => {
    setOthersFields((prev) => prev.filter((id) => id !== fieldId));
  };

    const handleSubmitForm=()=>{
    submitForm();
  }
  return (


    <div style={styles.wrapper}>
      <h3 style={styles.header}>Attachments</h3>
      <p style={styles.subHeader}>
        (*Accepted File Type: JPG/PNG/PDF **Maximum File Size: 2MB)
      </p>



      {namantaranPurposeInput === "COURTORDER" ?
        <div
          style={{
            ...styles.gridContainer,
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          }}
        >

          {renderFileInput("COURTORDER", "Past Sale Deed/Property Tax Receipt (Ancestor's Name)", true)}


          {renderFileInput("others_courtOrder", "Court Order", true)}

          {renderFileInput("others_AadhaarCard", "Aadhaar Card", true)}
          {renderFileInput("others_DeathCertificate", "Death Certificate", true)}
          {renderFileInput("others_LastPaidPropertyTaxReceipt", "Last Paid Property Tax Receipt", true)}
          {renderFileInput("others_WaterChargesReceipt/AffidavitInCaseOfNoConnection", "Water Charges Receipt/Affidavit In Case Of No Connection", true)}
        </div> :
        <div></div>
      }


      {namantaranPurposeInput === "DHARANADHIKAR" ?
        <div
          style={{
            ...styles.gridContainer,
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          }}
        >

          {renderFileInput("DHARANADHIKAR", "Electricity Bill", true)}

          {renderFileInput("others_GovermentOfficeCorrespondence", "Goverment Office Correspondence", true)}
          {renderFileInput("others_Census2011AddressProof", "Census 2011 Address Proof", true)}

          {renderFileInput("others_VoterListEntry", "Voter List Entry", true)}
          {renderFileInput("others_AadhaarCard", "Aadhaar Card", true)}
          {renderFileInput("others_LastPaidPropertyTaxReceipt", "Last Paid Property Tax Receipt", true)}
          {renderFileInput("others_WaterChargesReceipt/AffidavitInCaseOfNoConnection", "Water Charges Receipt/Affidavit In Case Of No Connection", true)}
        </div> :
        <div></div>
      }


      {namantaranPurposeInput === "REGISTEREDUNREGISTEREDWILL" ?
        <div
          style={{
            ...styles.gridContainer,
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          }}
        >
          {renderFileInput("REGISTEREDUNREGISTEREDWILL", "Past Sale Deed/Property Tax Receipt (Ancestor's Name)", true)}
          {renderFileInput("others_WillDocument", "Will Document", true)}
          {renderFileInput("others_AadhaarCard", "Aadhaar Card", true)}
          {renderFileInput("others_DeathCertificate", "Death Certificate", true)}
          {renderFileInput("others_3WitnessStatements", "3 Witness Statements", true)}

          {renderFileInput("others_OwnershipDocumentOfPreviousOwner", "Ownership Document Of Previous Owner", true)}

          {renderFileInput("others_LastPaidPropertyTaxReceipt", "Last Paid Property Tax Receipt", true)}
          {renderFileInput("others_WaterChargesReceipt/AffidavitInCaseOfNoConnection", "Water Charges Receipt/Affidavit In Case Of No Connection", true)}
        </div> :
        <div></div>
      }

      {namantaranPurposeInput === "AUTHORITYLETTER" ?
        <div
          style={{
            ...styles.gridContainer,
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          }}
        >
          {renderFileInput("AUTHORITYLETTER", "Past Sale Deed/Property Tax Receipt (Ancestor's Name)", true)}
          {renderFileInput("others_RegisteredAuthorityLetter", "Registered Authority Letter", true)}
          {renderFileInput("others_AadhaarCard", "Aadhaar Card", true)}
          {renderFileInput("others_OwnershipDocumentOfPreviousOwner", "Ownership Document Of Previous Owner", true)}
          {renderFileInput("others_DeathCertificate", "Death Certificate", true)}
          {renderFileInput("others_LastPaidPropertyTaxReceipt", "Last Paid Property Tax Receipt", true)}
          {renderFileInput("others_WaterChargesReceipt/AffidavitInCaseOfNoConnection", "Water Charges Receipt/Affidavit In Case Of No Connection", true)}
        </div> :
        <div></div>
      }
      {namantaranPurposeInput === "REGISTEREDDEED" ?
        <div
          style={{
            ...styles.gridContainer,
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          }}
        >
          {renderFileInput("REGISTEREDDEED", "Registered Sale Document", true)}
          {renderFileInput("others_AadhaarCard", "Aadhaar Card", true)}
          {renderFileInput("others_LastPaidPropertyTaxReceipt", "Last Paid Property Tax Receipt", true)}
          {renderFileInput("others_WaterChargesReceipt/AffidavitInCaseOfNoConnection", "Water Charges Receipt/Affidavit In Case Of No Connection", true)}
        </div> :
        <div></div>
      }

      {namantaranPurposeInput === "INHERITENCE" ?
        <div
          style={{
            ...styles.gridContainer,
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          }}
        >
          {renderFileInput("INHERITENCE", "Succession Order", true)}
          {renderFileInput("others_AadhaarCard", "Aadhaar Card", true)}
          {renderFileInput("others_LastPaidPropertyTaxReceipt", "Last Paid Property Tax Receipt", true)}
          {renderFileInput("others_WaterChargesReceipt/AffidavitInCaseOfNoConnection", "Water Charges Receipt/Affidavit In Case Of No Connection", true)}
        </div> :
        <div></div>
      }


      {/* <div
        style={{
          ...styles.gridContainer,
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
        }}
      >


        {renderFileInput("photoId", "Proof of Identity", true)}
        {renderFileInput("ownershipDoc", "Proof of Ownership", true)}
        {renderFileInput("sellersRegistry", "Others", false)}




     



      </div> */}


      <div style={buttonGroupStyle}>

        <button
          onClick={() => {

            // handleOwner();
            handleSubmitForm();
          }
          }
          style={findButtonStyle}
        >
          {t("Submit")}
        </button>
      </div>
    </div>
  );
};

export default AttachmentsSection;

const baseButtonStyle = {
  padding: "8px 32px",
  borderRadius: "4px",
  fontSize: "14px",
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.2s",
  border: "none",
  minWidth: "80px",
};
const buttonGroupStyle = {
  display: "flex",
  gap: "32px",
  marginTop: "20px",
  justifyContent: "center"
};
const findButtonStyle = {
  ...baseButtonStyle,
  backgroundColor: "#6B133F",
  color: "#fff",
};
// Inline styles
const styles = {
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