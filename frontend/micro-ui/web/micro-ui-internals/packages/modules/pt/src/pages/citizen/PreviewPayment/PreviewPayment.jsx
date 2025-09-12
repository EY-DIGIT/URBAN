import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Loader } from "@egovernments/digit-ui-react-components";
import { stringReplaceAll } from "./utils";

const PaymentForm = ({ paymentRules, businessService = "PT" }) => {
// const PaymentForm = ({ }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const { state, pathname, search } = useLocation();
    const userInfo = Digit.UserService.getUser();
    const mobileNumber = userInfo?.info?.mobileNumber;
    const tenantId = Digit.ULBService.getCurrentTenantId();
    console.log("tenantId", tenantId, mobileNumber);
    let { consumerCode } = useParams();
    const { workflow: wrkflow, tenantId: _tenantId, authorization, ConsumerName } = Digit.Hooks.useQueryParams();
    console.log("consumerCode", consumerCode);

    // State management
    const [bill, setBill] = useState(state?.bill);
    const [propertyDetails, setPropertyDetails] = useState(null);
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

    let { minAmountPayable, isAdvanceAllowed } = paymentRules;
    minAmountPayable = wrkflow === "WNS" ? 100 : minAmountPayable;

    // Calculate bill details
    const billDetails = bill?.billDetails?.sort((a, b) => b.fromPeriod - a.fromPeriod)?.[0] || {};
    const Arrears = bill?.billDetails?.sort((a, b) => b.fromPeriod - a.fromPeriod)?.reduce((total, current, index) => (index === 0 ? total : total + current.amount), 0) || 0;

    const getTotal = () => bill?.totalAmount || 0;
    const getAdvanceAmount = () => application?.pdfData?.advanceAmount || 0;

    const getRebate = () => {
        return billDetails?.billAccountDetails
            ?.filter((item) => item.taxHeadCode?.includes("REBATE"))
            ?.reduce((acc, cur) => acc + cur.amount, 0) || 0;
    };

    // Utility function to mask Aadhaar
    const maskAadhaar = (aadhaar) => {
        if (!aadhaar) return "";
        const clean = aadhaar.replace(/\D/g, '');
        const last4 = clean.slice(-4);
        return 'xxxxxxxx' + last4;
    };

    // Fetch property details
    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await Digit.PTService.search({
                    tenantId,
                    filters: {
                        propertyIds: consumerCode,
                        status: "ACTIVE",
                    },
                });
                const property = response?.Properties?.[0];
                console.log("property", property);
                setPropertyDetails(property || null);
            } catch (err) {
                console.error("Error fetching property details:", err);
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

        try {
            const paymentAmount = getTotal();

            // Navigate to payment processing
            history.push(`/digit-ui/citizen/payment/collect/${businessService}/${consumerCode}`, {
                paymentAmount,
                tenantId: billDetails.tenantId,
                name: bill?.payerName,
                mobileNumber: bill?.mobileNumber,
            });
        } catch (error) {
            console.error('Payment navigation error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Show loader while data is being fetched
    if (isLoading || isFSMLoading || !bill || !propertyDetails) {
        return <Loader />;
    }

    // Extract data for display
    const consumerCodes = propertyDetails?.propertyId;
    const billList = {
        additionalDetails: {
            plotArea: propertyDetails?.landArea || "",
            rateZone: propertyDetails?.units?.[0]?.rateZone || "",
            guardianName: propertyDetails?.owners?.[0]?.fatherOrHusbandName || "",
            aadhaarNumber: propertyDetails?.owners?.[0]?.aadhaarNumber || "",
        },
        payerName: propertyDetails?.owners?.[0]?.name || "",
        payerAddress: `${propertyDetails?.address?.doorNo || ""}, ${propertyDetails?.address?.street || ""}, ${propertyDetails?.address?.locality?.name || ""}`,
    };

    const billDetailList = {
        address: {
            ward: propertyDetails?.address?.ward || "",
            colony: propertyDetails?.address?.locality?.name || "",
            zone: propertyDetails?.address?.zone || "",
        },
    };

    // Responsive styles
    const containerStyle = {
        maxWidth: '900px',
        margin: '0 auto',
        padding: window.innerWidth <= 768 ? '16px' : '20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh'
    };

    const sectionStyle = {
        backgroundColor: '#6B133F',
        color: '#fff',
        padding: '16px 20px',
        fontSize: '18px',
        fontWeight: '600',
        marginTop: '20px',
        borderRadius: '8px 8px 0 0',
        margin: '20px 0 0 0'
    };

    const contentStyle = {
        backgroundColor: '#ffffff',
        padding: window.innerWidth <= 768 ? '16px' : '24px',
        borderRadius: '0 0 8px 8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: window.innerWidth <= 768 ? '16px' : '20px',
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

    const taxSectionStyle = {
        backgroundColor: '#ffffff',
        padding: window.innerWidth <= 768 ? '16px' : '24px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        marginTop: '20px'
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

    const disclaimerStyle = {
        color: '#dc3545',
        fontSize: '12px',
        fontStyle: 'italic',
        marginTop: '16px',
        padding: '12px',
        backgroundColor: '#fff5f5',
        borderLeft: '4px solid #dc3545',
        borderRadius: '4px'
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
            {/* Applicant Details Section */}
            <div style={sectionStyle}>Applicant Details</div>
            <div style={contentStyle}>
                <div style={gridStyle}>
                    {renderField('Property ID', consumerCodes, true)}
                    {renderField('Plot Area (Sq feet)', billList?.additionalDetails?.plotArea, true)}
                    {renderField('Rate Zone', billList?.additionalDetails?.rateZone, true)}
                </div>
            </div>

            {/* Owner Details Section */}
            <div style={sectionStyle}>Owner Details</div>
            <div style={contentStyle}>
                <div style={gridStyle}>
                    {renderField('Owner Name', billList?.payerName, true)}
                    {renderField('Father/Husband Name', billList?.additionalDetails?.guardianName)}
                    {renderField('Aadhaar ID', maskAadhaar(billList?.additionalDetails?.aadhaarNumber))}
                </div>
            </div>

            {/* Property Address Section */}
            <div style={sectionStyle}>Property Address</div>
            <div style={contentStyle}>
                <div style={gridStyle}>
                    {renderField('Address', billList?.payerAddress, true)}
                    {renderField('Ward', billDetailList?.address?.ward, true)}
                    {renderField('Colony', billDetailList?.address?.colony, true)}
                    {renderField('Zone', billDetailList?.address?.zone, true)}
                </div>
            </div>

            {/* Tax Details Section */}
            <div style={sectionStyle}>Tax Details</div>
            <div style={taxSectionStyle}>
                <div style={taxRowStyle}>
                    <span style={{ fontWeight: '500' }}>Arrear</span>
                    <span>₹ {Arrears.toLocaleString()}</span>
                </div>
                <div style={taxRowStyle}>
                    <span style={{ fontWeight: '500' }}>Advance</span>
                    <span>₹ {getAdvanceAmount().toLocaleString()}</span>
                </div>
                <div style={taxRowStyle}>
                    <span style={{ fontWeight: '500' }}>Net Tax</span>
                    <span>₹ {(billDetails?.amount || 0).toLocaleString()}</span>
                </div>
                <div style={taxRowStyle}>
                    <span style={{ fontWeight: '500' }}>Rebate</span>
                    <span>₹ {getRebate().toLocaleString()}</span>
                </div>
                <div style={totalRowStyle}>
                    <span>Total Payable Amount</span>
                    <span>₹ {getTotal().toLocaleString()}</span>
                </div>

                <div style={disclaimerStyle}>
                    *Tax calculation is based on current system data. If there is any
                    difference in the tax calculation, the property owner will have to
                    pay the difference amount later.
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
                    {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
                </button>
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