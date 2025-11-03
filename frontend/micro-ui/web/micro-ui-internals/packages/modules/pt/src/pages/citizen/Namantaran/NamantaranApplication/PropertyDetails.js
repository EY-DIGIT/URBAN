
import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";

const PropertyDetailsTableSection = ({ t, unit, handleUnitChange, addUnit, removeUnit, styles, formErrors ,handleOwner,isNewOwner}) => {
   const history = useHistory();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();

  const { data: Menu = {}, isLoading } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "UsageCategoryMajor") || {};
  const { data: MenuP = {}, isLoadings } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "ConstructionType") || {};
  const { data: FloorAll = {}, isLoadingF } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "Floor") || {};
  const { data: OccupancyData = {}, isLoadingO } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "OccupancyType") || {};

  const [usageTypes, setUsageTypes] = useState([]);
  const [constructionTypes, setConstructionTypes] = useState([]);
  const [floorList, setFloorList] = useState([]);
  const [occupancyTypes, setOccupancyTypes] = useState([]);
  console.log("UNIT====", unit);
  console.log("floorList====", floorList)

  const startYear = 1997;
  const currentFY = new Date().getMonth() >= 3 ? new Date().getFullYear() : new Date().getFullYear() - 1;

  const years = Array.from({ length: currentFY - startYear + 1 }, (_, i) => {
    const from = startYear + i;
    const to = (from + 1).toString().slice(2);
    return {
      label: `${from}-${to}`,
      value: `${from}-${to}`,
    };
  });

  const currentFYString = `${currentFY}-${(currentFY + 1).toString().slice(2)}`;

  const onAddNewOwnerClick = () => {
  
      handleOwner();  
   
  };

  useEffect(() => {
    if (!isLoading && Menu?.PropertyTax?.UsageCategoryMajor) {
      const usagecat = Menu.PropertyTax.UsageCategoryMajor;
      const filtered = usagecat
        ?.filter((e) => e?.code)
        ?.map((item) => ({
          i18nKey: item.name,
          code: item.code,
        }));
      setUsageTypes(filtered);
    }
  }, [isLoading, Menu]);

  useEffect(() => {
    if (!isLoadings && MenuP?.PropertyTax?.ConstructionType) {
      const constructionCat = MenuP.PropertyTax.ConstructionType;
      const filtered = constructionCat
        ?.filter((e) => e?.code)
        ?.map((item) => ({
          i18nKey: item.name,
          code: item.code,
        }));
      setConstructionTypes(filtered);
    }
  }, [isLoadings, MenuP]);

  // useEffect(() => {
  //   if (!isLoadingF && FloorAll?.PropertyTax?.Floor) {
  //     const floorData = FloorAll.PropertyTax.Floor;
  //     const mappedFloors = floorData
  //       ?.filter((f) => f?.code && f?.active)
  //       ?.map((floor) => ({
  //         i18nKey: floor.name,
  //         code: floor.code,
  //       }));
  //     setFloorList(mappedFloors);
  //   }
  // }, [isLoadingF, FloorAll]);
  useEffect(() => {
    if (isLoadingF) return;

    const floors = FloorAll?.PropertyTax?.Floor || [];

    const mappedFloors = floors
      .filter(floor => floor?.code && floor?.active)
      .map(floor => ({
        i18nKey: floor.name,
        code: floor.code,
      }))
      .sort((a, b) => {
        const getSortValue = (val) => {
          const num = parseInt(val, 10);
          return isNaN(num) ? Number.MAX_SAFE_INTEGER : num;
        };
        return getSortValue(b.code) - getSortValue(a.code);
      });

    setFloorList(mappedFloors);
  }, [isLoadingF, FloorAll]);


  useEffect(() => {
    if (!isLoadingO && OccupancyData?.PropertyTax?.OccupancyType) {
      const occupancyList = OccupancyData.PropertyTax.OccupancyType;
      const filtered = occupancyList
        ?.filter((item) => item.active)
        ?.map((item) => ({
          i18nKey: item.name,
          code: item.code,
        }));
      setOccupancyTypes(filtered);
    }
  }, [isLoadingO, OccupancyData]);

  const backClickSearch=()=>{
    console.log("ABCDFH BILL BACK")
      history.push(`/digit-ui/citizen/pt/namantaran/search`);
      // /digit-ui/citizen/pt/namantaran/search
  }

  return (
    <div style={{ marginTop: "1rem", borderRadius: '10px' }}>
      {/* <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
        <label style={styles.poppinsLabel}>Property Type</label>
      </div> */}
      <div style={{ overflowX: "auto", maxWidth: "100%", }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{
                ...styles.tableHeader, fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", lineHeight: "130%", letterSpacing: "0", fontStyle: "normal",
              }}>{t("Usage Type")}<span className="mandatory" style={styles.mandatory}>*</span></th>
              <th style={{
                ...styles.tableHeader, fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", lineHeight: "130%", letterSpacing: "0", fontStyle: "normal",
              }}>{t("Usage Factor")}<span className="mandatory" style={styles.mandatory}>*</span></th>
              <th style={{
                ...styles.tableHeader, fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", lineHeight: "130%", letterSpacing: "0", fontStyle: "normal",
              }}>{t("Floor Number")}<span className="mandatory" style={styles.mandatory}>*</span></th>
              <th style={{
                ...styles.tableHeader, fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", lineHeight: "130%", letterSpacing: "0", fontStyle: "normal",
              }}>{t("Type of Construction")}<span className="mandatory" style={styles.mandatory}>*</span></th>
              <th style={{
                ...styles.tableHeader, fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", lineHeight: "130%", letterSpacing: "0", fontStyle: "normal",
              }}>{t("Area (Sq feet)")}<span className="mandatory" style={styles.mandatory}>*</span></th>
              <th style={{
                ...styles.tableHeader, fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", lineHeight: "130%", letterSpacing: "0", fontStyle: "normal",
              }}>{t("From Year")}<span className="mandatory" style={styles.mandatory}>*</span></th>
              <th style={{
                ...styles.tableHeader, fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", lineHeight: "130%", letterSpacing: "0", fontStyle: "normal",
              }}>{t("To Year")}<span className="mandatory" style={styles.mandatory}>*</span></th>
              <th style={{
                ...styles.tableHeader, fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", lineHeight: "130%", letterSpacing: "0", fontStyle: "normal",
              }}>{t("Action")}</th>
            </tr>
          </thead>
          <tbody>
            {unit.map((unit, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>
                  <select
                    style={{
                      ...styles.select, appearance: "auto",
                      WebkitAppearance: "auto",
                      MozAppearance: "auto",
                      pointerEvents: "none", opacity: 0.6 
                    }}
                    value={unit.usageType}
                    onChange={(e) => handleUnitChange(index, "usageType", e.target.value)}
                  >
                    <option value="" disabled>{t("Select")}</option>
                    {usageTypes.map((item) => (
                      <option key={item.code} value={item.code}>
                        {t(item.i18nKey)}
                      </option>
                    ))}
                  </select>
                </td>

                <td style={styles.tableCell}>
                  <select
                    style={{
                      ...styles.select, appearance: "auto",
                      WebkitAppearance: "auto",
                      MozAppearance: "auto",
                          pointerEvents: "none", opacity: 0.6 
                    }}
                    value={unit.usageFactor}
                    onChange={(e) => handleUnitChange(index, "usageFactor", e.target.value)}
                  >
                    <option value="" disabled>{t("Select")}</option>
                    {occupancyTypes.map((item) => (
                      <option key={item.code} value={item.code}>
                        {t(item.i18nKey)}
                      </option>
                    ))}
                  </select>
                </td>

                <td style={styles.tableCell}>
                  <select
                    style={{
                      ...styles.select, appearance: "auto",
                      WebkitAppearance: "auto",
                      MozAppearance: "auto",
                          pointerEvents: "none", opacity: 0.6 
                    }}
                    value={unit.floorNo}
                    onChange={(e) => handleUnitChange(index, "floorNo", e.target.value)}
                  >
                    <option value="" disabled>{t("Select")}</option>
                    {floorList.map((floor) => (
                      <option key={floor.code} value={floor.code}>
                        {t(floor.i18nKey)}
                      </option>
                    ))}
                  </select>
                </td>

                <td style={styles.tableCell}>
                  <select
                    style={{
                      ...styles.select, appearance: "auto",
                      WebkitAppearance: "auto",
                      MozAppearance: "auto",
                          pointerEvents: "none", opacity: 0.6 
                    }}
                    value={unit.constructionType}
                    onChange={(e) => handleUnitChange(index, "constructionType", e.target.value)}
                  >
                    <option value="" disabled>{t("Select")}</option>
                    {constructionTypes.map((item) => (
                      <option key={item.code} value={item.code}>
                        {t(item.i18nKey)}
                      </option>
                    ))}
                  </select>
                </td>

                <td style={styles.tableCell}>
                  <input
                    type="text"
                    style={{
                      ...styles.select, appearance: "auto",
                      WebkitAppearance: "auto",
                      MozAppearance: "auto",
                          pointerEvents: "none", opacity: 0.6 
                    }}
                    placeholder={t("Enter")}
                    value={unit.area}
                    onChange={(e) => handleUnitChange(index, "area", e.target.value)}
                  />
                </td>

                <td style={styles.tableCell}>
                  <select
                    style={{
                      ...styles.select, appearance: "auto",
                      WebkitAppearance: "auto",
                      MozAppearance: "auto",
                          pointerEvents: "none", opacity: 0.6 
                    }}
                    value={unit.fromYear || ""}
                    onChange={(e) => {
                      const selectedFrom = e.target.value;
                      handleUnitChange(index, "fromYear", selectedFrom);
                      if (unit.toYear && parseInt(unit.toYear.split("-")[0]) < parseInt(selectedFrom.split("-")[0])) {
                        handleUnitChange(index, "toYear", "");
                      }
                    }}
                  >
                    <option value="" disabled>{t("From Year")}</option>
                    {years.map((yearObj) => (
                      <option key={yearObj.value} value={yearObj.value}>
                        {yearObj.label}
                      </option>
                    ))}
                  </select>
                </td>

                <td style={styles.tableCell}>
                  <select
                    style={{
                      ...styles.select, appearance: "auto",
                      WebkitAppearance: "auto",
                      MozAppearance: "auto",
                          pointerEvents: "none", opacity: 0.6 
                    }}
                    value={unit.toYear || ""}
                    onChange={(e) => handleUnitChange(index, "toYear", e.target.value)}
                    disabled={!unit.fromYear}
                  >
                    <option value="" disabled>{t("To Year")}</option>
                    <option value={currentFYString}>{currentFYString}</option>
                  </select>
                </td>
                <td style={styles.tableCell}>
                  <button
                    type="button"
                    style={{
                      ...styles.addMoreLink,
                      opacity: index === 0 ? 0.5 : 1,   // visual indication
                      cursor: index === 0 ? "not-allowed" : "pointer",
                    }}
                    onClick={() => index > 0 && removeUnit(index)} // prevent call on 0
                    disabled={index === 0} // disable button for first row
                  >
                    {t("Remove")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {formErrors.totalUnitArea && (
        <p style={{ color: "red", fontSize: "14px", padding: "4px 8px", textAlign: "right" }}>
          {formErrors.totalUnitArea}
        </p>
      )}

      {/* <div style={{ textAlign: "right", marginTop: "0.5rem" }}>
        <a href="#" style={styles.addMoreLink} onClick={(e) => { e.preventDefault(); addUnit(); }}>
          {t("Add more")}
        </a>
      </div> */}



    {!isNewOwner?  <div style={buttonGroupStyle}>
                        <button
                         onClick={backClickSearch}
                          style={clearButtonStyle}>
                            {t("Back")}
                        </button>
                        <button
                            onClick={() => {
                               
                                onAddNewOwnerClick();
                            }
                            }
                            style={findButtonStyle}
                        >
                            {t("Add New Owner")}
                        </button>
                    </div>:<div></div>}

     
    </div>
  );
};

export default PropertyDetailsTableSection;


const containerStyle = {
  background: "#fff",
  borderRadius: "10px",
  padding: "20px 30px",
  maxWidth: "1000px",
  fontFamily: "sans-serif",
};

const headingStyle = {
  margin: "0 0 24px 0",
  fontFamily: "Barlow, sans-serif",
  fontWeight: 600,
  fontSize: "20px",
  color: "#6B133F",
};

const rowStyle = {
  display: "flex",
  alignItems: "flex-end",
  gap: "10px",
  flexWrap: "wrap",
};

const inputGroupWrapper = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  flexWrap: "wrap",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontFamily: "Noto Sans, sans-serif",
  fontWeight: 400,
  fontSize: "14px",
  color: "#505050",
};

const inputStyle = {
  width: "300px",
  padding: "10px 14px",
  borderRadius: "4px",
  border: "1px solid #D6D5D4",
  backgroundColor: "#F7F7F7",
  fontSize: "14px",
  outline: "none",
  transition: "all 0.2s",
};

const orStyle = {
  fontWeight: "bold",
  color: "#555",
};

const buttonGroupStyle = {
  display: "flex",
  gap: "32px",
  marginTop: "20px",
  justifyContent:"center"
};

const baseButtonStyle = {
  padding: "8px 32px",
  borderRadius: "4px",
  fontSize: "14px",
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.2s",
  border: "none",
  minWidth: "80px",
};

const clearButtonStyle = {
  ...baseButtonStyle,
  backgroundColor: "#6B133F",
  color: "#fff",
};

const findButtonStyle = {
  ...baseButtonStyle,
  backgroundColor: "#6B133F",
  color: "#fff",
};

const paymentSectionStyle = {
  marginTop: "32px",
  padding: "0 20px"
};

const paymentHeadingStyle = {
  margin: "0 0 16px 0",
  fontFamily: "Barlow, sans-serif",
  fontWeight: 600,
  fontSize: "18px",
  color: "#000",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "#fff",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  overflow: "hidden",
};

const thStyle = {
  backgroundColor: "#E8D4DE",
  padding: "12px 16px",
  textAlign: "left",
  fontWeight: 500,
  fontSize: "14px",
  color: "#505050",
  borderBottom: "1px solid #E0E0E0",
};

const tdStyle = {
  padding: "12px 16px",
  fontSize: "14px",
  color: "#333",
  borderBottom: "1px solid #F0F0F0",
};

const payButtonStyle = {
  backgroundColor: "#fff",
  border: "1px solid #6B133F",
  color: "#6B133F",
  padding: "6px 24px",
  borderRadius: "20px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 500,
  transition: "all 0.2s",
};

const noResultsStyle = {
  padding: "32px",
  textAlign: "center",
  backgroundColor: "#fff",
  borderRadius: "8px",
  color: "#666",
};

// Pagination styles
const paginationContainer = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "16px"
};

const paginationInfo = {
  color: "#666",
  fontSize: "14px",
};

const paginationControls = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const paginationButton = {
  padding: "6px 12px",
  border: "1px solid #D6D5D4",
  backgroundColor: "#fff",
  color: "#333",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  transition: "all 0.2s",
  minWidth: "32px",
};

const activePageButton = {
  backgroundColor: "#6B133F",
  color: "#fff",
  borderColor: "#6B133F",
};

const disabledButtonStyle = {
  opacity: 0.5,
  cursor: "not-allowed",
  backgroundColor: "#f5f5f5",
};

const paginationDots = {
  padding: "0 8px",
  color: "#666",
};