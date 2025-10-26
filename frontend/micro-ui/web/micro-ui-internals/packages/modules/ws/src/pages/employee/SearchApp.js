import React, { useState,useEffect } from "react"
import { TextInput, Label, SubmitBar, LinkLabel, ActionBar, CloseSvg, DatePicker, CardLabelError, SearchForm, SearchField, Dropdown, Toast } from "@egovernments/digit-ui-react-components";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next";
import {  Loader } from "@egovernments/digit-ui-react-components";
import WSSearchApplication from "../../components/SearchApplication";

const SearchApp = ({ path }) => {
  const { variant } = useParams();
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [payload, setPayload] = useState({})
  const [showToast, setShowToast] = useState(null);

  function onSubmit(_data) {
    var fromDate = new Date(_data?.fromDate)
    fromDate?.setSeconds(fromDate?.getSeconds() - 19800)
    var toDate = new Date(_data?.toDate)
    toDate?.setSeconds(toDate?.getSeconds() + 86399 - 19800)
    const data = {
      ..._data,
      ...(_data.toDate ? { toDate: toDate?.getTime() } : {}),
      ...(_data.fromDate ? { fromDate: fromDate?.getTime() } : {})
    }

    let payload = Object.keys(data).filter(k => data[k]).reduce((acc, key) => ({ ...acc, [key]: typeof data[key] === "object" ? data[key].code : data[key] }), {});
    if(Object.entries(payload).length >0)
    {
       setPayload(payload)
    }
    // if (Object.entries(payload).length > 0 && !payload.applicationNumber && !payload.creationReason && !payload.fromDate && !payload.mobileNumber && !payload.propertyIds && !payload.status && !payload.toDate)
    //   setShowToast({ warning: true, label: "ERR_PT_FILL_VALID_FIELDS" });
    // else if (Object.entries(payload).length > 0 && (payload.creationReason || payload.status) && (!payload.applicationNumber && !payload.fromDate && !payload.mobileNumber && !payload.propertyIds && !payload.toDate))
    //   setShowToast({ warning: true, label: "ERR_PROVIDE_MORE_PARAM_WITH_TYPE_STATUS" });
    // else if (Object.entries(payload).length > 0 && (payload.fromDate && !payload.toDate) || (!payload.fromDate && payload.toDate))
    //   setShowToast({ warning: true, label: "ERR_PROVIDE_BOTH_FORM_TO_DATE" });
    // else
    //   setPayload(payload)
  }

  const config = {
    enabled: !!(payload && Object.keys(payload).length > 0)
  }

  // const { isLoading, isSuccess, isError, error, data: { Properties: data, Count: count } = {} } = Digit.Hooks.ws.useWaterSearch(
  //   {
  //     tenantId,
  //     filters: payload,
  //    BusinessService: "WS",
  //     t:t
  //   },
  //   config,
  // );
// const waterSearchResult = Digit.Hooks.ws.useWaterSearch(
//   {
//     tenantId,
//     filters: payload,
//     BusinessService: "WS",
//     t: t,
//   },
//   config
// );

// const isLoading = waterSearchResult?.isLoading;
// const isSuccess = waterSearchResult?.isSuccess;
// const isError = waterSearchResult?.isError;
// const error = waterSearchResult?.error;
// const data = waterSearchResult?.data?.Properties || [];
// const count = waterSearchResult?.data?.Count || 0;
const { isLoading, isSuccess, data, isError } = Digit.Hooks.ws.useWaterSearch(
  { tenantId, filters: payload, BusinessService: "WS", t },
  config
);

console.log("data from hook:", data); // ✅ should now show array of results

  // const { data, isLoadings, isFetching, errors } = Digit.Hooks.useNewInboxGeneralV2({
  //   tenantId,
  //   ModuleCode: "PT",
  //   filters: {
  //     limit: 10,
  //     offset: 0,
  //     sortBy: "createdTime",
  //     sortOrder: "ASC",
  //   },
  // });

 
    // useEffect(() => {
    //     console.log("datadatadatadata",data);
    //   if (!isFetching && isSuccesss) 
    //    console.log("datadatadatadata",data);
    // }, [isFetching]);

  return <React.Fragment>
    <WSSearchApplication
  t={t}
  isLoading={isLoading}
  tenantId={tenantId}
  setShowToast={setShowToast}
  onSubmit={onSubmit}
  data={isSuccess && !isLoading ? (data?.length > 0 ? data : { display: "ES_COMMON_NO_DATA" }) : ""}
  count={data?.length || 0}
/>



    {showToast && (
      <Toast
        error={showToast.error}
        warning={showToast.warning}
        label={t(showToast.label)}
        isDleteBtn={true}
        onClose={() => {
          setShowToast(null);
        }}
      />
    )}
  </React.Fragment>

}

export default SearchApp