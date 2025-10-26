import { useQuery } from "react-query";
import { MdmsService } from "../../services/elements/MDMS";

const useNamantaranTypeMDMS = (tenantId, moduleCode, type, config = {}) => {

  console.log("SETPPPPP===22");

    const useNamantaranTypeDetails = () => {
          console.log("SETPPPPP===2222");
    return useQuery("PT_NamantaranType_DETAILS", () => MdmsService.getNamantaranTypeType(tenantId, moduleCode ,type), config);
  };

  switch (type) {
      case "NamantaranType":
      return useNamantaranTypeDetails();
  }
};



export default useNamantaranTypeMDMS;
