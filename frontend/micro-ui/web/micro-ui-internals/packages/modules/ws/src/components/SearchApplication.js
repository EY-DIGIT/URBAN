import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { Dropdown, TextInput } from "@egovernments/digit-ui-react-components";
import styles from "../pages/employee/NewApplication/IndexStyle"
import PTinboxTable from "./inboxTable";
const WSSearchApplication = ({ tenantId, isLoading, t = (text) => text, onSubmit, data, count, setShowToast }) => {

    const { data: storeData } = Digit.Hooks.useStore.getInitData();
    const { stateInfo } = storeData || {};
    const [boundaryData, setBoundaryData] = useState(null);
    const [zones, setZones] = useState([]);
    const [wards, setWards] = useState([]);
    const [formData, setFormData] = useState({
        applicationNumber: '',
        //  propertyId: '',
        mobileNumber: '',
        status: '',
        zone: "",
        Ward: "",
        applicationType: '',
        toDate: ''
    });
    // Fetch boundary data and extract zones
    useEffect(() => {
        (async () => {
            try {
                const tenantId = Digit.ULBService.getCurrentTenantId();
                const response = await Digit.LocationService.getRevenueLocalities(tenantId);

                console.log("🔍 Raw TenantBoundary Response:", response);

                const cityBoundary = response?.TenantBoundary?.[0]?.boundary?.[0];
                if (cityBoundary?.children?.length > 0) {
                    setBoundaryData(cityBoundary);

                    const zoneOptions = cityBoundary.children.map((zone) => ({
                        code: zone.code,
                        name: zone.name || zone.code,
                    }));
                    setZones(zoneOptions);
                } else {
                    console.warn("❌ No boundary children found.");
                }
            } catch (error) {
                console.error("❌ Error fetching boundary data:", error);
            }
        })();
    }, []);
    // Update Wards when Zone changes
    useEffect(() => {
        if (formData.zone && boundaryData?.children?.length > 0) {
            const selectedZone = boundaryData.children.find((z) => z.code === formData.zone);
            const wardList = selectedZone?.children || [];
            const formattedWards = wardList.map((ward) => ({
                code: ward.code,
                name: ward.name || ward.code,
            }));
            setWards(formattedWards);
        } else {
            setWards([]);
        }
    }, [formData.zone, boundaryData]);


    const [searchResults, setSearchResults] = useState(null);
    const [isSearching, setIsSearching] = useState(false);

    const handleReset = () => {
        setFormData({
            applicationNumber: '',
            propertyId: '',
            mobileNumber: '',
            status: '',
            fromDate: '',
            toDate: ''
        });
        setSearchResults(null);
        if (setShowToast) setShowToast(null);
    };
    const updateWartd = (Type) => {
        if (boundaryData?.children?.length > 0) {
            const selectedZone = boundaryData.children.find((z) => z.code === Type);
            const wardList = selectedZone?.children || [];
            const formattedWards = wardList.map((ward) => ({
                code: ward.code,
                name: ward.name || ward.code,
            }));
            setWards(formattedWards);
        } else {
            setWards([]);
        }
    }
    const handleSubmit = async () => {
        // Check if at least one field is filled
        const hasSearchCriteria = Object.values(formData).some(value => value !== '');

        if (!hasSearchCriteria) {
            alert('Please provide at least one search parameter');
            return;
        }

        console.log('Search submitted:', formData);
        setIsSearching(true);

        // Call the actual onSubmit prop that's passed from parent
        if (onSubmit) {
            // Convert formData to match the expected format
            const searchData = {
                applicationNumber: formData.applicationNo,
                //propertyIds: formData.propertyId,
                mobileNumber: formData.mobileNumber,
                status: formData.status,
                applicationType: formData.applicationType,
                wards: formData.Ward,
                zones: formData.zone,
                // toDate: formData.toDate
            };

            // Call the parent's onSubmit function
            await onSubmit(searchData);
            setIsSearching(false);

            // Store search results if needed
            if (data) {
                setSearchResults(data);
            }
        } else {
            // Fallback for demo purposes
            setTimeout(() => {
                setIsSearching(false);
                // Mock data for demo
                setSearchResults([
                    {
                        applicationNumber: "PT/2024/001",
                        uniqueId: "PROP-12345",
                        ownerName: "John Doe",
                        applicationType: "CREATE",
                        status: "Active"
                    }
                ]);
            }, 1000);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Check if we should show the table
    const showTable = !isLoading && (searchResults !== null || (data && data !== ""));

    return (
        <div style={{ background: "#f5f5f5", minHeight: "100vh" }}>
            <style>{`
                * {
                    box-sizing: border-box;
                }
                
                .main-container {
                    max-width: 1400px;
                    margin: 0 auto;
                }
                
                .page-content-wrapper {
                    background: white;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                
                .search-header {
                    // background: #f8f8f8;
                    padding: 16px 0px;
                    // border-radius: 6px;
                    // margin-bottom: 32px;
                    // border-left: 4px solid #6b133f;
                }
                
                .search-header h2 {
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                    font-weight: 600;
                    font-size: 32px;
                    color: #6b133f;
                    margin: 0;
                }
                
                /* Grid Layout with proper width management */
                .search-grid {
                    display: grid;
                    gap: 24px;
                    margin-bottom: 32px;
                    width: 100%;
                }
                
                /* Desktop: 3 columns with equal width */
                @media (min-width: 1024px) {
                    .search-grid {
                        grid-template-columns: repeat(3, minmax(0, 1fr));
                    }
                }
                
                /* Tablet: 2 columns with equal width */
                @media (min-width: 640px) and (max-width: 1023px) {
                    .search-grid {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }
                }
                
                /* Mobile: 1 column full width */
                @media (max-width: 639px) {
                    .search-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .page-content-wrapper {
                        padding: 20px;
                    }
                }
                
                /* Form field container */
                .form-field {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                }
                
                .form-label {
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                    font-weight: 400;
                    font-size: 14px;
                    color: #282828;
                    margin-bottom: 8px;
                }
                
                /* Input fields with full width */
                .form-input {
                    width: 100%;
                    height: 40px;
                    padding: 0 12px;
                    // border: 0.5px solid #d6d5d4;
                    border-radius: 4px;
                    font-size: 14px;
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                    transition: all 0.3s ease;
                    background: #F7F7F7;
                }
                
                .form-input:focus {
                    outline: none;
                    // border-color: #6b133f;
                    // box-shadow: 0 0 0 3px rgba(107, 19, 63, 0.1);
                }
                
                .form-input::placeholder {
                    color: #999;
                }
                
                /* Mobile number with prefix */
                .mobile-input-wrapper {
                    display: flex;
                    width: 100%;
                }
                
                .mobile-prefix {
                    display: flex;
                    align-items: center;
                    padding: 0 12px;
                    background: #f0f0f0;
                    border: 1px solid #d6d5d4;
                    border-right: none;
                    border-radius: 6px 0 0 6px;
                    font-size: 14px;
                    color: #666;
                    white-space: nowrap;
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                }
                
                .mobile-input {
                    flex: 1;
                    border-radius: 0 6px 6px 0 !important;
                    min-width: 0;
                }
                
                /* Select dropdown styling */
                .form-select {
                    width: 100%;
                    height: 40px;
                    padding: 0 12px;
                    border: 1px solid #F7F7F7;
                    border-radius: 6px;
                    font-size: 14px;
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                    background: #F7F7F7;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .form-select:focus {
                    outline: none;
                    border-color: #6b133f;
                    box-shadow: 0 0 0 3px rgba(107, 19, 63, 0.1);
                }
                
                /* Date input styling */
                input[type="date"] {
                    width: 100%;
                    height: 40px;
                    padding: 0 12px;
                    border: 0.5px solid #F7F7F7;
                    border-radius: 4px;
                    font-size: 14px;
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                    background: #F7F7F7;
                    cursor: pointer;
                }
                
                input[type="date"]::-webkit-calendar-picker-indicator {
                    cursor: pointer;
                    opacity: 0.6;
                }
                
                input[type="date"]::-webkit-calendar-picker-indicator:hover {
                    opacity: 1;
                }
                
                /* Button container */
                .button-container {
                    display: flex;
                    justify-content: flex-end;
                    gap: 16px;
                    margin-top: 32px;
                }
                
                @media (max-width: 639px) {
                    .button-container {
                        flex-direction: column-reverse;
                    }
                    
                    .button-container button {
                        width: 100%;
                    }
                }
                
                .btn-clear {
                    min-width: 134.28px;
                    height: 45px;
                    padding: 0 24px;
                    border-radius: 19px;
                    // border: 2px solid #FF4C51;
                    color: white;
                    background: #6B133F;
                    font-size: 15px;
                    font-weight: 500;
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .btn-clear:hover {
                    // background: #fff5f5;
                    transform: translateY(-1px);
                }
                
                .btn-clear:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                
                .btn-search {
                    min-width: 134.28px;
                    height: 45px;
                    padding: 0 24px;
                    border-radius: 19px;
                    // opacity:0.5;
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
                
                /* Results section */
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
                
                /* Table styling */
                .table-container {
                    overflow-x: auto;
                    border-radius: 8px;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                }
                
                table {
                    width: 100%;
                    border-collapse: collapse;
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                }
                
                thead {
                    // background: rgba(107, 19, 63, 0.3);
                    color: rgba(40, 40, 40, 1);
                }
                
                th {
                    padding: 14px 16px;
                    text-align: left;
                    font-weight: 500;
                    font-size: 14px;
                    white-space: nowrap;
                    background: rgba(107, 19, 63, 0.4);
                }
                
                td {
                    padding: 14px 16px;
                    border-bottom: 1px solid #f0f0f0;
                    font-size: 14px;
                    color: rgba(20, 27, 41, 1);
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
                
                @media (max-width: 768px) {
                    .table-container {
                        margin-left: -20px;
                        margin-right: -20px;
                        border-radius: 0;
                    }
                    
                    th, td {
                        padding: 10px 12px;
                        font-size: 13px;
                    }
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

                 .backGround23 {
     background: rgba(107, 19, 63, 0.3);
     color:black;
}
            `}</style>

            <div className="main-container">
                <div className="page-content-wrapper">
                    <div className="search-header">
                        <h2>Search Application</h2>
                    </div>

                    <div>
                        <div className="search-grid">
                            {/* Application No */}
                            <div className="form-field">
                                <label className="form-label">Application Number</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    value={formData.applicationNo}
                                    onChange={(e) => handleInputChange('applicationNo', e.target.value)}
                                    placeholder="Enter application number"
                                />
                            </div>

                            {/* Application Status */}
                            <div className="form-field">
                                <label className="form-label"> Application Type</label>
                                <select
                                    className="form-select"
                                    value={formData.applicationType}
                                    onChange={(e) => handleInputChange('applicationType', e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="WS">Water</option>
                                    {/* <option value="SW">Inactive</option>
                                    <option value="INWORKFLOW">In Workflow</option> */}
                                </select>
                            </div>
                            {/* Zone No */}
                            <div className="form-field">
                                <label className="form-label">Zone</label>
                                {/* <input
                                    className="form-input"
                                    type="text"
                                    value={formData.Zone}
                                    onChange={(e) => handleInputChange('Zone', e.target.value)}
                                    placeholder="Enter Zone"
                                /> */}
                                <Dropdown
                                    style={styles.widthInput}
                                    t={t}
                                    option={zones}
                                    selected={formData.zone}
                                    select={(option) => {
                                        //   handleDropdownChange("zone", option);                                      
                                        //   handleDropdownChange("ward", null);
                                        updateWartd(option.code)
                                        handleInputChange('zone', option.code)
                                        // setWards([]);
                                    }}
                                    optionKey="name"
                                    placeholder={t("Select")}
                                />
                            </div>
                            {/* Application No */}
                            <div className="form-field">
                                <label className="form-label">Ward</label>
                                {/* <input
                                    className="form-input"
                                    type="text"
                                    value={formData.Ward}
                                    onChange={(e) => handleInputChange('Ward', e.target.value)}
                                    placeholder="Enter Ward"
                                /> */}
                                <Dropdown
                                    style={styles.widthInput}
                                    t={t}
                                    option={wards}
                                    selected={formData.Ward}
                                    select={(option) => {
                                        handleInputChange('Ward', option.code)

                                    }}
                                    optionKey="name"
                                    placeholder={t("Select")}
                                />
                            </div>



                            {/* Property ID */}
                            {/* <div className="form-field">
                                <label className="form-label">Property ID</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    value={formData.propertyId}
                                    onChange={(e) => handleInputChange('propertyId', e.target.value)}
                                    placeholder="Enter property ID"
                                />
                            </div> */}

                            {/* Mobile Number */}
                            {/* <div className="form-field">
                                <label className="form-label"> Mobile Number</label>
                                <div className="mobile-input-wrapper">
                                    <span className="mobile-prefix">+91</span>
                                    <input
                                        className="form-input mobile-input"
                                        type="tel"
                                        pattern="[6-9][0-9]{9}"
                                        maxLength="10"
                                        value={formData.mobileNumber}
                                        onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                                        placeholder="Enter mobile number"
                                    />
                                </div>
                            </div> */}

                            {/* Application Status */}
                            <div className="form-field">
                                <label className="form-label"> Status</label>
                                <select
                                    className="form-select"
                                    value={formData.status}
                                    onChange={(e) => handleInputChange('status', e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="ACTIVE">Active</option>
                                    <option value="INACTIVE">Inactive</option>
                                    <option value="INWORKFLOW">In Workflow</option>
                                </select>
                            </div>

                            {/* From Date */}
                            {/* <div className="form-field">
                                <label className="form-label">From Date</label>
                                <input
                                    className="form-input"
                                    type="date"
                                    value={formData.fromDate}
                                    onChange={(e) => handleInputChange('fromDate', e.target.value)}
                                />
                            </div> */}

                            {/* To Date */}
                            {/* <div className="form-field">
                                <label className="form-label">To Date</label>
                                <input
                                    className="form-input"
                                    type="date"
                                    value={formData.toDate}
                                    onChange={(e) => handleInputChange('toDate', e.target.value)}
                                />
                            </div> */}
                        </div>

                        {/* Buttons */}
                        <div className="button-container">
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
                                {isSearching ? 'Searching...' : 'Find'}
                            </button>
                        </div>
                    </div>

                    {/* Results Section - Shows existing data or search results */}
                    {showTable ? (
                        <div className="results-section">
                            <h6 className="results-header">
                                Results
                                {(searchResults || data) && (searchResults || data).length > 0 &&
                                    ` (${(searchResults || data).length} found)`}
                            </h6>
                            <div className="table-container" style={{ overflowX: "auto" }}>
                                <table>
                                    <thead >
                                        <tr >
                                            <th className="backGround23">Application Number</th>
                                            <th className="backGround23">Name</th>
                                            <th className="backGround23">Address</th>
                                            <th className="backGround23">Ward</th>
                                            <th className="backGround23">Zone</th>
                                            <th className="backGround23">Coloney</th>
                                            <th className="backGround23">Status</th>
                                            <th className="backGround23">Application Type</th>
                                            <th className="backGround23">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isSearching ? (
                                            <tr>
                                                <td colSpan="5" className="loading">
                                                    Searching...
                                                </td>
                                            </tr>
                                        ) : searchResults ? (
                                            // Show search results if available
                                            searchResults.length > 0 ? (
                                                searchResults.map((result, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <span className="link">
                                                                <Link to={`/digit-ui/employee/ws/application-details?applicationNumber=${result.applicationNo}`}>
                                                                    {result.acknowldgementNumber || result.applicationNo}
                                                                </Link>
                                                                {/* {item.acknowldgementNumber || item.applicationNo} */}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {result.owners ?
                                                                result.owners.map(o => o.name).join(", ") :
                                                                result.ownerName}
                                                        </td>
                                                        <td>
                                                            {/* {result.address ?
                                                                result.address.locality.name : 'N/A'} */}
                                                        </td>
                                                        <td>
                                                            {/* {result.address ?
                                                                result.address.ward : 'N/A'} */}
                                                        </td>
                                                        <td> {result.address ?
                                                            result.address.zone : 'N/A'}</td>
                                                        <td> {result.address ?
                                                            result.address.coloney : 'N/A'}</td>
                                                        <td>
                                                            <span className={`status-badge status-${(result.status || '').toLowerCase().replace(/\s+/g, '')}`}>
                                                                {/* {result.status} */}
                                                                {result.applicationStatus}
                                                            </span>
                                                        </td>
                                                        <td> {result.applicationType ?
                                                            result.applicationType : 'N/A'}</td>
                                                        <td>
                                                            <span className="link">
                                                                 <Link to={`/digit-ui/employee/ws/application-details?applicationNumber=${result.applicationNo}`}>
                                                                    <img src={stateInfo?.uiImageAssets?.action_icon} alt="Property" style={{ width: "20px", height: "30px" }} />
                                                                </Link>
                                                                {/* {item.acknowldgementNumber || item.applicationNo} */}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="no-results">
                                                        No results found for your search criteria.
                                                    </td>
                                                </tr>
                                            )
                                        ) : (
                                            // Show initial data from props
                                            data && data.length > 0 ? (
                                                data.map((result, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <span className="link">
                                                                 <Link to={`/digit-ui/employee/ws/application-details?applicationNumber=${result.applicationNo}`}>
                                                                    {result.applicationNo || result.applicationNo}
                                                                </Link>
                                                                {/* {item.acknowldgementNumber || item.applicationNo} */}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {/* {result.owners ?
                                                                result.owners.map(o => o.name).join(", ") :
                                                                result.ownerName} */}
                                                            {result.ConsumerName ?
                                                                result.ConsumerName : 'N/A'}
                                                        </td>
                                                        <td>
                                                            {result.Address ?//Properties[0].address.locality.name
                                                                result.Address : 'N/A'}
                                                        </td>
                                                        <td>
                                                            {result.ward ?
                                                                result.ward : 'N/A'}
                                                        </td>
                                                        <td> {result.zone ?
                                                            result.zone : 'N/A'}</td>
                                                        <td> {result.locality ?
                                                            result.locality : 'N/A'}</td>

                                                        <td>
                                                            <span className={`status-badge status-${(result.status || '').toLowerCase().replace(/\s+/g, '')}`}>
                                                                {/* {result.status} */}
                                                                 {result.applicationStatus}
                                                            </span>
                                                        </td>
                                                        <td> {result.applicationType ?
                                                            result.applicationType : 'N/A'}</td>
                                                        <td>
                                                            <span className="link">
                                                                <Link to={`/digit-ui/employee/ws/application-details?applicationNumber=${result.applicationNo}`}>
                                                                    <img src={stateInfo?.uiImageAssets?.action_icon} alt="Property" style={{ width: "20px", height: "30px" }} />
                                                                </Link>
                                                                {/* {item.acknowldgementNumber || item.applicationNo} */}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="no-results">
                                                        No data available. Please search to find applications.
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) :
                        (
                            <PTinboxTable />
                            // <div></div>



                        )}
                </div>
            </div>
        </div >
    );
}

export default WSSearchApplication;
