import {apiClient} from "./apiClient.js";

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