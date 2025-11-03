import { WSService } from "../../elements/WS";
import { PTService } from "../../elements/PT";
import { PaymentService } from "../../elements/Payment";
import { MdmsService } from "../../elements/MDMS";
import { WorkflowService } from "../../elements/WorkFlow";
import cloneDeep from "lodash/cloneDeep";
import React from "react";
export const WSSearch = {
  application: async (tenantId, filters = {}, serviceType) => {
      const response = await WSService.search({ tenantId, filters: { ...filters }, businessService: serviceType === "WATER" ? "WS" : "SW" });
      return response;
    },
  applicationDetails: async (t, tenantId, applicationNumber, serviceType = "WATER", userInfo, config = {}) => {

    const filters = { applicationNumber };
    let Employee = true
    if (userInfo?.info?.mobileNumber && userInfo?.info?.type === "CITIZEN") {
      filters.mobileNumber = userInfo?.info?.mobileNumber;
      Employee = false
    }

    const response = await WSSearch.application(tenantId, filters, serviceType);
    const appSessionDetails = sessionStorage.getItem("WS_SESSION_APPLICATION_DETAILS");
    const wsApplicationDetails = appSessionDetails ? JSON.parse(appSessionDetails) : "";
    if (
      response?.WaterConnection?.[0] &&
      wsApplicationDetails?.applicationType &&
      wsApplicationDetails?.applicationNo == response?.WaterConnection?.[0]?.applicationNo
    ) {
      response.WaterConnection[0] = wsApplicationDetails;
    }



    const wsData = cloneDeep(serviceType == "WATER" ? response?.WaterConnection : response?.SewerageConnections);
    const wsDataDetails = cloneDeep(wsData?.[0]);   
    //for edit in DV and FI : reloading after unmasking
    sessionStorage.removeItem("IsDetailsExists");

    return {
      applicationData: wsDataDetails,
      tenantId: wsDataDetails?.tenantId,
      applicationNo: wsDataDetails?.applicationNo,
      applicationStatus: wsDataDetails?.applicationStatus,
      // billDetails: billDetails?.Bill,

    };
  },


};
