import React from "react";
import  styles  from "../employee/IndexStyle";

const CalculateFees = () => {
  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f6f6fa",
    // padding: "20px",
  };

  const sectionStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  };

  const titleStyle = {
    color: "#6c0047",
    fontWeight: "bold",
    fontSize: "18px",
    marginBottom: "10px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
  };

  const thStyle = {
    backgroundColor: "#f1e3f0",
    border: "1px solid #d8c7d4",
    padding: "10px",
    textAlign: "left",
    color: "#3a0034",
  };

  const tdStyle = {
    border: "1px solid #d8c7d4",
    padding: "10px",
    backgroundColor: "#fff",
  };

  const labelStyle = {
    fontWeight: "bold",
    color: "#6c0047",
    marginBottom: "8px",
  };

  const saveContainer = {
    display: "flex",
    justifyContent: "center",
    paddingTop: "20px",
  };

  const saveButton = {
    backgroundColor: "#7b004b",
    color: "white",
    border: "none",
    padding: "10px 40px",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Calculate Fees</h3>

      {/* Namantaran Fees */}
      <div style={sectionStyle}>
        <div style={styles.assessmentStyle}>Namantaran Fees</div>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={{
                ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
              }}>Rate Zone</th>
              <th style={{
                ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
              }}>Usage Type</th>
              <th style={{
                ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
              }}>Namantaran Fees (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.tableCell}>Prefilled</td>
              <td style={styles.tableCell}>Prefilled</td>
              <td style={styles.tableCell}>Auto calculated</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Rajwad Fees */}
      <div style={sectionStyle}>
        <div style={styles.assessmentStyle}>Rajwad Fees</div>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={{
                ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
              }}>Document Name</th>
              <th style={{
                ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
              }}>Rate Per Page (₹)</th>
              <th style={{
                ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
              }}>No. of Pages Uploaded</th>
              <th style={{
                ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
              }}>Total Amount (₹)</th>
              <th style={{
                ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
              }}>Action *</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.tableCell}>Name_To_Be_Updated</td>
              <td style={styles.tableCell}>
                1-3 pages: 10 per page <br />
                4th page onwards: 05 per page
              </td>
              <td style={styles.tableCell}>5</td>
              <td style={styles.tableCell}>Auto calculated</td>
              <td style={styles.tableCell}>
                <a href="#" style={{ color: "#7b004b", textDecoration: "none" }}>
                  View File ✕
                </a>
              </td>
            </tr>
            <tr>
              <td style={styles.tableCell}>Registry Vikray Patra</td>
              <td style={styles.tableCell}>05 per page</td>
              <td style={styles.tableCell}>5</td>
              <td style={styles.tableCell}>Auto calculated</td>
              <td style={styles.tableCell}>
                <a href="#" style={{ color: "#7b004b", textDecoration: "none" }}>
                  View File ✕
                </a>
              </td>
            </tr>
            <tr>
              <td style={styles.tableCell}>Registry Abhilekh</td>
              <td style={styles.tableCell}>05 per page</td>
              <td style={styles.tableCell}>6</td>
              <td style={styles.tableCell}>Auto calculated</td>
              <td style={styles.tableCell}>
                <a href="#" style={{ color: "#7b004b", textDecoration: "none" }}>
                  View File ✕
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Advertisement Fees */}
      <div style={sectionStyle}>
        <div style={styles.assessmentStyle}>Advertisement Fees</div>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={{
                ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
              }}>Select Type *</th>
              <th style={{
                ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
              }}>Newspaper *</th>
              <th style={{
                ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
              }}>Rate (₹) *</th>
              <th style={{
                ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
              }}>Area (Sq cm) *</th>
              <th style={{
                ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
              }}>Notice Count *</th>
              <th style={{
                ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
              }}>Total Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.tableCell}>
                <select
                  style={{
                    width: "100%",
                    padding: "6px",
                    borderRadius: "4px",
                    // border: "1px solid #ccc",
                  }}
                >
                  <option>Per Sq cm</option>
                  <option>Per Line</option>
                </select>
              </td>
              <td style={styles.tableCell}>
                <select
                  style={{
                    width: "100%",
                    padding: "6px",
                    borderRadius: "4px",
                    // border: "1px solid #ccc",
                  }}
                >
                  <option>Dainik Bhaskar</option>
                  <option>Navbharat Times</option>
                </select>
              </td>
              <td style={styles.tableCell}>
                <input
                  type="number"
                  defaultValue="260"
                  style={{
                    width: "100%",
                    padding: "6px",
                    borderRadius: "4px",
                    // border: "1px solid #ccc",
                  }}
                />
              </td>
              <td style={styles.tableCell}>
                <input
                  type="number"
                  defaultValue="10"
                  style={{
                    width: "100%",
                    padding: "6px",
                    borderRadius: "4px",
                    // border: "1px solid #ccc",
                  }}
                />
              </td>
              <td style={styles.tableCell}>
                <input
                  type="number"
                  defaultValue="0"
                  style={{
                    width: "100%",
                    padding: "6px",
                    borderRadius: "4px",
                    // border: "1px solid #ccc",
                  }}
                />
              </td>
              <td style={styles.tableCell}>2600.00</td>
            </tr>
          </tbody>
        </table>

        <div style={saveContainer}>
          <button style={saveButton}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default CalculateFees;
