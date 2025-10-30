

import React, { useEffect, useState } from "react";
import { Dropdown, TextInput, SubmitBar } from "@egovernments/digit-ui-react-components";

const PropertyDetailsTableSection = ({ t, styles, applicationData }) => {


    return (
        <div style={{ marginTop: "1rem", borderRadius: '10px' }}>
            {/* <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
        <label style={styles.poppinsLabel}>Property Type</label>
      </div> */}
            <div style={{ overflowX: "auto", maxWidth: "100%", ...styles.formSection }}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={{
                                ...styles.tableHeader, fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", lineHeight: "130%", letterSpacing: "0", fontStyle: "normal",
                            }}>{t("Namantran Fees (₹)")}<span className="mandatory" style={styles.mandatory}>*</span></th>
                            <th style={{
                                ...styles.tableHeader, fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", lineHeight: "130%", letterSpacing: "0", fontStyle: "normal",
                            }}>{t("Rajwad Fees (₹)")}<span className="mandatory" style={styles.mandatory}>*</span></th>
                            <th style={{
                                ...styles.tableHeader, fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", lineHeight: "130%", letterSpacing: "0", fontStyle: "normal",
                            }}>{t("Advertisement (Vigyapan) Fees (₹)")}<span className="mandatory" style={styles.mandatory}>*</span></th>
                            <th style={{
                                ...styles.tableHeader, fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", lineHeight: "130%", letterSpacing: "0", fontStyle: "normal",
                            }}>{t("Action")}<span className="mandatory" style={styles.mandatory}>*</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {unit.map((unit, index) => ( */}
                        <tr >

                            <td style={styles.tableCell}>
                                <select
                                    style={{
                                        ...styles.select, appearance: "auto",
                                        WebkitAppearance: "auto",
                                        MozAppearance: "auto",
                                    }}
                                    disabled={true}
                                // value={unit.usageType}
                                // onChange={(e) => handleUnitChange(index, "usageType", e.target.value)}
                                >
                                    <option value="" disabled>{t("Select")}</option>
                                    {/* {usageTypes.map((item) => (
                      <option key={item.code} value={item.code}>
                        {t(item.i18nKey)}
                      </option>
                    ))} */}
                                </select>
                            </td>

                            <td style={styles.tableCell}>
                                <select
                                    disabled={true}
                                    style={{
                                        ...styles.select, appearance: "auto",
                                        WebkitAppearance: "auto",
                                        MozAppearance: "auto",
                                    }}
                                // value={unit.usageFactor}
                                // onChange={(e) => handleUnitChange(index, "usageFactor", e.target.value)}
                                >
                                    <option value="" disabled>{t("Select")}</option>
                                    {/* {occupancyTypes.map((item) => (
                      <option key={item.code} value={item.code}>
                        {t(item.i18nKey)}
                      </option>
                    ))} */}
                                </select>
                            </td>

                            <td style={styles.tableCell}>
                                <select
                                    disabled={true}
                                    style={{
                                        ...styles.select, appearance: "auto",
                                        WebkitAppearance: "auto",
                                        MozAppearance: "auto",
                                    }}
                                // value={unit.floorNo}
                                // onChange={(e) => handleUnitChange(index, "floorNo", e.target.value)}
                                >
                                    <option value="" disabled>{t("Select")}</option>
                                    {/* {floorList.map((floor) => (
                      <option key={floor.code} value={floor.code}>
                        {t(floor.i18nKey)}
                      </option>
                    ))} */}
                                </select>
                            </td>
                            <td style={styles.tableCell}>
                                <a href="/digit-ui/employee/pt/CalculateFees">Edit</a>
                            </td>

                        </tr>
                        {/* ))} */}
                    </tbody>
                </table>
                <div style={styles.flex30}>
                    <div style={styles.poppinsLabel}>
                        {t("Total Fees (₹)")}
                    </div>
                    <TextInput
                        //  value={propertyId}
                        // onChange={handleRestryIdChange}
                        style={styles.widthInput}

                    />

                </div>
                <div style={styles.flex30}></div>
                <div style={styles.flex30}></div>
            </div>


        </div>
    );
};

export default PropertyDetailsTableSection;
