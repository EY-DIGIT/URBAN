import React, { useState, useEffect, useMemo } from "react";
import { CardLabel, LabelFieldPair, Dropdown, TextInput, LinkButton, CardLabelError, MobileNumber } from "@egovernments/digit-ui-react-components";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { getUniqueItemsFromArray, stringReplaceAll, getPattern } from "../utils";
import {sortDropdownNames} from "../utils/index";

const createAccessoriesDetails = () => ({
    accessoryCategory: "",
    count: "",
    uom: "",
    uomValue: "",
    key: Date.now(),
});


const TLAccessoriesEmployee = ({ config, onSelect, userType, formData, setError, formState, clearErrors }) => {
    const { t } = useTranslation();
    const [accessoriesList, setAccessoriesList] = useState(formData?.accessories || [createAccessoriesDetails()]);
    const [focusIndex, setFocusIndex] = useState({ index: -1, type: "" });
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const [accessories, SetAccessories] = useState([]);
    const [isErrors, setIsErrors] = useState(false);
    const [enableUOM, setenableUOM] = useState(false);
    let isRenewal = !window.location.href.includes("renew-application-details");

    const requestCriteria = {
        url: "/tl-calculator/billingslab/_search",
        useCache: false,
        setTimeParam: false,
        userService: true,
        method: "POST",
        params: { tenantId },
        auth: true,
    }  
    let { data: billingSlabData } = Digit.Hooks.useCustomAPIHook(requestCriteria);

    useEffect(() => {
        const filteredBillingSlabData = billingSlabData?.billingSlab.filter((e) => e.accessoryCategory && e.applicationType === "NEW" && e.uom);
        if (filteredBillingSlabData &&  filteredBillingSlabData?.length > 0) {
            const processedData =
                filteredBillingSlabData &&
                filteredBillingSlabData.reduce(
                    (acc, item) => {
                        let accessory = { active: true };
                        if (item.accessoryCategory && item.tradeType === null) {
                            accessory.code = item.accessoryCategory;
                            accessory.uom = item.uom;
                            accessory.rate = item.rate;
                            accessory.fromUom = item.fromUom;
                            accessory.toUom = item.toUom;
                            item.rate && item.rate > 0 && acc.accessories.push(accessory);
                        }
                        return acc;
                    },
                    { accessories: [] }
                );

            const accessories = getUniqueItemsFromArray(
                processedData.accessories,
                "code"
            );
            accessories?.forEach(data => {
                data.i18nKey = t(`TRADELICENSE_ACCESSORIESCATEGORY_${stringReplaceAll(data?.code?.toUpperCase(), "-", "_")}`);
            });

            SetAccessories(accessories);
        }
    }, [billingSlabData]);

    const addAccessories = () => {
        const newAccessor = createAccessoriesDetails();
        setAccessoriesList((prev) => [...prev, newAccessor]);
    };

    const removeAccessor = (accessor) => {
        setAccessoriesList((prev) => prev.filter((o) => o.key != accessor.key));
    };

    useEffect(() => {
        const data = accessoriesList?.map((e) => {
            return e;
        });
        onSelect(config?.key, data);
    }, [accessoriesList]);

    useEffect(() => {
        if (formData?.accessories?.length > 0 && !isRenewal) {
          let flag = true;
          accessoriesList?.map(data => {
            Object.keys(data)?.map(dta => {
              if(dta != "key" &&  data[dta]) flag = false;
            });
          });
          formData?.accessories?.map(data => {
            Object.keys(data)?.map(dta => {
              if (dta != "key" && data[dta] != undefined && data[data] != "" && data[data] != null) {
    
              } else {
                formData.accessories[0].count = 1;
                if (flag) setAccessoriesList(formData?.accessories);
                formData.accessories[0].count = "";
                setAccessoriesList(formData?.accessories);
                flag = false;
              }
            });
          })
        }
    
      }, [formData?.accessories?.[0]?.accessoryCategory?.code]);

    const commonProps = {
        focusIndex,
        allAccessoriesList: accessoriesList,
        setFocusIndex,
        removeAccessor,
        formData,
        formState,
        setAccessoriesList,
        t,
        config,
        setError,
        clearErrors,
        setIsErrors,
        isErrors,
        accessories,
        isRenewal,
        enableUOM,
        setenableUOM
    };

    return (
        <React.Fragment>
            {accessoriesList?.map((accessor, index) => (
                <AccessoriersForm key={accessor.key} index={index} accessor={accessor} {...commonProps} />
            ))}
            <LinkButton label={`${t("TL_NEW_TRADE_DETAILS_NEW_ACCESSORIES")}`} onClick={addAccessories} style={{ color: "#F47738", width: "fit-content" }} />

        </React.Fragment>
    );
};

const AccessoriersForm = (_props) => {
    const {
        accessor,
        focusIndex,
        allAccessoriesList,
        setFocusIndex,
        removeAccessor,
        formData,
        formState,
        setAccessoriesList,
        t,
        config,
        setError,
        clearErrors,
        setIsErrors,
        isErrors,
        accessories,
        isRenewal,
        enableUOM,
        setenableUOM
    } = _props;

    const { control, formState: localFormState, watch, setError: setLocalError, clearErrors: clearLocalErrors, setValue, trigger, getValues } = useForm();
    const formValue = watch();
    const { errors } = localFormState;

    const isIndividualTypeOwner = useMemo(() => formData?.ownershipCategory?.code?.includes("INDIVIDUAL"), [formData?.ownershipCategory?.code]);

    useEffect(() => {
        trigger();
    }, []);

    useEffect(() => {
        trigger();
    }, [accessor?.accessoryCategory?.uom, formData?.accessories]);

    useEffect(() => {
        const keys = Object.keys(formValue);
        if (!formValue?.accessoryCategory?.uom) {
            formValue.uomValue = "";
        }
        const part = {};
        keys?.forEach((key) => (part[key] = accessor[key]));

        let _ownerType = isIndividualTypeOwner ? {} : { ownerType: { code: "NONE" } };

        if (!_.isEqual(formValue, part)) {
            Object.keys(formValue)?.map(data => {
                if (data != "key" && formValue[data] != undefined && formValue[data] != "" && formValue[data] != null && !isErrors) {
                  setIsErrors(true); 
                }
              });

            setAccessoriesList((prev) => prev?.map((o) => {
                return (o.key && o.key === accessor.key ? { ...o, ...formValue, ..._ownerType } : { ...o })
            }));
            trigger();
        }
    }, [formValue]);

    useEffect(() => {
        if (Object.keys(errors).length && !_.isEqual(formState.errors[config.key]?.type || {}, errors)) {
            setError(config.key, { type: errors });
        }
        else if (!Object.keys(errors).length && formState.errors[config.key] && isErrors) {
            clearErrors(config.key);
        }
    }, [errors]);

    function checkRangeForUomValue(e, fromUom, toUom){
        if(Number.isInteger(fromUom)){
            if(!(e && parseFloat(e) >= fromUom)){
            return false;
            }
           }
        if(Number.isInteger(toUom)){
           if(!(e && parseFloat(e) <= toUom)){
             return false
             }
           }
        return true
    }

    const errorStyle = { width: "70%", marginLeft: "30%", fontSize: "12px", marginTop: "-21px" };
    return (
        <React.Fragment>
            <div style={{ marginBottom: "16px" }}>
                <div style={{ border: "1px solid #D6D5D4", padding: "16px", marginTop: "8px", background: "#FAFAFA" }}>
                    {allAccessoriesList?.length > 1 ? (
                        <div style={{display: "flex", justifyContent: "flex-end"}}>
                            <div onClick={() => removeAccessor(accessor)} style={{ padding: "5px", cursor: "pointer", textAlign: "right" }}>
                                <span>
                                    <svg style={{ float: "right", position: "relative", bottom: "5px" }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" fill="#494848" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    ) : null}
                    <LabelFieldPair>
                        <CardLabel className="card-label-smaller">{`${t("TL_NEW_TRADE_DETAILS_ACC_LABEL")} `}</CardLabel>
                        <Controller
                            control={control}
                            name={"accessoryCategory"}
                            defaultValue={accessor?.accessoryCategory}
                            render={(props) => (
                                <Dropdown
                                    className="form-field"
                                    selected={props.value}
                                    select={(e) => {
                                        setValue("uom", e?.uom ? e?.uom : "");
                                        if (e?.uom !== accessor?.accessoryCategory?.uom) setValue("uomValue", "");
                                        props.onChange(e);
                                        setenableUOM(true);
                                        setValue("uomValue","");
                                        setValue("count","");
                                    }}
                                    onBlur={props.onBlur}
                                    option={sortDropdownNames(accessories,"i18nKey",t) || []}
                                    optionKey="i18nKey"
                                    t={t}
                                  
                                />
                            )}
                        />
                    </LabelFieldPair>
                    <LabelFieldPair>
                        <CardLabel className="card-label-smaller">{getValues("uom") ? `${t("TL_NEW_TRADE_DETAILS_UOM_UOM_PLACEHOLDER")} * ` : `${t("TL_NEW_TRADE_DETAILS_UOM_UOM_PLACEHOLDER")} `}</CardLabel>
                        <div className="field">
                            <Controller
                                control={control}
                                name={"uom"}
                                defaultValue={accessor?.accessoryCategory?.uom}
                                render={(props) => (
                                    <TextInput
                                        value={getValues("uom")}
                                        autoFocus={focusIndex.index === accessor?.key && focusIndex.type === "uom"}
                                        onChange={(e) => {
                                            props.onChange(e.target.value);
                                            setFocusIndex({ index: accessor.key, type: "uom" });
                                        }}
                                        disable={true}
                                        onBlur={props.onBlur}
                                        style={{ background: "#FAFAFA" }}
                                    />
                                )}
                            />
                        </div>
                    </LabelFieldPair>
                    <LabelFieldPair>
                        <CardLabel className="card-label-smaller">{accessor?.accessoryCategory?.uom ? `${t("TL_NEW_TRADE_DETAILS_UOM_VALUE_LABEL")} *  ` : `${t("TL_NEW_TRADE_DETAILS_UOM_VALUE_LABEL")}  `}</CardLabel>
                        <div className="field">
                            <Controller
                                control={control}
                                name={"uomValue"}
                                defaultValue={accessor?.uomValue}
                                rules={accessor?.accessoryCategory?.uom && { required: t("REQUIRED_FIELD"), validate: (e) => (/*(e && getPattern("UOMValue").test(e))*/ e > 0 && e < 99999 ? (checkRangeForUomValue(e,accessor?.accessoryCategory?.fromUom,accessor?.accessoryCategory?.toUom) ? true : `${t("ERR_WRONG_UOM_VALUE")} ${accessor?.accessoryCategory?.fromUom} - ${accessor?.accessoryCategory?.toUom}`) : t("ERR_DEFAULT_INPUT_FIELD_MSG")) }}
                                render={(props) => (
                                    <TextInput
                                        value={getValues("uomValue")}
                                        autoFocus={focusIndex.index === accessor?.key && focusIndex.type === "uomValue"}
                                        errorStyle={(localFormState.touched.uomValue && errors?.uomValue?.message) ? true : false}
                                        onChange={(e) => {
                                            props.onChange(e.target.value);
                                            setFocusIndex({ index: accessor.key, type: "uomValue" });
                                        }}
                                        disable={isRenewal ? !enableUOM : false}
                                        onBlur={props.onBlur}
                                        style={{ background: "#FAFAFA" }}
                                    />
                                )}
                            />
                        </div>
                    </LabelFieldPair>
                    <CardLabelError style={errorStyle}>{localFormState.touched.uomValue ? errors?.uomValue?.message : ""}</CardLabelError>
                    <LabelFieldPair>
                        <CardLabel className="card-label-smaller">{accessor?.accessoryCategory?.code ? `${t("TL_ACCESSORY_COUNT_LABEL")} * ` : `${t("TL_ACCESSORY_COUNT_LABEL")} `}</CardLabel>
                        <div className="field">
                            <Controller
                                control={control}
                                name={"count"}
                                defaultValue={accessor?.count}
                                rules={accessor?.accessoryCategory?.code && { required: t("REQUIRED_FIELD"), validate: (e) => ((e && getPattern("NoOfEmp").test(e)) || !e ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")) }}
                                render={(props) => (
                                    <TextInput
                                        value={props.value}
                                        autoFocus={focusIndex.index === accessor?.key && focusIndex.type === "count"}
                                        errorStyle={(localFormState.touched.count && errors?.count?.message) ? true : false}
                                        onChange={(e) => {
                                            props.onChange(e.target.value);
                                            setFocusIndex({ index: accessor.key, type: "count" });
                                        }}
                                        onBlur={props.onBlur}
                                        disable={isRenewal ? !enableUOM : false}
                                        style={{ background: "#FAFAFA" }}
                                    />
                                )}
                            />
                        </div>
                    </LabelFieldPair>
                    <CardLabelError style={errorStyle}>{localFormState.touched.count ? errors?.count?.message : ""}</CardLabelError>
                </div>
            </div>
        </React.Fragment>
    );
};

export default TLAccessoriesEmployee;
