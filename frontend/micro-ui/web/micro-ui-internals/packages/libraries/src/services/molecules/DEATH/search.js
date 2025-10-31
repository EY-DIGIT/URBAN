import { DeathService } from "../../elements/Death";

const search = async ({ tenantId, filters, auth }) => {
  try {
    const response = await DeathService.search({ tenantId, filters, auth });
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.Errors?.[0]?.message || "Death record search failed");
  }
};

export default search;
