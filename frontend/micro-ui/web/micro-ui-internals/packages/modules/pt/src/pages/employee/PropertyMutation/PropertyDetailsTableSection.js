

import React, { useEffect, useState } from "react";

const PropertyDetailsTableSection = ({ t, unit, handleUnitChange, addUnit, removeUnit, styles, formErrors }) => {
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

  return (
    <div style={{ marginTop: "1rem", borderRadius: '10px'}}>
      {/* <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
        <label style={styles.poppinsLabel}>Property Type</label>
      </div> */}
      <div style={{ overflowX: "auto", maxWidth: "100%",  }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{
                ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
              }}>{t("Usage Type")}<span className="mandatory" style={styles.mandatory}>*</span></th>
              <th style={{
                ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
              }}>{t("Usage Factor")}<span className="mandatory" style={styles.mandatory}>*</span></th>
              <th style={{
                ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
              }}>{t("Floor No")}<span className="mandatory" style={styles.mandatory}>*</span></th>
              <th style={{
                ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
              }}>{t("Type of Construction")}<span className="mandatory" style={styles.mandatory}>*</span></th>
              <th style={{
                ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
              }}>{t("Area (Sq feet)")}<span className="mandatory" style={styles.mandatory}>*</span></th>
              <th style={{
                ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
              }}>{t("From Year")}<span className="mandatory" style={styles.mandatory}>*</span></th>
              <th style={{
                ...styles.tableHeader,fontFamily: "Inter, sans-serif",fontWeight: 600,fontSize: "12px",lineHeight: "130%",letterSpacing: "0",fontStyle: "normal",
              }}>{t("To Year")}<span className="mandatory" style={styles.mandatory}>*</span></th>
            
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
                    }}
                     disabled={true}
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
                   disabled={true}
                    style={{
                      ...styles.select, appearance: "auto",
                      WebkitAppearance: "auto",
                      MozAppearance: "auto",
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
                   disabled={true}
                    style={{
                      ...styles.select, appearance: "auto",
                      WebkitAppearance: "auto",
                      MozAppearance: "auto",
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
                   disabled={true}
                    style={{
                      ...styles.select, appearance: "auto",
                      WebkitAppearance: "auto",
                      MozAppearance: "auto",
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
                   disabled={true}
                    type="text"
                    style={{
                      ...styles.select, appearance: "auto",
                      WebkitAppearance: "auto",
                      MozAppearance: "auto",
                    }}
                    placeholder={t("Enter")}
                    value={unit.area}
                    onChange={(e) => handleUnitChange(index, "area", e.target.value)}
                  />
                </td>

                <td style={styles.tableCell}>
                  <select
                   disabled={true}
                    style={{
                      ...styles.select, appearance: "auto",
                      WebkitAppearance: "auto",
                      MozAppearance: "auto",
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
                    }}
                    value={unit.toYear || ""}
                    onChange={(e) => handleUnitChange(index, "toYear", e.target.value)}
                    disabled={true}
                  >
                    <option value="" disabled>{t("To Year")}</option>
                    <option value={currentFYString}>{currentFYString}</option>
                  </select>
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

    
    </div>
  );
};

export default PropertyDetailsTableSection;
