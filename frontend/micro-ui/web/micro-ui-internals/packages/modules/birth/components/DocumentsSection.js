import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./IndexStyle"
import { Dropdown, TextInput, Loader } from "@egovernments/digit-ui-react-components";

const AttachmentsSection = () => {
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedRelation, setSelectedRelation] = useState({ code: "Father", value: "RelationFather" }); // Default to Father object

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFileUpload = (documentType, file) => {
    setUploadedFiles(prev => ({
      ...prev,
      [documentType]: file
    }));
  };

  const handleRelationChange = (selected) => {
    setSelectedRelation(selected);
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const history = useHistory();

  const handleSubmitClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    // Navigate to SuccessModal page
    setShowConfirmModal(false);
    history.push("/digit-ui/citizen/birth/birthcertificate-success");
  };

  const handleBack = () => {
    setShowConfirmModal(false);
  };


  const getDocumentSections = () => {
    const relationLabel = selectedRelation?.code === "Relative's/Reporter" ? "Relative's/Reporter" : selectedRelation?.code || "Father";
    
    return [
      {
        id: 'aadhaar_front',
        title: `Aadhaar Card of ${relationLabel} (Front)`,
        required: true,
        description: 'JPG, PNG, SVG or PDF, file size no more than 25MB'
      },
      {
        id: 'aadhar_back',
        title: `Aadhaar Card of ${relationLabel} (Back)`,
        required: true,
        description: 'JPG, PNG, SVG or PDF, file size no more than 25MB'
      },
      {
        id: 'hospital_discharge',
        title: 'Hospital Discharge Card/Acknowledgement',
        required: true,
        description: 'JPG, PNG, SVG or PDF, file size no more than 25MB'
      }
    ];
  };

  const documentSections = getDocumentSections();

  return (
    
    <div style={{ ...styles.card, marginLeft: "10px", marginRight: "10px", marginTop: "10px", marginBottom: "10px" }}>
      <div style={{color: "rgb(107, 19, 63)", fontSize: "14px"}}>Please Select Relationship With Child<span className="mandatory" style={styles.mandatory}>*</span></div>
      <div className="form-section" style={styles.formSection}>


                <div style={styles.flex30}>
                  <Dropdown
                    option={[
                      { code: "Father", value: "RelationFather" },
                      { code: "Mother", value: "RelationMother" },
                      { code: "Relative's/Reporter", value: "RelationRelative" }
                    ]}
                    optionKey="code"
                    t={(key) => key}
                    selected={selectedRelation}
                    select={handleRelationChange}
                    placeholder="Select"
                    style={styles.widthInput}
                  />
                </div> 
      
                {/* blank only */}
                <div style={styles.flex30}></div>
                <div style={styles.flex30}></div>
      
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '20px',
          maxWidth: '1200px'
        }}>
          {documentSections.map((doc) => (
            <div
              key={doc.id}
              style={{
                border: '2px dashed #ddd',
                borderRadius: '8px',
                padding: isMobile ? '15px' : '20px',
                backgroundColor: 'white',
                minHeight: isMobile ? 'auto' : '120px',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'center' : 'center',
                gap: isMobile ? '15px' : '20px',
                textAlign: isMobile ? 'center' : 'left'
              }}
            >
              {/* Upload Icon - Left */}
              <div style={{
                flexShrink: 0
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #ddd'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
              </div>

              {/* Document Title and Description - Center */}
              <div style={{
                flex: isMobile ? 'none' : 1,
                textAlign: isMobile ? 'center' : 'left',
                width: isMobile ? '100%' : 'auto'
              }}>
                <h4 style={{
                  fontSize: isMobile ? '16px' : '14px',
                  fontWeight: '600',
                  color: '#333',
                  margin: '0 0 5px 0',
                  lineHeight: '1.4',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {doc.title} {doc.required && <span style={{ color: 'red' }}>*</span>}
                </h4>
                
                <p style={{
                  fontSize: isMobile ? '14px' : '12px',
                  color: '#666',
                  margin: 0,
                  lineHeight: '1.3',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {doc.description}
                </p>

                {/* File Name Display */}
                {uploadedFiles[doc.id] && (
                  <div style={{
                    marginTop: '8px',
                    fontSize: '12px',
                    color: '#28a745',
                    fontWeight: '500'
                  }}>
                    ✓ {uploadedFiles[doc.id].name}
                  </div>
                )}
              </div>

              {/* Select File Button - Right */}
              <div style={{
                flexShrink: 0
              }}>
                <button
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #6B133F',
                    color: '#6B133F',
                    padding: isMobile ? '12px 24px' : '10px 20px',
                    borderRadius: '4px',
                    fontSize: isMobile ? '14px' : '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap',
                    width: isMobile ? '200px' : 'auto'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#6B133F';
                    e.target.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.color = '#6B133F';
                  }}
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.jpg,.jpeg,.png,.svg,.pdf';
                    input.onchange = (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        handleFileUpload(doc.id, file);
                      }
                    };
                    input.click();
                  }}
                >
                  SELECT FILE
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          marginTop: '30px',
          width: '100%',
          textAlign: 'center'
        }}>
          {/* <button
            type="submit"
            onClick={handleSubmitClick}
            style={{
              backgroundColor: 'rgb(107, 19, 63)',
              color: 'white',
              border: 'none',
              padding: '12px 32px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              minWidth: '180px',
              margin: '0 auto',
              display: 'block'
            }}
          >
            Preview
          </button> */}
          <button
            type="submit"
            onClick={handleSubmitClick}
            style={{
              backgroundColor: 'rgb(107, 19, 63)',
              color: 'white',
              border: 'none',
              padding: '12px 32px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              minWidth: '180px',
              margin: '0 auto',
              display: 'block'
            }}
          >
            Submit
          </button>
        </div>

          {/* Confirmation Modal */}
          {showConfirmModal && (
              <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000
              }}>
              <div style={{
                  backgroundColor: 'white',
                  padding: '40px',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                  maxWidth: '500px',
                  width: '90%',
                  textAlign: 'center'
              }}>
                  <h3 style={{
                  color: '#6b133f',
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '30px',
                  lineHeight: '1.4'
                  }}>
                  Are you sure you want to submit ?
                  </h3>
                  
                  <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '20px'
                  }}>
                  <button
                      onClick={handleBack}
                      style={{
                      backgroundColor: '#6b133f',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      minWidth: '80px'
                      }}
                  >
                      Back
                  </button>
                  
                  <button
                      onClick={handleConfirm}
                      style={{
                      backgroundColor: '#6b133f',
                      color: 'white',
                      border: '2px solid #fbbf24',
                      padding: '10px 20px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      minWidth: '80px'
                      }}
                  >
                      Confirm
                  </button>
                  </div>
              </div>
            </div>
          )}

      </div>
    </div>
  );    
};

export default AttachmentsSection;