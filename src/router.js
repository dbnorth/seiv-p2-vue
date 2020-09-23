import Vue from "vue";
import Router from "vue-router";
import CourseList from "./views/course-list.vue";
import CourseEdit from "./views/course-edit.vue";
import CourseAdd from "./views/course-add.vue";
import StudentList from "./views/student-list.vue";
import StudentEdit from "./views/student-edit.vue";
import StudentAdd from "./views/student-add.vue";
import Main from "./views/courseplan-main.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.NODE_ENV === "development" ? "/" : "/courses/",


  routes: [{
      path: "/",
      name: "main",
      component: Main
    },
    {
      path: "/course-list",
      name: "courselist",
      component: CourseList
    },
    {
      path: "/course-edit/:id",
      name: "courseedit",
      component: CourseEdit,
      props: true
    },
    {
      path: "/course-add",
      name: "courseadd",
      component: CourseAdd
    },
    {
      path: "/student-list",
      name: "studentlist",
      component: StudentList
    },
    {
      path: "/student-edit/:id",
      name: "studentedit",
      component: StudentEdit,
      props: true
    },
    {
      path: "/student-add",
      name: "studentadd",
      component: StudentAdd
    }


    /*
    {
      path: '*',
      component: NotFondComponent
    }
    */
  ]
});