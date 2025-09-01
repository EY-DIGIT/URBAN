import { useQuery } from "react-query";
import { MdmsService } from "../../services/elements/MDMS";

const useRelationshipMDMS = (tenantId, moduleCode, type, config = {}) => {

    const useRelationshipDetails = () => {
    return useQuery("PT_Relationship_DETAILS", () => MdmsService.getRelationshipType(tenantId, moduleCode ,type), config);
  };

  switch (type) {
      case "Relationship":
      return useRelationshipDetails();
  }
};



export default useRelationshipMDMS;
