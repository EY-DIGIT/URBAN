import React from "react";

const PreviewSection = ({
  t,
  applicationDetails,
  documents,
  styles,
}) => {
  // Helper function to get display value for dropdowns
  const getDisplayValue = (value) => {
    if (!value) return "N/A";
    return value.name || value.code || value;
  };

  // Helper function to format file name
  const getFileName = (doc) => {
    if (!doc) return "No file selected";
    return doc.file?.name || doc.fileName || "File uploaded";
  };

  return (
    <div>
      {/* Application Details Preview */}
      <div style={previewStyles.section}>
        <h3 style={previewStyles.sectionTitle}>{t("Application Details")}</h3>
        
        <div style={previewStyles.grid}>
          <div style={previewStyles.field}>
            <label style={previewStyles.label}>{t("Date of Death")}</label>
            <p style={previewStyles.value}>
              {applicationDetails.dateOfDeath || "N/A"}
            </p>
          </div>

          <div style={previewStyles.field}>
            <label style={previewStyles.label}>{t("Gender")}</label>
            <p style={previewStyles.value}>
              {getDisplayValue(applicationDetails.gender)}
            </p>
          </div>

          <div style={previewStyles.field}>
            <label style={previewStyles.label}>
              {t("Father/Husband/Mother/Wife of Deceased")}
            </label>
            <p style={previewStyles.value}>
              {applicationDetails.relationName || "N/A"}
            </p>
          </div>

          <div style={previewStyles.field}>
            <label style={previewStyles.label}>{t("Place of Death")}</label>
            <p style={previewStyles.value}>
              {getDisplayValue(applicationDetails.placeOfDeath)}
            </p>
          </div>

          <div style={previewStyles.field}>
            <label style={previewStyles.label}>{t("Place of Cremation")}</label>
            <p style={previewStyles.value}>
              {applicationDetails.placeOfCremation || "N/A"}
            </p>
          </div>

          <div style={previewStyles.field}>
            <label style={previewStyles.label}>{t("Home Address")}</label>
            <p style={previewStyles.value}>
              {applicationDetails.homeAddress || "N/A"}
            </p>
          </div>

          <div style={previewStyles.field}>
            <label style={previewStyles.label}>{t("Zone")}</label>
            <p style={previewStyles.value}>
              {getDisplayValue(applicationDetails.zone)}
            </p>
          </div>

          <div style={previewStyles.field}>
            <label style={previewStyles.label}>{t("Ward")}</label>
            <p style={previewStyles.value}>
              {getDisplayValue(applicationDetails.ward)}
            </p>
          </div>

          <div style={previewStyles.field}>
            <label style={previewStyles.label}>
              {t("Aadhaar Number of Deceased")}
            </label>
            <p style={previewStyles.value}>
              {applicationDetails.aadhaarNumber || "N/A"}
            </p>
          </div>

          <div style={previewStyles.field}>
            <label style={previewStyles.label}>
              {t("Relatives/Reporter's Relationship with Deceased")}
            </label>
            <p style={previewStyles.value}>
              {getDisplayValue(applicationDetails.reporterRelationship)}
            </p>
          </div>

          <div style={previewStyles.field}>
            <label style={previewStyles.label}>{t("Reporter's Name")}</label>
            <p style={previewStyles.value}>
              {applicationDetails.reporterName || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Attachments Preview */}
      <div style={previewStyles.section}>
        <h3 style={previewStyles.sectionTitle}>{t("Attachments")}</h3>
        
        <div style={previewStyles.attachmentGrid}>
          <div style={previewStyles.attachmentItem}>
            <div style={previewStyles.attachmentIcon}>📎</div>
            <div style={previewStyles.attachmentDetails}>
              <label style={previewStyles.label}>
                {t("Deceased's Aadhaar Card (Front)")}
              </label>
              <p style={previewStyles.fileName}>
                {getFileName(documents.deceasedAadhaarFront)}
              </p>
            </div>
          </div>

          <div style={previewStyles.attachmentItem}>
            <div style={previewStyles.attachmentIcon}>📎</div>
            <div style={previewStyles.attachmentDetails}>
              <label style={previewStyles.label}>
                {t("Deceased's Aadhaar Card (Back)")}
              </label>
              <p style={previewStyles.fileName}>
                {getFileName(documents.deceasedAadhaarBack)}
              </p>
            </div>
          </div>

          <div style={previewStyles.attachmentItem}>
            <div style={previewStyles.attachmentIcon}>📎</div>
            <div style={previewStyles.attachmentDetails}>
              <label style={previewStyles.label}>
                {t("Relatives/Reporter's Aadhaar Card (Front)")}
              </label>
              <p style={previewStyles.fileName}>
                {getFileName(documents.reporterAadhaarFront)}
              </p>
            </div>
          </div>

          <div style={previewStyles.attachmentItem}>
            <div style={previewStyles.attachmentIcon}>📎</div>
            <div style={previewStyles.attachmentDetails}>
              <label style={previewStyles.label}>
                {t("Relatives/Reporter's Aadhaar Card (Back)")}
              </label>
              <p style={previewStyles.fileName}>
                {getFileName(documents.reporterAadhaarBack)}
              </p>
            </div>
          </div>

          <div style={previewStyles.attachmentItem}>
            <div style={previewStyles.attachmentIcon}>📎</div>
            <div style={previewStyles.attachmentDetails}>
              <label style={previewStyles.label}>
                {t("Funeral Receipt/Hospital Acknowledgement")}
              </label>
              <p style={previewStyles.fileName}>
                {getFileName(documents.funeralReceipt)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Important Note */}
      <div style={previewStyles.noteBox}>
        <div style={previewStyles.noteIcon}>ℹ️</div>
        <p style={previewStyles.noteText}>
          {t(
            "Please review all the information carefully. Once you proceed to payment, you will not be able to modify the application details."
          )}
        </p>
      </div>
    </div>
  );
};

// Inline styles for preview
const previewStyles = {
  section: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "24px",
    marginBottom: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#6B133F",
    marginBottom: "20px",
    fontFamily: "Poppins, sans-serif",
    borderBottom: "2px solid #6B133F",
    paddingBottom: "10px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  field: {
    marginBottom: "8px",
  },
  label: {
    fontSize: "12px",
    fontWeight: "500",
    color: "#666",
    marginBottom: "4px",
    display: "block",
    fontFamily: "Poppins, sans-serif",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  value: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#333",
    margin: 0,
    padding: "8px 0",
    fontFamily: "Poppins, sans-serif",
    borderBottom: "1px solid #e9ecef",
  },
  attachmentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "16px",
  },
  attachmentItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "16px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    border: "1px solid #dee2e6",
  },
  attachmentIcon: {
    fontSize: "24px",
    flexShrink: 0,
  },
  attachmentDetails: {
    flex: 1,
  },
  fileName: {
    fontSize: "14px",
    color: "#333",
    margin: "4px 0 0 0",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "500",
    wordBreak: "break-word",
  },
  noteBox: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "16px",
    backgroundColor: "#fff3cd",
    border: "1px solid #ffc107",
    borderRadius: "8px",
    marginTop: "20px",
  },
  noteIcon: {
    fontSize: "24px",
    flexShrink: 0,
  },
  noteText: {
    fontSize: "14px",
    color: "#856404",
    margin: 0,
    fontFamily: "Poppins, sans-serif",
    lineHeight: "1.6",
  },
};

export default PreviewSection;