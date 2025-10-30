

import React, { useEffect, useState } from "react";

const PropertyDetailsTableSection = ({ t, application, styles }) => {
  console.log("Units Data in PropertyDetailsTableSection:", application?.units);
  return (
    <div style={{ marginTop: "1rem", borderRadius: '10px' }}>
      {/* <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
        <label style={styles.poppinsLabel}>Property Type</label>
      </div> */}


      <div style={{ overflowX: "auto", maxWidth: "100%", }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{
                ...styles.tableHeader, fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", lineHeight: "130%", letterSpacing: "0", fontStyle: "normal",
              }}>{t("Usage Type")}<span className="mandatory" style={styles.mandatory}>*</span></th>
              <th style={{
                ...styles.tableHeader, fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", lineHeight: "130%", letterSpacing: "0", fontStyle: "normal",
              }}>{t("Usage Factor")}<span className="mandatory" style={styles.mandatory}>*</span></th>
              <th style={{
                ...styles.tableHeader, fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", lineHeight: "130%", letterSpacing: "0", fontStyle: "normal",
              }}>{t("Floor No")}<span className="mandatory" style={styles.mandatory}>*</span></th>
              <th style={{
                ...styles.tableHeader, fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", lineHeight: "130%", letterSpacing: "0", fontStyle: "normal",
              }}>{t("Type of Construction")}<span className="mandatory" style={styles.mandatory}>*</span></th>
              <th style={{
                ...styles.tableHeader, fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", lineHeight: "130%", letterSpacing: "0", fontStyle: "normal",
              }}>{t("Area (Sq feet)")}<span className="mandatory" style={styles.mandatory}>*</span></th>
              <th style={{
                ...styles.tableHeader, fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", lineHeight: "130%", letterSpacing: "0", fontStyle: "normal",
              }}>{t("From Year")}<span className="mandatory" style={styles.mandatory}>*</span></th>
              <th style={{
                ...styles.tableHeader, fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", lineHeight: "130%", letterSpacing: "0", fontStyle: "normal",
              }}>{t("To Year")}<span className="mandatory" style={styles.mandatory}>*</span></th>

            </tr>
          </thead>
          <tbody>
           {(application?.units || []).map((unit, index) => (
  <tr key={index}>
    <td style={styles.tableCell}>
      <select
        value={unit?.usageCategory || ""}
        disabled
        style={{
          ...styles.select,
          appearance: "auto",
          WebkitAppearance: "auto",
          MozAppearance: "auto",
        }}
      >
        <option value={unit?.usageCategory || ""}>
          {unit?.usageCategory || ""}
        </option>
      </select>
    </td>
    <td style={styles.tableCell}>
      <select
        value={unit?.occupancyType || ""}
        disabled
        style={{
          ...styles.select,
          appearance: "auto",
          WebkitAppearance: "auto",
          MozAppearance: "auto",
        }}
      >
        <option value={unit?.occupancyType || ""}>
          {unit?.occupancyType || ""}
        </option>
      </select>
    </td>
    <td style={styles.tableCell}>
      <select
        value={unit?.floorNo?.toString() || ""}
        disabled
        style={{
          ...styles.select,
          appearance: "auto",
          WebkitAppearance: "auto",
          MozAppearance: "auto",
        }}
      >
        <option value={unit?.floorNo}>{unit?.floorNo}</option>
      </select>
    </td>
    <td style={styles.tableCell}>
      <select
        value={unit?.constructionDetail?.constructionType || ""}
        disabled
        style={{
          ...styles.select,
          appearance: "auto",
          WebkitAppearance: "auto",
          MozAppearance: "auto",
        }}
      >
        <option value={unit?.constructionDetail?.constructionType || ""}>
          {unit?.constructionDetail?.constructionType || ""}
        </option>
      </select>
    </td>
    <td style={styles.tableCell}>
      <input
        style={{ border: "none", background: "none" }}
        value={unit?.constructionDetail?.builtUpArea || ""}
        readOnly
      />
    </td>
    <td style={styles.tableCell}>
      <select
        disabled
        style={{
          ...styles.select,
          appearance: "auto",
          WebkitAppearance: "auto",
          MozAppearance: "auto",
        }}
        value={unit.fromYear || ""}
      >
        <option value={unit?.fromYear}>{unit?.fromYear}</option>
      </select>
    </td>
    <td style={styles.tableCell}>
      <select
        disabled
        style={{
          ...styles.select,
          appearance: "auto",
          WebkitAppearance: "auto",
          MozAppearance: "auto",
        }}
        value={unit.toYear || ""}
      >
        <option value={unit?.toYear}>{unit?.toYear}</option>
      </select>
    </td>
  </tr>
))}


          </tbody>
        </table>
      </div>



    </div>
  );
};

export default PropertyDetailsTableSection;
