//import axios from "axios";
import {apiClient} from "./apiClient.js";

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