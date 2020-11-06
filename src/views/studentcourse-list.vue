<template>
    <v-container>
        <v-row>
            <v-col>
                <H1>Student Course Plan</H1>
               <h3>{{message}}</h3>

                <H2>{{student.firstName}} {{student.lastName}}   Hours: {{totalHours}}   GPA: {{gpa}}   Major: {{degree}}   Major Hours: {{majorHours}}</H2>
                <v-btn :to="{ name:'studentcourseadd', params: { id: id }}" color="info"  rounded>Add</v-btn>
                <v-btn v-on:click="generatePDF" color="info"  rounded>PDF</v-btn>
                <SemesterCourse v-for="semesterCourse in semesterCourses" :key="semesterCourse[0].code" :studentCourses="semesterCourse" />
               
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import StudentServices from '@/services/StudentServices.js';
import StudentCourseServices from '@/services/StudentCourseServices.js';
import DegreeCourseServices from '@/services/DegreeCourseServices.js';
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
            degreeCourses : [],
            totalHours : 0,
            majorHours : 0,
            degree:"",
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
        calcMajorHours() {
          this.majorHours = 0;

          this.studentCourses.filter(studentCourse => this.degreeCourses.includes(studentCourse.courseId))
            .forEach(studentCourse => { this.majorHours += studentCourse.course.hours;});
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
         var img = new Image();

 //       img.src = "../assets/oc-logo-white.png";  
          img.src = "data:image/png;base64,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"

          doc.addImage(img,"PNG", .4, .78, .975,.56);

          let asof = "as of " + new Date(Date.now()).toLocaleDateString();
          let totalInfo = "Hours: "+this.totalHours+"  GPA: "+this.gpa;
          let degreeInfo = "Major : "+this.student.degree.description+" Hours :"+this.majorHours;
          let footer = "Course Plan for " + this.student.firstName +" "+this.student.lastName+" "+ asof;
          // text is placed using x, y coordinates
          doc.setFontSize(16).text("Course Plan for " + this.student.firstName +" "+this.student.lastName+"       Advisor: "+this.student.advisor.lastName, 1.5, 1.0);
          doc.setFontSize(12).text(asof, 1.5, 1.2);
          doc.setFontSize(12).text(totalInfo, 1.5, 1.4);
          doc.setFontSize(12).text(degreeInfo, 1.5, 1.6);

          // create a line under heading 
          doc.setLineWidth(0.01).line(.5, 1.7, 8.0, 1.7);
          // Using autoTable plugin
          let finalY = 1.8;
          let page = 1;
          doc.setFontSize(10).text(footer,.5, doc.internal.pageSize.height - .5)
          this.semesterCourses.forEach(semester => {
            let pdfCourses = [];
            if(finalY>8.5) {
              doc.addPage();
              doc.setPage(page+1);
              finalY = .5;
              doc.setFontSize(10).text(footer,.5, doc.internal.pageSize.height - .5)
            }
            semester.forEach(function (studentCourse) {
              let course ={};
              course.semester=studentCourse.semester.code;
              course.number=studentCourse.course.number;
              course.name=studentCourse.course.name;
              course.grade=studentCourse.grade;
              pdfCourses.push(course);
            });
          let semesterCode = pdfCourses[0].semester;   
          doc.setFontSize(14).text(semesterCode,.5,finalY + .3);
          doc.autoTable({
            columns,
            headStyles: {
              fillColor: [129, 20, 41],
              fontSize: 11
            },
            startY: finalY+.4,
            body: pdfCourses,
            margin: { left: .5, top: 1.5 }
          });
          finalY = doc.previousAutoTable.finalY; //this gives you the value of the end-y-axis-position of the previous autotable.

          
      })
          // Creating footer and saving file


 
          doc.save(`courseplan.pdf`); 
   
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
                console.log(this.student);
                this.degree = this.student.degree.description;
            })
            .catch(error => {
                console.log("getStudent"+error)
                this.message = error.response.data.message;
            });
        let semesters =[];

        await DegreeCourseServices.getDegreeCoursesForDegree(this.student.degreeId)
            .then(response => {
              let dc = response.data;
              dc.forEach(degreeCourse => this.degreeCourses.push(degreeCourse.courseId));
            })
            .catch(error => {
                this.message = error.response.data.message;
            });

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
            this.calcMajorHours()
          
    }

  }

</script>


