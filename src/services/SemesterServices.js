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
  getSemesters() {
    return apiClient.get("semesters");
  },

  getSemester(id) {
    return apiClient.get("semesters/" + id);
  },
  addSemester(semester) {
    return apiClient.post("semesters/", semester);
  },
  updateSemester(semester) {
    return apiClient.put("semesters/" + semester.id, semester);
  },
  deleteSemester(id) {
    return apiClient.delete("semesters/" + id);
  }

};