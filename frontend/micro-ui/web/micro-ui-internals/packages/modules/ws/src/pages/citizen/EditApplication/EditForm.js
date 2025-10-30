

import {
    Loader, Card,
    SubmitBar,
    Toast,
    TextInput,
    Dropdown,
    CheckBox,
} from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./IndexStyle"
import OwnershipDetailsSection from "./OwnershipDetailsSection";
import AddressSection from "./AddressSection";
import FeeDataSection from "./FeeDataSection"
import AttachmentsSection from "./Attachments";
import SelfDeclaration from "./SelfDeclaration";

const EditUpdateForm = ({ applicationData }) => {
    // const location = useLocation();
    const { state } = useLocation();
    console.log("EditUpdateForm Props:", state);
    const { t } = useTranslation();
    const [isLoader, setIsLoader] = useState(false);
    const [showToast, setShowToast] = useState(null);
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
        ebill: null,
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
    const [addressDetails, setAddressDetails] = useState({
        doorNo: "",
        address: "",
        pincode: "",
        colony: null,
        ward: null,
        zone: null,
    });
    const [waterDetails, setwaterDetails] = useState({
        connectionType: "",
        UsesType: "",
        waterConnectionType: "",
        connectionSize: null,
        newConnectionCharges: 0,
        MonthlyCharge: 0,
    });
    const [correspondenceAddress, setCorrespondenceAddress] = useState("");


    const [checkboxes, setCheckboxes] = useState({
        mobileTower: false,
        broadRoad: false,
        advertisement: false,
        seniorCitizenDiscount: false,
        selfDeclaration: true,
    });
    const [formErrors, setFormErrors] = useState({});
    const [serverErrors, setServerErrors] = useState({});
    const [flag, setFlag] = useState(true);


    useEffect(() => {
        const storedFlag = JSON.parse(sessionStorage.getItem("flagstatus"));
        if (storedFlag) {
            setFlag(storedFlag);
            sessionStorage.removeItem("flagstatus"); // clear after reading once
        }
    }, []);


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
    const mutationUpdate = Digit.Hooks.ws.useWSUpdateAPI("WATER");
    const mutationUpdatesss = Digit.Hooks.pt.usePropertyAPI(tenantId, false);
    let tenantIdss = Digit.ULBService.getCurrentTenantId();

    const {
        isLoading: ptCalculationEstimateLoading,
        data: ptCalculationEstimateData,
        mutate: ptCalculationEstimateMutate,
        error,
    } = Digit.Hooks.pt.usePtCalculationEstimate(tenantId);


    const handleEstimate = (newPropertyId, property) => {


        const payload = {

        };

        ptCalculationEstimateMutate(payload, {
            onSuccess: (data) => {

            },
            onError: (error) => {
                alert("Estimate error:", error);
            },
        });
    };
    const closeToast = () => {
        setShowToast(null);
    };
    const handleWaterInputChange = (field, value) => {
        setwaterDetails((prev) => ({ ...prev, [field]: value }));

        if (formErrors?.[field]) {
            setFormErrors((prev) => {
                const updated = { ...prev };
                delete updated[field];
                return updated;
            });
        }
    };


    const validateWaterDetails = (details) => {
        const errors = {};

        Object.keys(details).forEach((key) => {
            if (!details[key] && details[key] !== 0) {
                errors[key] = `${key} is required`;
            }
        });

        return {
            isValid: Object.keys(errors).length === 0,
            errors,
        };
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


    const handleSubmitUpdateChange = async () => {

        const { isValid, errors } = validateWaterDetails(waterDetails);

        if (!isValid) {
            setFormErrors(errors);
            return false;
        }
        let documentsToSubmit = null
        if (documents.length > 0) {
            documentsToSubmit = buildDocumentPayload(documents);
        }
        else {
            documentsToSubmit = applicationData.documents.map(doc =>
                doc.documentType === "Proof of Identity"
                    ? { ...doc, fileStoreId: doc.fileStoreId }
                    : doc
            )
        }

        const updatedWaterConnection = {
            ...applicationData,
            //   documents: applicationData.documents.map(doc =>
            //     doc.documentType === "Proof of Identity"
            //       ? { ...doc, fileStoreId: doc.fileStoreId }
            //       : doc
            //   ),
            documents: documentsToSubmit,
            processInstance: {
                action: "UPDATE"
            },
            usageType: waterDetails.UsesType?.code,
            usageSubType: waterDetails.waterConnectionType?.code,           // updated value
            pipeSize: waterDetails.connectionSize?.code,
            connectionCharges: {
                ...applicationData.connectionCharges,
                monthlyCharges: waterDetails.MonthlyCharge,
                newConnectionCharges: waterDetails.newConnectionCharges,  // Only this field changes
            }
        };


        const payload = {
            waterConnection: updatedWaterConnection
        }

        setIsLoader(true);



        mutationUpdate.mutate(payload, {
            onSuccess: (data) => {
                setIsLoader(false);
                const WaterConnection = data?.WaterConnection?.[0];
                if (WaterConnection) {
                    //const flag = true;
                    // history.push({
                    //     pathname: `/digit-ui/employee/ws/application-details?applicationNumber=${WaterConnection.applicationNo}`,
                    //     //state: { data, proOwnerDetail: propertyData, documents, waterDocuments, checkboxes, rateZones, owners, unit, assessmentDetails, assessmentDetails, propertyDetails, addressDetails, ownershipType, correspondenceAddress, isSameAsPropertyAddress }
                    // });
                    sessionStorage.setItem("flag", JSON.stringify(flag));
                    window.location.href = `/digit-ui/employee/ws/application-details?applicationNumber=${WaterConnection.applicationNo}`;


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
                setShowToast({ key: "error", error });
                setTimeout(closeToast, 5000);
            },
        });

    };
    const validateForm = () => {
        const errors = {};

        // 1. Files validation
        if (!documents.photoId?.fileStoreId) {
            errors.photoId = "Proof of Identity is required.";
        }
        if (!documents.ebill?.fileStoreId) {
            errors.ebill = "Proof of Ownership is required.";
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


        // 6. Self-Declaration Checkbox
        if (!checkboxes.selfDeclaration) {
            errors.selfDeclaration = "Please accept the declaration to proceed.";
        }
        if (!longLat.lat || !longLat.long) {
            errors.longLat = "Latitude and Longitude are required.";
        }
        return errors;
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

    useEffect(() => {
        if (!applicationData || applicationData.length === 0) return;

        const formatted = applicationData?.connectionHolders.map((owner) => ({
            title: owner.salutation || "",
            name: owner.name || "",
            aadhaar: owner.aadhaarNumber || "",
            hindiTitle: owner.salutationHindi || "",
            hindiName: owner.hindiName || "",
            fatherHusbandName: owner.fatherOrHusbandName === null ? owner.guardian : owner.fatherHusbandName || "",
            relationship: owner.relationship || "",
            email: owner.emailId,
            altNumber: owner.altContactNumber || "",
            mobile: owner.mobileNumber || "",
            gender: owner.gender,
            PhotoID: owner.identityType?.identityType,
            PhotoIDValue: owner?.identityType?.identityNumber,
            relationship: owner?.guardianRelation === null ? "Not applicable" : owner.guardianRelation

        }));

        setOwners(formatted);
        const {
            doorNo,
            // address,
            pincode,
            locality,
            ward
        } = applicationData?.property?.address;

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
                doorNo: applicationData?.property?.address?.doorNo || "",
                address: applicationData?.property?.address?.street || "",
                pincode: applicationData?.property?.address?.pincode || "",
                colony: applicationData?.property?.address?.locality
                    ? { code: applicationData?.property?.address?.locality.code, name: applicationData?.property?.address?.locality.name || applicationData?.property?.address?.locality.code }
                    : null,
                ward: applicationData?.property?.address?.ward
                    ? { code: applicationData?.property?.address?.ward, name: applicationData?.property?.address?.ward }
                    : null,
                zone: applicationData?.property?.address?.zone
                    ? { code: applicationData?.property?.address?.zone, name: applicationData?.property?.address?.zone }
                    : null,
            });
            setPropertyCategoryInput(applicationData?.connectionType);
            if (applicationData.documents.length > 0) {
                let waterDocuments = applicationData.documents
                const docMap = {
                    photoId: waterDocuments.find(d => d.documentType === "Proof of Identity") || null,
                    ebill: waterDocuments.find(d => d.documentType === "Electricity Bill") || null,
                    sellersRegistry: waterDocuments.find(d => d.documentType === "Others") || null,
                };
                setDocuments(docMap);
            }
            setwaterDetails({
                connectionType: applicationData?.connectionType === "FLAT" ? "Non Metered" : "Metered" || "",
                UsesType: {
                    code: applicationData?.usageType,
                    name: applicationData?.usageType
                },
                waterConnectionType: {
                    code: applicationData?.usageSubType,
                    name: applicationData?.usageSubType
                },
                connectionSize: {
                    code: applicationData?.pipeSize,
                    name: applicationData?.pipeSize
                },
                newConnectionCharges: applicationData?.connectionCharges?.newConnectionCharges || "",
                MonthlyCharge: applicationData?.connectionCharges?.monthlyCharges || "",

            })


        }
    }, [applicationData]);

    const propertyCategoryInputChange = (val) => {

        setPropertyCategoryInput(val.code);

        // 🟢 Clear error live when user selects value
        setFormErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.propertyCategoryInput;
            return newErrors;
        });

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




    if (isLoader) {
        return <Loader />;
    }

    return (

        <React.Fragment>
            <div style={styles.assessmentStyles}></div>
            {!showSuccessModal && (
                <div >

                    {/* Attachments Section */}
                    <div style={styles.card}>

                        <div style={styles.assessmentStyle}>{t("Connection Holder Details")}</div>

                        <OwnershipDetailsSection
                            t={t}
                            handleOwnershipTypeChange={handleOwnershipTypeChange}
                            handleRestryIdChange={handleRestryIdChange}
                            registryId={registryId}
                            owners={owners}
                            setOwners={setOwners}
                            addNewOwner={addNewOwner}
                            isJointStarted={isJointStarted}
                            styles={styles}
                            formErrors={formErrors}
                            handleOwnerNameChange={handleOwnerNameChange}
                            handleOwnerContactChange={handleOwnerContactChange}
                            handleOwnerEmailChange={handleOwnerEmailChange}


                        />
                    </div>

                    <div style={styles.card}>
                        <div style={styles.assessmentStyle}>{t("Connection Address")}</div>
                        <AddressSection
                            t={t}
                            addressDetails={addressDetails}
                            handleInputChange={handleInputChange}
                            handleDropdownChange={handleDropdownChange}
                            styles={styles}
                            propertyCategoryInput={propertyCategoryInput}
                            formErrors={formErrors}
                            propertyCategoryInputChange={propertyCategoryInputChange}
                        />
                    </div>
                    <div style={styles.card}>
                        <div style={styles.assessmentStyle}>{t("Water Connection & Fee Details")}</div>
                        <FeeDataSection
                            t={t}
                            styles={styles}
                            waterDetails={waterDetails}
                            handleWaterInputChange={handleWaterInputChange}
                            // handelwaterfee={handelwaterfee}
                            formErrors={formErrors}
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
                    {/* <div style={styles.card}>
                        <LocationDetails handleLocationUpdate={handleLocationUpdate} handlePhotoCapture={handlePhotoCapture} applicationData={applicationData} formErrors={formErrors} />
                    </div> */}
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

                            {flag && (
                                <SubmitBar label={t("Save")} onSubmit={handleSubmitUpdateChange} style={{ background: "#6b133f" }} />
                            )}

                            {/* )} */}
                        </div>
                    </div>

                </div>
            )}

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

export default EditUpdateForm;




