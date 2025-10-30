import React, { useState, useEffect } from "react";
import { Dropdown, TextInput } from "@egovernments/digit-ui-react-components";

const AddressSection = ({
  t,
  addressDetails,
  handleInputChange,
  handleDropdownChange,
  propertyCategoryInput,
  propertyCategoryInputChange,
  styles,
  formErrors,
  updateRateZone,
  propertyId,
  setFormErrors
}) => {
  const [boundaryData, setBoundaryData] = useState(null);
  const [zones, setZones] = useState([]);
  const [wards, setWards] = useState([]);
  const [colonies, setColonies] = useState([]);
  const [rateZones, setRateZones] = useState([]);

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
  // Fetch boundary data and extract zones
  const stateId = Digit.ULBService.getStateId();
const { data: PropertyCategory } = Digit.Hooks.pt.usePropertyCategoryMDMS(stateId, "common-masters", "PropertyCategory");
const dropdownOptions=(PropertyCategory || []).map((item)=>({
    code:item.code,
    name:t(item.name),
  }))
  // Update Wards when Zone changes
  useEffect(() => {
    if (addressDetails.zone && boundaryData?.children?.length > 0) {
      const selectedZone = boundaryData.children.find((z) => z.code === addressDetails.zone.code);
      const wardList = selectedZone?.children || [];
      const formattedWards = wardList.map((ward) => ({
        code: ward.code,
        name: ward.name || ward.code,
      }));
      setWards(formattedWards);
    } else {
      setWards([]);
    }
  }, [addressDetails.zone, boundaryData]);

  

  useEffect(() => {
    if (
      addressDetails.zone &&
      addressDetails.ward &&
      boundaryData?.children?.length > 0
    ) {
      const selectedZone = boundaryData.children.find(
        (z) => z.code === addressDetails.zone.code
      );
      const selectedWard = selectedZone?.children?.find(
        (w) => w.code === addressDetails.ward.code
      );
      const colonyList = selectedWard?.children || [];

      // format colonies
      const formattedColonies = colonyList.map((col) => ({
        code: col.code,
        name: col.name || col.code,
      }));

      // remove duplicates by `name`
      const uniqueColonies = formattedColonies.filter(
        (col, index, self) =>
          index === self.findIndex((c) => c.name === col.name)
      );

      setColonies(uniqueColonies);
    } else {
      setColonies([]);
    }
  }, [addressDetails.ward, addressDetails.zone, boundaryData]);


  // Update RateZones when Colony changes
  useEffect(() => {
    if (addressDetails.zone && addressDetails.ward && addressDetails.locality && boundaryData?.children?.length > 0) {
      const selectedZone = boundaryData.children.find((z) => z.code === addressDetails.zone.code);
      const selectedWard = selectedZone?.children?.find((w) => w.code === addressDetails.ward.code);
      const selectedColony = selectedWard?.children?.find((c) => c.code === addressDetails.locality.code);
      const rateZoneList = selectedColony?.children || [];
      const formattedRateZones = rateZoneList.map((rz) => ({
        code: rz.code,
        name: rz.name || rz.code,
      }));
      setRateZones(formattedRateZones);
      updateRateZone(formattedRateZones)
    } else {
      setRateZones([]);
    }
  }, [addressDetails.locality, addressDetails.ward, addressDetails.zone, boundaryData]);

  return (
    <div className="form-section" style={styles.formSection}>
      {/* Door/House Number */}
            <div style={styles.flex30}>
              <div style={styles.poppinsLabel}>
                {t("Door/House Number")}<span className="mandatory" style={styles.mandatory}>*</span>
              </div>
              <TextInput
                style={styles.widthInput}
                name="doorNo"
                  disabled={propertyId ==="Yes"?true:false}
                value={addressDetails.doorNo}
                onChange={handleInputChange}
                placeholder={t("Enter")}
              />
              {formErrors?.doorNo && <p style={{ color: "red", fontSize: "12px" }}>{formErrors.doorNo}</p>}
            </div>
      
            {/* Address */}
            <div style={styles.flex30}>
              <div style={styles.poppinsLabel}>
                {t("Address")}<span className="mandatory" style={styles.mandatory}>*</span>
              </div>
              <TextInput
                style={styles.widthInput}
                name="address"
                 disabled={propertyId ==="Yes"?true:false}
                value={addressDetails.address}
                onChange={handleInputChange}
                placeholder={t("Enter")}
              />
              {formErrors?.address && <p style={{ color: "red", fontSize: "12px" }}>{formErrors.address}</p>}
            </div>
      
            {/* Pincode */}
            <div style={styles.flex30}>
              <div style={styles.poppinsLabel}>
                {t("Pincode")}<span className="mandatory" style={styles.mandatory}>*</span>
              </div>
              <TextInput
                style={styles.widthInput}
                name="pincode"
                  disabled={propertyId ==="Yes"?true:false}
                value={addressDetails.pincode}
                onChange={handleInputChange}
                placeholder={t("Enter")}
              />
              {formErrors?.pincode && <p style={{ color: "red", fontSize: "12px" }}>{formErrors.pincode}</p>}
            </div>
      
            {/* Zone Dropdown */}
            <div style={styles.flex30}>
              <div style={styles.poppinsLabel}>
                {t("Zone")}<span className="mandatory" style={styles.mandatory}>*</span>
              </div>
              <Dropdown
                style={styles.widthInput}
                t={t}
                option={zones}
                 disable={propertyId ==="Yes"?true:false}
                selected={addressDetails.zone}
                select={(option) => {
                  handleDropdownChange("zone", option);
      
                  handleDropdownChange("ward", null);
                  handleDropdownChange("locality", null);
                  handleDropdownChange("rateZone", null);
                  setWards([]);
                  setColonies([]);
                  setRateZones([]);
      
      
                  // Clear only zone error
                  if (formErrors?.zone) {
                    setFormErrors((prev) => {
                      const updated = { ...prev, zone: "" };
                      return updated;
                    });
                  }
                }}
                optionKey="name"
                placeholder={t("Select")}
              />
              {formErrors?.zone && <p style={{ color: "red", fontSize: "12px" }}>{formErrors.zone}</p>}
            </div>
      
            {/* Ward Dropdown */}
            <div style={styles.flex30}>
              <div style={styles.poppinsLabel}>
                {t("Ward")}<span className="mandatory" style={styles.mandatory}>*</span>
              </div>
              <Dropdown
                style={styles.widthInput}
                t={t}
                option={wards}
                 disable={propertyId ==="Yes"?true:false}
                selected={addressDetails.ward}
                select={(option) => {
                  handleDropdownChange("ward", option);
                  handleDropdownChange("locality", null);
                  handleDropdownChange("rateZone", null);
              
                  setColonies([]);
                  setRateZones([]);
              
                  if (formErrors?.ward) {
                    setFormErrors((prev) => {
                      const updated = { ...prev, ward: "" };
                      return updated;
                    });
                  }
                }}
                optionKey="name"
                placeholder={t("Select")}
              />
              {formErrors?.ward && <p style={{ color: "red", fontSize: "12px" }}>{formErrors.ward}</p>}
            </div>
      
            {/* Colony Dropdown */}
            <div style={styles.flex30}>
              <div style={styles.poppinsLabel}>
                {t("Colony")}<span className="mandatory" style={styles.mandatory}>*</span>
              </div>
              <Dropdown
                style={styles.widthInput}
                t={t}
                option={colonies}
                disable={propertyId ==="Yes"?true:false}
                selected={addressDetails.locality}
                select={(option) => {
                  handleDropdownChange("locality", option);
                  handleDropdownChange("rateZone", null);
      
                  setRateZones([]);
              
                  if (formErrors?.locality) {
                    setFormErrors((prev) => {
                      const updated = { ...prev, locality: "" };
                      return updated;
                    });
                  }
                }}
                optionKey="name"
                placeholder={t("Select")}
              />
              {formErrors?.locality && <p style={{ color: "red", fontSize: "12px" }}>{formErrors.locality}</p>}
            </div>
      {/* Property Type */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          {t("Property Type")}<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <Dropdown
          style={styles.widthInput}
          t={t}
          option={dropdownOptions}
         // selected={propertyCategoryInput}
          selected={dropdownOptions.find(opt => opt.code === propertyCategoryInput)}
          disable={propertyId ==="Yes"?true:false}
          select={propertyCategoryInputChange}          
          optionKey="name"
          placeholder={t("Select")}
        />
        {formErrors?.locality && <p style={{ color: "red", fontSize: "12px" }}>{formErrors.locality}</p>}
      </div>

      
    </div>
  );
};

export default AddressSection;


