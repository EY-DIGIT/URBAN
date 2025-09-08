import { useQuery } from "react-query";
import { MdmsService } from "../../services/elements/MDMS";

const usePropertyCategoryMDMS = (tenantId, moduleCode, type, config = {}) => {

  console.log("SETPPPPP===2");

    const usePropertyCategoryDetails = () => {
    return useQuery("PT_PropertyCategory_DETAILS", () => MdmsService.getPropertyCategoryType(tenantId, moduleCode ,type), config);
  };

  switch (type) {
      case "PropertyCategory":
      return usePropertyCategoryDetails();
  }
};



export default usePropertyCategoryMDMS;
