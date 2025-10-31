import React, { useState, useEffect, useRef } from "react";
import ApplicationDetailsSection from "../../components/Applicationdetailssection";
import AttachmentsSection from "../../components/Attachmentssection";
import SuccessModal from "../../components/Successmodal";
import { Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Fragment } from "react";

const UpdateDeathCertificateApplication = () => {
    const { t } = useTranslation();
    const { applicationId } = useParams(); // Get applicationId from route
    const tenantId = Digit.ULBService.getCurrentTenantId();

    // Fetch application data if applicationId exists
    const { isLoading: isFetchingData, isError: isFetchError, data: fetchedData, error: fetchError } = Digit.Hooks.death.useDeathSearch({
        tenantId,
        filters: { registrationNo: applicationId },
        auth: true,
        config: {
            enabled: !!applicationId, // Only fetch if applicationId exists
        },
    });

    // Use the mutation hook for creating death application
    const mutation = Digit.Hooks.death.useCreateApplicationActions(tenantId);

    const [currentStep, setCurrentStep] = useState(2); // 1: Form, 2: Preview
    const [showSuccess, setShowSuccess] = useState(false);
    const [applicationNumber, setApplicationNumber] = useState("");
    const [applicationIdState, setApplicationIdState] = useState("");
    const [resetKey, setResetKey] = useState(0);
    const [fileResetKey, setFileResetKey] = useState(0);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const [showActionDropdown, setShowActionDropdown] = useState(false);
    const [selectedAction, setSelectedAction] = useState(null);
    const dropdownRef = useRef(null);

    const handleActionSelect = (actionType) => {
        setSelectedAction(actionType);
        setShowActionDropdown(false);

        if (actionType === "FORWARD") {
            handleSubmit();
        } else if (actionType === "SEND_BACK") {
            alert(t("Application sent back successfully!"));
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowActionDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const onClose = () => {
        // Handle modal close
    };

    // Simplified form state
    const [applicationDetails, setApplicationDetails] = useState({
        dateOfDeath: "",
        nameOfDeceased: "",
        gender: null,
        relationName: "",
        placeOfDeath: null,
        placeOfCremation: "",
        homeAddress: "",
        colony: null,
        pincode: "",
        zone: null,
        ward: null,
        aadhaarNumber: "",
        reporterRelationship: null,
        reporterName: "",
        dateOfApplication: new Date().toISOString().split('T')[0],
    });

    const [documents, setDocuments] = useState({
        deceasedAadhaarFront: null,
        deceasedAadhaarBack: null,
        reporterAadhaarFront: null,
        reporterAadhaarBack: null,
        funeralReceipt: null,
    });

    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (fetchedData?.deathCerts?.length > 0 && !isDataLoaded) {
            const cert = fetchedData.deathCerts[0];

            // Convert epoch timestamp to date string (YYYY-MM-DD format)
            const dateOfDeath = cert.dateofdeathepoch
                ? new Date(cert.dateofdeathepoch * 1000).toISOString().split('T')[0]
                : "";

            const dateOfApplication = cert.dateofreportepoch
                ? new Date(cert.dateofreportepoch * 1000).toISOString().split('T')[0]
                : "";

            // Map gender code to proper format
            const genderMap = {
                1: "MALE",
                2: "FEMALE",
                3: "TRANSGENDER"
            };
            const genderCode = cert.genderStr || genderMap[cert.gender];

            setApplicationDetails({
                dateOfDeath: dateOfDeath,
                nameOfDeceased: cert.firstname || "",
                gender: genderCode ? { code: genderCode, name: genderCode } : null,
                aadhaarNumber: cert.aadharno || "",
                homeAddress: cert.deathPermaddr?.houseno || "",
                colony: cert.deathPermaddr?.locality ?
                    { code: cert.deathPermaddr.locality, name: cert.deathPermaddr.locality } : null,
                ward: cert.deathPermaddr?.ward ?
                    { code: cert.deathPermaddr.ward, name: cert.deathPermaddr.ward } : null,
                zone: cert.deathPermaddr?.zone ?
                    { code: cert.deathPermaddr.zone, name: cert.deathPermaddr.zone } : null,
                pincode: cert.deathPermaddr?.pinno || "",
                placeOfDeath: cert.placeofdeath || "",
                placeOfCremation: cert.placeOfCremation || "",
                reporterRelationship: cert.informantsRelation ?
                    { code: cert.informantsRelation, name: cert.informantsRelation } : null,
                relationName: cert.informantsName || "",
                reporterName: cert.informantsName || "",
                dateOfApplication: dateOfApplication || new Date().toISOString().split('T')[0],
            });

            setIsDataLoaded(true);
        }
    }, [fetchedData, isDataLoaded]);

    const handleInputChange = (field, value) => {
        setApplicationDetails((prev) => ({
            ...prev,
            [field]: value,
        }));
        if (formErrors[field]) {
            setFormErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleDropdownChange = (field, value) => {
        setApplicationDetails((prev) => ({
            ...prev,
            [field]: value,
        }));
        if (formErrors[field]) {
            setFormErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
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

        setFormErrors((prev) => ({ ...prev, [key]: errors[key] || null }));

        if (errors[key]) {
            setDocuments((prev) => ({ ...prev, [key]: null }));
            setFileResetKey((prev) => prev + 1);
            return;
        }

        try {
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
                setFormErrors((prev) => ({ ...prev, [key]: null }));
            } else {
                setFormErrors((prev) => ({ ...prev, [key]: "File upload failed." }));
                setFileResetKey((prev) => prev + 1);
            }
        } catch (err) {
            setFormErrors((prev) => ({ ...prev, [key]: "File upload failed." }));
            setFileResetKey((prev) => prev + 1);
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!applicationDetails.dateOfDeath) {
            errors.dateOfDeath = t("This field is required");
        }
        if (!applicationDetails.nameOfDeceased?.trim()) {
            errors.nameOfDeceased = t("This field is required");
        }
        if (!applicationDetails.gender) {
            errors.gender = t("This field is required");
        }
        if (!applicationDetails.placeOfDeath?.trim()) {
            errors.placeOfDeath = t("This field is required");
        }
        if (!applicationDetails.placeOfCremation?.trim()) {
            errors.placeOfCremation = t("This field is required");
        }
        if (!applicationDetails.homeAddress?.trim()) {
            errors.homeAddress = t("This field is required");
        }
        if (!applicationDetails.colony) {
            errors.colony = t("This field is required");
        }
        if (applicationDetails.pincode && applicationDetails.pincode.length !== 6) {
            errors.pincode = t("Pincode must be 6 digits");
        }
        if (!applicationDetails.zone) {
            errors.zone = t("This field is required");
        }
        if (!applicationDetails.ward) {
            errors.ward = t("This field is required");
        }
        if (!applicationDetails.reporterRelationship) {
            errors.reporterRelationship = t("This field is required");
        }

        const relationshipCode = applicationDetails.reporterRelationship?.code || applicationDetails.reporterRelationship;
        const isDirectRelation = ["FATHER", "MOTHER", "HUSBAND", "WIFE", "SON", "DAUGHTER", "BROTHER", "SISTER"].includes(relationshipCode);

        if (isDirectRelation && !applicationDetails.relationName?.trim()) {
            errors.relationName = t("This field is required");
        }

        if (!isDirectRelation && !applicationDetails.reporterName?.trim()) {
            errors.reporterName = t("This field is required");
        }

        if (applicationDetails.aadhaarNumber && applicationDetails.aadhaarNumber.length !== 12) {
            errors.aadhaarNumber = t("Aadhaar number must be 12 digits");
        }

        if (!documents.reporterAadhaarFront) {
            errors.reporterAadhaarFront = t("This file is required");
        }
        if (!documents.reporterAadhaarBack) {
            errors.reporterAadhaarBack = t("This file is required");
        }
        if (!documents.funeralReceipt) {
            errors.funeralReceipt = t("This file is required");
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handlePreview = () => {
        if (validateForm()) {
            setCurrentStep(2);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleBackToForm = () => {
        setCurrentStep(1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                DeathCertificate: {
                    tenantId: tenantId,
                    dateOfDeath: applicationDetails.dateOfDeath,
                    nameOfDeceased: applicationDetails.nameOfDeceased,
                    gender: applicationDetails.gender?.code || applicationDetails.gender,
                    relationName: applicationDetails.relationName,
                    placeOfDeath: applicationDetails.placeOfDeath?.code || applicationDetails.placeOfDeath,
                    placeOfCremation: applicationDetails.placeOfCremation,
                    homeAddress: applicationDetails.homeAddress || "",
                    colony: applicationDetails.colony?.code || applicationDetails.colony,
                    pincode: applicationDetails.pincode || "",
                    zone: applicationDetails.zone?.code || applicationDetails.zone,
                    ward: applicationDetails.ward?.code || applicationDetails.ward,
                    aadhaarNumber: applicationDetails.aadhaarNumber || "",
                    reporterRelationship:
                        applicationDetails.reporterRelationship?.code ||
                        applicationDetails.reporterRelationship,
                    reporterName: applicationDetails.reporterName,
                    documents: [
                        ...(documents.deceasedAadhaarFront
                            ? [
                                {
                                    documentType: "DECEASED_AADHAAR_FRONT",
                                    fileStoreId: documents.deceasedAadhaarFront.fileStoreId,
                                },
                            ]
                            : []),
                        ...(documents.deceasedAadhaarBack
                            ? [
                                {
                                    documentType: "DECEASED_AADHAAR_BACK",
                                    fileStoreId: documents.deceasedAadhaarBack.fileStoreId,
                                },
                            ]
                            : []),
                        {
                            documentType: "REPORTER_AADHAAR_FRONT",
                            fileStoreId: documents.reporterAadhaarFront.fileStoreId,
                        },
                        {
                            documentType: "REPORTER_AADHAAR_BACK",
                            fileStoreId: documents.reporterAadhaarBack.fileStoreId,
                        },
                        {
                            documentType: "FUNERAL_RECEIPT",
                            fileStoreId: documents.funeralReceipt.fileStoreId,
                        },
                    ],
                },
            };

            mutation.mutate(payload, {
                onSuccess: (response) => {
                    console.log("Success response:", response);
                    if (response?.deathCerts?.[0]) {
                        setApplicationNumber(response.deathCerts[0].registrationno || response.deathCerts[0].applicationNumber);
                        setApplicationIdState(response.deathCerts[0].id || response.deathCerts[0].applicationId || "");
                        setShowSuccess(true);
                    } else if (response?.DeathCertificate?.[0]) {
                        setApplicationNumber(response.DeathCertificate[0].registrationno || response.DeathCertificate[0].applicationNumber);
                        setApplicationIdState(response.DeathCertificate[0].id || response.DeathCertificate[0].applicationId || "");
                        setShowSuccess(true);
                    } else {
                        console.error("Unexpected response format:", response);
                        alert(t("Application submitted but response format is unexpected."));
                    }
                },
                onError: (error) => {
                    console.error("Submission error:", error);
                    alert(t("Failed to submit application. Please try again."));
                },
            });
        } catch (error) {
            console.error("Submission error:", error);
            alert(t("Failed to submit application. Please try again."));
        }
    };

    const handleSuccessClose = () => {
        setShowSuccess(false);
        setApplicationDetails({
            dateOfDeath: "",
            nameOfDeceased: "",
            gender: null,
            relationName: "",
            placeOfDeath: null,
            placeOfCremation: "",
            homeAddress: "",
            colony: null,
            pincode: "",
            zone: null,
            ward: null,
            aadhaarNumber: "",
            reporterRelationship: null,
            reporterName: "",
            dateOfApplication: new Date().toISOString().split('T')[0],
        });
        setDocuments({
            deceasedAadhaarFront: null,
            deceasedAadhaarBack: null,
            reporterAadhaarFront: null,
            reporterAadhaarBack: null,
            funeralReceipt: null,
        });
        setFormErrors({});
        setCurrentStep(1);
        setResetKey((prev) => prev + 1);
        setFileResetKey((prev) => prev + 1);
        setIsDataLoaded(false);

        if (onClose) {
            onClose();
        } else {
            window.location.href = "/digit-ui/employee/death/view-applications";
        }
    };

    // Show loader while fetching data
    if (isFetchingData) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <Loader />
            </div>
        );
    }

    // Show error if fetch fails
    if (isFetchError) {
        return (
            <div style={styles.container}>
                <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
                    {t("Error loading application details")}: {fetchError?.message}
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>{t("Application Details")}</h2>
                    <ApplicationDetailsSection
                        t={t}
                        applicationDetails={applicationDetails}
                        handleInputChange={handleInputChange}
                        handleDropdownChange={handleDropdownChange}
                        formErrors={formErrors}
                        viewMode={currentStep === 2}
                    />
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>{t("Attachment")}</h2>
                    <AttachmentsSection
                        t={t}
                        handleFileChange={handleFileChange}
                        formErrors={formErrors}
                        resetKey={fileResetKey}
                        documents={documents}
                        viewMode={currentStep === 2}
                        relationshipType={applicationDetails.reporterRelationship}
                    />
                    <div>
                        <div style={styles.buttonGroupContainer}>
                            <div ref={dropdownRef} style={{ position: "relative" }}>
                                <button
                                    onClick={() => setShowActionDropdown((prev) => !prev)}
                                    style={{
                                        ...styles.primaryButton,
                                        ...(mutation.isLoading ? styles.disabledButton : {}),
                                    }}
                                    disabled={mutation.isLoading}
                                >
                                    {mutation.isLoading ? (
                                        <>
                                            <Loader /> {t("Submitting...")}
                                        </>
                                    ) : (
                                        t("WF_TAKE_ACTION")
                                    )}
                                </button>

                                {showActionDropdown && (
                                    <div style={styles.dropdownMenu}>
                                        <button
                                            style={{ ...styles.dropdownItem, backgroundColor: "#6B133F" }}
                                            onClick={() => handleActionSelect("FORWARD")}
                                            onMouseEnter={(e) => (e.target.style.backgroundColor = "#541030")}
                                            onMouseLeave={(e) => (e.target.style.backgroundColor = "#6B133F")}
                                        >
                                            {t("Forward")}
                                        </button>
                                        <button
                                            style={{ ...styles.dropdownItem, backgroundColor: "#6B133F" }}
                                            onClick={() => handleActionSelect("SEND_BACK")}
                                            onMouseEnter={(e) => (e.target.style.backgroundColor = "#541030")}
                                            onMouseLeave={(e) => (e.target.style.backgroundColor = "#6B133F")}
                                        >
                                            {t("Send Back")}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showSuccess && (
                <SuccessModal
                    t={t}
                    applicationNumber={applicationNumber}
                    applicationId={applicationIdState}
                    onClose={handleSuccessClose}
                />
            )}
        </div>
    );
};

const styles = {
    container: {
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Roboto, sans-serif",
        minHeight: "100vh",
    },
    content: {
        marginBottom: "20px",
    },
    section: {
        backgroundColor: "#fff",
        padding: "24px",
        borderRadius: "4px",
        marginBottom: "20px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
    },
    sectionTitle: {
        fontSize: "18px",
        fontWeight: "700",
        color: "#6B133F",
        marginBottom: "20px",
        fontFamily: "Roboto, sans-serif",
        margin: "0 0 20px 0",
    },
    buttonGroupContainer: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "20px",
    },
    primaryButton: {
        backgroundColor: "#6B133F",
        color: "#fff",
        border: "none",
        padding: "12px 32px",
        borderRadius: "4px",
        fontSize: "16px",
        fontWeight: "500",
        cursor: "pointer",
        fontFamily: "Roboto, sans-serif",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        justifyContent: "center",
    },
    disabledButton: {
        opacity: 0.6,
        cursor: "not-allowed",
    },
    dropdownMenu: {
        position: "absolute",
        bottom: "110%",
        left: "50%",
        right: "0",
        transform: "translateX(-50%)",
        backgroundColor: "transparent",
        border: "none",
        borderRadius: "4px",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        alignItems: "center",
        padding: "8px 0",
    },
    dropdownItem: {
        width: "180px",
        padding: "10px 16px",
        borderRadius: "4px",
        border: "none",
        color: "#fff",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        textAlign: "center",
        transition: "all 0.2s ease",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        fontFamily: "Roboto, sans-serif",
    },
};

export default UpdateDeathCertificateApplication;