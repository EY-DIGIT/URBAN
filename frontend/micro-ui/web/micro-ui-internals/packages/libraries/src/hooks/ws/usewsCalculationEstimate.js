import {WSService} from "../../services/elements/WS";
import { useMutation } from "react-query";

const usewsCalculationEstimate = (tenantId, config = {}) => {
  return useMutation((data) => WSService.wsCalculationEstimate(data, tenantId));
};

export default usewsCalculationEstimate;
