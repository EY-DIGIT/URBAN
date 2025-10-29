import React, { useContext, useEffect, useState, useMemo } from "react";
import { Loader, TextInput, Dropdown, SubmitBar, MultiSelectDropdown } from "@egovernments/digit-ui-react-components";
import { alphabeticalSortFunctionForTenantsBasedOnName } from "../../../utils/index";
import FilterContext from "./FilterContext";
const FeeDataSection = ({
  t,
  WaterConncetionDetails,
  handleInputChange,
  handelwaterfee,
  //handlegetPropertyData,
  styles, formErrors,
  isNational = false,
  setconnectionTypeP,
  setFormErrors,
  WaterConnection
}) => {

  const { value, setValue } = useContext(FilterContext);


  const { isLoading: islinkDataLoading, data: servicesmasters, isFetched: isLinkDataFetched } = Digit.Hooks.useCustomMDMS(
    Digit.ULBService.getStateId(),
    "ws-services-masters",
    [
      {
        name: "UsesType",
        // filter: "[?(@.url == 'digit-ui-card')]",
      },

    ],
    {
    }
  );

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
  const updateRateZone = (Type, UsesType) => {
    if (calculationdata) {
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
      let connectionCharge = calculationdata["ws-services-calculation"]?.WCNewConnectionCharges?.filter((ob) => ob.connectionType === Type && parseInt(ob.connectionSize) === parseInt(connectionSize))
      let monthlyCharge = calculationdata["ws-services-calculation"]?.WCBillingCharges?.filter((ob) => ob.usageType === UsesType && ob.subType === subType && ob.connectionType === Type && parseInt(ob.connectionSize) === parseInt(connectionSize))
      console.log("connectionCharge", connectionCharge)
      console.log("monthlyCharge", monthlyCharge)
      handelwaterfee("ConnectionCharge", connectionCharge[0]?.charges);
      handelwaterfee("MonthlyCharge", monthlyCharge[0]?.monthlyRate || 0);
    }
  }
  // useEffect(() => {
  //     if(WaterConnection)
  //     {
  //         setPaymentType(
  //           {
  //             connectionType:WaterConnection.connectionType ==="FLAT"?"Non Metered":"Metered"
  //           }
  //         )
  //     }
  //    }, [connectionType]);

  return (
    <div style={{ marginBottom: "20px" }}>

      <div style={{ display: "flex" }}>

        <div style={styles.checkboxMargin}>
          <div style={{ marginTop: "20px", display: "flex", gap: "20px", alignItems: "center" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <input
                type="radio"
                name="connectionType"
                checked={connectionType === "Non Metered"}
                onChange={() => {
                  // setwaterConnectionTypeOptions([])
                  setPaymentType("Non Metered")
                  setconnectionTypeP("FLAT")
                  updateRateZone("Non Metered", WaterConncetionDetails.UsesType ? WaterConncetionDetails.UsesType.code : "")
                  handelwaterfee("ConnectionCharge", 0);
                  handelwaterfee("MonthlyCharge", 0);
                  updateCharges("Non Metered", WaterConncetionDetails.UsesType ? WaterConncetionDetails.UsesType.code : "", WaterConncetionDetails.waterConnectionType ? WaterConncetionDetails.waterConnectionType.code : "", WaterConncetionDetails.connectionSize ? WaterConncetionDetails.connectionSize.code : "");
                  setwaterConnectionTypeOptions([])
                  setconnectionSizeOptions([])
                  updatePipeOption(connectionType, WaterConncetionDetails.UsesType ? WaterConncetionDetails.UsesType.code : "", WaterConncetionDetails.waterConnectionType ? WaterConncetionDetails.waterConnectionType.code : "")
                }
                }
              />
              <span style={styles.label}>Flat</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <input
                type="radio"
                name="connectionType"
                checked={connectionType === "Metered"}
                onChange={() => {
                  setPaymentType("Metered")
                  setconnectionTypeP("Metered")
                  // setwaterConnectionTypeOptions([])
                  updateRateZone("Metered", WaterConncetionDetails.UsesType ? WaterConncetionDetails.UsesType.code : "")
                  handelwaterfee("ConnectionCharge", 0);
                  handelwaterfee("MonthlyCharge", 0);
                  updateCharges("Metered", WaterConncetionDetails.UsesType ? WaterConncetionDetails.UsesType.code : "", WaterConncetionDetails.waterConnectionType ? WaterConncetionDetails.waterConnectionType.code : "", WaterConncetionDetails.connectionSize ? WaterConncetionDetails.connectionSize.code : "");

                  updatePipeOption(connectionType, WaterConncetionDetails.UsesType ? WaterConncetionDetails.UsesType.code : "", WaterConncetionDetails.waterConnectionType ? WaterConncetionDetails.waterConnectionType.code : "")
                  setwaterConnectionTypeOptions([])
                  setconnectionSizeOptions([])

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
            // selected={WaterConncetionDetails.UsesType}
            // selected={UsesTypeOption.find(opt => opt.code === WaterConncetionDetails.UsesType)}
            selected={WaterConncetionDetails.UsesType}
            select={(option) => {
              // Clear only zone error
              handelwaterfee("UsesType", option);
              setwaterConnectionTypeOptions([])
              updateRateZone(connectionType, option.code)
              handelwaterfee("ConnectionCharge", 0);
              handelwaterfee("MonthlyCharge", 0);
              updatePipeOption(connectionType, option.code, WaterConncetionDetails.waterConnectionType ? WaterConncetionDetails.waterConnectionType.code : "")
              updateCharges(connectionType, option.code, WaterConncetionDetails.waterConnectionType ? WaterConncetionDetails.waterConnectionType.code : "", WaterConncetionDetails.connectionSize ? WaterConncetionDetails.connectionSize.code : "");

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
            selected={WaterConncetionDetails.waterConnectionType}
            select={(option) => {
              handelwaterfee("waterConnectionType", option);
              handelwaterfee("ConnectionCharge", 0);
              handelwaterfee("MonthlyCharge", 0);
              updatePipeOption(connectionType, WaterConncetionDetails.UsesType ? WaterConncetionDetails.UsesType.code : "", option.code)
              updateCharges(connectionType, WaterConncetionDetails.UsesType ? WaterConncetionDetails.UsesType.code : "", option.code, WaterConncetionDetails.connectionSize ? WaterConncetionDetails.connectionSize.code : "");

              // Clear only zone error
              if (formErrors?.waterConnectionType) {
                setFormErrors((prev) => {
                  const updated = { ...prev, waterConnectionType: "" };
                  return updated;
                });
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
            // selected={WaterConncetionDetails.connectionSize}
            selected={WaterConncetionDetails.connectionSize}
            select={(option) => {
              handelwaterfee("connectionSize", option);
              handelwaterfee("ConnectionCharge", 0);
              handelwaterfee("MonthlyCharge", 0);
              updateCharges(connectionType, WaterConncetionDetails.UsesType ? WaterConncetionDetails.UsesType.code : "", WaterConncetionDetails.waterConnectionType ? WaterConncetionDetails.waterConnectionType.code : "", option.code);
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
            name="ConnectionCharge"
            value={WaterConncetionDetails.ConnectionCharge}
            onChange={handleInputChange}
            placeholder={t("Auto Filled")}
          />
          {formErrors?.ConnectionCharge && <p style={{ color: "red", fontSize: "12px" }}>{formErrors.ConnectionCharge}</p>}
        </div>
        {/* Monthly Charge */}
        <div style={styles.flex30}>
          <div style={styles.poppinsLabel}>
            {t("Monthly Charge")}<span className="mandatory" style={styles.mandatory}>*</span>
          </div>
          <TextInput
            style={styles.widthInput}
            name="MonthCharge"
            value={WaterConncetionDetails.MonthlyCharge}
            onChange={handleInputChange}
            placeholder={t("Auto Filled")}
          />
          {formErrors?.MonthlyCharge && <p style={{ color: "red", fontSize: "12px" }}>{formErrors.MonthlyCharge}</p>}
        </div>
      </div>
    </div>
  );
};

export default FeeDataSection;
