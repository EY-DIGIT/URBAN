import { useQuery } from "react-query";
import { MdmsService } from "../../services/elements/MDMS";

const useReasonForTransferMDMS = (tenantId, moduleCode, type, config = {}) => {

  console.log("SETPPPPP===22");

    const useReasonForTransferDetails = () => {
          console.log("SETPPPPP===2222");
    return useQuery("PT_ReasonForTransfer_DETAILS", () => MdmsService.getReasonForTransferType(tenantId, moduleCode ,type), config);
  };

  switch (type) {
      case "ReasonForTransfer":
      return useReasonForTransferDetails();
  }
};



export default useReasonForTransferMDMS;
