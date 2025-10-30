import React, { useState } from "react";
import styles from "./IndexStyle"
import { Dropdown, TextInput } from "@egovernments/digit-ui-react-components";

const FirmAddressSection = () => {

  return (
    <div className="form-section" style={styles.formSection}>
      {/* Door/House Number */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          House/ Plot/ Building Number<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <TextInput
          style={styles.widthInput}
          name="doorNo"
          placeholder="Enter"
        />
      </div>

      {/* Address */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          Street
        </div>
        <TextInput
          style={{ ...styles.widthInput, backgroundColor: "#f3f6f4" }}
          name="address"
          placeholder="Enter"
        />
      </div>

      {/* Zone */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          Zone<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <TextInput
          style={styles.widthInput}
          name="zone"
          placeholder="Enter"
        />
      </div>

      {/* Ward */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          Ward<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <TextInput
          style={styles.widthInput}
          name="ward"
          placeholder="Enter"
        />
      </div>

      {/* Colony */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          Colony<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <TextInput
          style={styles.widthInput}
          name="colony"
          placeholder="Enter"
        />
      </div>

      {/* City */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          City
        </div>
        <TextInput
          style={styles.widthInput}
          name="city"
          placeholder="Enter"
        />
      </div>

      {/* Pincode */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          Pin Code<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <TextInput
          style={styles.widthInput}
          name="pincode"
          placeholder="Enter"
        />
      </div>

      {/* blank only */}
      <div style={styles.flex30}></div>
      <div style={styles.flex30}></div>

    </div>
  );
};

export default FirmAddressSection;