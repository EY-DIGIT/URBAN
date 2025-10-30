import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

export const DeathService = {
    create: (details, tenantId) => {

        return Request({
            url: Urls.death.create,
            data: details,
            useCache: false,
            setTimeParam: false,
            userService: true,
            method: "POST",
            params: { tenantId },
            auth: true,
        });
    },

    search: ({ tenantId, filters, auth }) =>
        Request({
            url: Urls.death.search,
            useCache: false,
            method: "POST",
            auth: auth === false ? auth : true,
            userService: auth === false ? auth : true,
            params: { tenantId, ...filters },
        }),

    update: (details, tenantId) =>
        Request({
            url: Urls.death.update,
            data: details,
            useCache: false,
            setTimeParam: false,
            userService: true,
            method: "POST",
            params: { tenantId },
            auth: true,
        }),

    download: ({ tenantId, filters, auth }) =>
        Request({
            url: Urls.death.download,
            useCache: false,
            method: "POST",
            auth: auth === false ? auth : true,
            userService: auth === false ? auth : true,
            params: { tenantId, ...filters },
        }),
};