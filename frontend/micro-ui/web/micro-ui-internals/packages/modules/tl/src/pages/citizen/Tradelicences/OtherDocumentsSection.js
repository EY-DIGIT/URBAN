import React, { useState, useEffect } from "react";
import styles from "./IndexStyle"
import { Dropdown, TextInput } from "@egovernments/digit-ui-react-components";

const OtherDocumentsSection = () => {
  const [selectedType, setSelectedType] = useState("Private Limited Company");
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const companyTypes = [
    { code: "adhar_card", value: "Aadhar card Document" },
    { code: "pan_card", value: "Pan Card Document" }
  ];

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

  const documentSections = [
    {
      id: 'other_certificate',
      title: 'Any Other Supporting Document for the Licence',
      required: true,
      description: 'JPG, PNG, SVG or PDF, file size no more than 25MB'
    },
  ];

  return (
    
    <div className="form-section" style={styles.formSection}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '20px',
            maxWidth: '1200px'
          }}>

        {/* Left Column - Select Type Dropdown */}
        <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>Select Type <span className="mandatory" style={styles.mandatory}>*</span></div>
            <Dropdown
              option={[
                { code: "Aadhar card", value: "Aadhar Card document" },
                { code: "Pan card", value: "Pan Card Document" }
              ]}
              optionKey="code"
              t={(key) => key}
              selected=""
              select={() => {}}
              placeholder="Select"
              style={styles.widthInput}
            />
        </div>

        {/* Right Column - Document Upload Section */}
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
    </div>
  );    
};

export default OtherDocumentsSection;