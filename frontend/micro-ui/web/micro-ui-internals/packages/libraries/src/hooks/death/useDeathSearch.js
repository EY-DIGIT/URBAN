import { useQuery } from "react-query";
import search from "../../services/molecules/DEATH/search";

const useDeathSearch = ({ tenantId, filters, auth, config = {} }) => {
  return useQuery(
    ["DEATH_SEARCH", tenantId, filters],
    () => search({ tenantId, filters, auth }),
    {
      ...config,
    }
  );
};

export default useDeathSearch;
