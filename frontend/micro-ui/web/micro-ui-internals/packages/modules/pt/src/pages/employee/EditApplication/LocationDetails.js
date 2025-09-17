


// import React, { useRef, useState } from "react";

// const CameraCapture = () => {
//     const videoRef = useRef(null);
//     const canvasRef = useRef(null);
//     const [streaming, setStreaming] = useState(false);
//     const [showModal, setShowModal] = useState(false);
//     const [capturedPhoto, setCapturedPhoto] = useState(null);
//     console.log("capturedPhoto", capturedPhoto);
//     const startCamera = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//             videoRef.current.srcObject = stream;
//             setStreaming(true);
//         } catch (err) {
//             console.error("Camera access denied:", err);
//         }
//     };

//     const openModal = () => {
//         setShowModal(true);
//         startCamera();
//     };

//     const closeModal = () => {
//         setShowModal(false);
//         setStreaming(false);
//         if (videoRef.current && videoRef.current.srcObject) {
//             videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
//         }
//     };

//     const capturePhoto = () => {
//         const context = canvasRef.current.getContext("2d");
//         context.drawImage(videoRef.current, 0, 0, 320, 240);

//         canvasRef.current.toBlob((blob) => {
//             const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
//             setCapturedPhoto(URL.createObjectURL(file)); // UI preview के लिए
//             // यहाँ payload के लिए file state में रख सकते हो
//             console.log("Captured file ready for payload:", file);
//             closeModal();
//         }, "image/jpeg");
//     };

//     return (
//         <div>
//             {/* Button to open camera */}
//             <button onClick={openModal}>Open Camera</button>

//             {/* Show captured photo if available */}
//             {capturedPhoto && (
//                 <div style={{ marginTop: "10px" }}>
//                     <h4>Captured Photo:</h4>
//                     <img src={capturedPhoto} alt="captured" width="200" />
//                 </div>
//             )}

//             {/* Modal */}
//             {showModal && (
//                 <div
//                     style={{
//                         position: "fixed",
//                         top: 0,
//                         left: 0,
//                         width: "100%",
//                         height: "100%",
//                         backgroundColor: "rgba(0,0,0,0.6)",
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         zIndex: 9999,
//                     }}
//                 >
//                     <div
//                         style={{
//                             background: "#fff",
//                             padding: "20px",
//                             borderRadius: "10px",
//                             textAlign: "center",
//                         }}
//                     >
//                         <video
//                             ref={videoRef}
//                             autoPlay
//                             playsInline
//                             width="320"
//                             height="240"
//                             style={{ borderRadius: "8px" }}
//                         />
//                         <canvas
//                             ref={canvasRef}
//                             width="320"
//                             height="240"
//                             style={{ display: "none" }}
//                         />
//                         <div style={{ marginTop: "10px" }}>
//                             <button onClick={capturePhoto}>Capture</button>
//                             <button onClick={closeModal} style={{ marginLeft: "10px" }}>
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CameraCapture;

// import React, { useRef, useState, useEffect } from "react";
// import { Dropdown, TextInput } from "@egovernments/digit-ui-react-components";

// const LocationDetails = (handleLocationUpdate ,handlePhotoCapture) => {
//     const videoRef = useRef(null);
//     const canvasRef = useRef(null);
//     const [streaming, setStreaming] = useState(false);
//     const [showModal, setShowModal] = useState(false);
//     const [capturedPhotoUrl, setCapturedPhotoUrl] = useState(null);
//     const [fileStoreId, setFileStoreId] = useState(null);
//     const [selectedFiles, setSelectedFiles] = useState({});
//     const [isMobile, setIsMobile] = useState(false);
//     const [coords, setCoords] = useState({ lat: "", lng: "" });

//     useEffect(() => {
//         const handleResize = () => {
//             setIsMobile(window.innerWidth <= 768);
//         };
//         handleResize();
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     // 🔹 Fetch current location (lat/lng)
//     useEffect(() => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     setCoords({
//                         lat: position.coords.latitude.toFixed(6),
//                         lng: position.coords.longitude.toFixed(6),
//                     });
//                 },
//                 (error) => {
//                     console.error("Error getting location:", error);
//                     setCoords({ lat: "Not available", lng: "Not available" });
//                 }
//             );
//         } else {
//             setCoords({ lat: "Not supported", lng: "Not supported" });
//         }
//     }, []);
//     const startCamera = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//             videoRef.current.srcObject = stream;
//             setStreaming(true);
//         } catch (err) {
//             console.error("Camera access denied:", err);
//         }
//     };

//     const openModal = () => {
//         setShowModal(true);
//         startCamera();
//     };

//     const closeModal = () => {
//         setShowModal(false);
//         setStreaming(false);
//         if (videoRef.current && videoRef.current.srcObject) {
//             videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
//         }
//     };

//     const capturePhoto = () => {
//         const context = canvasRef.current.getContext("2d");
//         context.drawImage(videoRef.current, 0, 0, 320, 240);

//         canvasRef.current.toBlob(async (blob) => {
//             if (!blob) return;
//             const file = new File([blob], "captured_photo.jpg", { type: "image/jpeg" });

//             // UI preview
//             setCapturedPhotoUrl(URL.createObjectURL(file));

//             try {
//                 // 🔥 File upload to Digit service
//                 const response = await Digit.UploadServices.Filestorage(
//                     "PT",
//                     file,
//                     Digit.ULBService.getStateId()
//                 );

//                 if (response?.data?.files?.length > 0) {
//                     const fId = response.data.files[0].fileStoreId;
//                     setFileStoreId(fId);
//                     console.log("✅ Uploaded to Filestorage:", fId);
//                 } else {
//                     console.error("❌ Upload failed, no fileStoreId in response");
//                 }
//             } catch (err) {
//                 console.error("❌ Error uploading captured photo:", err);
//             }

//             closeModal();
//         }, "image/jpeg");
//     };

//         const renderSvg = () => (
//         <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="32"
//             height="32"
//             fill="none"
//             stroke="#6b133f"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             viewBox="0 0 24 24"
//         >
//             <path d="M21.44 11.05L12.97 19.51a5.25 5.25 0 01-7.42-7.42l8.48-8.48a3.5 3.5 0 014.95 4.95l-8.49 8.48a1.75 1.75 0 01-2.47-2.47l7.78-7.78" />
//         </svg>
//     );


//      const renderFileInput = () => (
//         <div style={style2.fileBox}>
//             <div style={style2.iconBox}>{renderSvg()}</div>
//             <div style={style2.labelArea}>
//                 <label style={style2.fileLabel}>
//                     {/* {t(label)} {isRequired && <span style={{ color: "red" }}>*</span>} */}
//                 </label>
//                 <div style={style2.descText}>JPG, PNG or PDF, file size no more than 2MB</div>
//             </div>


//             <div style={style2.buttonArea}>
//                <button onClick={openModal} style={{
//                         minWidth: "140px",
//                         height: "44px",
//                         padding: "0 30px",
//                         backgroundColor: "#6b133f",
//                         color: "#fff",
//                         border: "none",
//                         borderRadius: "6px",
//                         fontSize: "15px",
//                         fontWeight: 500,
//                         fontFamily: "'Poppins', sans-serif",
//                         cursor: "pointer",
//                         transition: "all 0.3s ease",
//                     }}>Open Camera</button>

//             </div>

//         </div>
//     );

//     return (
//         <div>
//             <div style={style2.grid}>
//                 {/* 🔹 Dynamic Latitude & Longitude */}
//                 <div style={style2.flex20}>
//                     <label style={style2.label}>
//                         Latitude<span style={{ color: "red" }}>*</span>
//                     </label>
//                     <TextInput style={style2.widthInput} value={coords.lat} readOnly />
//                 </div>
//                 <div style={style2.flex20}>
//                     <label style={style2.label}>
//                         Longitude<span style={{ color: "red" }}>*</span>
//                     </label>
//                     <TextInput style={style2.widthInput} value={coords.lng} readOnly />
//                 </div>

//                 <div style={style2.flex50}>


//                     {renderFileInput()}

//                     {/* Show captured photo if available */}
//                     {capturedPhotoUrl && (
//                         <div style={{ marginTop: "10px" }}>
//                             <h4>Captured Photo:</h4>
//                             <img src={capturedPhotoUrl} alt="captured" width="200" />
//                             {fileStoreId && <p><b>FileStoreId:</b> {fileStoreId}</p>}
//                         </div>
//                     )}

//                     {/* Modal */}
//                     {showModal && (
//                         <div
//                             style={{
//                                 position: "fixed",
//                                 top: 0,
//                                 left: 0,
//                                 width: "100%",
//                                 height: "100%",
//                                 backgroundColor: "rgba(0,0,0,0.6)",
//                                 display: "flex",
//                                 justifyContent: "center",
//                                 alignItems: "center",
//                                 zIndex: 9999,
//                             }}
//                         >
//                             <div
//                                 style={{
//                                     background: "#fff",
//                                     padding: "20px",
//                                     borderRadius: "10px",
//                                     textAlign: "center",
//                                 }}
//                             >
//                                 <video
//                                     ref={videoRef}
//                                     autoPlay
//                                     playsInline
//                                     width="320"
//                                     height="240"
//                                     style={{ borderRadius: "8px" }}
//                                 />
//                                 <canvas
//                                     ref={canvasRef}
//                                     width="320"
//                                     height="240"
//                                     style={{ display: "none" }}
//                                 />
//                                 <div style={{ marginTop: "10px" }}>
//                                     <button onClick={capturePhoto}>Capture & Upload</button>
//                                     <button onClick={closeModal} style={{ marginLeft: "10px" }}>
//                                         Close
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LocationDetails;
import React, { useRef, useState, useEffect } from "react";
import { TextInput } from "@egovernments/digit-ui-react-components";

const LocationDetails = ({ handleLocationUpdate, handlePhotoCapture, applicationData,formErrors }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [streaming, setStreaming] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [capturedPhotoUrl, setCapturedPhotoUrl] = useState(null);
  const [fileStoreId, setFileStoreId] = useState(null);
  const [coords, setCoords] = useState({ lat: "", lng: "" });
 useEffect(() => {
       
          setCoords({
            lat:  applicationData?.address?.geoLocation?.latitude,
            lng: applicationData?.address?.geoLocation?.longitude
        });
 
    }, [applicationData]);
  // ✅ Fetch current location (lat/lng)
  const handleLoc = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(6);
          const lng = position.coords.longitude.toFixed(6);

          setCoords({ lat, lng });
          // 🔥 Send to parent
          handleLocationUpdate(lat, lng);
        },
        (error) => {
          console.error("Error getting location:", error);
          setCoords({ lat: "Not available", lng: "Not available" });
        }
      );
    } else {
      setCoords({ lat: "Not supported", lng: "Not supported" });
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setStreaming(true);
    } catch (err) {
      console.error("Camera access denied:", err);
    }
  };

  const openModal = () => {
    setShowModal(true);
    startCamera();
  };

  const closeModal = () => {
    setShowModal(false);
    setStreaming(false);
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  const capturePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 320, 240);

    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], "captured_photo.jpg", { type: "image/jpeg" });

      // UI preview
      setCapturedPhotoUrl(URL.createObjectURL(file));

      try {
        // 🔥 File upload to Digit service
        const response = await Digit.UploadServices.Filestorage(
          "PT",
          file,
          Digit.ULBService.getStateId()
        );

        if (response?.data?.files?.length > 0) {
          const fId = response.data.files[0].fileStoreId;
          setFileStoreId(fId);

          console.log("✅ Uploaded to Filestorage:", fId);

          // 🔥 Send fileStoreId to parent
          handlePhotoCapture(fId);
          handleLoc();
        } else {
          console.error("❌ Upload failed, no fileStoreId in response");
        }
      } catch (err) {
        console.error("❌ Error uploading captured photo:", err);
      }

      closeModal();
    }, "image/jpeg");
  };

  return (
    // <div>
    //   <div style={style2.grid}>
    //     {/* 🔹 Dynamic Latitude & Longitude */}
    //     {/* <div style={style2.flex20}>
    //       <label style={style2.label}>
    //         Latitude<span style={{ color: "red" }}>*</span>
    //       </label>
    //       <TextInput style={style2.widthInput} value={coords.lat} readOnly />
    //     </div>
    //     <div style={style2.flex20}>
    //       <label style={style2.label}>
    //         Longitude<span style={{ color: "red" }}>*</span>
    //       </label>
    //       <TextInput style={style2.widthInput} value={coords.lng} readOnly />
    //     </div> */}

    //     <div style={style2.flex50}>
    //       <button
    //         onClick={openModal}
    //         style={{
    //           minWidth: "140px",
    //           height: "44px",
    //           padding: "0 30px",
    //           backgroundColor: "#6b133f",
    //           color: "#fff",
    //           border: "none",
    //           borderRadius: "6px",
    //           fontSize: "15px",
    //           fontWeight: 500,
    //           cursor: "pointer",
    //         }}
    //       >
    //         Open Camera
    //       </button>

    //       {/* Show captured photo if available */}
    //       {capturedPhotoUrl && (
    //         <div style={{ marginTop: "10px" }}>
    //           <h4>Captured Photo:</h4>
    //           <img src={capturedPhotoUrl} alt="captured" width="200" />
    //           {fileStoreId && <p><b>FileStoreId:</b> {fileStoreId}</p>}
    //         </div>
    //       )}

    //       {/* Modal */}
    //       {showModal && (
    //         <div
    //           style={{
    //             position: "fixed",
    //             top: 0,
    //             left: 0,
    //             width: "100%",
    //             height: "100%",
    //             backgroundColor: "rgba(0,0,0,0.6)",
    //             display: "flex",
    //             justifyContent: "center",
    //             alignItems: "center",
    //             zIndex: 9999,
    //           }}
    //         >
    //           <div
    //             style={{
    //               background: "#fff",
    //               padding: "20px",
    //               borderRadius: "10px",
    //               textAlign: "center",
    //             }}
    //           >
    //             <video
    //               ref={videoRef}
    //               autoPlay
    //               playsInline
    //               width="320"
    //               height="240"
    //               style={{ borderRadius: "8px" }}
    //             />
    //             <canvas
    //               ref={canvasRef}
    //               width="320"
    //               height="240"
    //               style={{ display: "none" }}
    //             />
    //             <div style={{ marginTop: "10px" }}>
    //               <button onClick={capturePhoto}>Capture & Upload</button>
    //               <button onClick={closeModal} style={{ marginLeft: "10px" }}>
    //                 Close
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div>
      <div style={style2.grid}>
        <div style={style2.flex20}>
          <label style={style2.label}>
            Latitude<span style={{ color: "red" }}>*</span>
          </label>
          <TextInput  disable={true} style={style2.widthInput} value={coords.lat} readOnly />
          {formErrors.longLat && <span style={{ color: "red" }}>{formErrors.longLat}</span>}
        </div>
        <div style={style2.flex20}>
          <label style={style2.label}>
            Longitude<span style={{ color: "red" }}>*</span>
          </label>
          <TextInput  disable={true} style={style2.widthInput} value={coords.lng} readOnly />
          {formErrors.longLat && <span style={{ color: "red" }}>{formErrors.longLat}</span>}
        </div>
        {!applicationData?.documents.find(d => d.documentType === "Property Photograph")?.fileStoreId && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              border: "2px dashed #6b133f",
              borderRadius: "12px",
              background: "#faf5f7",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              transition: "all 0.3s ease",
              margin: "auto"
            }}
          >
            <button
              onClick={openModal}
              style={{
                minWidth: "160px",
                height: "50px",
                padding: "0 30px",
                backgroundColor: "#6b133f",
                color: "#fff",
                border: "none",
                borderRadius: "30px",
                fontSize: "16px",
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                cursor: "pointer",
                boxShadow: "0px 4px 10px rgba(107,19,63,0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#89174f")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#6b133f")
              }
            >
              📷 Open Camera
            </button>

            {/* Show captured photo if available */}
            {capturedPhotoUrl && (
              <div
                style={{
                  marginTop: "20px",
                  textAlign: "center",
                }}
              >
                <h4 style={{ fontSize: "16px", color: "#333", marginBottom: "10px" }}>
                  Captured Photo
                </h4>
                <img
                  src={capturedPhotoUrl}
                  alt="captured"
                  style={{
                    width: "220px",
                    height: "auto",
                    margin: "auto",
                    borderRadius: "12px",
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                  }}
                />
                {fileStoreId && (
                  <p
                    style={{
                      marginTop: "8px",
                      fontSize: "14px",
                      color: "#6b133f",
                      fontWeight: "500",
                    }}
                  >
                    ✅ Uploaded (FileStoreId: {fileStoreId})
                  </p>
                )}
              </div>
            )}
          </div>
        )}
        {/* Modal */}
        {showModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "15px",
                textAlign: "center",
                boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                width: "380px",
              }}
            >
              <h3 style={{ marginBottom: "15px", color: "#6b133f" }}>
                Capture Photo
              </h3>

              <video
                ref={videoRef}
                autoPlay
                playsInline
                width="320"
                height="240"
                style={{
                  borderRadius: "10px",
                  border: "2px solid #6b133f",
                  marginBottom: "12px",
                }}
              />

              <canvas
                ref={canvasRef}
                width="320"
                height="240"
                style={{ display: "none" }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "15px",
                  marginTop: "10px",
                }}
              >
                <button
                  onClick={capturePhoto}
                  style={{
                    backgroundColor: "#6b133f",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "10px 20px",
                    fontSize: "15px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                >
                  📸 Capture & Upload
                </button>
                <button
                  onClick={closeModal}
                  style={{
                    backgroundColor: "#ccc",
                    color: "#000",
                    border: "none",
                    borderRadius: "8px",
                    padding: "10px 20px",
                    fontSize: "15px",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

  );
};

export default LocationDetails;


// Inline styles
const style2 = {
  checkboxLabel: { padding: "10px" },
  poppinsTextStyle: {
    fontFamily: 'Poppins',
    fontWeight: 500,
    fontSize: '10px',
    lineHeight: '24px',
    letterSpacing: '0%',
  },
  widthInput: {
    width: "100%",
    height: "35px",
    borderWidth: "1px",
    borderRadius: "6px",
    // border: "1px solid #D9D9D9",
    // boxShadow: "0px 4px 4px 0px #00000040",
    // background: "#A3BBF347",
    background: "#D2D2D280",
    border: "0.5px solid #D2D2D280",
    color: "black"
    // padding: "6px"
  },
  label: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '22px',
    letterSpacing: '0',
    color: '#282828',
    width: "200px"
  },
  input: {
    width: "100%",
    height: "40px",
    borderWidth: "1px",
    borderRadius: "6px",
    // border: "1px solid #D9D9D9",
    boxShadow: "0px 4px 4px 0px #00000040",
    background: "#A3BBF347",
    padding: "10px",
  },
  flex30: {
    flex: "1 1 30%",
    display: "flex",
    flexDirection: "column",

    position: "relative",
    minHeight: "90px",

  },
  flex20: {
    flex: "1 1 20%",
    display: "flex",
    flexDirection: "column",

    position: "relative",
    minHeight: "90px",

  },
  flex50: {
    flex: "1 1 50%",
    display: "flex",
    flexDirection: "column",

    position: "relative",
    minHeight: "90px",

  },
  grid: {
    // display: "grid",
    // gridTemplateColumns: "1fr 1fr 1fr",
    // gap: "16px",
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
  },
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
  fileBox: {
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
    fontWeight: "600",
    textAlign: "center",
  },
  selectedFileText: {
    fontSize: "12px",
    color: "#444",
    maxWidth: "140px",
    textAlign: "right",
    wordBreak: "break-word",
  },
};
