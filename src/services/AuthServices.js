import {apiClient} from "./apiClient.js";

export default {

  login(authToken) {
    return apiClient.post("/auth/login/", authToken);
  }

};