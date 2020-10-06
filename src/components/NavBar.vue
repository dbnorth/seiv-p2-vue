<template>
    <v-app>
      <template v-if="isAdmin">
        <v-app-bar app color="primary" dark>
            <v-toolbar-title>Course Plan (logged in as {{user.user}})</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn to="/" color="white" text rounded>Home</v-btn>
            <v-btn to="/logout" color="white" text rounded>Logout</v-btn>
            <v-btn :to="{ name :'advisoredit', params: {id: user.advisorId }}" color="white" text rounded>Advisor</v-btn>
            <v-btn to="/student-list" color="white" text rounded>Students</v-btn>
            <v-btn to="/advisor-list" color="white" text rounded>Advisors</v-btn>
            <v-btn to="/course-list" color="white" text rounded>Courses</v-btn>
            <v-btn to="/semester-list" color="white" text rounded>Semesters</v-btn>
            <v-btn to="/degree-list" color="white" text rounded>Degrees</v-btn>
        </v-app-bar>
      </template>
      <template v-else-if="isStudent">
          <v-app-bar app color="primary" dark>
            <v-toolbar-title>Course Plan (logged in as {{user.user}})</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn to="/" color="white" text rounded>Home</v-btn>
            <v-btn to="/logout" color="white" text rounded>Logout</v-btn>
            <v-btn :to="{ name :'studentedit', params: {id: user.studentId }}" color="white" text rounded>Student</v-btn>
            <v-btn :to="{ name :'studentcourselist', params: {id: user.studentId }}"  color="white" text rounded>Course Plan</v-btn>
          </v-app-bar>
      </template>
      <template v-else-if="isAdvisor">
          <v-app-bar app color="primary" dark>
            <v-toolbar-title>Course Plan (logged in as {{user.user}})</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn to="/" color="white" text rounded>Home</v-btn>
            <v-btn to="/logout" color="white" text rounded>Logout</v-btn>
            <v-btn to="/student-list" color="white" text rounded>Students</v-btn>
            <v-btn :to="{ name :'advisoredit', params: {id: user.advisorId }}" color="white" text rounded>Advisor</v-btn>
          </v-app-bar>
        </template>
        <template v-else-if= "!isLoggedIn">
          <v-app-bar app color="primary" dark>
            <v-toolbar-title>Course Plan</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn to="/" color="white" text rounded>Home</v-btn>
            <v-btn to="/login" color="white" text rounded>Login</v-btn>
          </v-app-bar>
        </template>
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import {getStore}  from '@/config/utils';
export default {
    name: 'App',

    data: () => ({
        isAdmin : false,
        isStudent : false,
        isAdvisor : false,
        isLoggedIn : true,
        user : {}
    }),
    created () {
      this.user = getStore('user');
     
      if (this.user!= null)
      {
        if (this.user.roles == "Advisor") this.isAdvisor = true;
        if (this.user.roles == "Admin") this.isAdmin = true;
        if (this.user.roles == "Student") this.isStudent = true;
        if (this.isAdvisor || this.isAdmin || this.isStudent) this.isLoggedIn=false;
      }
      else this.isLoggedIn=false;



    }
};
</script>
