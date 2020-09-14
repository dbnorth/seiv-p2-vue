import Vue from "vue";
import Router from "vue-router";
import List from "./views/course-list.vue";
import Edit from "./views/course-edit.vue";
import Add from "./views/course-add.vue";


Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.NODE_ENV === "development" ? "/" : "/courses/",


  routes: [{
      path: "/",
      name: "list",
      component: List
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: Edit,
      props: true
    },
    {
      path: "/add",
      name: "add",
      component: Add
    }


    /*
    {
      path: '*',
      component: NotFondComponent
    }
    */
  ]
});