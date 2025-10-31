import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, Link } from "react-router-dom";
import { Dropdown, TextInput } from "@egovernments/digit-ui-react-components";
// import styles from "../NamantaranApplication/IndexStyle";
import styles from "./IndexStyleee";

const SearchApplication = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showNoDues, setShowNoDues] = useState(false);
    const [disabledPtID, setDisabledPtID] = useState(false);
    const [showNamantarantype, setShowNamantarantype] = useState(false);
    const [propertyIdd, setPropertyIdd] = useState();
    useEffect(() => {
        localStorage.setItem("HandleOwner", "false")
    }, [])


    const stateId = Digit.ULBService.getStateId();
    const { data: AssessmentYearsList, isLoadings } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "AssessmentYear");
    const { data: ReasonForTransferList } = Digit.Hooks.pt.useReasonForTransferMDMS(stateId, "PropertyTax", "ReasonForTransfer");
    const { data: NamantaranTypeList } = Digit.Hooks.pt.useNamantaranTypeMDMS(stateId, "PropertyTax", "NamantaranType");
    console.log("NamantaranTypeList==============", NamantaranTypeList);
    //   console.log("ReasonForTransferList==============",ReasonForTransferList);

    const NamantaranType = (NamantaranTypeList?.PropertyTax?.NamantaranType || []).map((item) => ({
        code: item.code,
        name: item.name,
    }));

    //       const ReasonForTransfer = (ReasonForTransferList?.PropertyTax?.ReasonForTransfer || []).map((item) => ({
    //     code: item.code,
    //     name: item.name, 
    //   }));

    // console.log("Nam==============", NamantaranType);


    const [namantaranPurposeType, setNamantaranPurposeType] = useState()


    const namantaranPurposeTypeChange = (val) => {

        setNamantaranPurposeType(val.code);





    };


    const styles = {
        modalOverlay: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
        },
        modalContent: {
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "8px",
            minWidth: "400px",
        },
        modalHeader: {
            color: "blue",
            fontWeight: "bold",
            fontSize: "18px",
            marginBottom: "1rem",
            textDecoration: "underline",
        },
        buttonRow: {
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
        },
        cancelButton: {
            border: "1px solid red",
            color: "red",
            padding: "8px 16px",
            borderRadius: "4px",
            backgroundColor: "white",
            cursor: "pointer",
        },
        submitButton: {
            backgroundColor: "indigo",
            color: "white",
            padding: "8px 16px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
        },
        checkIcon: {
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "black",
            border: "3px solid green",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 1rem",
            fontSize: "28px",
            color: "white",
        },
        header: {
            fontWeight: "bold",
            fontSize: "18px",
            marginBottom: "8px",
            textAlign: "center",
            color: "#6b133f"
        },
        receiptText: {
            color: "gray",
            fontSize: "14px",
            textAlign: "center"
        },
        homeButton: {
            marginTop: "20px",
            padding: "8px 20px",
            backgroundColor: "#6b133f",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex"
        },
        container: {
            padding: "20px",
            fontFamily: "Arial, sans-serif",
            backgroundColor: "white",
            //   minHeight: "10vh"
        },
        searchSection: {
            padding: "20px",
            marginBottom: "20px",
        },
        searchTitle: {
            color: "#6B133F",
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "15px"
        },
        searchContainer: {
            display: "flex",
            gap: "80px",
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: "10px"
        },
        searchInput: {
            minWidth: "120px",
            backgroundColor: "#F7F7F7",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "14px"
        },
        searchLabel: {
            fontSize: "14px",
            color: "#333",
            marginRight: "10px",
            minWidth: "80px"
        },
        buttonContainer: {
            display: "flex",
            gap: "30px",
            flexWrap: "wrap"
        },
        clearButton: {
            backgroundColor: "#6B133F",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500"
        },
        findButton: {
            backgroundColor: "#6B133F",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500"
        },
        propertiesSection: {
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            overflow: "hidden"
        },
        propertiesTitle: {
            color: "#6B133F",
            fontSize: "24px",
            fontWeight: "600",
            padding: "20px",
            borderBottom: "1px solid #eee",
            margin: 0,
        },
        tableContainer: {
            overflowX: "auto"
        },
        table: {
            width: "100%",
            borderCollapse: "collapse"
        },
        tableHeader: {
            backgroundColor: "#6B133F66",
            color: "black"
        },
        tableHeaderCell: {
            padding: "12px",
            textAlign: "left",
            fontWeight: "bold",
            fontSize: "14px"
        },
        tableRow: {
            borderBottom: "1px solid #eee"
        },
        tableRowEven: {
            backgroundColor: "#f9f9f9"
        },
        tableCell: {
            padding: "12px",
            fontSize: "14px",
            verticalAlign: "top"
        },
        actionButtonsContainer: {
            display: "flex",
            flexDirection: "column",
            gap: "5px"
        },
        actionButton: {
            backgroundColor: "transparent",
            color: "#6B133F",
            border: "1px solid #6B133F",
            padding: "6px 12px",
            borderRadius: "15px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "500",
            whiteSpace: "nowrap",
            transition: "all 0.3s ease"
        },
        receiptButton: {
            backgroundColor: "transparent",
            color: "#6B133F",
            border: "1px solid #6B133F",
            padding: "6px 12px",
            borderRadius: "15px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "500",
            whiteSpace: "nowrap",
            transition: "all 0.3s ease"
        },
        pagination: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
            padding: "20px",
            backgroundColor: "white"
        },
        paginationText: {
            fontSize: "14px",
            color: "#666"
        },
        paginationButton: {
            backgroundColor: "#6B133F",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px"
        },
        paginationButtonDisabled: {
            backgroundColor: "#ccc",
            cursor: "not-allowed"
        },
        noResults: {
            textAlign: "center",
            padding: "40px",
            color: "#666",
            fontSize: "16px"
        }
    };

    const proceedToPay = (property) => {
        history.push(`/digit-ui/citizen/pt/property/previewPayment/${propertyIdd}`, { tenantId });
    };
    const handleClear = () => {
setPropertyIdd();
        const propertyIdInput = document.getElementById("propertyIdInput");

    };

    const handleSearch = () => {
        const propertyIdInput = document.getElementById("propertyIdInput");

        const inputValue = propertyIdInput ? propertyIdInput.value : "";
        setPropertyIdd(inputValue);
        // setShowConfirmation(true);
        console.log("inputValue===", inputValue)

    };
    const handleSearch2 = () => {
        setShowNoDues(false);
        setShowNamantarantype(true);
        // history.push(`/digit-ui/citizen/pt/namantaran/application`);
    };

    const applicationSeatch = () => {
        history.push(`/digit-ui/citizen/pt/namantaran/application/${propertyIdd}`);
    }


    const fetchBill = async (propertyIdd) => {
        console.log("PROertyID==", propertyIdd)
        if (!propertyIdd) return;

        try {
            const billResponse = await Digit.PTService.fetchPaymentDetails({
                tenantId,
                consumerCodes: propertyIdd,
            });

            const BillList = billResponse?.Bill || [];
            if (!BillList.length) {
                setShowConfirmation(false);
                setShowNoDues(true);
                setDisabledPtID(true);
                // alert("❌ This bill has already been paid or is not valid.");
                // setBillFetch(null);
                return;
            }
            setShowConfirmation(true);
            //   setBillFopayment(billResponse); // set fresh bill
            //   setBillFetch(BillList[0]); // set fresh bill
        } catch (err) {
            setShowConfirmation(false);

            // console.error("Error fetching bill:", err);
        }
    };

    return (
        <div>

            <style>{`
        * {
          box-sizing: border-box;
        }
        
        .search-container {
          // max-width: 1400px;
          // margin: 0 auto;
          // background-color: #000;
        }
        
        .page-content-wrapper {
          background: white;
           border-top-left-radius: 8px;
  border-top-right-radius: 8px;
          // border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          padding: 20px;
        }
        
        @media (max-width: 639px) {
          .page-content-wrapper {
            padding: 20px;
          }
        }
        
        .header-section {
          margin-bottom: 30px;
        }
        
        .main-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 20px;
          color: #6b133f;
          margin: 0 0 20px 0;
          padding-bottom: 10px;
        }
        
        .assessment-section {
          margin-bottom: 30px;
        }
        
        .assessment-grid {
          display: grid;
          gap: 20px;
          margin-bottom: 30px;
        }
        
        @media (min-width: 640px) {
          .assessment-grid {
            grid-template-columns: 300px;
          }
        }
        
        .section-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: 16px;
          color: #6b133f;
          margin: 30px 0 20px 0;
          padding: 10px;
          background: #f8f8f8;
          border-left: 4px solid #6b133f;
        }
        
        .form-grid {
          display: grid;
          gap: 24px;
          width: 100%;
        }
        
        @media (min-width: 1024px) {
          .form-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        
        @media (min-width: 640px) and (max-width: 1023px) {
          .form-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        
        @media (max-width: 639px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .form-field {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        
        .form-label {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 14px;
          color: #282828;
          margin-bottom: 8px;
          display: block;
        }
        
        .form-input {
          width: 100%;
          height: 40px;
          padding: 0 12px;
          // border: 1px solid #d6d5d4;
          border-radius: 4px;
          font-size: 14px;
          font-family: 'Poppins', sans-serif;
          transition: all 0.3s ease;
             background:rgba(210, 210, 210, 0.5);
          // background:rgb(241, 241, 241);        }
        
        .form-input:focus {
          outline: none;
          // border-color: #6b133f;
          // box-shadow: 0 0 0 3px rgba(107, 19, 63, 0.1);
        }
        
        .form-input::placeholder {
          color: #999;
        }
        
        .form-input:disabled {
          background:rgb(212, 212, 212);
          cursor: not-allowed;
        }
        
        .mobile-input-wrapper {
          display: flex;
          width: 100%;
        }
        
        .mobile-prefix {
          display: flex;
          align-items: center;
          padding: 0 12px;
          // background: #f0f0f0;
             background:rgba(210, 210, 210, 0.5);
          border: 1px solid #d6d5d4;
          border-right: none;
          border-radius: 6px 0 0 6px;
          font-size: 14px;
          color: #666;
          white-space: nowrap;
          font-family: 'Poppins', sans-serif;
        }
        
        .mobile-input {
          flex: 1;
          border-radius: 0 6px 6px 0 !important;
          min-width: 0;
        }
        
        .button-container {
          display: flex;
          justify-content: flex-end;
          gap: 16px;
          padding-top: 8%;
        }

          @media (max-width: 1232px) {
          .button-container {
             display: flex;
             justify-content: flex-end;
             gap: 16px;
             padding-top: 10%;
          }
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
          min-width: 134px;
          height: 45px;
          padding: 0 24px;
          border-radius: 19px;
          color: #fff;
          background: #6b133f;
          font-size: 15px;
          font-weight: 500;
          font-family: 'Poppins', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .btn-clear:hover {
          background: #6b133f;
          transform: translateY(-1px);
        }
        
        .btn-search {
          min-width: 134px;
          height: 45px;
          padding: 0 24px;
          border-radius: 19px;
          border: none;
          color: white;
          background: #6b133f;
          font-size: 15px;
          font-weight: 500;
          font-family: 'Poppins', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          
        }
        
        .btn-search:hover {
          background: #6b133f;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(107, 19, 63, 0.3);
        }
        
        .error-message {
          color: #d00000;
          font-size: 12px;
          margin-top: 4px;
          font-family: 'Poppins', sans-serif;
        }
        
        .submitted-data-section {
          margin-top: 30px;
          padding: 20px;
          background: #f0f8ff;
          border: 1px solid #6b133f;
          border-radius: 8px;
          animation: slideIn 0.3s ease-out;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .submitted-data-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 16px;
          color: #6b133f;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .submitted-data-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
        }
        
        .submitted-data-item {
          padding: 10px;
          background: white;
          border-radius: 6px;
          border-left: 3px solid #6b133f;
        }
        
        .submitted-data-label {
          font-family: 'Poppins', sans-serif;
          font-size: 12px;
          color: #666;
          margin-bottom: 4px;
        }
        
        .submitted-data-value {
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          color: #282828;
          font-weight: 500;
        }
        
        .submitted-data-empty {
          color: #999;
          font-style: italic;
        }
        
        @media (max-width: 768px) {
          .main-title {
            font-size: 18px;
          }
          
          .section-title {
            font-size: 14px;
          }
          
          .submitted-data-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

            {showConfirmation && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        {/* <div style={styles.checkIcon}>✓</div> */}
                        <div style={styles.header}>Pending Dues For Property Tax</div>
                        {/* <div style={styles.receiptText}>
                Receipt Number
                <br />
               
              </div> */}
                        {/* <div style={styles.receiptText}>
                Total Amount Received
                <br />
          
              </div> */}
                        {/* <button style={styles.homeButton}>
                Download Receipt
              </button> */}
                        <button style={styles.homeButton} onClick={() => {
                            // window.location.href = "/digit-ui/employee";
                            proceedToPay(propertyIdd);

                        }}>
                            Pay
                        </button>
                    </div>
                </div>)}

            {showNoDues && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>

                        <div style={styles.header}>No Dues Pending</div>

                        <button style={styles.homeButton} onClick={() => {

                            handleSearch2();

                        }}>
                            Proceed
                        </button>
                    </div>
                </div>)}



            {/* <div style={containerStyle}>
                <h4 style={headingStyle}>{t("SEARCH_PROPERTY")}</h4>
                <div style={rowStyle}>




                    <div style={inputGroupWrapper}>

                        <div>
                            <label style={labelStyle}>
                                {t("PROPERTY_ID")} <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                type="text"
                                id="propertyIdInput"
                                placeholder={t("Enter Property ID")}
                                style={inputStyle}
                                disabled={disabledPtID}
                            />
                        </div>
                    </div>


                    {showNamantarantype ?

                        <div style={inputGroupWrapper}>

                            <div>
                                <label style={labelStyle}>
                                    {t("Select Namantaran Type")} <span style={{ color: "red" }}>*</span>
                                </label>
                                <Dropdown
                                    t={t}
                                    option={NamantaranTypeList}

                                    select={namantaranPurposeTypeChange}
                                    placeholder={t("Select")}


                                    optionKey="name"
                                    // style={styles.widthInput}
                                    style={{
                                        ...styles.widthInput,
                                        border: "1px solid #ccc",
                                        borderRadius: "8px",
                                        padding: "6px 10px",
                                    }}

                                />
                            </div>
                        </div>
                        :
                        <div></div>}





                 

                    <div style={buttonGroupStyle}>
                        <button onClick={handleClear} style={clearButtonStyle}>
                            {t("CITIZEN_CLEAR_BUTTON")}
                        </button>

                        {!showNamantarantype ?
                            <button
                                onClick={() => {
                                    const propertyId = document.getElementById("propertyIdInput").value;
                                    handleSearch();
                                    fetchBill(propertyId);
                                }
                                }
                                style={findButtonStyle}
                            >
                                {t("CITIZEN_FIND_BUTTON")}
                            </button>
                            : <div></div>}
                    </div>

                    {showNamantarantype ?
                        <div style={buttonGroupStyle}>

                            <button
                                onClick={() => {
                                    const propertyId = document.getElementById("propertyIdInput").value;
                                    applicationSeatch();
                                }
                                }
                                style={findButtonStyle}
                            >
                                {t("Confirm")}
                            </button>
                        </div> :
                        <div></div>
                    }

                </div>
            </div> */}


            <div className="search-container">
                <div className="page-content-wrapper">
                    <div className="header-section">
                        <h1 className="main-title">{t("SEARCH_PROPERTY")}</h1>
                    </div>

                    <div>
                        <div className="form-grid">


                            {/* Property ID */}
                            <div className="form-field">
                                <label className="form-label">   {t("PROPERTY_ID")} <span style={{ color: "red" }}>*</span></label>
                                <input
                                    className="form-input"
                                    type="text"
                                    id="propertyIdInput"
                                    placeholder={t("Enter Property ID")}
                                    style={inputStyle}
                                    disabled={disabledPtID}

                                />
                            </div>

                            {/* Old Property ID */}
                            {/* <div className="form-field">
                                <label className="form-label">Old Property ID</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    placeholder="Enter old property ID"
                                  {...register("oldPropertyId")}
                                  onChange={(e) => {
                                    setValue("oldPropertyId", e.target.value);
                                  }}
                                />
                            </div> */}


                            {showNamantarantype ?

                                <div className="form-field">
                                    <label className="form-label">  {t("Select Namantaran Type")} <span style={{ color: "red" }}>*</span></label>

                                    <Dropdown
                                        // style={styles.widthInput}
                                        className="form-input"
                                        t={t}
                                        option={NamantaranTypeList}

                                        select={namantaranPurposeTypeChange}
                                        placeholder={t("Select")}


                                        optionKey="name"
                                    />


                                </div>
                                :
                                <div></div>}






                            <div className="form-field">
                                <div className="button-container">
                                    <button
                                        type="button"
                                        className="btn-clear"
                                        onClick={handleClear}

                                    >
                                        {t("CITIZEN_CLEAR_BUTTON")}
                                    </button>

                                    {!showNamantarantype ?


                                        <button
                                            type="button"
                                            className="btn-search"
                                            onClick={() => {
                                                const propertyId = document.getElementById("propertyIdInput").value;
                                                handleSearch();
                                                fetchBill(propertyId);
                                            }
                                            }

                                        >
                                            {t("CITIZEN_FIND_BUTTON")}
                                        </button>
                                        : <div></div>}

                                    {showNamantarantype ?
                                       


                                            <button
                                                type="button"
                                                className="btn-search"
                                                onClick={() => {
                                                    const propertyId = document.getElementById("propertyIdInput").value;
                                                    applicationSeatch();
                                                }
                                                }

                                            >
                                                {t("Confirm")}
                                            </button>
                                         :
                                        <div></div>
                                    }





                                </div>


                            </div>


                            <div className="form-field"></div>


                        </div>


                    </div>

                </div>
            </div>



        </div>

    )
}
export default SearchApplication;

const containerStyle = {
    background: "#fff",
    borderRadius: "10px",
    padding: "20px 30px",
    maxWidth: "1000px",
    fontFamily: "sans-serif",
};

const headingStyle = {
    margin: "0 0 24px 0",
    fontFamily: "Barlow, sans-serif",
    fontWeight: 600,
    fontSize: "20px",
    color: "#6B133F",
};

const rowStyle = {
    display: "flex",
    alignItems: "flex-end",
    gap: "10px",
    flexWrap: "wrap",
};

const inputGroupWrapper = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
};

const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontFamily: "Noto Sans, sans-serif",
    fontWeight: 400,
    fontSize: "14px",
    color: "#505050",
};

const inputStyle = {
    width: "300px",
    padding: "10px 14px",
    borderRadius: "4px",
    border: "1px solid #D6D5D4",
    backgroundColor: "#F7F7F7",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.2s",
};

const orStyle = {
    fontWeight: "bold",
    color: "#555",
};

const buttonGroupStyle = {
    display: "flex",
    gap: "12px",
    marginTop: "20px",
};

const baseButtonStyle = {
    padding: "8px 32px",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s",
    border: "none",
    minWidth: "80px",
};

const clearButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: "#6B133F",
    color: "#fff",
};

const findButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: "#6B133F",
    color: "#fff",
};

const paymentSectionStyle = {
    marginTop: "32px",
    padding: "0 20px"
};

const paymentHeadingStyle = {
    margin: "0 0 16px 0",
    fontFamily: "Barlow, sans-serif",
    fontWeight: 600,
    fontSize: "18px",
    color: "#000",
};

const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    overflow: "hidden",
};

const thStyle = {
    backgroundColor: "#E8D4DE",
    padding: "12px 16px",
    textAlign: "left",
    fontWeight: 500,
    fontSize: "14px",
    color: "#505050",
    borderBottom: "1px solid #E0E0E0",
};

const tdStyle = {
    padding: "12px 16px",
    fontSize: "14px",
    color: "#333",
    borderBottom: "1px solid #F0F0F0",
};

const payButtonStyle = {
    backgroundColor: "#fff",
    border: "1px solid #6B133F",
    color: "#6B133F",
    padding: "6px 24px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
    transition: "all 0.2s",
};

const noResultsStyle = {
    padding: "32px",
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: "8px",
    color: "#666",
};

// Pagination styles
const paginationContainer = {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px"
};

const paginationInfo = {
    color: "#666",
    fontSize: "14px",
};

const paginationControls = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
};

const paginationButton = {
    padding: "6px 12px",
    border: "1px solid #D6D5D4",
    backgroundColor: "#fff",
    color: "#333",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s",
    minWidth: "32px",
};

const activePageButton = {
    backgroundColor: "#6B133F",
    color: "#fff",
    borderColor: "#6B133F",
};

const disabledButtonStyle = {
    opacity: 0.5,
    cursor: "not-allowed",
    backgroundColor: "#f5f5f5",
};

const paginationDots = {
    padding: "0 8px",
    color: "#666",
};