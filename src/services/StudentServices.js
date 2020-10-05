//import axios from "axios";
import {apiClient} from "./apiClient.js";
/*
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
*/
export default {
  getStudents() {
    return apiClient.get("students");
  },

  getStudent(id) {
    return apiClient.get("students/" + id);
  },
  addStudent(student) {
    return apiClient.post("students/", student);
  },
  updateStudent(student) {
    return apiClient.put("students/" + student.id, student);
  },
  deleteStudent(id) {
    return apiClient.delete("students/" + id);
  }

};