import {apiClient} from "./apiClient.js";

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