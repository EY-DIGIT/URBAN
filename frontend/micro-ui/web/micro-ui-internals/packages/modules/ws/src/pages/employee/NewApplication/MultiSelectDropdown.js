import React, { useState } from "react";
import { Dropdown } from "@egovernments/digit-ui-react-components";

// Dummy data for the dropdown options
const options = [
  { code: "OPT1", name: "Option 1" },
  { code: "OPT2", name: "Option 2" },
  { code: "OPT3", name: "Option 3" },
  { code: "OPT4", name: "Option 4" },
];

const MultiSelectDropdown = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  // Function to handle toggling a selection
  const handleSelect = (item) => {
    if (selectedItems.find(selected => selected.code === item.code)) {
      // Item is already selected, so remove it
      setSelectedItems(selectedItems.filter(selected => selected.code !== item.code));
    } else {
      // Item is not selected, add it
      setSelectedItems([...selectedItems, item]);
    }
  };

  // Custom component to render each item in the dropdown
  const CustomOption = (item, isChecked, onClick) => {
    return (
      <div style={{ display: "flex", alignItems: "center", padding: "8px 12px", cursor: "pointer" }} onClick={onClick}>
        <input
          type="checkbox"
          checked={isChecked}
          style={{ marginRight: "10px" }}
          readOnly // Prevent direct click on checkbox, let the parent div handle it
        />
        <span>{item.name}</span>
      </div>
    );
  };

  // Render the Dropdown component
  return (
    <Dropdown
      option={options}
      selectedOption={selectedItems}
      optionKey="name"
      // Custom render function for the dropdown list items
      customDisplayValue={(item) => (
        <div onClick={() => handleSelect(item)} style={{ display: "flex", alignItems: "center" }}>
          {CustomOption(item, selectedItems.some(selected => selected.code === item.code), () => {})}
        </div>
      )}
      // The onChange handler will not be used in the traditional way
      // Instead, the custom logic is handled within the `customDisplayValue`
      onChange={() => {}}
      placeholder={selectedItems.length ? `${selectedItems.length} selected` : "Select options"}
      // Label for the dropdown
      label="Choose Options"
    />
  );
};

export default MultiSelectDropdown;
