<template>
    <v-container>
        <v-row>
            <v-col>
                <H1>Student Course Plan</H1>
               <h3>{{message}}</h3>

                <H2>{{student.firstName}} {{student.lastName}}</H2>
                <v-btn :to="{ name:'studentcourseadd', params: { id: id }}" color="black" text rounded>Add</v-btn>
                <SemesterCourse v-for="semester in semesterCourses" :key="semester" :studentCourses="semester" />
               
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import StudentServices from '@/services/StudentServices.js';
import StudentCourseServices from '@/services/StudentCourseServices.js';
import SemesterCourse from '@/components/SemesterCourse';


export default {
    name: 'semestercourse',
    components: {
      SemesterCourse
    },
    props :["id"],
    data() {
        return {
            student: {},
            studentCourses :[],
            semesterCourses : [],
            message: 'Enter click on course to edit'
        };
    },
    created() {
        StudentServices.getStudent(this.id)
            .then(response => {
                this.student = response.data; 
                console.log()
            })
            .catch(error => {
                this.message = error.response.data.message;
            });
        let semesters =[];
        StudentCourseServices.getStudentCoursesForStudent(this.id) 
            .then(response => {
              this.studentCourses = response.data;
              this.studentCourses.sort(function(a, b) {
                  if (a.semester.startDate<b.semester.startDate) return -1;
                  else if (a.semester.startDate<b.semester.startDate) return 1;
                  return 0
              }
              );
              console.log(this.studentCourses);
              this.studentCourses.forEach(function (studentCourse) {
                  if (!((semesters).includes(studentCourse.semester.code)))
                    semesters.push(studentCourse.semester.code)
                });

              semesters.forEach(function (semester) {
                this.semesterCourses.push(this.studentCourses.filter(studentCourse => studentCourse.semester.code==semester));
              },this);

            })
            .catch(error => {
                this.message = error.response.data.message;
            });
    }
}
</script>

<style></style>
