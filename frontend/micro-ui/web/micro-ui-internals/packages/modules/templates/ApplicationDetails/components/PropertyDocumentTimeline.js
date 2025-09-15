// import React, { useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import { CardSubHeader, PDFSvg } from "@egovernments/digit-ui-react-components";
 
// function PropertyDocuments({ documents, svgStyles = {}, isSendBackFlow = false }) {
//   const { t } = useTranslation();
//   const [filesArray, setFilesArray] = useState([]);
//   const [pdfFiles, setPdfFiles] = useState({});
//   const tenantId = Digit.ULBService.getCurrentTenantId();
 
//   const workflowDocs = documents?.filter((doc) => doc.title === "PT_WORKFLOW_DOCS");
 
//   const checkLocation =
//     window.location.href.includes("employee/tl") ||
//     window.location.href.includes("/obps") ||
//     window.location.href.includes("employee/ws");
 
//   const isStakeholderApplication = window.location.href.includes("stakeholder");
 
//   useEffect(() => {
//     let acc = [];
//     workflowDocs?.forEach((element) => {
//       acc = [...acc, ...(element.values || [])];
//     });
//     setFilesArray(acc.map((value) => value?.fileStoreId));
//   }, [workflowDocs]);
 
//   useEffect(() => {
//     if (filesArray?.length && workflowDocs?.[0]?.BS === "BillAmend") {
//       Digit.UploadServices.Filefetch(filesArray, tenantId).then((res) => {
//         setPdfFiles(res?.data);
//       });
//     } else if (filesArray?.length) {
//       Digit.UploadServices.Filefetch(filesArray, Digit.ULBService.getStateId()).then((res) => {
//         setPdfFiles(res?.data);
//       });
//     }
//   }, [filesArray]);
 
//   return (
//     <div style={{ marginTop: "19px" }}>
//       {!isStakeholderApplication &&
//         workflowDocs?.map((document, index) => (
//           <React.Fragment key={index}>
//             {document?.title ? (
//               <CardSubHeader
//                 style={
//                   checkLocation
//                     ? {
//                         marginTop: "32px",
//                         marginBottom: "18px",
//                         color: "#0B0C0C, 100%",
//                         fontSize: "24px",
//                         lineHeight: "30px",
//                       }
//                     : {
//                         marginTop: "32px",
//                         marginBottom: "8px",
//                         color: "#505A5F",
//                         fontSize: "24px",
//                       }
//                 }
//               >
//                 {t(document?.title)}
//               </CardSubHeader>
//             ) : null}
//             <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}>
//               {document?.values && document?.values.length > 0 ? (
//                 document?.values?.map((value, index) => (
//                   <a
//                     target="_"
//                     href={pdfFiles[value.fileStoreId]?.split(",")[0]}
//                     style={{ minWidth: "80px", marginRight: "10px", maxWidth: "100px", height: "auto" }}
//                     key={index}
//                   >
//                     <div style={{ display: "flex", justifyContent: "center" }}>
//                       <PDFSvg />
//                     </div>
//                     <p
//                       style={
//                         checkLocation
//                           ? {
//                               marginTop: "8px",
//                               fontWeight: "bold",
//                               fontSize: "16px",
//                               lineHeight: "19px",
//                               color: "#505A5F",
//                               textAlign: "center",
//                             }
//                           : { marginTop: "8px", fontWeight: "bold" }
//                       }
//                     >
//                       {t(value?.title)}
//                     </p>
//                     {isSendBackFlow ? (
//                       value?.documentType?.includes("NOC") ? (
//                         <p style={{ textAlign: "center" }}>{t(value?.documentType.split(".")[1])}</p>
//                       ) : (
//                         <p style={{ textAlign: "center" }}>{t(value?.documentType)}</p>
//                       )
//                     ) : (
//                       ""
//                     )}
//                   </a>
//                 ))
//               ) : !window.location.href.includes("citizen") ? (
//                 <div>
//                   <p>{t("BPA_NO_DOCUMENTS_UPLOADED_LABEL")}</p>
//                 </div>
//               ) : null}
//             </div>
//           </React.Fragment>
//         ))}
 
//       {isStakeholderApplication &&
//         workflowDocs?.map((document, index) => (
//           <React.Fragment key={index}>
//             {document?.title ? (
//               <CardSubHeader style={{ marginTop: "32px", marginBottom: "8px", color: "#505A5F", fontSize: "24px" }}>
//                 {t(document?.title)}
//               </CardSubHeader>
//             ) : null}
//             <div>
//               {document?.values && document?.values.length > 0 ? (
//                 document?.values?.map((value, index) => (
//                   <a
//                     target="_"
//                     href={pdfFiles[value.fileStoreId]?.split(",")[0]}
//                     style={{
//                       minWidth: svgStyles?.minWidth ? svgStyles?.minWidth : "160px",
//                       marginRight: "20px",
//                     }}
//                     key={index}
//                   >
//                     <div
//                       style={{
//                         maxWidth: "940px",
//                         padding: "8px",
//                         borderRadius: "4px",
//                         border: "1px solid #D6D5D4",
//                         background: "#FAFAFA",
//                       }}
//                     >
//                       <p style={{ marginTop: "8px", fontWeight: "bold", marginBottom: "10px" }}>{t(value?.title)}</p>
//                       {value?.docInfo ? (
//                         <div
//                           style={{
//                             fontSize: "12px",
//                             color: "#505A5F",
//                             fontWeight: 400,
//                             lineHeight: "15px",
//                             marginBottom: "10px",
//                           }}
//                         >
//                           {`${t(value?.docInfo)}`}
//                         </div>
//                       ) : null}
//                       <PDFSvg />
//                       <p
//                         style={{
//                           marginTop: "8px",
//                           fontSize: "16px",
//                           lineHeight: "19px",
//                           color: "#505A5F",
//                           fontWeight: "400",
//                         }}
//                       >
//                         {`${t(value?.title)}`}
//                       </p>
//                     </div>
//                   </a>
//                 ))
//               ) : !window.location.href.includes("citizen") ? (
//                 <div>
//                   <p>{t("BPA_NO_DOCUMENTS_UPLOADED_LABEL")}</p>
//                 </div>
//               ) : null}
//             </div>
//           </React.Fragment>
//         ))}
//     </div>
//   );
// }
 
// export default PropertyDocuments;



import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CardSubHeader, PDFSvg } from "@egovernments/digit-ui-react-components";

function PropertyDocuments({ documents = [], svgStyles = {}, isSendBackFlow = false }) {
  // const { t } = useTranslation();
  // const [filesArray, setFilesArray] = useState([]);
  // const [pdfFiles, setPdfFiles] = useState({});
  // const tenantId = Digit.ULBService.getCurrentTenantId();

  // // Always default to [] to avoid null issues
  // const workflowDocs = documents?.filter((doc) => doc?.title === "PT_WORKFLOW_DOCS") || [];

  // const checkLocation =
  //   window.location.href.includes("employee/tl") ||
  //   window.location.href.includes("/obps") ||
  //   window.location.href.includes("employee/ws");

  // const isStakeholderApplication = window.location.href.includes("stakeholder");

  // useEffect(() => {
  //   let acc = [];
  //   workflowDocs.forEach((element) => {
  //     acc = [...acc, ...(element?.values || [])];
  //   });
  //   setFilesArray(acc.map((value) => value?.fileStoreId).filter(Boolean)); // filter out null/undefined
  // }, [workflowDocs]);

  // useEffect(() => {
  //   if (filesArray.length > 0) {
  //     const fetchTenant = workflowDocs?.[0]?.BS === "BillAmend" ? tenantId : Digit.ULBService.getStateId();
  //     Digit.UploadServices.Filefetch(filesArray, fetchTenant).then((res) => {
  //       setPdfFiles(res?.data || {});
  //     });
  //   }
  // }, [filesArray, workflowDocs, tenantId]);




const { t } = useTranslation();
const [filesArray, setFilesArray] = useState([]);
const [pdfFiles, setPdfFiles] = useState({});
const tenantId = Digit.ULBService.getCurrentTenantId();


const workflowDocs = useMemo(() => {
  return documents?.filter((doc) => doc?.title === "PT_WORKFLOW_DOCS") || [];
}, [documents]);

const checkLocation =
  window.location.href.includes("employee/tl") ||
  window.location.href.includes("/obps") ||
  window.location.href.includes("employee/ws");

const isStakeholderApplication = window.location.href.includes("stakeholder");


useEffect(() => {
  const acc = workflowDocs.flatMap((element) => element?.values || []);
  const fileStoreIds = acc.map((value) => value?.fileStoreId).filter(Boolean);
  setFilesArray(fileStoreIds);
}, [workflowDocs]);


useEffect(() => {
  if (filesArray.length > 0) {
    const fetchTenant =
      workflowDocs?.[0]?.BS === "BillAmend"
        ? tenantId
        : Digit.ULBService.getStateId();

    Digit.UploadServices.Filefetch(filesArray, fetchTenant).then((res) => {
      setPdfFiles(res?.data || {});
    });
  }
}, [filesArray, tenantId]); 


  return (
    <div style={{ marginTop: "19px" }}>
      {/* Non-stakeholder flow */}
      {!isStakeholderApplication &&
        workflowDocs.map((document, index) => (
          <React.Fragment key={index}>
            {document?.title && (
              <CardSubHeader
                style={
                  checkLocation
                    ? {
                        marginTop: "32px",
                        marginBottom: "18px",
                        color: "#0B0C0C",
                        fontSize: "24px",
                        lineHeight: "30px",
                      }
                    : {
                        marginTop: "32px",
                        marginBottom: "8px",
                        color: "#505A5F",
                        fontSize: "24px",
                      }
                }
              >
                {t(document.title)}
              </CardSubHeader>
            )}

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}>
              {document?.values?.length > 0 ? (
                document.values.map((value, idx) => (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={pdfFiles[value?.fileStoreId]?.split(",")?.[0] || "#"}
                    style={{ minWidth: "80px", marginRight: "10px", maxWidth: "100px", height: "auto" }}
                    key={idx}
                  >
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <PDFSvg />
                    </div>
                    <p
                      style={
                        checkLocation
                          ? {
                              marginTop: "8px",
                              fontWeight: "bold",
                              fontSize: "16px",
                              lineHeight: "19px",
                              color: "#505A5F",
                              textAlign: "center",
                            }
                          : { marginTop: "8px", fontWeight: "bold" }
                      }
                    >
                      {t(value?.title || "")}
                    </p>
                    {isSendBackFlow && (
                      <p style={{ textAlign: "center" }}>
                        {value?.documentType?.includes("NOC")
                          ? t(value?.documentType?.split(".")[1] || "")
                          : t(value?.documentType || "")}
                      </p>
                    )}
                  </a>
                ))
              ) : !window.location.href.includes("citizen") ? (
                <div>
                  <p>{t("BPA_NO_DOCUMENTS_UPLOADED_LABEL")}</p>
                </div>
              ) : null}
            </div>
          </React.Fragment>
        ))}

      {/* Stakeholder flow */}
      {isStakeholderApplication &&
        workflowDocs.map((document, index) => (
          <React.Fragment key={index}>
            {document?.title && (
              <CardSubHeader style={{ marginTop: "32px", marginBottom: "8px", color: "#505A5F", fontSize: "24px" }}>
                {t(document.title)}
              </CardSubHeader>
            )}

            <div>
              {document?.values?.length > 0 ? (
                document.values.map((value, idx) => (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={pdfFiles[value?.fileStoreId]?.split(",")?.[0] || "#"}
                    style={{
                      minWidth: svgStyles?.minWidth || "160px",
                      marginRight: "20px",
                    }}
                    key={idx}
                  >
                    <div
                      style={{
                        maxWidth: "940px",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #D6D5D4",
                        background: "#FAFAFA",
                      }}
                    >
                      <p style={{ marginTop: "8px", fontWeight: "bold", marginBottom: "10px" }}>
                        {t(value?.title || "")}
                      </p>
                      {value?.docInfo && (
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#505A5F",
                            fontWeight: 400,
                            lineHeight: "15px",
                            marginBottom: "10px",
                          }}
                        >
                          {t(value.docInfo)}
                        </div>
                      )}
                      <PDFSvg />
                      <p
                        style={{
                          marginTop: "8px",
                          fontSize: "16px",
                          lineHeight: "19px",
                          color: "#505A5F",
                          fontWeight: "400",
                        }}
                      >
                        {t(value?.title || "")}
                      </p>
                    </div>
                  </a>
                ))
              ) : !window.location.href.includes("citizen") ? (
                <div>
                  <p>{t("BPA_NO_DOCUMENTS_UPLOADED_LABEL")}</p>
                </div>
              ) : null}
            </div>
          </React.Fragment>
        ))}
    </div>
  );
}

export default PropertyDocuments;
