<template>
 <div>
      <template v-if="isAdmin">
        <v-app-bar app color="primary" dark>
            <v-toolbar-title ref="toolbar-title">Course Plan (logged in as {{user.user}})</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn ref="home" to="/" color="white" text rounded>Home</v-btn>
            <v-btn ref="logout" to="/logout" color="white" text rounded>Logout</v-btn>
            <v-btn ref="advisor-edit" :to="{ name :'advisoredit', params: {id: user.advisorId }}" color="white" text rounded>Advisor</v-btn>
            <v-btn ref="student-list" to="/student-list" color="white" text rounded>Students</v-btn>
            <v-btn ref="advisor-list" to="/advisor-list" color="white" text rounded>Advisors</v-btn>
            <v-btn ref="course-list" to="/course-list" color="white" text rounded>Courses</v-btn>
            <v-btn ref="semester-list" to="/semester-list" color="white" text rounded>Semesters</v-btn>
            <v-btn ref="degree-list" to="/degree-list" color="white" text rounded>Degrees</v-btn>
        </v-app-bar>
      </template>
      <template v-else-if="isStudent">
          <v-app-bar app color="primary" dark>
            <v-toolbar-title>Course Plan (logged in as {{user.user}})</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn ref="home" to="/" color="white" text rounded>Home</v-btn>
            <v-btn ref="logout" to="/logout" color="white" text rounded>Logout</v-btn>
            <v-btn ref="student-edit":to="{ name :'studentedit', params: {id: user.studentId }}" color="white" text rounded>Student</v-btn>
            <v-btn ref="studentcourse-list":to="{ name :'studentcourselist', params: {id: user.studentId }}"  color="white" text rounded>Course Plan</v-btn>
          </v-app-bar>
      </template>
      <template v-else-if="isAdvisor">
          <v-app-bar app color="primary" dark>
            <v-toolbar-title>Course Plan (logged in as {{user.user}})</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn ref="home" to="/" color="white" text rounded>Home</v-btn>
            <v-btn ref="logout" to="/logout" color="white" text rounded>Logout</v-btn>
            <v-btn ref="advisor-edit" :to="{ name :'advisoredit', params: {id: user.advisorId }}" color="white" text rounded>Advisor</v-btn>
            <v-btn ref="student-list" to="/student-list" color="white" text rounded>Students</v-btn>
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
</div>
</template>

<script>
import Utils from '@/utils/utils';
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
     
      this.user = Utils.getStore('user');

      if (this.user!= null)
      {
        if (this.user.roles == "Advisor") this.isAdvisor = true;
        if (this.user.roles == "Admin") this.isAdmin = true;
        if (this.user.roles == "Student") this.isStudent = true;
        if (this.isAdvisor || this.isAdmin || this.isStudent) this.isLoggedIn=true;
      }
      else this.isLoggedIn=false;
    }
};
</script>
