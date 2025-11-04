//  const handleSubmitUpdateChange = async () => {

//         const payload = {
//             Property: {
//                 updateIMC: true,
//                 id: applicationData?.id,
//                 registryId: applicationData?.registryId || "",
//                 propertyId: applicationData?.propertyId || "",
//                 accountId: applicationData?.accountId || "",
//                 acknowldgementNumber: applicationData?.acknowldgementNumber || "",
//                 status: applicationData?.status,
//                 tenantId: userInfo1?.tenantId,
//                 oldPropertyId: assessmentDetails.oldPropertyId || null,
//                 essentialTax: propertyDetails.essentialTax?.code || propertyDetails.essentialTax,
//                 address: {
//                     city: "indore",
//                     locality: {
//                         code: addressDetails.colony?.code || "SUN02",
//                         name: addressDetails.colony?.name || "map with zone",
//                         latitude: longLat.lat,
//                         longitude: longLat.long,
//                     },
//                     geoLocation: {
//                         latitude: longLat.lat || applicationData?.address?.geoLocation?.latitude,
//                         longitude: longLat.long || applicationData?.address?.geoLocation?.longitude,
//                     },
//                     zone: addressDetails.zone?.code || "SUN02",
//                     street: addressDetails.address || "main",
//                     doorNo: addressDetails.doorNo || "23",
//                     pincode: addressDetails.pincode || "",
//                     ward: addressDetails.ward?.code || "1",
//                     documents: [],
//                 },

//                 ownershipCategory: ownershipType || "INDIVIDUAL.SINGLEOWNER",
//                 propertyCategory: propertyCategoryInput,

//                 owners: owners.map((owner, index) => ({
//                     salutation: owner.title || "mr",
//                     title: "title",
//                     name: owner.name || `Owner ${index + 1}`,
//                     salutationHindi: owner.hindiTitle,
//                     hindiName: owner.hindiName || "",
//                     fatherOrHusbandName: owner.fatherHusbandName || "UnitTest",
//                     gender: "MALE",
//                     aadhaarNumber: owner.aadhaar || "",
//                     altContactNumber: owner.altNumber || "",
//                     isCorrespondenceAddress: correspondenceAddress,
//                     mobileNumber: owner.mobile || "",
//                     emailId: owner.email || "",
//                     ownerType: propertyDetails.exemption.code,
//                     permanentAddress:
//                         addressDetails.address || "",
//                     relationship: owner.relationship || "FATHER",
//                     samagraId: owner.samagraID,
//                     documents: [
//                         {
//                             documentType: "Proof of Identity",
//                             fileStoreId: documents.photoId?.fileStoreId || applicationData.documents.find(d => d.documentType === "Proof of Identity")?.fileStoreId,
//                             documentUid: documents.photoId?.documentUid || applicationData.documents.find(d => d.documentType === "Proof of Identity")?.documentUid,
//                         },
//                         documents?.sellersRegistry && {

//                             documentType: "Others",
//                             fileStoreId: documents.sellersRegistry?.fileStoreId || applicationData.documents.find(d => d.documentType === "Others")?.fileStoreId,
//                             documentUid: documents.sellersRegistry?.documentUid || applicationData.documents.find(d => d.documentType === "Others")?.documentUid
//                         },
//                         {
//                             documentType: "Proof of Ownership",
//                             fileStoreId: documents.ownershipDoc?.fileStoreId || applicationData.documents.find(d => d.documentType === "Proof of Ownership")?.fileStoreId,
//                             documentUid: documents.ownershipDoc?.documentUid || applicationData.documents.find(d => d.documentType === "Proof of Ownership")?.documentUid,
//                         },
//                         {
//                             documentType: "Property Photograph",
//                             fileStoreId: capturedPhoto || null,
//                             documentUid: capturedPhoto || null,
//                         },
//                         ...Object.keys(documents)
//                             .filter(key => key.startsWith("others_"))
//                             .map(key => ({
//                                 documentType: "Others",  // 👈 these will go separately
//                                 fileStoreId:
//                                     documents[key]?.fileStoreId ||
//                                     applicationData.documents.find(d => d.documentType === "Others")?.fileStoreId,
//                                 documentUid:
//                                     documents[key]?.documentUid ||
//                                     applicationData.documents.find(d => d.documentType === "Others")?.documentUid,
//                             })),
//                     ].filter(Boolean),
//                 })),

//                 institution: null,

//                 documents: [
//                     {
//                         documentType: "Proof of Identity",
//                         fileStoreId: documents.photoId?.fileStoreId || applicationData.documents.find(d => d.documentType === "Proof of Identity")?.fileStoreId,
//                         documentUid: documents.photoId?.documentUid || applicationData.documents.find(d => d.documentType === "Proof of Identity")?.documentUid,
//                     },
//                     documents?.sellersRegistry && {

//                         documentType: "Others",
//                         fileStoreId: documents.sellersRegistry?.fileStoreId || applicationData.documents.find(d => d.documentType === "Others")?.fileStoreId,
//                         documentUid: documents.sellersRegistry?.documentUid || applicationData.documents.find(d => d.documentType === "Others")?.documentUid
//                     },
//                     {
//                         documentType: "Proof of Ownership",
//                         fileStoreId: documents.ownershipDoc?.fileStoreId || applicationData.documents.find(d => d.documentType === "Proof of Ownership")?.fileStoreId,
//                         documentUid: documents.ownershipDoc?.documentUid || applicationData.documents.find(d => d.documentType === "Proof of Ownership")?.documentUid,
//                     },
//                     {
//                         documentType: "Property Photograph",
//                         fileStoreId: capturedPhoto || null,
//                         documentUid: capturedPhoto || null,
//                     },
//                     ...Object.keys(documents)
//                         .filter(key => key.startsWith("others_"))
//                         .map(key => ({
//                             documentType: "Others",  // 👈 these will go separately
//                             fileStoreId:
//                                 documents[key]?.fileStoreId ||
//                                 applicationData.documents.find(d => d.documentType === "Others")?.fileStoreId,
//                             documentUid:
//                                 documents[key]?.documentUid ||
//                                 applicationData.documents.find(d => d.documentType === "Others")?.documentUid,
//                         })),
//                 ].filter(Boolean),

//                 units: unit.map(unit => (
//                     {
//                         usageCategory: unit.usageType || "RESIDENTIAL",
//                         usesCategoryMajor: unit.usageType || "RESIDENTIAL",
//                         occupancyType: unit.usageFactor || "SELFOCCUPIED",
//                         constructionDetail: {
//                             builtUpArea: unit.area || "3000",
//                             constructionType: unit.constructionType || null,
//                         },
//                         floorNo: parseInt(unit.floorNo) || 0,
//                         rateZone: selectedRateZone ? selectedRateZone : rateZones?.[0]?.code || "",
//                         roadFactor: assessmentDetails.roadFactor?.code || applicationData?.units[0]?.roadFactor,
//                         fromYear: unit.fromYear,
//                         toYear: unit.toYear,
//                     })),


//                 landArea: assessmentDetails.plotArea?.toString() || "3000",
//                 propertyType: propertyDetails.propertyType?.code || "BUILTUP.INDEPENDENTPROPERTY",
//                 noOfFloors: unit.length || null,
//                 superBuiltUpArea: null,
//                 // usageCategory: unit.usageType || "RESIDENTIAL",
//                 usageCategory: unit.find(u => u.usageType) ? unit.find(u => u.usageType).usageType : "RESIDENTIAL",

//                 additionalDetails: {
//                     inflammable: false,
//                     heightAbove36Feet: false,
//                     propertyType: {
//                         i18nKey: "COMMON_PROPTYPE_BUILTUP_INDEPENDENTPROPERTY",
//                         code: propertyDetails.propertyType?.code || "BUILTUP.INDEPENDENTPROPERTY",
//                     },
//                     mobileTower: checkboxes.mobileTower || false,
//                     bondRoad: checkboxes.broadRoad || false,
//                     advertisement: checkboxes.advertisement || false,
//                     builtUpArea: null,
//                     noOfFloors: {
//                         i18nKey: "PT_GROUND_FLOOR_OPTION",
//                         code: 0,
//                     },
//                     noOofBasements: {
//                         i18nKey: "PT_NO_BASEMENT_OPTION",
//                         code: 0,
//                     },
//                     unit: unit.map(unit => (
//                         {
//                             usageCategory: unit.usageType || "RESIDENTIAL",
//                             usesCategoryMajor: unit.usageType || "RESIDENTIAL",
//                             occupancyType: unit.usageFactor || "SELFOCCUPIED",
//                             constructionDetail: {
//                                 builtUpArea: unit.area || "3000",
//                                 constructionType: unit.constructionType || null,
//                             },
//                             floorNo: parseInt(unit.floorNo) || 0,
//                             rateZone: selectedRateZone ? selectedRateZone : rateZones?.[0]?.code || "",
//                             roadFactor: assessmentDetails.roadFactor?.code || applicationData?.units[0]?.roadFactor,
//                             fromYear: unit.fromYear,
//                             toYear: unit.toYear,
//                         })),
//                     basement1: null,
//                     basement2: null,
//                 },
//                 workflow: {
//                     action: "OPEN",
//                     moduleName: "PT",
//                     businessService: "PT.UPDATE"
//                 },
//                 channel: "CFC_COUNTER",
//                 creationReason: "UPDATE",
//                 source: "MUNICIPAL_RECORDS",
//             }

//         }

//         setIsLoader(true);



//         mutationUpdate.mutate(payload, {
//             onSuccess: (data) => {
//                 console.log("Property Update Response:", data);
//                 // setIsLoader(false);
//                 // const property = data?.Properties?.[0];
//                 // if (property) {

//                 //     setProOwnerDetail(property);
//                 //     setAcknowledgmentNumber(property.acknowldgementNumber);
//                 //     setPropertyId(property.propertyId);
//                 //     setStatus(property.status);
//                 //     // setShowSuccessModal(true);
//                 //     // setShowPreviewButton(true);
//                 //     PreviewDemand(property.propertyId, property);


//                 // }
//             },
//             onError: (err) => {
//                 setIsLoader(false);

//                 alert(t("Submission failed"));
//             },
//         });

//     };

import React, { useRef, useState, useEffect } from "react";
import { TextInput } from "@egovernments/digit-ui-react-components";

const LocationDetails = ({ applicationData }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [streaming, setStreaming] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [capturedPhotoUrl, setCapturedPhotoUrl] = useState(null);
  const [fileStoreId, setFileStoreId] = useState(null);
  const [coords, setCoords] = useState({ lat: "", lng: "" });
  const [error, setError] = useState("");
    let userInfo1 = JSON.parse(localStorage.getItem("user-info"));

    const tenantId = userInfo1?.tenantId;
    const mutationUpdate = Digit.Hooks.pt.useUpdateContent(tenantId, true);

  // 🟢 Load coordinates from applicationData (if available)
  useEffect(() => {
    setCoords({
      lat: applicationData?.address?.geoLocation?.latitude || "",
      lng: applicationData?.address?.geoLocation?.longitude || "",
    });
  }, [applicationData]);

  const handleSubmitUpdateChange = async (photo, location) => {
  const payload = {
    Property: {
      updateIMC: true,
      id: applicationData?.id,
      registryId: applicationData?.registryId || "",
      propertyId: applicationData?.propertyId || "",
      accountId: applicationData?.accountId || "",
      acknowldgementNumber: applicationData?.acknowldgementNumber || "",
      status: applicationData?.status,
      tenantId: applicationData?.tenantId,

      // ✅ Address from existing application + new location
      address: {
        ...applicationData?.address,
        city: "indore",
        locality: {
          ...applicationData?.address?.locality,
          latitude: location?.lat || applicationData?.address?.locality?.latitude || "",
          longitude: location?.lng || applicationData?.address?.locality?.longitude || "",
        },
        geoLocation: {
          latitude: location?.lat || applicationData?.address?.geoLocation?.latitude || "",
          longitude: location?.lng || applicationData?.address?.geoLocation?.longitude || "",
        },
      },

      // ✅ Retain existing documents + replace/add new photograph
      documents: [
        ...(applicationData?.documents || []),
        {
          documentType: "Property Photograph",
          fileStoreId: photo || null,
          documentUid: photo || null,
        },
      ].filter(Boolean),

      // ✅ Keep all existing owners and units intact
      owners: applicationData?.owners || [],
      units: applicationData?.units || [],

      ownershipCategory: applicationData?.ownershipCategory || "INDIVIDUAL.SINGLEOWNER",
      propertyCategory: applicationData?.propertyCategory,
      propertyType: applicationData?.propertyType,
      landArea: applicationData?.landArea,
      noOfFloors: applicationData?.noOfFloors,
      usageCategory: applicationData?.usageCategory,

      additionalDetails: {
        ...applicationData?.additionalDetails,
      },

      workflow: {
        action: "OPEN",
        moduleName: "PT",
        businessService: "PT.UPDATE",
      },
      channel: "CFC_COUNTER",
      creationReason: "UPDATE",
      source: "MUNICIPAL_RECORDS",
    },
  };

//   setIsLoader(true);

  mutationUpdate.mutate(payload, {
    onSuccess: (data) => {
      console.log("✅ Property Update Response:", data);
    //   setIsLoader(false);
    },
    onError: (err) => {
      console.error("❌ Update failed:", err);
    //   setIsLoader(false);
      alert("Submission failed");
    },
  });
};

  // 🟢 Get current location
  const handleLoc = (fidPhoto) => {
    setError("");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(6);
          const lng = position.coords.longitude.toFixed(6);
          setCoords({ lat, lng });
          handleSubmitUpdateChange(fidPhoto, { lat, lng });
        },
        (err) => {
          console.error("Error getting location:", err);
          setError("Unable to fetch location. Please allow location access.");
          setCoords({ lat: "Not available", lng: "Not available" });
        }
      );
    } else {
      setError("Geolocation not supported in this browser.");
      setCoords({ lat: "Not supported", lng: "Not supported" });
    }
  };

  // 🟢 Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setStreaming(true);
    } catch (err) {
      console.error("Camera access denied:", err);
      setError("Camera access denied. Please enable permissions.");
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

  // 🟢 Capture and Upload
  const capturePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 320, 240);

    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], "captured_photo.jpg", { type: "image/jpeg" });

      // Local preview
      setCapturedPhotoUrl(URL.createObjectURL(file));

      try {
        const response = await Digit.UploadServices.Filestorage(
          "PT",
          file,
          Digit.ULBService.getStateId()
        );

        if (response?.data?.files?.length > 0) {
          const fId = response.data.files[0].fileStoreId;
          setFileStoreId(fId);
          console.log("✅ Uploaded FileStoreId:", fId);

          // Fetch current location after upload
          handleLoc(fId);
        } else {
          console.error("❌ Upload failed, no fileStoreId in response");
          setError("Upload failed. Please try again.");
        }
      } catch (err) {
        console.error("❌ Error uploading captured photo:", err);
        setError("Error uploading photo. Please retry.");
      }

      closeModal();
    }, "image/jpeg");
  };

  return (
    <div>
      <div style={style2.grid}>
        <div style={style2.flex20}>
          <label style={style2.label}>
            Latitude<span style={{ color: "red" }}>*</span>
          </label>
          <TextInput disable={true} style={style2.widthInput} value={coords.lat} readOnly />
          {error && <span style={{ color: "red" }}>{error}</span>}
        </div>

        <div style={style2.flex20}>
          <label style={style2.label}>
            Longitude<span style={{ color: "red" }}>*</span>
          </label>
          <TextInput disable={true} style={style2.widthInput} value={coords.lng} readOnly />
          {error && <span style={{ color: "red" }}>{error}</span>}
        </div>

        {/* Camera Section */}
        {!applicationData?.documents?.find(
          (d) => d.documentType === "Property Photograph"
        )?.fileStoreId && (
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
              margin: "auto",
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

            {capturedPhotoUrl && (
              <div style={{ marginTop: "20px", textAlign: "center" }}>
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
              <h3 style={{ marginBottom: "15px", color: "#6b133f" }}>Capture Photo</h3>

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

              <canvas ref={canvasRef} width="320" height="240" style={{ display: "none" }} />

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

// Example style object (you can reuse your existing one)

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
