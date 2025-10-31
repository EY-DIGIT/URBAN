import { useQuery } from "react-query";
import download from "../../services/molecules/DEATH/DownloadCertificateActions";

const useDownloadActions = ({ tenantId, filters, auth, config = {} }) => {
    return useQuery(
        ["DEATH_DOWNLOAD", tenantId, filters],
        () => download({ tenantId, filters, auth }),
        {
            ...config,
        }
    );
};

export default useDownloadActions;
