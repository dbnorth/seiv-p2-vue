import {apiClient} from "./apiClient.js";

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