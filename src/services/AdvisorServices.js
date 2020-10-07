import {apiClient} from "./apiClient.js";

export default {
  getAdvisors() {
    return apiClient.get("advisors");
  },

  getAdvisor(id) {
    return apiClient.get("advisors/" + id);
  },
  addAdvisor(advisor) {
    return apiClient.post("advisors/", advisor);
  },
  updateAdvisor(advisor) {
    return apiClient.put("advisors/" + advisor.id, advisor);
  },
  deleteAdvisor(id) {
    return apiClient.delete("advisors/" + id);
  }

};