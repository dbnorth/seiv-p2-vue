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
  getStudentCourses() {
    return apiClient.get("studentcourses");
  },
  getStudentCoursesForStudent(id) {
    return apiClient.get("studentcourses?student=" + id);
  },

  getStudentCourse(id) {
    return apiClient.get("studentcourses/" + id);
  },
  addStudentCourse(studentCourse) {
    return apiClient.post("studentcourses/", studentCourse);
  },
  updateStudentCourse(studentCourse) {
    return apiClient.put("studentcourses/" + studentCourse.id, studentCourse);
  },
  deleteStudentCourse(id) {
    return apiClient.delete("studentcourses/" + id);
  }

};