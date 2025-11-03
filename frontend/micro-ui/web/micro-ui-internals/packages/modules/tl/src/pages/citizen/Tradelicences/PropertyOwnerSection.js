import React, { useState } from "react";
import styles from "./IndexStyle"
import { Dropdown, TextInput } from "@egovernments/digit-ui-react-components";

const PropertyOwnerSection = () => {
    const [owners, setOwners] = useState([
        { id: 1, ownerName: "", mobileNumber: "", fatherHusbandName: "" }
    ]);

    const addOwner = () => {
        const newOwner = {
            id: owners.length + 1,
            ownerName: "",
            mobileNumber: "",
            fatherHusbandName: ""
        };
        setOwners([...owners, newOwner]);
    };

    const removeOwner = (id) => {
        if (owners.length > 1) {
            setOwners(owners.filter(owner => owner.id !== id));
        }
    };

    const updateOwner = (id, field, value) => {
        setOwners(owners.map(owner => 
            owner.id === id ? { ...owner, [field]: value } : owner
        ));
    };

    return (
        <div>
            {owners.map((owner, index) => (
                <div key={owner.id}>
                    {index > 0 && (
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "10px",
                            marginTop: "20px"
                        }}>
                            <div style={{...styles.assessmentStyle, fontSize: "14px"}}>Owner {index + 1}</div>
                            <button
                                type="button"
                                onClick={() => removeOwner(owner.id)}
                                style={{...styles.assessmentStyle, fontSize: "14px"}}
                            >
                                Remove
                            </button>
                        </div>
                    )}
                    
                    <div className="form-section" style={styles.formSection}>
                        {/* Name with Title */}
                        <div style={styles.flex30}>
                            <div style={styles.poppinsLabel}>Full Name<span className="mandatory" style={styles.mandatory}>*</span></div>
                            <div style={styles.nameInputContainer}>
                                <TextInput
                                    style={styles.widthInput}
                                    name={`ownerName_${owner.id}`}
                                    placeholder="Enter"
                                    value={owner.ownerName}
                                    onChange={(e) => updateOwner(owner.id, 'ownerName', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Mobile */}
                        <div style={styles.flex30}>
                            <div style={styles.poppinsLabel}>Mobile Number <span className="mandatory" style={styles.mandatory}>*</span></div>
                            <TextInput
                                style={styles.widthInput}
                                name={`mobileNumber_${owner.id}`}
                                placeholder="Enter"
                                value={owner.mobileNumber}
                                onChange={(e) => updateOwner(owner.id, 'mobileNumber', e.target.value)}
                            />
                        </div>

                        {/* Father/Husband Name */}
                        <div style={styles.flex30}>
                            <div style={{...styles.poppinsLabel, whiteSpace: "nowrap", width: "auto", minWidth: "220px"}}>
                                Father/ Husband Name (English) <span className="mandatory" style={styles.mandatory}>*</span>
                            </div>
                            <TextInput
                                style={styles.widthInput}
                                name={`fatherHusbandName_${owner.id}`}
                                placeholder="Enter"
                                value={owner.fatherHusbandName}
                                onChange={(e) => updateOwner(owner.id, 'fatherHusbandName', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ))}

            {/* Add Owner Button */}
            <div style={{ textAlign: "right", marginTop: "15px" }}>
                <button
                    type="button"
                    onClick={addOwner}
                    style={{
                        backgroundColor: "#6B133F",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "500"
                    }}
                >
                    + Add Owner
                </button>
            </div>
        </div>
    );
};

export default PropertyOwnerSection;
