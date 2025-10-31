import React, { useState, useEffect } from "react";
import { Dropdown, TextInput, DatePicker } from "@egovernments/digit-ui-react-components";

const ApplicationDetailsSection = ({
    t,
    applicationDetails,
    handleInputChange,
    handleDropdownChange,
    formErrors,
    viewMode = false,
}) => {
    const stateId = Digit.ULBService.getStateId();

    // State for boundary data and cascading dropdowns
    const [boundaryData, setBoundaryData] = useState(null);
    const [zones, setZones] = useState([]);
    const [wards, setWards] = useState([]);
    const [colonies, setColonies] = useState([]);

    // Fetch boundary data and extract zones
    useEffect(() => {
        (async () => {
            try {
                const tenantId = Digit.ULBService.getCurrentTenantId();
                const response = await Digit.LocationService.getRevenueLocalities(tenantId);

                console.log("🔍 Raw TenantBoundary Response:", response);

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

    // Update Wards when Zone changes
    useEffect(() => {
        if (applicationDetails.zone && boundaryData?.children?.length > 0) {
            const selectedZone = boundaryData.children.find(
                (z) => z.code === applicationDetails.zone.code
            );
            const wardList = selectedZone?.children || [];
            const formattedWards = wardList.map((ward) => ({
                code: ward.code,
                name: ward.name || ward.code,
            }));
            setWards(formattedWards);
        } else {
            setWards([]);
        }
    }, [applicationDetails.zone, boundaryData]);

    // Update Colonies when Ward changes
    useEffect(() => {
        if (
            applicationDetails.zone &&
            applicationDetails.ward &&
            boundaryData?.children?.length > 0
        ) {
            const selectedZone = boundaryData.children.find(
                (z) => z.code === applicationDetails.zone.code
            );
            const selectedWard = selectedZone?.children?.find(
                (w) => w.code === applicationDetails.ward.code
            );
            const colonyList = selectedWard?.children || [];

            // Format colonies
            const formattedColonies = colonyList.map((col) => ({
                code: col.code,
                name: col.name || col.code,
            }));

            // Remove duplicates by name
            const uniqueColonies = formattedColonies.filter(
                (col, index, self) =>
                    index === self.findIndex((c) => c.name === col.name)
            );

            setColonies(uniqueColonies);
        } else {
            setColonies([]);
        }
    }, [applicationDetails.ward, applicationDetails.zone, boundaryData]);

    // Hardcoded gender options
    const genderOptions = [
        { code: "MALE", name: t("Male") },
        { code: "FEMALE", name: t("Female") },
        { code: "TRANSGENDER", name: t("Transgender") },
    ];

    // Hardcoded relationship options
    const relationshipOptions = [
        { code: "MOTHER", name: t("Mother") },
        { code: "FATHER", name: t("Father") },
        { code: "BROTHER", name: t("Brother") },
        { code: "SISTER", name: t("Sister") },
        { code: "SON", name: t("Son") },
        { code: "DAUGHTER", name: t("Daughter") },
        { code: "WIFE", name: t("Wife") },
        { code: "HUSBAND", name: t("Husband") },
        { code: "RELATIVE", name: t("Relative") },
    ];

    const getDisplayValue = (value) => {
        if (!value) return "N/A";
        return value.name || value.code || value;
    };

    // Get the current relationship code
    const relationshipCode =
        applicationDetails.reporterRelationship?.code ||
        applicationDetails.reporterRelationship;

    // Check if it's a direct relation (shows relation name field)
    // RELATIVE shows reporter name instead
    const isDirectRelation = ["FATHER", "MOTHER", "HUSBAND", "WIFE", "SON", "DAUGHTER", "BROTHER", "SISTER"].includes(
        relationshipCode
    );

    // Get the dynamic label for relation name field
    const getRelationNameLabel = () => {
        if (!relationshipCode) {
            return t("{relationship}'s Name");
        }

        const relationMap = {
            FATHER: t("Father's Name"),
            MOTHER: t("Mother's Name"),
            HUSBAND: t("Husband's Name"),
            WIFE: t("Wife's Name"),
            SON: t("Son's Name"),
            DAUGHTER: t("Daughter's Name"),
            BROTHER: t("Brother's Name"),
            SISTER: t("Sister's Name"),
        };

        return relationMap[relationshipCode] || t("{relationship}'s Name");
    };

    // View mode rendering
    if (viewMode) {
        return (
            <div className="form-section" style={styles.formSection}>
                <div style={styles.flex30}>
                    <div style={styles.label}>{t("Date of Death")} *</div>
                    <div style={styles.viewValue}>
                        {applicationDetails.dateOfDeath || "N/A"}
                    </div>
                </div>

                <div style={styles.flex30}>
                    <div style={styles.label}>{t("Name of Deceased")} *</div>
                    <div style={styles.viewValue}>
                        {applicationDetails.nameOfDeceased || "N/A"}
                    </div>
                </div>

                <div style={styles.flex30}>
                    <div style={styles.label}>{t("Gender")} *</div>
                    <div style={styles.viewValue}>
                        {getDisplayValue(applicationDetails.gender)}
                    </div>
                </div>

                <div style={styles.flex30}>
                    <div style={styles.label}>{t("Aadhaar Number of Deceased")}</div>
                    <div style={styles.viewValue}>
                        {applicationDetails.aadhaarNumber || "N/A"}
                    </div>
                </div>

                <div style={styles.flex30}>
                    <div style={styles.label}>{t("Home Address of Deceased")} *</div>
                    <div style={styles.viewValue}>
                        {applicationDetails.homeAddress || "N/A"}
                    </div>
                </div>

                <div style={styles.flex30}>
                    <div style={styles.label}>{t("Colony")} *</div>
                    <div style={styles.viewValue}>
                        {getDisplayValue(applicationDetails.colony)}
                    </div>
                </div>

                <div style={styles.flex30}>
                    <div style={styles.label}>{t("Ward")} *</div>
                    <div style={styles.viewValue}>
                        {getDisplayValue(applicationDetails.ward)}
                    </div>
                </div>

                <div style={styles.flex30}>
                    <div style={styles.label}>{t("Zone")} *</div>
                    <div style={styles.viewValue}>
                        {getDisplayValue(applicationDetails.zone)}
                    </div>
                </div>

                <div style={styles.flex30}>
                    <div style={styles.label}>{t("Pincode")}</div>
                    <div style={styles.viewValue}>{applicationDetails.pincode || "N/A"}</div>
                </div>

                <div style={styles.flex30}>
                    <div style={styles.label}>{t("Place of Death")} *</div>
                    <div style={styles.viewValue}>
                        {applicationDetails.placeOfDeath || "N/A"}
                    </div>
                </div>

                <div style={styles.flex30}>
                    <div style={styles.label}>{t("Place of Cremation")} *</div>
                    <div style={styles.viewValue}>
                        {applicationDetails.placeOfCremation || "N/A"}
                    </div>
                </div>

                <div style={styles.flex30}>
                    <div style={styles.label}>
                        {t("Relative's/ Reporter's Relationship with Deceased")} *
                    </div>
                    <div style={styles.viewValue}>
                        {getDisplayValue(applicationDetails.reporterRelationship)}
                    </div>
                </div>

                <div style={styles.flex30}>
                    <div style={styles.label}>{getRelationNameLabel()} *</div>
                    <div style={styles.viewValue}>
                        {isDirectRelation ? (applicationDetails.relationName || "N/A") : (applicationDetails.reporterName || "N/A")}
                    </div>
                </div>

                <div style={styles.flex30}>
                    <div style={styles.label}>{t("Date of Application")}</div>
                    <div style={styles.viewValue}>
                        {applicationDetails.dateOfApplication || "N/A"}
                    </div>
                </div>
            </div>
        );
    }

    // Edit mode rendering - Following the exact order from the design
    return (
        <div className="form-section" style={styles.formSection}>
            {/* Row 1: Date of Death, Name of Deceased, Gender */}
            <div style={styles.flex30}>
                <div style={styles.label}>
                    {t("Date of Death")} <span style={styles.mandatory}>*</span>
                </div>
                <DatePicker
                    date={applicationDetails.dateOfDeath}
                    onChange={(date) => handleInputChange("dateOfDeath", date)}
                    maxDate={new Date()}
                    disabled={false}
                />
                {formErrors?.dateOfDeath && (
                    <p style={styles.errorText}>{formErrors.dateOfDeath}</p>
                )}
            </div>

            <div style={styles.flex30}>
                <div style={styles.label}>
                    {t("Name of Deceased")} <span style={styles.mandatory}>*</span>
                </div>
                <TextInput
                    value={applicationDetails.nameOfDeceased}
                    onChange={(e) => handleInputChange("nameOfDeceased", e.target.value)}
                    placeholder={t("Enter")}
                    style={styles.textBox}
                />
                {formErrors?.nameOfDeceased && (
                    <p style={styles.errorText}>{formErrors.nameOfDeceased}</p>
                )}
            </div>

            <div style={styles.flex30}>
                <div style={styles.label}>
                    {t("Gender")} <span style={styles.mandatory}>*</span>
                </div>
                <Dropdown
                    t={t}
                    option={genderOptions}
                    selected={genderOptions.find(
                        (opt) =>
                            opt.code === applicationDetails.gender?.code ||
                            opt.code === applicationDetails.gender
                    )}
                    select={(val) => handleDropdownChange("gender", val)}
                    optionKey="name"
                    placeholder={t("Select")}
                    style={styles.textBox}
                />
                {formErrors?.gender && <p style={styles.errorText}>{formErrors.gender}</p>}
            </div>

            {/* Row 2: Aadhaar Number, Home Address of Deceased */}
            <div style={styles.flex30}>
                <div style={styles.label}>{t("Aadhaar Number of Deceased")}</div>
                <TextInput
                    value={applicationDetails.aadhaarNumber}
                    onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 12);
                        handleInputChange("aadhaarNumber", value);
                    }}
                    placeholder={t("Enter")}
                    maxLength={12}
                    style={styles.textBox}
                />
                {formErrors?.aadhaarNumber && (
                    <p style={styles.errorText}>{formErrors.aadhaarNumber}</p>
                )}
            </div>

            <div style={styles.flex30}>
                <div style={styles.label}>
                    {t("Home Address of Deceased")} <span style={styles.mandatory}>*</span>
                </div>
                <TextInput
                    value={applicationDetails.homeAddress}
                    onChange={(e) => handleInputChange("homeAddress", e.target.value)}
                    placeholder={t("Enter")}
                    style={styles.textBox}
                />
                {formErrors?.homeAddress && (
                    <p style={styles.errorText}>{formErrors.homeAddress}</p>
                )}
            </div>

            {/* Row 3: Colony, Ward, Zone */}
            <div style={styles.flex30}>
                <div style={styles.label}>
                    {t("Colony")} <span style={styles.mandatory}>*</span>
                </div>
                <Dropdown
                    t={t}
                    option={colonies}
                    selected={colonies.find(
                        (opt) =>
                            opt.code === applicationDetails.colony?.code ||
                            opt.code === applicationDetails.colony
                    )}
                    select={(val) => handleDropdownChange("colony", val)}
                    optionKey="name"
                    placeholder={t("Select")}
                    style={styles.textBox}
                />
                {formErrors?.colony && <p style={styles.errorText}>{formErrors.colony}</p>}
            </div>

            <div style={styles.flex30}>
                <div style={styles.label}>
                    {t("Ward")} <span style={styles.mandatory}>*</span>
                </div>
                <Dropdown
                    t={t}
                    option={wards}
                    selected={wards.find(
                        (opt) =>
                            opt.code === applicationDetails.ward?.code ||
                            opt.code === applicationDetails.ward
                    )}
                    select={(val) => {
                        handleDropdownChange("ward", val);
                        // Clear dependent field
                        handleDropdownChange("colony", null);
                        // Clear dependent dropdown
                        setColonies([]);
                    }}
                    optionKey="name"
                    placeholder={t("Select")}
                    style={styles.textBox}
                />
                {formErrors?.ward && <p style={styles.errorText}>{formErrors.ward}</p>}
            </div>

            <div style={styles.flex30}>
                <div style={styles.label}>
                    {t("Zone")} <span style={styles.mandatory}>*</span>
                </div>
                <Dropdown
                    t={t}
                    option={zones}
                    selected={zones.find(
                        (opt) =>
                            opt.code === applicationDetails.zone?.code ||
                            opt.code === applicationDetails.zone
                    )}
                    select={(val) => {
                        handleDropdownChange("zone", val);
                        // Clear dependent fields
                        handleDropdownChange("ward", null);
                        handleDropdownChange("colony", null);
                        // Clear dependent dropdowns
                        setWards([]);
                        setColonies([]);
                    }}
                    optionKey="name"
                    placeholder={t("Select")}
                    style={styles.textBox}
                />
                {formErrors?.zone && <p style={styles.errorText}>{formErrors.zone}</p>}
            </div>

            {/* Row 4: Pincode, Place of Death, Place of Cremation */}
            <div style={styles.flex30}>
                <div style={styles.label}>{t("Pincode")}</div>
                <TextInput
                    value={applicationDetails.pincode}
                    onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                        handleInputChange("pincode", value);
                    }}
                    placeholder={t("Enter")}
                    maxLength={6}
                    style={styles.textBox}
                />
                {formErrors?.pincode && <p style={styles.errorText}>{formErrors.pincode}</p>}
            </div>

            <div style={styles.flex30}>
                <div style={styles.label}>
                    {t("Place of Death")} <span style={styles.mandatory}>*</span>
                </div>
                <TextInput
                    value={applicationDetails.placeOfDeath}
                    onChange={(e) => handleInputChange("placeOfDeath", e.target.value)}
                    placeholder={t("Enter")}
                    style={styles.textBox}
                />
                {formErrors?.placeOfDeath && (
                    <p style={styles.errorText}>{formErrors.placeOfDeath}</p>
                )}
            </div>

            <div style={styles.flex30}>
                <div style={styles.label}>
                    {t("Place of Cremation")} <span style={styles.mandatory}>*</span>
                </div>
                <TextInput
                    value={applicationDetails.placeOfCremation}
                    onChange={(e) => handleInputChange("placeOfCremation", e.target.value)}
                    placeholder={t("Enter")}
                    style={styles.textBox}
                />
                {formErrors?.placeOfCremation && (
                    <p style={styles.errorText}>{formErrors.placeOfCremation}</p>
                )}
            </div>

            {/* Row 5: Reporter's Relationship, Relation Name, Date of Application */}
            <div style={styles.flex30}>
                <div style={styles.label}>
                    {t("Relative's/ Reporter's Relationship with Deceased")}{" "}
                    <span style={styles.mandatory}>*</span>
                </div>
                <Dropdown
                    t={t}
                    option={relationshipOptions}
                    selected={relationshipOptions.find(
                        (opt) =>
                            opt.code === applicationDetails.reporterRelationship?.code ||
                            opt.code === applicationDetails.reporterRelationship
                    )}
                    select={(val) => handleDropdownChange("reporterRelationship", val)}
                    optionKey="name"
                    placeholder={t("Select")}
                    style={styles.textBox}
                />
                {formErrors?.reporterRelationship && (
                    <p style={styles.errorText}>{formErrors.reporterRelationship}</p>
                )}
            </div>

            <div style={styles.flex30}>
                <div style={styles.label}>
                    {getRelationNameLabel()} <span style={styles.mandatory}>*</span>
                </div>
                <TextInput
                    value={isDirectRelation ? applicationDetails.relationName : applicationDetails.reporterName}
                    onChange={(e) => {
                        const field = isDirectRelation ? "relationName" : "reporterName";
                        handleInputChange(field, e.target.value);
                    }}
                    placeholder={t("Enter")}
                    style={styles.textBox}
                />
                {(formErrors?.relationName || formErrors?.reporterName) && (
                    <p style={styles.errorText}>
                        {formErrors.relationName || formErrors.reporterName}
                    </p>
                )}
            </div>

            <div style={styles.flex30}>
                <div style={styles.label}>{t("Date of Application")}</div>
                <TextInput
                    value={applicationDetails.dateOfApplication}
                    disabled={true}
                    placeholder={t("Prefilled")}
                    style={{ ...styles.textBox, backgroundColor: "#f5f5f5", cursor: "not-allowed" }}
                />
            </div>
        </div>
    );
};

const styles = {
    formSection: {
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        marginBottom: "20px",
    },
    flex30: {
        flex: "0 0 calc(33.333% - 13.34px)",
        minWidth: "250px",
        display: "flex",
        flexDirection: "column",
    },
    flex60: {
        flex: "0 0 calc(66.666% - 10px)", 
        display: "flex",
        flexDirection: "column",
    },
    label: {
        fontSize: "14px",
        fontWeight: "500",
        color: "#0B0C0C",
        fontFamily: "Roboto, sans-serif",
        marginBottom: "8px",
    },
    mandatory: {
        color: "#D4351C",
        marginLeft: "4px",
    },
    textBox: {
        height: "35px",
        borderWidth: "1px",
        borderRadius: "6px",
        background: "#E5E4E2",
        border: "0.5px solid #D2D2D280",
        color: "black",
    },
    datePicker: {
        height: "35px",
        borderWidth: "1px",
        borderRadius: "6px",
        background: "#E5E4E2",
        border: "0.5px solid #D2D2D280",
        color: "black",
    },
    errorText: {
        color: "#D4351C",
        fontSize: "12px",
        marginTop: "4px",
        fontFamily: "Roboto, sans-serif",
    },
    viewValue: {
        fontSize: "16px",
        fontWeight: "400",
        color: "#0B0C0C",
        padding: "10px",
        backgroundColor: "#F3F2F1",
        borderRadius: "4px",
        fontFamily: "Roboto, sans-serif",
        minHeight: "40px",
        display: "flex",
        alignItems: "center",
    },
};

export default ApplicationDetailsSection;