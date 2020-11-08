<template>
<div>
      <v-app-bar  dark color="#811429" class="hidden-md-and-down">
        <v-img
          class="mx-2"
          src="../assets/oc-logo.png"
          max-height="40"
          max-width="40"
          contain
        ></v-img>
        <v-toolbar-title v-if=!user ref="toolbar-title">Course Plan - Hello {{user.user}}</v-toolbar-title>
        <v-toolbar-title v-if=user ref="toolbar-title">Course Plan - No user logged in</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
           <v-btn v-for="menu in activeMenus"  exact :key="menu.ref" :ref="menu.ref" link :to="{name:menu.name, params: {id:user.userId}}" :color="menu.color" text >{{menu.text}}</v-btn>
        </v-toolbar-items>
      </v-app-bar>
      
      <v-app-bar  dark color="#811429" class="hidden-lg-and-up">
        <v-img
          class="mx-2"
          src="../assets/oc-logo.png"
          max-height="40"
          max-width="40"
          contain></v-img>
        <v-toolbar-title ref="toolbar-title">Course Plan - Hello {{user.user}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon dark @click="drawer = !drawer" ></v-app-bar-nav-icon>
       </v-app-bar> 
        <v-navigation-drawer v-if="drawer" class="hidden-lg-and-up" 
              v-model="drawer" 
              permanent=drawer
              app 
              dark
              clipped-left
              :mini-variant.sync=$vuetify.breakpoint.smAndDown
              color="#811429">
            <v-list >
                <v-list-item  exact v-for="menu in activeMenus" :to="{name:menu.name, params: {id:user.userId}}" :color="menu.color"  :key="menu.text"  >
                  <v-list-item-action >
                    <v-icon v-if="menu.icon">{{menu.icon}}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title >{{ menu.text }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
      
</div>
</template>

<script>
import Utils from '@/utils/utils';
export default {

    name: 'App',

    data: () => ({
        drawer : false,
        user : {},
        menus : [ 
            {ref : 'home', name : "main", color : "white", text: 'Home', roles : "None,Admin,Advisor,Student" , icon: "mdi-home"},
            {ref : 'login', name : "login", color : "white", text: 'Login', roles : "None", icon : "mdi-login"},
            {ref : 'logout', name : "logout", color : "white", text: 'Logout', roles : "Admin,Advisor,Student", icon: "mdi-logout"},
            {ref : 'advisor-edit', name : "advisoredit", color : "white", text: 'Advisor', roles : "Admin,Advisor", icon : "mdi-account"},
            {ref : 'student-edit', name : "studentedit", color : "white", text: 'Student', roles : "Student", icon : "mdi-account"},
            {ref : 'student-list', name : "studentlist", color : "white", text: 'Students', roles : "Admin,Advisor", icon : "mdi-account-group"},
            {ref : 'advisor-list', name : "advisorlist", color : "white", text: 'Advisors', roles : "Admin", icon :"mdi-account-supervisor"},
            {ref : 'course-list',  name: "courselist", color : "white", text: 'Courses', roles : "Admin", icon : "mdi-bookshelf"},
            {ref : 'semester-list', name : "semesterlist", color : "white", text: 'Semesters', roles : "Admin", icon: "mdi-calendar"},
            {ref : 'degree-list', name : "degreelist", color : "white", text: 'Degrees', roles : "Admin", icon:"mdi-school"},
            {ref : 'studentcourse-list', name : "studentcourselist", color : "white", text: 'Course Plan', roles : "Student" , icon :"mdi-book-account"}
        ],
        activeMenus : []
    }),
    created () {
     
      this.user = Utils.getStore('user');
      if (this.user!= null)
      {
        this.activeMenus = this.menus.filter(menu => menu.roles.includes(this.user.roles));
      }
      else {

        this.activeMenus = this.menus.filter(menu => menu.roles.includes("None"));
        this.user = {advisorId: ''};

      }
    },
    methods: {
      menuAction(route) {
        this.$router.push({ name: route})
      }
    }


};
</script>
