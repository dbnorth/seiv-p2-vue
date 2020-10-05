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
    "Access-Control-Allow-Origin": "*",
    crossDomain: true
  }
});
export default {
  getCourses() {
    return apiClient.get("courses");
  },
  getCoursesForDept(dept) {
    return apiClient.get("courses?dept=" + dept);
  },
  getCourse(id) {
    return apiClient.get("courses/" + id);
  },
  addCourse(course) {
    return apiClient.post("courses/", course);
  },
  updateCourse(course) {
    return apiClient.put("courses/" + course.id, course);
  },
  deleteCourse(id) {
    return apiClient.delete("courses/" + id);
  }

};