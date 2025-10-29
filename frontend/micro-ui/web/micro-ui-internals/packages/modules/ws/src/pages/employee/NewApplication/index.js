
import {
  Loader, Card,
  SubmitBar,
  TextInput,
  Dropdown,
  MultiSelectDropdown,
  PopUp,
  CheckBox,
  Toast
} from "@egovernments/digit-ui-react-components";
import FilterContext from "./FilterContext";
import React, { useContext, useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { PTService } from "../../../../../../libraries/src/services/elements/PT";
import styles from "./IndexStyle"
import OwnershipDetailsSection from "./OwnershipDetailsSection";
import FetchDataSection from "./FetchDataSection"
import FeeDataSection from "./FeeDataSection"
import AddressSection from "./AddressSection";
import { getPattern, isValidAadhar } from "../../../utils";
// import AssessmentDetailsSection from "./AssessmentDetailsSection";
// import PropertyDetailsTableSection from "./PropertyDetailsTableSection";
// import OtherDetailsSection from "./OtherDetailsSection";
// import SuccessModal from "./SuccessModal";
// import CorrespondenceAddressSection from "./CorrespondenceAddressSection";
import AttachmentsSection from "./Attachments";
import SelfDeclaration from "./SelfDeclaration";
//import{getWSDefaultpayload} from "../../../utils/getWSDefaultpayload";

const NewApplication = () => {
  ////////////
  const location = useLocation();

  const {
    generalDetails,
    WaterConnection,
    addressDetailsSet,
    ownerDetails,
    unitDetails,
    waterDocuments,
    additionalDetails,
    workflow,
    processInstance,
    correspondenceAddressData,
  } = location.state || {};
  const [payload, setPayload] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [connectionTypeP, setconnectionTypeP] = useState("Non Metered");
  const [Propertyies, setProperty] = useState({})
  const { t } = useTranslation();
  const [showToast, setShowToast] = useState(null);
  let userInfo1 = JSON.parse(localStorage.getItem("user-info"));
  const tenantId = userInfo1?.tenantId;
  const config = {
    enabled: !!(payload && Object.keys(payload).length > 0)
  }
  const [searchReult, setsearchReult] = useState(null);
  //const [updatedProperty, setupdatedProperty] = useState(null)
  const [propertyId, setPropertyId] = useState("Yes");
  // const [status, setStatus] = useState("");
  // const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isJointStarted, setIsJointStarted] = useState(false); // NEW
  // const [selectedAssessmentYear, setSelectedAssessmentYear] = useState(null);
  const [documents, setDocuments] = useState({
    photoId: null,
    ownershipDoc: null,
    sellersRegistry: null,
  });
  console.log("documents", documents.sellersRegistry);
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
      alternatemobilenumber: "",
      mobileNumber: "",
      gender: "",
      PhotoID: "",
      PhotoIDValue: "",
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
    locality: null,
    ward: null,
    zone: null,
  });
  const [WaterConncetionDetails, setWsConnectionDetails] = useState({
    UsesType: "",
    waterConnectionType: "",
    connectionSize: "",
    ConnectionCharge: "",
    MonthlyCharge: "",

  });
  const [isOwner, setShowOwner] = useState(false);
  //let UlbOption = [];
  const [UlbOption, setUlbOption] = useState([]);

  const selectDDR = (e, data) => {
    const DDRsSelectedByUser = UlbOption.filter((ulb) => {
      return !!e.find((tenant) => {
        return ulb.ddrKey === tenant?.[1].ddrKey;
      });
    });
    const newOwnersToAdd = DDRsSelectedByUser.map((element, index) => {
      // Create a new owner object for each item in DDRsSelectedByUser
      // The logic for what data to include (like name) is inside this map
      return {
        ...element.data,
        // name: element.name,
        // title: element.salutation,
        // hindiName: element.hindiName,
        // hindiTitle:element.salutationHindi,
        // gender:element.gender,
        // mobileNumber:element.mobileNumber,
        // alternatemobilenumber:element.alternatemobilenumber,
        // email:element.emailId,
        // fatherHusbandName:element.fatherOrHusbandName,
        // relationship:element.relationship,
      };
    });

    // Replace the state entirely with the new array
    setOwners(newOwnersToAdd);
  };
  const { value, setValue } = useContext(FilterContext);
  const [selected, setSelected] = useState(() => {
    if (UlbOption && UlbOption.length > 0) {
      UlbOption.filter((tenant) => value?.filters?.tenantId?.find((selectedTenant) => selectedTenant === tenant?.code))
    }


  }
  );
  const updatePropertExist = (value) => {
    setPropertyId(value);
  }
  const selectedDDRs = useMemo(
    () => {
      if (selected && selected.length > 0) {
        // return selected
        // .map((ulb) => UlbOption.filter((e) => e.code === ulb.code)[0])
        // .filter((item, i, arr) => i === arr.findIndex((t) => t.ddrKey === item.ddrKey))
        selected
          .map((ulb) => ulbTenants.ulb.filter((e) => e.code === ulb.code)[0])
          .filter((item, i, arr) => i === arr.findIndex((t) => t.ddrKey === item.ddrKey)),
          [selected, ulbTenants]
      }
    }

  );
  // const [correspondenceAddress, setCorrespondenceAddress] = useState("");
  // const [isSameAsPropertyAddress, setIsSameAsPropertyAddress] = useState(false);
  const [rateZones, setRateZones] = useState([])
  // const [assessmentDetails, setAssessmentDetails] = useState({
  //   rateZone: null, // Usually fetched
  //   roadFactor: null,
  //   oldPropertyId: "",
  //   plotArea: "",
  // });
  // const [unit, setUnit] = useState([{
  //   usageType: "",
  //   usageFactor: "",
  //   floorNo: "",
  //   constructionType: "",
  //   area: "",
  //   fromYear: "",
  //   toYear: ""
  // }]);
  console.log("HHHHHHUNITTTT==", owners);
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
    selfDeclaration: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});
  const history = useHistory();



  const token = localStorage.getItem("token");
  const stateId = Digit.ULBService.getStateId();
  const mutation = Digit.Hooks.ws.useWaterCreateAPI("WATER");
  const mutationUpdate = Digit.Hooks.pt.useUpdateContent(tenantId, true);
  //  const mutationGet = Digit.Hooks.pt.usePropertyAPI(tenantId, true);
  let tenantIdss = Digit.ULBService.getCurrentTenantId();

  const {
    isLoadingC,
    isSuccess,
    isError,
    data,
    mutate: wsCalculationEstimateMutate,
  } = Digit.Hooks.ws.usewsCalculationEstimate(tenantId);
  const {

    mutate: wsPropertySearchMutate,
    errorp: errorProperty,
  } = Digit.Hooks.ws.usewsPropertySearch(tenantId);


  const [isLoader, setIsLoader] = useState(false);
  const updateIsOwner = (value, owners) => {
    if (value) {
      setShowOwner(value);
      let UlbOption = [];
      // let  data = (searchReult).length > 0 ? (searchReult) : [];        
      if (owners.length > 0) {
        for (let index = 0; index < owners.length; index++) {
          const element = owners[index];
          UlbOption.push({
            code: index,
            ddrKey: `${element.name}`,
            ulbKey: `Indore ${index}`,
            data: element

          })

        }
        //setOwners(data[0]?.owners || []);
        setUlbOption(UlbOption);
      }
    }

  }
  const handleEstimate = (WaterConnection, WaterConnectionP) => {
    const payload = {
      CalculationCriteria: [{
        applicationNo: WaterConnection.applicationNo,
        tenantId: tenantId,
        // waterConnection:propertyData
      }]
    };
    // wsCalculationEstimateMutate(payload);

    wsCalculationEstimateMutate(payload, {
      onSuccess: (data) => {
        if (data && data.Calculation && data.Calculation.length > 0) {
          // WaterConnection.newConnectionCharges = WaterConnectionP.newConnectionCharges
          // WaterConnection.monthlyCharges = WaterConnectionP.monthlyCharges
          // setsearchReult(data.Properties)
          // updateIsOwner(true,data.Properties[0].owners);
          history.push({
            pathname: "/digit-ui/employee/ws/PreviewDemand",
            state: { data, proOwnerDetail: (searchReult).length > 0 ? (searchReult[0]) : {}, WaterConnection: WaterConnection }
            //state: { data, proOwnerDetail: propertyData, documents, waterDocuments, checkboxes, rateZones, owners, unit, assessmentDetails, assessmentDetails, propertyDetails, addressDetails, ownershipType, correspondenceAddress, isSameAsPropertyAddress }
          });
        }
        else {
          setShowToast({ warning: true, label: "No Records Found" });
        }

      },
      onError: (err) => {
        const apiErrors = err?.response?.data?.Errors || err?.Errors || [];
        const newErrors = {};
        apiErrors.forEach((apiErr) => {
          newErrors[apiErr.code] = apiErr.message;
        });
        setServerErrors(newErrors);
      },
    });



  };
  const handlePropdata = (propertyIds) => {
    const searchData = {
      propertyIds: propertyIds,// "0152252203624635",
      tenantId: tenantId,
    };
    //         const searchData = {
    //   CalculationCriteria:[ {
    //     applicationNo: propertyIds,//"WS_AP/107/2025-26/000074",
    //     tenantId: "mp.indore",
    //   }]
    // }
    wsPropertySearchMutate(searchData, {
      onSuccess: (data) => {
        if (data && data.Properties && data.Properties[0] && data.Properties[0].owners && data.Properties[0].owners.length > 0) {
          setsearchReult(data.Properties)
          updateIsOwner(true, data.Properties[0].owners);
          let address = data.Properties[0].address
          setAddressDetails({
            doorNo: address.doorNo || "",
            address: address.street || "",
            pincode: address.pincode || "",
            locality: address.locality
              ? { code: address.locality.code, name: address.locality.name || address.locality.code }
              : null,
            ward: address.ward
              ? { code: address.ward, name: address.ward }
              : null,
            zone: address.zone
              ? { code: address.zone, name: address.zone }
              : null,
          });
        }
        else {
          setShowToast({ warning: true, label: "No Records Found" });
        }

      },
      onError: (error) => {
        console.log("Estimate error===:", error);
      },
    });
    // wsCalculationEstimateMutate(searchData, {
    //   onSuccess: (data) => {


    //   },
    //   onError: (error) => {
    //     console.log("Estimate error===:", error);        
    //   },
    // });
  }

  const validateForm = () => {
    const errors = {};

    // ✅ Define regex here (so it exists inside this function)
    const hindiNameRegex = /^[\u0900-\u097F\s]{2,100}$/;

    // 1. Files validation
    if (!documents.photoId?.fileStoreId) {
      errors.photoId = "Proof of Identity is required.";
    }
    // if (!documents.ownershipDoc?.fileStoreId) {
    //   errors.ownershipDoc = "Proof of Ownership is required.";
    // }
    if (!documents.ebill?.fileStoreId) {
      errors.ebill = "Latest Electricity Bill is required.";
    }
    //ebill

    // 2. Ownership Type & Registry ID
    // if (!ownershipType) {
    //   errors.ownershipType = "Ownership type is required.";
    // }
    if (!propertyCategoryInput) {
      errors.propertyCategoryInput = "Property Category is required.";
    }
    // if (registryId && !/^[a-zA-Z0-9]{19}$/.test(registryId)) {
    //   errors.registryId = "Registry ID must be exactly 19 alphanumeric characters.";
    // }

    // 3. Owners validation (Iterate over ALL owners)
    owners.forEach((owner, index) => {
      // Owner Name
      if (!owner.name || !/^[a-zA-Z\s]+$/.test(owner.name)) {
        errors[`owner-${index}-name`] = "Owner name is required and must be alphabetic.";
      }
      if (!owner.PhotoID) {
        errors[`owner-${index}-PhotoIDValue`] = "Select Photo ID Type";
      }
      if (owner.PhotoID && !owner.PhotoIDValue) {
        errors[`owner-${index}-PhotoIDValue`] = "Enter Photo ID value";
      }
      // // Owner Name (Hindi)
      if (!owner.hindiName) {
        errors[`owner-${index}-hindiName`] = "यह फ़ील्ड अनिवार्य है।";
      } else if (!hindiNameRegex.test(owner.hindiName)) {
        errors[`owner-${index}-hindiName`] = "कृपया मान्य हिंदी नाम दर्ज करें।";
      }

      // Father/Husband Name
      if (owner.relationship !== "Not applicable") {
        if (!owner.fatherHusbandName || !/^[a-zA-Z\s]+$/.test(owner.fatherHusbandName)) {
          errors[`owner-${index}-fatherHusbandName`] = "Father/Husband name is required and must be alphabetic.";
        }
      }
      if (owner.relationship) {

      }

      console.log("owner.relationship==", owner.relationship);
      // Relationship
      if (!owner.relationship) {
        errors[`owner-${index}-relationship`] = "Relationship is required.";
      }
      // Mobile Number
      if (!owner.mobileNumber || !/^\d{10}$/.test(owner.mobileNumber)) {
        errors[`owner-${index}-mobileNumber`] = "Valid 10-digit mobileNumber number is required.";
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
    if (!addressDetails.locality) {
      errors.locality = "Colony selection is required.";
    }
    if (!addressDetails.ward) {
      errors.ward = "Ward selection is required.";
    }
    if (!addressDetails.zone) {
      errors.zone = "Zone selection is required.";
    }
    if (!WaterConncetionDetails.UsesType) {
      errors.UsesType = "Uses Type is required.";
    }
    if (!WaterConncetionDetails.waterConnectionType) {
      errors.waterConnectionType = "Water Connection Type is required.";
    }
    else {
      if (WaterConncetionDetails.waterConnectionType === "COMMERCIAL" && WaterConncetionDetails.UsesType !== "COMMERCIAL") {
        // errors.UsesType  = "For Commercial Water Connection Type, Uses Type must be Commercial.";
        setShowToast({ warning: true, label: "For Commercial Water Connection Type, Uses Type must be Commercial." });
      }
    }
    if (!WaterConncetionDetails.connectionSize) {
      errors.connectionSize = "Connection Size is required.";
    }
    if (!WaterConncetionDetails.ConnectionCharge) {
      errors.ConnectionCharge = "Connection Charge is required.";
    }
    if (!WaterConncetionDetails.MonthlyCharge) {
      errors.MonthlyCharge = "Monthly Charge is required.";
    }
    if (WaterConncetionDetails && WaterConncetionDetails.connectionSize && WaterConncetionDetails.MonthlyCharge && WaterConncetionDetails.ConnectionCharge) {
      if (WaterConncetionDetails.connectionSize.code === "15" && (parseFloat(WaterConncetionDetails.ConnectionCharge) < 1000 || parseFloat(WaterConncetionDetails.MonthlyCharge) < 50)) {
        setShowToast({ warning: true, label: "For Connection Size 1/2, Connection Charge must be at least 1000 and Monthly Charge must be at least 50." });
      }
    }

    // 5. Assessment Details
    // if (!assessmentDetails.rateZone) {
    //   errors.rateZone = " "; //Rate zone is required.
    // }
    // if (!assessmentDetails.roadFactor) {
    //   errors.roadFactor = "Road factor is required.";
    // }

    // ✅ Plot Area validation
    // if (!assessmentDetails.plotArea) {
    //   errors.plotArea = "Plot Area is required.";
    // }

    // 6. Self-Declaration Checkbox
    if (!checkboxes.selfDeclaration) {
      errors.selfDeclaration = "Please accept the declaration to proceed.";
    }
    return errors;
  };
  const handleSubmit_ = async () => {
    // let WaterConnection ={}
    //  PreviewDemand( WaterConnection);
  }
  const handleSubmit = async () => {
    const finalErrors = validateForm();
    setFormErrors(finalErrors);
    setServerErrors({});

    if (Object.keys(finalErrors).length > 0) {
      console.log("❌ Form has validation errors → API not called");
      setShowToast({ warning: true, label: "please fill all required field" });
      return;
    }

    const documentsToSubmit = buildDocumentPayload(documents);
    if (generalDetails?.acknowldgementNumber) {
      //handleSubmitUpdate();
      return;
    }
const propertyData = searchReult?.[0];

const updatedProperty = propertyData
  ? {
      ...propertyData,
      documents: null,
      owners: propertyData.owners?.map(owner => ({
        ...owner,
        documents: null,
      })) || [],
    }
  : null;

    // if (propertyId === "Yes") {
    //   setupdatedProperty({
    //     ...searchReult[0],
    //     documents: null,
    //     owners: searchReult[0].owners?.map(owner => ({
    //       ...owner,
    //       documents: null
    //     }))
    //   })

    // }
    // else {
    //   setupdatedProperty({
    //     propertyId: null,
    //     tenantId: tenantId,
    //     status: "ACTIVE",
    //     address: {
    //       locality:addressDetails.locality,
    //       zone:addressDetails.zone.code,
    //       ward:addressDetails.code,
    //       pincode:addressDetails.pincode,
    //       address:addressDetails.address,
    //       doorNo:addressDetails.doorNo
    //     },
    //     propertyType: propertyCategoryInput,
    //     owners: owners.map((owner, index) => ({
    //       salutation: owner.title || "mr",
    //       title: "title",
    //       name: owner.name || `Owner ${index + 1}`,
    //       isprimaryOwner: index === 0 ? true : false,
    //       salutationHindi: owner.hindiTitle,
    //       hindiName: owner.hindiName || "",
    //       fatherOrHusbandName: owner.fatherHusbandName || "",
    //       gender: "MALE",
    //       aadhaarNumber: owner.aadhaar || "",
    //       identityType: {
    //         identityType: owner.PhotoID || "",
    //         identityNumber: owner.PhotoIDValue || "",
    //       },
    //       altContactNumber: owner.alternatemobilenumber || "",
    //       mobileNumber: owner.mobileNumber,
    //       emailId: owner.email,
    //       tenantId: tenantId
    //     })),
    //   })

    // }

    const payload = {
      waterConnection: {
        tenantId: tenantId,
        pipeSize: (WaterConncetionDetails?.connectionSize?.code),
        propertyId: propertyId === "No" ? null : (searchReult).length > 0 ? (searchReult[0]).propertyId : null,
        connectionType: connectionTypeP === "Non Metered" ? "FLAT" : connectionTypeP,
        usageType: WaterConncetionDetails?.UsesType?.code,
        usageSubType: WaterConncetionDetails?.waterConnectionType?.code,
        isPropertyRegistered: propertyId === "No" ? false : true,
        connectionCharges: {
          newConnectionCharges: parseFloat(WaterConncetionDetails?.ConnectionCharge),
          monthlyCharges: parseFloat(WaterConncetionDetails?.MonthlyCharge),
          serviceCharges: 0,
          otherCharges: 0
        },
        channel: "CITIZEN",
        connectionHolders: owners.map((owner, index) => ({
          salutation: owner.title || "mr",
          title: "title",
          name: owner.name || `Owner ${index + 1}`,
          isprimaryOwner: index === 0 ? true : false,
          salutationHindi: owner.hindiTitle,
          hindiName: owner.hindiName || "",
          fatherOrHusbandName: owner.fatherHusbandName || "",
          gender: "MALE",
          aadhaarNumber: owner.aadhaar || "",
          identityType: {
            identityType: owner.PhotoID || "",
            identityNumber: owner.PhotoIDValue || "",
          },
          altContactNumber: owner.alternatemobilenumber || "",
          mobileNumber: owner.mobileNumber,
          emailId: owner.email,
          tenantId: tenantId
        })),
        Property: updatedProperty,
        documents: documentsToSubmit,
        processInstance: {
          action: "INITIATE",
        },
        auditDetails: {
          createdBy: userInfo1?.uuid,
          lastModifiedBy: userInfo1?.uuid,
          createdTime: new Date().getTime(),
          lastModifiedTime: new Date().getTime(),
        },
      }
    };

    setIsLoader(true);
    //PreviewDemand();
    mutation.mutate(payload, {
      onSuccess: (data) => {
        setIsLoader(false);
        const WaterConnection = data?.WaterConnection?.[0];
        if (WaterConnection) {
          // setProOwnerDetail(property);
          // setAcknowledgmentNumber(property.acknowldgementNumber);
          // setPropertyId(property.propertyId);
          // setStatus(property.status);
          // setShowSuccessModal(true);
          // setShowPreviewButton(true);
          PreviewDemand(WaterConnection, payload.waterConnection);
        }
      },

      onError: (err) => {
        setIsLoader(false);
        const apiErrors = err?.response?.data?.Errors || err?.Errors || [];
        const newErrors = {};
        apiErrors.forEach((apiErr) => {
          newErrors[apiErr.code] = apiErr.message;
        });
        setServerErrors(newErrors);
      },
    });
  };



  const buildDocumentPayload = (documentsState) => {
    const payloadDocs = [];

    // Add the known, non-dynamic documents first
    if (documentsState.photoId?.fileStoreId) {
      payloadDocs.push({
        documentType: "Proof of Identity",
        fileStoreId: documentsState.photoId.fileStoreId,
        documentUid: documentsState.photoId.documentUid,
        status: true
      });
    }
    if (documentsState.ebill?.fileStoreId) {
      payloadDocs.push({
        documentType: "Electricity Bill",
        fileStoreId: documentsState.ebill.fileStoreId,
        documentUid: documentsState.ebill.documentUid,
        status: true
      });
    }
    if (documentsState.Others_0?.fileStoreId) {
      payloadDocs.push({
        documentType: "Others",
        fileStoreId: documentsState.Others_0.fileStoreId,
        documentUid: documentsState.Others_0.documentUid,
        status: true
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
      // ✅ CORRECTED LINE: Check for keys that start with "others_"
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

  const handelwaterfee = (field, selectedOption) => {
    // const { name, code } = e.target;
    // setWsConnectionDetails(prev => ({ ...prev, [name]: code }));
    //setAddressDetails(prev => ({ ...prev, [name]: value }));

    setWsConnectionDetails((prev) => {
      const next = { ...prev, [field]: selectedOption };

      if (field === "UsesType") {
        // next.ward = null;
        next.waterConnectionType = null;
        next.connectionSize = null;
      } else if (field === "waterConnectionType") {
        // next.locality = null;
        next.connectionSize = null;
      } else if (field === "locality") {
        next.rateZone = null;
      }
      return next;
    });

    // 2) update formErrors live (remove error for the field when selected,
    //    also remove errors for dependents when parent resets)
    setFormErrors((prev) => {
      const copy = { ...prev };

      if (selectedOption) delete copy[field];
      else copy[field] = `${capitalize(field)} is required.`;

      // If you changed zone/ward/locality, clear dependent errors (don't set them)
      if (field === "UsesType") {
        // delete copy.ward;
        delete copy.waterConnectionType;
        delete copy.connectionSize;
      } else if (field === "wawaterConnectionTyperd") {
        delete copy.connectionSize;
        //  delete copy.rateZone;
      } else if (field === "locality") {
        delete copy.rateZone;
      }

      return copy;
    });
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...formErrors };

    setAddressDetails(prev => ({ ...prev, [name]: value }));

    // Field-level validation
    switch (name) {
      case "pincode":
        if (!value) {
          newErrors.pincode = "Pincode is required.";
        } else if (!/^452\d{3}$/.test(value)) {
          newErrors.pincode = "Pincode must be 6 digits and start with 452.";
        } else {
          delete newErrors.pincode;
        }
        break;

      case "address":
        if (!value) {
          newErrors.address = "Address is required.";
        } else if (!/^[A-Za-z0-9\s\-,()\/.]{10,200}$/.test(value)) {
          newErrors.address = "Please enter a valid address";
        } else {
          delete newErrors.address;
        }
        break;

      case "doorNo":
        if (!value) {
          newErrors.doorNo = "Door/House No is required.";
        } else {
          delete newErrors.doorNo;
        }
        break;

      default:
        break;
    }


    setFormErrors(newErrors);
  };
  const PreviewDemand = (WaterConnection, data) => {

    handleEstimate(WaterConnection, data);
  }
  useEffect(() => {
    if (!generalDetails) return;
    setOwnershipType(generalDetails.ownershipCategory || null);
    setPropertyCategoryInput(generalDetails.propertyCategoryInput || null);
    setRegistryId(generalDetails.registryId || null);
  }, [generalDetails]);


  useEffect(() => {
    if (!waterDocuments || waterDocuments.length === 0) return;

    const docMap = {
      photoId: waterDocuments.find(d => d.documentType === "Proof of Identity") || null,
      ownershipDoc: waterDocuments.find(d => d.documentType === "Electricity Bill") || null,
      sellersRegistry: waterDocuments.find(d => d.documentType === "Others") || null,
    };

    console.log("docMap=", docMap);
    setDocuments(docMap);

  }, [waterDocuments]);


  useEffect(() => {
    if (!WaterConnection || WaterConnection.length === 0) return;

    const formatted = WaterConnection && WaterConnection.connectionHolders.map((owner) => ({
      title: owner.salutation || "",
      name: owner.name || "",
      //aadhaar: owner.aadhaarNumber || "",
      hindiTitle: owner.salutationHindi || "",
      hindiName: owner.hindiName || "",
      fatherHusbandName: owner.fatherOrHusbandName || "",
      relationship: owner.relationship || "",
      email: owner.emailId,
      alternatemobilenumber: owner.alternatemobilenumber || "",
      mobileNumber: owner.mobileNumber || "",
      // samagraID: owner.samagraId || "",
      // noSamagra: !owner.samagraId, // true if not available
      PhotoID: owner ? owner.identityType?.identityType || "" : "",
      PhotoIDValue: owner ? owner.identityType?.identityNumber || "" : "",
    }));

    setOwners(formatted);
  }, [ownerDetails]);
  useEffect(() => {
    if (addressDetailsSet) {
      setAddressDetails({
        doorNo: addressDetailsSet.doorNo || "",
        address: addressDetailsSet.street || "",
        pincode: addressDetailsSet.pincode || "",
        locality: addressDetailsSet.locality
          ? { code: addressDetailsSet.locality.code, name: addressDetailsSet.locality.name || addressDetailsSet.locality.code }
          : null,
        ward: addressDetailsSet.ward
          ? { code: addressDetailsSet.ward, name: addressDetailsSet.ward }
          : null,
        zone: addressDetailsSet.zone
          ? { code: addressDetailsSet.zone, name: addressDetailsSet.zone }
          : null,
      });
    }
  }, [addressDetailsSet]);
  // Restore property details for Exemption and Essential Tax fields from PreviewDemand
  useEffect(() => {
    if (!WaterConnection) return
    if (WaterConnection) {
      setWsConnectionDetails(
        {
          UsesType: WaterConnection.UsesType || "",
          waterConnectionType: WaterConnection.connectionType || "",
          connectionSize: WaterConnection.pipeSize || "",
          ConnectionCharge: WaterConnection.newConnectionCharges || "",
          MonthlyCharge: WaterConnection.monthlyCharges || "",
        }

      )
    }
  }, [WaterConnection]);
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
    if (field === "mobileNumber") {
      if (!value) {
        errors[fieldKey] = "Mobile Number is required.";
      } else if (!mobileRegex.test(value)) {
        errors[fieldKey] = "Mobile Number must be 10 digits.";
      } else {
        delete errors[fieldKey];
      }
    } else if (field === "alternatemobilenumber") {
      // For alternative number, only validate if a value is entered
      if (value && !mobileRegex.test(value)) {
        errors[fieldKey] = "Alternative Number must be 10 digits.";
      } else {
        delete errors[fieldKey];
      }
    }

    setFormErrors(errors);
  };
  const handlePhotoIDChange = (index, field, value) => {
    const errors = { ...formErrors };
    const fieldKey = `owner-${index}-PhotoIDValue`;
    const newOwners = [...owners];
    newOwners[index][field] = value;
    setOwners(newOwners);
    let valid = false;
    if (!value) {
      errors[fieldKey] = "This field is required.";
    } else {
      if (newOwners[index].PhotoID === "ADDAAR") {
        valid = isValidAadhar(value)  //getPattern("AadharNo").test(value)
        if (!valid) {
          errors[fieldKey] = "Please enter a valid Aadhar Number.";
        }

      }
      else if (newOwners[index].PhotoID === "PAN") {
        valid = getPattern("PAN").test(value)
        if (!valid) {
          errors[fieldKey] = "Please enter a valid PAN Number.";
        }

      }
      else if (newOwners[index].PhotoID === "VOTERID") {
        valid = getPattern("VOTERID").test(value)
        if (!valid) {
          errors[fieldKey] = "Please enter a valid Voter ID.";
        }

      }
      else if (newOwners[index].PhotoID === "DRIVINGLICENSE") {
        valid = getPattern("DRIVINGLICENSE").test(value)
        if (!valid) {
          errors[fieldKey] = "Please enter a valid Driving License,Ex: MP2512341234567.";
        }

      }

    }
    if (valid) {
      delete errors[fieldKey];
    }
    setFormErrors(errors);
  }
  // Validation for Name:
  const handleOwnerNameChange = (index, field, value) => {
    const newOwners = [...owners];
    newOwners[index][field] = value;
    setOwners(newOwners);

    const errors = { ...formErrors };
    const fieldKey = `owner-${index}-${field}`;

    // Regular expressions for validation
    const englishNameRegex = /^[a-zA-Z\s.\-']{2,100}$/;
    const hindiNameRegex = /^[\u0900-\u097F\s]{2,100}$/;

    if (!value) {
      errors[fieldKey] = "This field is required.";
    } else {
      // Check which field is being validated
      if (field === "name" || field === "fatherHusbandName") {
        if (!englishNameRegex.test(value)) {
          errors[fieldKey] = "Please enter a valid English name.";
        } else {
          delete errors[fieldKey];
        }
      } else if (field === "hindiName") {
        // ✅ Hindi only
        if (!hindiNameRegex.test(value)) {
          errors[fieldKey] = "Please enter a valid Hindi name.";
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
    setFormErrors(errors);
  };

  const capitalize = (s) => s?.charAt(0)?.toUpperCase() + s?.slice(1) || "";

  const handleDropdownChange = (field, selectedOption) => {
    console.log("handleDropdownChange", field, selectedOption);

    // 1) update addressDetails in one atomic update and reset dependents
    setAddressDetails((prev) => {
      const next = { ...prev, [field]: selectedOption };

      if (field === "zone") {
        next.ward = null;
        next.locality = null;
        next.rateZone = null;
      } else if (field === "ward") {
        next.locality = null;
        next.rateZone = null;
      } else if (field === "locality") {
        next.rateZone = null;
      }
      return next;
    });

    // 2) update formErrors live (remove error for the field when selected,
    //    also remove errors for dependents when parent resets)
    setFormErrors((prev) => {
      const copy = { ...prev };

      if (selectedOption) delete copy[field];
      else copy[field] = `${capitalize(field)} is required.`;

      // If you changed zone/ward/locality, clear dependent errors (don't set them)
      if (field === "zone") {
        delete copy.ward;
        delete copy.locality;
        delete copy.rateZone;
      } else if (field === "ward") {
        delete copy.locality;
        delete copy.rateZone;
      } else if (field === "locality") {
        delete copy.rateZone;
      }

      return copy;
    });
  };


  const updateRateZone = (value) => {
    setRateZones(value);
  }
  const addNewOwner = () => {
    const newOwnersToAdd = {
      title: "GFHGH",
      name: "",
      aadhaar: "",
      hindiTitle: "",
      hindiName: "",
      fatherHusbandName: "",
      relationship: "",
      email: "",
      alternatemobilenumber: "",
      mobileNumber: "",
      gender: "",
      PhotoID: "",
      PhotoIDValue: "",
      samagraID: "",
      noSamagra: false,
    }
    setOwners([...owners, {}]); // Add a new empty owner object
    setIsJointStarted(true);

    // Create a new array without the item at the specified index
    //  const filteredOwners = owners.filter((_, index) => index !== indexToRemove);

    // Create the final new array by adding the new object
    //setOwners([...filteredOwners, {}]);
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
  if (isLoader) {
    return <Loader />;
  }
  return (
    <React.Fragment>
      <div style={{ marginLeft: "15px" }}>
        {/* <Header>{t(config.head)}</Header> */}
      </div>
      <div style={styles.card}>
        <div style={styles.assessmentStyle}>{t("Fetch Details")}</div>
        <div style={{ display: "contents" }}></div>
        {/* <button
                        type="button"
                        className="btn-search"
                        onClick={() => {
                            console.log("Search button clicked");
                            handlePropdata()
                            
                        }}
                    >
                        Go
                    </button> */}
        <FetchDataSection
          t={t}
          // updateIsOwner={updateIsOwner}
          setShowToast={setShowToast}
          setProperty={setProperty}
          updatePropertExist={updatePropertExist}
          isLoading={isLoading}
          data={123}
          // data={isSuccess && !isLoading ? (searchReult.length > 0 ? searchReult : { display: "ES_COMMON_NO_DATA" }) : "ES_COMMON_NO_DATA"}
          //onSubmit={onSubmit}
          styles={styles}
          formErrors={formErrors}
          handlePropdata={handlePropdata}
          generalDetails={generalDetails}

        />
      </div>
      {
        isOwner && (
          <div style={styles.card}>
            <div style={styles.assessmentStyle}>{t("Select Owner")}
              <div style={styles.nameInputContainer}>

                <MultiSelectDropdown
                  options={UlbOption}
                  //options={ulbTenants?.ddr && ulbTenants.ddr?.sort((x, y) => x?.ddrKey?.localeCompare(y?.ddrKey))}
                  optionsKey="ddrKey"
                  onSelect={selectDDR}
                  selected={selectedDDRs}
                  defaultLabel={t("WS_ALL_OWNER_SELECTED")}
                  defaultUnit={t("WS_OWNER_SELECTED")}
                />
              </div>
            </div>

          </div>)
      }
      <div style={styles.card}>

        <div style={styles.assessmentStyle}>{t("Connection Holader Details")}</div>
        <OwnershipDetailsSection
          t={t}
          ownershipType={propertyId}
          owners={owners}
          setOwners={setOwners}
          setIsJointStarted={setIsJointStarted}
          addNewOwner={addNewOwner}
          //  deleteNewOwner={deleteNewOwner}
          isJointStarted={isJointStarted}
          styles={styles}
          formErrors={formErrors}
          handleOwnerAadhaarChange={handleOwnerAadhaarChange}
          handleOwnerNameChange={handleOwnerNameChange}
          handlePhotoIDChange={handlePhotoIDChange}
          handleOwnerContactChange={handleOwnerContactChange}
          handleOwnerEmailChange={handleOwnerEmailChange}
          setFormErrors={setFormErrors}
        // propertyCategoryInput={propertyCategoryInput}
        // propertyCategoryInputChange={propertyCategoryInputChange}
        />

      </div>
      <div style={styles.card}>
        <div style={styles.assessmentStyle}>{t("Connection Address")}</div>
        <AddressSection
          t={t}
          addressDetails={addressDetails}
          handleInputChange={handleInputChange}
          handleDropdownChange={handleDropdownChange}
          updateRateZone={updateRateZone}
          styles={styles}
          formErrors={formErrors}
          propertyCategoryInput={propertyCategoryInput}
          propertyCategoryInputChange={propertyCategoryInputChange}
          setFormErrors={setFormErrors}
        />

      </div>
      <div style={styles.card}>
        <div style={styles.assessmentStyle}>{t("Water Connection & Fee Details")}</div>
        <FeeDataSection
          t={t}
          styles={styles}
          WaterConnection={WaterConnection}
          WaterConncetionDetails={WaterConncetionDetails}
          //handleInputChange={handleInputChange}
          handelwaterfee={handelwaterfee}
          formErrors={formErrors}
          setconnectionTypeP={setconnectionTypeP}
          setFormErrors={setFormErrors}
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
        <SelfDeclaration
          t={t}
          checkboxes={checkboxes}
          handleCheckboxChange={handleCheckboxChange}
          styles={styles}
          formErrors={formErrors} />


        {/* ✅ Global error messages from backend */}
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

          <SubmitBar label={t("Preview")} onSubmit={handleSubmit} style={{ background: "#6b133f" }} />
          {/* )} */}
        </div>
      </div>
      {/* { (
        <PopUp>
          <div>PreviewEstimateDemand  </div>
        </PopUp>
      )} */}
      {showToast && (
        <Toast
          error={showToast.error}
          warning={showToast.warning}
          label={t(showToast.label)}
          isDleteBtn={"true"}
          onClose={() => {
            setShowToast(null);
          }}
        />
      )}
    </React.Fragment>
  );
};

export default NewApplication;
