import { useQuery } from "react-query";
import { MdmsService } from "../../services/elements/MDMS";

const useSalutationsHindiMDMS = (tenantId, moduleCode, type, config = {}) => {
  const useSalutationsHindiDetails = () => {
    return useQuery("PT_SalutationsHindi_DETAILS", () => MdmsService.getSalutationsHindiType(tenantId, moduleCode ,type), config);
  };
  

  switch (type) {
    case "SalutationsHindi":
      return useSalutationsHindiDetails();
  }
};

export default useSalutationsHindiMDMS;
