import React, { useState } from "react";
import styles from "./IndexStyle"
import { Dropdown, TextInput } from "@egovernments/digit-ui-react-components";

const SearchApplication = () => {
    const [applicationNumber, setApplicationNumber] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    
    // Check if any input field has value
    const hasInputValue = applicationNumber.trim() !== "" || mobileNumber.trim() !== "";
    
    const handleClear = () => {
        setApplicationNumber("");
        setMobileNumber("");
    };
    
    const handleFind = () => {
        // Add your search logic here
        console.log("Searching with:", { applicationNumber, mobileNumber });
    };

    // Static sample data for design purposes
    const sampleData = [
        {
            applicationNo: 'xxxx',
            address: 'City Center',
            status: 'Pending'
        }
    ];

    return (
        <div style={{ background: "#f5f5f5", minHeight: "100vh" }}>
            <style>{`
                * {
                    box-sizing: border-box;
                }
                
                .main-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 20px;
                }
                
                .page-content-wrapper {
                    background: white;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                
                .search-header {
                    padding: 16px 0px;
                }
                
                .search-header h2 {
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                    font-weight: 600;
                    font-size: 32px;
                    color: #6B133F66;
                    margin: 0;
                }
                
                .search-form {
                    display: flex;
                    align-items: flex-end;
                    gap: 16px;
                    margin-bottom: 32px;
                    flex-wrap: wrap;
                }
                
                .form-field {
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    min-width: 250px;
                }
                
                .form-label {
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                    font-weight: 400;
                    font-size: 14px;
                    color: #282828;
                    margin-bottom: 8px;
                }
                
                .form-input {
                    width: 100%;
                    height: 40px;
                    padding: 0 12px;
                    border-radius: 4px;
                    font-size: 14px;
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                    transition: all 0.3s ease;
                    background: #F7F7F7;
                }
                
                .form-input:focus {
                    outline: none;
                    border-color: #6b133f;
                }
                
                .form-input::placeholder {
                    color: #999;
                }
                
                .button-group {
                    display: flex;
                    gap: 12px;
                }
                
                .btn-clear {
                    min-width: 100px;
                    height: 40px;
                    padding: 0 20px;
                    border-radius: 19px;
                    color: white;
                    background: #6B133F;
                    border: none;
                    font-size: 15px;
                    font-weight: 500;
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .btn-clear:hover {
                    transform: translateY(-1px);
                    background: #551030;
                }
                
                .btn-clear:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                
                .btn-search {
                    min-width: 100px;
                    height: 40px;
                    padding: 0 20px;
                    border-radius: 19px;
                    border: none;
                    color: white;
                    background: #6b133f;
                    font-size: 15px;
                    font-weight: 500;
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .btn-search:hover {
                    background: #551030;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(107, 19, 63, 0.3);
                }
                
                .btn-search:disabled {
                    background: #999;
                    cursor: not-allowed;
                    transform: none;
                }
                
                .results-section {
                    margin-top: 40px;
                    padding-top: 40px;
                    border-top: 1px solid #e0e0e0;
                }
                
                .results-header {
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                    font-size: 32px;
                    font-weight: 600;
                    color: rgba(107, 19, 63, 1);
                    margin-bottom: 20px;
                }
                
                .no-results {
                    text-align: center;
                    padding: 40px;
                    color: #666;
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                }
                
                .table-wrapper {
                    width: 100%;
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                }
                
                .table-container {
                    border-radius: 8px;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    min-width: 100%;
                }
                
                table {
                    width: 100%;
                    min-width: 1000px;
                    border-collapse: collapse;
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                    background: white;
                }
                
                thead {
                    color: rgba(40, 40, 40, 1);
                }
                
                th {
                    padding: 14px 12px;
                    text-align: left;
                    font-weight: 500;
                    font-size: 14px;
                    white-space: nowrap;
                    background: rgba(107, 19, 63, 0.4);
                }
                
                th:first-child {
                    border-top-left-radius: 8px;
                }
                
                th:last-child {
                    border-top-right-radius: 8px;
                }
                
                td {
                    padding: 14px 12px;
                    border-bottom: 1px solid #f0f0f0;
                    font-size: 14px;
                    color: rgba(20, 27, 41, 1);
                    white-space: nowrap;
                }
                
                tbody tr:hover {
                    background: #f9f9f9;
                }
                
                tbody tr:last-child td {
                    border-bottom: none;
                }
                
                .link {
                    color: #6b133f;
                    text-decoration: none;
                    font-weight: 500;
                    cursor: pointer;
                }
                
                .link:hover {
                    text-decoration: underline;
                }
                
                .loading {
                    text-align: center;
                    padding: 40px;
                    color: #6b133f;
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                }
                
                .status-badge {
                    display: inline-block;
                    padding: 4px 12px;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 500;
                }
                
                .status-active {
                    background: #d4f8d4;
                    color: #0a6e0a;
                }
                
                .status-inactive {
                    background: #ffd4d4;
                    color: #d00000;
                }
                
                .status-inworkflow {
                    background: #fff3cd;
                    color: #856404;
                }
                
                .status-pending {
                    background: #fff3cd;
                    color: #856404;
                }
                
                .status-inreview {
                    background: #e3f2fd;
                    color: #1976d2;
                }
                
                .btn-action {
                    padding: 6px 16px;
                    border-radius: 4px;
                    border: none;
                    background: #6B133F;
                    color: white;
                    font-size: 12px;
                    font-weight: 500;
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                //css to make edit icon 
                // .btn-action {
                //     padding: 8px;
                //     border-radius: 4px;
                //     border: none;
                //     background: #6B133F;
                //     color: white;
                //     font-size: 12px;
                //     font-weight: 500;
                //     font-family: 'Poppins', 'Segoe UI', sans-serif;
                //     cursor: pointer;
                //     transition: all 0.2s ease;
                //     display: flex;
                //     align-items: center;
                //     justify-content: center;
                //     width: 32px;
                //     height: 32px;
                // }
                
                .btn-action:hover {
                    background: #551030;
                    transform: translateY(-1px);
                }
                
                .pagination-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 20px;
                    padding: 20px 0;
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                }
                
                .pagination-btn {
                    padding: 8px 16px;
                    border-radius: 8px;
                    border: 1px solid #ccc;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                
                .pagination-btn:not(:disabled) {
                    background-color: #6B133F;
                    color: #fff;
                }
                
                .pagination-btn:not(:disabled):hover {
                    background-color: #551030;
                    transform: translateY(-1px);
                }
                
                .pagination-btn:disabled {
                    background-color: #f0f0f0;
                    color: #999;
                    cursor: not-allowed;
                }
                
                .pagination-info {
                    font-size: 16px;
                    font-weight: 500;
                    color: #333;
                }

                @media (max-width: 768px) {
                    .search-form {
                        flex-direction: column;
                    }
                    
                    .form-field {
                        width: 100%;
                    }
                    
                    .button-group {
                        width: 100%;
                        flex-direction: column-reverse;
                    }
                    
                    .button-group button {
                        width: 100%;
                    }
                }
            `}</style>

            <div className="main-container">
                <div className="page-content-wrapper">
                    <div className="search-header">
                        <div style={{ color: "rgb(107, 19, 63)", fontSize: "20px", fontWeight: "bold" }}><h1>Search Application</h1></div>
                    </div>

                    <div className="search-form">
                        <div className="form-field">
                            <label className="form-label">Application ID<span className="mandatory" style={styles.mandatory}>*</span></label>
                            <input
                                className="form-input"
                                type="text"
                                value={applicationNumber}
                                onChange={(e) => setApplicationNumber(e.target.value)}
                                placeholder="Application number"
                            />
                        </div>
                        {/* <div className="form-field">
                            <label className="form-label">Mobile Number</label>
                            <input
                                className="form-input"
                                type="text"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                placeholder="Mobile number"
                            />
                        </div> */}
                        <div className="form-field">
                            <label className="form-label">Status</label>
                            <select
                                className="form-input"
                                defaultValue=""
                            >
                                <option value="">Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Pending">Pending</option>
                            </select>
                        </div>

                        <div className="button-group">
                            <button
                                type="button"
                                className="btn-clear"
                                disabled={!hasInputValue}
                                onClick={handleClear}
                            >
                                Clear
                            </button>
                            <button
                                type="button"
                                className="btn-clear"
                                disabled={!hasInputValue}
                                onClick={handleFind}
                            >
                                Find
                            </button>
                        </div>
                    </div>

                    <div className="results-section">
                        <h3 className="results-header">
                            Results
                        </h3>
                        <div className="table-wrapper">
                            <div className="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Application Number</th>
                                            <th>Address</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sampleData.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <span className="link">
                                                        {item.applicationNo}
                                                    </span>
                                                </td>
                                                <td>{item.address}</td>
                                                <td>
                                                    <span className={`status-badge status-${item.status.toLowerCase().replace(/\s+/g, '')}`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button className="btn-action">View</button>    
                                                    {/* edit icon */}
                                                    {/* <button className="btn-action">
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
                                                        </svg>
                                                    </button> */}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* Static Pagination Component */}
                            <div className="pagination-container">
                                <button
                                    className="pagination-btn"
                                    disabled
                                >
                                    ◀ Previous
                                </button>

                                <span className="pagination-info">
                                    Page 1 of 1
                                </span>

                                <button
                                    className="pagination-btn"
                                    disabled
                                >
                                    Next ▶
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchApplication;