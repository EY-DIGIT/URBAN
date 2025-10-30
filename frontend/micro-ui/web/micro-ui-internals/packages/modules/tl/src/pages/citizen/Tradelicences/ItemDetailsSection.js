import React, { useState } from "react";
import styles from "./IndexStyle"
import { Dropdown, TextInput } from "@egovernments/digit-ui-react-components";

const PropertyDetailsTableSection = () => {
  const [rows, setRows] = useState([
    { id: 1, no: '', itemCode: '', description: '', quantity: '', rate: '', totalAmount: '' }
  ]);

  const addRow = () => {
    const newRow = { 
      id: rows.length + 1, 
      no: '', 
      itemCode: '', 
      description: '', 
      quantity: '', 
      rate: '', 
      totalAmount: '' 
    };
    setRows([...rows, newRow]);
  };

  const updateRow = (id, field, value) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  return (
    <div className="form-section" style={{...styles.formSection, marginTop: "1rem", borderRadius: '10px'}}>
      <div style={{ overflowX: "auto", maxWidth: "100%"}}>
        <table style={styles.table}>
           <thead>
              <tr>
                <th style={{
                  ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
                }}>No.</th>
                <th  style={{
                  ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
                }}>Item Code</th>
                <th  style={{
                  ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
                }}>Description</th>
                <th style={{
                  ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
                }}>Quantity</th>
                <th style={{
                  ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
                }}>Rate</th>
                <th style={{
                  ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
                }}>Total Amount</th>
                <th style={{
                  ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
                }}>Action</th>
              </tr>
            </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td style={styles.tableCell}>
                  <input
                    type="text"
                    style={styles.select}
                    placeholder="Enter"
                    value={row.no}
                    onChange={(e) => updateRow(row.id, 'no', e.target.value)}
                  />
                </td>

                <td style={styles.tableCell}>
                  <input
                    type="text"
                    style={styles.select}
                    placeholder="Enter"
                    value={row.itemCode}
                    onChange={(e) => updateRow(row.id, 'itemCode', e.target.value)}
                  />
                </td>

                <td style={styles.tableCell}>
                  <input
                    type="text"
                    style={styles.select}
                    placeholder="Enter"
                    value={row.description}
                    onChange={(e) => updateRow(row.id, 'description', e.target.value)}
                  />
                </td>

                <td style={styles.tableCell}>
                  <input
                    type="text"
                    style={styles.select}
                    placeholder="Enter"
                    value={row.quantity}
                    onChange={(e) => updateRow(row.id, 'quantity', e.target.value)}
                  />
                </td>

                <td style={styles.tableCell}>
                  <input
                    type="text"
                    style={styles.select}
                    placeholder="Enter"
                    value={row.rate}
                    onChange={(e) => updateRow(row.id, 'rate', e.target.value)}
                  />
                </td>

                <td style={styles.tableCell}>
                  <input
                    type="text"
                    style={styles.select}
                    placeholder="Enter"
                    value={row.totalAmount}
                    onChange={(e) => updateRow(row.id, 'totalAmount', e.target.value)}
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
            ))}
          </tbody>
        </table>

          <div style={{ textAlign: "right", marginTop: "0.5rem" }}>
            <a 
              href="#" 
              style={styles.addMoreLink} 
              onClick={(e) => {
                e.preventDefault();
                addRow();
              }}
            >
              + Add more
            </a>
        </div>
        
      </div>


      {/* Second section for Item Details */}
      
        {/* Pincode */}
        <div style={styles.flex302}>
          <div style={styles.poppinsLabel}>
            Item Fees
          </div>
          <TextInput
            style={styles.widthInput}
            name="itemFees"
            placeholder="₹ 00.00"
          />
        </div>
        {/* Pincode */}
        <div style={styles.flex302}>
          <div style={styles.poppinsLabel}>
            Service Charge
          </div>
          <TextInput
            style={styles.widthInput}
            name="serviceCharge"
            placeholder="₹ 00.00"
          />
        </div>
        {/* Pincode */}
        <div style={styles.flex302}>
          <div style={styles.poppinsLabel}>
            Form Fees
          </div>
          <TextInput
            style={styles.widthInput}
            name="formFees"
            placeholder="₹ 00.00"
          />
        </div>
        {/* Pincode */}
        <div style={styles.flex302}>
          <div style={styles.poppinsLabel}>
            Total Amount
          </div>
          <TextInput
            style={styles.widthInput}
            name="totalAmount"
            placeholder="₹ 00.00"
          />
        </div>

    </div>
  );
};

export default PropertyDetailsTableSection;