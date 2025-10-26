import {WSService} from "../../services/elements/WS";
import { useMutation } from "react-query";

const usewsupdatestatus = (tenantId, config = {}) => {
  return useMutation((data) => WSService.wsUpdatestatus(data, tenantId));
};

export default usewsupdatestatus;
