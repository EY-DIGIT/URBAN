import React, { useContext, useEffect, useState, useMemo } from "react";
import { Loader, TextInput, Dropdown, SubmitBar, MultiSelectDropdown } from "@egovernments/digit-ui-react-components";
import FilterContext from "./FilterContext";
import {decimalToFractionInch} from "../../../utils/masterdataconvertHelper"
const FeeDataSection = ({
  t,
  styles,
  waterDetails,
  handleWaterInputChange,
  formErrors,
  setFormErrors,
}) => {
console.log("pritamwater",waterDetails)
  const { value, setValue } = useContext(FilterContext);
  const { data: calculationdata, isFetched: isLinkDataFetched1 } = Digit.Hooks.useCustomMDMS(
    Digit.ULBService.getStateId(),
    "ws-services-calculation",
    [
      {
        name: "PropertyUsageType",
      },
      {
        name: "WCNewConnectionCharges",
      },
      {
        name: "WCBillingCharges",
      },
      {
        name: "PipeSize",
      },

    ],
    {
    }
  );
  let UsesTypeOption = [];
  //let connectionSizeOptions = [];
  const [connectionSizeOptions, setconnectionSizeOptions] = useState([]);
  //let waterConnectionTypeOptions = []
  if (calculationdata) {
    UsesTypeOption = calculationdata["ws-services-calculation"]?.PropertyUsageType?.map((ob) => ({ name: ob.name, code: ob.code }));
    //connectionSizeOptions = calculationdata["ws-services-calculation"]?.PipeSize?.map((ob) => ({ name: ob.size, code: ob.size }));
    // waterConnectionTypeOptions =  calculationdata["ws-services-masters"]?.usageType?.map((ob) => ({ name: ob.name, code: ob.code,subType:ob.subType,connectionType:ob.connectionType })); 
  }


  const optionSecound = {
    code: "PAY_BEHALF_OWNER",
    i18nKey: "PT_PAY_BEHALF_OWNER",
    name: "I am making the payment on behalf of the owner/ consumer of the service",
  };
  const [isLoader, setIsLoader] = useState(false);
  const [connectionType, setPaymentType] = useState("Non Metered");
  const [waterConnectionTypeOptions, setwaterConnectionTypeOptions] = useState([]);
  const [zones, setZones] = useState([]);
  let userInfo1 = JSON.parse(localStorage.getItem("user-info"));
  const [serverErrors, setServerErrors] = useState({});
  const tenantId = userInfo1?.tenantId;
  const stateId = Digit.ULBService.getStateId();
  const updateSubUsesType = (Type, UsesType) => {
    if (calculationdata) {
       UsesType = UsesType.code?UsesType.code:UsesType
      let waterConnectionTypeOptions = calculationdata["ws-services-calculation"]?.WCBillingCharges?.filter((ob) => ob.connectionType === Type && ob.usageType === UsesType)
        .map((ob) => ({ name: ob.subType, code: ob.subType, }));
      const uniqueIds = new Set(waterConnectionTypeOptions.map(employee => employee.code));
      const uniqueEmployees = Array.from(uniqueIds).map(id => {
        return waterConnectionTypeOptions.find(employee => employee.code === id);
      });
      let uniqueEmployees_ = uniqueEmployees
      if (Type === "Non Metered") {
        uniqueEmployees.filter((item, i, ar) => item.code !== "RESIDENTIAL");
      }
      setwaterConnectionTypeOptions(uniqueEmployees_)
    }
  }
  const updatePipeOption = (Type, UsesType, subType) => {
    if (calculationdata) {
      if (calculationdata) {
        subType = subType.code?subType.code:subType
         UsesType = UsesType.code?UsesType.code:UsesType
        const Pipemaster = calculationdata["ws-services-calculation"]?.PipeSize?.map((ob) => ({ name: `${ob.value} ${ob.unit}`, code: parseFloat(ob.size) }));
        const PipeOption = calculationdata["ws-services-calculation"]?.WCBillingCharges?.filter((ob) => ob.connectionType === Type
          && ob.subType === subType
          && ob.usageType === UsesType)
          .map((ob) => ({ name: parseFloat(ob.connectionSize), code: parseFloat(ob.connectionSize) }));

        const PipeOptionSizes = PipeOption.map(o => String(o.code));
        const mergedTariffs = Pipemaster
          .filter(item => PipeOptionSizes.includes(String(item.code)))
          .map(item => ({ ...item }));


        console.log("mergedTariffs", mergedTariffs);


        if (mergedTariffs) {
          setconnectionSizeOptions(mergedTariffs)
        }
        else {
          setconnectionSizeOptions([])
        }

      }

    }

  }
  const updateCharges = (Type, UsesType, subType, connectionSize) => {
    if (calculationdata) {
       subType = subType.code?subType.code:subType
        connectionSize = connectionSize.code?connectionSize.code:connectionSize
         UsesType = UsesType.code?UsesType.code:UsesType
      let connectionCharge = calculationdata["ws-services-calculation"]?.WCNewConnectionCharges?.filter((ob) => ob.connectionType === Type && parseInt(ob.connectionSize) === parseInt(connectionSize))
      let monthlyCharge = calculationdata["ws-services-calculation"]?.WCBillingCharges?.filter((ob) => ob.usageType === UsesType && ob.subType === subType && ob.connectionType === Type && parseInt(ob.connectionSize) === parseInt(connectionSize))
      console.log("connectionCharge", connectionCharge)
      console.log("monthlyCharge", monthlyCharge)
      handleWaterInputChange("newConnectionCharges", connectionCharge[0]?.charges);
      handleWaterInputChange("MonthlyCharge", monthlyCharge[0]?.monthlyRate || 0);
    }
  }

  return (
    <div style={{ marginBottom: "20px" }}>

      <div style={{ display: "flex" }}>

        <div style={styles.checkboxMargin}>
          <div style={{ marginTop: "20px", display: "flex", gap: "20px", alignItems: "center" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <input
                type="radio"
                name="connectionType"
                checked={waterDetails?.connectionType === "Non Metered"}
                onChange={() => {
                  // setwaterConnectionTypeOptions([])
                  handleWaterInputChange("connectionType", "Non Metered")
                  handleWaterInputChange("UsesType","")
                  handleWaterInputChange("waterConnectionType","")
                  handleWaterInputChange("connectionSize","")
                  updateSubUsesType("Non Metered", waterDetails?.UsesType)
                  handleWaterInputChange("newConnectionCharges", 0);
                  handleWaterInputChange("MonthlyCharge", 0);
                 // updateCharges("Non Metered", waterDetails?.UsesType, waterDetails?.waterConnectionType, waterDetails?.connectionSize);
                  setwaterConnectionTypeOptions([])
                  setconnectionSizeOptions([])
                  updatePipeOption(waterDetails?.connectionType, waterDetails?.UsesType, waterDetails?.waterConnectionType)
                }
                }
              />
              <span style={styles.label}>Flat</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <input
                type="radio"
                name="connectionType"
                checked={waterDetails?.connectionType === "Metered"}
                onChange={() => {
                  handleWaterInputChange("connectionType", "Metered")
                  handleWaterInputChange("UsesType","")
                  handleWaterInputChange("waterConnectionType","")
              handleWaterInputChange("connectionSize","")
                  updateSubUsesType("Metered", waterDetails?.UsesType)
                  handleWaterInputChange("newConnectionCharges", 0);
                  handleWaterInputChange("MonthlyCharge", 0);
                  //updateCharges("Non Metered", waterDetails?.UsesType, waterDetails?.waterConnectionType, waterDetails?.connectionSize);
                  setwaterConnectionTypeOptions([])
                  setconnectionSizeOptions([])
                  updatePipeOption(waterDetails?.connectionType, waterDetails?.UsesType, waterDetails?.waterConnectionType)

                }

                }
              />
              <span style={styles.label}>Metered</span>
            </label>

          </div>

        </div>



      </div>
      <div className="form-section" style={styles.formSection}>
        {/* Water Connection Type */}
        <div style={styles.flex30}>
          <div style={styles.poppinsLabel}>
            {t("Uses Type")}<span className="mandatory" style={styles.mandatory}>*</span>
          </div>
          <Dropdown
            style={styles.widthInput}
            t={t}
            option={UsesTypeOption}
           selected={waterDetails?.UsesType || null}
              //selected={(UsesTypeOption ||[]).find(opt => opt.code === waterDetails?.gender)}
            select={(option) => {
              // Clear only zone 
              handleWaterInputChange("UsesType", option);

  setwaterConnectionTypeOptions([]);
  handleWaterInputChange("waterConnectionType", "");
  handleWaterInputChange("connectionSize", "");

  const newUsesType = option.code;
  const type = waterDetails?.connectionType;

  updateSubUsesType(type, newUsesType);
  updatePipeOption(type, newUsesType, "");
  updateCharges(type, newUsesType, "", "");
              if (formErrors?.UsesType) {
                setFormErrors((prev) => {
                  const updated = { ...prev, UsesType: "" };
                  return updated;
                });
              }
            }}
            optionKey="name"
            placeholder={t("Select")}
          />
          {formErrors?.UsesType && <p style={{ color: "red", fontSize: "12px" }}>{formErrors.UsesType}</p>}
        </div>
        {/* Water Connection Typ */}
        <div style={styles.flex30}>
          <div style={styles.poppinsLabel}>
            {t("Water Connection Type")}<span className="mandatory" style={styles.mandatory}>*</span>
          </div>
          <Dropdown
            style={styles.widthInput}
            t={t}
            option={waterConnectionTypeOptions}            
           selected={waterDetails?.waterConnectionType || null}
            select={(option) => {
              const selectedType = option.code;
              handleWaterInputChange("waterConnectionType",option)
               handleWaterInputChange("connectionSize","")
             // handleWaterInputChange("waterConnectionType", selectedType);
              handleWaterInputChange("newConnectionCharges", 0);
              handleWaterInputChange("MonthlyCharge", 0);

              updatePipeOption(
                waterDetails?.connectionType,
                waterDetails?.UsesType,
                selectedType
              );

              updateCharges(
                waterDetails?.connectionType,
                waterDetails?.UsesType,
                selectedType,
                waterDetails?.connectionSize
              );

              if (formErrors?.waterConnectionType) {
                setFormErrors((prev) => ({
                  ...prev,
                  waterConnectionType: ""
                }));
              }
            }}
            optionKey="name"
            placeholder={t("Select")}
          />

          {formErrors?.waterConnectionType && <p style={{ color: "red", fontSize: "12px" }}>{formErrors.waterConnectionType}</p>}
        </div>
        {/* Connection Size */}
        <div style={styles.flex30}>
          <div style={styles.poppinsLabel}>
            {t("Connection Size")}<span className="mandatory" style={styles.mandatory}>*</span>
          </div>
          <Dropdown
            style={styles.widthInput}
            t={t}
            option={connectionSizeOptions}
            selected={waterDetails?.connectionSize || null}           
            value={`${decimalToFractionInch(waterDetails?.connectionSize?.code)} inch` || ""}
            select={(option) => {
              handleWaterInputChange("connectionSize", option);
              handleWaterInputChange("newConnectionCharges", 0);
              handleWaterInputChange("MonthlyCharge", 0);
              updateCharges(waterDetails?.connectionType, waterDetails?.UsesType, waterDetails?.waterConnectionType, option.code);
              // Clear only zone error
              if (formErrors?.connectionSize) {
                setFormErrors((prev) => {
                  const updated = { ...prev, connectionSize: "" };
                  return updated;
                });
              }
            }}
            optionKey="name"
            placeholder={t("Select")}
          />
          {formErrors?.connectionSize && <p style={{ color: "red", fontSize: "12px" }}>{formErrors.connectionSize}</p>}
        </div>
        {/* New Connection Charge */}
        <div style={styles.flex30}>
          <div style={styles.poppinsLabel}>
            {t("New Connection Charge")}<span className="mandatory" style={styles.mandatory}>*</span>
          </div>
          <TextInput
            style={styles.widthInput}
            name="newConnectionCharges"
          value={waterDetails?.newConnectionCharges || 0}
            placeholder={t("Auto Filled")}
          />
          {formErrors?.newConnectionCharges && <p style={{ color: "red", fontSize: "12px" }}>{formErrors.newConnectionCharges}</p>}
        </div>
        {/* Monthly Charge */}
        <div style={styles.flex30}>
          <div style={styles.poppinsLabel}>
            {t("Monthly Charge")}<span className="mandatory" style={styles.mandatory}>*</span>
          </div>
          <TextInput
            style={styles.widthInput}
            name="MonthCharge"           
            value={waterDetails?.MonthlyCharge || 0}
            placeholder={t("Auto Filled")}
          />
          {formErrors?.MonthlyCharge && <p style={{ color: "red", fontSize: "12px" }}>{formErrors.MonthlyCharge}</p>}
        </div>
      </div>
    </div>
  );
};

export default FeeDataSection;
