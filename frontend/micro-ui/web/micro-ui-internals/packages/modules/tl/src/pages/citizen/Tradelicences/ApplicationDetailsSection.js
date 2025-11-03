import React, { useState } from "react";
import styles from "./IndexStyle"
import { Dropdown, CheckBox, TextInput } from "@egovernments/digit-ui-react-components";

const ApplicationDetailsSection = () => {
  const [sameAsFirmAddress, setSameAsFirmAddress] = useState(false);

  return (
    
    <div className="form-section" style={styles.formSection}>
         
    {/* Full-width checkbox that doesn't interfere with flex30 layout */}
      <div style={{
        width: '100%', 
        marginBottom: '20px',                              
      }}>
        <label style={{ fontSize: "14px" }}>
        <input
          type="checkbox"
          style={{ marginRight: '10px' }}
        />
        <b>Applicant Address Same as Firm Address</b>
        </label>
      </div>

    {/* Date Application */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          Date of Application<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <TextInput
          style={styles.widthInput}
          name="dateOfApplication"
          placeholder="Enter"
        />
      </div>

      {/* Application ULB */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          Application ULB
        </div>
        <TextInput
          style={styles.widthInput}
          name="applicationULB"
          placeholder="Enter"
        />
      </div>

      {/* blank only */}
      <div style={styles.flex30}></div>

      {/* Address */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          Street
        </div>
        <TextInput
          style={styles.widthInput}
          name="address"
          placeholder="Enter"
        />
      </div>

      {/* Door/House Number */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          House/ Plot/ Building Number<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <TextInput
          style={styles.widthInput}
          name="doorNo"
          placeholder="Enter"
        />
      </div>

      {/* Colony */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          Colony<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <TextInput
          style={styles.widthInput}
          name="colony"
          placeholder="Enter"
        />
      </div>

      {/* Zone */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          Zone<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <TextInput
          style={styles.widthInput}
          name="zone"
          placeholder="Enter"
        />
      </div>

      {/* Ward */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          Ward<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <TextInput
          style={styles.widthInput}
          name="ward"
          placeholder="Enter"
        />
      </div>

      {/* Pincode */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          Pin Code<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <TextInput
          style={styles.widthInput}
          name="pincode"
          placeholder="Enter"
        />
      </div>

      {/* Select Application Section */}

      <div style={styles.poppinsLabel}>
          Select Application<span className="mandatory" style={styles.mandatory}>*</span>
      </div>

      <div style={{ marginTop: "1rem", borderRadius: '10px'}}>
            <div style={{ overflowX: "auto", maxWidth: "100%"}}>
              <table style={styles.table}>
                 <thead>
                    <tr>
                      <th style={{
                        ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
                      }}>Name</th>
                      <th  style={{
                        ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
                      }}>Mobile Number</th>
                      <th  style={{
                        ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
                      }}>Gender</th>
                      <th style={{
                        ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
                      }}>Applicant Relationship</th>
                      <th style={{
                        ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
                      }}>Email</th>
                      <th style={{
                        ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
                      }}>Father/ Husband Name</th>
                      <th style={{
                        ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
                      }}>Action</th>
                    </tr>
                  </thead>
                <tbody>
                  <tr>
                    <td style={styles.tableCell}>
                      <input
                        type="text"
                        style={styles.select}
                        placeholder="Enter"
                      />
                    </td>
      
                    <td style={styles.tableCell}>
                      <input
                        type="text"
                        style={styles.select}
                        placeholder="Enter"
                      />
                    </td>
      
                    <td style={styles.tableCell}>
                      <input
                        type="text"
                        style={styles.select}
                        placeholder="Enter"
                      />
                    </td>
      
                    <td style={styles.tableCell}>
                      <input
                        type="text"
                        style={styles.select}
                        placeholder="Enter"
                      />
                    </td>
      
                    <td style={styles.tableCell}>
                      <input
                        type="text"
                        style={styles.select}
                        placeholder="Enter"
                      />
                    </td>
      
                    <td style={styles.tableCell}>
                      <input
                        type="text"
                        style={styles.select}
                        placeholder="Enter"
                      />
                    </td>
      
                    <td style={styles.tableCell}>
                      <button
                        type="button"
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="#666" 
                          strokeWidth="2"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

    </div>
  );
};

export default ApplicationDetailsSection;