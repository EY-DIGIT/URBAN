import React from "react";
import { useTranslation } from "react-i18next";
import { useParams ,useLocation} from "react-router-dom";
import EditForm from "./EditForm";
import * as func from "../../../utils";
const EditApplication = () => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
   const location = useLocation();
  const { t } = useTranslation();
 // let { id: applicationNumber } = useParams();
  let filters = func.getQueryStringParams(location.search);
    //const applicationNumber = filters?.applicationNumber;
    const { id} = useParams();
    const applicationNumber = `${id}`;
let userinfo = JSON.parse(localStorage.getItem("user-info"));
  const { isLoading, data: applicationDetails } = Digit.Hooks.ws.useWSDetailsPage(t, tenantId, applicationNumber,"WATER",userinfo,{});
//   const [applicationDetails, setApplicationData] = useState({});  
//   useEffect(() => {
//   if(location.state?.applicationData){
//     setApplicationData(location.state.applicationData);
//     // refetch or reset any other state if needed
//   }
// }, [location.state]);
  return applicationDetails && !isLoading ? <EditForm applicationData={applicationDetails?.applicationData} tenantId={tenantId} /> : null;
};
export default EditApplication;
