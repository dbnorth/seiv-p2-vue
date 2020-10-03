import axios from "axios";
var baseurl;
if (process.env.NODE_ENV === "development") {
  baseurl = "http://localhost/api/";
} else {
  baseurl = "/api/";
}
const apiClient = axios.create({
  baseURL: baseurl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    crossDomain: true
  }
});
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