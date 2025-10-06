import { useQuery } from "react-query";
import { MdmsService } from "../../services/elements/MDMS";

const useSideMenuMDMS = (tenantId, moduleCode, type, config = {}) => {

  console.log("SETPPPPP===88");

    const useSideMenuDetails = () => {
    return useQuery("PT_SideMenu_DETAILS", () => MdmsService.getSideMenuType(tenantId, moduleCode ,type), config);
  };

  switch (type) {
      case "SideMenu":
      return useSideMenuDetails();
  }
};



export default useSideMenuMDMS;
