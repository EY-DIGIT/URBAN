import React, { useState, useEffect } from "react";

const AttachmentsSection = ({
  t = (label) => label,
  handleFileChange,
  formErrors = {},
  resetKey,
  documents = {},
  viewMode = false,
  relationshipType = null, // Add relationship type prop
}) => {
  const [fileUrls, setFileUrls] = useState({});
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  // Generate reporter Aadhaar label based on relationship
  const getReporterAadhaarLabel = (side) => {
    const relationshipCode = relationshipType?.code || relationshipType;

    const relationMap = {
      MOTHER: t(`Mother's Aadhaar Card (${side})`),
      FATHER: t(`Father's Aadhaar Card (${side})`),
      BROTHER: t(`Brother's Aadhaar Card (${side})`),
      SISTER: t(`Sister's Aadhaar Card (${side})`),
      SON: t(`Son's Aadhaar Card (${side})`),
      DAUGHTER: t(`Daughter's Aadhaar Card (${side})`),
      WIFE: t(`Wife's Aadhaar Card (${side})`),
      HUSBAND: t(`Husband's Aadhaar Card (${side})`),
      RELATIVE: t(`Relative's Aadhaar Card (${side})`),
    };

    return relationMap[relationshipCode] || t(`Reporter's Aadhaar Card (${side})`);
  };

  // Prepare fileStoreIds array to fetch URLs
  useEffect(() => {
    const fileStoreIds = Object.values(documents)
      .filter(Boolean)
      .map((doc) => doc.fileStoreId)
      .filter(Boolean);

    if (fileStoreIds.length) {
      Digit.UploadServices.Filefetch(fileStoreIds, Digit.ULBService.getStateId())
        .then((res) => setFileUrls(res?.data || {}))
        .catch(() => setFileUrls({}));
    }
  }, [documents]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getGridColumns = () => {
    if (windowWidth <= 768) return "1fr";
    return "repeat(2, 1fr)";
  };

  const onFileChange = (key, file) => {
    handleFileChange(key, file);
  };

  const renderSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      stroke="#6b133f"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M21.44 11.05L12.97 19.51a5.25 5.25 0 01-7.42-7.42l8.48-8.48a3.5 3.5 0 014.95 4.95l-8.49 8.48a1.75 1.75 0 01-2.47-2.47l7.78-7.78" />
    </svg>
  );

  // Helper function to get file name
  const getFileName = (doc) => {
    if (!doc) return "No file selected";
    return doc.file?.name || doc.fileName || "File uploaded";
  };

  // Render attachment in view mode
  const renderViewAttachment = (id, label, isRequired = false) => {
    const doc = documents[id];
    const fileStoreId = doc?.fileStoreId;
    const fileUrl = fileStoreId ? fileUrls[fileStoreId]?.split(",")[0] : null;

    return (
      <div key={id} style={styles.viewBox}>
        <div style={styles.viewIcon}>📎</div>
        <div style={styles.viewDetails}>
          <label style={styles.viewLabel}>
            {label} {isRequired && <span style={{ color: "red" }}>*</span>}
          </label>
          <p style={styles.viewFileName}>{getFileName(doc)}</p>
          {fileUrl && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.viewLink}
            >
              View Document
            </a>
          )}
        </div>
      </div>
    );
  };

  const renderFileInput = (id, label, isRequired = false) => {
    const doc = documents[id];
    const fileStoreId = doc?.fileStoreId;
    const fileUrl = fileStoreId ? fileUrls[fileStoreId]?.split(",")[0] : null;
    const selectedFileName = doc?.file?.name;

    return (
      <div key={id} style={styles.fileBox}>
        <div style={styles.iconBox}>{renderSvg()}</div>
        <div style={styles.labelArea}>
          <label style={styles.fileLabel}>
            {label} {isRequired && <span style={{ color: "red" }}>*</span>}
          </label>
          <div style={styles.descText}>JPG, PNG or PDF, file size no more than 2MB</div>
        </div>

        <input
          key={`${id}_${resetKey}`}
          id={id}
          type="file"
          style={{ display: "none" }}
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={(e) => onFileChange(id, e.target.files[0])}
        />

        <div style={styles.buttonArea}>
          {fileUrl && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...styles.selectBtn,
                ...styles.viewBtn,
                marginRight: "10px",
                textDecoration: "none",
              }}
            >
              View
            </a>
          )}

          <label htmlFor={id} style={styles.selectBtn}>
            {selectedFileName || "SELECT FILE"}
          </label>
        </div>

        {formErrors?.[id] && (
          <p style={styles.errorText}>{formErrors[id]}</p>
        )}
      </div>
    );
  };

  if (viewMode) {
    return (
      <div style={styles.wrapper}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: getGridColumns(),
            gap: "20px",
          }}
        >
          {renderViewAttachment(
            "deceasedAadhaarFront",
            t("Deceased's Aadhaar Card (Front)"),
            false
          )}
          {renderViewAttachment(
            "deceasedAadhaarBack",
            t("Deceased's Aadhaar Card (Back)"),
            false
          )}
          {renderViewAttachment(
            "reporterAadhaarFront",
            getReporterAadhaarLabel("Front"),
            true
          )}
          {renderViewAttachment(
            "reporterAadhaarBack",
            getReporterAadhaarLabel("Back"),
            true
          )}
          {renderViewAttachment(
            "funeralReceipt",
            t("Funeral Receipt/Hospital Acknowledgement"),
            true
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <p style={styles.subHeader}>
        (*Accepted File Type: JPG/PNG/PDF **Maximum File Size: 2MB)
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: getGridColumns(),
          gap: "20px",
        }}
      >
        {renderFileInput("deceasedAadhaarFront", t("Deceased's Aadhaar Card (Front)"), false)}
        {renderFileInput("deceasedAadhaarBack", t("Deceased's Aadhaar Card (Back)"), false)}
        {renderFileInput(
          "reporterAadhaarFront",
          getReporterAadhaarLabel("Front"),
          true
        )}
        {renderFileInput(
          "reporterAadhaarBack",
          getReporterAadhaarLabel("Back"),
          true
        )}
        {renderFileInput(
          "funeralReceipt",
          t("Funeral Receipt/Hospital Acknowledgement"),
          true
        )}
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  wrapper: {
    background: "#fff",
    borderRadius: "8px",
  },
  subHeader: {
    fontSize: "12px",
    color: "#555",
    marginBottom: "20px",
    fontFamily: "Poppins, sans-serif",
  },
  fileBox: {
    border: "2px dashed #aaa",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    minHeight: "120px",
    backgroundColor: "#fff",
    transition: "border-color 0.3s",
  },
  iconBox: {
    flexShrink: 0,
    alignSelf: "flex-start",
  },
  labelArea: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
  },
  fileLabel: {
    fontWeight: "600",
    fontSize: "14px",
    marginBottom: "4px",
    color: "#333",
    fontFamily: "Poppins, sans-serif",
  },
  descText: {
    fontSize: "12px",
    color: "#888",
    fontFamily: "Poppins, sans-serif",
  },
  buttonArea: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
    marginTop: "8px",
  },
  selectBtn: {
    backgroundColor: "#fff",
    color: "#6B133F",
    border: "1px solid #6B133F",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "500",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
    transition: "all 0.3s ease",
    display: "inline-block",
    whiteSpace: "nowrap",
    maxWidth: "200px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  viewBtn: {
    backgroundColor: "#6B133F",
    color: "#fff",
  },
  errorText: {
    color: "#D4351C",
    fontSize: "12px",
    marginTop: "4px",
    fontFamily: "Poppins, sans-serif",
  },
  // View mode styles
  viewBox: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "16px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    border: "1px solid #dee2e6",
  },
  viewIcon: {
    fontSize: "24px",
    flexShrink: 0,
  },
  viewDetails: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  viewLabel: {
    fontSize: "12px",
    fontWeight: "500",
    color: "#666",
    fontFamily: "Poppins, sans-serif",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  viewFileName: {
    fontSize: "14px",
    color: "#333",
    margin: 0,
    fontFamily: "Poppins, sans-serif",
    fontWeight: "500",
    wordBreak: "break-word",
  },
  viewLink: {
    fontSize: "14px",
    color: "#6B133F",
    textDecoration: "none",
    fontWeight: "500",
    fontFamily: "Poppins, sans-serif",
    display: "inline-block",
    marginTop: "4px",
    transition: "opacity 0.3",
  },
};

export default AttachmentsSection;