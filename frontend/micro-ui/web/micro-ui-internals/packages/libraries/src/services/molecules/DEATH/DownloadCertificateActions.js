import { DeathService } from "../../elements/Death";

const download = async ({ tenantId, filters, auth }) => {
  try {
    const response = await DeathService.download({ tenantId, filters, auth });
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.Errors?.[0]?.message || "Death certificate download failed");
  }
};

export default download;
