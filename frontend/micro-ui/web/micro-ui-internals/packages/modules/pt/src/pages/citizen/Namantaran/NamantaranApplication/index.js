
// import {
//   Loader, Card,
//   SubmitBar,
//   TextInput,
//   Dropdown,
//   CheckBox,
// } from "@egovernments/digit-ui-react-components";
// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useHistory, useLocation } from "react-router-dom";
// import { useParams } from "react-router-dom";
// // import { PTService } from "../../../../../../libraries/src/services/elements/PT";
// import styles from "./IndexStyle"
// import AttachmentsSection from "./Document";
// // import OwnershipDetailsSection from "./OwnershipDetailsSection";
// import OriginalPropertyOwner from "./OriginalPropertyOwner";
// import CorrespondenceAddressSection from "./CorrespondenceAddress";
// import PropertyAddress from "./PropertyAddress";
// import AssessmentDetailsSection from "./AssessmentDetails";
// import PropertyDetailsTableSection from "./PropertyDetails";
// import NamantaranDetails from "./NamantaranDetails";
// // import AddressSection from "./AddressSection";
// // import AssessmentDetailsSection from "./AssessmentDetailsSection";
// // import PropertyDetailsTableSection from "./PropertyDetailsTableSection";
// // import AttachmentsSection from "./Attachments";
// // import OtherDetailsSection from "./OtherDetailsSection";
// // import SuccessModal from "./SuccessModal";
// // import CorrespondenceAddressSection from "./CorrespondenceAddressSection";
// // import SelfDeclaration from "./SelfDeclaration";

// const NamantaranApplication = () => {
//   const location = useLocation();
//    const { t } = useTranslation();
//   const tenantId2 = Digit.ULBService.getCurrentTenantId();

//     let { id: applicationNumber } = useParams();
//     console.log("DATA APPLICATION=",applicationNumber)

//     const { isLoad, data: applicationDetails } = Digit.Hooks.pt.useApplicationDetail(t, tenantId2, applicationNumber);
//     console.log("DATA APPLICATION COMING OR NOT=",applicationDetails);

//     const [applicationData,setApplicationData]=useState();
//       useEffect(() => {
//             if (!applicationDetails?.applicationData) return;
//             setApplicationData(applicationDetails?.applicationData);

//         }, [applicationDetails]);


//   const {
//     generalDetails,
//     addressDetailsSet,
//     ownerDetails,
//     unitDetails,
//     propertyDocuments,
//     additionalDetails,
//     workflow,
//     processInstance,
//     correspondenceAddressData,
//     propertyDetailsData,
//   } = location.state || {};



//   const [proOwnerDetail, setProOwnerDetail] = useState(null);
//   const [showPreviewButton, setShowPreviewButton] = useState(false);
//   const [showAssessmentPop, setShowAssesmentPop] = useState(false);
//   const [acknowledgmentNumber, setAcknowledgmentNumber] = useState("");
//   const [propertyId, setPropertyId] = useState("");
//   const [status, setStatus] = useState("");
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [isJointStarted, setIsJointStarted] = useState(false); // NEW
//   const [selectedAssessmentYear, setSelectedAssessmentYear] = useState(null);
//   const [documents, setDocuments] = useState({
//     photoId: null,
//     ownershipDoc: null,
//     sellersRegistry: null,
//   });
//   console.log("documents", documents.sellersRegistry);
//   const [fileResetKey, setFileResetKey] = useState(0);

//   const [owners, setOwners] = useState([
//     {
//       title: "GFHGH",
//       name: "",
//       aadhaar: "",
//       hindiTitle: "",
//       hindiName: "",
//       fatherHusbandName: "",
//       relationship: "",
//       email: "",
//       altNumber: "",
//       mobile: "",
//       samagraID: "",
//       noSamagra: false,
//     }
//   ]);
//   const [ownershipType, setOwnershipType] = useState(null);
//   const [propertyCategoryInput, setPropertyCategoryInput] = useState(null);

//   const [registryId, setRegistryId] = useState("");
//   const [selectedRateZone, setSelectedRateZone] = useState("");
//   const [addressDetails, setAddressDetails] = useState({
//     doorNo: "",
//     address: "",
//     pincode: "",
//     colony: null,
//     ward: null,
//     zone: null,
//   });
//   const [correspondenceAddress, setCorrespondenceAddress] = useState("");
//   const [isSameAsPropertyAddress, setIsSameAsPropertyAddress] = useState(false);
//   const [rateZones, setRateZones] = useState([])
//   const [assessmentDetails, setAssessmentDetails] = useState({
//     rateZone: null, // Usually fetched
//     roadFactor: null,
//     oldPropertyId: "",
//     plotArea: "",
//   });
//   const [unit, setUnit] = useState([{
//     usageType: "",
//     usageFactor: "",
//     floorNo: "",
//     constructionType: "",
//     area: "",
//     fromYear: "",
//     toYear: ""
//   }]);

//   const [propertyDetails, setPropertyDetails] = useState({
//     propertyType: "",
//     roomsArea: "",
//     exemption: "",
//     essentialTax: ""
//   });
//   const [checkboxes, setCheckboxes] = useState({
//     mobileTower: false,
//     broadRoad: false,
//     advertisement: false,
//     seniorCitizenDiscount: false,
//     selfDeclaration: false,
//   });
//   const [formErrors, setFormErrors] = useState({});
//   const [serverErrors, setServerErrors] = useState({});
//   const history = useHistory();

//   const { data: commonFields, isLoading } = Digit.Hooks.pt.useMDMS(Digit.ULBService.getStateId(), "PropertyTax", "CommonFieldsConfig");

//   const token = localStorage.getItem("token");
//   const stateId = Digit.ULBService.getStateId();
//   const { data: AssessmentYearsList, isLoadings } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "AssessmentYear");
//   const { data: ReasonForTransferList } = Digit.Hooks.pt.useReasonForTransferMDMS(stateId, "PropertyTax", "ReasonForTransfer");
//   const { data: NamantaranTypeList } = Digit.Hooks.pt.useNamantaranTypeMDMS(stateId, "PropertyTax", "NamantaranType");
//   console.log("NamantaranTypeList==============",NamantaranTypeList);
//   console.log("ReasonForTransferList==============",ReasonForTransferList);

//          const NamantaranType = (NamantaranTypeList?.PropertyTax?.NamantaranType || []).map((item) => ({
//     code: item.code,
//     name: item.name, // Show year like "2024-25"
//   }));

//       const ReasonForTransfer = (ReasonForTransferList?.PropertyTax?.ReasonForTransfer || []).map((item) => ({
//     code: item.code,
//     name: item.name, 
//   }));

//   console.log("Nam==============",NamantaranType);
//   console.log("Rea==============",ReasonForTransferList);


//   const assessmentYears = (AssessmentYearsList?.PropertyTax?.AssessmentYear || []).map((item) => ({
//     code: item.code,
//     name: item.name, // Show year like "2024-25"
//   }));

//   let userInfo1 = JSON.parse(localStorage.getItem("user-info"));

//   const tenantId = userInfo1?.tenantId;
//   const mutation = Digit.Hooks.pt.usePropertyAPI(tenantId, true);
//   const mutationUpdate = Digit.Hooks.pt.useUpdateContent(tenantId, true);
//   let tenantIdss = Digit.ULBService.getCurrentTenantId();

//   const {
//     isLoading: ptCalculationEstimateLoading,
//     data: ptCalculationEstimateData,
//     mutate: ptCalculationEstimateMutate,
//     error,
//   } = Digit.Hooks.pt.usePtCalculationEstimate(tenantId);

//   const [isLoader, setIsLoader] = useState(false);

//   const handleEstimate = (newPropertyId, propertyData) => {
//     console.log("CHECKKKKKKK=", propertyDocuments);


//     const toYear =
//       Array.isArray(unit) && unit.length > 0 ? unit[0].toYear : null;

//     const payload = {
//       Assessment: {
//         financialYear: toYear,
//         propertyId: newPropertyId,
//         tenantId: tenantId,
//         source: "MUNICIPAL_RECORDS",
//         channel: "CITIZEN",
//         assessmentDate: Date.now(),
//       }
//     };

//     ptCalculationEstimateMutate(payload, {
//       onSuccess: (data) => {
//         history.push({
//           pathname: "/digit-ui/employee/pt/PreviewDemand",
//           state: { data, proOwnerDetail: propertyData, documents, propertyDocuments, checkboxes, rateZones, owners, unit, assessmentDetails, assessmentDetails, propertyDetails, addressDetails, ownershipType, correspondenceAddress, isSameAsPropertyAddress }
//         });

//       },
//       onError: (error) => {
//         console.log("Estimate error===:", error);
//         const apiErrors = error?.response?.data?.Errors || error?.Errors || [];
//         const newErrors = {};
//         apiErrors.forEach((apiErr) => {
//           newErrors[apiErr.code] = apiErr.message;
//         });
//         setServerErrors(newErrors);
//       },
//     });
//   };
//   const handleSubmitUpdate = async () => {
//     const documentsToSubmit = buildDocumentPayload(documents);

//     const payload = {
//       Property: {
//         updateIMC: true,
//         id: generalDetails?.id,
//         registryId: generalDetails?.registryId || "",
//         propertyId: generalDetails?.propertyId || "",
//         accountId: generalDetails?.accountId || "",
//         acknowldgementNumber: generalDetails?.acknowldgementNumber || "",
//         status: generalDetails?.status,
//         tenantId: userInfo1?.tenantId,
//         oldPropertyId: assessmentDetails.oldPropertyId || null,
//         essentialTax: propertyDetails.essentialTax?.code,
//         address: {
//           city: "indore",
//           locality: {
//             code: addressDetails.colony?.code || "",
//             name: addressDetails.colony?.name || "",
//           },
//           zone: addressDetails.zone?.code || "",
//           street: addressDetails.address || "",
//           doorNo: addressDetails.doorNo || "",
//           pincode: addressDetails.pincode || "",
//           ward: addressDetails.ward?.code || "",
//           documents: [],
//         },

//         ownershipCategory: ownershipType || "",
//         propertyCategory: propertyCategoryInput,

//         owners: owners.map((owner, index) => ({
//           salutation: owner.title || "mr",
//           title: "title",
//           name: owner.name || `Owner ${index + 1}`,
//           salutationHindi: owner.hindiTitle,
//           hindiName: owner.hindiName || "",
//           fatherOrHusbandName: owner.fatherHusbandName || "",
//           gender: "MALE",
//           aadhaarNumber: owner.aadhaar || "",
//           altContactNumber: owner.altNumber || "",
//           isCorrespondenceAddress: correspondenceAddress,
//           mobileNumber: owner.mobile,
//           emailId: owner.email,
//           ownerType: propertyDetails.exemption.code,
//           permanentAddress:
//             addressDetails.address,
//           relationship: owner.relationship,
//           samagraId: owner.samagraID,
//           // documents: [
//           //   {
//           //     documentType: "Photo ID",
//           //     fileStoreId: documents.photoId?.fileStoreId,
//           //     documentUid: documents.photoId?.documentUid
//           //   },
//           //   documents?.sellersRegistry && {

//           //     documentType: "others",
//           //     fileStoreId: documents.sellersRegistry?.fileStoreId,
//           //     documentUid: documents.sellersRegistry?.documentUid
//           //   },
//           //   {
//           //     documentType: "Ownership Document",
//           //     fileStoreId: documents.ownershipDoc?.fileStoreId,
//           //     documentUid: documents.ownershipDoc?.documentUid
//           //   },

//           // ],
//           documents: documentsToSubmit,
//         })),

//         institution: null,
//         documents: documentsToSubmit,

//         // documents: [
//         //   {
//         //     documentType: "Photo ID",
//         //     fileStoreId: documents.photoId?.fileStoreId,
//         //     documentUid: documents.photoId?.documentUid
//         //   },
//         //   documents?.sellersRegistry && {

//         //     documentType: "others",
//         //     fileStoreId: documents.sellersRegistry?.fileStoreId,
//         //     documentUid: documents.sellersRegistry?.documentUid
//         //   },
//         //   {
//         //     documentType: "Ownership Document",
//         //     fileStoreId: documents.ownershipDoc?.fileStoreId,
//         //     documentUid: documents.ownershipDoc?.documentUid
//         //   },

//         // ],

//         units: unit.map(unit => (
//           {
//             usageCategory: unit.usageType || "",
//             usesCategoryMajor: unit.usageType || "",
//             occupancyType: unit.usageFactor || "",
//             constructionDetail: {
//               builtUpArea: unit.area || "",
//               constructionType: unit.constructionType || null,
//             },
//             floorNo: parseInt(unit.floorNo) || null,
//             rateZone: selectedRateZone ? selectedRateZone : rateZones?.[0]?.code || "",
//             roadFactor: assessmentDetails.roadFactor?.code || unitDetails?.[0]?.roadFactor,
//             fromYear: unit.fromYear,
//             toYear: unit.toYear,
//           })),


//         landArea: assessmentDetails.plotArea?.toString() || "",
//         propertyType: propertyDetails.propertyType?.code || "BUILTUP.INDEPENDENTPROPERTY",
//         noOfFloors: unit.length || "",
//         superBuiltUpArea: null,
//         // usageCategory: unit.usageType || "RESIDENTIAL",
//         usageCategory: unit.find(u => u.usageType) ? unit.find(u => u.usageType).usageType : "",

//         additionalDetails: {
//           inflammable: false,
//           heightAbove36Feet: false,
//           propertyType: {
//             i18nKey: "COMMON_PROPTYPE_BUILTUP_INDEPENDENTPROPERTY",
//             code: propertyDetails.propertyType?.code || "BUILTUP.INDEPENDENTPROPERTY",
//           },
//           mobileTower: checkboxes.mobileTower || false,
//           bondRoad: checkboxes.broadRoad || false,
//           advertisement: checkboxes.advertisement || false,
//           builtUpArea: null,
//           noOfFloors: {
//             i18nKey: "PT_GROUND_FLOOR_OPTION",
//             code: 0,
//           },
//           noOofBasements: {
//             i18nKey: "PT_NO_BASEMENT_OPTION",
//             code: 0,
//           },
//           unit: unit.map(unit => (
//             {
//               usageCategory: unit.usageType || "",
//               usesCategoryMajor: unit.usageType || "",
//               occupancyType: unit.usageFactor || "",
//               constructionDetail: {
//                 builtUpArea: unit.area || "",
//                 constructionType: unit.constructionType || null,
//               },
//               floorNo: parseInt(unit.floorNo) || null,
//               rateZone: selectedRateZone ? selectedRateZone : rateZones?.[0]?.code || "",
//               roadFactor: assessmentDetails.roadFactor?.code || "",
//               fromYear: unit.fromYear,
//               toYear: unit.toYear,
//             })),
//           basement1: null,
//           basement2: null,
//         },
//         workflow: {
//           action: "OPEN",
//           moduleName: "PT",
//           businessService: "PT.UPDATE"
//         },
//         channel: "CFC_COUNTER",
//         creationReason: "UPDATE",
//         source: "MUNICIPAL_RECORDS",
//       }
//     }
//     setIsLoader(true);
//     mutationUpdate.mutate(payload, {
//       onSuccess: (data) => {
//         setIsLoader(false);
//         const property = data?.Properties?.[0];
//         if (property) {

//           setProOwnerDetail(property);
//           setAcknowledgmentNumber(property.acknowldgementNumber);
//           setPropertyId(property.propertyId);
//           setStatus(property.status);
//           // setShowSuccessModal(true);
//           setShowPreviewButton(true);
//           PreviewDemand(property.propertyId, property);

//         }
//       },
//       onError: (err) => {
//         setIsLoader(false);

//         alert(t("Submission failed"));

//         const apiErrors = err?.response?.data?.Errors || err?.Errors || [];
//         const newErrors = {};
//         apiErrors.forEach((apiErr) => {
//           newErrors[apiErr.code] = apiErr.message;
//         });
//         setServerErrors(newErrors);
//       },
//     });
//   };




//   const validateForm = () => {
//     const errors = {};

//     // ✅ Define regex here (so it exists inside this function)
//     const hindiNameRegex = /^[\u0900-\u097F\s]{2,100}$/;

//     // 1. Files validation
//     if (!documents.photoId?.fileStoreId) {
//       errors.photoId = "Proof of Identity is required.";
//     }
//     if (!documents.ownershipDoc?.fileStoreId) {
//       errors.ownershipDoc = "Proof of Ownership is required.";
//     }

//     // 2. Ownership Type & Registry ID
//     if (!ownershipType) {
//       errors.ownershipType = "Ownership type is required.";
//     }
//     if (!propertyCategoryInput) {
//       errors.propertyCategoryInput = "Property Category is required.";
//     }
//     if (registryId && !/^[a-zA-Z0-9]{19}$/.test(registryId)) {
//       errors.registryId = "Registry ID must be exactly 19 alphanumeric characters.";
//     }

//     // 3. Owners validation (Iterate over ALL owners)
//     owners.forEach((owner, index) => {
//       // Owner Name
//       if (!owner.name || !/^[a-zA-Z\s]+$/.test(owner.name)) {
//         errors[`owner-${index}-name`] = "Owner name is required and must be alphabetic.";
//       }
//       // // Owner Name (Hindi)
//       if (!owner.hindiName) {
//         errors[`owner-${index}-hindiName`] = "यह फ़ील्ड अनिवार्य है।";
//       } else if (!hindiNameRegex.test(owner.hindiName)) {
//         errors[`owner-${index}-hindiName`] = "कृपया मान्य हिंदी नाम दर्ज करें।";
//       }

//       // Father/Husband Name
//       if (owner.relationship !== "Not applicable") {
//         if (!owner.fatherHusbandName || !/^[a-zA-Z\s]+$/.test(owner.fatherHusbandName)) {
//           errors[`owner-${index}-fatherHusbandName`] = "Father/Husband name is required and must be alphabetic.";
//         }
//       }

//       console.log("owner.relationship==", owner.relationship);
//       // Relationship
//       if (!owner.relationship) {
//         errors[`owner-${index}-relationship`] = "Relationship is required.";
//       }
//       // Mobile Number
//       if (!owner.mobile || !/^\d{10}$/.test(owner.mobile)) {
//         errors[`owner-${index}-mobile`] = "Valid 10-digit mobile number is required.";
//       }
//       // Aadhaar
//       if (!owner.aadhaar || !isAadhaarValid(owner.aadhaar)) {
//         errors[`owner-${index}-aadhaar`] = "Valid 12-digit Aadhaar number is required.";
//       }
//       // Samagra ID (only if checkbox is not ticked)
//       console.log("samagraID==", !owner.noSamagra && (!owner.samagraID || !/^\d+$/.test(owner.samagraID)))
//       // if (!owner.noSamagra && (!owner.samagraID || !/^\d+$/.test(owner.samagraID))) {
//       //   console.log("STEP33")
//       //   errors[`owner-${index}-samagraID`] = "Samagra ID is required and must be digits.";
//       // }
//       if (
//         !owner.noSamagra &&
//         (!owner.samagraID || !/^\d{8,9}$/.test(owner.samagraID))
//       ) {
//         console.log("STEP33");
//         errors[`owner-${index}-samagraID`] =
//           "Samagra ID is required and must be 8 or 9 digits.";
//       }

//     });

//     // 4. Property Address
//     if (!addressDetails.doorNo) {
//       errors.doorNo = "Door/House No is required.";
//     }
//     if (!addressDetails.address) {
//       errors.address = "Address is required.";
//     }
//     if (!addressDetails.pincode || !/^452\d{3}$/.test(addressDetails.pincode)) {
//       errors.pincode = "Pincode is required and must be in the format 452XXX.";
//     }
//     if (!addressDetails.colony) {
//       errors.colony = "Colony selection is required.";
//     }
//     if (!addressDetails.ward) {
//       errors.ward = "Ward selection is required.";
//     }
//     if (!addressDetails.zone) {
//       errors.zone = "Zone selection is required.";
//     }

//     // 5. Assessment Details
//     if (!assessmentDetails.rateZone) {
//       errors.rateZone = " "; //Rate zone is required.
//     }
//     if (!assessmentDetails.roadFactor) {
//       errors.roadFactor = "Road factor is required.";
//     }

//     // ✅ Plot Area validation
//     if (!assessmentDetails.plotArea) {
//       errors.plotArea = "Plot Area is required.";
//     }

//     // 6. Self-Declaration Checkbox
//     if (!checkboxes.selfDeclaration) {
//       errors.selfDeclaration = "Please accept the declaration to proceed.";
//     }
//     return errors;
//   };

//   const handleSubmit = async () => {
//     const finalErrors = validateForm();
//     setFormErrors(finalErrors);


//     if (Object.keys(finalErrors).length > 0) {
//       console.log("❌ Form has validation errors → API not called");
//       return;
//     }

//     const documentsToSubmit = buildDocumentPayload(documents);
//     if (generalDetails?.acknowldgementNumber) {
//       handleSubmitUpdate();
//       return;
//     }
//     const payload = {
//       Property: {
//         updateIMC: true,
//         tenantId: userInfo1?.tenantId,
//         registryId: registryId,

//         essentialTax: propertyDetails.essentialTax?.code,
//         address: {
//           city: "indore",
//           locality: {
//             code: addressDetails.colony?.code || "",
//             name: addressDetails.colony?.name || "",
//           },
//           zone: addressDetails.zone?.code || "",
//           street: addressDetails.address || "",
//           doorNo: addressDetails.doorNo || "",
//           pincode: addressDetails.pincode || "",
//           ward: addressDetails.ward?.code || "",
//           documents: [],
//         },

//         ownershipCategory: ownershipType || "",
//         propertyCategory: propertyCategoryInput,

//         owners: owners.map((owner, index) => ({
//           salutation: owner.title || "mr",
//           title: "title",
//           name: owner.name || `Owner ${index + 1}`,
//           salutationHindi: owner.hindiTitle,
//           hindiName: owner.hindiName || "",
//           fatherOrHusbandName: owner.fatherHusbandName || "",
//           gender: "MALE",
//           aadhaarNumber: owner.aadhaar || "",
//           altContactNumber: owner.altNumber || "",
//           isCorrespondenceAddress: correspondenceAddress,
//           mobileNumber: owner.mobile,
//           emailId: owner.email,
//           ownerType: propertyDetails.exemption.code,
//           permanentAddress:
//             addressDetails.address,
//           relationship: owner.relationship,
//           samagraId: owner.samagraID,
//           // documents: [
//           //   {
//           //     documentType: "Proof of Identity",
//           //     fileStoreId: documents.photoId?.fileStoreId,
//           //     documentUid: documents.photoId?.documentUid
//           //   },
//           //   {
//           //     documentType: "Others",
//           //     fileStoreId: documents.sellersRegistry?.fileStoreId,
//           //     documentUid: documents.sellersRegistry?.documentUid
//           //   },
//           //   {
//           //     documentType: "Proof of Ownership",
//           //     fileStoreId: documents.ownershipDoc?.fileStoreId,
//           //     documentUid: documents.ownershipDoc?.documentUid
//           //   },

//           // ],
//           documents: documentsToSubmit,
//         })),

//         institution: null,

//         // documents: [
//         //   {
//         //     documentType: "Proof of Identity",
//         //     fileStoreId: documents.photoId?.fileStoreId,
//         //     documentUid: documents.photoId?.documentUid
//         //   },
//         //   {
//         //     documentType: "Others",
//         //     fileStoreId: documents.sellersRegistry?.fileStoreId,
//         //     documentUid: documents.sellersRegistry?.documentUid
//         //   },
//         //   {
//         //     documentType: "Proof of Ownership",
//         //     fileStoreId: documents.ownershipDoc?.fileStoreId,
//         //     documentUid: documents.ownershipDoc?.documentUid
//         //   },

//         // ],

//         documents: documentsToSubmit,

//         units: unit.map(unit => (
//           {
//             usageCategory: unit.usageType || "",
//             usesCategoryMajor: unit.usageType || "",
//             occupancyType: unit.usageFactor || "",
//             constructionDetail: {
//               builtUpArea: unit.area || "",
//               constructionType: unit.constructionType || null,
//             },
//             floorNo: parseInt(unit.floorNo) || null,
//             rateZone: rateZones?.[0]?.code || "",
//             roadFactor: assessmentDetails.roadFactor?.code || unitDetails?.[0]?.roadFactor,
//             fromYear: unit.fromYear,
//             toYear: unit.toYear,
//           })),
//         landArea: assessmentDetails.plotArea?.toString() || "",
//         propertyType: propertyDetails.propertyType?.code || "BUILTUP.INDEPENDENTPROPERTY",
//         noOfFloors: unit.length || "",
//         superBuiltUpArea: null,
//         // usageCategory: unit.usageType || "RESIDENTIAL",
//         usageCategory: unit.find(u => u.usageType) ? unit.find(u => u.usageType).usageType : "",

//         additionalDetails: {
//           inflammable: false,
//           heightAbove36Feet: false,
//           propertyType: {
//             i18nKey: "COMMON_PROPTYPE_BUILTUP_INDEPENDENTPROPERTY",
//             code: propertyDetails.propertyType?.code || "BUILTUP.INDEPENDENTPROPERTY",
//           },
//           mobileTower: checkboxes.mobileTower || false,
//           bondRoad: checkboxes.broadRoad || false,
//           advertisement: checkboxes.advertisement || false,
//           builtUpArea: null,
//           noOfFloors: {
//             i18nKey: "PT_GROUND_FLOOR_OPTION",
//             code: 0,
//           },
//           noOofBasements: {
//             i18nKey: "PT_NO_BASEMENT_OPTION",
//             code: 0,
//           },
//           unit: unit.map(unit => (
//             {
//               usageCategory: unit.usageType || "",
//               usesCategoryMajor: unit.usageType || "",
//               occupancyType: unit.usageFactor || "",
//               constructionDetail: {
//                 builtUpArea: unit.area || "",
//                 constructionType: unit.constructionType || null,
//               },
//               floorNo: parseInt(unit.floorNo) || null,
//               rateZone: rateZones?.[0]?.code || "",
//               roadFactor: assessmentDetails.roadFactor?.code || "",
//               fromYear: unit.fromYear,
//               toYear: unit.toYear,
//             })),

//           basement1: null,
//           basement2: null,
//         },

//         channel: "CFC_COUNTER",
//         creationReason: "CREATE",
//         source: "MUNICIPAL_RECORDS",
//       }
//     };

//     setIsLoader(true);
//     mutation.mutate(payload, {
//       onSuccess: (data) => {
//         setIsLoader(false);
//         const property = data?.Properties?.[0];
//         if (property) {
//           setProOwnerDetail(property);
//           setAcknowledgmentNumber(property.acknowldgementNumber);
//           setPropertyId(property.propertyId);
//           setStatus(property.status);
//           // setShowSuccessModal(true);
//           // setShowPreviewButton(true);
//           PreviewDemand(property.propertyId, property);
//         }
//       },

//       onError: (err) => {
//         setIsLoader(false);
//         const apiErrors = err?.response?.data?.Errors || err?.Errors || [];
//         const newErrors = {};
//         apiErrors.forEach((apiErr) => {
//           newErrors[apiErr.code] = apiErr.message;
//         });
//         setServerErrors(newErrors);
//       },
//     });
//   };

//   // In your NewApplication.js file

//   const buildDocumentPayload = (documentsState) => {
//     const payloadDocs = [];

//     // Add the known, non-dynamic documents first
//     if (documentsState.photoId?.fileStoreId) {
//       payloadDocs.push({
//         documentType: "Proof of Identity",
//         fileStoreId: documentsState.photoId.fileStoreId,
//         documentUid: documentsState.photoId.documentUid,
//       });
//     }

//     if (documentsState.ownershipDoc?.fileStoreId) {
//       payloadDocs.push({
//         documentType: "Proof of Ownership",
//         fileStoreId: documentsState.ownershipDoc.fileStoreId,
//         documentUid: documentsState.ownershipDoc.documentUid,
//       });
//     }


//     Object.keys(documentsState).forEach((key) => {

//       if (key.startsWith("others_") || key === "sellersRegistry") {
//         const doc = documentsState[key];
//         if (doc?.fileStoreId) {
//           payloadDocs.push({
//             documentType: "Others",
//             fileStoreId: doc.fileStoreId,
//             documentUid: doc.documentUid,
//           });
//         }
//       }
//     });

//     return payloadDocs;
//   };

//   const handleFileChange = async (key, file) => {
//     const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
//     const maxSizeMB = 2;

//     const errors = {};
//     if (!file) {
//       errors[key] = "File is required.";
//     } else if (!allowedTypes.includes(file.type)) {
//       errors[key] = "File must be JPG, PNG, or PDF.";
//     } else if (file.size / 1024 / 1024 > maxSizeMB) {
//       errors[key] = "File must be under 2MB.";
//     }


//     setFormErrors(prev => ({ ...prev, [key]: errors[key] || null }));

//     if (errors[key]) {

//       setDocuments(prev => ({ ...prev, [key]: null }));
//       setFileResetKey(prev => prev + 1);
//       return;
//     }


//     try {


//       const response = await Digit.UploadServices.Filestorage(
//         "PT",
//         file,
//         Digit.ULBService.getStateId()
//       );

//       if (response?.data?.files?.length > 0) {
//         const fileStoreId = response.data.files[0].fileStoreId;

//         setDocuments((prev) => ({
//           ...prev,
//           [key]: {
//             file,
//             fileStoreId,
//             documentUid: fileStoreId,
//             name: file.name,
//             type: file.type,
//           },
//         }));
//         // On success, clear the error for this field
//         setFormErrors(prev => ({ ...prev, [key]: null }));
//       } else {
//         setFormErrors(prev => ({ ...prev, [key]: "File upload failed." }));
//         setFileResetKey(prev => prev + 1); // Trigger reset on upload failure too
//       }
//     } catch (err) {
//       setFormErrors(prev => ({ ...prev, [key]: "File upload failed." }));
//       setFileResetKey(prev => prev + 1); // Trigger reset on upload failure
//     }
//   };

//   // Helper function to make it easier to call.
//   const isAadhaarValid = (aadhaarNumber) => {
//     // First, check for the correct length (12 digits) and format.
//     if (!/^\d{12}$/.test(aadhaarNumber)) {
//       return false;
//     }
//     // Then, apply the Verhoeff algorithm.
//     return verhoeff.isVerhoeffValid(aadhaarNumber);
//   };
//   // Function to validate a number using Verhoeff's algorithm
//   // This is required for correct Aadhaar validation.
//   const verhoeff = (function (e, g) {
//     var b = [
//       [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//       [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
//       [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
//       [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
//       [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
//       [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
//       [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
//       [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
//       [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
//       [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
//     ],
//       f = [
//         [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//         [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
//         [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
//         [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
//         [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
//         [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
//         [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
//         [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
//       ];
//     function h(a) {
//       for (var c = a.length, d = 0, k = 0; c > k; k++) d = b[d][a[k]];
//       return d;
//     }
//     function c(a) {
//       for (var c = String(a).split("").map(Number), d = h(c), k = 0; 10 > k; k++)
//         if (b[d][k] === 0) return k;
//     }
//     return {
//       isVerhoeffValid: function (a) {
//         for (
//           var c = String(a)
//             .split("")
//             .map(Number)
//             .reverse(),
//           d = 0,
//           k = 0; c.length > k; k++
//         )
//           d = b[d][f[k % 8][c[k]]];
//         return 0 === d;
//       },
//     };
//   })();

//   // Validation for PINCODE:
//   // const handleInputChange = (e) => {
//   //   const { name, value } = e.target;
//   //   let newErrors = { ...formErrors };

//   //   setAddressDetails(prev => ({ ...prev, [name]: value }));

//   //   if (name === "pincode") {
//   //     const pincodeRegex = /^452\d{3}$/;

//   //     if (!value) {
//   //       newErrors.pincode = "Pincode is required.";
//   //     } else if (!pincodeRegex.test(value)) {
//   //       newErrors.pincode = "Pincode must be 6 digits and start with 452.";
//   //     } else {
//   //       delete newErrors.pincode;
//   //     }
//   //   }

//   //   // ✅ Address validation
//   //   if (name === "address") {
//   //     const addressRegex = /^[A-Za-z0-9\s\-,()\/.]{10,200}$/;

//   //     if (!value) {
//   //       newErrors.address = "Address is required.";
//   //     } else if (!addressRegex.test(value)) {
//   //       newErrors.address =
//   //         "Please enter a valid address";
//   //     } else {
//   //       delete newErrors.address;
//   //     }
//   //   }

//   //   setFormErrors(newErrors);
//   // };

//   // Validation for PINCODE:
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     let newErrors = { ...formErrors };

//     setAddressDetails(prev => ({ ...prev, [name]: value }));

//     // Field-level validation
//     switch (name) {
//       case "pincode":
//         if (!value) {
//           newErrors.pincode = "Pincode is required.";
//         } else if (!/^452\d{3}$/.test(value)) {
//           newErrors.pincode = "Pincode must be 6 digits and start with 452.";
//         } else {
//           delete newErrors.pincode;
//         }
//         break;

//       case "address":
//         if (!value) {
//           newErrors.address = "Address is required.";
//         } else if (!/^[A-Za-z0-9\s\-,()\/.]{10,200}$/.test(value)) {
//           newErrors.address = "Please enter a valid address";
//         } else {
//           delete newErrors.address;
//         }
//         break;

//       case "doorNo":
//         if (!value) {
//           newErrors.doorNo = "Door/House No is required.";
//         } else {
//           delete newErrors.doorNo;
//         }
//         break;

//       default:
//         break;
//     }


//     setFormErrors(newErrors);
//   };

//   // Validation for Correspondance Address:

//   // In NewApplication.js, update this function:
//   const handleSameAsPropertyToggle = (e) => {
//     const isChecked = e.target.checked;
//     setIsSameAsPropertyAddress(isChecked);

//     if (isChecked) {
//       // ✅ If the checkbox is checked, populate the correspondence address
//       const {
//         doorNo,
//         address,
//         pincode,
//         colony,
//         ward
//       } = addressDetails;

//       // Combine all fields into a single, readable address string
//       let fullAddress = "";

//       if (doorNo) fullAddress += `${doorNo}, `;
//       if (address) fullAddress += `${address}, `;
//       if (colony?.name) fullAddress += `${colony.name}, `;
//       if (ward?.name) fullAddress += `${ward.name}, `;
//       if (pincode) fullAddress += `${pincode}`;

//       setCorrespondenceAddress(fullAddress.trim());
//     } else {
//       // ✅ If the checkbox is unchecked, clear the correspondence address
//       setCorrespondenceAddress("");
//     }
//   };


//   const backToNew = () => {
//     setShowPreviewButton(false);
//     setShowAssesmentPop(false);
//   }
//   const PreviewDemand = (newPropertyId, propertyData) => {
//     // setShowAssesmentPop(true);
//     handleEstimate(newPropertyId, propertyData);
//   };

//   useEffect(() => {
//     if (!generalDetails) return;
//     setOwnershipType(generalDetails.ownershipCategory || null);
//     setPropertyCategoryInput(generalDetails.propertyCategoryInput || null);
//     setRegistryId(generalDetails.registryId || null);
//   }, [generalDetails]);

//   console.log("generalDetails=", generalDetails);
//   console.log("generalDetails=", propertyDocuments);

//   useEffect(() => {
//     if (!propertyDocuments || propertyDocuments.length === 0) return;

//     const docMap = {
//       photoId: propertyDocuments.find(d => d.documentType === "Proof of Identity") || null,
//       ownershipDoc: propertyDocuments.find(d => d.documentType === "Proof of Ownership") || null,
//       sellersRegistry: propertyDocuments.find(d => d.documentType === "Others") || null,
//     };

//     console.log("docMap=", docMap);
//     setDocuments(docMap);

//   }, [propertyDocuments]);


//   useEffect(() => {
//     if (!ownerDetails || ownerDetails.length === 0) return;

//     const formatted = ownerDetails.map((owner) => ({
//       title: owner.salutation || "",
//       name: owner.name || "",
//       aadhaar: owner.aadhaarNumber || "",
//       hindiTitle: owner.salutationHindi || "",
//       hindiName: owner.hindiName || "",
//       fatherHusbandName: owner.fatherOrHusbandName || "",
//       relationship: owner.relationship || "",
//       email: owner.emailId,
//       altNumber: owner.altContactNumber || "",
//       mobile: owner.mobileNumber || "",
//       samagraID: owner.samagraId || "",
//       noSamagra: !owner.samagraId, // true if not available
//     }));

//     setOwners(formatted);
//   }, [ownerDetails]);
//   useEffect(() => {
//     if (addressDetailsSet) {
//       setAddressDetails({
//         doorNo: addressDetailsSet.doorNo || "",
//         address: addressDetailsSet.street || "",
//         pincode: addressDetailsSet.pincode || "",
//         colony: addressDetailsSet.locality
//           ? { code: addressDetailsSet.locality.code, name: addressDetailsSet.locality.name || addressDetailsSet.locality.code }
//           : null,
//         ward: addressDetailsSet.ward
//           ? { code: addressDetailsSet.ward, name: addressDetailsSet.ward }
//           : null,
//         zone: addressDetailsSet.zone
//           ? { code: addressDetailsSet.zone, name: addressDetailsSet.zone }
//           : null,
//       });
//     }
//   }, [addressDetailsSet]);

//   // Restore correspondence address state when coming back from PreviewDemand
//   useEffect(() => {
//     if (correspondenceAddressData) {
//       setCorrespondenceAddress(correspondenceAddressData.correspondenceAddress || "");
//       setIsSameAsPropertyAddress(correspondenceAddressData.isSameAsPropertyAddress || false);
//     }
//   }, [correspondenceAddressData]);

//   // Restore property details for Exemption and Essential Tax fields from PreviewDemand
//   useEffect(() => {
//     if (propertyDetailsData) {
//       setPropertyDetails(prevDetails => ({
//         ...prevDetails,
//         exemption: propertyDetailsData.exemption || prevDetails.exemption,
//         essentialTax: propertyDetailsData.essentialTax || prevDetails.essentialTax
//       }));
//     }
//   }, [propertyDetailsData]);

//   useEffect(() => {
//     const firstUnit = unitDetails?.[0];
//     if (firstUnit?.roadFactor) {
//       setAssessmentDetails((prev) => ({
//         ...prev,
//         roadFactor: firstUnit?.roadFactor || prev.roadFactor,
//         plotArea: generalDetails?.landArea || prev.plotArea,
//         oldPropertyId: generalDetails?.oldPropertyId || prev.oldPropertyId,
//       }));
//     }
//   }, [unitDetails]);


//   useEffect(() => {
//     if (!unitDetails || unitDetails.length === 0) return;

//     const formattedUnits = unitDetails.map((unit) => (


//       {
//         usageType: unit && unit.usageCategory ? unit.usageCategory : "",
//         usageFactor: unit && unit.occupancyType ? unit.occupancyType : "", // Fill if needed
//         floorNo: unit && unit.floorNo ? unit.floorNo.toString() : "",

//         constructionType:
//           unit &&
//             unit.constructionDetail &&
//             unit.constructionDetail.constructionType
//             ? unit.constructionDetail.constructionType
//             : "",
//         area:
//           unit &&
//             unit.constructionDetail &&
//             unit.constructionDetail.builtUpArea
//             ? unit.constructionDetail.builtUpArea.toString()
//             : "",
//         fromYear: unit && unit.fromYear ? unit.fromYear : "",
//         toYear: unit && unit.toYear ? unit.toYear : "",


//       }

//     ));

//     setUnit(formattedUnits);
//   }, [unitDetails]);

//   const propertyCategoryInputChange = (val) => {

//     setPropertyCategoryInput(val.code);

//     // 🟢 Clear error live when user selects value
//     setFormErrors((prev) => {
//       const newErrors = { ...prev };
//       delete newErrors.propertyCategoryInput;
//       return newErrors;
//     });

//     // ❗ Only reset if required. Don't reset if owners already exist.
//     // if (val.code === "INDIVIDUAL.SINGLEOWNER") {
//     //   setOwners((prev) => [prev[0]]); // keep first only
//     // } else if (val.code === "INDIVIDUAL.MULTIPLEOWNERS") {
//     //   // Do nothing if owners already prefilled
//     //   if (owners.length === 0) {
//     //     setOwners([{}]); // fallback if empty
//     //   }
//     // }
//   };

//   const handleOwnershipTypeChange = (val) => {

//     setOwnershipType(val.code);

//     // 🟢 Clear error live when user selects value
//     setFormErrors((prev) => {
//       const newErrors = { ...prev };
//       delete newErrors.ownershipType;
//       return newErrors;
//     });

//     // ❗ Only reset if required. Don't reset if owners already exist.
//     if (val.code === "INDIVIDUAL.SINGLEOWNER") {
//       setOwners((prev) => [prev[0]]); // keep first only
//     } else if (val.code === "INDIVIDUAL.MULTIPLEOWNERS") {
//       // Do nothing if owners already prefilled
//       if (owners.length === 0) {
//         setOwners([{}]); // fallback if empty
//       }
//     }
//   };
//   // In your NewApplication.js file, find your other handlers

//   const handleRestryIdChange = (value) => {
//     // 1. Update the state for the input value
//     setRegistryId(value);

//     // 2. Perform validation and update the formErrors state
//     const errors = { ...formErrors };
//     const fieldKey = "registryId"; // The key for this field in formErrors


//     if (value) {
//       const regex = /^MP[A-Z0-9]{17}$/;

//       if (!regex.test(value)) {
//         errors[fieldKey] =
//           "Please enter a valid POA Number";
//       } else {
//         delete errors[fieldKey];
//       }
//     } else {
//       delete errors[fieldKey];
//     }

//     setFormErrors(errors);
//   };

//   const handleOwnerEmailChange = (index, value) => {
//     const newOwners = [...owners];
//     newOwners[index].email = value;
//     setOwners(newOwners);

//     const errors = { ...formErrors };
//     const fieldKey = `owner-${index}-email`;

//     // A robust regex for email validation
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

//     // Since Email is optional, only validate if a value is present
//     if (value && !emailRegex.test(value)) {
//       errors[fieldKey] = "Please enter a valid email address.";
//     } else {
//       // Clear the error if the input is valid or empty
//       delete errors[fieldKey];
//     }

//     setFormErrors(errors);
//   };

//   // Validation for Mobile number:
//   const handleOwnerContactChange = (index, field, value) => {
//     const newOwners = [...owners];
//     newOwners[index][field] = value;
//     setOwners(newOwners);

//     const errors = { ...formErrors };
//     const fieldKey = `owner-${index}-${field}`;

//     // Regex for exactly 10 digits
//     const mobileRegex = /^\d{10}$/;

//     // Mobile Number is mandatory, Alternative Number is not
//     if (field === "mobile") {
//       if (!value) {
//         errors[fieldKey] = "Mobile Number is required.";
//       } else if (!mobileRegex.test(value)) {
//         errors[fieldKey] = "Mobile Number must be 10 digits.";
//       } else {
//         delete errors[fieldKey];
//       }
//     } else if (field === "altNumber") {
//       // For alternative number, only validate if a value is entered
//       if (value && !mobileRegex.test(value)) {
//         errors[fieldKey] = "Alternative Number must be 10 digits.";
//       } else {
//         delete errors[fieldKey];
//       }
//     }

//     setFormErrors(errors);
//   };

//   // Validation for Name:
//   const handleOwnerNameChange = (index, field, value) => {
//     const newOwners = [...owners];
//     newOwners[index][field] = value;
//     setOwners(newOwners);

//     const errors = { ...formErrors };
//     const fieldKey = `owner-${index}-${field}`;

//     // Regular expressions for validation
//     const englishNameRegex = /^[a-zA-Z\s.\-']{2,100}$/;
//     const hindiNameRegex = /^[\u0900-\u097F\s]{2,100}$/;

//     if (!value) {
//       errors[fieldKey] = "This field is required.";
//     } else {
//       // Check which field is being validated
//       if (field === "name" || field === "fatherHusbandName") {
//         if (!englishNameRegex.test(value)) {
//           errors[fieldKey] = "Please enter a valid English name.";
//         } else {
//           delete errors[fieldKey];
//         }
//       } else if (field === "hindiName") {
//         // ✅ Hindi only
//         if (!hindiNameRegex.test(value)) {
//           errors[fieldKey] = "Please enter a valid Hindi name.";
//         } else {
//           delete errors[fieldKey];
//         }
//       }
//     }

//     setFormErrors(errors);
//   };
//   // Validation for Aadhar:
//   const handleOwnerAadhaarChange = (index, value) => {
//     const newOwners = [...owners];
//     newOwners[index].aadhaar = value;
//     setOwners(newOwners);

//     // Perform the new, robust Aadhaar validation here
//     const errors = { ...formErrors };
//     const fieldKey = `owner-${index}-aadhaar`; // Unique key for each owner

//     // ✅ USE THE NEW VALIDATION FUNCTION
//     if (!isAadhaarValid(value)) {
//       errors[fieldKey] = "Valid 12-digit Aadhaar number is required.";
//     } else {
//       // Clear the error if the input is valid
//       delete errors[fieldKey];
//     }
//     setFormErrors(errors);
//   };

//   // const handleDropdownChange = (field, selectedOption) => {
//   //   setAddressDetails((prev) => ({ ...prev, [field]: selectedOption }));
//   // };

//   const capitalize = (s) => s?.charAt(0)?.toUpperCase() + s?.slice(1) || "";

//   const handleDropdownChange = (field, selectedOption) => {
//     console.log("handleDropdownChange", field, selectedOption);

//     // 1) update addressDetails in one atomic update and reset dependents
//     setAddressDetails((prev) => {
//       const next = { ...prev, [field]: selectedOption };

//       if (field === "zone") {
//         next.ward = null;
//         next.colony = null;
//         next.rateZone = null;
//       } else if (field === "ward") {
//         next.colony = null;
//         next.rateZone = null;
//       } else if (field === "colony") {
//         next.rateZone = null;
//       }
//       return next;
//     });

//     // 2) update formErrors live (remove error for the field when selected,
//     //    also remove errors for dependents when parent resets)
//     setFormErrors((prev) => {
//       const copy = { ...prev };

//       if (selectedOption) delete copy[field];
//       else copy[field] = `${capitalize(field)} is required.`;

//       // If you changed zone/ward/colony, clear dependent errors (don't set them)
//       if (field === "zone") {
//         delete copy.ward;
//         delete copy.colony;
//         delete copy.rateZone;
//       } else if (field === "ward") {
//         delete copy.colony;
//         delete copy.rateZone;
//       } else if (field === "colony") {
//         delete copy.rateZone;
//       }

//       return copy;
//     });
//   };

//   const formatFullAddress = (addressDetails) => {
//     if (!addressDetails) return "";
//     const { doorNo, address, pincode, zone, ward, colony } = addressDetails;
//     return [
//       doorNo,
//       address,
//       colony?.name,
//       ward?.name,
//       zone?.name,
//       pincode,
//     ]
//       .filter(Boolean) // remove empty/null
//       .join(", ");
//   };


//   const handleCorrespondenceChange = (e) => {
//     setCorrespondenceAddress(e.target.value);
//   };

//   const handleAssessmentInputChange = (e) => {
//     const { name, value } = e.target;
//     setAssessmentDetails((prev) => ({ ...prev, [name]: value }));

//     // Validation
//     const errors = { ...formErrors };

//     if (name === "plotArea") {
//       const regex = /^[0-9]{1,6}$/; // only 1–6 digit numbers

//       if (!value) {
//         errors.plotArea = "Plot Area is required.";
//       } else if (!regex.test(value)) {
//         errors.plotArea = "Please enter a valid Plot Area";
//       } else {
//         delete errors.plotArea;
//       }
//     }

//     setFormErrors(errors);
//   };

//   const handleUnitChange = (index, key, value) => {
//     const updatedUnits = [...unit];

//     console.log("Floor and Unit==", key, "=", value)
//     updatedUnits[index][key] = value;
//     setUnit(updatedUnits);
//   };
//   const addUnit = () => {
//     setUnit([
//       ...unit,
//       { usageType: "", usageFactor: "", floorNo: "", constructionType: "", area: "" },
//     ]);
//   };
//   const removeUnit = (index) => {
//     setUnit(unit.filter((_, i) => i !== index));
//   };
//   const handlePropertyDetailsChange = (field, value) => {
//     setPropertyDetails((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleRoadFactorChange = (selected) => {
//     setAssessmentDetails((prev) => ({ ...prev, roadFactor: selected }));
//     // ✅ clear error instantly when user selects something
//     setFormErrors((prev) => ({ ...prev, roadFactor: "" }));
//   };
//   const updateRateZone = (value) => {
//     setRateZones(value);
//   }
//   useEffect(() => {
//     if (rateZones.length > 0) {
//       setAssessmentDetails(prev => ({
//         ...prev,
//         rateZone: selectedRateZone || rateZones[0].name,
//       }));
//     }
//   }, [rateZones]);
//   useEffect(() => {
//     if (selectedRateZone) {
//       setAssessmentDetails(prev => ({
//         ...prev,
//         rateZone: selectedRateZone,
//       }));
//     }
//   }, [selectedRateZone]);
//   const addNewOwner = () => {
//     setOwners([...owners, {}]); // Add a new empty owner object
//     setIsJointStarted(true);
//   };
//   const handleCheckboxChange = (field) => {
//     setCheckboxes((prev) => ({
//       ...prev,
//       [field]: !prev[field],
//     }));
//   };

//   if (isLoading) {
//     return <Loader />;
//   }

//   if (isLoader) {
//     return <Loader />;
//   }

//   // if (isLoadings) {
//   //   return <Loader />;
//   // }

//   // if (createLoader) {
//   //   return <Loader />;
//   // }
//   // if (ptCalculationEstimateLoading) {
//   //   return <Loader />;
//   // }



//   return (
//     <React.Fragment>
//       <div style={styles.assessmentStyles}></div>
//       {!showSuccessModal && (
//         <div >


//           {/* Attachments Section */}

//            {/* <div style={styles.card}>
//             <AttachmentsSection
//               t={t}
//               handleFileChange={handleFileChange}
//               formErrors={formErrors}
//               documents={documents}
//               resetKey={fileResetKey}
//             />
//           </div> */}

//                 <div style={styles.card}>
//             <div style={styles.assessmentStyle}>{t("Namantaran Application")}</div>
//             <NamantaranDetails
//               t={t}

//               styles={styles}
//               formErrors={formErrors}
//             />
//           </div>

//           <div style={styles.card}>
//             <div style={styles.assessmentStyle}>{t("Original Property Owner Details")}</div>



//             <OriginalPropertyOwner
//               t={t}
//               ownershipType={ownershipType}
//               handleOwnershipTypeChange={handleOwnershipTypeChange}
//               handleRestryIdChange={handleRestryIdChange}
//               registryId={registryId}
//               owners={owners}
//               setOwners={setOwners}
//               addNewOwner={addNewOwner}
//               isJointStarted={isJointStarted}
//               styles={styles}
//               formErrors={formErrors}
//               handleOwnerAadhaarChange={handleOwnerAadhaarChange}
//               handleOwnerNameChange={handleOwnerNameChange}
//               handleOwnerContactChange={handleOwnerContactChange}
//               handleOwnerEmailChange={handleOwnerEmailChange}
//               propertyCategoryInput={propertyCategoryInput}
//               propertyCategoryInputChange={propertyCategoryInputChange}
//             />
//           </div>

//           <div style={styles.card}>
//             <div style={styles.assessmentStyle}>{t("Property Address")}</div>
//             <PropertyAddress
//               t={t}
//               addressDetails={addressDetails}
//               handleInputChange={handleInputChange}
//               handleDropdownChange={handleDropdownChange}
//               updateRateZone={updateRateZone}
//               styles={styles}
//               formErrors={formErrors}
//               setFormErrors={setFormErrors}
//             />
//           </div>
//           <div style={styles.card}>
//             <CorrespondenceAddressSection
//               t={t}
//               correspondenceAddress={
//                 isSameAsPropertyAddress
//                   ? formatFullAddress(addressDetails)
//                   : correspondenceAddress
//               }
//               handleCorrespondenceChange={handleCorrespondenceChange}
//               isSameAsPropertyAddress={isSameAsPropertyAddress}
//               handleSameAsPropertyToggle={handleSameAsPropertyToggle}
//               styles={styles}
//               formErrors={formErrors}
//             />
//           </div>
//           <div style={styles.card}>
//             <div style={styles.assessmentStyle}>{t("Assessment Details")}</div>
//             <AssessmentDetailsSection
//               t={t}
//               assessmentDetails={assessmentDetails}
//               handleAssessmentInputChange={handleAssessmentInputChange}
//               handleRoadFactorChange={handleRoadFactorChange}
//               styles={styles}
//               formErrors={formErrors}
//             />
//           </div>







//           <div style={styles.card}>
//             <div style={styles.assessmentStyle}>{t("Property Details")}</div>
//             <PropertyDetailsTableSection
//               t={t}
//               unit={unit}
//               handleUnitChange={handleUnitChange}
//               addUnit={addUnit}
//               removeUnit={removeUnit}
//               styles={styles}
//               formErrors={formErrors}
//             />

//           </div>
//           {/* <div style={styles.card}>
//             <OtherDetailsSection
//               t={t}
//               propertyDetails={propertyDetails}
//               handlePropertyDetailsChange={handlePropertyDetailsChange}
//               checkboxes={checkboxes}
//               handleCheckboxChange={handleCheckboxChange}
//               styles={styles}
//               formErrors={formErrors}
//               setSelectedRateZone={setSelectedRateZone}
//             />
//           </div> */}
//           {/* <div style={styles.card}>
//             <AttachmentsSection
//               t={t}
//               handleFileChange={handleFileChange}
//               formErrors={formErrors}
//               documents={documents}
//               resetKey={fileResetKey}
//             />
//           </div> */}
//           {/* <div style={styles.card}>
//             <SelfDeclaration
//               t={t}
//               checkboxes={checkboxes}
//               handleCheckboxChange={handleCheckboxChange}
//               styles={styles}
//               formErrors={formErrors} />
//             {showAssessmentPop && (
//               <div style={styles.modalOverlay}>
//                 <div style={styles.modalContent}>

//                   <div style={styles.poppinsLabel}>
//                     {t("Select Assessment Year")} <span className="mandatory" style={styles.mandatory}>*</span>
//                   </div>
//                   <Dropdown
//                     style={styles.widthInput300Ass}
//                     t={t}
//                     option={assessmentYears} // dynamic list
//                     selected={assessmentYears.find(item => item.code === selectedAssessmentYear?.code)}
//                     select={(value) => setSelectedAssessmentYear(value)}
//                     optionKey="name"
//                     placeholder={t("Select")}
//                   />
//                   {formErrors.selectedAssessmentYear && (
//                     <p style={{ color: "red", fontSize: "12px" }}>{formErrors.selectedAssessmentYear}</p>
//                   )}
//                   <div style={{ display: "flex", gap: "40px" }}>
//                     <SubmitBar label={t("Back")} onSubmit={backToNew} style={{ background: "#6b133f" }} />
//                     <SubmitBar label={t("Confirm")} onSubmit={handleEstimate} style={{ background: "#6b133f" }} />
//                   </div>

//                 </div>
//               </div>

//             )}


//             {Object.keys(serverErrors).length > 0 && (
//               <div
//                 style={{
//                   marginTop: "16px",
//                   padding: "14px 18px",
//                   borderLeft: "4px solid #dc3545",
//                   borderRadius: "8px",
//                   background: "rgba(107, 19, 63, 0.12)",
//                   color: "#611a15",
//                   fontSize: "14px",
//                   fontFamily: "Poppins, sans-serif",
//                   boxShadow: "0 4px 8px rgba(220, 53, 69, 0.2)",
//                   animation: "fadeIn 0.4s ease-in-out",
//                 }}
//               >
//                 <strong style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
//                   <span style={{ fontSize: "18px", marginRight: "8px" }}>  ⚠️</span>
//                   Submission Failed
//                 </strong>
//                 <ul style={{ margin: 0, paddingLeft: "18px" }}>
//                   {Object.entries(serverErrors).map(([key, msg]) => (
//                     <li key={key} style={{ marginBottom: "4px" }}>
//                       {msg}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//             <div style={styles.buttonContainer}>

//               <SubmitBar label={t("Save")} onSubmit={handleSubmit} style={{ background: "#6b133f" }} />

//             </div>


//           </div> */}

//         </div>
//       )}

//       {showSuccessModal && (
//         <SuccessModal
//           t={t}
//           applicationNumber={acknowledgmentNumber} // <-- dynamic
//           propertyId={propertyId}                  // <-- optional, if modal accepts it
//           status={status}                          // <-- optional
//           onClose={() => setShowSuccessModal(false)}
//           styles={styles}

//         />
//       )}
//     </React.Fragment>
//   );
// };

// export default NamantaranApplication;









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
// import { PTService } from "../../../../../../libraries/src/services/elements/PT";
import { useParams } from "react-router-dom";
import styles from "./IndexStyle"
import AttachmentsSection from "./Document";
// import OwnershipDetailsSection from "./OwnershipDetailsSection";
import OriginalPropertyOwner from "./OriginalPropertyOwner";
import CorrespondenceAddressSection from "./CorrespondenceAddress";
import PropertyAddress from "./PropertyAddress";
import AssessmentDetailsSection from "./AssessmentDetails";
import PropertyDetailsTableSection from "./PropertyDetails";
import NamantaranDetails from "./NamantaranDetails";
import PropertyOwner2 from "./PropertyOwner2";
import SuccessPage from "./SuccessPage";
// import OwnershipDetailsSection from "./OwnershipDetailsSection";
// import AddressSection from "./AddressSection";
// import AssessmentDetailsSection from "./AssessmentDetailsSection";
// import PropertyDetailsTableSection from "./PropertyDetailsTableSection";
// import AttachmentsSection from "./Attachments";
// import OtherDetailsSection from "./OtherDetailsSection";
// // import SuccessModal from "./SuccessModal";
// import CorrespondenceAddressSection from "./CorrespondenceAddressSection";
// import LocationDetails from "./LocationDetails";
// import SelfDeclaration from "./SelfDeclaration";

const NamantaranApplication = () => {
  //      useEffect(() => {
  //   const hasRefreshed = localStorage.getItem("hasRefreshed");
  //   if (!hasRefreshed) {
  //     localStorage.setItem("hasRefreshed", "true");
  //     window.location.reload(); 
  //   }
  // }, []);



  const location = useLocation();
  const { state } = useLocation();
  console.log("EditUpdateForm Props:", state);
  const { t } = useTranslation();
  const [isLoader, setIsLoader] = useState(false);



  const tenantId2 = Digit.ULBService.getCurrentTenantId();
   let { id: propertyIdd } = useParams();
   console.log("propertyIddpropertyIdd===",propertyIdd);

  let { id: applicationNumber } = useParams();
  console.log("DATA APPLICATION=", applicationNumber)

  const { isLoad, data: applicationDetails } = Digit.Hooks.pt.useApplicationDetail(t, tenantId2, applicationNumber);
  console.log("DATA APPLICATION COMING OR NOT=", applicationDetails);

  const [applicationData, setApplicationData] = useState();
  useEffect(() => {
    if (!applicationDetails?.applicationData) return;
    setApplicationData(applicationDetails?.applicationData);

  }, [applicationDetails]);
  console.log("ApplicationData====", applicationData)



    const [propertyIdData, setPropertyIdData] = useState();
  useEffect(() => {
    if (!applicationDetails?.applicationData) return;
    setPropertyIdData(applicationDetails?.applicationData?.propertyId);

  }, [applicationDetails]);
  console.log("propertyIdData====", propertyIdData)


  const [proOwnerDetail, setProOwnerDetail] = useState(null);
  const [showPreviewButton, setShowPreviewButton] = useState(false);
  const [showAssessmentPop, setShowAssesmentPop] = useState(false);
  const [acknowledgmentNumber, setAcknowledgmentNumber] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [status, setStatus] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isJointStarted, setIsJointStarted] = useState(false); // NEW
    const [isJointStarted2, setIsJointStarted2] = useState(false); 
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
   const [owners2, setOwners2] = useState([
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
   const [ownershipType2, setOwnershipType2] = useState(null);
  const [propertyCategoryInput, setPropertyCategoryInput] = useState(null);
    const [propertyCategoryInput2, setPropertyCategoryInput2] = useState(null);
   const [namantaranPurposeInput, setNamantaranPurposeInput] = useState(null);
  const [registryId, setRegistryId] = useState("");
   const [registryId2, setRegistryId2] = useState("");
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
   const [isSuccess, setIsSuccess] = useState(false);
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
  const mutationUpdatesss = Digit.Hooks.pt.usePropertyAPI(tenantId, false);
  let tenantIdss = Digit.ULBService.getCurrentTenantId();

  const mutationForUpdate = Digit.Hooks.pt.usePropertyAPI(
    tenantId,
    false // update
  );

  

  const {
    isLoading: ptCalculationEstimateLoading,
    data: ptCalculationEstimateData,
    mutate: ptCalculationEstimateMutate,
    error,
  } = Digit.Hooks.pt.usePtCalculationEstimate(tenantId);

  console.log("propertyDetails==", propertyDetails);


  const handleEstimate = (newPropertyId, property) => {
    const toYear =
      Array.isArray(unit) && unit.length > 0 ? unit[0].toYear : null;

    const payload = {
      Assessment: {
        financialYear: toYear,
        propertyId: newPropertyId,
        tenantId: tenantId,
        source: "MUNICIPAL_RECORDS",
        channel: "CITIZEN",
        assessmentDate: Date.now(),
      },
      RequestInfo: {
        apiId: "Rainmaker",
        authToken: userInfo1?.authToken || "default-token",
        userInfo: {
          id: userInfo1?.id || 1,
          uuid: userInfo1?.uuid || "default-uuid",
          userName: userInfo1?.userName || "defaultuser",
          name: userInfo1?.name || "Default User",
          mobileNumber: userInfo1?.mobileNumber || "9999999999",
          emailId: userInfo1?.emailId || "default@example.com",
          locale: userInfo1?.locale || "en_IN",
          type: userInfo1?.type || "CITIZEN",
          roles: userInfo1?.roles || [],
          active: userInfo1?.active !== false,
          tenantId: userInfo1?.tenantId || "pg.citya",
          permanentCity: userInfo1?.permanentCity || "pg.citya"
        },
        msgId: "1749797151521|en_IN",
        plainAccessRequest: {}
      }
    };

    ptCalculationEstimateMutate(payload, {
      onSuccess: (data) => {
        history.push({
          pathname: "/digit-ui/employee/pt/PreviewView",
          state: { data, proOwnerDetail: property }// send full object
        });
      },
      onError: (error) => {
        alert("Estimate error:", error);
      },
    });
  };



  const [isNewOwner, setIsNewOwner] = useState(false);

  const handleOwner = () => {
    // localStorage.setItem("HandleOwner", "true");
    setIsNewOwner(true); 
  };






  const { data: ReasonForTransferList } = Digit.Hooks.pt.useReasonForTransferMDMS(stateId, "PropertyTax", "ReasonForTransfer");
  const { data: NamantaranTypeList } = Digit.Hooks.pt.useNamantaranTypeMDMS(stateId, "PropertyTax", "NamantaranType");


  const NamantaranType = (NamantaranTypeList?.PropertyTax?.NamantaranType || []).map((item) => ({
    code: item.code,
    name: item.name, // Show year like "2024-25"
  }));

  const ReasonForTransfer = (ReasonForTransferList?.PropertyTax?.ReasonForTransfer || []).map((item) => ({
    code: item.code,
    name: item.name,
  }));



 

  const handleSubmitUpdate = async () => {

    const payload = {
      Property: {
        updateIMC: true,
        id: applicationData?.id,
        registryId: applicationData?.registryId || "",
        propertyId: applicationData?.propertyId || "",
        accountId: applicationData?.accountId || "",
        acknowldgementNumber: applicationData?.acknowldgementNumber || "",
        status: applicationData?.status,
        tenantId: userInfo1?.tenantId,
        oldPropertyId: assessmentDetails.oldPropertyId || null,
        // essentialTax: propertyDetails.essentialTax?.code || propertyDetails.essentialTax,
        essentialTax:
          typeof propertyDetails?.essentialTax === "object"
            ? propertyDetails?.essentialTax?.code ?? null
            : propertyDetails?.essentialTax ?? null,

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
        propertyCategory: propertyCategoryInput,

        owners: owners.map((owner, index) => ({
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
          mobileNumber: owner.mobile || "",
          emailId: owner.email || "",
          // ownerType: propertyDetails.exemption.code || propertyDetails.exemption,
          ownerType:
            typeof propertyDetails?.exemption === "object"
              ? propertyDetails?.exemption?.code ?? null
              : propertyDetails?.exemption ?? null,
          permanentAddress:
            addressDetails.address || "",
          relationship: owner.relationship || "FATHER",
          samagraId: owner.samagraID,
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
              documentType: "Property Photograph",
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
            documentType: "Property Photograph",
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

        units: unit.map(unit => (
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
            })),
          basement1: null,
          basement2: null,
        },
        workflow: {
          action: "OPEN",
          moduleName: "PT",
          businessService: "PT.UPDATE"
        },
        channel: "CFC_COUNTER",
        creationReason: "UPDATE",
        source: "MUNICIPAL_RECORDS",
      }

    }
    const payloads = {
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
        propertyCategory: propertyCategoryInput,

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
              documentType: "Property Photograph",
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
            documentType: "Property Photograph",
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
        workflow: {
          action: state?.action?.action === "UPDATE" ? "REOPEN" : "OPEN",
          moduleName: "PT",
          businessService: state?.action?.action === "UPDATE" ? "PT.CREATE" : "PT.UPDATE"
        },
        applicationStatus: "UPDATE",
        channel: "CFC_COUNTER",
        creationReason: "CREATE",
        source: "MUNICIPAL_RECORDS",
      }

    }
    setIsLoader(true);
    if (state?.action?.action === "UPDATE" && state?.creationReasonDefine !== "UPDATE") {

      mutationUpdatesss.mutate(payloads, {
        onSuccess: (data) => {
          const property = data?.Properties?.[0];
          if (property) {
            setProOwnerDetail(property);
            setAcknowledgmentNumber(property.acknowldgementNumber);
            setPropertyId(property.propertyId);
            setStatus(property.status);
            // setShowSuccessModal(true);
            // setShowPreviewButton(true);
            PreviewDemand(property.propertyId, property);
          }
        },
        onError: (err) => {
          setIsLoader(false);

          alert(t("Submission failed"));
        },
      });
    } else {
      mutationUpdate.mutate(payload, {
        onSuccess: (data) => {
          setIsLoader(false);
          const property = data?.Properties?.[0];
          if (property) {

            setProOwnerDetail(property);
            setAcknowledgmentNumber(property.acknowldgementNumber);
            setPropertyId(property.propertyId);
            setStatus(property.status);
            // setShowSuccessModal(true);
            // setShowPreviewButton(true);
            PreviewDemand(property.propertyId, property);


          }
        },
        onError: (err) => {
          setIsLoader(false);

          alert(t("Submission failed"));
        },
      });
    }
  };
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
     if (!ownershipType2) {
      errors.ownershipType2 = "Ownership type is required.";
    }
    if (!propertyCategoryInput) {
      errors.propertyCategoryInput = "Property Category is required.";
    }
      if (!propertyCategoryInput2) {
      errors.propertyCategoryInput2 = "Property Category is required.";
    }
     if (!namantaranPurposeInput) {
      errors.namantaranPurposeInput = "Namantaran Purpose is required.";
    }
    if (registryId && !/^[a-zA-Z0-9]{19}$/.test(registryId)) {
      errors.registryId = "Registry ID must be exactly 19 alphanumeric characters.";
    }
        if (registryId2 && !/^[a-zA-Z0-9]{19}$/.test(registryId2)) {
      errors.registryId2 = "Registry ID must be exactly 19 alphanumeric characters.";
    }


   
   owners2.forEach((owner, index) => {
      // Owner Name
      if (!owner.name || !/^[a-zA-Z\s]+$/.test(owner.name)) {
        errors[`owner-${index}-name`] = "Owner name is required and must be alphabetic.";
      }
        if (!owner.hindiName) {
        errors[`owner-${index}-hindiName`] = "यह फ़ील्ड अनिवार्य है।";
      }
      
      // else if (!hindiNameRegex.test(owner.hindiName)) {
      //   errors[`owner-${index}-hindiName`] = "कृपया मान्य हिंदी नाम दर्ज करें।";
      // }

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
      // if (!owner.noSamagra && (!owner.samagraID || !/^\d+$/.test(owner.samagraID))) {
      //     errors[`owner-${index}-samagraID`] = "Samagra ID is required and must be digits.";
      // }
      if (
        !owner.noSamagra &&
        (!owner.samagraID || !/^\d{8,9}$/.test(owner.samagraID))
      ) {
        console.log("STEP33");
        errors[`owner-${index}-samagraID`] =
          "Samagra ID is required and must be 8 or 9 digits.";
      }

    });

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
      // if (!owner.noSamagra && (!owner.samagraID || !/^\d+$/.test(owner.samagraID))) {
      //     errors[`owner-${index}-samagraID`] = "Samagra ID is required and must be digits.";
      // }
      if (
        !owner.noSamagra &&
        (!owner.samagraID || !/^\d{8,9}$/.test(owner.samagraID))
      ) {
        console.log("STEP33");
        errors[`owner-${index}-samagraID`] =
          "Samagra ID is required and must be 8 or 9 digits.";
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



  const handleSubmitUpdateChange = async () => {
 
 
    // const finalErrors = validateForm();
    // setFormErrors(finalErrors);

    // console.log("finalErrors==finalErrors==",finalErrors);

    // if (Object.keys(finalErrors).length > 0) {
    //   return;
    // }
 
    const payload = {
      Property: {
        updateIMC: false,
        id: applicationData?.id,
        registryId: applicationData?.registryId || "",
        propertyId: applicationData?.propertyId || "",
        accountId: applicationData?.accountId || "",
        acknowldgementNumber: applicationData?.acknowldgementNumber || "",
        status: applicationData?.status,
        tenantId: "mp.indore",
        oldPropertyId: assessmentDetails.oldPropertyId || null,
        essentialTax: propertyDetails.essentialTax?.code || propertyDetails.essentialTax,
 
        // Missing fields from comparison
        surveyId: null,
        linkedProperties: null,
        isFreeze: null,
        propertyCategory: null,
        AlternatUpdated: false,
 
        address: applicationData?.address,
 
        ownershipCategory: ownershipType || "INDIVIDUAL.SINGLEOWNER",
        propertyCategory: propertyCategoryInput,
 
        owners: [...(applicationData?.owners || []), 
        
         {
          salutation: owners2[0].title || "mr",
          title: "title",
          // name: owners2[0].name || `Owner ${index + 1}`,
           name: owners2[0].name || "",
          salutationHindi: owners2[0].hindiTitle,
          hindiName: owners2[0].hindiName || "",
          fatherOrHusbandName: owners2[0].fatherHusbandName || "UnitTest",
          gender: "MALE",
          aadhaarNumber: owners2[0].aadhaar || "",
          altContactNumber: owners2[0].altNumber || "",
          isCorrespondenceAddress: correspondenceAddress,
          mobileNumber: owners2[0].mobile || "",
          emailId: owners2[0].email || "",
          isPrimaryOwner:"true",
          status:"ACTIVE",
          // ownerType: propertyDetails.exemption.code || propertyDetails.exemption,
          ownerType:
            typeof propertyDetails?.exemption === "object"
              ? propertyDetails?.exemption?.code ?? null
              : propertyDetails?.exemption ?? null,
          permanentAddress:
            addressDetails.address || "",
          relationship: owners2[0].relationship || "FATHER",
          samagraId: owners2[0].samagraID,
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
              documentType: "Property Photograph",
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
        },
      
      ],
 
        institution: null,
 
        documents: [
          {
            id: applicationData.documents?.find(d => d.documentType === "Proof of Identity")?.id, // Missing
            documentType: "Proof of Identity",
            fileStoreId: documents.photoId?.fileStoreId || applicationData.documents.find(d => d.documentType === "Proof of Identity")?.fileStoreId,
            documentUid: documents.photoId?.documentUid || applicationData.documents.find(d => d.documentType === "Proof of Identity")?.documentUid,
            auditDetails: null, // Missing
            status: "ACTIVE" // Missing
          },
          documents?.sellersRegistry && {
            id: applicationData.documents?.find(d => d.documentType === "Others")?.id, // Missing
            documentType: "Others",
            fileStoreId: documents.sellersRegistry?.fileStoreId || applicationData.documents.find(d => d.documentType === "Others")?.fileStoreId,
            documentUid: documents.sellersRegistry?.documentUid || applicationData.documents.find(d => d.documentType === "Others")?.documentUid,
            auditDetails: null, // Missing
            status: "ACTIVE" // Missing
          },
          {
            id: applicationData.documents?.find(d => d.documentType === "Proof of Ownership")?.id, // Missing
            documentType: "Proof of Ownership",
            fileStoreId: documents.ownershipDoc?.fileStoreId || applicationData.documents.find(d => d.documentType === "Proof of Ownership")?.fileStoreId,
            documentUid: documents.ownershipDoc?.documentUid || applicationData.documents.find(d => d.documentType === "Proof of Ownership")?.documentUid,
            auditDetails: null, // Missing
            status: "ACTIVE" // Missing
          },
          {
            id: applicationData.documents?.find(d => d.documentType === "Property Photograph")?.id, // Missing
            documentType: "Property Photograph",
            fileStoreId: capturedPhoto || null,
            documentUid: capturedPhoto || null,
            auditDetails: null, // Missing
            status: "ACTIVE" // Missing
          },
          // Missing document for PATTACERTIFICATE
          {
            "documentType": "PATTACERTIFICATE",
            "fileStoreId": "fe78b468-c06c-4506-9035-b8b1188be481",
            "documentUid": "fe78b468-c06c-4506-9035-b8b1188be481",
            auditDetails: null,
            status: "ACTIVE"
          },
          ...Object.keys(documents)
            .filter(key => key.startsWith("others_"))
            .map(key => ({
              id: applicationData.documents?.find(d => d.documentType === "Others")?.id, // Missing
              documentType: "Others",
              fileStoreId: documents[key]?.fileStoreId || applicationData.documents.find(d => d.documentType === "Others")?.fileStoreId,
              documentUid: documents[key]?.documentUid || applicationData.documents.find(d => d.documentType === "Others")?.documentUid,
              auditDetails: null, // Missing
              status: "ACTIVE" // Missing
            })),
        ].filter(Boolean),
 
        units: applicationData?.units,
 
        landArea: assessmentDetails.plotArea?.toString() || "3000",
        // propertyType: propertyDetails.propertyType?.code || "BUILTUP",
        propertyType: "BUILTUP",
        noOfFloors: unit.length || null,
        superBuiltUpArea: null,
        usageCategory: unit.find(u => u.usageType) ? unit.find(u => u.usageType).usageType : "RESIDENTIAL",
 
        // additionalDetails: {
        //   // Missing mutation-specific details
        //   documentNumber: assessmentDetails.documentNumber || "",
        //   documentValue: assessmentDetails.documentValue || "",
        //   documentDate: assessmentDetails.documentDate || null,
        //   isMutationInCourt: assessmentDetails.isMutationInCourt || "NO",
        //   caseDetails: assessmentDetails.caseDetails || "",
        //   reasonForTransfer: assessmentDetails.reasonForTransfer || "",
        //   marketValue: assessmentDetails.marketValue || "",
        //   isPropertyUnderGovtPossession: assessmentDetails.isPropertyUnderGovtPossession || "NO",
 
        //   // Existing details
        //   inflammable: false,
        //   heightAbove36Feet: false,
        //   propertyType: {
        //     i18nKey: "COMMON_PROPTYPE_BUILTUP_INDEPENDENTPROPERTY",
        //     code: propertyDetails.propertyType?.code || "BUILTUP.INDEPENDENTPROPERTY",
        //   },
        //   mobileTower: checkboxes.mobileTower || false,
        //   bondRoad: checkboxes.broadRoad || false,
        //   advertisement: checkboxes.advertisement || false,
        //   builtUpArea: null,
        //   noOfFloors: {
        //     i18nKey: "PT_GROUND_FLOOR_OPTION",
        //     code: 0,
        //   },
        //   noOofBasements: {
        //     i18nKey: "PT_NO_BASEMENT_OPTION",
        //     code: 0,
        //   },
        //   unit: unit.map(unit => ({
        //     usageCategory: unit.usageType || "RESIDENTIAL",
        //     usesCategoryMajor: unit.usageType || "RESIDENTIAL",
        //     occupancyType: unit.usageFactor || "SELFOCCUPIED",
        //     constructionDetail: {
        //       builtUpArea: unit.area || "3000",
        //       constructionType: unit.constructionType || null,
        //     },
        //     floorNo: parseInt(unit.floorNo) || 0,
        //     rateZone: selectedRateZone ? selectedRateZone : rateZones?.[0]?.code || "",
        //     roadFactor: assessmentDetails.roadFactor?.code || applicationData?.units[0]?.roadFactor,
        //     fromYear: unit.fromYear,
        //     toYear: unit.toYear,
        //   })),
        //   basement1: null,
        //   basement2: null,
        // },


        "additionalDetails": {
          "documentNumber": "435345343",
          "documentValue": "3000",
          "documentDate": 1761350400000,
          "isMutationInCourt": "NO",
          "caseDetails": "",
          "reasonForTransfer": "PATTACERTIFICATE",
          "marketValue": 4000,
          "isPropertyUnderGovtPossession": "NO"
        },
        workflow: {
          action: "OPEN",
          businessService: "PT.MUTATION",
          moduleName: "PT",
          // tenantId: userInfo1?.tenantId,
          tenantId:"mp.indore"
        },
 
        channel: "CFC_COUNTER",
        creationReason: "MUTATION",
        source: "MUNICIPAL_RECORDS",
 
        // Missing auditDetails
        auditDetails: {
          createdBy: userInfo1?.uuid,
          lastModifiedBy: userInfo1?.uuid,
          createdTime: Date.now(),
          lastModifiedTime: Date.now()
        }
      }
    }

     mutationForUpdate.mutate(payload, {
      onSuccess: (data) => {
      console.log("CHeCK API CALL ",data)
      // const [isSuccess, setIsSuccess] = useState(false);
      setIsSuccess(true);
      history.replace("/digit-ui/citizen/pt/namantaran/bannerResponse");   
 
      },
      onError: (error) => {
          // history.replace("/digit-ui/citizen/pt/namantaran/bannerResponse");   
        console.log("CHeCK API CALLllllllllllllllllllllll ",error)
      },
    });
    
    // history.replace("/digit-ui/citizen/pt/response", { Property: payload.Property, key: "UPDATE", action: "SUBMIT" });
 
  };



      const submitForm = () => {
    console.log("SUBMIT FORM");
    handleSubmitUpdateChange();
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

  const handleOwnerEmailChange2 = (index, value) => {
    const newOwners = [...owners2];
    newOwners[index].email = value;
    setOwners2(newOwners);

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


  console.log("owners2===",owners2);


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
  const handleOwnerContactChange2 = (index, field, value) => {
    const newOwners = [...owners2];
    newOwners[index][field] = value;
    setOwners2(newOwners);

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

  const handleOwnerNameChange2 = (index, field, value) => {
    const newOwners = [...owners2];
    newOwners[index][field] = value;
    setOwners2(newOwners);

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

    const handleOwnerAadhaarChange2 = (index, value) => {
    const newOwners = [...owners2];
    newOwners[index].aadhaar = value;
    setOwners2(newOwners);

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
  // useEffect(() => {
  //   localStorage.setItem("HandleOwner", "false")
  // }, [])

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
  const PreviewDemand = (newPropertyId, property) => {
    // setShowAssesmentPop(true);
    handleEstimate(newPropertyId, property);
  };

  useEffect(() => {
    if (!applicationData) return;
    setOwnershipType(applicationData.ownershipCategory || null);
    setPropertyCategoryInput(applicationData.propertyCategory || null);
    setRegistryId(applicationData.registryId || null);
  }, [applicationData]);

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
    setCapturedPhoto(applicationData?.documents.find(d => d.documentType === "Property Photograph")?.fileStoreId || null);
  }, [applicationData]);



  console.log("namantaranPurposeInput===namantaranPurposeInput==",namantaranPurposeInput);

   const namantaranPurposeInputChange = (val) => {

    setNamantaranPurposeInput(val.code);

    
    setFormErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.namantaranPurposeInput;
      return newErrors;
    });

 
  };

    const propertyCategoryInputChange2 = (val) => {

    setPropertyCategoryInput2(val.code);

    // 🟢 Clear error live when user selects value
    setFormErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.propertyCategoryInput2;
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


  const handleOwnershipTypeChange2 = (val) => {

    setOwnershipType2(val.code);

    // ❗ Only reset if required. Don't reset if owners already exist.
    if (val.code === "INDIVIDUAL.SINGLEOWNER") {
      setOwners2((prev) => [prev[0]]); // keep first only
    } else if (val.code === "INDIVIDUAL.MULTIPLEOWNERS") {
      // Do nothing if owners already prefilled
      if (owners2.length === 0) {
        setOwners2([{}]); // fallback if empty
      }
    }
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
    const handleRestryIdChange2 = (e) => {
    setRegistryId2(e.target.value);
  }
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
    const addNewOwner2 = () => {
    setOwners2([...owners2, {}]); // Add a new empty owner object
    setIsJointStarted2(true);
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




  if (isLoader) {
    return <Loader />;
  }

  return (

 

    <React.Fragment>
      <div style={styles.assessmentStyles}></div>
      {!showSuccessModal && (
        <div >




          <div style={styles.card}>
            <div style={styles.assessmentStyle}>{t("Namantaran Application")}</div>
            <NamantaranDetails
              t={t}

              styles={styles}
              formErrors={formErrors}
              namantaranPurposeInput={namantaranPurposeInput}
              namantaranPurposeInputChange={namantaranPurposeInputChange}
              propertyIdData={propertyIdData}
            />
          </div>


          {isNewOwner ?
            <div style={styles.card}>
              <div style={styles.assessmentStyle}>{t("New Owner Details")}</div>



              <PropertyOwner2
                t={t}
                ownershipType2={ownershipType2}
                handleOwnershipTypeChange2={handleOwnershipTypeChange2}
                handleRestryIdChange2={handleRestryIdChange2}
                registryId2={registryId2}
                owners2={owners2}
                setOwners2={setOwners2}
                addNewOwner={addNewOwner}
                isJointStarted={isJointStarted}
                styles={styles}
                formErrors={formErrors}
                handleOwnerAadhaarChange2={handleOwnerAadhaarChange2}
                handleOwnerNameChange2={handleOwnerNameChange2}
                handleOwnerContactChange2={handleOwnerContactChange2}
                handleOwnerEmailChange2={handleOwnerEmailChange2}
                propertyCategoryInput2={propertyCategoryInput2}
                propertyCategoryInputChange2={propertyCategoryInputChange2}
              />


            </div> :
             <div style={styles.card}>
              <div style={styles.assessmentStyle}>{t("Original Property Owner Details")}</div>



              <OriginalPropertyOwner
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


            </div>}




          <div style={styles.card}>
            <div style={styles.assessmentStyle}>{t("Property Address")}</div>
            <PropertyAddress
              t={t}
              addressDetails={addressDetails}
              handleInputChange={handleInputChange}
              handleDropdownChange={handleDropdownChange}
              updateRateZone={updateRateZone}
              styles={styles}
              formErrors={formErrors}
              setFormErrors={setFormErrors}
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
                handleOwner={handleOwner} 
                isNewOwner={isNewOwner}
            />

          </div>


          {/* Attachments Section */}

          {isNewOwner ? <div style={styles.card}>
            <AttachmentsSection
              t={t}
              handleFileChange={handleFileChange}
              formErrors={formErrors}
              documents={documents}
              resetKey={fileResetKey}
              submitForm={submitForm}
               namantaranPurposeInput={namantaranPurposeInput}
            />
          </div> : <div></div>}



          {/* <div style={styles.card}>
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
          </div> */}
          {/* <div style={styles.card}>
            <AttachmentsSection
              t={t}
              handleFileChange={handleFileChange}
              formErrors={formErrors}
              documents={documents}
              resetKey={fileResetKey}
            />
          </div> */}
          {/* <div style={styles.card}>
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

           
            {Object.keys(serverErrors).length > 0 && (
              <div
                style={{
                  marginTop: "16px",
                  padding: "14px 18px",
                  borderLeft: "4px solid #dc3545",
                  borderRadius: "8px",
                  background: "rgba(107, 19, 63, 0.12)",
                  color: "#611a15",
                  fontSize: "14px",
                  fontFamily: "Poppins, sans-serif",
                  boxShadow: "0 4px 8px rgba(220, 53, 69, 0.2)",
                  animation: "fadeIn 0.4s ease-in-out",
                }}
              >
                <strong style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "18px", marginRight: "8px" }}>  ⚠️</span>
                  Submission Failed
                </strong>
                <ul style={{ margin: 0, paddingLeft: "18px" }}>
                  {Object.entries(serverErrors).map(([key, msg]) => (
                    <li key={key} style={{ marginBottom: "4px" }}>
                      {msg}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div style={styles.buttonContainer}>
            
              <SubmitBar label={t("Save")} onSubmit={handleSubmit} style={{ background: "#6b133f" }} />
         
            </div>
          
          
          </div> */}

        </div>
      )}

      {showSuccessModal && (
        <SuccessModal
          t={t}
          applicationNumber={acknowledgmentNumber} // <-- dynamic
          propertyId={propertyId}                  // <-- optional, if modal accepts it
          status={status}                          // <-- optional
          onClose={() => setShowSuccessModal(false)}
          styles={styles}

        />
      )}
    </React.Fragment>
  );
};

export default NamantaranApplication;



