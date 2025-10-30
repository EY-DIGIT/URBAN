import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
const FetchDataSection = ({
    setShowToast,
    styles,
    updatePropertExist,
    handlePropdata,
    closeToast,
    generalDetails
}) => {
    let optionFirst = []
    optionFirst.push(
        {
            code: "PAY_BY_OWNER",
            i18nKey: "PT_PAY_BY_OWNER",
            name: "I am making the payment as the owner/ consumer of the service",
        },
        {
            code: "PT_PAY_BEHALF_OWNER",
            i18nKey: "PT_PAY_BEHALF_OWNER",
            name: "I am making the payment as the owner/ consumer of the service",
        }
    )
    const { data: storeData } = Digit.Hooks.useStore.getInitData();
    const [formData, setFormData] = useState({
        propertyId: '',
    });
    const optionSecound = {
        code: "PAY_BEHALF_OWNER",
        i18nKey: "PT_PAY_BEHALF_OWNER",
        name: "I am making the payment on behalf of the owner/ consumer of the service",
    };
    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };
    const [propertyWithId, setPropertyId] = useState("Yes");
    let userInfo1 = JSON.parse(localStorage.getItem("user-info"));
    const tenantId = userInfo1?.tenantId;
//   useEffect(() => {
//   if (generalDetails && formData.propertyId !== generalDetails.propertyId) {
//     handleInputChange("propertyId", generalDetails.propertyId);
//   }
// }, [generalDetails, formData.propertyId]);
    return (
        <div style={{ marginBottom: "20px" }}>
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
                    width: 30%;
                    height: 30px;
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
                        width: 25%;
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
                    min-width: 50px;
                    height: 30px;
                    padding: 0 24 0 25px;
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

            <div style={{ display: "flex" }}>

                <div style={styles.checkboxMargin}>

                    <div style={{ marginTop: "20px", display: "flex", gap: "20px", alignItems: "center" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <input
                                type="radio"
                                name="propertyWithId"
                                checked={propertyWithId === "Yes"}
                                onChange={() => 
                                {
                                    updatePropertExist("Yes");
                                     setPropertyId("Yes")
                                }
                                   

                                }
                            />
                            <span style={styles.label}>Property ID</span>
                        </label>
                        <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <input
                                type="radio"
                                name="propertyWithId"
                                checked={propertyWithId === "No"}
                                onChange={() =>
                                {
                                     {
                                    updatePropertExist("No");
                                     setPropertyId("No")
                                }
                                   
                                }
                                    }
                            />
                            <span style={styles.label}>Without Property ID</span>
                        </label>
                    </div>

                </div>



            </div>
            <div className="form-section" style={styles.formSection}>
                <div style={styles.flex302}>
                    <input
                        className="form-input"
                        type="text"
                        disabled={propertyWithId === "Yes" ? false : true}
                        placeholder="Enter property ID"
                        //value={formData.propertyId} 
                        onChange={(e) => handleInputChange('propertyId', e.target.value)}
                    />
                    <div style={{ display: "contents" }}></div>
                    <button
                        type="button"
                        className="btn-search"
                        onClick={() => {
                            console.log("Search button clicked");
                            if(formData.propertyId === ""){                               
                                 setShowToast({ warning: true, label: "Please enter Property ID" });
                                 //setTimeout(closeToast, 4000);
                                return;
                            }
                            else{
                            formData.propertyId  &&
                            handlePropdata(formData.propertyId)
                            }
                            
                        }}
                    >
                        Go
                    </button>
                    <div style={{ display: "contents" , width:"250px"}}>
<span className="link" style={{ paddingLeft: "25px" }}>
                        <Link to={`/digit-ui/employee/`}>
                          {"WS_APPLY_NEW_PROPERTY"}
                        </Link>
                        {/* {item.acknowldgementNumber || item.applicationNo} */}
                      </span>
                      </div>
                </div>
            </div>
        </div>
    );
};

export default FetchDataSection;
