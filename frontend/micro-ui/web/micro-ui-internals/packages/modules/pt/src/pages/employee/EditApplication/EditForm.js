// import { Dropdown, TextInput, Loader } from "@egovernments/digit-ui-react-components";
// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useHistory, useLocation } from "react-router-dom";
// import { newConfig } from "../../../config/Create/config";

// const EditForm = ({ applicationData }) => {

//   const { t } = useTranslation();
//   const history = useHistory();
//   const { state } = useLocation();

//   // Boundary Data
//   const [boundaryData, setBoundaryData] = useState(null);
//   const [zones, setZones] = useState([]);
//   const [wards, setWards] = useState([]);
//   const [colonies, setColonies] = useState([]);
//   const [rateZones, setRateZones] = useState([]);

//   // Form States
//   const [propertyAddress, setPropertyAddress] = useState({
//     zone: "",
//     ward: "",
//     colony: "",
//   });
//   const [correspondenceAddress, setCorrespondenceAddress] = useState({
//     address: "",
//     sameAsProperty: false,
//   });
//   const [assessmentDetails, setAssessmentDetails] = useState({
//     rateZone: "",
//     roadFactor: "",
//     oldPropertyId: "",
//     plotArea: "",
//   });
//   const [propertyDetails, setPropertyDetails] = useState([
//     {
//       usageType: "",
//       usageFactor: "",
//       floorNumber: "",
//       constructionType: "",
//       area: "",
//       fromYear: "",
//       toYear: "",
//     },
//   ]);
//   const [otherDetails, setOtherDetails] = useState({
//     exemption: "",
//     mobileTower: false,
//     bondRoad: false,
//     advertisement: false,
//   });
//   const [selfDeclaration, setSelfDeclaration] = useState(true);
//   const [canSubmit, setSubmitValve] = useState(false);

//   // MDMS Data
//   const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("EMPLOYEE_MUTATION_HAPPENED", false);
//   const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("EMPLOYEE_MUTATION_SUCCESS_DATA", {});
//   const { data: commonFields, isLoading } = Digit.Hooks.pt.useMDMS(Digit.ULBService.getStateId(), "PropertyTax", "CommonFieldsConfig");
//   const stateId = Digit.ULBService.getStateId();
//   const { data: OwnerType = {}, isLoadingOh } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "OwnerType") || {};
//   const { data: Menu = {}, isLoadingm } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "UsageCategoryMajor") || {};
//   const { data: MenuP = {}, isLoadings } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "ConstructionType") || {};
//   const { data: FloorAll = {}, isLoadingF } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "Floor") || {};
//   const { data: OccupancyData = {}, isLoadingO } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "OccupancyType") || {};

//   // Dropdown Options
//   const [usageTypes, setUsageTypes] = useState([]);
//   const [constructionTypes, setConstructionTypes] = useState([]);
//   const [floorList, setFloorList] = useState([]);
//   const [occupancyTypes, setOccupancyTypes] = useState([]);
//   const [ownerTypeOptions, setOwnerTypeOptions] = useState([]);
//   // Year calculations
//   const startYear = 1997;
//   const currentFY = new Date().getMonth() >= 3 ? new Date().getFullYear() : new Date().getFullYear() - 1;
//   const years = Array.from({ length: currentFY - startYear + 1 }, (_, i) => {
//     const from = startYear + i;
//     const to = (from + 1).toString().slice(2);
//     return {
//       label: `${from}-${to}`,
//       value: `${from}-${to}`,
//     };
//   });
//   const currentFYString = `${currentFY}-${(currentFY + 1).toString().slice(2)}`;

//   const normalizeRoadFactor = (value) => {
//     if (!value) return "";
//     const mappings = {
//       'mainroad': 'main',
//       'main': 'main',
//       'secondaryroad': 'secondary',
//       'secondary': 'secondary',
//       'internalroad': 'internal',
//       'internal': 'internal'
//     };
//     const lowerValue = value.toLowerCase();
//     return mappings[lowerValue] || "";
//   };

//   // Add the missing handleReset function
//   const handleReset = () => {
//     setPropertyAddress({
//       zone: "",
//       ward: "",
//       colony: "",
//     });
//     setCorrespondenceAddress({
//       address: "",
//       sameAsProperty: false,
//     });
//     setAssessmentDetails({
//       rateZone: "",
//       roadFactor: "",
//       oldPropertyId: "",
//       plotArea: "",
//     });
//     setPropertyDetails([
//       {
//         usageType: "",
//         usageFactor: "",
//         floorNumber: "",
//         constructionType: "",
//         area: "",
//         fromYear: "",
//         toYear: "",
//       },
//     ]);
//     setOtherDetails({
//       exemption: "",
//       mobileTower: false,
//       bondRoad: false,
//       advertisement: false,
//     });
//     setSelfDeclaration(true);
//   };

//   useEffect(() => {
//     if (applicationData) {
//       setPropertyAddress({
//         zone: applicationData.address?.zone || "",
//         ward: applicationData.address?.ward || "",
//         colony: applicationData.address?.locality?.code || "",
//       });

//       setCorrespondenceAddress({
//         address: applicationData.address?.street || "",
//         sameAsProperty: false,
//       });

//       setAssessmentDetails({
//         rateZone: applicationData.units?.[0]?.rateZone || "",
//         roadFactor: normalizeRoadFactor(applicationData.units?.[0]?.roadFactor) || "",
//         oldPropertyId: applicationData.oldPropertyId || "",
//         plotArea: applicationData.landArea?.toString() || "",
//       });

//       if (applicationData.units && applicationData.units.length > 0) {
//         const formattedUnits = applicationData.units.map((unit) => ({
//           usageType: unit.usageCategory || "",
//           usageFactor: unit.occupancyType || "",
//           floorNumber: unit.floorNo?.toString() || "",
//           constructionType: unit.constructionDetail?.constructionType || "",
//           area: unit.constructionDetail?.builtUpArea?.toString() || "",
//           fromYear: unit.fromYear || "",
//           toYear: unit.toYear || "",
//         }));
//         setPropertyDetails(formattedUnits);
//       }

//       setOtherDetails({
//         exemption: applicationData.owners?.[0].ownerType,
//         mobileTower: applicationData.additionalDetails?.mobileTower || false,
//         bondRoad: applicationData.additionalDetails?.bondRoad || false,
//         advertisement: applicationData.additionalDetails?.advertisement || false,
//       });
//     }
//   }, [applicationData]);

//   // Fetch boundary data
//   useEffect(() => {
//     if (OwnerType?.length) {
//       const filteredItems = OwnerType.filter((item) => item.fromFY === "2025-26");

//       if (filteredItems.length) {
//         const options = filteredItems.map((item) => ({
//           code: item.code,
//           name: t(item.name),
//         }));
//         setOwnerTypeOptions(options);
//       }
//     }
//   }, [isLoadingOh, OwnerType]);
//   useEffect(() => {
//     (async () => {
//       try {
//         const tenantId = Digit.ULBService.getCurrentTenantId();
//         const response = await Digit.LocationService.getRevenueLocalities(tenantId);
//         const cityBoundary = response?.TenantBoundary?.[0]?.boundary?.[0];

//         if (cityBoundary?.children?.length > 0) {
//           setBoundaryData(cityBoundary);
//           const zoneOptions = cityBoundary.children.map((zone) => ({
//             code: zone.code,
//             name: zone.name || zone.code,
//           }));
//           setZones(zoneOptions);
//         }
//       } catch (error) {
//         console.error("Error fetching boundary data:", error);
//       }
//     })();
//   }, []);

//   // Zone -> Ward
//   useEffect(() => {
//     if (propertyAddress.zone && boundaryData?.children?.length > 0) {
//       const selectedZone = boundaryData.children.find((z) => z.code === propertyAddress.zone);
//       const wardList = selectedZone?.children || [];
//       const formattedWards = wardList.map((ward) => ({
//         code: ward.code,
//         name: ward.name || ward.code,
//       }));
//       setWards(formattedWards);
//     } else {
//       setWards([]);
//     }
//   }, [propertyAddress.zone, boundaryData]);

//   // Ward -> Colony
//   useEffect(() => {
//     if (propertyAddress.zone && propertyAddress.ward && boundaryData?.children?.length > 0) {
//       const selectedZone = boundaryData.children.find((z) => z.code === propertyAddress.zone);
//       const selectedWard = selectedZone?.children?.find((w) => w.code === propertyAddress.ward);
//       const colonyList = selectedWard?.children || [];
//       const formattedColonies = colonyList.map((col) => ({
//         code: col.code,
//         name: col.name || col.code,
//       }));
//       setColonies(formattedColonies);
//     } else {
//       setColonies([]);
//     }
//   }, [propertyAddress.ward, propertyAddress.zone, boundaryData]);

//   // Colony -> Rate Zone (auto-set)
//   useEffect(() => {
//     if (propertyAddress.zone && propertyAddress.ward && propertyAddress.colony && boundaryData?.children?.length > 0) {
//       const selectedZone = boundaryData.children.find((z) => z.code === propertyAddress.zone);
//       const selectedWard = selectedZone?.children?.find((w) => w.code === propertyAddress.ward);
//       const selectedColony = selectedWard?.children?.find((c) => c.code === propertyAddress.colony);
//       const rateZoneList = selectedColony?.children || [];
//       const formattedRateZones = rateZoneList.map((rz) => ({
//         code: rz.code,
//         name: rz.name || rz.code,
//       }));
//       setRateZones(formattedRateZones);

//       if (formattedRateZones.length > 0) {
//         setAssessmentDetails((prev) => ({
//           ...prev,
//           rateZone: formattedRateZones[0].name,
//         }));
//       } else {
//         setAssessmentDetails((prev) => ({
//           ...prev,
//           rateZone: "",
//         }));
//       }
//     } else {
//       setRateZones([]);
//       setAssessmentDetails((prev) => ({
//         ...prev,
//         rateZone: "",
//       }));
//     }
//   }, [propertyAddress.colony, propertyAddress.ward, propertyAddress.zone, boundaryData]);

//   // MDMS Data Effects
//   useEffect(() => {
//     if (!isLoadingm && Menu?.PropertyTax?.UsageCategoryMajor) {
//       const usagecat = Menu.PropertyTax.UsageCategoryMajor;
//       const filtered = usagecat
//         ?.filter((e) => e?.code)
//         ?.map((item) => ({
//           i18nKey: item.name,
//           code: item.code,
//         }));
//       setUsageTypes(filtered);
//     }
//   }, [isLoadingm, Menu]);

//   useEffect(() => {
//     if (!isLoadings && MenuP?.PropertyTax?.ConstructionType) {
//       const constructionCat = MenuP.PropertyTax.ConstructionType;
//       const filtered = constructionCat
//         ?.filter((e) => e?.code)
//         ?.map((item) => ({
//           i18nKey: item.name,
//           code: item.code,
//         }));
//       setConstructionTypes(filtered);
//     }
//   }, [isLoadings, MenuP]);

//   useEffect(() => {
//     if (isLoadingF) return;
//     const floors = FloorAll?.PropertyTax?.Floor || [];
//     const mappedFloors = floors
//       .filter(floor => floor?.code && floor?.active)
//       .map(floor => ({
//         i18nKey: floor.name,
//         code: floor.code,
//       }))
//       .sort((a, b) => {
//         const getSortValue = (val) => {
//           const num = parseInt(val, 10);
//           return isNaN(num) ? Number.MAX_SAFE_INTEGER : num;
//         };
//         return getSortValue(b.code) - getSortValue(a.code);
//       });
//     setFloorList(mappedFloors);
//   }, [isLoadingF, FloorAll]);

//   useEffect(() => {
//     if (!isLoadingO && OccupancyData?.PropertyTax?.OccupancyType) {
//       const occupancyList = OccupancyData.PropertyTax.OccupancyType;
//       const filtered = occupancyList
//         ?.filter((item) => item.active)
//         ?.map((item) => ({
//           i18nKey: item.name,
//           code: item.code,
//         }));
//       setOccupancyTypes(filtered);
//     }
//   }, [isLoadingO, OccupancyData]);

//   useEffect(() => {
//     setMutationHappened(false);
//     clearSuccessData();
//   }, []);

//   const defaultValues = {
//     originalData: applicationData,
//     address: applicationData?.address,
//     owners: applicationData?.owners?.map((owner) => ({
//       ...owner,
//       ownerType: { code: owner.ownerType, i18nKey: owner.ownerType },
//       relationship: { code: owner.relationship, i18nKey: `PT_FORM3_${owner.relationship}` },
//       gender: {
//         code: owner.gender,
//         i18nKey: `PT_FORM3_${owner.gender}`,
//         value: owner.gender,
//       },
//     })),
//   };

//   sessionStorage.setItem("PropertyInitials", JSON.stringify(defaultValues?.originalData));

//   const handleUnitChange = (index, field, value) => {
//     const updatedDetails = [...propertyDetails];
//     updatedDetails[index] = {
//       ...updatedDetails[index],
//       [field]: value
//     };
//     setPropertyDetails(updatedDetails);
//   };

//   const addPropertyDetailRow = () => {
//     setPropertyDetails([
//       ...propertyDetails,
//       {
//         usageType: "",
//         usageFactor: "",
//         floorNumber: "",
//         constructionType: "",
//         area: "",
//         fromYear: "",
//         toYear: "",
//       }
//     ]);
//   };

//   const removePropertyDetailRow = (index) => {
//     if (propertyDetails.length > 1) {
//       const updatedDetails = [...propertyDetails];
//       updatedDetails.splice(index, 1);
//       setPropertyDetails(updatedDetails);
//     }
//   };

//   const onFormValueChange = (setValue, formData, formState) => {
//     if (Object.keys(formState.errors).length == 1 && formState.errors.documents)
//       setSubmitValve(true);
//     else
//       setSubmitValve(!Object.keys(formState.errors).length);
//   };

//   const onSubmit = () => {  // Remove the data parameter since we're not using FormComposer
//     const selectedColony = colonies.find(
//       (colony) => colony.code === propertyAddress.colony
//     );

//     const formData = {
//       ...applicationData,
//       address: {
//         ...applicationData?.address,
//         // Remove the data?.address references since we're not using FormComposer
//         street: correspondenceAddress.address,
//         city: applicationData?.address?.city || "",
//         locality: {
//           code: selectedColony?.code || "SUN02",
//           name: selectedColony?.name || "Unknown",
//         },
//         zone: propertyAddress.zone || "SUN02",
//         ward: propertyAddress.ward || "1",
//       },
//       ownerType: otherDetails.exemption,
//       isCorrespondenceAddress: correspondenceAddress?.sameAsProperty,
//       oldPropertyId: assessmentDetails?.oldPropertyId,
//       propertyType: applicationData?.propertyType || "VACANT", // Provide default if missing

//       // Calculate these from propertyDetails array
//       noOfFloors: propertyDetails.length > 0 ? Math.max(...propertyDetails.map(p => parseInt(p.floorNumber) || 0)) + 1 : 1,
//       usageCategory: propertyDetails[0]?.usageType || "RESIDENTIAL",

//       creationReason: state?.workflow?.businessService === "PT.UPDATE" || (applicationData?.documents == null) ? "UPDATE" : applicationData?.creationReason,

//       // Fix: Don't try to access data?.usageCategoryMajor since data is undefined
//       usageCategoryMajor: propertyDetails[0]?.usageType?.split(".")[0] || "RESIDENTIAL",
//       usageCategoryMinor: propertyDetails[0]?.usageType?.split(".")[1] || null,

//       // Use assessmentDetails.plotArea instead of undefined data?.landarea
//       landArea: Number(assessmentDetails.plotArea) || 0,
//       superBuiltUpArea: Number(assessmentDetails.plotArea) || 0,

//       source: "MUNICIPAL_RECORDS",
//       channel: "CFC_COUNTER",

//       additionalDetails: {
//         mobileTower: otherDetails?.mobileTower || false,
//         bondRoad: otherDetails?.bondRoad || false,
//         advertisement: otherDetails?.advertisement || false,
//         unit: propertyDetails.map(unit => ({
//           usageCategory: unit.usageType || "RESIDENTIAL",
//           usageCategoryMajor: unit.usageType?.split(".")[0] || "RESIDENTIAL",
//           occupancyType: unit.usageFactor || "SELFOCCUPIED",
//           constructionDetail: {
//             builtUpArea: unit.area || "0",
//             constructionType: unit.constructionType || null,
//           },
//           floorNo: parseInt(unit.floorNumber) || 0,
//           rateZone: assessmentDetails?.rateZone || "",
//           roadFactor: assessmentDetails?.roadFactor || "",
//           fromYear: unit.fromYear,
//           toYear: unit.toYear,
//         })),
//       },

//       // Handle documents properly
//       documents: applicationData?.documents ? applicationData?.documents : null,

//       // Properly structure units array
//       units: propertyDetails.map((unit, index) => ({
//         id: applicationData?.units?.[index]?.id || null, // Preserve existing unit IDs if updating
//         tenantId: applicationData?.tenantId,
//         floorNo: parseInt(unit.floorNumber) || 0,
//         usageCategory: unit.usageType || "RESIDENTIAL",
//         usesCategoryMajor: unit.usageType || "RESIDENTIAL",
//         occupancyType: unit.usageFactor || "SELFOCCUPIED",
//         constructionDetail: {
//           builtUpArea: parseFloat(unit.area) || 0,
//           constructionType: unit.constructionType || null,
//           constructionDate: null,
//         },
//         active: true,
//         rateZone: assessmentDetails?.rateZone || "",
//         roadFactor: assessmentDetails?.roadFactor || "",
//         fromYear: unit.fromYear,
//         toYear: unit.toYear,
//         arv: null,
//       })),

//       workflow: state?.workflow,
//       applicationStatus: "UPDATE",
//     };

//     // Remove units with active: false if action is OPEN
//     if (state?.workflow?.action === "OPEN") {
//       formData.units = formData.units.filter((unit) => unit.active);
//     }

//     console.log("Submitting formData:", formData); // Debug log to check the structure

//     history.push("/digit-ui/employee/pt/response", {
//       Property: formData,
//       key: "UPDATE",
//       action: "SUBMIT"
//     });
//   };

//   if (isLoading) {
//     return <Loader />;
//   }

//   const configs = commonFields ? commonFields : newConfig;

//   // Styles object
//   const styles = {
//     sectionSty: {
//       boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//       backgroundColor: "#FFFFFF",
//       borderRadius: "8px",
//       padding: "20px",
//       marginBottom: "20px"
//     },
//     sectionStyle: {
//       fontFamily: "'Poppins', sans-serif",
//       fontWeight: 500,
//       fontSize: "16px",
//       color: "#6b133f",
//       margin: "-20px -20px 20px -20px",
//       padding: "10px 20px",
//       textAlign: "left"
//     },
//     gridStyle: {
//       display: "grid",
//       gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
//       gap: "24px",
//       marginBottom: "20px",
//     },
//     labelStyle: {
//       fontFamily: "'Poppins', sans-serif",
//       fontWeight: 400,
//       fontSize: "14px",
//       color: "#282828",
//       marginBottom: "8px",
//       display: "block",
//     },
//     inputStyle: {
//       width: "100%",
//       height: "44px",
//       padding: "0 12px",
//       border: "1px solid #d6d5d4",
//       borderRadius: "6px",
//       fontSize: "14px",
//       fontFamily: "'Poppins', sans-serif",
//       transition: "all 0.3s ease",
//       background: "white",
//       outline: "none",
//     },
//     textareaStyle: {
//       width: "100%",
//       minHeight: "80px",
//       padding: "12px",
//       border: "1px solid #d6d5d4",
//       borderRadius: "6px",
//       fontSize: "14px",
//       fontFamily: "'Poppins', sans-serif",
//       transition: "all 0.3s ease",
//       background: "white",
//       outline: "none",
//       resize: "vertical",
//     },
//     checkboxStyle: {
//       width: "18px",
//       height: "18px",
//       marginRight: "8px",
//       verticalAlign: "middle",
//       cursor: "pointer",
//     },
//     checkboxLabel: {
//       display: "flex",
//       alignItems: "center",
//       fontFamily: "'Poppins', sans-serif",
//       fontSize: "14px",
//       color: "#282828",
//       cursor: "pointer",
//     },
//     cellHeaderStyle: {
//       padding: "12px 8px",
//       textAlign: "left",
//       backgroundColor: "#f8f8f8",
//       borderBottom: "2px solid #6b133f",
//       fontFamily: "'Poppins', sans-serif",
//       fontWeight: 500,
//       fontSize: "14px",
//       color: "#282828",
//       whiteSpace: "nowrap",
//     },
//     tableCell: {
//       padding: "8px",
//       borderBottom: "1px solid #e0e0e0",
//     },
//     select: {
//       width: "100%",
//       height: "38px",
//       padding: "0 8px",
//       border: "1px solid #d6d5d4",
//       borderRadius: "4px",
//       fontSize: "14px",
//       fontFamily: "'Poppins', sans-serif",
//       transition: "all 0.3s ease",
//       background: "white",
//       outline: "none",
//     },
//     actionButton: {
//       padding: "8px 16px",
//       margin: "0 4px",
//       backgroundColor: "#6b133f",
//       color: "white",
//       border: "none",
//       borderRadius: "6px",
//       fontSize: "14px",
//       fontWeight: 500,
//       fontFamily: "'Poppins', sans-serif",
//       cursor: "pointer",
//       transition: "all 0.3s ease",
//     },
//     removeButton: {
//       padding: "6px 12px",
//       borderRadius: "4px",
//       border: "1px solid #FF4C51",
//       color: "#FF4C51",
//       background: "white",
//       fontSize: "13px",
//       fontFamily: "'Poppins', sans-serif",
//       cursor: "pointer",
//       transition: "all 0.3s ease",
//     },
//     submitButton: {
//       minWidth: "140px",
//       height: "44px",
//       padding: "0 30px",
//       backgroundColor: "#6b133f",
//       color: "#fff",
//       border: "none",
//       borderRadius: "6px",
//       fontSize: "15px",
//       fontWeight: 500,
//       fontFamily: "'Poppins', sans-serif",
//       cursor: "pointer",
//       transition: "all 0.3s ease",
//     },
//     clearButton: {
//       minWidth: "140px",
//       height: "44px",
//       padding: "0 24px",
//       borderRadius: "6px",
//       border: "2px solid #FF4C51",
//       color: "#FF4C51",
//       background: "white",
//       fontSize: "15px",
//       fontWeight: 500,
//       fontFamily: "'Poppins', sans-serif",
//       cursor: "pointer",
//       transition: "all 0.3s ease",
//     },
//     buttonContainer: {
//       display: "flex",
//       justifyContent: "flex-end",
//       gap: "16px",
//       marginTop: "40px",
//       paddingTop: "20px",
//       borderTop: "1px solid #e0e0e0",
//       flexWrap: "wrap",
//     },
//     correspondenceWrapper: {
//       display: "flex",
//       flexWrap: "wrap",
//       gap: "15px",
//       alignItems: "center",
//       marginBottom: "20px",
//     },
//   };

//   return (
//     <div style={{ background: "#f5f5f5", minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

//         .form-input:focus, .form-select:focus, .form-textarea:focus {
//           border-color: #6b133f !important;
//           box-shadow: 0 0 0 3px rgba(107, 19, 63, 0.1) !important;
//         }

//         .form-input:disabled, .form-select:disabled {
//           background: #f5f5f5 !important;
//           cursor: not-allowed !important;
//         }

//         .btn-submit:hover {
//           background: #551030 !important;
//           transform: translateY(-1px);
//           box-shadow: 0 4px 12px rgba(107, 19, 63, 0.3) !important;
//         }

//         .btn-clear:hover {
//           background: #fff5f5 !important;
//           transform: translateY(-1px);
//         }

//         .btn-action:hover {
//           background: #551030 !important;
//           transform: translateY(-1px);
//         }

//         .btn-remove:hover {
//           background: #fff5f5 !important;
//         }

//         @media (max-width: 768px) {
//           .form-grid {
//             grid-template-columns: 1fr !important;
//           }
//           .button-container {
//             flex-direction: column-reverse !important;
//           }
//           .button-container button {
//             width: 100% !important;
//           }
//         }
//       `}</style>

//       {/* Property Address */}
//       <div style={styles.sectionSty}>
//         <div style={styles.sectionStyle}>{t("Property Address")}</div>
//         <div className="form-grid" style={styles.gridStyle}>
//           <div>
//             <label style={styles.labelStyle}>
//               {t("Zone")} <span style={{ color: "#d00000" }}>*</span>
//             </label>
//             <select
//               className="form-select"
//               style={styles.inputStyle}
//               value={propertyAddress.zone}
//               onChange={(e) => setPropertyAddress({ zone: e.target.value, ward: "", colony: "" })}
//             >
//               <option value="">{t("Select")}</option>
//               {zones.map((zone) => (
//                 <option key={zone.code} value={zone.code}>{zone.name}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label style={styles.labelStyle}>
//               {t("Ward")} <span style={{ color: "#d00000" }}>*</span>
//             </label>
//             <select
//               className="form-select"
//               style={styles.inputStyle}
//               value={propertyAddress.ward}
//               onChange={(e) => setPropertyAddress({ ...propertyAddress, ward: e.target.value, colony: "" })}
//               disabled={!propertyAddress.zone}
//             >
//               <option value="">{t("Select")}</option>
//               {wards.map((ward) => (
//                 <option key={ward.code} value={ward.code}>{ward.name}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label style={styles.labelStyle}>
//               {t("Colony")} <span style={{ color: "#d00000" }}>*</span>
//             </label>
//             <select
//               className="form-select"
//               style={styles.inputStyle}
//               value={propertyAddress.colony}
//               onChange={(e) => setPropertyAddress({ ...propertyAddress, colony: e.target.value })}
//               disabled={!propertyAddress.ward}
//             >
//               <option value="">{t("Select")}</option>
//               {colonies.map((colony) => (
//                 <option key={colony.code} value={colony.code}>{colony.name}</option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Correspondence Address */}
//       <div style={styles.sectionSty}>
//         <div style={styles.sectionStyle}>{t("Correspondence Address")}</div>
//         <div style={styles.correspondenceWrapper}>
//           <textarea
//             className="form-textarea"
//             style={{
//               ...styles.textareaStyle,
//               flex: "1 1 300px",
//               minWidth: "250px",
//             }}
//             placeholder={t("Enter address")}
//             value={correspondenceAddress.address}
//             onChange={(e) => setCorrespondenceAddress({ ...correspondenceAddress, address: e.target.value })}
//             disabled={correspondenceAddress.sameAsProperty}
//           />
//           <label style={styles.checkboxLabel}>
//             <input
//               type="checkbox"
//               style={styles.checkboxStyle}
//               checked={correspondenceAddress.sameAsProperty}
//               onChange={(e) =>
//                 setCorrespondenceAddress({
//                   ...correspondenceAddress,
//                   sameAsProperty: e.target.checked,
//                   address: e.target.checked ? "Same as property address" : ""
//                 })
//               }
//             />
//             {t("Same as Property Address")}
//           </label>
//         </div>
//       </div>

//       {/* Assessment Details */}
//       <div style={styles.sectionSty}>
//         <div style={styles.sectionStyle}>{t("Assessment Details")}</div>
//         <div className="form-grid" style={styles.gridStyle}>
//           <div>
//             <label style={styles.labelStyle}>
//               {t("Rate Zone")} <span style={{ color: "#d00000" }}>*</span>
//             </label>
//             <input
//               className="form-input"
//               style={styles.inputStyle}
//               placeholder={t("Auto fetched")}
//               disabled
//               value={assessmentDetails.rateZone}
//             />
//           </div>
//           <div>
//             <label style={styles.labelStyle}>
//               {t("Road Factor")} <span style={{ color: "#d00000" }}>*</span>
//             </label>
//             <select
//               className="form-select"
//               style={styles.inputStyle}
//               value={assessmentDetails.roadFactor}
//               onChange={(e) => setAssessmentDetails({ ...assessmentDetails, roadFactor: e.target.value })}
//             >
//               <option value="">{t("Select")}</option>
//               <option value="main">{t("Main Road")}</option>
//               <option value="secondary">{t("Secondary Road")}</option>
//               <option value="internal">{t("Internal Road")}</option>
//             </select>
//           </div>
//           <div>
//             <label style={styles.labelStyle}>{t("Old Property ID")}</label>
//             <input
//               className="form-input"
//               style={styles.inputStyle}
//               type="text"
//               placeholder={t("Enter old ID")}
//               value={assessmentDetails.oldPropertyId}
//               onChange={(e) => setAssessmentDetails({ ...assessmentDetails, oldPropertyId: e.target.value })}
//             />
//           </div>
//           <div>
//             <label style={styles.labelStyle}>
//               {t("Plot Area (Sq feet)")} <span style={{ color: "#d00000" }}>*</span>
//             </label>
//             <input
//               className="form-input"
//               style={styles.inputStyle}
//               type="number"
//               placeholder={t("Enter area")}
//               value={assessmentDetails.plotArea}
//               onChange={(e) => setAssessmentDetails({ ...assessmentDetails, plotArea: e.target.value })}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Property Details Table */}
//       <div style={styles.sectionSty}>
//         <div style={styles.sectionStyle}>{t("Property Details")}</div>
//         <div style={{ overflowX: "auto" }}>
//           <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
//             <thead>
//               <tr>
//                 <th style={styles.cellHeaderStyle}>{t("Usage Type")}</th>
//                 <th style={styles.cellHeaderStyle}>{t("Usage Factor")}</th>
//                 <th style={styles.cellHeaderStyle}>{t("Floor Number")}</th>
//                 <th style={styles.cellHeaderStyle}>{t("Type of Construction")}</th>
//                 <th style={styles.cellHeaderStyle}>{t("Area (Sq feet)")}</th>
//                 <th style={styles.cellHeaderStyle}>{t("From Year")}</th>
//                 <th style={styles.cellHeaderStyle}>{t("To Year")}</th>
//                 <th style={styles.cellHeaderStyle}>{t("Actions")}</th>
//               </tr>
//             </thead>
//             <tbody>
//               {propertyDetails.map((item, index) => (
//                 <tr key={index}>
//                   <td style={styles.tableCell}>
//                     <select
//                       className="form-select"
//                       style={styles.select}
//                       value={item.usageType}
//                       onChange={(e) => handleUnitChange(index, "usageType", e.target.value)}
//                     >
//                       <option value="">{t("Select")}</option>
//                       {usageTypes.map((type) => (
//                         <option key={type.code} value={type.code}>
//                           {t(type.i18nKey)}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td style={styles.tableCell}>
//                     <select
//                       className="form-select"
//                       style={styles.select}
//                       value={item.usageFactor}
//                       onChange={(e) => handleUnitChange(index, "usageFactor", e.target.value)}
//                     >
//                       <option value="">{t("Select")}</option>
//                       {occupancyTypes.map((type) => (
//                         <option key={type.code} value={type.code}>
//                           {t(type.i18nKey)}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td style={styles.tableCell}>
//                     <select
//                       className="form-select"
//                       style={styles.select}
//                       value={item.floorNumber}
//                       onChange={(e) => handleUnitChange(index, "floorNumber", e.target.value)}
//                     >
//                       <option value="">{t("Select")}</option>
//                       {floorList.map((floor) => (
//                         <option key={floor.code} value={floor.code}>
//                           {t(floor.i18nKey)}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td style={styles.tableCell}>
//                     <select
//                       className="form-select"
//                       style={styles.select}
//                       value={item.constructionType}
//                       onChange={(e) => handleUnitChange(index, "constructionType", e.target.value)}
//                     >
//                       <option value="">{t("Select")}</option>
//                       {constructionTypes.map((type) => (
//                         <option key={type.code} value={type.code}>
//                           {t(type.i18nKey)}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td style={styles.tableCell}>
//                     <input
//                       type="number"
//                       className="form-input"
//                       style={styles.select}
//                       placeholder={t("Enter area")}
//                       value={item.area}
//                       onChange={(e) => handleUnitChange(index, "area", e.target.value)}
//                     />
//                   </td>
//                   <td style={styles.tableCell}>
//                     <select
//                       className="form-select"
//                       style={styles.select}
//                       value={item.fromYear}
//                       onChange={(e) => {
//                         handleUnitChange(index, "fromYear", e.target.value);
//                         if (item.toYear && parseInt(item.toYear.split("-")[0]) < parseInt(e.target.value.split("-")[0])) {
//                           handleUnitChange(index, "toYear", "");
//                         }
//                       }}
//                     >
//                       <option value="">{t("From Year")}</option>
//                       {years.map((year) => (
//                         <option key={year.value} value={year.value}>
//                           {year.label}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td style={styles.tableCell}>
//                     <select
//                       className="form-select"
//                       style={styles.select}
//                       value={item.toYear}
//                       onChange={(e) => handleUnitChange(index, "toYear", e.target.value)}
//                       disabled={!item.fromYear}
//                     >
//                       <option value="">{t("To Year")}</option>
//                       {item.fromYear && (
//                         <option value={currentFYString}>{currentFYString}</option>
//                       )}
//                     </select>
//                   </td>
//                   <td style={styles.tableCell}>
//                     <button
//                       className="btn-remove"
//                       style={styles.removeButton}
//                       onClick={() => removePropertyDetailRow(index)}
//                       disabled={propertyDetails.length <= 1}
//                     >
//                       {t("Remove")}
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <button
//           className="btn-action"
//           style={styles.actionButton}
//           onClick={addPropertyDetailRow}
//         >
//           + {t("Add Row")}
//         </button>
//       </div>

//       {/* Other Details */}
//       <div style={styles.sectionSty}>
//         <div style={styles.sectionStyle}>{t("Other Details")}</div>
//         <div className="form-grid" style={styles.gridStyle}>
//           {/* <div>
//             <label style={styles.labelStyle}>{t("Exemption Applicable")}</label>
//             <select
//               className="form-select"
//               style={{ ...styles.inputStyle, maxWidth: "300px" }}
//               value={otherDetails.exemption}
//               onChange={(e) => setOtherDetails({ ...otherDetails, exemption: e.target.value })}
//             >
//               <option value="">{t("Select")}</option>
//               <option value="yes">{t("Yes")}</option>
//               <option value="no">{t("No")}</option>
//             </select>
//           </div> */}
//           <div>
//             <label style={styles.labelStyle}>{t("Exemption Applicable")}</label>
//             <Dropdown
//               style={{ ...styles.inputStyle, maxWidth: "300px" }}
//               t={t}
//               option={ownerTypeOptions}
//               selected={ownerTypeOptions.find((opt) => opt.code === otherDetails.exemption)}
//               select={(option) => setOtherDetails({ ...otherDetails, exemption: option.code })}
//               optionKey="name"
//               placeholder={t("Select")}
//             />
//           </div>

//         </div>
//         <div style={{ marginTop: "20px", display: "flex", gap: "24px", flexWrap: "wrap" }}>
//           <label style={styles.checkboxLabel}>
//             <input
//               type="checkbox"
//               style={styles.checkboxStyle}
//               checked={otherDetails.mobileTower}
//               onChange={(e) => setOtherDetails({ ...otherDetails, mobileTower: e.target.checked })}
//             />
//             {t("Mobile Tower")}
//           </label>
//           <label style={styles.checkboxLabel}>
//             <input
//               type="checkbox"
//               style={styles.checkboxStyle}
//               checked={otherDetails.bondRoad}
//               onChange={(e) => setOtherDetails({ ...otherDetails, bondRoad: e.target.checked })}
//             />
//             {t("Bond Road")}
//           </label>
//           <label style={styles.checkboxLabel}>
//             <input
//               type="checkbox"
//               style={styles.checkboxStyle}
//               checked={otherDetails.advertisement}
//               onChange={(e) => setOtherDetails({ ...otherDetails, advertisement: e.target.checked })}
//             />
//             {t("Advertisement")}
//           </label>
//         </div>
//       </div>

//       {/* Self Declaration */}
//       <div style={styles.sectionSty}>
//         <div style={styles.sectionStyle}>{t("Self Declaration")}</div>
//         <label style={{ ...styles.checkboxLabel, alignItems: "flex-start", padding: "10px 0" }}>
//           <input
//             type="checkbox"
//             style={{ ...styles.checkboxStyle, marginTop: "3px" }}
//             checked={selfDeclaration}
//             onChange={(e) => setSelfDeclaration(e.target.checked)}
//           />
//           <span style={{ fontSize: "14px", lineHeight: "1.6", color: "#282828" }}>
//             मैं यह सत्यापित करता / करती हूं कि उपरोक्त विवरणी मे दी गयी जानकारी सत्य है। मैने / हमने जिस भवन/ भूमि के संबंध मे विवरणी प्रस्तुत की है उसका मैं स्वामी/अधिभोगी हूं इसमे कोई भी तथ्य छू पाये अथवा गलत नहीं है। नोट - मध्यप्रदेश नगर पालिका (वार्षिक भाड़ा मूल्य का अवधारणा) नियम 1997 के नियम 10 (1) अंतर्गत प्रत्येक भवन स्वामी को स्व निर्धारण विवरणी (Self Assessment Form) के साथ संलग्नक (Attachment) scan कर सब्मिट करें । स्व निर्धारण विवरणी मौके पर सत्यापन के अध्याधीन रहेगी, जाँच मे अंतर पाये जाने पर या अन्य कारण से आवश्यक पाये जाने पर वार्षिक भाड़ा मूल्य का पुर्निर्धारण किया जाएगा व 0 प्रतिशत से अधिक अंतर पाये जाने पर सम्पतिकर के पुर्निर्धारण के अंतर की राशि की पाँच गुना शास्ति ,अधिरोपित की जा सकेगी।
//           </span>
//         </label>
//       </div>

//       {/* Submit and Clear buttons */}
//       <div style={styles.sectionSty}>
//         <div className="button-container" style={styles.buttonContainer}>
//           <button
//             className="btn-clear"
//             type="button"
//             style={styles.clearButton}
//             onClick={handleReset}
//           >
//             {t("Clear")}
//           </button>
//           <button
//             className="btn-submit"
//             type="button"
//             style={styles.submitButton}
//             onClick={onSubmit}
//           >
//             {t("Submit")}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditForm;




import {
  Loader, Card,
  SubmitBar,
  TextInput,
  Dropdown,
  CheckBox,
} from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { PTService } from "../../../../../../libraries/src/services/elements/PT";
import styles from "./IndexStyle"
import OwnershipDetailsSection from "./OwnershipDetailsSection";
import AddressSection from "./AddressSection";
import AssessmentDetailsSection from "./AssessmentDetailsSection";
import PropertyDetailsTableSection from "./PropertyDetailsTableSection";
import AttachmentsSection from "./Attachments";
import OtherDetailsSection from "./OtherDetailsSection";
// import SuccessModal from "./SuccessModal";
import CorrespondenceAddressSection from "./CorrespondenceAddressSection";
import LocationDetails from "./LocationDetails";
import SelfDeclaration from "./SelfDeclaration";

const EditUpdateForm = ({ applicationData }) => {
  const location = useLocation();
  console.log("EditUpdateForm Propssssssssss:", applicationData.propertyCategory);
  
  const { state } = useLocation();
  const { t } = useTranslation();

  const [proOwnerDetail, setProOwnerDetail] = useState(null);
  const [showPreviewButton, setShowPreviewButton] = useState(false);
  const [showAssessmentPop, setShowAssesmentPop] = useState(false);
  const [acknowledgmentNumber, setAcknowledgmentNumber] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [status, setStatus] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isJointStarted, setIsJointStarted] = useState(false); // NEW
  const [selectedAssessmentYear, setSelectedAssessmentYear] = useState(null);
  const [documents, setDocuments] = useState({
    photoId: null,
    ownershipDoc: null,
    sellersRegistry: null
  });
  const [longLat, setLongLat] = useState({
    lat: null,
    long: null
  });
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [fileResetKey, setFileResetKey] = useState(0);

  const [owners, setOwners] = useState([
    {
      title: "GFHGH",
      name: "",
      aadhaar: "",
      hindiTitle: "",
      hindiName: "",
      fatherHusbandName: "",
      relationship: "",
      email: "",
      altNumber: "",
      mobile: "",
      samagraID: "",
      noSamagra: false,
    }
  ]);
  const [ownershipType, setOwnershipType] = useState(null);
  const [propertyCategoryInput, setPropertyCategoryInput] = useState(null);
  const [registryId, setRegistryId] = useState("");
  const [selectedRateZone, setSelectedRateZone] = useState("");
  const [addressDetails, setAddressDetails] = useState({
    doorNo: "",
    address: "",
    pincode: "",
    colony: null,
    ward: null,
    zone: null,
  });
  const [correspondenceAddress, setCorrespondenceAddress] = useState("");
  const [isSameAsPropertyAddress, setIsSameAsPropertyAddress] = useState(false);
  const [rateZones, setRateZones] = useState([])
  const [assessmentDetails, setAssessmentDetails] = useState({
    rateZone: null, // Usually fetched
    roadFactor: null,
    oldPropertyId: "",
    plotArea: "",
  });
  const [unit, setUnit] = useState([{
    usageType: "",
    usageFactor: "",
    floorNo: "",
    constructionType: "",
    area: "",
    fromYear: "",
    toYear: ""
  }]);
  const [propertyDetails, setPropertyDetails] = useState({
    propertyType: "",
    roomsArea: "",
    exemption: "",
    essentialTax: ""
  });
  const [checkboxes, setCheckboxes] = useState({
    mobileTower: false,
    broadRoad: false,
    advertisement: false,
    seniorCitizenDiscount: false,
    selfDeclaration: true,
  });
  const [formErrors, setFormErrors] = useState({});
  const history = useHistory();

  const { data: commonFields, isLoading } = Digit.Hooks.pt.useMDMS(Digit.ULBService.getStateId(), "PropertyTax", "CommonFieldsConfig");

  const token = localStorage.getItem("token");
  const stateId = Digit.ULBService.getStateId();
  const { data: AssessmentYearsList, isLoadings } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "AssessmentYear");

  const assessmentYears = (AssessmentYearsList?.PropertyTax?.AssessmentYear || []).map((item) => ({
    code: item.code,
    name: item.name, // Show year like "2024-25"
  }));

  let userInfo1 = JSON.parse(localStorage.getItem("user-info"));

  const tenantId = userInfo1?.tenantId;
  const mutation = Digit.Hooks.pt.usePropertyAPI(tenantId, true);
  const mutationUpdate = Digit.Hooks.pt.useUpdateContent(tenantId, true);
  let tenantIdss = Digit.ULBService.getCurrentTenantId();

  const {
    isLoading: ptCalculationEstimateLoading,
    data: ptCalculationEstimateData,
    mutate: ptCalculationEstimateMutate,
    error,
  } = Digit.Hooks.pt.usePtCalculationEstimate(tenantId);

  const handleEstimate = () => {
    const toYear =
      Array.isArray(unit) && unit.length > 0 ? unit[0].toYear : null;

    const payload = {
      Assessment: {
        financialYear: toYear,
        propertyId: applicationData?.propertyId,
        tenantId: tenantId,
        source: "MUNICIPAL_RECORDS",
        channel: "CITIZEN",
        assessmentDate: Date.now(),
      }
    };

    ptCalculationEstimateMutate(payload, {
      onSuccess: (data) => {
        history.push({
          pathname: "/digit-ui/employee/pt/PreviewView",
          state: { data, applicationData }// send full object
        });
      },
      onError: (error) => {
        alert("Estimate error:", error);
      },
    });
  };
  const handleSubmitUpdate = async () => {

    const payload = {
      Property: {
        id: applicationData?.id,
        registryId: applicationData?.registryId || "",
        propertyId: applicationData?.propertyId || "",
        accountId: applicationData?.accountId || "",
        acknowldgementNumber: applicationData?.acknowldgementNumber || "",
        status: applicationData?.status,
        tenantId: userInfo1?.tenantId,
        oldPropertyId: assessmentDetails.oldPropertyId || null,
        essentialTax: propertyDetails.essentialTax?.code || propertyDetails.essentialTax,
        address: {
          city: "indore",
          locality: {
            code: addressDetails.colony?.code || "SUN02",
            name: addressDetails.colony?.name || "map with zone",
            latitude: longLat.lat,
            longitude: longLat.long,
          },
          geoLocation: {
            latitude: longLat.lat || applicationData?.address?.geoLocation?.latitude,
            longitude: longLat.long || applicationData?.address?.geoLocation?.longitude,
          },
          zone: addressDetails.zone?.code || "SUN02",
          street: addressDetails.address || "main",
          doorNo: addressDetails.doorNo || "23",
          pincode: addressDetails.pincode || "",
          ward: addressDetails.ward?.code || "1",
          documents: [],
        },

        ownershipCategory: ownershipType || "INDIVIDUAL.SINGLEOWNER",
        propertyCategory:propertyCategoryInput,

        owners: owners.map((owner, index) => ({
          uuid: applicationData?.owners?.[index]?.uuid || null,
          userName: applicationData?.owners?.[index]?.userName || null,
          active: true,
          status: "ACTIVE",
          salutation: owner.title || "mr",
          title: "title",
          name: owner.name || `Owner ${index + 1}`,
          salutationHindi: owner.hindiTitle,
          hindiName: owner.hindiName || "",
          fatherOrHusbandName: owner.fatherHusbandName || "UnitTest",
          gender: "MALE",
          aadhaarNumber: owner.aadhaar || "",
          altContactNumber: owner.altNumber || "",
          isCorrespondenceAddress: correspondenceAddress,
          mobileNumber: owner.mobile,
          emailId: owner.email,
          ownerType: propertyDetails.exemption.code,
          roles: applicationData?.owners?.[index]?.roles || [],
          permanentAddress:
            addressDetails.address,
          type: "CITIZEN",
          relationship: owner.relationship || "FATHER",
          samagraId: owner.samagraID,
          tenantId: applicationData?.owners?.[index]?.tenantId || userInfo1?.tenantId || "",
          documents: [
            {
              documentType: "Proof of Identity",
              fileStoreId: documents.photoId?.fileStoreId || applicationData.documents.find(d => d.documentType === "Proof of Identity")?.fileStoreId,
              documentUid: documents.photoId?.documentUid || applicationData.documents.find(d => d.documentType === "Proof of Identity")?.documentUid,
            },
            documents?.sellersRegistry && {

              documentType: "Others",
              fileStoreId: documents.sellersRegistry?.fileStoreId || applicationData.documents.find(d => d.documentType === "Others")?.fileStoreId,
              documentUid: documents.sellersRegistry?.documentUid || applicationData.documents.find(d => d.documentType === "Others")?.documentUid
            },
            {
              documentType: "Proof of Ownership",
              fileStoreId: documents.ownershipDoc?.fileStoreId || applicationData.documents.find(d => d.documentType === "Proof of Ownership")?.fileStoreId,
              documentUid: documents.ownershipDoc?.documentUid || applicationData.documents.find(d => d.documentType === "Proof of Ownership")?.documentUid,
            },
            {
              documentType: "Photo Captured",
              fileStoreId: capturedPhoto || null,
              documentUid: capturedPhoto || null,
            },
            ...Object.keys(documents)
              .filter(key => key.startsWith("others_"))
              .map(key => ({
                documentType: "Others",  // 👈 these will go separately
                fileStoreId:
                  documents[key]?.fileStoreId ||
                  applicationData.documents.find(d => d.documentType === "Others")?.fileStoreId,
                documentUid:
                  documents[key]?.documentUid ||
                  applicationData.documents.find(d => d.documentType === "Others")?.documentUid,
              })),
          ].filter(Boolean),
        })),

        institution: null,

        documents: [
          {
            documentType: "Proof of Identity",
            fileStoreId: documents.photoId?.fileStoreId || applicationData.documents.find(d => d.documentType === "Proof of Identity")?.fileStoreId,
            documentUid: documents.photoId?.documentUid || applicationData.documents.find(d => d.documentType === "Proof of Identity")?.documentUid,
          },
          documents?.sellersRegistry && {

            documentType: "Others",
            fileStoreId: documents.sellersRegistry?.fileStoreId || applicationData.documents.find(d => d.documentType === "Others")?.fileStoreId,
            documentUid: documents.sellersRegistry?.documentUid || applicationData.documents.find(d => d.documentType === "Others")?.documentUid
          },
          {
            documentType: "Proof of Ownership",
            fileStoreId: documents.ownershipDoc?.fileStoreId || applicationData.documents.find(d => d.documentType === "Proof of Ownership")?.fileStoreId,
            documentUid: documents.ownershipDoc?.documentUid || applicationData.documents.find(d => d.documentType === "Proof of Ownership")?.documentUid,
          },
          {
            documentType: "Photo Captured",
            fileStoreId: capturedPhoto || null,
            documentUid: capturedPhoto || null,
          },
          ...Object.keys(documents)
            .filter(key => key.startsWith("others_"))
            .map(key => ({
              documentType: "Others",  // 👈 these will go separately
              fileStoreId:
                documents[key]?.fileStoreId ||
                applicationData.documents.find(d => d.documentType === "Others")?.fileStoreId,
              documentUid:
                documents[key]?.documentUid ||
                applicationData.documents.find(d => d.documentType === "Others")?.documentUid,
            })),
        ].filter(Boolean),

        units: unit.map((unit, index) => (
          {
            id: applicationData?.units?.[index]?.id || null, // Preserve existing unit IDs if updating
            active: true,
            usageCategory: unit.usageType || "RESIDENTIAL",
            usesCategoryMajor: unit.usageType || "RESIDENTIAL",
            occupancyType: unit.usageFactor || "SELFOCCUPIED",
            constructionDetail: {
              builtUpArea: unit.area || "3000",
              constructionType: unit.constructionType || null,
            },
            floorNo: parseInt(unit.floorNo) || 0,
            rateZone: selectedRateZone ? selectedRateZone : rateZones?.[0]?.code || "",
            roadFactor: assessmentDetails.roadFactor?.code || applicationData?.units[0]?.roadFactor,
            fromYear: unit.fromYear,
            toYear: unit.toYear,
          })),


        landArea: assessmentDetails.plotArea?.toString() || "3000",
        propertyType: propertyDetails.propertyType?.code || "BUILTUP.INDEPENDENTPROPERTY",
        noOfFloors: unit.length || null,
        superBuiltUpArea: null,
        // usageCategory: unit.usageType || "RESIDENTIAL",
        usageCategory: unit.find(u => u.usageType) ? unit.find(u => u.usageType).usageType : "RESIDENTIAL",

        additionalDetails: {
          inflammable: false,
          heightAbove36Feet: false,
          propertyType: {
            i18nKey: "COMMON_PROPTYPE_BUILTUP_INDEPENDENTPROPERTY",
            code: propertyDetails.propertyType?.code || "BUILTUP.INDEPENDENTPROPERTY",
          },
          mobileTower: checkboxes.mobileTower || false,
          bondRoad: checkboxes.broadRoad || false,
          advertisement: checkboxes.advertisement || false,
          builtUpArea: null,
          noOfFloors: {
            i18nKey: "PT_GROUND_FLOOR_OPTION",
            code: 0,
          },
          noOofBasements: {
            i18nKey: "PT_NO_BASEMENT_OPTION",
            code: 0,
          },
          unit: unit.map(unit => (
            {
              usageCategory: unit.usageType || "RESIDENTIAL",
              usesCategoryMajor: unit.usageType || "RESIDENTIAL",
              occupancyType: unit.usageFactor || "SELFOCCUPIED",
              constructionDetail: {
                builtUpArea: unit.area || "3000",
                constructionType: unit.constructionType || null,
              },
              floorNo: parseInt(unit.floorNo) || 0,
              rateZone: selectedRateZone ? selectedRateZone : rateZones?.[0]?.code || "",
              roadFactor: assessmentDetails.roadFactor?.code || applicationData?.units[0]?.roadFactor,
              fromYear: unit.fromYear,
              toYear: unit.toYear,
              active: true,
            })),
          basement1: null,
          basement2: null,
        },
        // workflow: {
        //   action: "OPEN",
        //   moduleName: "PT",
        //   businessService: "PT.UPDATE"
        // },
        workflow: state?.workflow,
        applicationStatus: "UPDATE",
        channel: "CFC_COUNTER",
        creationReason: state?.workflow?.businessService === "PT.UPDATE" || (applicationData?.documents == null) ? "UPDATE" : applicationData?.creationReason,
        source: "MUNICIPAL_RECORDS",
      }

    }

    // mutationUpdate.mutate(payload, {
    //     onSuccess: (data) => {
    //         const property = data?.Properties?.[0];
    //         if (property) {

    //             setProOwnerDetail(property);
    //             setAcknowledgmentNumber(property.acknowldgementNumber);
    //             setPropertyId(property.propertyId);
    //             setStatus(property.status);
    //             // setShowSuccessModal(true);
    //             // setShowPreviewButton(true);
    //             PreviewDemand();

    //         }
    //     },
    //     onError: (err) => {

    //         alert(t("Submission failed"));
    //     },
    // });
    history.push("/digit-ui/employee/pt/response", {
      Property: payload?.Property,
      key: "UPDATE",
      action: "SUBMIT"
    });
  };
  // if (isLoading) {
  //   return <Loader />;
  // }

  const validateForm = () => {
    const errors = {};

    // 1. Files validation
    if (!documents.photoId?.fileStoreId) {
      errors.photoId = "Proof of Identity is required.";
    }
    if (!documents.ownershipDoc?.fileStoreId) {
      errors.ownershipDoc = "Proof of Ownership is required.";
    }

    // 2. Ownership Type & Registry ID
    if (!ownershipType) {
      errors.ownershipType = "Ownership type is required.";
    }
      if (!propertyCategoryInput) {
      errors.propertyCategoryInput = "Property Category is required.";
    }
    if (registryId && !/^[a-zA-Z0-9]{19}$/.test(registryId)) {
      errors.registryId = "Registry ID must be exactly 19 alphanumeric characters.";
    }

    // 3. Owners validation (Iterate over ALL owners)
    owners.forEach((owner, index) => {
      // Owner Name
      if (!owner.name || !/^[a-zA-Z\s]+$/.test(owner.name)) {
        errors[`owner-${index}-name`] = "Owner name is required and must be alphabetic.";
      }
      // Hindi Name
      // if (!owner.hindiName || !/^[\u0900-\u097F\s]+$/.test(owner.hindiName)) {
      //     errors[`owner-${index}-hindiName`] = "Hindi name is required and must be alphabetic.";
      // }
      // Father/Husband Name
      if (!owner.fatherHusbandName || !/^[a-zA-Z\s]+$/.test(owner.fatherHusbandName)) {
        errors[`owner-${index}-fatherHusbandName`] = "Father/Husband name is required and must be alphabetic.";
      }
      // Relationship
      if (!owner.relationship) {
        errors[`owner-${index}-relationship`] = "Relationship is required.";
      }
      // Mobile Number
      if (!owner.mobile || !/^\d{10}$/.test(owner.mobile)) {
        errors[`owner-${index}-mobile`] = "Valid 10-digit mobile number is required.";
      }
      // Aadhaar
      if (!owner.aadhaar || !isAadhaarValid(owner.aadhaar)) {
        errors[`owner-${index}-aadhaar`] = "Valid 12-digit Aadhaar number is required.";
      }
      // Samagra ID (only if checkbox is not ticked)
      if (!owner.noSamagra && (!owner.samagraID || !/^\d+$/.test(owner.samagraID))) {
        errors[`owner-${index}-samagraID`] = "Samagra ID is required and must be digits.";
      }
    });

    // 4. Property Address
    if (!addressDetails.doorNo) {
      errors.doorNo = "Door/House No is required.";
    }
    if (!addressDetails.address) {
      errors.address = "Address is required.";
    }
    if (!addressDetails.pincode || !/^452\d{3}$/.test(addressDetails.pincode)) {
      errors.pincode = "Pincode is required and must be in the format 452XXX.";
    }
    if (!addressDetails.colony) {
      errors.colony = "Colony selection is required.";
    }
    if (!addressDetails.ward) {
      errors.ward = "Ward selection is required.";
    }
    if (!addressDetails.zone) {
      errors.zone = "Zone selection is required.";
    }

    // 5. Assessment Details
    if (!assessmentDetails.rateZone) {
      errors.rateZone = "Rate zone is required.";
    }
    if (!assessmentDetails.roadFactor) {
      errors.roadFactor = "Road factor is required.";
    }
    if (!assessmentDetails.plotArea) {
      errors.plotArea = "Plot Area is required.";
    }
    // 6. Self-Declaration Checkbox
    if (!checkboxes.selfDeclaration) {
      errors.selfDeclaration = "Please accept the declaration to proceed.";
    }
    if (!longLat.lat || !longLat.long) {
      errors.longLat = "Latitude and Longitude are required.";
    }
    return errors;
  };

  const handleSubmit = async () => {

    const errors = {};

    const finalErrors = validateForm();
    setFormErrors(finalErrors);

    if (Object.keys(finalErrors).length > 0) {
      return;
    }
    if (applicationData?.acknowldgementNumber) {
      handleSubmitUpdate();
      return;
    }

  };




  const handleFileChange = async (key, file) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxSizeMB = 2;

    const errors = {};
    if (!file) {
      errors[key] = "File is required.";
    } else if (!allowedTypes.includes(file.type)) {
      errors[key] = "File must be JPG, PNG, or PDF.";
    } else if (file.size / 1024 / 1024 > maxSizeMB) {
      errors[key] = "File must be under 2MB.";
    }

    // Set errors and trigger a re-render
    setFormErrors(prev => ({ ...prev, [key]: errors[key] || null }));

    if (errors[key]) {
      // If validation fails, clear the file and trigger the child's key to reset
      setDocuments(prev => ({ ...prev, [key]: null }));
      setFileResetKey(prev => prev + 1);
      return;
    }

    // If validation passes, proceed with the async upload
    try {
      // You can also add a loading state here

      const response = await Digit.UploadServices.Filestorage(
        "PT",
        file,
        Digit.ULBService.getStateId()
      );

      if (response?.data?.files?.length > 0) {
        const fileStoreId = response.data.files[0].fileStoreId;

        setDocuments((prev) => ({
          ...prev,
          [key]: {
            file,
            fileStoreId,
            documentUid: fileStoreId,
            name: file.name,
            type: file.type,
          },
        }));
        // On success, clear the error for this field
        setFormErrors(prev => ({ ...prev, [key]: null }));
      } else {
        setFormErrors(prev => ({ ...prev, [key]: "File upload failed." }));
        setFileResetKey(prev => prev + 1); // Trigger reset on upload failure too
      }
    } catch (err) {
      setFormErrors(prev => ({ ...prev, [key]: "File upload failed." }));
      setFileResetKey(prev => prev + 1); // Trigger reset on upload failure
    }
  };

  const handleOwnerEmailChange = (index, value) => {
    const newOwners = [...owners];
    newOwners[index].email = value;
    setOwners(newOwners);

    const errors = { ...formErrors };
    const fieldKey = `owner-${index}-email`;

    // A robust regex for email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Since Email is optional, only validate if a value is present
    if (value && !emailRegex.test(value)) {
      errors[fieldKey] = "Please enter a valid email address.";
    } else {
      // Clear the error if the input is valid or empty
      delete errors[fieldKey];
    }

    setFormErrors(errors);
  };

  // Validation for Mobile number:
  const handleOwnerContactChange = (index, field, value) => {
    const newOwners = [...owners];
    newOwners[index][field] = value;
    setOwners(newOwners);

    const errors = { ...formErrors };
    const fieldKey = `owner-${index}-${field}`;

    // Regex for exactly 10 digits
    const mobileRegex = /^\d{10}$/;

    // Mobile Number is mandatory, Alternative Number is not
    if (field === "mobile") {
      if (!value) {
        errors[fieldKey] = "Mobile Number is required.";
      } else if (!mobileRegex.test(value)) {
        errors[fieldKey] = "Mobile Number must be 10 digits.";
      } else {
        delete errors[fieldKey];
      }
    } else if (field === "altNumber") {
      // For alternative number, only validate if a value is entered
      if (value && !mobileRegex.test(value)) {
        errors[fieldKey] = "Alternative Number must be 10 digits.";
      } else {
        delete errors[fieldKey];
      }
    }

    setFormErrors(errors);
  };

  // Validation for Name:
  const handleOwnerNameChange = (index, field, value) => {
    const newOwners = [...owners];
    newOwners[index][field] = value;
    setOwners(newOwners);

    const errors = { ...formErrors };
    const fieldKey = `owner-${index}-${field}`;

    // Regular expressions for validation
    const englishNameRegex = /^[a-zA-Z\s]+$/;
    const hindiNameRegex = /^[\u0900-\u097F\s]+$/;

    if (!value) {
      errors[fieldKey] = "This field is required.";
    } else {
      // Check which field is being validated
      if (field === "name" || field === "fatherHusbandName") {
        if (!englishNameRegex.test(value)) {
          errors[fieldKey] = "Only alphabetic characters are allowed.";
        } else {
          delete errors[fieldKey];
        }
      } else if (field === "hindiName") {
        if (!hindiNameRegex.test(value)) {
          // You can add logic here if you want to perform other actions,
          // but no error will be set now.
        } else {
          delete errors[fieldKey];
        }
      }
    }

    setFormErrors(errors);
  };
  // Validation for Aadhar:
  const handleOwnerAadhaarChange = (index, value) => {
    const newOwners = [...owners];
    newOwners[index].aadhaar = value;
    setOwners(newOwners);

    // Perform the new, robust Aadhaar validation here
    const errors = { ...formErrors };
    const fieldKey = `owner-${index}-aadhaar`; // Unique key for each owner

    // ✅ USE THE NEW VALIDATION FUNCTION
    if (!isAadhaarValid(value)) {
      errors[fieldKey] = "Valid 12-digit Aadhaar number is required.";
    } else {
      // Clear the error if the input is valid
      delete errors[fieldKey];
    }
    setFormErrors(errors);
  };
  // Helper function to make it easier to call.
  const isAadhaarValid = (aadhaarNumber) => {
    // First, check for the correct length (12 digits) and format.
    if (!/^\d{12}$/.test(aadhaarNumber)) {
      return false;
    }
    // Then, apply the Verhoeff algorithm.
    return verhoeff.isVerhoeffValid(aadhaarNumber);
  };
  // Function to validate a number using Verhoeff's algorithm
  // This is required for correct Aadhaar validation.
  const verhoeff = (function (e, g) {
    var b = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
      [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
      [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
      [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
      [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
      [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
      [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
      [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
      [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    ],
      f = [
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
        [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
        [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
        [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
        [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
        [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
        [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
      ];
    function h(a) {
      for (var c = a.length, d = 0, k = 0; c > k; k++) d = b[d][a[k]];
      return d;
    }
    function c(a) {
      for (var c = String(a).split("").map(Number), d = h(c), k = 0; 10 > k; k++)
        if (b[d][k] === 0) return k;
    }
    return {
      isVerhoeffValid: function (a) {
        for (
          var c = String(a)
            .split("")
            .map(Number)
            .reverse(),
          d = 0,
          k = 0; c.length > k; k++
        )
          d = b[d][f[k % 8][c[k]]];
        return 0 === d;
      },
    };
  })();

  // Validation for PINCODE:
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...formErrors };

    setAddressDetails(prev => ({ ...prev, [name]: value }));

    if (name === "pincode") {
      const pincodeRegex = /^452\d{3}$/;

      if (!value) {
        newErrors.pincode = "Pincode is required.";
      } else if (!pincodeRegex.test(value)) {
        newErrors.pincode = "Pincode must be 6 digits and start with 452.";
      } else {
        delete newErrors.pincode;
      }
    }

    setFormErrors(newErrors);
  };

  // Validation for Correspondance Address:

  // In EditUpdateForm.js, update this function:
  const handleSameAsPropertyToggle = (e) => {
    const isChecked = e.target.checked;
    setIsSameAsPropertyAddress(isChecked);

    if (isChecked) {
      // ✅ If the checkbox is checked, populate the correspondence address
      const {
        doorNo,
        address,
        pincode,
        colony,
        ward
      } = addressDetails;

      // Combine all fields into a single, readable address string
      let fullAddress = "";

      if (doorNo) fullAddress += `${doorNo}, `;
      if (address) fullAddress += `${address}, `;
      if (colony?.name) fullAddress += `${colony.name}, `;
      if (ward?.name) fullAddress += `${ward.name}, `;
      if (pincode) fullAddress += `${pincode}`;

      setCorrespondenceAddress(fullAddress.trim());
    } else {
      // ✅ If the checkbox is unchecked, clear the correspondence address
      setCorrespondenceAddress("");
    }
  };


  const backToNew = () => {
    setShowPreviewButton(false);
    setShowAssesmentPop(false);
  }
  const PreviewDemand = () => {
    // setShowAssesmentPop(true);
    handleEstimate();
  };

  useEffect(() => {
  
    if (!applicationData) return;

    
   
    setOwnershipType(applicationData.ownershipCategory || null);
    setPropertyCategoryInput(applicationData.propertyCategory || null);
    setRegistryId(applicationData.registryId || null);
  }, [applicationData]);

  console.log("Application DATA=",applicationData);
  useEffect(() => {
    if (!applicationData || applicationData.length === 0) return;

    const formatted = applicationData?.owners.map((owner) => ({
      title: owner.salutation || "",
      name: owner.name || "",
      aadhaar: owner.aadhaarNumber || "",
      hindiTitle: owner.salutationHindi || "",
      hindiName: owner.hindiName || "",
      fatherHusbandName: owner.fatherOrHusbandName || "",
      relationship: owner.relationship || "",
      email: owner.emailId,
      altNumber: owner.altContactNumber || "",
      mobile: owner.mobileNumber || "",
      samagraID: owner.samagraId || "",
      noSamagra: !owner.samagraId, // true if not available
    }));

    setOwners(formatted);
    const {
      doorNo,
      // address,
      pincode,
      locality,
      ward
    } = applicationData?.address;

    // Combine all fields into a single, readable address string
    let fullAddress = "";

    if (doorNo) fullAddress += `${doorNo}, `;
    // if (address) fullAddress += `${address}, `;
    if (locality?.name) fullAddress += `${locality.name}, `;
    if (ward) fullAddress += `${ward}, `;
    if (pincode) fullAddress += `${pincode}`;

    setCorrespondenceAddress(fullAddress.trim());
  }, [applicationData]);
  useEffect(() => {
    if (applicationData) {
      setAddressDetails({
        doorNo: applicationData?.address?.doorNo || "",
        address: applicationData?.address?.street || "",
        pincode: applicationData?.address?.pincode || "",
        colony: applicationData?.address?.locality
          ? { code: applicationData?.address?.locality.code, name: applicationData?.address?.locality.name || applicationData?.address?.locality.code }
          : null,
        ward: applicationData?.address?.ward
          ? { code: applicationData?.address?.ward, name: applicationData?.address?.ward }
          : null,
        zone: applicationData?.address?.zone
          ? { code: applicationData?.address?.zone, name: applicationData?.address?.zone }
          : null,
      });
    }
  }, [applicationData]);

  useEffect(() => {
    const firstUnit = applicationData?.units?.[0];
    // if (firstUnit?.roadFactor) {
    setAssessmentDetails((prev) => ({
      ...prev,
      roadFactor: firstUnit?.roadFactor || prev.roadFactor,
      plotArea: applicationData?.landArea || prev.plotArea,
      oldPropertyId: applicationData?.oldPropertyId || prev.oldPropertyId,
    }));
    // }
  }, [applicationData]);


  useEffect(() => {
    if (!applicationData || applicationData.length === 0) return;

    const formattedUnits = applicationData?.units?.map((unit) => ({
      usageType: unit && unit.usageCategory ? unit.usageCategory : "",
      usageFactor: unit && unit.occupancyType ? unit.occupancyType : "", // Fill if needed
      floorNo: unit && unit.floorNo ? unit.floorNo.toString() : "",
      constructionType:
        unit &&
          unit.constructionDetail &&
          unit.constructionDetail.constructionType
          ? unit.constructionDetail.constructionType
          : "",
      area:
        unit &&
          unit.constructionDetail &&
          unit.constructionDetail.builtUpArea
          ? unit.constructionDetail.builtUpArea.toString()
          : "",
      fromYear: unit && unit.fromYear ? unit.fromYear : "",
      toYear: unit && unit.toYear ? unit.toYear : "",
    }));

    setUnit(formattedUnits);
    // if (applicationData?.documents) {
    const docMap = {
      photoId: applicationData.documents.find(d => d.documentType === "Proof of Identity") || null,
      ownershipDoc: applicationData.documents.find(d => d.documentType === "Proof of Ownership") || null,
      sellersRegistry: applicationData.documents.find(d => d.documentType === "Others") || null,
    };
    console.log(docMap);
    setDocuments(docMap);
    if (applicationData) {
      setPropertyDetails({
        propertyType: applicationData.propertyType || "",
        roomsArea: applicationData.landArea || "",     // or superBuiltUpArea / builtUpArea depending on requirement
        exemption: applicationData.owners?.[0].ownerType || "",
        essentialTax: applicationData.essentialTax || ""
      });
    }
    if (applicationData?.additionalDetails) {
      setCheckboxes({
        mobileTower: applicationData.additionalDetails.mobileTower || false,
        broadRoad: applicationData.additionalDetails.bondRoad || false,   // 👈 mapped
        advertisement: applicationData.additionalDetails.advertisement || false,
        seniorCitizenDiscount: applicationData.additionalDetails.seniorCitizenDiscount || false,
        selfDeclaration: applicationData.additionalDetails.selfDeclaration || true,
      });
    }
    // }
    setLongLat({
      lat: applicationData?.address?.geoLocation?.latitude,
      long: applicationData?.address?.geoLocation?.longitude
    });
    setCapturedPhoto(applicationData?.documents.find(d => d.documentType === "Photo Captured")?.fileStoreId || null);
  }, [applicationData]);




  const propertyCategoryInputChange = (val) => {

    setPropertyCategoryInput(val.code);

      // 🟢 Clear error live when user selects value
  setFormErrors((prev) => {
    const newErrors = { ...prev };
    delete newErrors.propertyCategoryInput;
    return newErrors;
  });

    // ❗ Only reset if required. Don't reset if owners already exist.
    // if (val.code === "INDIVIDUAL.SINGLEOWNER") {
    //   setOwners((prev) => [prev[0]]); // keep first only
    // } else if (val.code === "INDIVIDUAL.MULTIPLEOWNERS") {
    //   // Do nothing if owners already prefilled
    //   if (owners.length === 0) {
    //     setOwners([{}]); // fallback if empty
    //   }
    // }
  };

  const handleOwnershipTypeChange = (val) => {

    setOwnershipType(val.code);

    // ❗ Only reset if required. Don't reset if owners already exist.
    if (val.code === "INDIVIDUAL.SINGLEOWNER") {
      setOwners((prev) => [prev[0]]); // keep first only
    } else if (val.code === "INDIVIDUAL.MULTIPLEOWNERS") {
      // Do nothing if owners already prefilled
      if (owners.length === 0) {
        setOwners([{}]); // fallback if empty
      }
    }
  };
  const handleRestryIdChange = (e) => {
    setRegistryId(e.target.value);
  }


  const handleDropdownChange = (field, selectedOption) => {
    setAddressDetails((prev) => ({ ...prev, [field]: selectedOption }));
  };
  const handleCorrespondenceChange = (e) => {
    setCorrespondenceAddress(e.target.value);
  };


  const handleAssessmentInputChange = (e) => {
    const { name, value } = e.target;
    setAssessmentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleUnitChange = (index, key, value) => {
    const updatedUnits = [...unit];
    updatedUnits[index][key] = value;
    setUnit(updatedUnits);
  };
  const addUnit = () => {
    setUnit([
      ...unit,
      { usageType: "", usageFactor: "", floorNo: "", constructionType: "", area: "" },
    ]);
  };
  const removeUnit = (index) => {
    setUnit(unit.filter((_, i) => i !== index));
  };
  const handlePropertyDetailsChange = (field, value) => {
    setPropertyDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRoadFactorChange = (selected) => {
    setAssessmentDetails((prev) => ({ ...prev, roadFactor: selected }));
  };
  const updateRateZone = (value) => {
    setRateZones(value);
  }
  useEffect(() => {
    if (rateZones.length > 0) {
      setAssessmentDetails(prev => ({
        ...prev,
        rateZone: selectedRateZone || rateZones[0].name,
      }));
    }
  }, [rateZones]);
  useEffect(() => {
    if (selectedRateZone) {
      setAssessmentDetails(prev => ({
        ...prev,
        rateZone: selectedRateZone,
      }));
    }
  }, [selectedRateZone]);
  const addNewOwner = () => {
    setOwners([...owners, {}]); // Add a new empty owner object
    setIsJointStarted(true);
  };
  const handleCheckboxChange = (field) => {
    setCheckboxes((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  if (isLoading) {
    return <Loader />;
  }

  const handleLocationUpdate = (lat, lng) => {
    setLongLat({
      lat: lat,
      long: lng
    });
  };

  const handlePhotoCapture = (photoData) => {
    setCapturedPhoto(photoData);
    // Also update documents state

  };

  const formatFullAddress = (addressDetails) => {
    if (!addressDetails) return "";
    const { doorNo, address, pincode, zone, ward, colony } = addressDetails;
    return [
      doorNo,
      address,
      colony?.name,
      ward?.name,
      zone?.name,
      pincode,
    ]
      .filter(Boolean) // remove empty/null
      .join(", ");
  };



  return (

    <React.Fragment>
      <div style={styles.assessmentStyles}></div>
      {!showSuccessModal && (
        <div >

          {/* Attachments Section */}
          <div style={styles.card}>
            <div style={styles.assessmentStyle}>{t("Ownership Details")}</div>

            <OwnershipDetailsSection
              t={t}
              ownershipType={ownershipType}
              handleOwnershipTypeChange={handleOwnershipTypeChange}
              handleRestryIdChange={handleRestryIdChange}
              registryId={registryId}
              owners={owners}
              setOwners={setOwners}
              addNewOwner={addNewOwner}
              isJointStarted={isJointStarted}
              styles={styles}
              formErrors={formErrors}
              handleOwnerAadhaarChange={handleOwnerAadhaarChange}
              handleOwnerNameChange={handleOwnerNameChange}
              handleOwnerContactChange={handleOwnerContactChange}
              handleOwnerEmailChange={handleOwnerEmailChange}
              propertyCategoryInput={propertyCategoryInput}
              propertyCategoryInputChange={propertyCategoryInputChange}
            />
          </div>

          <div style={styles.card}>
            <div style={styles.assessmentStyle}>{t("Property Address")}</div>
            <AddressSection
              t={t}
              addressDetails={addressDetails}
              handleInputChange={handleInputChange}
              handleDropdownChange={handleDropdownChange}
              updateRateZone={updateRateZone}
              styles={styles}
              formErrors={formErrors}
            />
          </div>
          <div style={styles.card}>
            <CorrespondenceAddressSection
              t={t}
              correspondenceAddress={
                isSameAsPropertyAddress
                  ? formatFullAddress(addressDetails)
                  : correspondenceAddress
              }
              handleCorrespondenceChange={handleCorrespondenceChange}
              isSameAsPropertyAddress={isSameAsPropertyAddress}
              handleSameAsPropertyToggle={handleSameAsPropertyToggle}
              styles={styles}
              formErrors={formErrors}
              applicationData={applicationData}
              setIsSameAsPropertyAddress={setIsSameAsPropertyAddress}
            />
          </div>
          <div style={styles.card}>
            <div style={styles.assessmentStyle}>{t("Assessment Details")}</div>
            <AssessmentDetailsSection
              t={t}
              assessmentDetails={assessmentDetails}
              handleAssessmentInputChange={handleAssessmentInputChange}
              handleRoadFactorChange={handleRoadFactorChange}
              styles={styles}
              formErrors={formErrors}
            />
          </div>

          <div style={styles.card}>
            <div style={styles.assessmentStyle}>{t("Property Details")}</div>
            <PropertyDetailsTableSection
              t={t}
              unit={unit}
              handleUnitChange={handleUnitChange}
              addUnit={addUnit}
              removeUnit={removeUnit}
              styles={styles}
              formErrors={formErrors}
            />

          </div>
          <div style={styles.card}>
            <OtherDetailsSection
              t={t}
              propertyDetails={propertyDetails}
              handlePropertyDetailsChange={handlePropertyDetailsChange}
              checkboxes={checkboxes}
              handleCheckboxChange={handleCheckboxChange}
              styles={styles}
              formErrors={formErrors}
              setSelectedRateZone={setSelectedRateZone}
            />
          </div>
          <div style={styles.card}>
            <AttachmentsSection
              t={t}
              handleFileChange={handleFileChange}
              formErrors={formErrors}
              documents={documents}
              resetKey={fileResetKey}
            />
          </div>
          <div style={styles.card}>
            <LocationDetails handleLocationUpdate={handleLocationUpdate} handlePhotoCapture={handlePhotoCapture} applicationData={applicationData} formErrors={formErrors} />
          </div>
          <div style={styles.card}>
            <SelfDeclaration
              t={t}
              checkboxes={checkboxes}
              handleCheckboxChange={handleCheckboxChange}
              styles={styles}
              formErrors={formErrors} />
            {showAssessmentPop && (
              <div style={styles.modalOverlay}>
                <div style={styles.modalContent}>

                  <div style={styles.poppinsLabel}>
                    {t("Select Assessment Year")} <span className="mandatory" style={styles.mandatory}>*</span>
                  </div>
                  <Dropdown
                    style={styles.widthInput300Ass}
                    t={t}
                    option={assessmentYears} // dynamic list
                    selected={assessmentYears.find(item => item.code === selectedAssessmentYear?.code)}
                    select={(value) => setSelectedAssessmentYear(value)}
                    optionKey="name"
                    placeholder={t("Select")}
                  />
                  {formErrors.selectedAssessmentYear && (
                    <p style={{ color: "red", fontSize: "12px" }}>{formErrors.selectedAssessmentYear}</p>
                  )}
                  <div style={{ display: "flex", gap: "40px" }}>
                    <SubmitBar label={t("Back")} onSubmit={backToNew} style={{ background: "#6b133f" }} />
                    <SubmitBar label={t("Confirm")} onSubmit={handleEstimate} style={{ background: "#6b133f" }} />
                  </div>

                </div>
              </div>
            )}
            <div style={styles.buttonContainer}>
              {/* {showPreviewButton && (
                                <SubmitBar label={t("Preview")} onSubmit={PreviewDemand} style={{ background: "#6b133f" }} />
                            )} */}
              {/* {!showPreviewButton && ( */}
              {/* <SubmitBar label={t("back")} onClick={() => window.history.back()} style={{ background: "#6b133f" }} /> */}
              <SubmitBar label={t("Save")} onSubmit={handleSubmit} style={{ background: "#6b133f" }} />
              {/* )} */}
            </div>
          </div>

        </div>
      )}


    </React.Fragment>
  );
};

export default EditUpdateForm;



