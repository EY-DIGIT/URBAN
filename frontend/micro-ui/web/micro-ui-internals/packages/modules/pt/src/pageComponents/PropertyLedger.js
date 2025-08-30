import React, { useState } from "react";
import {
  Loader, Card,
  SubmitBar,
  TextInput,
  Dropdown,
  CheckBox,
} from "@egovernments/digit-ui-react-components";
import { useLocation, useHistory } from "react-router-dom";
import DownloadPdfButton from "./DownloadPDF";

const PropertyLedger = () => {
  const history = useHistory();
  const location = useLocation();

  let userInfo1 = JSON.parse(localStorage.getItem("user-info"));
  const tenantId = userInfo1?.tenantId;
  const mutationUpdate = Digit.Hooks.pt.usePropertyAPI(tenantId, false);

  const { data, proOwnerDetail,calculation } = location.state || {};
  const propertyFYDetails = calculation?.propertyFYDetails || [];

  const taxSummaries = calculation?.propertyFYTaxSummaries || [];
  const ownersDetail = proOwnerDetail?.owners || [];
  const address = proOwnerDetail?.address || {};

  return (
    <div id="downloadable-component">
      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
        boxSizing: "border-box",
        ...styles.container
      }}>
        <div style={{ marginBottom: "20px", display: "flex", justifyContent: "flex-end" }}>
          <button style={styles.downloadBtn} > <DownloadPdfButton targetId="downloadable-component" /></button>
        </div>

        <div style={styles.cardD}>
          <div style={styles.sectionHeaderDemand}>Ledger Report</div>
          <div style={styles.row}>
            <InputField label="Rate zone" value={proOwnerDetail?.units[0].rateZone || "N/A"} />
            <InputFieldBlank />
            <InputFieldBlank />
          </div>


          {ownersDetail.map((owner, index) => (
            <React.Fragment key={owner.uuid || index}>
              <div style={styles.sectionHeader}>Owner {index + 1}</div>
              <div style={styles.row}>
                <InputField label="Name" value={`${owner?.salutation || ""} ${owner?.name || "N/A"}`} />
                <InputField label="Father name" value={owner?.fatherOrHusbandName} />
                <InputField label="Address" value={owner?.permanentAddress || "N/A"} />
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
                <InputField
                  label="Email"
                  value={owner?.emailId === "abc@gmail.com" ? "" : owner?.emailId || "N/A"}
                />
                <InputField label="Exemption" value={owner?.ownerType || "N/A"} />
                <InputField label="Date" value={owner?.createdDate ? new Date(owner.createdDate).toLocaleDateString("en-GB") : "N/A"} />
              </div>
            </React.Fragment>
          ))}
        </div>

        <div style={styles.cardD}>
          <div style={styles.sectionHeader}>Dimension Details</div>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {["Usage Type", "Usage Factor", "Floor No.", "Construction Type", "Area", "Rate"].map((h) => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {propertyFYDetails.map((item, index) => (
                  <tr key={index}>
                    <td style={styles.td}>{item.usageType}</td>
                    <td style={styles.td}>{item.usageFactor}</td>
                    <td style={styles.td}>{item.floorNo}</td>
                    <td style={styles.td}>{item.constructionType}</td>
                    <td style={styles.td}>{item.area}</td>
                    <td style={styles.td}>{item.alv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={styles.cardD}>
          <div style={styles.sectionHeader}>Summary Ledger</div>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {["Year", "Demand", "Collection /Paid", "Cumulative Balance"].map((h) => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {taxSummaries.map((item, index) => (
                  <tr key={index}>
                    <td style={styles.td}>{item.year}</td>
                    <td style={styles.td}>₹ {item.totalTax}</td>
                    <td style={styles.td}>₹ {item.collection || 0}</td>
                    <td style={styles.td}>₹ {item.netTax}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    // padding: "20px",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    maxWidth: "1200px",
    // margin: "0 auto",
    width: "100%",
    boxSizing: "border-box",
    '@media (max-width: 768px)': {
      padding: "10px"
    },
    '@media (max-width: 630px)': {
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
    '@media (max-width: 768px)': {
      flexDirection: "column",
      gap: "12px"
    },
    '@media (max-width: 630px)': {
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
    '@media (max-width: 768px)': {
      minWidth: "100%"
    },
    '@media (max-width: 630px)': {
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
    '@media (max-width: 630px)': {
      padding: "8px",
      fontSize: "13px",
      height: "40px"
    }
  },
  label: {

    fontFamily: 'Poppins, sans-serif',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '22px',
    letterSpacing: '0',
    color: '#282828',
    width: "200px",
    marginBottom: "4px",
    wordWrap: "break-word",
    '@media (max-width: 768px)': {
      fontSize: "13px"
    },
    '@media (max-width: 630px)': {
      fontSize: "12px",
      lineHeight: "18px"
    }
  },
  sectionHeader: {

    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "100%",
    color: "#6b133f",
    marginBottom: "16px",
    marginTop: "20px",
    '@media (max-width: 768px)': {
      fontSize: "15px",
      marginTop: "16px",
      marginBottom: "12px"
    }
  },
  sectionHeaderDemand: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: "22px",
    lineHeight: "100%",
    color: "#6b133f",
    marginBottom: "20px",
    '@media (max-width: 768px)': {
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
    '@media (max-width: 768px)': {
      fontSize: "11px"
    }
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "800px",
    '@media (max-width: 768px)': {
      minWidth: "600px"
    }
  },
  th: {
    border: "1px solid #ccc",
    padding: "8px 4px",
    backgroundColor: "#B9B9B9",
    // border:"1px,0px,0px,1px #B9B9B9",
    textAlign: "center",
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "130%",
    color: "black",
    whiteSpace: "nowrap",
    '@media (max-width: 768px)': {
      padding: "6px 3px",
      fontSize: "10px"
    }
  },
  td: {
    border: "1px solid #ccc",
    // border:"1px,0px,0px,1px #B9B9B9",
    padding: "8px 4px",
    textAlign: "center",
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "130%",
    color: "#000000",
    whiteSpace: "nowrap",
    '@media (max-width: 768px)': {
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
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "12px",
    color: "#6b133f",
    boxSizing: "border-box",
    '@media (max-width: 768px)': {
      width: "100%",
      fontSize: "11px"
    },
    '@media (max-width: 630px)': {
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
    '@media (max-width: 768px)': {
      padding: "12px",
      marginBottom: "16px"
    },
    '@media (max-width: 630px)': {
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
    '@media (max-width: 768px)': {
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
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: "14px",
    height: "35px",
    whiteSpace: "nowrap",
    '@media (max-width: 768px)': {
      padding: "12px 20px",
      fontSize: "13px",
      width: "100%"
    }
  },
  bottomText: {
    color: "red",
    fontSize: "12px",
    marginTop: "8px",
    '@media (max-width: 768px)': {
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

    '@media (max-width: 1024px)': {
      width: "70%",
      padding: "28px",
      gap: "30px",
    },
    '@media (max-width: 768px)': {
      width: "90%",
      padding: "20px",
      gap: "24px",
    },
    '@media (max-width: 480px)': {
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
    '@media (max-width: 768px)': {
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

const InputField = ({ label, value }) => (
  <div style={styles.field}>
    <div style={styles.label}>{label}</div>
    <input style={styles.input} value={value} readOnly />
  </div>
);

const InputFieldBlank = () => (
  <div style={styles.fieldBlank}>

  </div>
);

export default PropertyLedger;