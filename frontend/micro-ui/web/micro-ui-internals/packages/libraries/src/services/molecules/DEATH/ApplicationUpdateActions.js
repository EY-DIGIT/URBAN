import { DeathService } from "../../elements/Death";

const ApplicationUpdateActions = async (applicationData, tenantId) => {
  try {
    const response = await DeathService.update(applicationData, tenantId);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.Errors?.[0]?.message || "Death record update failed");
  }
};

export default ApplicationUpdateActions;
