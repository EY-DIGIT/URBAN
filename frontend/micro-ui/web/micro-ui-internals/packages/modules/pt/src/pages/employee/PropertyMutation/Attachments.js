
import React, { useState, useEffect } from "react";

const AttachmentsSection = ({
  t = (label) => label,
  handleFileChange,
  formErrors = {},
  resetKey,
  documents = {},
}) => {
  const [fileUrls, setFileUrls] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [othersFields, setOthersFields] = useState([]);

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
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const renderFileInput = (id, label, isRequired = false, showDelete = false) => {
    const doc = documents[id];
    const fileStoreId = doc?.fileStoreId;
    const fileUrl = fileStoreId ? fileUrls[fileStoreId]?.split(",")[0] : null;

    // If user already selected a new file, display its name, else display existing doc name or placeholder
    const selectedFileName = doc?.file?.name;

    return (
      <div key={id} style={styles.fileBox}>
        <div style={styles.iconBox}>{renderSvg()}</div>
        <div style={styles.labelArea}>
          <label style={styles.fileLabel}>
            {t(label)} {isRequired && <span style={{ color: "red" }}>*</span>}
          </label>
          {/* <div style={styles.descText}>JPG, PNG or PDF, file size no more than 2MB</div> */}
          {/* <div style={styles.descText}>Accepts: Aadhaar, Driving License, Pan Card, Voter ID</div> */}
        </div>

        <input
          key={`${id}_${resetKey}`}
          id={id}
          type="file"
          style={{ display: "none" }}
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={(e) => onFileChange(id, e.target.files[0])}
           disabled={true}
        />

        <div style={styles.buttonArea}>
          {/* Show View link only if file URL is available */}
          {fileUrl && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...styles.selectBtn, marginRight: "10px" }}
            >
              View
            </a>
          )}

          <label htmlFor={id} style={styles.selectBtn}>
            {selectedFileName || "SELECT FILE"}
          </label>

        </div>

        {showDelete && (
          <button
            type="button"
            onClick={() => handleDeleteField(id)}
            style={styles.deleteBtn}
          >
            ✕
          </button>
        )}

        {(formErrors?.[id]) && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {formErrors[id]}
          </p>
        )}
      </div>
    );
  };

  const handleAddMore = () => {
    setOthersFields((prev) => [...prev, `others_${prev.length + 1}`]);
  };

  const handleDeleteField = (fieldId) => {
    setOthersFields((prev) => prev.filter((id) => id !== fieldId));
  };

  return (
    <div style={styles.wrapper}>
      <h3 style={styles.header}>Attachments</h3>
      <p style={styles.subHeader}>
        (*Accepted File Type: JPG/PNG/PDF **Maximum File Size: 2MB)
      </p>

      <div
        style={{
          ...styles.gridContainer,
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
        }}
      >
        {renderFileInput("photoId", "Proof of Identity", true)}
        {renderFileInput("ownershipDoc", "Proof of Ownership", true)}
        {renderFileInput("sellersRegistry", "Others", false)}

        {/* Render dynamic others fields */}
        {/* {othersFields.map((field) =>
          renderFileInput(field, "Others", false, true)
        )} */}
        {othersFields.length > 0 && (
          othersFields.map((field, index) =>
            renderFileInput(field, "Others", false, true)
          )
        )}
        {/* <div style={styles.fileBoxff}>
          <button type="button" onClick={handleAddMore} style={styles.addMoreBtn}>
            + Add More
          </button>
        </div> */}
           {/* Add More button always comes after Others */}
           <div style={{ display: "flex", alignItems: "center" }}>
          <button
            type="button"
            onClick={handleAddMore}
            style={{
              ...styles.addMoreBtn,
              opacity:
                documents?.sellersRegistry?.file &&
                  othersFields.length < 3 &&
                  othersFields.every((field) => documents?.[field]?.file)
                  ? 1
                  : 0.5,
              cursor:
                documents?.sellersRegistry?.file &&
                  othersFields.length < 3 &&
                  othersFields.every((field) => documents?.[field]?.file)
                  ? "pointer"
                  : "not-allowed",
            }}
            disabled={
              !documents?.sellersRegistry?.file ||
              othersFields.length >= 3 ||
              !othersFields.every((field) => documents?.[field]?.file)
            }
          >
            ADD MORE +
          </button>
        </div>
      </div>
    </div>
  );
};

// Example styles object (adjust as needed)
const styles = {
  wrapper: {
    background: "#fff",
    // padding: "20px",
    borderRadius: "8px",
    // boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
    // margin: "10px 0",
  },
  header: {
    fontWeight: 700,
    fontSize: "18px",
    marginBottom: "5px",
    color: "#6B133F",
  },
  subHeader: {
    fontSize: "12px",
    color: "#555",
    marginBottom: "20px",
  },
  gridContainer: {
    display: "grid",
    gap: "20px",
  },
  fileBoxff: {
    width: "90%",
  },
  fileBox: {
    width: "90%",
    border: "2px dashed #aaa",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    position: "relative",
    minHeight: "90px",
  },
  iconBox: {
    flexShrink: 0,
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
  },
  descText: {
    fontSize: "12px",
    color: "#888",
  },
  buttonArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "4px",
  },
  selectBtn: {
    backgroundColor: "#fff",
    color: "#6B133F",
    border: "1px solid #6B133F",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "400",
    textAlign: "center",
  },
  selectedFileText: {
    fontSize: "12px",
    color: "#444",
    maxWidth: "140px",
    textAlign: "right",
    wordBreak: "break-word",
  },
  addMoreBtn: {
    backgroundColor: "#fff",
    color: "#6B133F",
    border: "1px solid #6B133F",
    padding: "8px 14px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "400",
  },
  deleteBtn: {
    backgroundColor: "transparent",
    border: "none",
    color: "#aaa",
    fontSize: "16px",
    cursor: "pointer",
    position: "absolute",
    top: "0px",
    right: "5px",
    zIndex: 10,
  }
};

export default AttachmentsSection;
