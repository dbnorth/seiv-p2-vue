<template>
    <v-container>
        <v-row>
            <v-col>
                <H1>Student Course Plan</H1>
               <h3>{{message}}</h3>

                <H2>{{student.firstName}} {{student.lastName}} Hours : {{totalHours}} GPA : {{gpa}}</H2>
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
            totalHours : 0,
            gpa : 0,
            grades :[],
            message: 'Enter click on course to edit'
        };
    },
    methods: {

        calcTotalHours() {
          this.totalHours = 0;
          this.studentCourses.forEach(studentCourse => { this.totalHours += studentCourse.course.hours});
        },
        calcGPA() {
          let totalHours = 0;
          let totalPoints = 0;
          this.studentCourses.forEach(studentCourse => { 
            totalHours += studentCourse.course.hours;
            totalPoints += studentCourse.course.hours * this.grades[studentCourse.grade];
            console.log(this.grades[studentCourse.grade])
            });
          if (totalHours == 0) {
            this.gpa=0;
            this.gpa.toPrecision(3);
          }
          else {
            console.log(totalPoints);
            console.log(totalHours);
            this.gpa = totalPoints/totalHours;
            this.gpa = this.gpa.toPrecision(3);
          }
          
        },
    },

   async created() {
        this.grades["A"] = 4;
        this.grades["B"] = 3;
        this.grades["C"] = 2;
        this.grades["D"] = 1;
        this.grades["F"] = 0;
        this.grades["IP"] = 0;
        this.grades["TE"] = 0;
        this.grades["EN"] = 0;
        this.grades["PL"] = 0;
        await StudentServices.getStudent(this.id)
            .then(response => {
                this.student = response.data; 
                console.log()
            })
            .catch(error => {
                this.message = error.response.data.message;
            });
        let semesters =[];
        await StudentCourseServices.getStudentCoursesForStudent(this.id) 
            .then(response => {
              this.studentCourses = response.data;
              this.studentCourses.sort(function(a, b) {
                  if (a.semester.startDate<b.semester.startDate) return -1;
                  else if (a.semester.startDate<b.semester.startDate) return 1;
                  return 0
              }
              );
              
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
            this.calcTotalHours();
            this.calcGPA();
    }
}
</script>

<style></style>
