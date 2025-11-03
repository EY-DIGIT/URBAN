import React, { useState } from "react";
import styles from "../employee/IndexStyle";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import {  Loader} from "@egovernments/digit-ui-react-components";
const CalculateFees = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const tenantId = Digit.ULBService.getCurrentTenantId();

  const { generalDetails, billAmount } = location.state || {};
  const [estimateResult, setEstimateResult] = useState(null);

  const [rajwadFees, setRajwadFees] = useState([
    { documentName: "Registry Document", fileStoreId: "", tenantId: "mp" },
    { documentName: "Registry Vikray Patra", fileStoreId: "", tenantId: "mp" },
    { documentName: "Registry Abhilekh", fileStoreId: "", tenantId: "mp" },
  ]);

  const [formErrors, setFormErrors] = useState({});
  const [fileResetKey, setFileResetKey] = useState(0);

  // Advertisement Fees
  const [adData, setAdData] = useState({
    type: "PER_SQ_CM",
    newspaper: "Dainik Bhaskar",
    rate: 260,
    areaSqCm: 10,
    noticeCount: 0,
  });

  const stateId = Digit.ULBService.getStateId();

  const { data: Menu = {}, isLoading } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "AdvertisementRates") || {};

  const {
    isLoading: ptCalculationEstimateLoading,
    data: ptCalculationEstimateData,
    mutate: ptCalculationEstimateMutate,
  } = Digit.Hooks.pt.usePtMutationCalculationEstimate(tenantId);

  // Handle file upload
  const handleFileChange = async (index, file) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxSizeMB = 2;

    const key = `rajwad_${index}`;
    const errors = {};

    if (!file) {
      errors[key] = "File is required.";
    } else if (!allowedTypes.includes(file.type)) {
      errors[key] = "File must be JPG, PNG, or PDF.";
    } else if (file.size / 1024 / 1024 > maxSizeMB) {
      errors[key] = "File must be under 2MB.";
    }

    setFormErrors((prev) => ({ ...prev, [key]: errors[key] || null }));

    if (errors[key]) {
      const updated = [...rajwadFees];
      updated[index].fileStoreId = "";
      setRajwadFees(updated);
      setFileResetKey((prev) => prev + 1);
      return;
    }

    try {
      const response = await Digit.UploadServices.Filestorage(
        "PT",
        file,
        Digit.ULBService.getStateId()
      );

      if (response?.data?.files?.length > 0) {
        const fileStoreId = response.data.files[0].fileStoreId;
        const updated = [...rajwadFees];
        updated[index].fileStoreId = fileStoreId;
        setRajwadFees(updated);
        setFormErrors((prev) => ({ ...prev, [key]: null }));
        alert(`${updated[index].documentName} uploaded successfully ✅`);
      } else {
        setFormErrors((prev) => ({ ...prev, [key]: "File upload failed." }));
        setFileResetKey((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setFormErrors((prev) => ({ ...prev, [key]: "File upload failed." }));
      setFileResetKey((prev) => prev + 1);
    }
  };

  const handleAdChange = (field, value) => {
    console.log("Ad Change:", field, value);
    setAdData((prev) => ({
      ...prev,
      [field]: value,
    }));

  };


  const handleEstimate = () => {
    const adPayload = {
      newspaper: adData.newspaper,
      category: "Morning Daily",
      tenantId: tenantId.split(".")[0],
      type: adData.type,
      rate: Number(adData.rate),
      ...(adData.type === "PER_SQ_CM"
        ? { areaSqCm: Number(adData.areaSqCm), noticeCount: 0 }
        : { areaSqCm: 0, noticeCount: Number(adData.noticeCount) }),
    };

    const payload = {
      propertyId: generalDetails?.propertyId,
      acknowldgementNumber: generalDetails?.acknowldgementNumber,
      tenantId: tenantId,
      rajwadFees: rajwadFees,
      advertisementFees: [adPayload],
    };

    console.log("🔹 Sending Estimate Payload:", payload);

    ptCalculationEstimateMutate(payload, {
      onSuccess: (result) => {
        console.log("✅ API Estimate Result:", result);
        // Some APIs return result.DocumentFeeCalculation while others use lowercase
        const docData = result?.DocumentFeeCalculation;
        setEstimateResult(docData);
      },
      onError: (error) => {
        console.error("❌ Estimate Error:", error);
        alert("Error calculating fees. Please try again.");
      },
    });
  };
  const handleSave = () => {
    // You can also perform save logic here before redirect
    history.push(`/digit-ui/employee/pt/PropertyNamantran/${generalDetails?.propertyId}`);
  };
  const estimateResulthdfd = estimateResult?.[0]?.rajwadFees || [];
  if(ptCalculationEstimateLoading){
    return <Loader />;
  }
  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Calculate Fees</h3>

      {/* Namantaran Fees */}
      <div style={sectionStyle}>
        <div style={styles.assessmentStyle}>Namantaran Fees</div>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Rate Zone</th>
              <th style={styles.tableHeader}>Usage Type</th>
              <th style={styles.tableHeader}>Namantaran Fees (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.tableCell}>
                {t(generalDetails?.additionalDetails?.unit?.[0]?.usageCategory)}
              </td>
              <td style={styles.tableCell}>
                {t(generalDetails?.additionalDetails?.unit?.[0]?.rateZone)}
              </td>
              <td style={styles.tableCell}>{billAmount}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Rajwad Fees */}
      <div style={sectionStyle}>
        <div style={styles.assessmentStyle}>Rajwad Fees</div>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Document Name</th>
              <th style={styles.tableHeader}>Rate Per Page (₹)</th>
              <th style={styles.tableHeader}>No. of Pages Uploaded</th>
              <th style={styles.tableHeader}>Total Amount (₹)</th>
              <th style={styles.tableHeader}>Action *</th>
            </tr>
          </thead>
          <tbody>

            {(estimateResulthdfd && estimateResulthdfd.length > 0) ||
              (rajwadFees && rajwadFees.length > 0) ? (

              (estimateResulthdfd && estimateResulthdfd.length > 0
                ? estimateResulthdfd
                : rajwadFees
              ).map((doc, index) => {
                console.log("Rajwad/Estimate Doc:", doc);

                return (
                  <tr key={index}>
                    {/* Document name */}
                    <td style={styles.tableCell}>{doc.documentName}</td>

                    {/* Rate per page */}
                    <td style={styles.tableCell}>
                      {doc.ratePerPage}
                    </td>

                    {/* Pages uploaded */}
                    <td style={styles.tableCell}>
                      {doc.pagesUploaded}
                    </td>

                    {/* Total amount */}
                    <td style={styles.tableCell}>
                      {doc.totalAmount}
                    </td>

                    {/* File action */}
                    <td style={styles.tableCell}>
                      {doc.fileStoreId ? (
                        <a
                          href={Digit.Utils.getFileUrl(doc.fileStoreId)}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#7b004b", textDecoration: "none" }}
                        >
                          View File
                        </a>
                      ) : (
                        <div>
                          <input
                            key={fileResetKey}
                            type="file"
                            accept=".pdf,.png,.jpg,.jpeg"
                            onChange={(e) => handleFileChange(index, e.target.files[0])}
                          />
                          {formErrors[`rajwad_${index}`] && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {formErrors[`rajwad_${index}`]}
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", color: "gray" }}>
                  No Rajwad fees data available.
                </td>
              </tr>
            )}



          </tbody>
        </table>
      </div>

      {/* Advertisement Fees */}
      <div style={sectionStyle}>
        <div style={styles.assessmentStyle}>Advertisement Fees</div>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Select Type *</th>
              <th style={styles.tableHeader}>Newspaper *</th>
              <th style={styles.tableHeader}>Rate (₹) *</th>
              <th style={styles.tableHeader}>Area (Sq cm) *</th>
              <th style={styles.tableHeader}>Notice Count *</th>
              <th style={styles.tableHeader}>Total Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* Select Type */}
              <td style={styles.tableCell}>
                <select
                  value={adData.type}
                  onChange={(e) => {
                    const selectedType = e.target.value;
                    handleAdChange("type", selectedType);
                    // Reset newspaper and rate when type changes
                    setAdData((prev) => ({
                      ...prev,
                      newspaper: "",
                      rate: "",
                    }));
                  }}
                  style={{ width: "100%", padding: "6px" }}
                >
                  <option value="">Select Type</option>
                  {[
                    ...new Set(
                      (Menu?.PropertyTax?.AdvertisementRates || []).map((item) => item.rateType)
                    ),
                  ].map((rateType) => (
                    <option key={rateType} value={rateType}>
                      {rateType === "PER_SQ_CM" ? "Per Sq cm" : "Per Notice"}
                    </option>
                  ))}
                </select>
              </td>

              {/* Newspaper dropdown */}
              <td style={styles.tableCell}>
                <select
                  value={adData.newspaper}
                  onChange={(e) => {
                    const selectedCode = e.target.value;
                    const selectedNewspaper = (Menu?.PropertyTax?.AdvertisementRates || []).find(
                      (item) => item.name === selectedCode
                    );
                    handleAdChange("newspaper", selectedCode);
                    handleAdChange("rate", selectedNewspaper?.rate || "");
                  }}
                  disabled={!adData.type}
                  style={{ width: "100%", padding: "6px" }}
                >
                  <option value="">Select Newspaper</option>
                  {(Menu?.PropertyTax?.AdvertisementRates || [])
                    .filter((item) => item.rateType === adData.type)
                    .map((item) => (
                      <option key={item.code} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </td>

              {/* Rate (auto-filled) */}
              <td style={styles.tableCell}>
                <input
                  type="number"
                  value={adData.rate}
                  readOnly
                  style={{
                    width: "100%",
                    padding: "6px",
                    backgroundColor: "#f2f2f2",
                    color: "#555",
                  }}
                />
              </td>

              {/* Area Sq cm */}
              <td style={styles.tableCell}>
                <input
                  type="number"
                  value={adData.areaSqCm}
                  disabled={adData.type !== "PER_SQ_CM"}
                  onChange={(e) => handleAdChange("areaSqCm", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "6px",
                    backgroundColor: adData.type !== "PER_SQ_CM" ? "#eee" : "",
                  }}
                />
              </td>

              {/* Notice Count */}
              <td style={styles.tableCell}>
                <input
                  type="number"
                  value={adData.noticeCount}
                  disabled={adData.type !== "PER_NOTICE"}
                  onChange={(e) => handleAdChange("noticeCount", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "6px",
                    backgroundColor: adData.type !== "PER_NOTICE" ? "#eee" : "",
                  }}
                />
              </td>

              {/* Total Amount (calculated or from API) */}
              <td style={styles.tableCell}>{estimateResult?.[0]?.totalAmount}</td>
            </tr>

          </tbody>
        </table>

        <div style={saveContainer}>
          <button style={saveButton} onClick={handleSave}>
            Back
          </button>

          <button style={saveButton} onClick={handleEstimate}>
            Calculate
          </button>

          {estimateResult &&
            <button style={saveButton} onClick={handleSave}>
              Save
            </button>
          }
        
        </div>
      </div>
    </div>
  );
};

// Inline styles
const containerStyle = {
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#f6f6fa",
};
const sectionStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  marginBottom: "20px",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
};
const titleStyle = {
  color: "#6c0047",
  fontWeight: "bold",
  fontSize: "18px",
  marginBottom: "10px",
};
const tableStyle = { width: "100%", borderCollapse: "collapse", fontSize: "14px" };
const saveContainer = { display: "flex", justifyContent: "center", paddingTop: "20px", gap: "20px" };
const saveButton = {
  backgroundColor: "#7b004b",
  color: "white",
  border: "none",
  padding: "10px 40px",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
};

export default CalculateFees;

