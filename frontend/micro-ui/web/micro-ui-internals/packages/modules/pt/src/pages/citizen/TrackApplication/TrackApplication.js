import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import PTinboxTable from "./PTInboxTable";

const TrackApplication = ({ tenantId, isLoading, t = (text) => text, onSubmit, data, count, setShowToast }) => {

    const { data: storeData } = Digit.Hooks.useStore.getInitData();
    const { stateInfo } = storeData || {};
    
    // Get user info for mobile number
    const userInfo = Digit.UserService.getUser();
    const mobileNumber = userInfo?.info?.mobileNumber;

    const [formData, setFormData] = useState({
        applicationNo: ''
    });

    const [searchResults, setSearchResults] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [allUserProperties, setAllUserProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Function to mask mobile number - show only last 4 digits
    const maskMobileNumber = (mobile) => {
        if (!mobile) return 'N/A';
        const mobileStr = mobile.toString();
        if (mobileStr.length === 10) {
            return `xxx-xxx-${mobileStr.slice(-4)}`;
        }
        return mobileStr;
    };

    // Function to get owner's mobile number from data
    const getOwnerMobile = (item) => {
        if (item.owners && item.owners.length > 0 && item.owners[0].mobileNumber) {
            return maskMobileNumber(item.owners[0].mobileNumber);
        }
        return 'N/A';
    };

    // Function to get owner's father name
    const getFatherName = (item) => {
        if (item.owners && item.owners.length > 0 && item.owners[0].fatherOrHusbandName) {
            return item.owners[0].fatherOrHusbandName;
        }
        return 'N/A';
    };

    // Function to format address
    const getAddress = (address) => {
        if (!address) return 'N/A';
        const parts = [];
        if (address.doorNo) parts.push(address.doorNo);
        if (address.street) parts.push(address.street);
        if (address.landmark) parts.push(address.landmark);
        if (address.locality?.name) parts.push(address.locality.name);
        return parts.join(', ') || 'N/A';
    };

    // Function to extract status text after second underscore (WF_PT_ACTIVE -> ACTIVE)
    const getStatusText = (status) => {
        if (!status) return 'N/A';
        const parts = status.split('_');
        if (parts.length >= 3) {
            return parts.slice(2).join('_'); // Gets everything after second underscore
        }
        return status;
    };

    // Fetch all properties for the logged-in user based on mobile number
    useEffect(() => {
        const fetchAllUserProperties = async () => {
            if (!mobileNumber) return;
            
            try {
                const response = await Digit.PTService.search({
                    tenantId,
                    filters: {
                        mobileNumber: mobileNumber,
                        // Remove status filter to get ALL properties (ACTIVE, INACTIVE, INWORKFLOW)
                    },
                });
                
                const properties = response?.Properties || [];
                console.log("All user properties:", properties);
                setAllUserProperties(properties);
            } catch (err) {
                console.error("Error fetching user properties:", err);
            }
        };

        fetchAllUserProperties();
    }, [tenantId, mobileNumber]);

    const handleReset = () => {
        setFormData({
            applicationNo: ''
        });
        setSearchResults(null);
        setCurrentPage(1);
        if (setShowToast) setShowToast(null);
    };

    const handleSubmit = async () => {
        const hasSearchCriteria = formData.applicationNo.trim() !== '';

        if (!hasSearchCriteria) {
            // If no search criteria, show all user properties
            setSearchResults(allUserProperties);
            return;
        }

        setIsSearching(true);

        try {
            // Search for specific property by acknowledgement number
            const response = await Digit.PTService.search({
                tenantId,
                filters: {
                    mobileNumber: mobileNumber,
                    acknowledgementIds: formData.applicationNo,
                    // No status filter - get all statuses
                },
            });

            const properties = response?.Properties || [];
            console.log("Search results:", properties);
            setSearchResults(properties);
            setCurrentPage(1); // Reset to first page on new search
            
            if (properties.length === 0 && setShowToast) {
                setShowToast({ 
                    warning: true, 
                    label: "No properties found for this application number" 
                });
            }
        } catch (error) {
            console.error('Search error:', error);
            if (setShowToast) {
                setShowToast({ 
                    error: true, 
                    label: "Error searching for properties" 
                });
            }
        } finally {
            setIsSearching(false);
        }
    };

    const handleInputChange = (value) => {
        setFormData({ applicationNo: value });
    };

    // Show table if we have search results or initial data
    const showTable = !isSearching && (searchResults !== null || allUserProperties.length > 0);
    const displayData = searchResults !== null ? searchResults : allUserProperties;
    
    // Pagination calculations
    const totalPages = Math.ceil(displayData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = displayData.slice(startIndex, endIndex);
    
    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

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
                    border: 1px solid #F7F7F7;
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
                        <h2>Track Application</h2>
                    </div>

                    <div className="search-form">
                        <div className="form-field">
                            <label className="form-label">Application Number</label>
                            <input
                                className="form-input"
                                type="text"
                                value={formData.applicationNo}
                                onChange={(e) => handleInputChange(e.target.value)}
                                placeholder="Application number"
                            />
                        </div>

                        <div className="button-group">
                            <button
                                type="button"
                                className="btn-clear"
                                onClick={handleReset}
                                disabled={isSearching}
                            >
                                Clear
                            </button>
                            <button
                                type="button"
                                className="btn-search"
                                disabled={isSearching}
                                onClick={handleSubmit}
                            >
                                {isSearching ? 'Searching...' : 'Search'}
                            </button>
                        </div>
                    </div>

                    <div className="results-section">
                        <h3 className="results-header">
                            Results
                            {!isSearching && displayData.length > 0 && ` (${displayData.length} found)`}
                        </h3>
                        <div className="table-wrapper">
                            <div className="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Application Number</th>
                                            <th>Property ID</th>
                                            <th>Address</th>
                                            <th>Owner Name</th>
                                            <th>Father Name</th>
                                            <th>Mobile Number</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isSearching ? (
                                            <tr>
                                                <td colSpan="7" className="loading">
                                                    Searching...
                                                </td>
                                            </tr>
                                        ) : currentPageData.length > 0 ? (
                                            currentPageData.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <span className="link">
                                                            <Link to={`/digit-ui/employee/pt/applicationsearch/application-details/${item.propertyId}`}>
                                                                {item.acknowldgementNumber || item.applicationNo || 'N/A'}
                                                            </Link>
                                                        </span>
                                                    </td>
                                                    <td>{item.propertyId || 'N/A'}</td>
                                                    <td>{getAddress(item.address)}</td>
                                                    <td>
                                                        {item.owners ?
                                                            item.owners.map(o => o.name).filter(Boolean).join(", ") :
                                                            'N/A'}
                                                    </td>
                                                    <td>{getFatherName(item)}</td>
                                                    <td>{getOwnerMobile(item)}</td>
                                                    <td>
                                                        <span className={`status-badge status-${(item.status || '').toLowerCase().replace(/\s+/g, '')}`}>
                                                            {getStatusText(t(item.status && `WF_PT_${item.status}`) || item.status)}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="no-results">
                                                    No properties found for your mobile number.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* Pagination Component */}
                            {totalPages > 1 && (
                                <div className="pagination-container">
                                    <button
                                        onClick={handlePreviousPage}
                                        disabled={currentPage === 1}
                                        className="pagination-btn"
                                    >
                                        ◀ Previous
                                    </button>

                                    <span className="pagination-info">
                                        Page {currentPage} of {totalPages}
                                    </span>

                                    <button
                                        onClick={handleNextPage}
                                        disabled={currentPage === totalPages}
                                        className="pagination-btn"
                                    >
                                        Next ▶
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrackApplication;