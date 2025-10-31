import { DeathService } from "../../elements/Death";

const ApplicationCreateActions = async (applicationData, tenantId) => {
  try {
    const response = await DeathService.create(applicationData, tenantId);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.Errors?.[0]?.message || "Death record creation failed");
  }
};

export default ApplicationCreateActions;
