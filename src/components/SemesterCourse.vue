<template>
<div>
  <h3>Semester {{semester}} hours: {{calcHours()}} GPA: {{gpa()}}</h3>
  <v-data-table
      :headers="headers"
      :items="studentCourses"
      hide-default-footer
      class="elevation - 1"
      mobile-breakpoint="0"
      @click:row="selectRow"
  >
  </v-data-table>
  </div>
</template>
<script>
export default {
  props: {
    studentCourses :{}
  },
  data() {
        return { 
            semester :{},
            grades : [], 
            gpaGrades : ['A','B','C','D','F'],  
            headers: [

                {
                    text: 'Number',
                    value: 'course.number',
                    align: 'left',
                    sortable: false,
                    width: "1%"
                },
                                {
                    text: 'Course',
                    value: 'course.name',
                    align: 'left',
                    sortable: false,
                    width: "1%"
                },
                {
                    text: 'Grade',
                    value: 'grade',
                    align: 'left',
                    sortable: false,
                    width: "1%"
                },
                {
                    text: 'Note',
                    value: 'note',
                    align: 'left',
                    sortable: false,
                    width: "1%"
                },
              
            ],
            message: 'Enter click on course to edit'
        };
    },
    created (){
      this.semester = this.studentCourses[0].semester.code;
      let semesterCode = null;
      if (this.semester.length == 3) 
        semesterCode = this.semester.substring(0,1);
      else
        semesterCode = this.semester.substring(0,2);

      this.grades['A'] = 4;
      this.grades['B'] = 3;
      this.grades['C'] = 2;
      this.grades['D'] = 1;
      this.grades['F'] = 0;
      this.grades['TE'] = 0;
      this.grades['IP'] = 0;
      this.grades['PL'] = 0;
      this.studentCourses.forEach(studentCourse => {
        if (studentCourse.course.semestersOffered != null) {
          if (!studentCourse.course.semestersOffered.includes(semesterCode)) 
            studentCourse.note = "Not Offerd - only "+studentCourse.course.semestersOffered
          }
      })
 
    },

    methods: {
        selectRow(event) {
            let id = event.id;
            this.$router.push({ name: 'studentcourseedit', params: { id: id } });
        },
        calcHours() {
          let totalHours = 0;
          this.studentCourses.forEach(element => {totalHours+=element.course.hours});
          return totalHours;
          },
        gpa() {
          let gpaHours = 0;
          let totalPoints = 0;
          this.studentCourses.filter(studentCourse => this.gpaGrades.includes(studentCourse.grade)).forEach(element => {
            gpaHours+=element.course.hours;
            totalPoints+= this.grades[element.grade] * element.course.hours;
          })
          if (gpaHours == 0)  
            return 0;
          else
            return (totalPoints/gpaHours).toPrecision(3);
          }

    }
}

</script>