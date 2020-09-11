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
  getCourses() {
    return apiClient.get("courses");
  },
  getCourses(id) {
    return apiClient.get("courses/" + id);
  },
  addCourse(course) {
    return apiClient.post("courses/", list);
  },
  updateCourse(course) {
    return apiClient.put("courses/" + list.id, list);
  },
  deleteCourse(id) {
    return apiClient.delete("courses/" + id);
  }

};