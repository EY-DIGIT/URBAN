import React, { useState } from "react";
import styles from "./IndexStyle"
import { Dropdown, TextInput, DatePicker, TextArea } from "@egovernments/digit-ui-react-components";

const NewbornDetailsSection = () => {
  const [dateOfBirth, setDateOfBirth] = useState(null);

  const handleDateChange = (date) => {
    console.log("Date selected:", date);
    setDateOfBirth(date);
  };

  return (
    <div style={styles.card}>
      <div style={styles.assessmentStyle}>Newborn Details</div>

      <div className="form-section" style={styles.formSection}>
      {/* Date of Birth */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          Date of Birth Child<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <DatePicker
          style={styles.widthInput}
          name="dob"
          placeholder="Select Date of Birth"
          date={dateOfBirth}
          onChange={handleDateChange}
          format="dd/MM/yyyy"
        />
      </div>

      {/* Child Gender */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          Child Gender<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <Dropdown
          style={styles.widthInput}
          option={[
            { label: "Male", value: "MALE" },
            { label: "Female", value: "FEMALE" }
          ]}
          optionKey="label"
          name="gender"
          placeholder="Select Gender"
        />
      </div>

      {/* Child Name */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          Child Name
        </div>
        <TextInput
          style={styles.widthInput}
          name="childName"
          placeholder="Enter"
        />
      </div>

      {/* Father’s Name */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          Father’s Name<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <TextInput
          style={styles.widthInput}
          name="fatherName"
          placeholder="Enter"
        />
      </div>

      {/* Mother’s Name */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          Mother’s Name <span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <TextInput
          style={styles.widthInput}
          name="motherName"
          placeholder="Enter"
        />
      </div>

       {/* Place Of Birth Hospital  */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          Place Of Birth Hospital  <span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <TextInput
          style={styles.widthInput}
          name="placeOfBirth"
          placeholder="Enter"
        />
      </div>

      {/* Address */}
      {/* <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          Address<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <TextInput
          style={{ ...styles.widthInput, backgroundColor: "#f3f6f4" }}
          name="address"
          placeholder="Enter"
        />
      </div> */}
      <div style={styles.flex30}>
        <div style={{
          ...styles.poppinsLabel,
          marginBottom: "0px"
        }}>
          Address<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <TextArea
          style={{ 
            backgroundColor: "#f3f6f4",
            ...styles.widthInput,
            height: "auto",
            minHeight: "72px",
            resize: "none",
            margin: "0",
          }}
          name="address"
          placeholder="Enter address"
          rows={3}
        />
      </div>

      {/* Zone */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          Zone<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <Dropdown
          style={styles.widthInput}
          option={[
            { label: "Central", value: "CENTRAL" },
            { label: "Street", value: "STREET" }
          ]}
          optionKey="label"
          name="zone"
          placeholder="Select Zone"
        />
      </div>

      {/* Ward */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          Ward<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <Dropdown
          style={styles.widthInput}
          option={[
            { label: "Ward A", value: "A" },
            { label: "Ward B", value: "B" }
          ]}
          optionKey="label"
          name="ward"
          placeholder="Select Ward"
        />
      </div>

      </div>
    </div>
  );
};

export default NewbornDetailsSection;