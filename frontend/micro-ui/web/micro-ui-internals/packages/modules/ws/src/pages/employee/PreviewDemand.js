import React, { useEffect, useState } from "react";
import {
    Loader, Card,
    SubmitBar,
    TextInput,
    Dropdown,
    CheckBox,
} from "@egovernments/digit-ui-react-components";
import { useLocation, useHistory } from "react-router-dom";
import DownloadPdfButton from "./DownloadPDF";

const styles = {
    container: {
        // padding: "20px",
        // fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        maxWidth: "1200px",
        // margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
        '@media (max-width: 768px)': {
            padding: "10px"
        },
        '@media (max-width: 630px)': {
            padding: "8px"
        }
    },
    row: {
        display: "flex",
        flexWrap: "wrap",
        marginBottom: "16px",
        gap: "16px",
        width: "100%",
        boxSizing: "border-box",
        '@media (max-width: 768px)': {
            flexDirection: "column",
            gap: "12px"
        },
        '@media (max-width: 630px)': {
            gap: "8px",
            marginBottom: "12px"
        }
    },
    field: {
        display: "flex",
        flexDirection: "column",
        flex: "1",
        minWidth: "280px",
        width: "100%",
        boxSizing: "border-box",
        '@media (max-width: 768px)': {
            minWidth: "100%"
        },
        '@media (max-width: 630px)': {
            minWidth: "auto",
            width: "100%"
        }
    },
    flex30: {
        flex: "1 1 30%",
        display: "flex",
        flexDirection: "column",
        flex30: {
            flex: "1 1 30%",
            display: "flex",
            flexDirection: "column",

            position: "relative",
            minHeight: "90px",

        },
    },
    input: {
        height: "35px",
        border: "0.5px solid #F7F7F7",
        borderRadius: "4px",
        padding: "6px 10px",
        fontSize: "14px",
        width: "100%",
        boxSizing: "border-box",
        maxWidth: "100%",
        backgroundColor: "#F2F2F2",
        '@media (max-width: 630px)': {
            padding: "8px",
            fontSize: "13px",
            height: "40px"
        }
    },
    label: {

        // fontFamily: 'Poppins, sans-serif',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '22px',
        letterSpacing: '0',
        color: '#282828',
        width: "200px",
        marginBottom: "4px",
        wordWrap: "break-word",
        '@media (max-width: 768px)': {
            fontSize: "13px"
        },
        '@media (max-width: 630px)': {
            fontSize: "12px",
            lineHeight: "18px"
        }
    },
    sectionHeader: {

        // fontFamily: "Poppins",
        fontWeight: "bold",
        fontSize: "16px",
        lineHeight: "100%",
        color: "#6b133f",
        marginBottom: "16px",
        marginTop: "20px",
        '@media (max-width: 768px)': {
            fontSize: "15px",
            marginTop: "16px",
            marginBottom: "12px"
        }
    },
    sectionHeaderDemand: {
        // fontFamily: "Poppins",
        fontWeight: "bold",
        fontSize: "22px",
        lineHeight: "100%",
        color: "#6b133f",
        marginBottom: "20px",
        '@media (max-width: 768px)': {
            fontSize: "18px",
            marginBottom: "16px"
        }
    },
    tableContainer: {
        width: "100%",
        overflowX: "auto",
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        '@media (max-width: 768px)': {
            fontSize: "11px"
        }
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        minWidth: "800px",
        '@media (max-width: 768px)': {
            minWidth: "600px"
        }
    },
    th: {
        border: "1px solid #ccc",
        padding: "8px 4px",
        // backgroundColor: "#B9B9B9",
         backgroundColor:"rgba(107, 19, 63, 0.2)",
        // border:"1px,0px,0px,1px #B9B9B9",
        textAlign: "center",
        // fontFamily: "Inter",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "130%",
        color: "black",
        whiteSpace: "nowrap",
        '@media (max-width: 768px)': {
            padding: "6px 3px",
            fontSize: "10px"
        }
    },
    td: {
        border: "1px solid #ccc",
        // border:"1px,0px,0px,1px #B9B9B9",
        padding: "8px 4px",
        textAlign: "center",
        // fontFamily: "Inter",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "130%",
        color: "#000000",
        whiteSpace: "nowrap",
        '@media (max-width: 768px)': {
            padding: "6px 3px",
            fontSize: "10px"
        }
    },
    downloadBtn: {
        padding: "6px 12px",
        background: "white",
        border: "1px solid #6b133f",
        borderRadius: "12px",
        cursor: "pointer",
        // fontFamily: "Poppins",
        fontWeight: 400,
        fontSize: "12px",
        color: "#6b133f",
        boxSizing: "border-box",
        '@media (max-width: 768px)': {
            width: "100%",
            fontSize: "11px"
        },
        '@media (max-width: 630px)': {
            padding: "8px 12px",
            fontSize: "10px"
        }
    },
    cardD: {
        backgroundColor: "rgba(255, 255, 255, var(--bg-opacity))",
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.16)",
        padding: "16px",
        marginBottom: "22px",
        borderRadius: "12px",
        width: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
        '@media (max-width: 768px)': {
            padding: "12px",
            marginBottom: "16px"
        },
        '@media (max-width: 630px)': {
            padding: "8px",
            marginBottom: "12px",
            borderRadius: "8px"
        }
    },
    buttonContainer: {
        display: "flex",
        gap: "12px",
        // marginLeft: "auto",
        justifyContent: "flex-end",
        marginTop: "20px",
        '@media (max-width: 768px)': {
            flexDirection: "column",
            marginLeft: "0",
            gap: "8px"
        }
    },
    confirmBtn: {
        padding: "10px 30px",
        backgroundColor: "#6b133f",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        // fontFamily: "Poppins",
        fontWeight: 500,
        fontSize: "14px",
        height: "35px",
        whiteSpace: "nowrap",
        '@media (max-width: 768px)': {
            padding: "12px 20px",
            fontSize: "13px",
            width: "100%"
        }
    },
    bottomText: {
        color: "red",
        fontSize: "12px",
        marginTop: "8px",
        '@media (max-width: 768px)': {
            fontSize: "11px"
        }
    },
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "20px",
        boxSizing: "border-box"

    },
    modalContent: {
        background: "#fff",
        borderRadius: "12px",
        padding: "32px",
        textAlign: "center",
        width: "50%",
        maxWidth: "60%",         // keeps it small on large screens
        minWidth: "300px",         // avoids too small shrink
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "40px",               // uniform gap between text & buttons
        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",

        '@media (max-width: 1024px)': {
            width: "70%",
            padding: "28px",
            gap: "30px",
        },
        '@media (max-width: 768px)': {
            width: "90%",
            padding: "20px",
            gap: "24px",
        },
        '@media (max-width: 480px)': {
            width: "95%",
            padding: "16px",
            gap: "20px",
        }
    },

    modalButtonContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "16px",
        flexWrap: "wrap",       // buttons wrap on very small screens
    },
    modalButton: {
        padding: "10px 20px",
        borderRadius: "40px",
        border: "none",
        background: "#6b133f",
        color: "#fff",
        fontSize: "14px",
        cursor: "pointer",
        fontSize: "14px",
        '@media (max-width: 768px)': {
            padding: "12px 20px",
            fontSize: "13px",
            width: "100%"
        }
    },

    flexend: {
        display: "flex",
        justifyContent: "end",

    }
};

// Responsive InputField component
const InputField = ({ label, value }) => (
    <div style={styles.field}>
        <div style={styles.label}>{label}</div>
        <input style={styles.input} value={value} readOnly />
    </div>
);

const InputFieldBlank = () => (
    <div style={styles.field}>

    </div>
);

const PropertyForm = () => {
    const { data: commonFields, isLoading } = Digit.Hooks.pt.useMDMS(Digit.ULBService.getStateId(), "PropertyTax", "CommonFieldsConfig");
    const history = useHistory();
    const stateId = Digit.ULBService.getStateId();
    const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("EMPLOYEE_MUTATION_HAPPENED", false);
    const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("EMPLOYEE_MUTATION_SUCCESS_DATA", {});
    
 

    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [acknowledgmentNumber, setAcknowledgmentNumber] = useState("");
    let userInfo1 = JSON.parse(localStorage.getItem("user-info"));
    const tenantId = userInfo1?.tenantId;
    const mutationUpdate = Digit.Hooks.pt.usePropertyAPI(tenantId, false);
    const location = useLocation();
    const { data, proOwnerDetail, documents, checkboxes, rateZones, owners, unit, assessmentDetails,
         propertyDetails, addressDetails, ownershipType, correspondenceAddress, isSameAsPropertyAddress } = location.state || {};
    const calculation = data?.Calculation?.[0];

    // const propertyFYDetails = calculation?.propertyFYDetails || [];
    // const taxSummaries = calculation?.propertyFYTaxSummaries || [];
    console.log("calculation Pritam", calculation);
    const ownersDetail = proOwnerDetail?.property.owners || [];
    const address = proOwnerDetail?.property.address || {};
    console.log("proOwnerDetail", proOwnerDetail);

    const [floorList, setFloorList] = useState([]);
    const { data: FloorAll = {}, isLoadingF } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "Floor") || {};
    useEffect(() => {
        setMutationHappened(false);
        clearSuccessData();
    }, []);

    useEffect(() => {
    if (isLoadingF) return;

    const floors = FloorAll?.PropertyTax?.Floor || [];

    const mappedFloors = floors
      .filter(floor => floor?.code && floor?.active)
      .map(floor => ({
        i18nKey: floor.name,
        code: floor.code,
      }))
      .sort((a, b) => {
        const getSortValue = (val) => {
          const num = parseInt(val, 10);
          return isNaN(num) ? Number.MAX_SAFE_INTEGER : num;
        };
        return getSortValue(b.code) - getSortValue(a.code);
      });

    setFloorList(mappedFloors);
  }, [isLoadingF, FloorAll]);


  const [boundaryData, setBoundaryData] = useState(null);
  const [zones, setZones] = useState([]);
  const [wards, setWards] = useState([]);
  const [colonies, setColonies] = useState([]);
 
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

  console.log("Zones No=",zones)


    const handleGobackEdit = () => {
        history.push({
            pathname: "/digit-ui/employee/ws/new-application",
            state: {
                generalDetails: {
                    id: proOwnerDetail.id,
                    registryId: proOwnerDetail.registryId,
                    propertyId: proOwnerDetail.propertyId,
                    oldPropertyId: proOwnerDetail.oldPropertyId,
                    creationReason: proOwnerDetail.creationReason,
                    propertyType: proOwnerDetail.propertyType,
                    ownershipCategory: proOwnerDetail.ownershipCategory,
                    usageCategory: proOwnerDetail.usageCategory,
                    noOfFloors: proOwnerDetail.noOfFloors,
                    landArea: proOwnerDetail.landArea,
                    source: proOwnerDetail.source,
                    channel: proOwnerDetail.channel,
                    acknowldgementNumber: proOwnerDetail.acknowldgementNumber,
                    accountId: proOwnerDetail.accountId,
                    status: proOwnerDetail.status,
                    propertyCategoryInput:proOwnerDetail.propertyCategory,
                },
                addressDetailsSet: proOwnerDetail.address,
                ownerDetails: proOwnerDetail.owners,
                unitDetails: proOwnerDetail.units,
                propertyDocuments: proOwnerDetail.documents,
                additionalDetails: proOwnerDetail.additionalDetails,
                workflow: proOwnerDetail.workflow,
                processInstance: proOwnerDetail.processInstance,
                // Preserve correspondence address state
                correspondenceAddressData: {
                    correspondenceAddress: correspondenceAddress,
                    isSameAsPropertyAddress: isSameAsPropertyAddress
                },
                // Preserve property details for Exemption and Essential Tax fields
                propertyDetailsData: {
                    exemption: propertyDetails?.exemption,
                    essentialTax: propertyDetails?.essentialTax
                }
            },
        });
    };

    const handleSubmitUpdate = async () => {
        // const payload = {
        //     Property: {
        //         updateIMC: true,proOwnerDetail
        //         id: proOwnerDetail.address?.id,
        //         registryId: proOwnerDetail.registryId,
        //         essentialTax: propertyDetails.essentialTax?.code,
        //         propertyId: proOwnerDetail?.propertyId,
        //         accountId: proOwnerDetail?.accountId,
        //         acknowldgementNumber: proOwnerDetail?.acknowldgementNumber,
        //         status: proOwnerDetail?.status,
        //         tenantId: userInfo1?.tenantId,
        //         oldPropertyId: assessmentDetails?.oldPropertyId,
        //         address: {
        //             city: "indore",
        //             locality: {
        //                 code: addressDetails.address?.colony?.code || "SUN02",
        //                 name: addressDetails.address?.colony?.name || "map with zone"
        //             },
        //             zone: addressDetails.address?.zone?.code || "SUN02",
        //             street: addressDetails.address?.address || "main",
        //             doorNo: addressDetails.address?.doorNo || "23",
        //             pincode: addressDetails.address?.pincode || "",
        //             ward: addressDetails.address?.ward?.code || "1",
        //             documents: []
        //         },
        //         ownershipCategory: ownershipType || "INDIVIDUAL.SINGLEOWNER",
        //         owners: owners?.map((owner, index) => ({
        //             salutation: owner.title || "mr",
        //             title: "title",
        //             name: owner.name || `Owner ${index + 1}`,
        //             salutationHindi: owner.hindiTitle,
        //             hindiName: owner.hindiName || "",
        //             fatherOrHusbandName: owner.fatherHusbandName || "UnitTest",
        //             gender: "MALE",
        //             aadhaarNumber: owner.aadhaar || "",
        //             altContactNumber: owner.altNumber || "",
        //             isCorrespondenceAddress: correspondenceAddress,
        //             mobileNumber: owner.mobile || "9999999999",
        //             emailId: owner.email,
        //             ownerType: propertyDetails.exemption.code,
        //             permanentAddress: addressDetails.address || "23, main, PG_CITYA_REVENUE_SUN20, City A, ",
        //             relationship: owner.relationship || "FATHER",
        //             samagraId: owner.samagraID || "Samagra ID",
        //             documents: [
        //                 {
        //                     documentType: "Proof of Identity",
        //                     fileStoreId: documents.photoId?.fileStoreId,
        //                     documentUid: documents.photoId?.documentUid
        //                 },
        //                 {
        //                     documentType: "Others",
        //                     fileStoreId: documents.sellersRegistry?.fileStoreId,
        //                     documentUid: documents.sellersRegistry?.documentUid
        //                 },
        //                 {
        //                     documentType: "Proof of Ownership",
        //                     fileStoreId: documents.ownershipDoc?.fileStoreId,
        //                     documentUid: documents.ownershipDoc?.documentUid
        //                 },
        //             ],
        //         })),
        //         documents: [
        //             {
        //                 documentType: "Proof of Identity",
        //                 fileStoreId: documents.photoId?.fileStoreId,
        //                 documentUid: documents.photoId?.documentUid
        //             },
        //             {
        //                 documentType: "Others",
        //                 fileStoreId: documents.sellersRegistry?.fileStoreId,
        //                 documentUid: documents.sellersRegistry?.documentUid
        //             },
        //             {
        //                 documentType: "Proof of Ownership",
        //                 fileStoreId: documents.ownershipDoc?.fileStoreId,
        //                 documentUid: documents.ownershipDoc?.documentUid
        //             },
        //         ],
        //         units: unit.map(unit => ({
        //             usageCategory: unit.usageType,
        //             usesCategoryMajor: unit.usageType,
        //             occupancyType: unit.usageFactor,
        //             constructionDetail: {
        //                 builtUpArea: unit.area,
        //                 constructionType: unit.constructionType
        //             },
        //             floorNo: parseInt(unit.floorNo),
        //             rateZone: rateZones?.[0]?.code,
        //             roadFactor: assessmentDetails?.roadFactor?.code,
        //             fromYear: unit.fromYear,
        //             toYear: unit.toYear
        //         })),
        //         landArea: assessmentDetails?.plotArea,
        //         propertyType: proOwnerDetail?.propertyType,
        //         noOfFloors: unit.length || null,
        //         superBuiltUpArea: null,
        //         usageCategory: unit.find(u => u.usageType) ? unit.find(u => u.usageType).usageType : "RESIDENTIAL",
        //         additionalDetails: {
        //             inflammable: false,
        //             heightAbove36Feet: false,
        //             propertyType: {
        //                 i18nKey: "COMMON_PROPTYPE_BUILTUP_INDEPENDENTPROPERTY",
        //                 code: proOwnerDetail?.propertyType
        //             },
        //             mobileTower: checkboxes?.mobileTower,
        //             bondRoad: checkboxes?.broadRoad,
        //             advertisement: checkboxes?.advertisement,
        //             builtUpArea: null,
        //             noOfFloors: {
        //                 i18nKey: "PT_GROUND_FLOOR_OPTION",
        //                 code: 0
        //             },
        //             noOofBasements: {
        //                 i18nKey: "PT_NO_BASEMENT_OPTION",
        //                 code: 0
        //             },
        //             unit: unit.map(unit => ({
        //                 usageCategory: unit.usageType,
        //                 usesCategoryMajor: unit.usageType,
        //                 occupancyType: unit.usageFactor,
        //                 constructionDetail: {
        //                     builtUpArea: unit.area,
        //                     constructionType: unit.constructionType
        //                 },
        //                 floorNo: parseInt(unit.floorNo),
        //                 rateZone: rateZones?.[0]?.code,
        //                 roadFactor: assessmentDetails?.roadFactor?.code,
        //                 fromYear: unit.fromYear,
        //                 toYear: unit.toYear
        //             })),
        //             basement1: null,
        //             basement2: null
        //         },
        //         workflow: {
        //             action: "OPEN",
        //             moduleName: "PT",
        //             businessService: "PT.UPDATE"
        //         },
        //         channel: "CFC_COUNTER",
        //         creationReason: "UPDATE",
        //         source: "MUNICIPAL_RECORDS"
        //     },
        //     // RequestInfo: {
        //     //     apiId: "Rainmaker",
        //     //     authToken: userInfo1?.authToken,
        //     //     userInfo: {
        //     //         id: userInfo1?.id,
        //     //         uuid: userInfo1?.uuid,
        //     //         userName: userInfo1?.userName,
        //     //         name: userInfo1?.name,
        //     //         mobileNumber: userInfo1?.mobileNumber,
        //     //         emailId: userInfo1?.emailId,
        //     //         locale: userInfo1?.locale,
        //     //         type: userInfo1?.type,
        //     //         roles: userInfo1?.roles,
        //     //         active: userInfo1?.active !== false,
        //     //         tenantId: userInfo1?.tenantId,
        //     //         permanentCity: userInfo1?.permanentCity
        //     //     },
        //     //     msgId: "1749797151521|en_IN",
        //     //     plainAccessRequest: {}
        //     // }
        // };
        // mutationUpdate.mutate(payload, {
        //     onSuccess: (data) => {
        //         const property = data?.Properties?.[0];
        //         if (property) {
        //             setAcknowledgmentNumber(property.acknowldgementNumber);
        //             setShowConfirmPopup(false);
        //             setShowSuccessPopup(true);
        //         }
        //     },
        //     onError: (err) => {
        //         alert("Submission failed");
        //     },
        // });
        history.replace("/digit-ui/employee/ws/ws-response",
            {
                Property: payload?.Property,
                key: "UPDATE",
                action: "SUBMIT"
            }
        );
        // history.replace("/digit-ui/employee/pt/response", { Property: submitData.Property, key: "UPDATE", action: "SUBMIT" });
    };
    if (isLoading) {
        return <Loader />;
    }
    const buildDocumentPayload = (documentsState) => {
        const payloadDocs = [];

        // Add the known, non-dynamic documents first
        if (documentsState.photoId?.fileStoreId) {
            payloadDocs.push({
                documentType: "Proof of Identity",
                fileStoreId: documentsState.photoId.fileStoreId,
                documentUid: documentsState.photoId.documentUid,
            });
        }

        if (documentsState.ownershipDoc?.fileStoreId) {
            payloadDocs.push({
                documentType: "Proof of Ownership",
                fileStoreId: documentsState.ownershipDoc.fileStoreId,
                documentUid: documentsState.ownershipDoc.documentUid,
            });
        }

        // Iterate through the state to find and add all dynamic "Others" documents
        Object.keys(documentsState).forEach((key) => {
            // ✅ This is the corrected check for keys starting with "others_"
            if (key.startsWith("others_") || key === "sellersRegistry") {
                const doc = documentsState[key];
                if (doc?.fileStoreId) {
                    payloadDocs.push({
                        documentType: "Others",
                        fileStoreId: doc.fileStoreId,
                        documentUid: doc.documentUid,
                    });
                }
            }
        });

        return payloadDocs;
    };

    // const handlePrint = () => window.print();
    const printPDF = () => {

        console.log("BCBCB");
        <DownloadPdfButton targetId="downloadable-component" />
    }

    return (

        <div id="downloadable-component">
            <div style={{
                position: "relative",
                // marginTop: "20px",
                width: "100%",
                maxWidth: "100vw",
                overflowX: "hidden",
                boxSizing: "border-box",
                ...styles.container
            }}>
                <div style={{ marginBottom: "20px", display: "flex", justifyContent: "flex-end" }}>
                    {/* <button style={styles.downloadBtn} > <DownloadPdfButton targetId="downloadable-component" /></button> */}
                </div>

               





                <div style={styles.cardD}>
                    <div style={styles.sectionHeaderDemand}>Demand</div>
                    {/* <div style={styles.row}>
                        <InputField label="Owner Name" value={proOwnerDetail?.units[0].rateZone || "N/A"} />
                        <div style={styles.field}><InputField label="address" value={proOwnerDetail?.units[0].rateZone || "N/A"} /></div>
                        <div style={styles.field}><InputField label="Mpbile NUmber" value={proOwnerDetail?.units[0].rateZone || "N/A"} /></div>
                    </div>*/}


                    {/* {ownersDetail.map((owner, index) => (
                        <React.Fragment key={owner.uuid || index}>
                            <div style={styles.sectionHeader}>Owner {index + 1}</div>
                            <div style={{marginTop:"14px"}}></div>
                            <div style={styles.row}>
                                <InputField label="Owner Name" value={` ${owner?.name || "N/A"}`} />
                                <InputField label="Father/Husband Name" value={owner?.fatherOrHusbandName} />
                                <InputField label="Address" value={owner?.permanentAddress || "N/A"} />
                            </div>
                            <div style={styles.row}>
                                <InputField
        label="Zone"
        value={
          zones.find((f) => f.code === address?.zone)?.name || "N/A"
        }
      />
                               
                                <InputField label="Ward" value={address?.ward || "N/A"} />
                                <InputField label="Colony" value={address?.locality?.name || "N/A"} />
                            </div>
                            <div style={styles.row}>
                                <InputField label="Pincode" value={address?.pincode || "N/A"} />
                                <InputField label="Mobile Number" value={owner?.mobileNumber || "N/A"} />
                                 <InputField
                                    label="Aadhaar ID"
                                    value={
                                        owner?.aadhaarNumber
                                            ? owner.aadhaarNumber.replace(/\d(?=\d{4})/g, "X")
                                            : "N/A"
                                    }
                                />
                            </div>
                            <div style={styles.row}>
                                <InputField
                                    label="Email ID"
                                    value={owner?.emailId || "N/A"}
                                />
                                <InputField label="git" value={owner?.ownerType || "N/A"} />
                                <InputField label="Date" value={owner?.createdDate ? new Date(owner.createdDate).toLocaleDateString("en-GB") : "N/A"} />
                            </div>
                        </React.Fragment>
                    ))} */}
                </div>

                <div style={styles.cardD}>
                    <div style={styles.sectionHeader}>Charges</div>
                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    {["Types of Charges", "Amount"].map((h) => (
                                        <th key={h} style={styles.th}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* {propertyFYDetails.map((item) => {
                                                                        const floor = floorList.find(f => f.code === item.floorNo);
                               return  (

                                    <tr key={item.year}>
                                        <td style={styles.td}>{item.year}</td>                                        
                                    </tr>
                                )
                            }
                            
                            )
                                
                                } */}
                            </tbody>
                        </table>
                    </div>
                    <div style={styles.flexend}>
                       

                        <div style={styles.buttonContainer}>

                            <button style={styles.confirmBtn} onClick={() => handleGobackEdit(true)}>Back</button>
                            <button style={styles.confirmBtn} onClick={() => setShowConfirmPopup(true)}>Confirm</button>
                        </div>
                    </div>
                </div>

               

                {showConfirmPopup && (
                    <div style={styles.modalOverlay}>
                        <div style={styles.modalContent}>
                            <p style={{ fontSize: "18px", fontWeight: "bold", color: "#6b133f", marginBottom: "30px" }}>
                                Are you sure you want to submit this form?
                            </p>
                            <div style={styles.modalButtonContainer}>
                                <button style={styles.modalButton} onClick={() => setShowConfirmPopup(false)}>
                                    Back
                                </button>
                                <button style={styles.modalButton} onClick={() => handleSubmitUpdate()}>
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showSuccessPopup && (
                    <div style={styles.modalOverlay}>
                        <div style={{
                            ...styles.modalContent,
                            width: "350px"
                        }}>
                            <div style={{
                                width: "60px",
                                height: "60px",
                                backgroundColor: "#000",
                                borderRadius: "50%",
                                border: "4px solid #00A859",
                                margin: "0 auto 20px auto",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <span style={{ color: "white", fontSize: "24px" }}>✔</span>
                            </div>                           
                            <p style={{ fontWeight: "600", fontSize: "16px", marginBottom: "10px" }}>
                                Application Submitted Successfully
                            </p>
                            <p style={{ color: "#888", fontSize: "14px", marginBottom: "20px" }}>
                                Application Number<br />
                                {acknowledgmentNumber || "N/A"}
                            </p>
                            <button
                                style={styles.modalButton}
                                onClick={() => {
                                    window.location.href = "/digit-ui/employee";
                                }}
                            >
                                Home
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PropertyForm;