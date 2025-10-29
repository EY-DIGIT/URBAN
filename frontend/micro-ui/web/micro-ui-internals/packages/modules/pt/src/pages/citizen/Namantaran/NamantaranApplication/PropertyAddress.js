
import React, { useState, useEffect } from "react";
import { Dropdown, TextInput } from "@egovernments/digit-ui-react-components";

const PropertyAddress = ({
  t,
  addressDetails,
  handleInputChange,
  handleDropdownChange,
  styles,
  formErrors,
  updateRateZone,
  setFormErrors
}) => {
  console.log("addressDetails", addressDetails);
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

  // Update Colonies when Ward changes


  // useEffect(() => {
  //   if (addressDetails.zone && addressDetails.ward && boundaryData?.children?.length > 0) {
  //     const selectedZone = boundaryData.children.find((z) => z.code === addressDetails.zone.code);
  //     const selectedWard = selectedZone?.children?.find((w) => w.code === addressDetails.ward.code);
  //     const colonyList = selectedWard?.children || [];
  //     const formattedColonies = colonyList.map((col) => ({
  //       code: col.code,
  //       name: col.name || col.code,
  //     }));
  //     setColonies(formattedColonies);
  //   } else {
  //     setColonies([]);
  //   }
  // }, [addressDetails.ward, addressDetails.zone, boundaryData]);

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
    if (addressDetails.zone && addressDetails.ward && addressDetails.colony && boundaryData?.children?.length > 0) {
      const selectedZone = boundaryData.children.find((z) => z.code === addressDetails.zone.code);
      const selectedWard = selectedZone?.children?.find((w) => w.code === addressDetails.ward.code);
      const selectedColony = selectedWard?.children?.find((c) => c.code === addressDetails.colony.code);
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
  }, [addressDetails.colony, addressDetails.ward, addressDetails.zone, boundaryData]);

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
          selected={addressDetails.zone}
          select={(option) => {
            handleDropdownChange("zone", option);

            handleDropdownChange("ward", null);
            handleDropdownChange("colony", null);
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
          selected={addressDetails.ward}
          select={(option) => {
            handleDropdownChange("ward", option);
            handleDropdownChange("colony", null);
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
          selected={addressDetails.colony}
          select={(option) => {
            handleDropdownChange("colony", option);
            handleDropdownChange("rateZone", null);

            setRateZones([]);
        
            if (formErrors?.colony) {
              setFormErrors((prev) => {
                const updated = { ...prev, colony: "" };
                return updated;
              });
            }
          }}
          optionKey="name"
          placeholder={t("Select")}
        />
        {formErrors?.colony && <p style={{ color: "red", fontSize: "12px" }}>{formErrors.colony}</p>}
      </div>

      {/* Rate Zone Dropdown */}
      {/* <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          {t("Rate Zone")}<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <Dropdown
          style={styles.widthInput}
          t={t}
          option={rateZones}
          selected={addressDetails.rateZone}
          select={(option) => handleDropdownChange("rateZone", option)}
          optionKey="name"
          placeholder={t("Select")}
        />
        {formErrors?.rateZone && <p style={{ color: "red", fontSize: "12px" }}>{formErrors.rateZone}</p>}
      </div> */}
    </div>
  );
};

export default PropertyAddress;


