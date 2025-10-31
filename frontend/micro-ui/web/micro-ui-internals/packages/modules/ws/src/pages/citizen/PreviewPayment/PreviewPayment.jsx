import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Loader,Toast } from "@egovernments/digit-ui-react-components";
import { stringReplaceAll } from "./utils";
import * as func from "../../../utils";
const styles = {
    container: {
        // padding: "20px",
        // fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        maxWidth: "1200px",
        // margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
        '@media (maxWidth: 768px)': {
            padding: "10px"
        },
        '@media (maxWidth: 630px)': {
            padding: "8px"
        }
    },
    row: {
        display: "flex",
        flexWrap: "wrap",
        marginBottom: "16px",
        gap: "16px",
        width: "100%",
        boxSizing: "border-box",
        '@media (maxWidth: 768px)': {
            flexDirection: "column",
            gap: "12px"
        },
        '@media (maxWidth: 630px)': {
            gap: "8px",
            marginBottom: "12px"
        }
    },
    field: {
        display: "flex",
        flexDirection: "column",
        flex: "1",
        minWidth: "280px",
        width: "100%",
        boxSizing: "border-box",
        '@media (maxWidth: 768px)': {
            minWidth: "100%"
        },
        '@media (maxWidth: 630px)': {
            minWidth: "auto",
            width: "100%"
        }
    },
    flex30: {
        flex: "1 1 30%",
        display: "flex",
        flexDirection: "column",
        flex30: {
            flex: "1 1 30%",
            display: "flex",
            flexDirection: "column",

            position: "relative",
            minHeight: "90px",

        },
    },
    input: {
        height: "35px",
        border: "0.5px solid #F7F7F7",
        borderRadius: "4px",
        padding: "6px 10px",
        fontSize: "14px",
        width: "100%",
        boxSizing: "border-box",
        maxWidth: "100%",
        backgroundColor: "#F2F2F2",
        '@media (maxWidth: 630px)': {
            padding: "8px",
            fontSize: "13px",
            height: "40px"
        }
    },
    label: {

        // fontFamily: 'Poppins, sans-serif',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '22px',
        letterSpacing: '0',
        color: '#282828',
        width: "200px",
        marginBottom: "4px",
        wordWrap: "break-word",
        '@media (maxWidth: 768px)': {
            fontSize: "13px"
        },
        '@media (maxWidth: 630px)': {
            fontSize: "12px",
            lineHeight: "18px"
        }
    },
    sectionHeader: {

        // fontFamily: "Poppins",
        fontWeight: "bold",
        fontSize: "16px",
        lineHeight: "100%",
        color: "#6b133f",
        marginBottom: "16px",
        marginTop: "20px",
        '@media (maxWidth: 768px)': {
            fontSize: "15px",
            marginTop: "16px",
            marginBottom: "12px"
        }
    },
    sectionHeaderDemand: {
        // fontFamily: "Poppins",
        fontWeight: "bold",
        fontSize: "22px",
        lineHeight: "100%",
        color: "#6b133f",
        marginBottom: "20px",
        '@media (maxWidth: 768px)': {
            fontSize: "18px",
            marginBottom: "16px"
        }
    },
    tableContainer: {
        width: "100%",
        overflowX: "auto",
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        '@media (maxWidth: 768px)': {
            fontSize: "11px"
        }
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        minWidth: "800px",
        '@media (maxWidth: 768px)': {
            minWidth: "600px"
        }
    },
    th: {
        border: "1px solid #ccc",
        padding: "8px 4px",
        // backgroundColor: "#B9B9B9",
         backgroundColor:"rgba(107, 19, 63, 0.2)",
        // border:"1px,0px,0px,1px #B9B9B9",
        textAlign: "center",
        // fontFamily: "Inter",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "130%",
        color: "black",
        whiteSpace: "nowrap",
        '@media (maxWidth: 768px)': {
            padding: "6px 3px",
            fontSize: "10px"
        }
    },
    td: {
        border: "1px solid #ccc",
        // border:"1px,0px,0px,1px #B9B9B9",
        padding: "8px 4px",
        textAlign: "center",
        // fontFamily: "Inter",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "130%",
        color: "#000000",
        whiteSpace: "nowrap",
        '@media (maxWidth: 768px)': {
            padding: "6px 3px",
            fontSize: "10px"
        }
    },
    downloadBtn: {
        padding: "6px 12px",
        background: "white",
        border: "1px solid #6b133f",
        borderRadius: "12px",
        cursor: "pointer",
        // fontFamily: "Poppins",
        fontWeight: 400,
        fontSize: "12px",
        color: "#6b133f",
        boxSizing: "border-box",
        '@media (maxWidth: 768px)': {
            width: "100%",
            fontSize: "11px"
        },
        '@media (maxWidth: 630px)': {
            padding: "8px 12px",
            fontSize: "10px"
        }
    },
    cardD: {
        backgroundColor: "rgba(255, 255, 255, var(--bg-opacity))",
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.16)",
        padding: "16px",
        marginBottom: "22px",
        borderRadius: "12px",
        width: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
        '@media (maxWidth: 768px)': {
            padding: "12px",
            marginBottom: "16px"
        },
        '@media (maxWidth: 630px)': {
            padding: "8px",
            marginBottom: "12px",
            borderRadius: "8px"
        }
    },
    buttonContainer: {
        display: "flex",
        gap: "12px",
        // marginLeft: "auto",
        justifyContent: "flex-end",
        marginTop: "20px",
        '@media (maxWidth: 768px)': {
            flexDirection: "column",
            marginLeft: "0",
            gap: "8px"
        }
    },
    confirmBtn: {
        padding: "10px 30px",
        backgroundColor: "#6b133f",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        // fontFamily: "Poppins",
        fontWeight: 500,
        fontSize: "14px",
        height: "35px",
        whiteSpace: "nowrap",
        '@media (maxWidth: 768px)': {
            padding: "12px 20px",
            fontSize: "13px",
            width: "100%"
        }
    },
    bottomText: {
        color: "red",
        fontSize: "12px",
        marginTop: "8px",
        '@media (maxWidth: 768px)': {
            fontSize: "11px"
        }
    },
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "20px",
        boxSizing: "border-box"

    },
    modalContent: {
        background: "#fff",
        borderRadius: "12px",
        padding: "32px",
        textAlign: "center",
        width: "50%",
        maxWidth: "60%",         // keeps it small on large screens
        minWidth: "300px",         // avoids too small shrink
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "40px",               // uniform gap between text & buttons
        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",

        '@media (maxWidth: 1024px)': {
            width: "70%",
            padding: "28px",
            gap: "30px",
        },
        '@media (maxWidth: 768px)': {
            width: "90%",
            padding: "20px",
            gap: "24px",
        },
        '@media (maxWidth: 480px)': {
            width: "95%",
            padding: "16px",
            gap: "20px",
        }
    },

    modalButtonContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "16px",
        flexWrap: "wrap",       // buttons wrap on very small screens
    },
    modalButton: {
        padding: "10px 20px",
        borderRadius: "40px",
        border: "none",
        background: "#6b133f",
        color: "#fff",
        fontSize: "14px",
        cursor: "pointer",
        fontSize: "14px",
        '@media (maxWidth: 768px)': {
            padding: "12px 20px",
            fontSize: "13px",
            width: "100%"
        }
    },

    flexend: {
        display: "flex",
        justifyContent: "end",

    }
};
const PaymentForm = ({ paymentRules, businessService = "WS" }) => {
    // const PaymentForm = () => {
    const { t } = useTranslation();
     const [showToast, setShowToast] = useState(null);
    const history = useHistory();
    const { state, pathname, search } = useLocation();
    const userInfo = Digit.UserService.getUser();
    const mobileNumber = userInfo?.info?.mobileNumber;
    const name = userInfo?.info?.name;
    const tenantId = Digit.ULBService.getCurrentTenantId();
     let filters = func.getQueryStringParams(location.search);
      let  consumerCode = filters?.consumerCode;
    // { consumerCode } = useParams();
    const { workflow: wrkflow, tenantId: _tenantId, authorization, ConsumerName } = Digit.Hooks.useQueryParams();
   

    // State management
    const [bill, setBill] = useState(state?.bill);
    const [waterDetails, setPropertyDetails] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    // const tenantId = state?.tenantId || _tenantId || Digit.UserService.getUser().info?.tenantId;
    // const propertyId = state?.propertyId;

    if (wrkflow === "WNS" && consumerCode.includes("?")) {
        consumerCode = consumerCode.substring(0, consumerCode.indexOf("?"));
    }

    // Fetch payment data
    const { data, isLoading } = state?.bill
        ? { isLoading: false }
        : Digit.Hooks.useFetchPayment({
            tenantId,
            businessService,
            consumerCode: wrkflow === "WNS" ? stringReplaceAll(consumerCode, "+", "/") : consumerCode,
        });

    // Fetch FSM data if needed
    const {
        isLoading: isFSMLoading,
        data: application,
    } = Digit.Hooks.fsm.useApplicationDetail(t, tenantId, consumerCode, { enabled: pathname.includes("FSM") }, "CITIZEN");

    // let { minAmountPayable, isAdvanceAllowed } = paymentRules;
    // minAmountPayable = wrkflow === "WNS" ? 100 : minAmountPayable;

    // Calculate bill details
    const billDetails = bill?.billDetails?.sort((a, b) => b.fromPeriod - a.fromPeriod)?.[0] || {};
    const billAccountDetails = bill?.billDetails?.[0]?.billAccountDetails || [];
    const Arrears = bill?.billDetails?.sort((a, b) => b.fromPeriod - a.fromPeriod)?.reduce((total, current, index) => (index === 0 ? total : total + current.amount), 0) || 0;

    const getTotal = () => bill?.totalAmount || 0;
    const closeToast = () => {
    setShowToast(null);
  };

    // Utility function to mask Aadhaar
    const maskAadhaar = (aadhaar) => {
        if (!aadhaar) return "";
        const clean = aadhaar.replace(/\D/g, '');
        const last4 = clean.slice(-4);
        return 'xxxxxxxx' + last4;
    };

    // Fetch water details
    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await Digit.WSService.WSWatersearch({
                    tenantId,
                    filters: {
                        applicationNo: consumerCode,
                        mobileNumber:mobileNumber,
                        status: "Active",
                    },
                });
                const WaterConnection = response?.WaterConnection?.[0];
                console.log("property", WaterConnection);
                setPropertyDetails(WaterConnection || null);
            } catch (err) {
                console.error("Error fetching WaterConnection details:", err);
            }
        };

        if (consumerCode) {
            fetchProperty();
        }
    }, [tenantId, consumerCode]);

    // Set bill data when fetched
    useEffect(() => {
        if (!bill && data) {
            let requiredBill = data.Bill.filter((e) => e.consumerCode == (wrkflow === "WNS" ? stringReplaceAll(consumerCode, "+", "/") : consumerCode))[0];
            setBill(requiredBill);
        }
    }, [data]);

    // Handle form submission
    const onSubmit = async () => {
        setIsSubmitting(true);
        const paymentAmount = getTotal()
        const filterData = {
            Transaction: {
                tenantId: billDetails?.tenantId,
                txnAmount: paymentAmount || billDetails.totalAmount,
                module: businessService,
                billId: bill.id,
                consumerCode: consumerCode,
                productInfo: "Common Payment",
                gateway: "EASEBUZZ",
                taxAndPayments: [
                    {
                        billId: bill.id,
                        amountPaid: paymentAmount || billDetails.totalAmount,
                    },
                ],
                user: {
                    name: name || userInfo?.info?.name || billDetails?.payerName,
                    mobileNumber: mobileNumber || userInfo?.info?.mobileNumber || billDetails?.mobileNumber,
                    tenantId: billDetails?.tenantId,
                },
                // success
                callbackUrl: window.location.href.includes("mcollect") || wrkflow === "WNS"
                    ? `${window.location.protocol}//${window.location.host}/digit-ui/citizen/payment/success/${businessService}/${wrkflow === "WNS" ? encodeURIComponent(consumerCode) : consumerCode}/${tenantId}?workflow=${wrkflow === "WNS" ? wrkflow : "mcollect"}`
                    : `${window.location.protocol}//${window.location.host}/digit-ui/citizen/payment/success/${businessService}/${wrkflow === "WNS" ? encodeURIComponent(consumerCode) : consumerCode}/${tenantId}`,
                additionalDetails: {
                    isWhatsapp: false,
                },
            },
        };

        try {
            localStorage.setItem("BillPaymentEnabled", "true");
            const data = await Digit.PaymentService.createCitizenReciept(billDetails?.tenantId, filterData);
            const redirectUrl = data?.Transaction?.redirectUrl;
            window.location = redirectUrl;
        } catch (error) {
            let messageToShow = "CS_PAYMENT_UNKNOWN_ERROR_ON_SERVER";
            if (error.response?.data?.Errors?.[0]) {
                const { code, message } = error.response?.data?.Errors?.[0];
                messageToShow = code;
            }
            setShowToast({ warning: true, label: t(messageToShow) });
             setTimeout(closeToast, 10000);
        }

        // try {
        //     const paymentAmount = getTotal();
        //     history.push(`/digit-ui/citizen/payment/collect/${businessService}/${consumerCode}`, {
        //         paymentAmount,
        //         tenantId: billDetails.tenantId,
        //         name: bill?.payerName,
        //         mobileNumber: bill?.mobileNumber,
        //     });
        // } catch (error) {
        //     console.error('Payment navigation error:', error);
        // } finally {
        //     setIsSubmitting(false);
        // }
    };

    // Show loader while data is being fetched
    // if (isLoading || isFSMLoading || !bill || !waterDetails) {
    //     return <Loader />;
    // }
    if (isLoading || !bill) {
        return <Loader />;
    }

    // Extract data for display
    //const consumerCodes = waterDetails?.propertyId;
    const billList = {
        additionalDetails: {           
            guardianName: waterDetails?.connectionHolders?.[0]?.fatherOrHusbandName || "",
            identityType: waterDetails?.connectionHolders?.[0]?.identityType?.identityType || "",
            identityNumber: waterDetails?.connectionHolders?.[0]?.identityType?.identityType || "",
        },
        payerName: waterDetails?.connectionHolders?.[0]?.name || "",
        payerAddress: `${waterDetails?.property?.address?.doorNo || ""}, ${waterDetails?.property?.address?.street || ""}, ${waterDetails?.property?.address?.locality?.name || ""}`,
        mobileNumber: waterDetails?.connectionHolders?.[0]?.mobileNumber || "",
       
    };
    // Responsive styles
    const containerStyle = {
        // maxWidth: '900px',
        // margin: '0 auto',
        padding: window.innerWidth <= 768 ? '16px' : '20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        // backgroundColor: '#f8f9fa',
        minHeight: '100vh'
    };

    const sectionStyle = {
        backgroundColor: '#ffffff',
        color: '#6B133F',
        padding: '16px 20px',
        fontSize: '18px',
        fontWeight: '600',
        marginTop: '20px',
        borderRadius: '8px 8px 0 0',
        margin: '20px 0 0 0',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    };

    const contentStyle = {
        backgroundColor: '#ffffff',
        padding: window.innerWidth <= 768 ? '16px' : '24px',
        borderRadius: '0 0 8px 8px',
        // boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: window.innerWidth <= 768 ? '16px' : '45px',
        marginBottom: '16px'
    };

    const gridStyle2 = {
        display: 'grid',
        gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: window.innerWidth <= 768 ? '16px' : '24px',
        marginBottom: '16px'
    };

    const fieldGroupStyle = {
        display: 'flex',
        flexDirection: 'column'
    };

    const labelStyle = {
        fontSize: '14px',
        fontWeight: '600',
        color: '#333333',
        marginBottom: '8px'
    };

    const inputStyle = {
        padding: '12px 16px',
        border: '1px solid #e0e0e0',
        borderRadius: '6px',
        fontSize: '14px',
        backgroundColor: '#f8f5f7',
        color: '#333333',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    };

    const taxRowStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 0',
        borderBottom: '1px solid #f0f0f0',
        fontSize: '15px'
    };

    const totalRowStyle = {
        ...taxRowStyle,
        fontWeight: '700',
        fontSize: '18px',
        color: '#6B133F',
        borderBottom: 'none',
        paddingTop: '16px',
        marginTop: '8px',
        borderTop: '2px solid #6B133F'
    };

    const buttonStyle = {
        backgroundColor: isSubmitting ? '#6c757d' : '#6B133F',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '14px 32px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: isSubmitting ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '24px auto 0 auto',
        transition: 'all 0.3s ease',
        minWidth: '200px',
        gap: '8px',
        boxShadow: '0 4px 12px rgba(139, 90, 107, 0.3)'
    };

    const renderField = (label, value, required = false) => (
        <div style={fieldGroupStyle}>
            <label style={labelStyle}>
                {label} {required && <span style={{ color: '#dc3545' }}>*</span>}
            </label>
            <input
                type="text"
                value={value || ""}
                readOnly
                style={inputStyle}
            />
        </div>
    );

    return (
        <div style={containerStyle}>
            <div style={sectionStyle}>Consumer Details</div>
            {/* <div style={sectionStyle}>{t("CONSUMERDETAILS")}</div> */}
            <div style={contentStyle}>
 <div style={gridStyle}>
                    {renderField('Owner Name', billList?.payerName, true)}
                    {renderField('Mobile Number', billList?.mobileNumber)}
                    {renderField('Identity Type', (billList?.additionalDetails?.identityType))}
                    {renderField('Identity Number', maskAadhaar(billList?.additionalDetails?.identityNumber))}
                </div>

            </div>
            {/* Tax Details Section */}
            <div style={sectionStyle}>Payment Details</div>
            {/* <div style={sectionStyle}>{t("PAYMENTDETAILS")}</div> */}
            <div style={contentStyle}>
                {/* <div style={gridStyle2}>
                    {renderField(t("ARREAR"), Arrears.toLocaleString(), true)}
                    {renderField(t("Current Year Net Tax"), (billDetails?.amount || 0).toLocaleString(), true)}
                    {renderField(t("Previous Balance"), getAdvanceAmount().toLocaleString(), true)}
                    {renderField(t("TOTALPAYABLEAMOUNT"), getTotal().toLocaleString(), true)}
                </div> */}
<div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    {["Types of Charges", "Amount"].map((h) => (
                                        <th key={h} style={styles.th}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {billAccountDetails && billAccountDetails.map((item) => {
                                    return (

                                        <tr key={item.taxHeadCode}>
                                            <td style={styles.td}>{item.taxHeadCode}</td>
                                            <td style={styles.td}>{item.amount}</td>
                                        </tr>
                                    )
                                }

                                )

                                }
                               <tr>
                                    <td colSpan={1} style={{ ...styles.td, fontWeight: "bold", textAlign: "right" }}>TOTAL</td>

                                    <td style={styles.td}>
                                        ₹ {(billDetails?.amount || 0).toLocaleString()}
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                   

                <button
                    style={buttonStyle}
                    onClick={onSubmit}
                    disabled={isSubmitting || getTotal() === 0}
                    onMouseOver={(e) => !isSubmitting && (e.target.style.backgroundColor = '#991a5a')}
                    onMouseOut={(e) => !isSubmitting && (e.target.style.backgroundColor = '#6B133F')}
                >
                    {isSubmitting && (
                        <div style={{
                            width: '16px',
                            height: '16px',
                            border: '2px solid #ffffff',
                            borderTop: '2px solid transparent',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }} />
                    )}
                    {isSubmitting ? t("PROCESSING") : t("PROCEEDTOPAYMENT")}
                </button>
            </div>
<div>
     {showToast && (
            <Toast
              error={showToast.error}
              warning={showToast.warning}
              label={t(showToast.label)}
              isDleteBtn={"true"}
              onClose={() => {
                setShowToast(null);
              }}
            />
          )}
</div>
            <style>
                {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
            </style>
        </div>
    );
};

export default PaymentForm;