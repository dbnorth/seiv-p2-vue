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