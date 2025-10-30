import React, { useEffect, useState } from "react";
import {
    Loader, Card,
    SubmitBar,
    TextInput,
    Dropdown,
    CheckBox,
} from "@egovernments/digit-ui-react-components";
import { useLocation, useHistory } from "react-router-dom";
//import DownloadPdfButton from "./DownloadPDF";

const styles = {
    container: {
        // padding: "20px",
        // fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        maxWidth: "1200px",
        // margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
        '@media (maxWidth: 768px)': {
            padding: "10px"
        },
        '@media (maxWidth: 630px)': {
            padding: "8px"
        }
    },
    row: {
        display: "flex",
        flexWrap: "wrap",
        marginBottom: "16px",
        gap: "16px",
        width: "100%",
        boxSizing: "border-box",
        '@media (maxWidth: 768px)': {
            flexDirection: "column",
            gap: "12px"
        },
        '@media (maxWidth: 630px)': {
            gap: "8px",
            marginBottom: "12px"
        }
    },
    field: {
        display: "flex",
        flexDirection: "column",
        flex: "1",
        minWidth: "280px",
        width: "100%",
        boxSizing: "border-box",
        '@media (maxWidth: 768px)': {
            minWidth: "100%"
        },
        '@media (maxWidth: 630px)': {
            minWidth: "auto",
            width: "100%"
        }
    },
    flex30: {
        flex: "1 1 30%",
        display: "flex",
        flexDirection: "column",
        flex30: {
            flex: "1 1 30%",
            display: "flex",
            flexDirection: "column",

            position: "relative",
            minHeight: "90px",

        },
    },
    input: {
        height: "35px",
        border: "0.5px solid #F7F7F7",
        borderRadius: "4px",
        padding: "6px 10px",
        fontSize: "14px",
        width: "100%",
        boxSizing: "border-box",
        maxWidth: "100%",
        backgroundColor: "#F2F2F2",
        '@media (maxWidth: 630px)': {
            padding: "8px",
            fontSize: "13px",
            height: "40px"
        }
    },
    label: {

        // fontFamily: 'Poppins, sans-serif',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '22px',
        letterSpacing: '0',
        color: '#282828',
        width: "200px",
        marginBottom: "4px",
        wordWrap: "break-word",
        '@media (maxWidth: 768px)': {
            fontSize: "13px"
        },
        '@media (maxWidth: 630px)': {
            fontSize: "12px",
            lineHeight: "18px"
        }
    },
    sectionHeader: {

        // fontFamily: "Poppins",
        fontWeight: "bold",
        fontSize: "16px",
        lineHeight: "100%",
        color: "#6b133f",
        marginBottom: "16px",
        marginTop: "20px",
        '@media (maxWidth: 768px)': {
            fontSize: "15px",
            marginTop: "16px",
            marginBottom: "12px"
        }
    },
    sectionHeaderDemand: {
        // fontFamily: "Poppins",
        fontWeight: "bold",
        fontSize: "22px",
        lineHeight: "100%",
        color: "#6b133f",
        marginBottom: "20px",
        '@media (maxWidth: 768px)': {
            fontSize: "18px",
            marginBottom: "16px"
        }
    },
    tableContainer: {
        width: "100%",
        overflowX: "auto",
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        '@media (maxWidth: 768px)': {
            fontSize: "11px"
        }
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        minWidth: "800px",
        '@media (maxWidth: 768px)': {
            minWidth: "600px"
        }
    },
    th: {
        border: "1px solid #ccc",
        padding: "8px 4px",
        // backgroundColor: "#B9B9B9",
         backgroundColor:"rgba(107, 19, 63, 0.2)",
        // border:"1px,0px,0px,1px #B9B9B9",
        textAlign: "center",
        // fontFamily: "Inter",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "130%",
        color: "black",
        whiteSpace: "nowrap",
        '@media (maxWidth: 768px)': {
            padding: "6px 3px",
            fontSize: "10px"
        }
    },
    td: {
        border: "1px solid #ccc",
        // border:"1px,0px,0px,1px #B9B9B9",
        padding: "8px 4px",
        textAlign: "center",
        // fontFamily: "Inter",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "130%",
        color: "#000000",
        whiteSpace: "nowrap",
        '@media (maxWidth: 768px)': {
            padding: "6px 3px",
            fontSize: "10px"
        }
    },
    downloadBtn: {
        padding: "6px 12px",
        background: "white",
        border: "1px solid #6b133f",
        borderRadius: "12px",
        cursor: "pointer",
        // fontFamily: "Poppins",
        fontWeight: 400,
        fontSize: "12px",
        color: "#6b133f",
        boxSizing: "border-box",
        '@media (maxWidth: 768px)': {
            width: "100%",
            fontSize: "11px"
        },
        '@media (maxWidth: 630px)': {
            padding: "8px 12px",
            fontSize: "10px"
        }
    },
    cardD: {
        backgroundColor: "rgba(255, 255, 255, var(--bg-opacity))",
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.16)",
        padding: "16px",
        marginBottom: "22px",
        borderRadius: "12px",
        width: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
        '@media (maxWidth: 768px)': {
            padding: "12px",
            marginBottom: "16px"
        },
        '@media (maxWidth: 630px)': {
            padding: "8px",
            marginBottom: "12px",
            borderRadius: "8px"
        }
    },
    buttonContainer: {
        display: "flex",
        gap: "12px",
        // marginLeft: "auto",
        justifyContent: "flex-end",
        marginTop: "20px",
        '@media (maxWidth: 768px)': {
            flexDirection: "column",
            marginLeft: "0",
            gap: "8px"
        }
    },
    confirmBtn: {
        padding: "10px 30px",
        backgroundColor: "#6b133f",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        // fontFamily: "Poppins",
        fontWeight: 500,
        fontSize: "14px",
        height: "35px",
        whiteSpace: "nowrap",
        '@media (maxWidth: 768px)': {
            padding: "12px 20px",
            fontSize: "13px",
            width: "100%"
        }
    },
    bottomText: {
        color: "red",
        fontSize: "12px",
        marginTop: "8px",
        '@media (maxWidth: 768px)': {
            fontSize: "11px"
        }
    },
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "20px",
        boxSizing: "border-box"

    },
    modalContent: {
        background: "#fff",
        borderRadius: "12px",
        padding: "32px",
        textAlign: "center",
        width: "50%",
        maxWidth: "60%",         // keeps it small on large screens
        minWidth: "300px",         // avoids too small shrink
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "40px",               // uniform gap between text & buttons
        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",

        '@media (maxWidth: 1024px)': {
            width: "70%",
            padding: "28px",
            gap: "30px",
        },
        '@media (maxWidth: 768px)': {
            width: "90%",
            padding: "20px",
            gap: "24px",
        },
        '@media (maxWidth: 480px)': {
            width: "95%",
            padding: "16px",
            gap: "20px",
        }
    },

    modalButtonContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "16px",
        flexWrap: "wrap",       // buttons wrap on very small screens
    },
    modalButton: {
        padding: "10px 20px",
        borderRadius: "40px",
        border: "none",
        background: "#6b133f",
        color: "#fff",
        fontSize: "14px",
        cursor: "pointer",
        fontSize: "14px",
        '@media (maxWidth: 768px)': {
            padding: "12px 20px",
            fontSize: "13px",
            width: "100%"
        }
    },

    flexend: {
        display: "flex",
        justifyContent: "end",

    }
};

// Responsive InputField component
const InputField = ({ label, value }) => (
    <div style={styles.field}>
        <div style={styles.label}>{label}</div>
        <input style={styles.input} value={value} readOnly />
    </div>
);

const InputFieldBlank = () => (
    <div style={styles.field}>

    </div>
);

const PreviewDemand = () => {
    const { data: commonFields, isLoading } = Digit.Hooks.pt.useMDMS(Digit.ULBService.getStateId(), "PropertyTax", "CommonFieldsConfig");
    const history = useHistory();
    const stateId = Digit.ULBService.getStateId();
    const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("EMPLOYEE_MUTATION_HAPPENED", false);
    const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("EMPLOYEE_MUTATION_SUCCESS_DATA", {});
    
 

    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [applicationNo, setAcknowledgmentNumber] = useState("");
    let userInfo1 = JSON.parse(localStorage.getItem("user-info"));
    const tenantId = userInfo1?.tenantId;
    const mutationUpdate = Digit.Hooks.ws.useWSUpdateAPI(
    "WATER"
  );
    const location = useLocation();
    const { data, proOwnerDetail,  WaterConnection, } = location.state || {};
    const calculation = data?.Calculation?.[0];
    const new_tax_heads = [
    {"taxHeadCode": "WS_MONTHLY_CHARGE", "estimateAmount": WaterConnection?.connectionCharges?.monthlyCharges||0, "category": "MONTHLY"},   
]
//calculation["taxHeadEstimates"].extend(new_tax_heads)
//pushUniqueTaxHeads(calculation, new_tax_heads);
    useEffect(() => {
        setMutationHappened(false);
        clearSuccessData();
    }, []);

/**
 * Push new tax heads only if they don't already exist (by taxHeadCode)
 */
function pushUniqueTaxHeads(estimateData, newHeads) {
  if (!Array.isArray(estimateData.taxHeadEstimates)) {
    estimateData.taxHeadEstimates = [];
  }

  // normalize to array
  const heads = Array.isArray(newHeads) ? newHeads : [newHeads];

  heads.forEach(head => {
    const exists = estimateData.taxHeadEstimates.some(
      item => item.taxHeadCode === head.taxHeadCode
    );
    if (!exists) {
      estimateData.taxHeadEstimates.push(head);
    }
  });

  // recalculate totalAmount
  estimateData.totalAmount = estimateData.taxHeadEstimates.reduce(
    (sum, item) => sum + Number(item.estimateAmount || 0),
    0
  );
}

    const handleGobackEdit = () => {
        history.push({
            pathname: "/digit-ui/employee/ws/new-application",
            state: {
                generalDetails: {
                    id: WaterConnection.id,                    
                    propertyId: proOwnerDetail.propertyId ||0,
                    oldPropertyId: proOwnerDetail.oldPropertyId ||0,
                    creationReason: proOwnerDetail.creationReason ||"default prop create",
                    propertyType: proOwnerDetail.propertyType || proOwnerDetail.propertyCategory,                 
                   
                }, 
                WaterConnection:WaterConnection,  
                addressDetailsSet:proOwnerDetail.address,            
                ownerDetails: proOwnerDetail.owners,                
                waterDocuments: WaterConnection.documents,
                //additionalDetails: proOwnerDetail.additionalDetails,
                // workflow: proOwnerDetail.workflow,
                // processInstance: proOwnerDetail.processInstance,
                // Preserve correspondence address state               
               
            },
        });
    };

    const handleSubmitUpdate = async () => {
        const payload = {
            WaterConnection: WaterConnection,
            RequestInfo: {
                apiId: "Rainmaker",
                authToken: userInfo1?.authToken,
                userInfo: {
                    id: userInfo1?.id,
                    uuid: userInfo1?.uuid,
                    userName: userInfo1?.userName,
                    name: userInfo1?.name,
                    mobileNumber: userInfo1?.mobileNumber,
                    emailId: userInfo1?.emailId,
                    locale: userInfo1?.locale,
                    type: userInfo1?.type,
                    roles: userInfo1?.roles,
                    active: userInfo1?.active !== false,
                    tenantId: userInfo1?.tenantId,
                    permanentCity: userInfo1?.permanentCity
                },
                msgId: "1749797151521|en_IN",
                plainAccessRequest: {}
            }
        };
        mutationUpdate.mutate(payload, {
            onSuccess: (data) => {
                 const WaterConnection = data?.WaterConnection?.[0];
        if (WaterConnection) {
                    setAcknowledgmentNumber(WaterConnection.applicationNo);
                    setShowConfirmPopup(false);
                    setShowSuccessPopup(true);
                }
            },
            onError: (err) => {
                alert("Submission failed");
            },
        });
         history.push({
          pathname: "/digit-ui/employee/ws/response",
          state: {data:payload.WaterConnection}
          //state: { data, proOwnerDetail: propertyData, documents, waterDocuments, checkboxes, rateZones, owners, unit, assessmentDetails, assessmentDetails, propertyDetails, addressDetails, ownershipType, correspondenceAddress, isSameAsPropertyAddress }
        });
        // history.replace("/digit-ui/employee/ws/response",
        //     {
        //         waterConnection: payload?.WaterConnection,
        //         key: "UPDATE",
        //         action: "SUBMIT"
        //     }
        // );
        // history.replace("/digit-ui/employee/pt/ws-response", { Property: submitData.Property, key: "UPDATE", action: "SUBMIT" });
    };
    if (isLoading) {
        return <Loader />;
    }
    return (
       

        <div id="downloadable-component">
            <div style={{
                position: "relative",
                // marginTop: "20px",
                width: "100%",
                maxWidth: "100vw",
                overflowX: "hidden",
                boxSizing: "border-box",
                ...styles.container
            }}>
                <div style={{ marginBottom: "20px", display: "flex", justifyContent: "flex-end" }}>
                    {/* <button style={styles.downloadBtn} > <DownloadPdfButton targetId="downloadable-component" /></button> */}
                </div>

               





                <div style={styles.cardD}>
                    <div style={styles.sectionHeaderDemand}>Demand</div>
                    <div style={styles.row}>
                        <InputField label="Owner Name" value={proOwnerDetail?.owners[0].name || "N/A"} />
                        <div style={styles.field}><InputField label="address" value={proOwnerDetail?.owners[0].permanentAddress || "N/A"} /></div>
                        <div style={styles.field}><InputField label="Mpbile NUmber" value={proOwnerDetail?.owners[0].mobileNumber  || "N/A"} /></div>
                    </div>


                    {/* {ownersDetail.map((owner, index) => (
                        <React.Fragment key={owner.uuid || index}>
                            <div style={styles.sectionHeader}>Owner {index + 1}</div>
                            <div style={{marginTop:"14px"}}></div>
                            <div style={styles.row}>
                                <InputField label="Owner Name" value={` ${owner?.name || "N/A"}`} />
                                <InputField label="Father/Husband Name" value={owner?.fatherOrHusbandName} />
                                <InputField label="Address" value={owner?.permanentAddress || "N/A"} />
                            </div>
                            <div style={styles.row}>
                                <InputField
        label="Zone"
        value={
          zones.find((f) => f.code === address?.zone)?.name || "N/A"
        }
      />
                               
                                <InputField label="Ward" value={address?.ward || "N/A"} />
                                <InputField label="Colony" value={address?.locality?.name || "N/A"} />
                            </div>
                            <div style={styles.row}>
                                <InputField label="Pincode" value={address?.pincode || "N/A"} />
                                <InputField label="Mobile Number" value={owner?.mobileNumber || "N/A"} />
                                 <InputField
                                    label="Aadhaar ID"
                                    value={
                                        owner?.aadhaarNumber
                                            ? owner.aadhaarNumber.replace(/\d(?=\d{4})/g, "X")
                                            : "N/A"
                                    }
                                />
                            </div>
                            <div style={styles.row}>
                                <InputField
                                    label="Email ID"
                                    value={owner?.emailId || "N/A"}
                                />
                                <InputField label="git" value={owner?.ownerType || "N/A"} />
                                <InputField label="Date" value={owner?.createdDate ? new Date(owner.createdDate).toLocaleDateString("en-GB") : "N/A"} />
                            </div>
                        </React.Fragment>
                    ))} */}
                </div>

                <div style={styles.cardD}>
                    <div style={styles.sectionHeader}>Charges</div>
                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    {["Types of Charges", "Amount"].map((h) => (
                                        <th key={h} style={styles.th}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {calculation && calculation.taxHeadEstimates.map((item) => {
                                    return (

                                        <tr key={item.taxHeadCode}>
                                            <td style={styles.td}>{item.taxHeadCode}</td>
                                            <td style={styles.td}>{item.estimateAmount}</td>
                                        </tr>
                                    )
                                }

                                )

                                }
                               <tr>
                                    <td colSpan={1} style={{ ...styles.td, fontWeight: "bold", textAlign: "right" }}>TOTAL</td>

                                    <td style={styles.td}>
                                        ₹ {calculation && calculation.totalAmount}
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                    <div style={styles.flexend}>
                       

                        <div style={styles.buttonContainer}>

                            <button style={styles.confirmBtn} onClick={() => handleGobackEdit(true)}>Back</button>
                            <button style={styles.confirmBtn} onClick={() => setShowConfirmPopup(true)}>Confirm</button>
                        </div>
                    </div>
                </div>

               

                {showConfirmPopup && (
                    <div style={styles.modalOverlay}>
                        <div style={styles.modalContent}>
                            <p style={{ fontSize: "18px", fontWeight: "bold", color: "#6b133f", marginBottom: "30px" }}>
                                Are you sure you want to submit this form?
                            </p>
                            <div style={styles.modalButtonContainer}>
                                <button style={styles.modalButton} onClick={() => setShowConfirmPopup(false)}>
                                    Back
                                </button>
                                <button style={styles.modalButton} onClick={() => handleSubmitUpdate()}>
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showSuccessPopup && (
                    <div style={styles.modalOverlay}>
                        <div style={{
                            ...styles.modalContent,
                            width: "350px"
                        }}>
                            <div style={{
                                width: "60px",
                                height: "60px",
                                backgroundColor: "#000",
                                borderRadius: "50%",
                                border: "4px solid #00A859",
                                margin: "0 auto 20px auto",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <span style={{ color: "white", fontSize: "24px" }}>✔</span>
                            </div>                           
                            <p style={{ fontWeight: "600", fontSize: "16px", marginBottom: "10px" }}>
                                Application Submitted Successfully
                            </p>
                            <p style={{ color: "#888", fontSize: "14px", marginBottom: "20px" }}>
                                Application Number<br />
                                {applicationNo || "N/A"}
                            </p>
                            <button
                                style={styles.modalButton}
                                onClick={() => {
                                    window.location.href = "/digit-ui/employee";
                                }}
                            >
                                Home
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PreviewDemand;