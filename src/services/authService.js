import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://trac.nest.gov.tt/apicall/test/v1/coreeid/keycloak/token";
const API_KEY = "95bW5t13453paJaPQE";

export const authenticateUser = async (identtNumber) => {

  const payload = new URLSearchParams();
  payload.append("grant_type", "password");
  payload.append("client_id", "Citizen-Client");
  payload.append("client_secret", "bPBzkC38c3q54nVnXAcrO8RZqDFubpJW");
  payload.append("username", identtNumber);
  payload.append("password", "password");
  payload.append("appname", "SBW-VENDOR");

  try {
    console.log("🚀 Sending authentication request to API...for token");
    
    const response = await axios.post(BASE_URL, payload.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "apikey": API_KEY,
      },
    });

    console.log("✅ API Response received. Status: for token", response.status);

    const accessToken = response.data.access_token;

    if (accessToken) {
      console.log("🔑 Access Token Received: from api");
    } else {
      console.warn("⚠️ No Access Token found in response.");
    }

    return response.data;
  } catch (error) {
    console.error("❌ Authentication Failed. Error:", error.response?.data || error.message);
    throw error;
  }
};
