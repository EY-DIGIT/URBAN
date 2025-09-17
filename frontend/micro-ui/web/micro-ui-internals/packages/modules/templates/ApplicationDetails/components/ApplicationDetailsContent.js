import {
  Card,
  Dropdown,
  Loader,
  SubmitBar
} from "@egovernments/digit-ui-react-components";
import { values } from "lodash";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PropertyDocuments from "./PropertyDocumentCashdesk";
import { useParams, useHistory, useLocation, Redirect } from "react-router-dom";
import TLCaption from "./TLCaption";
import { CollectPayment } from "@egovernments/digit-ui-module-common/src/payments/employee/payment-collect";
import { useQueryClient } from "react-query";


const ApplicationDetailsContent = ({
  applicationDetails,
  workflowDetails,
  isDataLoading,
  applicationData,
  businessService,
  timelineStatusPrefix,
  showTimeLine = true,
  statusAttribute = "status",
  paymentsList,
  oldValue,
  isInfoLabel = false
}) => {
  const [advancePayment, setAdvancePayment] = useState(0);
  const [manualAmount, setManualAmount] = useState("");
  const [selectedModes, setSelectedModes] = useState([]);
  const [estimateData, setEstimateData] = useState("");
  const [remarks, setRemarks] = useState("");
  const [showAmount, setShowAmount] = useState(0);
   const stateId = Digit.ULBService.getStateId();

  const [chequeDetails, setChequeDetails] = useState({
    issueDate: "",
    chequeNumber: "",
    accountHolder: "",
    bankName: "",
  });
  const [posDetails, setPosDetails] = useState({
    referenceNumber: "",
    edcBankName: "",
    cardName: "",
    cardLast4Digit: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showUPIModal, setShowUPIModal] = useState(false);
  const [paymentType, setPaymentType] = useState("full");
  const [billFetch, setBillFetch] = useState(null);
  const [billFopayment, setBillFopayment] = useState(null);

  const [formErrors, setFormErrors] = useState("");
  const [selectedMode, setSelectedMode] = useState("");
  const [receiptNumber, setReceiptNumber] = useState("");

  const tenantIdUniq = Digit.ULBService.getCurrentTenantId();
  const billData = workflowDetails?.data?.actionState?.nextActions?.[1].Bill;
  const { isLoading: assessmentLoading, mutate: assessmentMutate } = Digit.Hooks.pt.usePropertyAssessment(tenantIdUniq);

  useEffect(() => {
    const handlePOSMessage = (event) => {
      console.log("📩 Message received from POS SDK:", event.data);
  
      try {
        const data = JSON.parse(event.data);
  
        if (data.action === "POS_PAYMENT_SUCCESS") {
          console.log("✅ POS Payment Success:", data);
  
          setPosDetails({
            referenceNumber: data.referenceNumber,
            edcBankName: data.bankName,
            cardName: data.cardType,
            cardLast4Digit: data.cardLast4,
          });
  
          alert("POS Payment Successful ✅");
  
          // Call backend to generate receipt
          handlePaymentPostPOSSuccess(data);
        } 
        else if (data.action === "POS_PAYMENT_FAILED") {
          console.error("❌ POS Payment Failed:", data.error);
          alert("POS Payment Failed ❌: " + data.error);
        } else {
          console.warn("⚠️ Unknown POS message action:", data.action);
        }
      } catch (err) {
        console.error("❌ Error parsing POS message:", err);
      }
    };
  
    window.addEventListener("message", handlePOSMessage);
  
    return () => {
      window.removeEventListener("message", handlePOSMessage);
    };
  }, []);
  
  
  const handlePaymentPostPOSSuccess = async (posData) => {
    try {
      const tenantId = billData?.tenantId || "pg.citya";
      const consumerCode = applicationData?.propertyId;
  
      const receiptRequest = {
        Payment: {
          mobileNumber: billData?.mobileNumber || "9999999999",
          paymentDetails: [
            {
              billId: billData?.id,
              businessService: billData?.businessService,
              totalAmountPaid: parseFloat(posData.amount),
              remarks: remarks,
            },
          ],
          tenantId,
          totalAmountPaid: parseFloat(posData.amount),
          paymentMode: "POS",
          payerName: billData?.payerName,
          paidBy: "OWNER",
          transactionNumber: posData.txnId,
          instrumentNumber: posData.txnId,
          instrumentDate: Date.now(),
        },
        RequestInfo: {
          apiId: "Rainmaker",
          authToken: Digit.SessionStorage.get("auth-token"),
          userInfo: Digit.UserService.getUser().info,
          msgId: `${Date.now()}|en_IN`,
          plainAccessRequest: {},
        },
      };
  
      const response = await Digit.PaymentService.createReciept(tenantId, receiptRequest);
  
      setReceiptNumber(response?.Payments?.[0]?.paymentDetails?.[0]?.receiptNumber);
      setShowAmount(response?.Payments?.[0]?.paymentDetails?.[0]?.totalAmountPaid);
      setShowConfirmation(true);
  
    } catch (err) {
      console.error("Error creating receipt post POS:", err);
    }
  };
  

  
  const toggleMode = (mode) => {
    setSelectedModes([mode]);
    setSelectedMode(mode);
  
    if (mode === "POS") {
      if (window.ReactNativeWebView) {
        // Trigger RN bridge call
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ action: "INITIATE_POS_PAYMENT", amount: manualAmount || billData?.totalAmount })
        );
      }
    }
  };

  const units = applicationDetails?.applicationData?.units;

  const yearRange = Array.isArray(units) && units.length > 0
    ? units[0].toYear
    : "N/A";

  const { t } = useTranslation();
  let userInfo1 = JSON.parse(localStorage.getItem("user-info"));

  const tenantId = userInfo1?.tenantId;
  const {
    isLoading: ptCalculationEstimateLoading,
    data: ptCalculationEstimateData,
    mutate: ptCalculationEstimateMutate,
    error,
  } = Digit.Hooks.pt.usePtCalculationEstimate(tenantId);
  const handleEstimate = () => {
    const payload = {
      Assessment: {
        financialYear: yearRange,
        propertyId: applicationData?.propertyId,
        tenantId: tenantId,
        source: "MUNICIPAL_RECORDS",
        channel: "CITIZEN",
        assessmentDate: Date.now(),
      }
    };

    ptCalculationEstimateMutate(payload, {
      onSuccess: (data) => {

        setEstimateData(data);
        // fetchBill()
      },
      onError: (error) => {
        alert("Estimate error:", error);
      },
    });
  };

  useEffect(() => {
    if (yearRange && applicationData?.propertyId) {
      handleEstimate();
    }
  }, [yearRange, applicationData?.propertyId]);
  // ✅ Prefill manualAmount with 50% when bill is fetched
  useEffect(() => {
    if (billData?.totalAmount && !manualAmount) {
      const total = parseFloat(billData.totalAmount) || 0;
      const halfAmount = total * 0.5;
      setManualAmount(Math.round(halfAmount)); // ✅ round off to nearest integer
    }
  }, [billData]);


  const handlePaymentPartial = async () => {
    const tenantId = billData?.tenantId || "pg.citya";
    const consumerCode = applicationData?.propertyId;
    const selectedPaymentMode = selectedMode;

    if (!remarks.trim()) {
      setFormErrors("Remarks are required.");
      return;
    }

    try {
      // ✅ Fetch fresh bill before processing
      const billResponse = await Digit.PTService.fetchPaymentDetails({
        tenantId,
        consumerCodes: consumerCode,
      });

      const BillList = billResponse?.Bill || [];

      // ❌ Abort if bill is already paid or not found
      if (!BillList.length) {
        alert("❌ This bill has already been paid or is not valid.");
        return;
      }

      const bill = BillList[0];
      const totalAmount = parseFloat(bill.totalAmount) || 0;

      // ✅ Validate manualAmount
      let amountToPay = totalAmount;
      if (manualAmount !== "" && !isNaN(parseFloat(manualAmount))) {
        const enteredAmount = parseFloat(manualAmount);

        if (enteredAmount < totalAmount * 0.5) {
          alert("⚠️ Payment amount cannot be less than 50% of total due.");
          return;
        }
        if (enteredAmount > totalAmount) {
          alert("⚠️ Payment amount cannot exceed 100% of total due.");
          return;
        }

        amountToPay = enteredAmount;
      }

      // ✅ Construct receipt request
      const receiptRequest = {
        Payment: {
          mobileNumber: bill?.mobileNumber,
          paymentDetails: [
            {
              billId: bill.id,
              businessService: bill.businessService,
              // totalDue: totalAmount,
              totalAmountPaid: amountToPay,
              remarks: remarks,
            },
          ],
          tenantId,
          // totalDue: totalAmount,
          totalAmountPaid: amountToPay,
          paymentMode: selectedPaymentMode,
          payerName: bill?.payerName || "Default User",
          paidBy: "OWNER",
        }
      };

      // ✅ Make the API call
      const response = await Digit.PaymentService.createReciept(tenantId, receiptRequest);
      const totalAmountPaid = response?.Payments?.[0]?.paymentDetails?.[0]?.totalAmountPaid;
      setShowAmount(totalAmountPaid)
      // ✅ Invalidate cache & show confirmation
      const receiptNumber = response?.Payments?.[0]?.paymentDetails?.[0]?.receiptNumber;
      setReceiptNumber(receiptNumber);
      setShowConfirmation(true);
      fetchBill();
      setFormErrors("");
    } catch (error) {
      const errorMsg = error?.response?.data?.Errors?.map((e) => e?.code)?.join(", ");
      setFormErrors(errorMsg || "Unknown error while processing payment");
    }
  };

  const handlePayment = async () => {
    const tenantId = billData?.tenantId || "pg.citya";
    const consumerCode = applicationData?.propertyId;
    const selectedPaymentMode = selectedMode; // e.g. "CARD" | "CASH" | "CHEQUE"
  
    if (!remarks.trim()) {
      setFormErrors("Remarks are required.");
      console.error("❌ Remarks validation failed");
      return;
    }

    const amountToPay = billFetch?.totalAmount || 0; // total due

    // Trigger POS SDK
    handlePOSPayment(amountToPay);

    // try {
    //   // ✅ Fetch fresh bill before processing
    //   const billResponse = await Digit.PTService.fetchPaymentDetails({
    //     tenantId,
    //     consumerCodes: consumerCode,
    //   });

    //   console.log("✅ Bill Response:", billResponse);

    //   const BillList = billResponse?.Bill || [];

    //   if (!BillList.length) {
    //     alert("❌ This bill has already been paid or is not valid.");
    //     console.warn("⚠️ No valid bill found for ConsumerCode:", consumerCode);
    //     return;
    //   }

    //   const bill = BillList[0]; // fresh bill
    //   console.log("📄 Selected Bill:", bill);

    //   const totalAmount =
    //     (parseFloat(bill.totalAmount) || 0) + (parseFloat(advancePayment) || 0);
    //   console.log("💰 Total Amount to Pay:", totalAmount);

    //   // ✅ Construct dynamic receipt request
    //   const receiptRequest = {
    //     Payment: {
    //       mobileNumber: bill?.mobileNumber || "9999999999",
    //       paymentDetails: [
    //         {
    //           businessService: bill?.businessService,
    //           billId: bill?.id,
    //           totalDue: bill?.totalAmount,
    //           totalAmountPaid: totalAmount,
    //           remarks: remarks,
    //         },
    //       ],
    //       tenantId: bill?.tenantId || tenantId,
    //       totalDue: bill?.totalAmount,
    //       totalAmountPaid: totalAmount,
    //       paymentMode: "POS",//selectedPaymentMode,
    //       payerName: bill?.payerName || "Unknown User",
    //       paidBy: "OWNER",

    //       // Instrument details – can be filled dynamically from POS SDK
    //       transactionNumber: Date.now().toString(), // Example: unique TXN ID
    //       instrumentNumber: Date.now().toString(), // Example placeholder
    //       instrumentDate: new Date().getTime(),
    //     },
    //     RequestInfo: {
    //       apiId: "Rainmaker",
    //       authToken: Digit.SessionStorage.get("auth-token"), // ✅ dynamically get logged-in token
    //       userInfo: Digit.UserService.getUser().info, // ✅ get logged-in user details
    //       msgId: `${Date.now()}|en_IN`,
    //       plainAccessRequest: {},
    //     },
    //   };

    //   console.log("📝 Final Receipt Request Payload:", receiptRequest);

    //   // ✅ Call API
    //   console.log("📡 Calling createReciept API...");
    //   // const response = await Digit.PaymentService.createReciept(
    //   //   tenantId,
    //   //   receiptRequest
    //   // );

    //   console.log("✅ API Response:", response);

    //   // ✅ Success handling
    //   const receiptNumber =
    //     response?.Payments?.[0]?.paymentDetails?.[0]?.receiptNumber;
    //   const totalAmountPaid =
    //     response?.Payments?.[0]?.paymentDetails?.[0]?.totalAmountPaid;

    //   console.log("🎉 Payment Successful!");
    //   console.log("Receipt Number:", receiptNumber);
    //   console.log("Amount Paid:", totalAmountPaid);

    //   setShowAmount(totalAmountPaid);
    //   setReceiptNumber(receiptNumber);
    //   setShowConfirmation(true);
    //   fetchBill();
    //   setFormErrors("");
    // } catch (error) {
    //   console.error("❌ Payment API Error:", error);

    //   const errorMsg = error?.response?.data?.Errors?.map((e) => e?.code)?.join(", ");
    //   console.error("Error Message from API:", errorMsg);

    //   if (errorMsg?.includes("BILL_ALREADY_PAID")) {
    //     setFormErrors("This bill is already paid.");
    //   } else if (errorMsg?.includes("BILL_EXPIRED")) {
    //     setFormErrors("This bill has expired. Please regenerate.");
    //   } else {
    //     setFormErrors(errorMsg || "Payment failed. Please try again.");
    //   }
    // }
  };

  const handlePOSPayment = (amount) => {
    console.log("🚀 Initiating POS Payment with amount:", amount);
  
    if (window.ReactNativeWebView) {
      const message = {
        action: "INITIATE_POS_PAYMENT",
        amount: amount,
      };
  
      console.log("📡 Sending message to React Native WebView:", message);
      window.ReactNativeWebView.postMessage(JSON.stringify(message));
    } else {
      console.warn("⚠️ ReactNativeWebView not available. POS SDK cannot be triggered.");
      alert("POS SDK not available");
    }
  };
  
  
  

  const fetchBill = async () => {
    if (!applicationData?.propertyId) return;

    try {
      const billResponse = await Digit.PTService.fetchPaymentDetails({
        tenantId,
        consumerCodes: applicationData?.propertyId,
      });

      const BillList = billResponse?.Bill || [];
      if (!BillList.length) {
        // alert("❌ This bill has already been paid or is not valid.");
        setBillFetch(null);
        return;
      }
      setBillFopayment(billResponse); // set fresh bill
      setBillFetch(BillList[0]); // set fresh bill
    } catch (err) {
      // console.error("Error fetching bill:", err);
    }
  };

  const [showToast, setShowToast] = useState(null);
  const { tenantId: __tenantId, authorization, workflow: wrkflow, consumerCode: connectionNo } = Digit.Hooks.useQueryParams();

  let { consumerCode } = useParams();

  if (window.location.href.includes("ISWSCON") || wrkflow === "WNS") consumerCode = decodeURIComponent(consumerCode);
  if (wrkflow === "WNS") consumerCode = stringReplaceAll(consumerCode, "+", "/")
  useEffect(() => {
    if (billFopayment?.Bill && billFopayment.Bill.length == 0) {
      setShowToast({ key: true, label: "CS_BILL_NOT_FOUND" });
    }
  }, [billFopayment]);
  useEffect(() => {
    localStorage.setItem("BillPaymentEnabled", "true");
  }, []);

  const { data: generatePdfKey } = Digit.Hooks.useCommonMDMS(tenantId, "common-masters", "ReceiptKey", {
    select: (data) =>
      data["common-masters"]?.uiCommonPay?.filter(({ code }) => businessService?.includes(code))[0]?.receiptKey || "consolidatedreceipt",
  });
  const printReciept = async () => {
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const state = Digit.ULBService.getStateId();
    const payments = await Digit.PaymentService.getReciept(tenantId, businessService, { receiptNumbers: receiptNumber });
    let response = { filestoreIds: [payments.Payments[0]?.fileStoreId] };

    if (!payments.Payments[0]?.fileStoreId) {
      const paymentsWithCalculation = payments.Payments.map(payment => ({
        ...payment,
        Calculation: estimateData?.Calculation?.[0] || {},
      }));
      response = await Digit.PaymentService.generatePdf(state, { Payments: paymentsWithCalculation }, generatePdfKey);
    }
    const fileStore = await Digit.PaymentService.printReciept(state, { fileStoreIds: response.filestoreIds[0] });
    window.open(fileStore[response.filestoreIds[0]], "_blank");
  };
  if (assessmentLoading) {
    return <Loader />;
  }

      const { data: RoadFactors, isLoading:{} } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "RoadFactor");
  const RoadFactorList = (RoadFactors?.PropertyTax?.RoadFactor || []).map((item) => ({
    code: item.code,
    name: item.name, // Show year like "2024-25"
  }));

    const [boundaryData, setBoundaryData] = useState(null);
    const [zones, setZones] = useState([]);
    const [wards, setWards] = useState([]);
    const [colonies, setColonies] = useState([]);
    const [rateZones, setRateZones] = useState([]);
          useEffect(() => {
      (async () => {
        try {
          const tenantId = Digit.ULBService.getCurrentTenantId();
          const response = await Digit.LocationService.getRevenueLocalities(tenantId);
  
          console.log("🔍 Raw TenantBoundary Response:", response?.TenantBoundary);
  
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
  
    console.log("Zones No=",zones)


  return (
    <div>
      <div style={styles.section}>
        <div style={styles.assessmentStyle}>Consumer Details</div>
        <div style={styles.grid}>
          <div style={styles.flex30}>
            <div style={styles.label}>Owner Name(English)</div>
            <input
              type="text"
              readOnly
              value={applicationData?.owners?.[0]?.name || "N/A"}
              style={styles.input}
            />
          </div>
          <div style={styles.flex30}>
            <div style={styles.label}>Property ID</div>
            <input
              type="text"
              readOnly
              value={applicationData?.propertyId || "N/A"}
              style={styles.input}
            />
          </div>
          <div style={styles.flex30}>
            <div style={styles.label}>Mobile No.</div>
            <input
              type="text"
              readOnly
              value={applicationData?.owners?.[0]?.mobileNumber || "N/A"}
              style={styles.input}
            />
          </div>
          <div style={styles.flex30}>
            <div style={styles.label}>Exemption</div>
            <input
              type="text"
              readOnly
              value={applicationData?.owners?.[0]?.ownerType === "BPL" ? "BPL" : "N/A"}
              style={styles.input}
            />
          </div>
          <div style={styles.flex30}>
            <div style={styles.label}>Ward</div>
            <input
              type="text"
              readOnly
              value={applicationData?.address?.ward || "N/A"}
              style={styles.input}
            />
          </div>
          <div style={styles.flex30}>
            <div style={styles.label}>Zone</div>
            <input type="text" readOnly  value={zones.find((f) => f.code === applicationData?.address?.zone)?.name || "N/A" } style={styles.input} />
          </div>
          <div style={styles.flex30}>
            <div style={styles.label}>Colony</div>
            <input
              type="text"
              readOnly
              value={applicationData?.address?.locality?.name || "N/A"}
              style={styles.input}
            />
          </div>
          <div style={styles.flex30}>
            <div style={styles.label}>Road Factor</div>
            <input type="text" readOnly   value={RoadFactorList.find((f) => f.code === applicationData?.units?.[0]?.roadFactor)?.name || "N/A" } style={styles.input} />
          </div>
          <div style={styles.flex30}>
            <div style={styles.label}>Address</div>
            <input
              type="text"
              readOnly
              value={applicationData?.address?.doorNo + ", " + applicationData?.address?.street || "N/A"}
              style={styles.input}
            />
          </div>
          {applicationDetails?.applicationDetails?.map((detail, index) => (
            <>
              {detail?.additionalDetails?.documents && 
              <PropertyDocuments 
              documents={detail?.additionalDetails?.documents} 
              applicationDetails={applicationDetails} 
              estimateData={estimateData} 
              />}
            </>
          ))}
        </div>
      </div>
      {/* Payment Detail */}
      <div style={styles.section}>
        <div style={styles.assessmentStyle}>Payment Details</div>
        {/* Payment Type Toggle */}
        <div style={{ marginTop: "20px", display: "flex", gap: "20px", alignItems: "center" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <input
              type="radio"
              name="paymentType"
              checked={paymentType === "full"}
              onChange={() => setPaymentType("full")}
            />
            <span style={styles.label}>Full Payment</span>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <input
              type="radio"
              name="paymentType"
              checked={paymentType === "partial"}
              onChange={() => setPaymentType("partial")}
            />
            <span style={styles.label}>Partial Payment</span>
          </label>
        </div>
        {paymentType === "full" && (
          <div style={styles.grid}>

            {/* Arrear */}
            <div style={styles.column}>
              <div style={styles.label}>Arrear</div>
              <input
                value={estimateData?.Calculation?.[0]?.arrear || 0}
                readOnly
                style={styles.input2}
              />
            </div>

            {/* Current Year */}
            <div style={styles.column}>
              <div style={styles.label}>Current Year Net Tax</div>
              <input
                value={estimateData?.Calculation?.[0]?.currentYearTax || 0}
                readOnly
                style={styles.input2}
              />
            </div>

            {/* Previous Balance */}
            <div style={styles.column}>
              <div style={styles.label}>Previous Balance</div>
              <input
                value={estimateData?.Calculation?.[0]?.previousBalance || 0}
                readOnly
                style={styles.input2}
              />
            </div>

            {/* Total Payment Amount */}
            <div style={styles.column}>
              <div style={styles.label}>Total Payable Amount</div>
              <input
                value={(() => {
                  const arrear = parseFloat(estimateData?.Calculation?.[0]?.arrear || 0);
                  const currentYear = parseFloat(estimateData?.Calculation?.[0]?.currentYearTax || 0);
                  const previousBalance = parseFloat(estimateData?.Calculation?.[0]?.previousBalance || 0);
                  return (arrear + currentYear - previousBalance).toFixed(2);
                })()}
                style={styles.input2}
              />
            </div>
            <div style={styles.columnBreak}></div>

            {/* Advance */}
            <div style={styles.column}>
              <div style={styles.label}>Advance</div>
              <input
                value={advancePayment}
                onChange={(e) => setAdvancePayment(e.target.value)}
                style={styles.input2}
              />
            </div>
            <div style={styles.column}>
              <div style={styles.label}></div>
           
            </div>
            <div style={styles.column}>
              <div style={styles.label}></div>
            
            </div>
            <div style={styles.column}>
              <div style={styles.label}></div>
             
            </div>
          </div>
        )}
        {paymentType === "partial" && (
          <div style={styles.row}>
            <div style={styles.column}>
              <div style={styles.label}>Arrear</div>
              <input
                readOnly
                value={estimateData?.Calculation[0]?.arrear || 0}
                style={styles.input}
              />
            </div>
            <div style={styles.column}>
              <div style={styles.label}>Current Year Net Tex</div>
              <input
                readOnly
                value={estimateData?.Calculation?.[0]?.currentYearTax || 0}
                style={styles.input}
              />
            </div>
            <div style={styles.column}>
              <div style={styles.label}>Previous Balance</div>
              <input
                value={estimateData?.Calculation?.[0]?.previousBalance || 0}
                readOnly
                style={styles.input}
              />
            </div>
            <div style={styles.column}>
              <div style={styles.label}>Partial Amount Payable</div>
              <input
                placeholder="XX.XX"
                value={manualAmount}
                style={styles.input}
                onChange={(e) => setManualAmount(e.target.value)}
              />
            </div>
            <div style={styles.column}></div>
          </div>
        )}
      </div>
      <div style={styles.section}>
        <div style={styles.assessmentStyle}>Payment </div>
        <div style={styles.label}>
        </div>
        <div style={styles.checkboxGroup}>
          {["CASH", "Card", "Cheque", "UPI", "NEFT", "RTGS"].map((method) => (
            <label key={method}>
              <input
                type="radio"
                checked={selectedModes.includes(method)}
                onChange={() => toggleMode(method)}
              />{" "}
              {method}
            </label>
          ))}
        </div>
        {selectedModes.includes("Card") && (
          <div style={styles.inputGroup}>
            <div style={styles.inputField}>
              <label style={styles.label}>
                Reference Number <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Reference Number"
                style={styles.input}

              />
            </div>

            <div style={styles.inputField}>
              <label style={styles.label}>
                Bank Name <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Bank Name"
                style={styles.input}

              />
            </div>
            <div style={styles.inputField}>
              <label style={styles.label}>
                Card Holder Name <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Card Holder Name"
                style={styles.input}

              />
            </div>
            <div style={styles.inputField}>
              <label style={styles.label}>
                Card Last 4 digit  <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                placeholder="Card Last 4 digit"
                style={styles.input}

              />
            </div>
          </div>
        )}
        {selectedModes.includes("Cheque") && (
          <div style={styles.inputGroup}>
            <div style={styles.inputField}>
              <label style={styles.label}>
                Cheque Date <span style={styles.required}>*</span>
              </label>
              <input
                type="date"
                style={styles.input}
                value={chequeDetails.issueDate}
                onChange={(e) =>
                  setChequeDetails({ ...chequeDetails, issueDate: e.target.value })
                }
              />
            </div>
            <div style={styles.inputField}>
              <label style={styles.label}>
                Cheque Number <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Cheque Number"
                style={styles.input}
                value={chequeDetails.chequeNumber}
                onChange={(e) =>
                  setChequeDetails({ ...chequeDetails, chequeNumber: e.target.value })
                }
              />
            </div>
            <div style={styles.inputField}>
              <label style={styles.label}>
                Cheque Drawer Name <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                placeholder="Cheque Drawer"
                style={styles.input}
                value={chequeDetails.accountHolder}
                onChange={(e) =>
                  setChequeDetails({ ...chequeDetails, accountHolder: e.target.value })
                }
              />
            </div>
            <div style={styles.inputField}>
              <label style={styles.label}>
                Cheque Bank Name <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                placeholder="Cheque Bank Name"
                style={styles.input}
                value={chequeDetails.bankName}
                onChange={(e) =>
                  setChequeDetails({ ...chequeDetails, bankName: e.target.value })
                }
              />
            </div>

          </div>
        )}
        {selectedModes.includes("POS") && (
          <div style={styles.inputGroup}>
            <div style={styles.inputField}>
              <label style={styles.label}>
                POS reference number <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                placeholder="POS reference number"
                style={styles.input}
                value={posDetails.referenceNumber}
                onChange={(e) =>
                  setPosDetails({ ...posDetails, referenceNumber: e.target.value })
                }
              />
            </div>
            <div style={styles.inputField}>
              <label style={styles.label}>
                EDC Bank Name <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter EDC Bank Name"
                style={styles.input}
                value={posDetails.edcBankName}
                onChange={(e) =>
                  setPosDetails({ ...posDetails, edcBankName: e.target.value })
                }
              />
            </div>
            <div style={styles.inputField}>
              <label style={styles.label}>
                Bank Card Name <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                placeholder="Name on card"
                style={styles.input}
                value={posDetails.cardName}
                onChange={(e) =>
                  setPosDetails({ ...posDetails, cardName: e.target.value })
                }
              />
            </div>
            <div style={styles.inputField}>
              <label style={styles.label}>
                Card Last 4 Digit <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                placeholder="Card last four digit"
                style={styles.input}
                maxLength={4}
                value={posDetails.cardLast4Digit}
                onChange={(e) =>
                  setPosDetails({ ...posDetails, cardLast4Digit: e.target.value })
                }
              />
            </div>
          </div>
        )}
        {selectedModes.includes("UPI") && (
          <div style={styles.inputGroup}>
            <div style={styles.inputField}>
              <label style={styles.label}>
                Reference number <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                placeholder="Reference number"
                style={{
                  width: "25%",
                  height: "40px",
                  borderRadius: "4px",
                  boxShadow: "0px 4px 4px 0px #00000040",
                  padding: "6px",
                  fontSize: "12px"
                }}
              />
            </div>

          </div>
        )}

        {showConfirmation && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <div style={styles.checkIcon}>✓</div>
              <div style={styles.header}>Payment Collected</div>
              <div style={styles.receiptText}>
                Receipt Number
                <br />
                {receiptNumber}
              </div>
              <div style={styles.receiptText}>
                Total Amount Received
                <br />
                ₹{showAmount}
              </div>
              <button style={styles.homeButton} onClick={printReciept}>
                Download Receipt
              </button>
              <button style={styles.homeButton} onClick={() => {
                window.location.href = "/digit-ui/employee"; 
              }}>
                Home
              </button>
            </div>
          </div>)}
        <div style={{ marginTop: "20px" }}>
          <div style={{ ...styles.label, marginLeft: "10px" }}>
            Remarks <span style={{ color: "red" }}>*</span>
          </div>
          <textarea
            rows="3"
            style={styles.remarkBox}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
          {formErrors && <div style={{ color: "red", marginTop: "4px" }}>{formErrors}</div>}
        </div>

        <div style={{ marginTop: "20px" }}>
          {(selectedModes.length > 0 && paymentType === "full") && (
            <button
              style={{
                ...styles.paymentButton,
                backgroundColor: billFetch?.totalAmount === 0 ? "#ccc" : styles.paymentButton.backgroundColor,
                cursor: billFetch?.totalAmount === 0 ? "not-allowed" : "pointer"
              }}
              onClick={() => handlePayment()}
              disabled={billFetch?.totalAmount === 0}
            >
              Collect Payment
            </button>
          )}
          {((selectedModes.length > 0 && paymentType === "partial")) && (
            <button
              style={{
                ...styles.paymentButton,
                backgroundColor: billFetch?.totalAmount === 0 ? "#ccc" : styles.paymentButton.backgroundColor,
                cursor: billFetch?.totalAmount === 0 ? "not-allowed" : "pointer"
              }}
              onClick={() => handlePaymentPartial()}
              disabled={billFetch?.totalAmount === 0}
            >
              Collect Payment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsContent;

const styles = {
  container: { fontFamily: "Arial", padding: "20px", fontSize: "14px" },
  section: {
    marginBottom: "20px", marginTop: "20px", backgroundColor: "rgba(255, 255, 255, var(--bg-opacity))",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.16)",
    padding: "16px",
    borderRadius: "12px",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
    marginBottom: "10px"
  },
  column: { flex: "1 1 200px", marginRight: "10px", marginBottom: "10px" },

  columnBreak: {
    flexBasis: "100%",
    height: 0,
  },
  label: {
    fontFamily: "Poppins, sans-serif",
    marginBottom: "4px",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "22px",
    letterSpacing: "0%",
    color: "#282828"
  },
  button: {
    padding: "8px 16px",
    marginRight: "10px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#e0d4fa",
    color: "#333",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  th: {
    backgroundColor: "#6b133f",
    padding: "8px",
    border: "1px solid #ccc",
    textAlign: "left",
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "175%",
    letterSpacing: "-1%",
    verticalAlign: "middle",
    color: "white"
  },
  td: {
    padding: "8px",
    border: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "13px",
    lineHeight: "100%",
    letterSpacing: "1%",
    verticalAlign: "middle",
    color: "#323C47"
  },
  checkboxGroup: {
    display: "flex", gap: "15px", marginLeft: "10px", fontFamily: "Poppins, sans-serif",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "100%",
    letterSpacing: "0%", color: "#6D6969"
  },
  remarkBox: {
    width: "32%",
    minWidth: "300px",
    height: "72px",
    borderRadius: "4px",
    borderWidth: "1px",
    border: "1px solid #D9D9D9",
    padding: "10px",
    boxShadow: "0px 4px 4px 0px #00000040",
    marginLeft: "10px"
  },
  paymentButton: {
    padding: "10px 20px",
    backgroundColor: "#6b133f",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    // float: "right",
    display: "flex",
    marginLeft: "auto",
    marginRight: "10px",
  },
  inputGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    marginTop: "10px",
    marginLeft: "10px",
  },
  inputField: {
    flex: "1 1 200px",
    display: "flex",
    flexDirection: "column",
  },

  required: {
    color: "red",
  },

  input: {
    width: "100%",
    height: "44px",
    padding: "0 12px",
    borderRadius: "6px",
    fontSize: "14px",
    fontFamily: "'Poppins', sans-serif",
    transition: "all 0.3s ease",
    background: "rgb(241, 241, 241)",
  },


  input2: {
    width: "100%",
    height: "44px",
    padding: "0 12px",
    borderRadius: "6px",
    fontSize: "14px",
    fontFamily: "'Poppins', sans-serif",
    transition: "all 0.3s ease",
    background: "rgb(241, 241, 241)",

  },

  totalAmount: {
    width: "100%",
    height: "40px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgba(185, 185, 185, 0.6)",
    boxShadow: "0px 4px 4px 0px #00000040",
    padding: "6px",
    fontSize: "12px",

  },
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
    textAlign: "center"
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
  assessmentStyle: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
    fontSize: '26px',
    lineHeight: '100%',
    letterSpacing: '0px',
    textDecorationStyle: 'solid',
    textDecorationColor: '#6b133f',
    textDecorationThickness: '1px',
    color: '#6b133f',
    marginBottom: '20px',
    textAlign: "left",

  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
  },
  flex30: {
    flex: "1 1 30%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    minHeight: "90px",
  },
  textBox: {
    height: "35px",
    borderWidth: "1px",
    borderRadius: "6px",
    background: "#D2D2D280",
    border: "0.5px solid #D2D2D280",
    color: "black"
  }
};






// import {
//   Card,
//   Dropdown,
//   Loader,
//   SubmitBar
// } from "@egovernments/digit-ui-react-components";
// import { values } from "lodash";
// import React, { Fragment, useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import PropertyDocuments from "./PropertyDocumentCashdesk";
// import { useParams, useHistory, useLocation, Redirect } from "react-router-dom";
// import TLCaption from "./TLCaption";
// import { CollectPayment } from "@egovernments/digit-ui-module-common/src/payments/employee/payment-collect";
// import { useQueryClient } from "react-query";


// const ApplicationDetailsContent = ({
//   applicationDetails,
//   workflowDetails,
//   isDataLoading,
//   applicationData,
//   businessService,
//   timelineStatusPrefix,
//   showTimeLine = true,
//   statusAttribute = "status",
//   paymentsList,
//   oldValue,
//   isInfoLabel = false
// }) => {
//   const [advancePayment, setAdvancePayment] = useState(0);
//   const [manualAmount, setManualAmount] = useState("");
//   const [selectedModes, setSelectedModes] = useState([]);
//   const [estimateData, setEstimateData] = useState("");
//   const [remarks, setRemarks] = useState("");
//   const [showAmount, setShowAmount] = useState(0);
//    const stateId = Digit.ULBService.getStateId();

//   const [chequeDetails, setChequeDetails] = useState({
//     issueDate: "",
//     chequeNumber: "",
//     accountHolder: "",
//     bankName: "",
//   });
//   const [posDetails, setPosDetails] = useState({
//     referenceNumber: "",
//     edcBankName: "",
//     cardName: "",
//     cardLast4Digit: "",
//   });
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [showUPIModal, setShowUPIModal] = useState(false);
//   const [paymentType, setPaymentType] = useState("full");
//   const [billFetch, setBillFetch] = useState(null);
//   const [billFopayment, setBillFopayment] = useState(null);

//   const [formErrors, setFormErrors] = useState("");
//   const [selectedMode, setSelectedMode] = useState("");
//   const [receiptNumber, setReceiptNumber] = useState("");

//   const tenantIdUniq = Digit.ULBService.getCurrentTenantId();
//   const billData = workflowDetails?.data?.actionState?.nextActions?.[1].Bill;
//   const { isLoading: assessmentLoading, mutate: assessmentMutate } = Digit.Hooks.pt.usePropertyAssessment(tenantIdUniq);
//   const toggleMode = (mode) => {
//     // Always set only the current mode
//     setSelectedModes([mode]);
//     setSelectedMode(mode);
//     // Show UPI modal only when UPI is newly selected
//     if (mode === "UPI") {
//       setShowUPIModal(true);
//     } else {
//       setShowUPIModal(false);
//     }
//   };

//   const units = applicationDetails?.applicationData?.units;

//   const yearRange = Array.isArray(units) && units.length > 0
//     ? units[0].toYear
//     : "N/A";

//   const { t } = useTranslation();
//   let userInfo1 = JSON.parse(localStorage.getItem("user-info"));

//   const tenantId = userInfo1?.tenantId;
//   const {
//     isLoading: ptCalculationEstimateLoading,
//     data: ptCalculationEstimateData,
//     mutate: ptCalculationEstimateMutate,
//     error,
//   } = Digit.Hooks.pt.usePtCalculationEstimate(tenantId);
//   const handleEstimate = () => {
//     const payload = {
//       Assessment: {
//         financialYear: yearRange,
//         propertyId: applicationData?.propertyId,
//         tenantId: tenantId,
//         source: "MUNICIPAL_RECORDS",
//         channel: "CITIZEN",
//         assessmentDate: Date.now(),
//       }
//     };

//     ptCalculationEstimateMutate(payload, {
//       onSuccess: (data) => {

//         setEstimateData(data);
//         // fetchBill()
//       },
//       onError: (error) => {
//         alert("Estimate error:", error);
//       },
//     });
//   };

//   useEffect(() => {
//     if (yearRange && applicationData?.propertyId) {
//       handleEstimate();
//     }
//   }, [yearRange, applicationData?.propertyId]);
//   // ✅ Prefill manualAmount with 50% when bill is fetched
//   useEffect(() => {
//     if (billData?.totalAmount && !manualAmount) {
//       const total = parseFloat(billData.totalAmount) || 0;
//       const halfAmount = total * 0.5;
//       setManualAmount(Math.round(halfAmount)); // ✅ round off to nearest integer
//     }
//   }, [billData]);


//   const handlePaymentPartial = async () => {
//     const tenantId = billData?.tenantId || "pg.citya";
//     const consumerCode = applicationData?.propertyId;
//     const selectedPaymentMode = selectedMode;

//     if (!remarks.trim()) {
//       setFormErrors("Remarks are required.");
//       return;
//     }

//     try {
//       // ✅ Fetch fresh bill before processing
//       const billResponse = await Digit.PTService.fetchPaymentDetails({
//         tenantId,
//         consumerCodes: consumerCode,
//       });

//       const BillList = billResponse?.Bill || [];

//       // ❌ Abort if bill is already paid or not found
//       if (!BillList.length) {
//         alert("❌ This bill has already been paid or is not valid.");
//         return;
//       }

//       const bill = BillList[0];
//       const totalAmount = parseFloat(bill.totalAmount) || 0;

//       // ✅ Validate manualAmount
//       let amountToPay = totalAmount;
//       if (manualAmount !== "" && !isNaN(parseFloat(manualAmount))) {
//         const enteredAmount = parseFloat(manualAmount);

//         if (enteredAmount < totalAmount * 0.5) {
//           alert("⚠️ Payment amount cannot be less than 50% of total due.");
//           return;
//         }
//         if (enteredAmount > totalAmount) {
//           alert("⚠️ Payment amount cannot exceed 100% of total due.");
//           return;
//         }

//         amountToPay = enteredAmount;
//       }

//       // ✅ Construct receipt request
//       const receiptRequest = {
//         Payment: {
//           mobileNumber: bill?.mobileNumber,
//           paymentDetails: [
//             {
//               billId: bill.id,
//               businessService: bill.businessService,
//               // totalDue: totalAmount,
//               totalAmountPaid: amountToPay,
//               remarks: remarks,
//             },
//           ],
//           tenantId,
//           // totalDue: totalAmount,
//           totalAmountPaid: amountToPay,
//           paymentMode: selectedPaymentMode,
//           payerName: bill?.payerName || "Default User",
//           paidBy: "OWNER",
//         }
//       };

//       // ✅ Make the API call
//       const response = await Digit.PaymentService.createReciept(tenantId, receiptRequest);
//       const totalAmountPaid = response?.Payments?.[0]?.paymentDetails?.[0]?.totalAmountPaid;
//       setShowAmount(totalAmountPaid)
//       // ✅ Invalidate cache & show confirmation
//       const receiptNumber = response?.Payments?.[0]?.paymentDetails?.[0]?.receiptNumber;
//       setReceiptNumber(receiptNumber);
//       setShowConfirmation(true);
//       fetchBill();
//       setFormErrors("");
//     } catch (error) {
//       const errorMsg = error?.response?.data?.Errors?.map((e) => e?.code)?.join(", ");
//       setFormErrors(errorMsg || "Unknown error while processing payment");
//     }
//   };

//   // const handlePayment = async () => {
//   //   const tenantId = billData?.tenantId || "pg.citya";
//   //   const consumerCode = applicationData?.propertyId;
//   //   const selectedPaymentMode = selectedMode; // Make sure this is coming from your UI
//   //   if (!remarks.trim()) {
//   //     setFormErrors("Remarks are required.");
//   //     return;
//   //   }
//   //   try {
//   //     // ✅ Fetch fresh bill before processing
//   //     const billResponse = await Digit.PTService.fetchPaymentDetails({
//   //       tenantId,
//   //       consumerCodes: consumerCode,
//   //     });

//   //     const BillList = billResponse?.Bill || [];

//   //     // ❌ Abort if bill is already paid or not found
//   //     if (!BillList.length) {
//   //       alert("❌ This bill has already been paid or is not valid.");
//   //       return;
//   //     }

//   //     const bill = BillList[0]; // fresh bill
//   //     const totalAmount = (parseFloat(bill.totalAmount) || 0) + (parseFloat(advancePayment) || 0);


//   //     // ✅ Construct receipt request
//   //     const receiptRequest = {
//   //       Payment: {
//   //         mobileNumber: bill?.mobileNumber,
//   //         paymentDetails: [
//   //           {
//   //             billId: bill.id,
//   //             businessService: bill.businessService,
//   //             // totalDue: bill.totalAmount,
//   //             totalAmountPaid: totalAmount,
//   //             remarks: remarks,
//   //           },
//   //         ],
//   //         tenantId,
//   //         // totalDue: bill.totalAmount,
//   //         totalAmountPaid: totalAmount,
//   //         paymentMode: selectedPaymentMode,
//   //         payerName: bill?.payerName || "Default User",
//   //         paidBy: "OWNER",
//   //       }
//   //     };

//   //     // ✅ Make the API call
//   //     const response = await Digit.PaymentService.createReciept(tenantId, receiptRequest);

//   //     // ✅ Invalidate cache & show confirmation
//   //     // queryClient.invalidateQueries();
//   //     const receiptNumber = response?.Payments?.[0]?.paymentDetails?.[0]?.receiptNumber;
//   //     const totalAmountPaid = response?.Payments?.[0]?.paymentDetails?.[0]?.totalAmountPaid;
//   //     setShowAmount(totalAmountPaid)
//   //     setReceiptNumber(receiptNumber);
//   //     setShowConfirmation(true);
//   //     fetchBill();
//   //     setFormErrors("");
//   //   } catch (error) {
//   //     const errorMsg = error?.response?.data?.Errors?.map((e) => e?.code)?.join(", ");
//   //     setFormErrors("");
//   //   }
//   // };

//   const handlePayment = async () => {
//     const tenantId = billData?.tenantId || "pg.citya";
//     const consumerCode = applicationData?.propertyId;
//     const selectedPaymentMode = selectedMode; // e.g. "CARD" | "CASH" | "CHEQUE"
  
//     if (!remarks.trim()) {
//       setFormErrors("Remarks are required.");
//       console.error("❌ Remarks validation failed");
//       return;
//     }
  
//     try {
//       // ✅ Fetch fresh bill before processing
//       const billResponse = await Digit.PTService.fetchPaymentDetails({
//         tenantId,
//         consumerCodes: consumerCode,
//       });
  
//       console.log("✅ Bill Response:", billResponse);
  
//       const BillList = billResponse?.Bill || [];
  
//       if (!BillList.length) {
//         alert("❌ This bill has already been paid or is not valid.");
//         console.warn("⚠️ No valid bill found for ConsumerCode:", consumerCode);
//         return;
//       }
  
//       const bill = BillList[0]; // fresh bill
//       console.log("📄 Selected Bill:", bill);
  
//       const totalAmount =
//         (parseFloat(bill.totalAmount) || 0) + (parseFloat(advancePayment) || 0);
//       console.log("💰 Total Amount to Pay:", totalAmount);
  
//       // ✅ Construct dynamic receipt request
//       const receiptRequest = {
//         Payment: {
//           mobileNumber: bill?.mobileNumber || "9999999999",
//           paymentDetails: [
//             {
//               businessService: bill?.businessService,
//               billId: bill?.id,
//               totalDue: bill?.totalAmount,
//               totalAmountPaid: totalAmount,
//               remarks: remarks,
//             },
//           ],
//           tenantId: bill?.tenantId || tenantId,
//           totalDue: bill?.totalAmount,
//           totalAmountPaid: totalAmount,
//           paymentMode: selectedPaymentMode,
//           payerName: bill?.payerName || "Unknown User",
//           paidBy: "OWNER",
  
//           // Instrument details – can be filled dynamically from POS SDK
//           transactionNumber: Date.now().toString(), // Example: unique TXN ID
//           instrumentNumber: Date.now().toString(), // Example placeholder
//           instrumentDate: new Date().getTime(),
//         },
//         RequestInfo: {
//           apiId: "Rainmaker",
//           authToken: Digit.SessionStorage.get("auth-token"), // ✅ dynamically get logged-in token
//           userInfo: Digit.UserService.getUser().info, // ✅ get logged-in user details
//           msgId: `${Date.now()}|en_IN`,
//           plainAccessRequest: {},
//         },
//       };
  
//       console.log("📝 Final Receipt Request Payload:", receiptRequest);
  
//       // ✅ Call API
//       console.log("📡 Calling createReciept API...");
//       const response = await Digit.PaymentService.createReciept(
//         tenantId,
//         receiptRequest
//       );
  
//       console.log("✅ API Response:", response);
  
//       // ✅ Success handling
//       const receiptNumber =
//         response?.Payments?.[0]?.paymentDetails?.[0]?.receiptNumber;
//       const totalAmountPaid =
//         response?.Payments?.[0]?.paymentDetails?.[0]?.totalAmountPaid;
  
//       console.log("🎉 Payment Successful!");
//       console.log("Receipt Number:", receiptNumber);
//       console.log("Amount Paid:", totalAmountPaid);
  
//       setShowAmount(totalAmountPaid);
//       setReceiptNumber(receiptNumber);
//       setShowConfirmation(true);
//       fetchBill();
//       setFormErrors("");
//     } catch (error) {
//       console.error("❌ Payment API Error:", error);
  
//       const errorMsg = error?.response?.data?.Errors?.map((e) => e?.code)?.join(", ");
//       console.error("Error Message from API:", errorMsg);
  
//       if (errorMsg?.includes("BILL_ALREADY_PAID")) {
//         setFormErrors("This bill is already paid.");
//       } else if (errorMsg?.includes("BILL_EXPIRED")) {
//         setFormErrors("This bill has expired. Please regenerate.");
//       } else {
//         setFormErrors(errorMsg || "Payment failed. Please try again.");
//       }
//     }
//   };
  
  

//   const fetchBill = async () => {
//     if (!applicationData?.propertyId) return;

//     try {
//       const billResponse = await Digit.PTService.fetchPaymentDetails({
//         tenantId,
//         consumerCodes: applicationData?.propertyId,
//       });

//       const BillList = billResponse?.Bill || [];
//       if (!BillList.length) {
//         // alert("❌ This bill has already been paid or is not valid.");
//         setBillFetch(null);
//         return;
//       }
//       setBillFopayment(billResponse); // set fresh bill
//       setBillFetch(BillList[0]); // set fresh bill
//     } catch (err) {
//       // console.error("Error fetching bill:", err);
//     }
//   };

//   const [showToast, setShowToast] = useState(null);
//   const { tenantId: __tenantId, authorization, workflow: wrkflow, consumerCode: connectionNo } = Digit.Hooks.useQueryParams();

//   let { consumerCode } = useParams();

//   if (window.location.href.includes("ISWSCON") || wrkflow === "WNS") consumerCode = decodeURIComponent(consumerCode);
//   if (wrkflow === "WNS") consumerCode = stringReplaceAll(consumerCode, "+", "/")
//   useEffect(() => {
//     if (billFopayment?.Bill && billFopayment.Bill.length == 0) {
//       setShowToast({ key: true, label: "CS_BILL_NOT_FOUND" });
//     }
//   }, [billFopayment]);
//   useEffect(() => {
//     localStorage.setItem("BillPaymentEnabled", "true");
//   }, []);

//   const { data: generatePdfKey } = Digit.Hooks.useCommonMDMS(tenantId, "common-masters", "ReceiptKey", {
//     select: (data) =>
//       data["common-masters"]?.uiCommonPay?.filter(({ code }) => businessService?.includes(code))[0]?.receiptKey || "consolidatedreceipt",
//   });
//   const printReciept = async () => {
//     const tenantId = Digit.ULBService.getCurrentTenantId();
//     const state = Digit.ULBService.getStateId();
//     const payments = await Digit.PaymentService.getReciept(tenantId, businessService, { receiptNumbers: receiptNumber });
//     let response = { filestoreIds: [payments.Payments[0]?.fileStoreId] };

//     if (!payments.Payments[0]?.fileStoreId) {
//       const paymentsWithCalculation = payments.Payments.map(payment => ({
//         ...payment,
//         Calculation: estimateData?.Calculation?.[0] || {},
//       }));
//       response = await Digit.PaymentService.generatePdf(state, { Payments: paymentsWithCalculation }, generatePdfKey);
//     }
//     const fileStore = await Digit.PaymentService.printReciept(state, { fileStoreIds: response.filestoreIds[0] });
//     window.open(fileStore[response.filestoreIds[0]], "_blank");
//   };
//   if (assessmentLoading) {
//     return <Loader />;
//   }

//       const { data: RoadFactors, isLoading:{} } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "RoadFactor");
//   const RoadFactorList = (RoadFactors?.PropertyTax?.RoadFactor || []).map((item) => ({
//     code: item.code,
//     name: item.name, // Show year like "2024-25"
//   }));

//     const [boundaryData, setBoundaryData] = useState(null);
//     const [zones, setZones] = useState([]);
//     const [wards, setWards] = useState([]);
//     const [colonies, setColonies] = useState([]);
//     const [rateZones, setRateZones] = useState([]);
//           useEffect(() => {
//       (async () => {
//         try {
//           const tenantId = Digit.ULBService.getCurrentTenantId();
//           const response = await Digit.LocationService.getRevenueLocalities(tenantId);
  
//           console.log("🔍 Raw TenantBoundary Response:", response?.TenantBoundary);
  
//           const cityBoundary = response?.TenantBoundary?.[0]?.boundary?.[0];
//           if (cityBoundary?.children?.length > 0) {
//             setBoundaryData(cityBoundary);
  
//             const zoneOptions = cityBoundary.children.map((zone) => ({
//               code: zone.code,
//               name: zone.name || zone.code,
//             }));
//             setZones(zoneOptions);
//           } else {
//             console.warn("❌ No boundary children found.");
//           }
//         } catch (error) {
//           console.error("❌ Error fetching boundary data:", error);
//         }
//       })();
//     }, []);
  
//     console.log("Zones No=",zones)


//   return (
//     <div>
//       <div style={styles.section}>
//         <div style={styles.assessmentStyle}>Consumer Details</div>
//         <div style={styles.grid}>
//           <div style={styles.flex30}>
//             <div style={styles.label}>Owner Name(English)</div>
//             <input
//               type="text"
//               readOnly
//               value={applicationData?.owners?.[0]?.name || "N/A"}
//               style={styles.input}
//             />
//           </div>
//           <div style={styles.flex30}>
//             <div style={styles.label}>Property ID</div>
//             <input
//               type="text"
//               readOnly
//               value={applicationData?.propertyId || "N/A"}
//               style={styles.input}
//             />
//           </div>
//           <div style={styles.flex30}>
//             <div style={styles.label}>Mobile No.</div>
//             <input
//               type="text"
//               readOnly
//               value={applicationData?.owners?.[0]?.mobileNumber || "N/A"}
//               style={styles.input}
//             />
//           </div>
//           <div style={styles.flex30}>
//             <div style={styles.label}>Exemption</div>
//             <input
//               type="text"
//               readOnly
//               value={applicationData?.owners?.[0]?.ownerType === "BPL" ? "BPL" : "N/A"}
//               style={styles.input}
//             />
//           </div>
//           <div style={styles.flex30}>
//             <div style={styles.label}>Ward</div>
//             <input
//               type="text"
//               readOnly
//               value={applicationData?.address?.ward || "N/A"}
//               style={styles.input}
//             />
//           </div>
//           <div style={styles.flex30}>
//             <div style={styles.label}>Zone</div>
//             <input type="text" readOnly  value={zones.find((f) => f.code === applicationData?.address?.zone)?.name || "N/A" } style={styles.input} />
//           </div>
//           <div style={styles.flex30}>
//             <div style={styles.label}>Colony</div>
//             <input
//               type="text"
//               readOnly
//               value={applicationData?.address?.locality?.name || "N/A"}
//               style={styles.input}
//             />
//           </div>
//           <div style={styles.flex30}>
//             <div style={styles.label}>Road Factor</div>
//             <input type="text" readOnly   value={RoadFactorList.find((f) => f.code === applicationData?.units?.[0]?.roadFactor)?.name || "N/A" } style={styles.input} />
//           </div>
//           <div style={styles.flex30}>
//             <div style={styles.label}>Address</div>
//             <input
//               type="text"
//               readOnly
//               value={applicationData?.address?.doorNo + ", " + applicationData?.address?.street || "N/A"}
//               style={styles.input}
//             />
//           </div>
//           {applicationDetails?.applicationDetails?.map((detail, index) => (
//             <>
//               {detail?.additionalDetails?.documents && 
//               <PropertyDocuments 
//               documents={detail?.additionalDetails?.documents} 
//               applicationDetails={applicationDetails} 
//               estimateData={estimateData} 
//               />}
//             </>
//           ))}
//         </div>
//       </div>
//       {/* Payment Detail */}
//       <div style={styles.section}>
//         <div style={styles.assessmentStyle}>Payment Details</div>
//         {/* Payment Type Toggle */}
//         <div style={{ marginTop: "20px", display: "flex", gap: "20px", alignItems: "center" }}>
//           <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
//             <input
//               type="radio"
//               name="paymentType"
//               checked={paymentType === "full"}
//               onChange={() => setPaymentType("full")}
//             />
//             <span style={styles.label}>Full Payment</span>
//           </label>
//           <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
//             <input
//               type="radio"
//               name="paymentType"
//               checked={paymentType === "partial"}
//               onChange={() => setPaymentType("partial")}
//             />
//             <span style={styles.label}>Partial Payment</span>
//           </label>
//         </div>
//         {paymentType === "full" && (
//           <div style={styles.grid}>

//             {/* Arrear */}
//             <div style={styles.column}>
//               <div style={styles.label}>Arrear</div>
//               <input
//                 value={estimateData?.Calculation?.[0]?.arrear || 0}
//                 readOnly
//                 style={styles.input2}
//               />
//             </div>

//             {/* Current Year */}
//             <div style={styles.column}>
//               <div style={styles.label}>Current Year Net Tax</div>
//               <input
//                 value={estimateData?.Calculation?.[0]?.currentYearTax || 0}
//                 readOnly
//                 style={styles.input2}
//               />
//             </div>

//             {/* Previous Balance */}
//             <div style={styles.column}>
//               <div style={styles.label}>Previous Balance</div>
//               <input
//                 value={estimateData?.Calculation?.[0]?.previousBalance || 0}
//                 readOnly
//                 style={styles.input2}
//               />
//             </div>

//             {/* Total Payment Amount */}
//             <div style={styles.column}>
//               <div style={styles.label}>Total Payable Amount</div>
//               <input
//                 value={(() => {
//                   const arrear = parseFloat(estimateData?.Calculation?.[0]?.arrear || 0);
//                   const currentYear = parseFloat(estimateData?.Calculation?.[0]?.currentYearTax || 0);
//                   const previousBalance = parseFloat(estimateData?.Calculation?.[0]?.previousBalance || 0);
//                   return (arrear + currentYear - previousBalance).toFixed(2);
//                 })()}
//                 style={styles.input2}
//               />
//             </div>
//             <div style={styles.columnBreak}></div>

//             {/* Advance */}
//             <div style={styles.column}>
//               <div style={styles.label}>Advance</div>
//               <input
//                 value={advancePayment}
//                 onChange={(e) => setAdvancePayment(e.target.value)}
//                 style={styles.input2}
//               />
//             </div>
//             <div style={styles.column}>
//               <div style={styles.label}></div>
           
//             </div>
//             <div style={styles.column}>
//               <div style={styles.label}></div>
            
//             </div>
//             <div style={styles.column}>
//               <div style={styles.label}></div>
             
//             </div>
//           </div>
//         )}
//         {paymentType === "partial" && (
//           <div style={styles.row}>
//             <div style={styles.column}>
//               <div style={styles.label}>Arrear</div>
//               <input
//                 readOnly
//                 value={estimateData?.Calculation[0]?.arrear || 0}
//                 style={styles.input}
//               />
//             </div>
//             <div style={styles.column}>
//               <div style={styles.label}>Current Year Net Tex</div>
//               <input
//                 readOnly
//                 value={estimateData?.Calculation?.[0]?.currentYearTax || 0}
//                 style={styles.input}
//               />
//             </div>
//             <div style={styles.column}>
//               <div style={styles.label}>Previous Balance</div>
//               <input
//                 value={estimateData?.Calculation?.[0]?.previousBalance || 0}
//                 readOnly
//                 style={styles.input}
//               />
//             </div>
//             <div style={styles.column}>
//               <div style={styles.label}>Partial Amount Payable</div>
//               <input
//                 placeholder="XX.XX"
//                 value={manualAmount}
//                 style={styles.input}
//                 onChange={(e) => setManualAmount(e.target.value)}
//               />
//             </div>
//             <div style={styles.column}></div>
//           </div>
//         )}
//       </div>
//       <div style={styles.section}>
//         <div style={styles.assessmentStyle}>Payment </div>
//         <div style={styles.label}>
//         </div>
//         <div style={styles.checkboxGroup}>
//           {["CASH", "Card", "Cheque", "UPI", "NEFT", "RTGS"].map((method) => (
//             <label key={method}>
//               <input
//                 type="radio"
//                 checked={selectedModes.includes(method)}
//                 onChange={() => toggleMode(method)}
//               />{" "}
//               {method}
//             </label>
//           ))}
//         </div>
//         {selectedModes.includes("Card") && (
//           <div style={styles.inputGroup}>
//             <div style={styles.inputField}>
//               <label style={styles.label}>
//                 Reference Number <span style={styles.required}>*</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter Reference Number"
//                 style={styles.input}

//               />
//             </div>

//             <div style={styles.inputField}>
//               <label style={styles.label}>
//                 Bank Name <span style={styles.required}>*</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter Bank Name"
//                 style={styles.input}

//               />
//             </div>
//             <div style={styles.inputField}>
//               <label style={styles.label}>
//                 Card Holder Name <span style={styles.required}>*</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter Card Holder Name"
//                 style={styles.input}

//               />
//             </div>
//             <div style={styles.inputField}>
//               <label style={styles.label}>
//                 Card Last 4 digit  <span style={styles.required}>*</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Card Last 4 digit"
//                 style={styles.input}

//               />
//             </div>
//           </div>
//         )}
//         {selectedModes.includes("Cheque") && (
//           <div style={styles.inputGroup}>
//             <div style={styles.inputField}>
//               <label style={styles.label}>
//                 Cheque Date <span style={styles.required}>*</span>
//               </label>
//               <input
//                 type="date"
//                 style={styles.input}
//                 value={chequeDetails.issueDate}
//                 onChange={(e) =>
//                   setChequeDetails({ ...chequeDetails, issueDate: e.target.value })
//                 }
//               />
//             </div>
//             <div style={styles.inputField}>
//               <label style={styles.label}>
//                 Cheque Number <span style={styles.required}>*</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter Cheque Number"
//                 style={styles.input}
//                 value={chequeDetails.chequeNumber}
//                 onChange={(e) =>
//                   setChequeDetails({ ...chequeDetails, chequeNumber: e.target.value })
//                 }
//               />
//             </div>
//             <div style={styles.inputField}>
//               <label style={styles.label}>
//                 Cheque Drawer Name <span style={styles.required}>*</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Cheque Drawer"
//                 style={styles.input}
//                 value={chequeDetails.accountHolder}
//                 onChange={(e) =>
//                   setChequeDetails({ ...chequeDetails, accountHolder: e.target.value })
//                 }
//               />
//             </div>
//             <div style={styles.inputField}>
//               <label style={styles.label}>
//                 Cheque Bank Name <span style={styles.required}>*</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Cheque Bank Name"
//                 style={styles.input}
//                 value={chequeDetails.bankName}
//                 onChange={(e) =>
//                   setChequeDetails({ ...chequeDetails, bankName: e.target.value })
//                 }
//               />
//             </div>

//           </div>
//         )}
//         {selectedModes.includes("POS") && (
//           <div style={styles.inputGroup}>
//             <div style={styles.inputField}>
//               <label style={styles.label}>
//                 POS reference number <span style={styles.required}>*</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="POS reference number"
//                 style={styles.input}
//                 value={posDetails.referenceNumber}
//                 onChange={(e) =>
//                   setPosDetails({ ...posDetails, referenceNumber: e.target.value })
//                 }
//               />
//             </div>
//             <div style={styles.inputField}>
//               <label style={styles.label}>
//                 EDC Bank Name <span style={styles.required}>*</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter EDC Bank Name"
//                 style={styles.input}
//                 value={posDetails.edcBankName}
//                 onChange={(e) =>
//                   setPosDetails({ ...posDetails, edcBankName: e.target.value })
//                 }
//               />
//             </div>
//             <div style={styles.inputField}>
//               <label style={styles.label}>
//                 Bank Card Name <span style={styles.required}>*</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Name on card"
//                 style={styles.input}
//                 value={posDetails.cardName}
//                 onChange={(e) =>
//                   setPosDetails({ ...posDetails, cardName: e.target.value })
//                 }
//               />
//             </div>
//             <div style={styles.inputField}>
//               <label style={styles.label}>
//                 Card Last 4 Digit <span style={styles.required}>*</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Card last four digit"
//                 style={styles.input}
//                 maxLength={4}
//                 value={posDetails.cardLast4Digit}
//                 onChange={(e) =>
//                   setPosDetails({ ...posDetails, cardLast4Digit: e.target.value })
//                 }
//               />
//             </div>
//           </div>
//         )}
//         {selectedModes.includes("UPI") && (
//           <div style={styles.inputGroup}>
//             <div style={styles.inputField}>
//               <label style={styles.label}>
//                 Reference number <span style={styles.required}>*</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Reference number"
//                 style={{
//                   width: "25%",
//                   height: "40px",
//                   borderRadius: "4px",
//                   boxShadow: "0px 4px 4px 0px #00000040",
//                   padding: "6px",
//                   fontSize: "12px"
//                 }}
//               />
//             </div>

//           </div>
//         )}

//         {showConfirmation && (
//           <div style={styles.modalOverlay}>
//             <div style={styles.modalContent}>
//               <div style={styles.checkIcon}>✓</div>
//               <div style={styles.header}>Payment Collected</div>
//               <div style={styles.receiptText}>
//                 Receipt Number
//                 <br />
//                 {receiptNumber}
//               </div>
//               <div style={styles.receiptText}>
//                 Total Amount Received
//                 <br />
//                 ₹{showAmount}
//               </div>
//               <button style={styles.homeButton} onClick={printReciept}>
//                 Download Receipt
//               </button>
//               <button style={styles.homeButton} onClick={() => {
//                 window.location.href = "/digit-ui/employee"; 
//               }}>
//                 Home
//               </button>
//             </div>
//           </div>)}
//         <div style={{ marginTop: "20px" }}>
//           <div style={{ ...styles.label, marginLeft: "10px" }}>
//             Remarks <span style={{ color: "red" }}>*</span>
//           </div>
//           <textarea
//             rows="3"
//             style={styles.remarkBox}
//             value={remarks}
//             onChange={(e) => setRemarks(e.target.value)}
//           />
//           {formErrors && <div style={{ color: "red", marginTop: "4px" }}>{formErrors}</div>}
//         </div>

//         <div style={{ marginTop: "20px" }}>
//           {(selectedModes.length > 0 && paymentType === "full") && (
//             <button
//               style={{
//                 ...styles.paymentButton,
//                 backgroundColor: billFetch?.totalAmount === 0 ? "#ccc" : styles.paymentButton.backgroundColor,
//                 cursor: billFetch?.totalAmount === 0 ? "not-allowed" : "pointer"
//               }}
//               onClick={() => handlePayment()}
//               disabled={billFetch?.totalAmount === 0}
//             >
//               Collect Payment
//             </button>
//           )}
//           {((selectedModes.length > 0 && paymentType === "partial")) && (
//             <button
//               style={{
//                 ...styles.paymentButton,
//                 backgroundColor: billFetch?.totalAmount === 0 ? "#ccc" : styles.paymentButton.backgroundColor,
//                 cursor: billFetch?.totalAmount === 0 ? "not-allowed" : "pointer"
//               }}
//               onClick={() => handlePaymentPartial()}
//               disabled={billFetch?.totalAmount === 0}
//             >
//               Collect Payment
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApplicationDetailsContent;

// const styles = {
//   container: { fontFamily: "Arial", padding: "20px", fontSize: "14px" },
//   section: {
//     marginBottom: "20px", marginTop: "20px", backgroundColor: "rgba(255, 255, 255, var(--bg-opacity))",
//     boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.16)",
//     padding: "16px",
//     borderRadius: "12px",
//   },
//   row: {
//     display: "grid",
//     gridTemplateColumns: "repeat(4, 1fr)",
//     gap: "10px",
//     marginBottom: "10px"
//   },
//   column: { flex: "1 1 200px", marginRight: "10px", marginBottom: "10px" },

//   columnBreak: {
//     flexBasis: "100%",
//     height: 0,
//   },
//   label: {
//     fontFamily: "Poppins, sans-serif",
//     marginBottom: "4px",
//     fontWeight: 400,
//     fontSize: "14px",
//     lineHeight: "22px",
//     letterSpacing: "0%",
//     color: "#282828"
//   },
//   button: {
//     padding: "8px 16px",
//     marginRight: "10px",
//     border: "none",
//     borderRadius: "4px",
//     backgroundColor: "#e0d4fa",
//     color: "#333",
//     cursor: "pointer",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginBottom: "20px",
//   },
//   th: {
//     backgroundColor: "#6b133f",
//     padding: "8px",
//     border: "1px solid #ccc",
//     textAlign: "left",
//     fontFamily: "Poppins",
//     fontWeight: 400,
//     fontSize: "14px",
//     lineHeight: "175%",
//     letterSpacing: "-1%",
//     verticalAlign: "middle",
//     color: "white"
//   },
//   td: {
//     padding: "8px",
//     border: "1px solid #ccc",
//     backgroundColor: "#f9f9f9",
//     fontFamily: "Poppins",
//     fontWeight: 400,
//     fontSize: "13px",
//     lineHeight: "100%",
//     letterSpacing: "1%",
//     verticalAlign: "middle",
//     color: "#323C47"
//   },
//   checkboxGroup: {
//     display: "flex", gap: "15px", marginLeft: "10px", fontFamily: "Poppins, sans-serif",
//     fontWeight: 500,
//     fontSize: "16px",
//     lineHeight: "100%",
//     letterSpacing: "0%", color: "#6D6969"
//   },
//   remarkBox: {
//     width: "32%",
//     minWidth: "300px",
//     height: "72px",
//     borderRadius: "4px",
//     borderWidth: "1px",
//     border: "1px solid #D9D9D9",
//     padding: "10px",
//     boxShadow: "0px 4px 4px 0px #00000040",
//     marginLeft: "10px"
//   },
//   paymentButton: {
//     padding: "10px 20px",
//     backgroundColor: "#6b133f",
//     color: "white",
//     border: "none",
//     borderRadius: "12px",
//     cursor: "pointer",
//     // float: "right",
//     display: "flex",
//     marginLeft: "auto",
//     marginRight: "10px",
//   },
//   inputGroup: {
//     display: "flex",
//     flexWrap: "wrap",
//     gap: "1rem",
//     marginTop: "10px",
//     marginLeft: "10px",
//   },
//   inputField: {
//     flex: "1 1 200px",
//     display: "flex",
//     flexDirection: "column",
//   },

//   required: {
//     color: "red",
//   },

//   input: {
//     width: "100%",
//     height: "44px",
//     padding: "0 12px",
//     borderRadius: "6px",
//     fontSize: "14px",
//     fontFamily: "'Poppins', sans-serif",
//     transition: "all 0.3s ease",
//     background: "rgb(241, 241, 241)",
//   },


//   input2: {
//     width: "100%",
//     height: "44px",
//     padding: "0 12px",
//     borderRadius: "6px",
//     fontSize: "14px",
//     fontFamily: "'Poppins', sans-serif",
//     transition: "all 0.3s ease",
//     background: "rgb(241, 241, 241)",

//   },

//   totalAmount: {
//     width: "100%",
//     height: "40px",
//     borderWidth: "1px",
//     borderStyle: "solid",
//     borderColor: "rgba(185, 185, 185, 0.6)",
//     boxShadow: "0px 4px 4px 0px #00000040",
//     padding: "6px",
//     fontSize: "12px",

//   },
//   modalOverlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100vw",
//     height: "100vh",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 1000,
//   },
//   modalContent: {
//     backgroundColor: "white",
//     padding: "2rem",
//     borderRadius: "8px",
//     minWidth: "400px",
//   },
//   modalHeader: {
//     color: "blue",
//     fontWeight: "bold",
//     fontSize: "18px",
//     marginBottom: "1rem",
//     textDecoration: "underline",
//   },
//   buttonRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginTop: "1rem",
//   },
//   cancelButton: {
//     border: "1px solid red",
//     color: "red",
//     padding: "8px 16px",
//     borderRadius: "4px",
//     backgroundColor: "white",
//     cursor: "pointer",
//   },
//   submitButton: {
//     backgroundColor: "indigo",
//     color: "white",
//     padding: "8px 16px",
//     borderRadius: "4px",
//     border: "none",
//     cursor: "pointer",
//   },
//   checkIcon: {
//     width: "60px",
//     height: "60px",
//     borderRadius: "50%",
//     backgroundColor: "black",
//     border: "3px solid green",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     margin: "0 auto 1rem",
//     fontSize: "28px",
//     color: "white",
//   },
//   header: {
//     fontWeight: "bold",
//     fontSize: "18px",
//     marginBottom: "8px",
//     textAlign: "center"
//   },
//   receiptText: {
//     color: "gray",
//     fontSize: "14px",
//     textAlign: "center"
//   },
//   homeButton: {
//     marginTop: "20px",
//     padding: "8px 20px",
//     backgroundColor: "#6b133f",
//     color: "white",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//     marginLeft: "auto",
//     marginRight: "auto",
//     display: "flex"
//   },
//   assessmentStyle: {
//     fontFamily: 'Poppins, sans-serif',
//     fontWeight: 'bold',
//     fontSize: '26px',
//     lineHeight: '100%',
//     letterSpacing: '0px',
//     textDecorationStyle: 'solid',
//     textDecorationColor: '#6b133f',
//     textDecorationThickness: '1px',
//     color: '#6b133f',
//     marginBottom: '20px',
//     textAlign: "left",

//   },
//   grid: {
//     display: "flex",
//     flexWrap: "wrap",
//     gap: "1rem",
//   },
//   flex30: {
//     flex: "1 1 30%",
//     display: "flex",
//     flexDirection: "column",
//     position: "relative",
//     minHeight: "90px",
//   },
//   textBox: {
//     height: "35px",
//     borderWidth: "1px",
//     borderRadius: "6px",
//     background: "#D2D2D280",
//     border: "0.5px solid #D2D2D280",
//     color: "black"
//   }
// };

