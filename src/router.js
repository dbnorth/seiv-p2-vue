import Vue from "vue";
import Router from "vue-router";
import List from "./views/course-list.vue";
import Edit from "./views/course-edit.vue";
import Delete from "./views/course-delete.vue";
import Add from "./views/course-add.vue";


Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.NODE_ENV === "development" ? "/" : "",
  // "/webpages/todoapp-vue2/dist/",

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
    },
    {
      path: "/delete/:id",
      name: "delete",
      component: Delete,
      props: true
    }

    /*
    {
      path: '*',
      component: NotFondComponent
    }
    */
  ]
});