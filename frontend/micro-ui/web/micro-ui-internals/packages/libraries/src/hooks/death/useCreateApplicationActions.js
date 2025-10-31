import { useMutation } from "react-query";
import ApplicationCreateActions from "../../services/molecules/DEATH/ApplicationCreateActions";

const useCreateApplicationActions = (tenantId) => {
  return useMutation((applicationData) => ApplicationCreateActions(applicationData, tenantId));
};

export default useCreateApplicationActions;
