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

    const applicationSeatch=()=>{
        history.push(`/digit-ui/citizen/pt/namantaran/application`);
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



            <div style={containerStyle}>
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


                    {showNamantarantype ? <div style={inputGroupWrapper}>

                        <div>
                            <label style={labelStyle}>
                                {t("Select Namantaran Type")} <span style={{ color: "red" }}>*</span>
                            </label>
                            <Dropdown
                                t={t}
                                option={NamantaranTypeList}

                                select={NamantaranTypeList.code}


                                optionKey="name"
                                style={styles.widthInput}

                            />
                        </div>
                    </div>
                        :
                        <div></div>}




              
                        {/* water and garbage id */}
                    {/* <div style={inputGroupWrapper}>

                        <div>
                            <label style={labelStyle}>
                                Water Consumer ID<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                type="text"
                                id="ConsumerIdInput"
                                placeholder={t("Enter Consumer ID")}
                                style={inputStyle}
                            />
                        </div>
                    </div>
                    <div style={inputGroupWrapper}>

                        <div>
                            <label style={labelStyle}>
                                Garbage ID<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                type="text"
                                id="GarbageIdInput"
                                placeholder={t("Enter Garbage ID")}
                                style={inputStyle}
                            />
                        </div>
                    </div> */}

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