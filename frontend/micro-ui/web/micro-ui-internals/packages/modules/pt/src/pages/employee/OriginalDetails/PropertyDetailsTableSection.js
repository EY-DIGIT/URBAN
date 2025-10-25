

import React, { useEffect, useState } from "react";

const PropertyDetailsTableSection = ({ t,  styles }) => {

  return (
    <div style={{ marginTop: "1rem", borderRadius: '10px'}}>
      {/* <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
        <label style={styles.poppinsLabel}>Property Type</label>
      </div> */}
      <div style={{ overflowX: "auto", maxWidth: "100%",  }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{
                ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
              }}>{t("Usage Type")}<span className="mandatory" style={styles.mandatory}>*</span></th>
              <th style={{
                ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
              }}>{t("Usage Factor")}<span className="mandatory" style={styles.mandatory}>*</span></th>
              <th style={{
                ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
              }}>{t("Floor No")}<span className="mandatory" style={styles.mandatory}>*</span></th>
              <th style={{
                ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
              }}>{t("Type of Construction")}<span className="mandatory" style={styles.mandatory}>*</span></th>
              <th style={{
                ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
              }}>{t("Area (Sq feet)")}<span className="mandatory" style={styles.mandatory}>*</span></th>
              <th style={{
                ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
              }}>{t("From Year")}<span className="mandatory" style={styles.mandatory}>*</span></th>
              <th style={{
                ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
              }}>{t("To Year")}<span className="mandatory" style={styles.mandatory}>*</span></th>
            
            </tr>
          </thead>
          <tbody>
        
              <tr >
                <td style={styles.tableCell}>
                  <select
                    style={{
                      ...styles.select, appearance: "auto",
                      WebkitAppearance: "auto",
                      MozAppearance: "auto",
                    }}
                     disabled={true}
              
                  >
                    <option value="" disabled>{t("Select")}</option>
                  
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
                 
                  >
                    <option value="" disabled>{t("Select")}</option>
                  
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
                 
                  >
                    <option value="" disabled>{t("Select")}</option>
                  
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
             
                  >
                    <option value="" disabled>{t("Select")}</option>
                 
                  </select>
                </td>

                <td style={styles.tableCell}>
                  <input
                   disabled={true}
                    type="text"
                    style={{
                      ...styles.select, appearance: "auto",
                      WebkitAppearance: "auto",
                      MozAppearance: "auto",
                    }}
                    placeholder={t("Enter")}
                
                  />
                </td>

                <td style={styles.tableCell}>
                  <select
                   disabled={true}
                    style={{
                      ...styles.select, appearance: "auto",
                      WebkitAppearance: "auto",
                      MozAppearance: "auto",
                    }}
                 
               
                  >
                    <option value="" disabled>{t("From Year")}</option>
                 
                  </select>
                </td>

                <td style={styles.tableCell}>
                  <select
                    style={{
                      ...styles.select, appearance: "auto",
                      WebkitAppearance: "auto",
                      MozAppearance: "auto",
                    }}
                 
                    disabled={true}
                  >
                    <option value="" disabled>{t("To Year")}</option>
               
                  </select>
                </td>
               
              </tr>
          
          </tbody>
        </table>
      </div>
  

    
    </div>
  );
};

export default PropertyDetailsTableSection;
