import { PTService } from "../../services/elements/PT";
import { useMutation } from "react-query";

const usePtMutationCalculationEstimate = (tenantId, config = {}) => {
  return useMutation((data) => PTService.ptMutationEstimate(data, tenantId));
};

export default usePtMutationCalculationEstimate;
