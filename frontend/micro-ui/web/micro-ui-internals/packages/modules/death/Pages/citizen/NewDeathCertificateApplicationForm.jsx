import React, { useState, useEffect } from "react";
import ApplicationDetailsSection from "../../components/Applicationdetailssection";
import AttachmentsSection from "../../components/Attachmentssection";
import SuccessModal from "../../components/Successmodal";
import { Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Fragment } from "react";

const DeathCertificateApplication = () => {
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

    const [currentStep, setCurrentStep] = useState(1); // 1: Form, 2: Preview
    const [showSuccess, setShowSuccess] = useState(false);
    const [applicationNumber, setApplicationNumber] = useState("");
    const [applicationIdState, setApplicationIdState] = useState("");
    const [resetKey, setResetKey] = useState(0);
    const [fileResetKey, setFileResetKey] = useState(0);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const onClose = () => {
        window.location.href = "/digit-ui/citizen/death";
    };

    // Updated form state with new field
    const [applicationDetails, setApplicationDetails] = useState({
        dateOfDeath: "",
        nameOfDeceased: "",
        gender: null,
        aadhaarNumber: "",
        homeAddress: "",
        colony: null,
        ward: null,
        zone: null,
        pincode: "",
        placeOfDeath: "",
        placeOfCremation: "",
        reporterRelationship: null,
        relationName: "",
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

    // Prefill data when fetchedData is available
    useEffect(() => {
        if (fetchedData?.deathCerts?.length > 0 && !isDataLoaded) {
            setCurrentStep(2);
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
                "DEATH",
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
        if (!applicationDetails.homeAddress?.trim()) {
            errors.homeAddress = t("This field is required");
        }
        if (!applicationDetails.colony) {
            errors.colony = t("This field is required");
        }
        if (!applicationDetails.ward) {
            errors.ward = t("This field is required");
        }
        if (!applicationDetails.zone) {
            errors.zone = t("This field is required");
        }
        if (applicationDetails.pincode && applicationDetails.pincode.length !== 6) {
            errors.pincode = t("Pincode must be 6 digits");
        }
        if (!applicationDetails.placeOfDeath?.trim()) {
            errors.placeOfDeath = t("This field is required");
        }
        if (!applicationDetails.placeOfCremation?.trim()) {
            errors.placeOfCremation = t("This field is required");
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
            const now = new Date();
            const dateOfReportEpoch = Math.floor(now.getTime() / 1000);
            const dateOfDeathEpoch = Math.floor(new Date(applicationDetails.dateOfDeath).getTime() / 1000);

            const tempRegNo = String(Date.now()).slice(-10) + Math.floor(Math.random() * 90 + 10);

            const documentsArray = [];

            // Map document keys to document types
            const documentTypeMap = {
                deceasedAadhaarFront: "DECEASED_AADHAAR_FRONT",
                deceasedAadhaarBack: "DECEASED_AADHAAR_BACK",
                reporterAadhaarFront: "REPORTER_AADHAAR_FRONT",
                reporterAadhaarBack: "REPORTER_AADHAAR_BACK",
                funeralReceipt: "FUNERAL_RECEIPT"
            };

            // Add documents to array if they exist
            Object.entries(documents).forEach(([key, doc]) => {
                if (doc && doc.fileStoreId) {
                    documentsArray.push({
                        documentType: documentTypeMap[key],
                        fileStoreId: doc.fileStoreId
                    });
                }
            });

            const payload = {
                deathCerts: [
                    {
                        deathSpouseInfo: {
                            firstname: applicationDetails.spouseFirstName || "name",
                            lastname: applicationDetails.spouseLastName || "lastname"
                        },
                        deathFatherInfo: {
                            firstname: applicationDetails.fatherFirstName || "meranaam",
                            lastname: applicationDetails.fatherLastName || "lastname"
                        },
                        deathMotherInfo: {
                            firstname: applicationDetails.motherFirstName || "name",
                            lastname: applicationDetails.motherLastName || "lastname"
                        },
                        deathPresentaddr: {
                            buildingno: applicationDetails.presentBuildingNo || "1010",
                            houseno: applicationDetails.presentHouseNo || "101010",
                            streetname: applicationDetails.presentStreet || "street name",
                            locality: applicationDetails.presentLocality || "snla",
                            tehsil: applicationDetails.presentTehsil || "dsf",
                            district: applicationDetails.presentDistrict || "hhn",
                            city: applicationDetails.presentCity || "kjdskkjbks",
                            state: applicationDetails.presentState || "jhsbd",
                            pinno: applicationDetails.presentPincode || "334001",
                            country: applicationDetails.presentCountry || "India"
                        },
                        deathPermaddr: {
                            buildingno: applicationDetails.permBuildingNo || "1010",
                            houseno: applicationDetails.homeAddress || "101010",
                            streetname: applicationDetails.permStreet || "street name",
                            locality: applicationDetails.colony?.code || applicationDetails.colony || "snla",
                            tehsil: applicationDetails.permTehsil || "dsf",
                            district: applicationDetails.permDistrict || "hhn",
                            city: applicationDetails.permCity || "kjdskkjbks",
                            state: applicationDetails.permState || "jhsbd",
                            pinno: applicationDetails.pincode || "334001",
                            country: applicationDetails.permCountry || "India",
                            ward: applicationDetails.ward?.code || applicationDetails.ward || "ward-23",
                            zone: applicationDetails.zone?.code || applicationDetails.zone || "Zone-12"
                        },
                        placeOfCremation: applicationDetails.placeOfCremation || "indore",
                        informantsName: applicationDetails.relationName || "Ravi",
                        informantsRelation:
                            applicationDetails.reporterRelationship?.code ||
                            applicationDetails.reporterRelationship ||
                            "SON",
                        registrationno: applicationDetails.registrationNo || tempRegNo,
                        dateofreportepoch:
                            Math.floor(new Date().getTime() / 1000) || 1761330599,
                        dateofdeathepoch:
                            Math.floor(new Date(applicationDetails.dateOfDeath).getTime() / 1000) || 1761244199,
                        genderStr: applicationDetails.gender?.code || applicationDetails.gender || "Transgender",
                        age: applicationDetails.age || "70",
                        firstname: applicationDetails.nameOfDeceased || "name",
                        middlename: applicationDetails.middleName || "",
                        lastname: applicationDetails.lastName || "lastname",
                        nationality: applicationDetails.nationality || "Indian",
                        placeofdeath: applicationDetails.placeOfDeath || "Indore",
                        aadharno: applicationDetails.aadhaarNumber || "123456789010",
                        eidno: applicationDetails.eidNo || "",
                        tenantid: tenantId || "mp.indore",
                        excelrowindex: -1,
                        counter: 0,
                        documents: documentsArray
                    }
                ]
            };

            mutation.mutate(payload, {
                onSuccess: (response) => {
                    console.log("Success response:", response);
                    if (response?.ResponseInfo) {
                        setApplicationNumber(tempRegNo);
                        setApplicationIdState("");
                        setShowSuccess(true);
                    } else if (response?.ResponseInfo) {
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
            aadhaarNumber: "",
            homeAddress: "",
            colony: null,
            ward: null,
            zone: null,
            pincode: "",
            placeOfDeath: "",
            placeOfCremation: "",
            reporterRelationship: null,
            relationName: "",
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
            window.location.href = "/digit-ui/citizen";
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
                </div>
            </div>

            <div style={styles.footer}>
                {currentStep === 1 ? (
                    <button onClick={handlePreview} style={styles.previewButton}>
                        {t("Preview")}
                    </button>
                ) : (
                    <div style={styles.buttonGroup}>
                        <button
                            onClick={handleBackToForm}
                            style={styles.secondaryButton}
                            disabled={mutation.isLoading}
                        >
                            {t("Back")}
                        </button>
                        <button
                            onClick={handleSubmit}
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
                                t("Submit")
                            )}
                        </button>
                    </div>
                )}
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
    footer: {
        backgroundColor: "#fff",
        padding: "20px 24px",
        borderRadius: "4px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
        display: "flex",
        justifyContent: "center",
    },
    buttonGroup: {
        display: "flex",
        justifyContent: "center",
        gap: "16px",
        width: "100%",
        maxWidth: "500px",
    },
    previewButton: {
        backgroundColor: "#6B133F",
        color: "#fff",
        border: "none",
        padding: "12px 48px",
        borderRadius: "4px",
        fontSize: "16px",
        fontWeight: "500",
        cursor: "pointer",
        fontFamily: "Roboto, sans-serif",
        minWidth: "200px",
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
        flex: 1,
        justifyContent: "center",
    },
    secondaryButton: {
        backgroundColor: "#fff",
        color: "#6B133F",
        border: "2px solid #6B133F",
        padding: "12px 32px",
        borderRadius: "4px",
        fontSize: "16px",
        fontWeight: "500",
        cursor: "pointer",
        fontFamily: "Roboto, sans-serif",
        flex: 1,
    },
    disabledButton: {
        opacity: 0.6,
        cursor: "not-allowed",
    },
};

export default DeathCertificateApplication;