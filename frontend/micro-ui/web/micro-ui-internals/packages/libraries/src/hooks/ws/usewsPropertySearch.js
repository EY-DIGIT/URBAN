import {WSService} from "../../services/elements/WS";
import { useMutation } from "react-query";

const usewsPropertySearch = (tenantId, config = {}) => {
  return useMutation((data) => WSService.WSPropertysearch(data, tenantId));
};

export default usewsPropertySearch;
