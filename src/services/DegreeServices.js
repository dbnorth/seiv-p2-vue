import {apiClient} from "./apiClient.js";

export default {
  getDegrees() {
    return apiClient.get("degrees");
  },

  getDegree(id) {
    return apiClient.get("degrees/" + id);
  },
  addDegree(degree) {
    return apiClient.post("degrees/", degree);
  },
  updateDegree(degree) {
    return apiClient.put("degrees/" + degree.id, degree);
  },
  deleteDegree(id) {
    return apiClient.delete("degrees/" + id);
  }

};