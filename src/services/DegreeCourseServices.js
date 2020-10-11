import {apiClient} from "./apiClient.js";

export default {
  getDegreeCourses() {
    return apiClient.get("degreecourses");
  },
  getDegreeCoursesForCourse(id) {
    return apiClient.get("degreecourses?course=" + id);
  },
  getDegreeCourse(id) {
    return apiClient.get("degreecourses/" + id);
  },
  addDegreeCourse(degreeCourse) {
    return apiClient.post("degreecourses/", degreeCourse);
  },
  updateDegreeCourse(degreeCourse) {
    return apiClient.put("degreecourses/" + degreeCourse.id, degreeCourse);
  },
  deleteAllDegreeCourseForCourse(id) {
    return apiClient.delete("degreecourses?course=" + id);
  },
  deleteDegreeCourse(id) {
    return apiClient.delete("degreecourses/" + id);
  }

};