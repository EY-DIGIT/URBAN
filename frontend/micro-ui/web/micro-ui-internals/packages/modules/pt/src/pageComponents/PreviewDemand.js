


import React, { useState } from "react";
import {
    Loader, Card,
    SubmitBar,
    TextInput,
    Dropdown,
    CheckBox,
} from "@egovernments/digit-ui-react-components";
import { useLocation, useHistory } from "react-router-dom";
const styles = {
    container: {
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
    },
    row: {
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        marginBottom: "16px",
        justifyContent: "space-between",
        width: "100%"
    },
    rowOwnerName: {
        // display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        marginBottom: "16px",
        // justifyContent: "space-between",
        width: "100%"
    },
    field: {
        display: "flex",
        // flexDirection: "column",
        alignItems: "center",

    },
    input: {
        height: "35px",
        border: "1px solid #D9D9D9",
        borderRadius: "6px",
        padding: "6px 10px",
        fontSize: "14px",

    },
    inputs: {
        height: "35px",
        border: "1px solid #D9D9D9",
        borderRadius: "6px",
        padding: "6px 10px",
        fontSize: "14px",
        width: "300px",
    },
    label: {
        fontFamily: "Poppins",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "22px",
        letterSpacing: "0%",
        color: "#282828",
        width: "100px"
    },
    sectionHeader: {
        fontFamily: "Poppins",
        fontWeight: "bold",
        fontSize: "16px",
        lineHeight: "100%",
        letterSpacing: "0%",
        // textDecoration: "underline",
        textDecorationStyle: "solid",
        textDecorationOffset: "0%",
        textDecorationThickness: "0%",
        color: "#4729A3",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "10px",
        marginBottom: "20px",
    },
    th: {
        border: "1px solid #ccc",
        padding: "8px",
        backgroundColor: "#f2f2f2",
        textAlign: "center",
        fontFamily: "Inter",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "130%",
        letterSpacing: "0%",
        color: "#000000",
    },
    td: {
        border: "1px solid #ccc",
        padding: "8px",
        textAlign: "center",
        fontFamily: "Inter",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "130%",
        letterSpacing: "0%",
        color: "#000000",
    },
    downloadBtn: {
        float: "right",
        marginBottom: "10px",
        padding: "6px 12px",
        background: "white",
        border: "1px solid #4729A3",
        borderRadius: "12px",
        cursor: "pointer",
        // width: "202px",
        fontFamily: "Poppins",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "100%",
        letterSpacing: "3%",
        textAlign: "center",
        color: "#4729A3",
    },
    confirmBtn: {
        padding: "10px 30px",
        backgroundColor: "#4729A3",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        // float: "right",
        marginTop: "20px",
        fontFamily: "Poppins",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "100%",
        letterSpacing: "3%",
        color: "#FFFFFF",
        display: "flex",
        marginLeft: "auto"
    },

};

const InputField = ({ label, value }) => (
    <div style={styles.field}>
        <div style={styles.label}>{label}</div>
        <input style={styles.input} value={value} readOnly />
    </div>
);
const InputFieldNew = ({ label, value }) => (
    <div style={styles.field}>
        <div style={styles.label}>{label}</div>
        <input style={styles.inputs} value={value} readOnly />
    </div>
);
const PropertyForm = () => {
    const history = useHistory();
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const location = useLocation();
    const { data, proOwnerDetail } = location.state || {}; // receive full object
    const calculation = data?.Calculation?.[0];

    const propertyFYDetails = calculation?.propertyFYDetails || [];
    const taxSummaries = calculation?.propertyFYTaxSummaries || [];
    console.log("propertyDetail", proOwnerDetail)
    const owners = proOwnerDetail?.owners || [];
    const address = proOwnerDetail?.address || {};
 const handleGobackEdit = () => {
  history.push({
    pathname: "/digit-ui/employee/pt/new-application",
    state: {
      generalDetails: {
        propertyId: proOwnerDetail.propertyId,
        oldPropertyId: proOwnerDetail.oldPropertyId,
        creationReason: proOwnerDetail.creationReason,
        propertyType: proOwnerDetail.propertyType,
        ownershipCategory: proOwnerDetail.ownershipCategory,
        usageCategory: proOwnerDetail.usageCategory,
        noOfFloors: proOwnerDetail.noOfFloors,
        landArea: proOwnerDetail.landArea,
        source: proOwnerDetail.source,
        channel: proOwnerDetail.channel,
      },
      addressDetailsSet: proOwnerDetail.address,
      ownerDetails: proOwnerDetail.owners,
      unitDetails: proOwnerDetail.units,
      propertyDocuments: proOwnerDetail.documents,
      additionalDetails: proOwnerDetail.additionalDetails,
      workflow: proOwnerDetail.workflow,
      processInstance: proOwnerDetail.processInstance,
    },
  });
};

    return (
        <Card>
            <button style={styles.downloadBtn}>⬇ Download</button>

            {/* Property Details */}
            <div style={styles.row}>
                {/* <InputField label="Property id" value={calculation?.serviceNumber || "N/A"} />
                <InputField label="Old Property id" value="567889" /> */}
                <InputField label="Rate zone" value={proOwnerDetail?.units[0].rateZone || "N/A"} />
            </div>


            {owners.map((owner, index) => (
                <React.Fragment key={owner.uuid || index}>
                    <div style={styles.sectionHeader}>Owner {index + 1}</div>
                    <div style={styles.rowOwnerName}>
                        <InputFieldNew label="Name" value={`${owner?.salutation || ""} ${owner?.name || "N/A"}`} />
                        <div style={{ marginBottom: "20px" }}></div>
                        <InputFieldNew label="Father name" value={`${owner?.fatherOrHusbandName || "N/A"}`} />
                        <div style={{ marginBottom: "20px" }}></div>
                        <InputFieldNew label="Address" value={owner?.permanentAddress || "N/A"} />
                    </div>
                    <div style={styles.row}>
                        <InputField label="Zone" value={address?.zone || "N/A"} />
                        <InputField label="Ward" value={address?.ward || "N/A"} />
                        <InputField label="Colony" value={address?.locality?.name || "N/A"} />
                    </div>
                    <div style={styles.row}>
                        <InputField label="Pin" value={address?.pincode || "N/A"} />
                        <InputField label="Mobile no" value={owner?.mobileNumber || "N/A"} />
                        <InputField label="Aadhaar" value={owner?.aadhaarNumber || "N/A"} />
                    </div>
                    <div style={styles.row}>
                        <InputField label="Email" value={owner?.emailId || "N/A"} />
                        <InputField label="Exemption" value={"0"} />
                        <InputField label="Date" value={owner?.createdDate ? new Date(owner.createdDate).toLocaleDateString("en-GB") : "N/A"} />
                    </div>
                </React.Fragment>
            ))}

            {/* Table 1 - Property Details */}
            <div style={styles.sectionHeader}>Tax Details</div>
            <table style={styles.table}>
                <thead>
                    <tr>
                        {["Year", "Usage Type", "User", " Floor Number", "Construction Type", " Area (Sq feet)", "Rate", "ALV"].map((h) => (
                            <th key={h} style={styles.th}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {propertyFYDetails.map((item) => (
                        <tr key={item.year}>
                            <td style={styles.td}>{item.year}</td>
                            <td style={styles.td}>{item.usageType}</td>
                            <td style={styles.td}>{item.usageFactor}</td>
                            <td style={styles.td}>{item.floorNo}</td>
                            <td style={styles.td}>{item.constructionType}</td>
                            <td style={styles.td}>{item.area}</td>
                            <td style={styles.td}>{item.factor}</td>
                            <td style={styles.td}>{item.alv}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Table 2 - Tax Summary */}
            <div style={styles.sectionHeader}>Property tax summary</div>
            <table style={styles.table}>
                <thead>
                    <tr>
                        {["Year", "ALV", "TPV", "PTAX", "SAM TAX", "URBAN TAX", "EDU TAX", "JAL ABHI", "JAL NIKAS", "SEWA KAR", "TOTAL TAX", "REB", "PENALTY", "NET TAX"].map((h) => (
                            <th key={h} style={styles.th}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {taxSummaries.map((item) => (
                        <tr key={item.year}>
                            <td style={styles.td}>{item.year}</td>
                            <td style={styles.td}>{item.alv}</td>
                            <td style={styles.td}>{item.tpv}</td>
                            <td style={styles.td}>{item.propertyTax}</td>
                            <td style={styles.td}>{item.samekit}</td>
                            <td style={styles.td}>{item.urbanTax}</td>
                            <td style={styles.td}>{item.educationCess}</td>
                            <td style={styles.td}>{item.jalKar}</td>
                            <td style={styles.td}>{item.jalNikas}</td>
                            <td style={styles.td}>{item.sevaKar}</td>
                            <td style={styles.td}>{item.totalTax}</td>
                            <td style={styles.td}>{item.rebate}</td>
                            <td style={styles.td}>{item.penalty}</td>
                            <td style={styles.td}>{item.netTax}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={13} style={{ ...styles.td, fontWeight: "bold" }}>TOTAL</td>
                        <td style={styles.td}>
                            {
                                taxSummaries.reduce((sum, item) => sum + (item.netTax || 0), 0).toFixed(2)
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
            <div style={{ display: "flex", width: "224px", marginLeft: "auto" }}>
                <button style={styles.confirmBtn} onClick={() => handleGobackEdit(true)}>Back</button>
                <button style={styles.confirmBtn} onClick={() => setShowConfirmPopup(true)}>Confirm</button>
            </div>


            {showConfirmPopup && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 9999
                }}>
                    <div style={{
                        background: "#fff",
                        borderRadius: "8px",
                        padding: "40px",
                        textAlign: "center",
                        width: "500px",
                        maxWidth: "90%"
                    }}>
                        <p style={{ fontSize: "16px", color: "#3E3E3E", marginBottom: "30px" }}>
                            Are you sure you want to submit this form?
                        </p>
                        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                            <button
                                style={{
                                    backgroundColor: "#502D9C",
                                    color: "#fff",
                                    padding: "8px 20px",
                                    borderRadius: "6px",
                                    border: "none",
                                    cursor: "pointer"
                                }}
                                onClick={() => setShowConfirmPopup(false)}
                            >
                                Back
                            </button>
                            <button
                                style={{
                                    backgroundColor: "#502D9C",
                                    color: "#fff",
                                    padding: "8px 20px",
                                    borderRadius: "6px",
                                    border: "none",
                                    cursor: "pointer"
                                }}
                                onClick={() => {
                                    setShowConfirmPopup(false);
                                    setShowSuccessPopup(true);
                                    // Add actual form submission logic here if needed
                                }}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showSuccessPopup && (
                <div style={{
                    position: "fixed",
                    top: 0, left: 0, width: "100vw", height: "100vh",
                    backgroundColor: "rgba(0,0,0,0.4)",
                    display: "flex", justifyContent: "center", alignItems: "center",
                    zIndex: 10000
                }}>
                    <div style={{
                        background: "#fff",
                        border: "1px solid #000",
                        padding: "40px 20px",
                        borderRadius: "8px",
                        textAlign: "center",
                        width: "350px",
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
                            {proOwnerDetail?.acknowldgementNumber || "N/A"}
                        </p>
                        <button
                            style={{
                                backgroundColor: "#502D9C",
                                color: "#fff",
                                padding: "10px 30px",
                                borderRadius: "6px",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "14px"
                            }}
                            onClick={() => {
                                // 🏠 Navigate home or reset form here
                                window.location.href = "/digit-ui/employee"; // or use React Router
                            }}
                        >
                            Home
                        </button>
                    </div>
                </div>
            )}
        </Card>

    );
};

export default PropertyForm;