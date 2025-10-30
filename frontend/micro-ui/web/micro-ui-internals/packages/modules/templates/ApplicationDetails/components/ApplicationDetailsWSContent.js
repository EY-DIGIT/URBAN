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
import { Toast } from "@egovernments/digit-ui-react-components";

const ApplicationDetailsWSContent = ({
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


  const stateId = Digit.ULBService.getStateId();
  const { data: OwnerType = {}, isLoadingO } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "OwnerType") || {};
  const [ownerTypeOptions, setOwnerTypeOptions] = useState([]);
  useEffect(() => {
    if (OwnerType?.length) {
      const filteredItems = OwnerType.filter((item) => item.fromFY === "2025-26");

      if (filteredItems.length) {
        const options = filteredItems.map((item) => ({
          code: item.code,
          name: item.name,
        }));
        setOwnerTypeOptions(options);
      }
    }
  }, [isLoadingO, OwnerType]);

  // console.log("applicationDetailsapplicationDetails===",applicationDetails);
  console.log("applicationDataapplicationData===", applicationData);

  const [advancePayment, setAdvancePayment] = useState(0);
  const [manualAmount, setManualAmount] = useState("");
  const [selectedModes, setSelectedModes] = useState([]);
  const [estimateData, setEstimateData] = useState("");
  const [remarks, setRemarks] = useState("");
  const [showAmount, setShowAmount] = useState(0);
  const [amountHalfOFFull, setAmontHalfOFfull] = useState(0);
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const [defaultAmount, setDefaultAmount] = useState(0)


  const [chequeDetails, setChequeDetails] = useState({
    issueDate: "",
    chequeNumber: "",
    accountHolder: "",
    bankName: "",
  });
  const [bankTransferDetails, setBankTransferDetails] = useState({
    paymentDate: "",
    referenceNumber: "",
    accountHolder: "",
    bankName: "",
  });
  const [posDetails, setPosDetails] = useState({
    referenceNumber: "",
    edcBankName: "",
    cardName: "",
    cardLast4Digit: "",
  });

  const [isLoader, setIsLoader] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showUPIModal, setShowUPIModal] = useState(false);
  const [paymentType, setPaymentType] = useState("full");
  const [billFetch, setBillFetch] = useState(null);
  const [billFopayment, setBillFopayment] = useState(null);

  const [formErrors, setFormErrors] = useState("");
  const [selectedMode, setSelectedMode] = useState("");
  const [receiptNumber, setReceiptNumber] = useState("");
  const [errors, setErrors] = useState("");

  const tenantIdUniq = Digit.ULBService.getCurrentTenantId();
  const billData = workflowDetails?.data?.actionState?.nextActions?.[1].Bill;
  const { isLoading: assessmentLoading, mutate: assessmentMutate } = Digit.Hooks.pt.usePropertyAssessment(tenantIdUniq);
  const toggleMode = (mode) => {
    // Always set only the current mode
    setSelectedModes([mode]);
    setSelectedMode(mode);
    // Show UPI modal only when UPI is newly selected
    if (mode === "UPI") {
      setShowUPIModal(true);
    } else {
      setShowUPIModal(false);
    }
  };

  const units = applicationDetails?.applicationData?.units;

  const yearRange = Array.isArray(units) && units.length > 0
    ? units[0].toYear
    : "N/A";

  const { t } = useTranslation();
  let userInfo1 = JSON.parse(localStorage.getItem("user-info"));

  const tenantId = userInfo1?.tenantId;  
  const handleEstimate = async () => {    
    
    try {
      const  consumerCode = applicationData?.applicationNo
    const billResponse = await Digit.PaymentService.fetchBill(tenantId, {
      consumerCode,
      businessService,
    });
      const BillList = billResponse?.Bill || [];

      if (!BillList.length) {
        setShowToast({ warning: true, label: "This bill has already been paid or is not valid." });
        setTimeout(closeToast, 5000);
        return;
      }
      else
      {
        setEstimateData(BillList?.[0]);
       const  totalAmount = BillList && BillList?.[0]?.totalAmount

      const defaultAmt = parseFloat(totalAmount || 0);
        setAmontHalfOFfull(defaultAmt.toFixed(2));
      }
  } catch (error) {
    console.error("Error fetching bill:", error);
     setShowToast({ error: true, label: error});
  }
  };

  useEffect(() => {
    if (yearRange && applicationData?.applicationNo) {
      handleEstimate();
    }
  }, [yearRange, applicationData?.applicationNo]);
  // ✅ Prefill manualAmount with 50% when bill is fetched
  useEffect(() => {
    if (billData?.totalAmount && !manualAmount) {
      const total = parseFloat(billData.totalAmount) || 0;
      const halfAmount = total * 0.5;
      setManualAmount(Math.round(halfAmount)); // ✅ round off to nearest integer
    }
  }, [billData]);

  const closeToast = () => {
    setShowToast(null);
  };
  const handlePaymentPartial = async () => {
    console.log("manualAmount", manualAmount)
    const tenantId = billData?.tenantId || "pg.citya";
    const consumerCode = applicationData?.propertyId;
    const selectedPaymentMode = selectedMode;

    setIsLoader(true);
    try {
      // ✅ Fetch fresh bill before processing
      const billResponse = await Digit.PTService.fetchPaymentDetails({
        tenantId,
        consumerCodes: consumerCode,
      });

      const BillList = billResponse?.Bill || [];

      // ❌ Abort if bill is already paid or not found
      // if (!BillList.length) {
      //   alert("❌ This bill has already been paid or is not valid.");
      //   return;
      // }

      const bill = BillList[0];
      const totalAmount = parseFloat(bill.totalAmount) || 0;

      // ✅ Validate manualAmount
      let amountToPay = totalAmount;
      if (manualAmount === "" || isNaN(parseFloat(manualAmount))) {
        //alert("⚠️ Please enter a valid payment amount.");
        setShowToast({ warning: true, label: "Estimate error:" });
        setTimeout(closeToast, 5000);
        return;
      }

      if (manualAmount !== "" && !isNaN(parseFloat(manualAmount))) {
        const enteredAmount = parseFloat(manualAmount);

        if (enteredAmount < totalAmount * 0.5) {
          //alert("⚠️ Payment amount cannot be less than 50% of total due.");
          setShowToast({ warning: true, label: "Payment amount cannot be less than 50% of total due." });
          setTimeout(closeToast, 5000);
          return;
        }
        if (enteredAmount >= totalAmount) {
          // alert("⚠️ Payment amount must be less than 100% of total due.");
          setShowToast({ warning: true, label: "Payment amount must be less than 100% of total due" });
          setTimeout(closeToast, 5000);
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
          ...(selectedPaymentMode === "NEFT" || selectedPaymentMode === "RTGS"
            ? {
              instrumentDate: bankTransferDetails?.paymentDate
                ? new Date(bankTransferDetails.paymentDate).getTime()
                : new Date().getTime(),
              instrumentNumber:
                bankTransferDetails?.referenceNumber || Date.now().toString(),
              accountHolderName:
                bankTransferDetails?.accountHolder || "Unknown User",
              bankName: bankTransferDetails?.bankName || "N/A",
            }
            : {}),
          ...(selectedPaymentMode === "Cheque"
            ? {
              instrumentDate: chequeDetails?.issueDate
                ? new Date(chequeDetails.issueDate).getTime()
                : new Date().getTime(),
              instrumentNumber: chequeDetails?.chequeNumber || Date.now().toString(),
              chequeDrawerName: chequeDetails?.accountHolder || "Unknown User",
              bankName: chequeDetails?.bankName || "N/A",
            }
            : {}),
        }
      };

      // ✅ Make the API call
      const response = await Digit.PaymentService.createReciept(tenantId, receiptRequest);
      const totalAmountPaid = response?.Payments?.[0]?.paymentDetails?.[0]?.totalAmountPaid;
      setShowAmount(totalAmountPaid)
      // ✅ Invalidate cache & show confirmation
      const receiptNumber = response?.Payments?.[0]?.paymentDetails?.[0]?.receiptNumber;
      setReceiptNumber(receiptNumber);
      setShowPaymentConfirmation(false)
      setShowConfirmation(true);      
      setFormErrors("");
    } catch (error) {
      const errorMsg = error?.response?.data?.Errors?.map((e) => e?.code)?.join(", ");
      setFormErrors(errorMsg || "Unknown error while processing payment");
    } finally {
      setIsLoader(false);
    }
  };

  console.log("Application====", applicationData);

  const handlePayment = async () => {
    const tenantId = applicationData?.tenantId;// billData?.tenantId || "pg.citya";
    const consumerCode = applicationData?.applicationNo;
    const selectedPaymentMode = selectedMode; // e.g. "CARD" | "CASH" | "CHEQUE"


    setIsLoader(true);

    try {
      // ✅ Fetch fresh bill before processing
      let businessService = "WS"
      // ✅ Construct dynamic receipt request
      const receiptRequest = {
        Payment: {
          mobileNumber: estimateData?.mobileNumber || "9999999999",
          paymentDetails: [
            {
              businessService: estimateData?.businessService,
              billId: estimateData?.id,
              totalDue: estimateData?.totalAmount,
              totalAmountPaid: estimateData?.totalAmount,
              remarks: remarks,
            },
          ],
          tenantId: estimateData?.tenantId || tenantId,
          totalDue: estimateData?.totalAmount,
          totalAmountPaid: estimateData?.totalAmount,
          paymentMode: selectedPaymentMode,
          payerName: estimateData?.payerName || "Unknown User",
          paidBy: "OWNER",

          // Instrument details – can be filled dynamically from POS SDK
          transactionNumber: Date.now().toString(), // Example: unique TXN ID
          ...(selectedPaymentMode === "NEFT" || selectedPaymentMode === "RTGS"
            ? {
              instrumentDate: bankTransferDetails?.paymentDate
                ? new Date(bankTransferDetails.paymentDate).getTime()
                : new Date().getTime(),
              instrumentNumber:
                bankTransferDetails?.referenceNumber || Date.now().toString(),
              accountHolderName:
                bankTransferDetails?.accountHolder || "Unknown User",
              bankName: bankTransferDetails?.bankName || "N/A",
            }
            : {}),
          ...(selectedPaymentMode === "Cheque"
            ? {
              instrumentDate: chequeDetails?.issueDate
                ? new Date(chequeDetails.issueDate).getTime()
                : new Date().getTime(),
              instrumentNumber: chequeDetails?.chequeNumber || Date.now().toString(),
              chequeDrawerName: chequeDetails?.accountHolder || "Unknown User",
              bankName: chequeDetails?.bankName || "N/A",
            }
            : {}),
        }
      };
      console.log("💡 Receipt Request:", receiptRequest);

      const response = await Digit.PaymentService.createReciept(
        tenantId,
        receiptRequest
      );



      // ✅ Success handling
      const receiptNumber =
        response?.Payments?.[0]?.paymentDetails?.[0]?.receiptNumber;
      const totalAmountPaid =
        response?.Payments?.[0]?.paymentDetails?.[0]?.totalAmountPaid;

      setShowAmount(totalAmountPaid);
      setReceiptNumber(receiptNumber);
      setShowPaymentConfirmation(false)
      setShowConfirmation(true);
      //fetchBill();
      setFormErrors("");
    } catch (error) {


      const errorMsg = error?.response?.data?.Errors?.map((e) => e?.code)?.join(", ");


      if (errorMsg?.includes("BILL_ALREADY_PAID")) {
        setFormErrors("This bill is already paid.");
      } else if (errorMsg?.includes("BILL_EXPIRED")) {
        setFormErrors("This bill has expired. Please regenerate.");
      } else {
        setFormErrors(errorMsg || "Payment failed. Please try again.");
      }
    } finally {
      setIsLoader(false);
    }
  };
  const handlePaymentConfirm = () => {
    if (!remarks.trim()) {
      setFormErrors("Remarks are required.");

      return;
    }
    if (selectedMode === "NEFT" || selectedMode === "RTGS") {
      if (
        !bankTransferDetails?.paymentDate ||
        !bankTransferDetails?.referenceNumber ||
        !bankTransferDetails?.accountHolder ||
        !bankTransferDetails?.bankName
      ) {
        setFormErrors(
          "For NEFT/RTGS, Payment Date, Reference Number, Account Holder, and Bank Name are required."
        );
        return;
      }
    }

    // CHEQUE validation
    if (selectedMode === "Cheque") {
      if (
        !chequeDetails?.issueDate ||
        !chequeDetails?.chequeNumber ||
        !chequeDetails?.accountHolder ||
        !chequeDetails?.bankName
      ) {
        setFormErrors(
          "For Cheque, Cheque Date, Cheque Number, Cheque Drawer Name, and Bank Name are required."
        );
        return;
      }
    }
    setShowPaymentConfirmation(true)
  }
  const handlePaymentCancel = () => {
    setShowPaymentConfirmation(false)
  }


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
    console.log("PAYMENTS=", payments)
    let response = { filestoreIds: [payments.Payments[0]?.fileStoreId] };

    if (!payments.Payments[0]?.fileStoreId) {
      const paymentsWithCalculation = payments.Payments.map(payment => ({
        ...payment,
        //Calculation: estimateData?.Calculation?.[0] || {},
        //plotArea: applicationData?.landArea,
        isCheque: selectedMode === "Cheque" ? 1 : 0,
        chequeDetails: chequeDetails,
        ward: applicationData?.address?.ward,
        zone: applicationData?.address?.zone,
        rateZone: applicationData?.address?.locality?.name,
        address: applicationData?.address?.doorNo + " ," + applicationData?.address?.street + "  ," + applicationData?.address?.locality?.name + "  ," + applicationData?.address?.pincode
      }));
      response = await Digit.PaymentService.generatePdf(state, { Payments: paymentsWithCalculation }, generatePdfKey);
    }
    const fileStore = await Digit.PaymentService.printReciept(state, { fileStoreIds: response.filestoreIds[0] });
    window.open(fileStore[response.filestoreIds[0]], "_blank");
  };
  if (assessmentLoading) {
    return <Loader />;
  }

  const { data: RoadFactors, isLoading: { } } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "RoadFactor");
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


  if (isLoader) {
    return <Loader />;
  }

  // ✅ handle user input
  // const handleAmountChange = (e) => {
  //   const entered = parseFloat(e.target.value) || 0;
  //   setAmontHalfOFfull(e.target.value);

  //   // Advance = entered - defaultAmount, but min 0
  //   const arrear = parseFloat(estimateData.Calculation[0].arrear || 0);
  //   const currentYear = parseFloat(estimateData.Calculation[0].currentYearTax || 0);
  //   const previousBalance = parseFloat(estimateData.Calculation[0].previousBalance || 0);
  //   const defaultAmt = arrear + currentYear - previousBalance;

  //   const advance = entered - defaultAmt;

  //   setAdvancePayment(advance > 0 ? advance.toFixed(2) : "0.00");
  // };
  const handleAmountChange = (e) => {
    const value = e.target.value;

    // Allow empty input so user can clear the field
    if (value === "") {
      setAmontHalfOFfull("");
      setAdvancePayment("0.00");
      setErrors("");
      return;
    }

    const entered = parseFloat(value);

    // Default calculation

    const defaultAmt = parseFloat(estimateData.Calculation[0].taxAmount || 0);

    // Validate entered amount
    if (entered < defaultAmt) {
      setErrors(`Amount should be at least ${defaultAmt.toFixed(2)}`);
      setAdvancePayment("0.00");
    } else {
      setErrors("");
      const advance = entered - defaultAmt;
      setAdvancePayment(advance.toFixed(2));
    }

    setAmontHalfOFfull(value); // always update input value
  };

  return (
    <div>
      <div style={styles.section}>
        <div style={styles.assessmentStyle}>Consumer Details</div>
        <div style={styles.grid}>
          <div style={styles.flex30}>
            <div style={styles.label}>New Consumer ID</div>
            <input
              type="text"
              readOnly
              //propertyId
              value={applicationData?.propertyId || "N/A"}
              style={styles.input}
            />
          </div>
          <div style={styles.flex30}>
            <div style={styles.label}>Old Condumer ID</div>
            <input
              type="text"
              readOnly
              value={applicationData?.oldPropertyId || "N/A"}
              style={styles.input}
            />
          </div>
          <div style={styles.flex30}>
            <div style={styles.label}>Owner Name</div>
            <input
              type="text"
              readOnly
              value={applicationData?.connectionHolders?.[0]?.name || "N/A"}
              style={styles.input}
            />
          </div>
          <div style={styles.flex30}>
            <div style={styles.label}>Zone</div>
            <input type="text" readOnly value={zones.find((f) => f.code === applicationData?.property?.address?.zone)?.name || "N/A"} style={styles.input} />
          </div>
          <div style={styles.flex30}>
            <div style={styles.label}>Ward</div>
            <input
              type="text"
              readOnly
              value={applicationData?.property?.address?.ward || "N/A"}
              style={styles.input}
            />
          </div>
          <div style={styles.flex30}>
            <div style={styles.label}>Colony</div>
            <input
              type="text"
              readOnly
              value={applicationData?.property?.address?.locality?.name || "N/A"}
              style={styles.input}
            />
          </div>
          <div style={styles.flex30}>
            <div style={styles.label}>Door</div>
            <input
              type="text"
              readOnly
              value={applicationData?.property?.address?.doorNo || "N/A"}
              style={styles.input}
            />
          </div>

          <div style={styles.flex30}>
            <div style={styles.label}>Mobile No.</div>
            <input
              type="text"
              readOnly
              value={applicationData?.connectionHolders?.[0]?.mobileNumber || "N/A"}
              style={styles.input}
            />
          </div>
          <div style={styles.flex30}>
            <div style={styles.label}>Email ID</div>
            <input
              type="text"
              readOnly
              value={applicationData?.connectionHolders?.[0]?.emailId || "N/A"}
              style={styles.input}
            />
          </div>

          {/* <div style={styles.flex30}>
            <div style={styles.label}>Address</div>
            <input
              type="text"
              readOnly
              value={applicationData?.address?.doorNo + ", " + applicationData?.address?.street || "N/A"}
              style={styles.input}
            />
          </div> */}
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
        {/* <div style={{ marginTop: "20px", display: "flex", gap: "20px", alignItems: "center" }}>
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
              disabled
              checked={paymentType === "partial"}
              onChange={() => setPaymentType("partial")}
            />
            <span style={styles.label}>Partial Payment</span>
          </label>
        </div> */}
        {paymentType === "full" && (
          <div style={styles.grid}>

            {/* Arrear */}
            {/* <div style={styles.column}>
              <div style={styles.label}>Arrear</div>
              <input
                value={estimateData?.Calculation?.[0]?.arrear || 0}
                readOnly
                style={styles.input2}
              />
            </div> */}

            {/* Current Year */}
            {/* <div style={styles.column}>
              <div style={styles.label}>Current Year Net Tax</div>
              <input
                value={estimateData?.Calculation?.[0]?.currentYearTax || 0}
                readOnly
                style={styles.input2}
              />
            </div> */}

            {/* Previous Balance */}
            <div style={styles.column}>
              <div style={styles.label}>New Connection Fees</div>
              <input
                //disabled={parseFloat(amountHalfOFFull) < 0}
                disabled
                value={amountHalfOFFull}
                onChange={handleAmountChange}
                style={styles.input2}
              />
            </div>

            {/* Total Payment Amount */}
            <div style={styles.column}>
              <div style={styles.label}>Total Payable Amount</div>

              <input
                //disabled={parseFloat(amountHalfOFFull) < 0}
                value={amountHalfOFFull}
                onChange={handleAmountChange}
                disabled
                style={styles.input2}
              />
              {errors && <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{errors}</div>}
            </div>
            <div style={styles.columnBreak}></div>

            {/* Advance */}
            <div style={styles.column}>
              <div style={styles.label}>Advance</div>
              <input
                disabled
                value={advancePayment}
                // onChange={(e) => setAdvancePayment(e.target.value)}
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
                value={estimateData?.Calculation?.[0]?.arrear || 0}
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
        {selectedModes.includes("NEFT") || selectedModes.includes("RTGS") ? (
          <div style={styles.inputGroup}>
            <div style={styles.inputField}>
              <label style={styles.label}>
                Payment Date <span style={styles.required}>*</span>
              </label>
              <input
                type="date"
                style={styles.input}
                value={bankTransferDetails.paymentDate}
                onChange={(e) =>
                  setBankTransferDetails({
                    ...bankTransferDetails,
                    paymentDate: e.target.value,
                  })
                }
              />
            </div>

            <div style={styles.inputField}>
              <label style={styles.label}>
                Reference Number <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Reference Number"
                style={styles.input}
                value={bankTransferDetails.referenceNumber}
                onChange={(e) =>
                  setBankTransferDetails({
                    ...bankTransferDetails,
                    referenceNumber: e.target.value,
                  })
                }
              />
            </div>

            <div style={styles.inputField}>
              <label style={styles.label}>
                Account Holder Name <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Account Holder Name"
                style={styles.input}
                value={bankTransferDetails.accountHolder}
                onChange={(e) =>
                  setBankTransferDetails({
                    ...bankTransferDetails,
                    accountHolder: e.target.value,
                  })
                }
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
                value={bankTransferDetails.bankName}
                onChange={(e) =>
                  setBankTransferDetails({
                    ...bankTransferDetails,
                    bankName: e.target.value,
                  })
                }
              />
            </div>
          </div>
        ) : null}

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
                window.location.href = "/digit-ui/employee/ws/WaterLandingPage";
              }}>
                Home
              </button>
            </div>
          </div>)}
        {showPaymentConfirmation && (
          <div style={styles.modalOverlay}>
            <div style={styles.confirmationModal}>
              <div style={styles.confirmationHeader}>
                <h3 style={styles.confirmationTitle}>Confirm Payment</h3>
              </div>

              <div style={styles.confirmationBody}>
                <div style={styles.amountSection}>
                  <div style={styles.amountLabel}>Payment Amount:</div>
                  <div style={styles.amountValue}>
                    ₹{paymentType === "full" ? amountHalfOFFull : manualAmount}
                  </div>
                </div>

                <div style={styles.paymentTypeSection}>
                  <div style={styles.paymentTypeLabel}>Payment Type:</div>
                  <div style={styles.paymentTypeValue}>
                    {paymentType === "full" ? "Full Payment" : "Partial Payment"}
                  </div>
                </div>

                <div style={styles.paymentModeSection}>
                  <div style={styles.paymentModeLabel}>Payment Mode:</div>
                  <div style={styles.paymentModeValue}>{selectedMode}</div>
                </div>

                <div style={styles.confirmationMessage}>
                  Are you sure you want to proceed with this payment?
                </div>
              </div>

              <div style={styles.confirmationActions}>
                <button
                  style={styles.cancelButton}
                  onClick={handlePaymentCancel}
                >
                  Cancel
                </button>
                <button
                  style={styles.confirmButton}
                  onClick={paymentType === "full" ? handlePayment : handlePaymentPartial}
                >
                  Yes, Proceed
                </button>
              </div>
            </div>
          </div>
        )}
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
              onClick={() => handlePaymentConfirm()}
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
              onClick={() => handlePaymentConfirm()}
              disabled={billFetch?.totalAmount === 0}
            >
              Collect Payment
            </button>
          )}
        </div>
      </div>
      {showToast && (
        <Toast
          error={showToast.error}
          isDleteBtn={true}
          warning={showToast.warning}
          label={t(showToast.label)}
          onClose={() => {
            setShowToast(null);
            setErrorShown(false);
          }}
        />
      )}
    </div>
  );
};

export default ApplicationDetailsWSContent;

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
    // background: "rgb(241, 241, 241)",
    background: "rgba(210, 210, 210, 0.5)",
  },


  input2: {
    width: "100%",
    height: "44px",
    padding: "0 12px",
    borderRadius: "6px",
    fontSize: "14px",
    fontFamily: "'Poppins', sans-serif",
    transition: "all 0.3s ease",
    // background: "rgb(241, 241, 241)",
    background: "rgba(210, 210, 210, 0.5)",

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
  },





  confirmationModal: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "20px",
    width: "400px",
    maxWidth: "90%",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },

  confirmationHeader: {
    borderBottom: "1px solid #e1e1e1",
    paddingBottom: "10px",
    marginBottom: "15px",
  },

  confirmationTitle: {
    margin: 0,
    color: "#333",
    fontSize: "18px",
  },

  confirmationBody: {
    marginBottom: "20px",
  },

  amountSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    padding: "8px",
    backgroundColor: "#f8f9fa",
    borderRadius: "4px",
  },

  amountLabel: {
    fontWeight: "bold",
    color: "#555",
  },

  amountValue: {
    fontWeight: "bold",
    color: "#6b133f",
    fontSize: "16px",
  },

  paymentTypeSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    padding: "8px",
  },

  paymentTypeLabel: {
    fontWeight: "bold",
    color: "#555",
  },

  paymentTypeValue: {
    color: "#333",
  },

  paymentModeSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    padding: "8px",
  },

  paymentModeLabel: {
    fontWeight: "bold",
    color: "#555",
  },

  paymentModeValue: {
    color: "#333",
  },

  confirmationMessage: {
    textAlign: "center",
    color: "#666",
    fontSize: "14px",
    marginTop: "15px",
  },

  confirmationActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },



  confirmButton: {
    padding: "8px 16px",
    backgroundColor: "#6b133f",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },

};

