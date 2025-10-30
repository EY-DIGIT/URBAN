import {
  Loader,
  Card,
  SubmitBar,
  TextInput,
  Dropdown,
  CheckBox,
} from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import ApplicationDetailsSection from "../components/Applicationdetailssection";
import AttachmentsSection from "../components/Attachmentssection";
import PreviewSection from "../components/Previewsection";
import SuccessModal from "../components/Successmodal";
//import SuccessModal from "../components/SuccessModal";
import { Fragment } from "react";

const DeathCertificate = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const history = useHistory();

  const [isLoader, setIsLoader] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [acknowledgmentNumber, setAcknowledgmentNumber] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});
  const [fileResetKey, setFileResetKey] = useState(0);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Application Details State
  const [applicationDetails, setApplicationDetails] = useState({
    dateOfDeath: "",
    gender: null,
    relationName: "",
    placeOfDeath: null,
    placeOfCremation: "",
    homeAddress: "",
    zone: null,
    ward: null,
    aadhaarNumber: "",
    reporterRelationship: null,
    reporterName: "",
  });

  // Documents State
  const [documents, setDocuments] = useState({
    deceasedAadhaarFront: null,
    deceasedAadhaarBack: null,
    reporterAadhaarFront: null,
    reporterAadhaarBack: null,
    funeralReceipt: null,
  });

  const token = localStorage.getItem("token");
  const stateId = Digit.ULBService.getStateId();
  let userInfo = JSON.parse(localStorage.getItem("user-info"));
  const tenantId = userInfo?.tenantId;

  // Handle input changes for application details
  const handleInputChange = (field, value) => {
    setApplicationDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Handle dropdown changes
  const handleDropdownChange = (field, value) => {
    setApplicationDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user selects
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Handle file changes
  const handleFileChange = (key, file) => {
    if (!file) return;

    const maxSize = 2 * 1024 * 1024; // 2MB
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

    if (!allowedTypes.includes(file.type)) {
      setFormErrors((prev) => ({
        ...prev,
        [key]: "Only JPG, PNG, or PDF files are allowed",
      }));
      return;
    }

    if (file.size > maxSize) {
      setFormErrors((prev) => ({
        ...prev,
        [key]: "File size must not exceed 2MB",
      }));
      return;
    }

    // Clear previous error
    setFormErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });

    setDocuments((prev) => ({
      ...prev,
      [key]: { file },
    }));
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    // Validate Application Details
    if (!applicationDetails.dateOfDeath) {
      errors.dateOfDeath = "Date of Death is required";
    }
    if (!applicationDetails.gender) {
      errors.gender = "Gender is required";
    }
    if (!applicationDetails.relationName?.trim()) {
      errors.relationName = "Father/Husband/Mother/Wife name is required";
    }
    if (!applicationDetails.placeOfDeath) {
      errors.placeOfDeath = "Place of Death is required";
    }
    if (!applicationDetails.placeOfCremation?.trim()) {
      errors.placeOfCremation = "Place of Cremation is required";
    }
    if (!applicationDetails.zone) {
      errors.zone = "Zone is required";
    }
    if (!applicationDetails.ward) {
      errors.ward = "Ward is required";
    }
    if (!applicationDetails.reporterRelationship) {
      errors.reporterRelationship = "Relationship with Deceased is required";
    }
    if (!applicationDetails.reporterName?.trim()) {
      errors.reporterName = "Reporter's Name is required";
    }

    // Validate Documents
    if (!documents.deceasedAadhaarFront) {
      errors.deceasedAadhaarFront = "Deceased's Aadhaar Card (Front) is required";
    }
    if (!documents.deceasedAadhaarBack) {
      errors.deceasedAadhaarBack = "Deceased's Aadhaar Card (Back) is required";
    }
    if (!documents.reporterAadhaarFront) {
      errors.reporterAadhaarFront = "Reporter's Aadhaar Card (Front) is required";
    }
    if (!documents.reporterAadhaarBack) {
      errors.reporterAadhaarBack = "Reporter's Aadhaar Card (Back) is required";
    }
    if (!documents.funeralReceipt) {
      errors.funeralReceipt = "Funeral Receipt/Hospital Acknowledgement is required";
    }

    return errors;
  };

  // Build document payload for API
  const buildDocumentPayload = (docs) => {
    return Object.entries(docs)
      .filter(([_, doc]) => doc?.file)
      .map(([key, doc]) => ({
        documentType: key,
        fileStoreId: doc.fileStoreId || null,
        fileName: doc.file.name,
      }));
  };

  // Handle preview
  const handlePreview = () => {
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Clear any errors and switch to preview mode
    setFormErrors({});
    setServerErrors({});
    setIsPreviewMode(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle back to edit
  const handleBackToEdit = () => {
    setIsPreviewMode(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle form submission
  const handleSubmit = async () => {
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsLoader(true);

    try {
      // Upload documents first
      const uploadPromises = Object.entries(documents)
        .filter(([_, doc]) => doc?.file && !doc?.fileStoreId)
        .map(async ([key, doc]) => {
          const formData = new FormData();
          formData.append("file", doc.file);
          formData.append("tenantId", tenantId);
          formData.append("module", "death-certificate");

          const uploadResponse = await Digit.UploadServices.Filestorage(
            "death-certificate",
            formData,
            tenantId
          );

          return {
            key,
            fileStoreId: uploadResponse?.data?.files?.[0]?.fileStoreId,
          };
        });

      const uploadResults = await Promise.all(uploadPromises);

      // Update documents with fileStoreIds
      const updatedDocs = { ...documents };
      uploadResults.forEach(({ key, fileStoreId }) => {
        if (fileStoreId) {
          updatedDocs[key] = {
            ...updatedDocs[key],
            fileStoreId,
          };
        }
      });

      const documentsPayload = buildDocumentPayload(updatedDocs);

      // Create application payload
      const payload = {
        DeathCertificate: {
          tenantId: tenantId,
          dateOfDeath: applicationDetails.dateOfDeath,
          gender: applicationDetails.gender?.code || applicationDetails.gender,
          relationName: applicationDetails.relationName,
          placeOfDeath: applicationDetails.placeOfDeath?.code || applicationDetails.placeOfDeath,
          placeOfCremation: applicationDetails.placeOfCremation,
          homeAddress: applicationDetails.homeAddress || "",
          zone: applicationDetails.zone?.code || applicationDetails.zone,
          ward: applicationDetails.ward?.code || applicationDetails.ward,
          aadhaarNumber: applicationDetails.aadhaarNumber || "",
          reporterRelationship: applicationDetails.reporterRelationship?.code || applicationDetails.reporterRelationship,
          reporterName: applicationDetails.reporterName,
          documents: documentsPayload,
          applicantInfo: {
            name: userInfo?.name || "",
            mobileNumber: userInfo?.mobileNumber || "",
          },
        },
      };

      // Submit the application (replace with actual API call)
      // const response = await YourAPIService.createDeathCertificate(payload);

      // Mock response for demo
      const mockResponse = {
        acknowledgmentNumber: "DC/2025/" + Math.floor(Math.random() * 100000),
        applicationId: "APP" + Date.now(),
      };

      setAcknowledgmentNumber(mockResponse.acknowledgmentNumber);
      setApplicationId(mockResponse.applicationId);
      setShowSuccessModal(true);

    } catch (error) {
      console.error("Submission error:", error);
      const apiErrors = error?.response?.data?.Errors || error?.Errors || [];
      const newErrors = {};
      apiErrors.forEach((apiErr) => {
        newErrors[apiErr.code] = apiErr.message;
      });
      setServerErrors(newErrors);
    } finally {
      setIsLoader(false);
    }
  };

  if (isLoader) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      {!showSuccessModal && (
        <div>
          {/* Show Preview Mode */}
          {isPreviewMode ? (
            <>
              <div style={styles.previewHeader}>
                <h2 style={styles.previewTitle}>{t("Preview Application")}</h2>
                <p style={styles.previewSubtitle}>
                  {t("Please review your application details before proceeding to payment")}
                </p>
              </div>

              <PreviewSection
                t={t}
                applicationDetails={applicationDetails}
                documents={documents}
                styles={styles}
              />

              {/* Preview Mode Buttons */}
              <div style={styles.buttonContainer}>
                <button onClick={handleBackToEdit} style={styles.backButton}>
                  {t("Back to Edit")}
                </button>
                <button onClick={handleSubmit} style={styles.proceedButton}>
                  {t("Proceed to Payment")}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Show Edit Mode - Application Details Section */}
              <div style={styles.card}>
                <div style={styles.sectionHeader}>{t("Application Details")}</div>
                <ApplicationDetailsSection
                  t={t}
                  applicationDetails={applicationDetails}
                  handleInputChange={handleInputChange}
                  handleDropdownChange={handleDropdownChange}
                  formErrors={formErrors}
                  styles={styles}
                />
              </div>

              {/* Attachments Section */}
              <div style={styles.card}>
                <AttachmentsSection
                  t={t}
                  handleFileChange={handleFileChange}
                  formErrors={formErrors}
                  documents={documents}
                  resetKey={fileResetKey}
                />
              </div>

              {/* Global error messages from backend */}
              {Object.keys(serverErrors).length > 0 && (
                <div style={styles.errorContainer}>
                  <strong style={styles.errorHeader}>
                    <span style={styles.errorIcon}>⚠️</span>
                    Submission Failed
                  </strong>
                  <ul style={styles.errorList}>
                    {Object.entries(serverErrors).map(([key, msg]) => (
                      <li key={key} style={styles.errorItem}>
                        {msg}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Preview Button */}
              <div style={styles.buttonContainer}>
                <button onClick={handlePreview} style={styles.previewButton}>
                  {t("Preview")}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {showSuccessModal && (
        <SuccessModal
          t={t}
          applicationNumber={acknowledgmentNumber}
          applicationId={applicationId}
          onClose={() => {
            setShowSuccessModal(false);
            history.push("/citizen/death-certificate/home");
          }}
          styles={styles}
        />
      )}
    </React.Fragment>
  );
};

// Inline styles
const styles = {
  card: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "24px",
    marginBottom: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  sectionHeader: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#6B133F",
    marginBottom: "20px",
    fontFamily: "Poppins, sans-serif",
  },
  previewHeader: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "24px",
    marginBottom: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  previewTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#6B133F",
    marginBottom: "8px",
    fontFamily: "Poppins, sans-serif",
  },
  previewSubtitle: {
    fontSize: "14px",
    color: "#666",
    margin: 0,
    fontFamily: "Poppins, sans-serif",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    marginTop: "24px",
    marginBottom: "24px",
  },
  previewButton: {
    backgroundColor: "#6b133f",
    color: "#fff",
    border: "none",
    padding: "12px 48px",
    borderRadius: "4px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    fontFamily: "Poppins, sans-serif",
    transition: "background-color 0.3s",
  },
  backButton: {
    backgroundColor: "#fff",
    color: "#6b133f",
    border: "2px solid #6b133f",
    padding: "12px 48px",
    borderRadius: "4px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    fontFamily: "Poppins, sans-serif",
    transition: "all 0.3s",
  },
  proceedButton: {
    backgroundColor: "#6b133f",
    color: "#fff",
    border: "none",
    padding: "12px 48px",
    borderRadius: "4px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    fontFamily: "Poppins, sans-serif",
    transition: "background-color 0.3s",
    boxShadow: "0 2px 8px rgba(107, 19, 63, 0.3)",
  },
  errorContainer: {
    marginTop: "16px",
    padding: "14px 18px",
    borderLeft: "4px solid #dc3545",
    borderRadius: "8px",
    background: "rgba(220, 53, 69, 0.1)",
    color: "#611a15",
    fontSize: "14px",
    fontFamily: "Poppins, sans-serif",
    boxShadow: "0 4px 8px rgba(220, 53, 69, 0.2)",
  },
  errorHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
    fontWeight: "600",
  },
  errorIcon: {
    fontSize: "18px",
    marginRight: "8px",
  },
  errorList: {
    margin: 0,
    paddingLeft: "18px",
  },
  errorItem: {
    marginBottom: "4px",
  },
  formSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "20px",
  },
  flex30: {
    flex: "1 1 30%",
    minWidth: "250px",
  },
  poppinsLabel: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
    marginBottom: "8px",
    fontFamily: "Poppins, sans-serif",
  },
  mandatory: {
    color: "red",
    marginLeft: "4px",
  },
  widthInput: {
    width: "100%",
    minWidth: "250px",
  },
};

export default DeathCertificate;