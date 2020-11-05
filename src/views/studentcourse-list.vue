<template>
    <v-container>
        <v-row>
            <v-col>
                <H1>Student Course Plan</H1>
               <h3>{{message}}</h3>

                <H2>{{student.firstName}} {{student.lastName}} Hours : {{totalHours}} GPA : {{gpa}}</H2>
                <v-btn :to="{ name:'studentcourseadd', params: { id: id }}" color="black" text rounded>Add</v-btn>
                <v-btn v-on:click="generatePDF" color="black" text rounded>PDF</v-btn>
                <SemesterCourse v-for="semesterCourse in semesterCourses" :key="semesterCourse[0].code" :studentCourses="semesterCourse" />
               
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import StudentServices from '@/services/StudentServices.js';
import StudentCourseServices from '@/services/StudentCourseServices.js';
import SemesterCourse from '@/components/SemesterCourse';

import jsPDF from 'jspdf'
import 'jspdf-autotable'

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
            gpaGrades : ['A','B','C','D','F'], 
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
          this.studentCourses.filter(studentCourse => this.gpaGrades.includes(studentCourse.grade)).forEach(studentCourse => { 

            totalHours += studentCourse.course.hours;
            totalPoints += studentCourse.course.hours * this.grades[studentCourse.grade];
            });
          if (totalHours == 0) {
            this.gpa=0;
            this.gpa.toPrecision(3);
          }
          else {

            this.gpa = totalPoints/totalHours;
            this.gpa = this.gpa.toPrecision(3);
          }
          
        },
      generatePDF() {
          console.log("gen pdf");
          const columns = [
            { title: "Semester", dataKey: "semester" },
            { title: "Number", dataKey: "number" },
            { title: "Name", dataKey: "name" },
            { title: "Grade", dataKey: "grade" }
          ];

          const doc = new jsPDF({
            orientation: "portrait",
            unit: "in",
            format: "letter"
          });
//         var img = new Image()
//          img.src = 'assets/oc-logo.png'
//          doc.addImage(img, 'PNG', 5, 5, 212, 150);
          let asof = "as of " +  new Date(Date.now()).toLocaleDateString();
          console.log("GPA: "+ this.calcGPA());
          let totalInfo = "Hours: "+this.totalHours+" GPA: "+this.gpa;
          // text is placed using x, y coordinates
          doc.setFontSize(16).text("Course Plan for " + this.student.firstName +" "+this.student.lastName, 0.5, 1.0);
          doc.setFontSize(12).text(asof, 0.5, 1.2);
          doc.setFontSize(12).text(totalInfo, 0.5, 1.4);

          // create a line under heading 
          doc.setLineWidth(0.01).line(0.5, 1.5, 8.0, 1.5);
          // Using autoTable plugin
          let finalY = 1.6;
          this.semesterCourses.forEach(semester => {
            let pdfCourses = [];
            semester.forEach(function (studentCourse) {
              let course ={};
              course.semester=studentCourse.semester.code;
              course.number=studentCourse.course.number;
              course.name=studentCourse.course.name;
              course.grade=studentCourse.grade;
              pdfCourses.push(course);
            });
          let semesterCode = pdfCourses[0].semester;   
          doc.setFontSize(14).text(semesterCode,0.5,finalY + .3);
          doc.autoTable({
            columns,
            startY: finalY+.4,
            body: pdfCourses,
            margin: { left: 0.5, top: 1.5 }
          });
          finalY = doc.previousAutoTable.finalY; //this gives you the value of the end-y-axis-position of the previous autotable.
          
      })

          
          // Creating footer and saving file
          let footer = "Course Plan for " + this.student.firstName +" "+this.student.lastName;
          doc
            .setFont("times")
            .setFontSize(11)
            .text(
              footer,
              0.5,
              doc.internal.pageSize.height - 0.5
            )
            .save(`courseplan.pdf`);
        }
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


