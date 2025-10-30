import { useQuery } from "react-query";
import { WSService } from "../../services/elements/WS";
import { PTService } from "../../services/elements/PT";
import _ from "lodash";

const getDate = (epochdate) => {
  return epochdate
    ? `${new Date(epochdate).getDate()}/${new Date(epochdate).getMonth() + 1}/${new Date(epochdate).getFullYear()}`
    : "NA";
};

const getAddress = (address, t) => {
  return `${address?.doorNo ? `${address?.doorNo}, ` : ""}${address?.street ? `${address?.street}, ` : ""}${address?.landmark ? `${address?.landmark}, ` : ""
    }${address?.locality?.code ? t(`TENANTS_MOHALLA_${address?.locality?.code}`) : ""}${address?.city?.code || address?.city ? `, ${t(address?.city?.code || address?.city)}` : ""
    }${address?.pincode ? `, ${address.pincode}` : ""}`;
};

const combineResponse = (WaterConnections, properties, billData, t) => {
  if (WaterConnections && properties) {
    if (window.location.href.includes("/edit-application/") || window.location.href.includes("/modify-connection/")) {
      return {
        ...WaterConnections?.[0],
        property: { ...properties?.[0] },
        billData: { ...billData?.[0] },
      };
    }
    let formattedData = {};
    const data = WaterConnections.map((app) => ({
      ConsumerNumber: app?.connectionNo,
      applicationNo: app?.applicationNo,
      status: app?.status,
      applicationStatus: app?.applicationStatus,
      applicationType: `${t(app?.applicationType)}`,
      connectionType: app?.connectionType,
      serviceType: app?.serviceType,
      mobileNumber: app?.connectionHolders?.[0]?.mobileNumber,
      ConsumerName: app?.connectionHolders
        ? app?.connectionHolders.map((owner) => owner?.name).join(",")
        : properties
          .filter((prop) => prop.propertyId === app?.propertyId)[0]
          ?.owners?.map((ow) => ow.name)
          .join(","),
      Address: getAddress(properties.filter((prop) => prop.propertyId === app?.propertyId)[0]?.address || app?.property?.address, t),
     // Address: getAddress(app?.propertyId?.address, t),
      ward: app?.property?.address?.ward,
      zone: app?.property?.address?.zone,
      locality: app?.property?.address?.locality?.name,
      propertyId: app?.propertyId,
      AmountDue: billData
        ? billData?.filter((bill) => bill?.consumerCode === app?.connectionNo)[0]?.totalAmount || "0"
        : "0",
      DueDate: billData
        ? getDate(
          billData?.filter((bill) => bill?.consumerCode === app?.connectionNo)[0]?.billDetails?.[0]?.expiryDate
        )
        : "NA",


    }));
    data.forEach(app => {
      formattedData[app.applicationNo] = {
        ConsumerNumber: app?.ConsumerNumber,
        ConsumerName:app?.ConsumerName,
        applicationNo: app?.applicationNo,
        applicationStatus: app?.applicationStatus,
        mobileNumber: app?.mobileNumber,
        Address: app?.Address,
        ward: app?.ward,
        zone: app?.zone,
        locality: app.locality,
        applicationType: app?.applicationType,
        status: app?.status,
        connectionType: app?.connectionType,
        propertyId: app?.propertyId,
        AmountDue: billData?.find(b => b.consumerCode === app.connectionNo)?.totalAmount || "0",
        isSynced: true,
      };
    });
    data["FormattedData"] = formattedData;
    // return WaterConnections.map((app) => ({
    //   ConsumerNumber: app?.connectionNo,
    //   applicationNo: app?.applicationNo,
    //   status: app?.status,
    //   applicationStatus:app?.applicationStatus,
    //   applicationType: `${t(app?.applicationType)}`,
    //   connectionType: app?.connectionType,
    //   serviceType: app?.serviceType,
    //   mobileNumber:app?.connectionHolders?.[0]?.mobileNumber,
    //   ConsumerName: app?.connectionHolders
    //     ? app?.connectionHolders.map((owner) => owner?.name).join(",")
    //     : properties
    //         .filter((prop) => prop.propertyId === app?.propertyId)[0]
    //         ?.owners?.map((ow) => ow.name)
    //         .join(","),
    //   Address: getAddress(properties.filter((prop) => prop.propertyId === app?.propertyId)[0]?.address, t),
    //   ward: app?.property?.address?.ward,
    //   zone: app?.property?.address?.zone,
    //   locality: app?.property?.address?.locality?.name,
    //   propertyId: app?.propertyId,
    //   AmountDue: billData
    //     ? billData?.filter((bill) => bill?.consumerCode === app?.connectionNo)[0]?.totalAmount || "0"
    //     : "0",
    //   DueDate: billData
    //     ? getDate(
    //         billData?.filter((bill) => bill?.consumerCode === app?.connectionNo)[0]?.billDetails?.[0]?.expiryDate
    //       )
    //     : "NA",
    // }));
    return data
  } else return undefined;
};

const useWaterSearch = ({ tenantId, filters = {}, BusinessService = "WS", t }, config = {}) => {
  if (tenantId.indexOf(".") === -1) {
    tenantId = `${tenantId}.indore`
  }
  const response = useQuery(
    ["WS_SEARCH", tenantId, filters, BusinessService, config],
    async () => await WSService.search({ tenantId, filters: { ...filters }, businessService: BusinessService }),
    { ...config }
  );

  let propertyids = "";
  let consumercodes = "";

  if (BusinessService === "WS")
    response?.data?.WaterConnection?.forEach((item) => {
      propertyids += item?.propertyId + ",";
      consumercodes += item?.connectionNo + ",";
    });
  else
    response?.data?.SewerageConnections?.forEach((item) => {
      propertyids += item?.propertyId + ",";
      consumercodes += item?.connectionNo + ",";
    });

  let propertyfilter = { propertyIds: propertyids.slice(0, -1) };
  if (propertyids !== "" && filters?.locality) propertyfilter.locality = filters?.locality;
  config = { ...config, enabled: propertyids !== "" };

  const properties = useQuery(
    ["WSP_SEARCH", tenantId, propertyfilter, BusinessService, config],
    async () =>
      await PTService.search({ tenantId, filters: propertyfilter, auth: filters?.locality ? false : true }),
    { ...config }
  );
const billData = []
  // const billData =  useQuery(
  //   ["BILL_SEARCH", tenantId, consumercodes, BusinessService, config],
  //   async () =>
  //     await Digit.PaymentService.fetchBill(tenantId, {
  //       businessService: BusinessService,
  //       consumerCode: consumercodes.slice(0, -1),
  //     }),
  //   { ...config }
  // );

  const isLoading = response.isLoading || properties.isLoading //|| billData.isLoading;

  // ✅ Recompute when any data updates
  const data = !isLoading
    ? combineResponse(response?.data?.WaterConnection, properties?.data?.Properties, billData?.data?.Bill, t)
    : undefined;

  return {
    isLoading,
    isSuccess: response.isSuccess && properties.isSuccess,//&& billData.isSuccess,
    isError: response.isError || properties.isError, //|| billData.isError,
    data,
  };
};

export default useWaterSearch;
