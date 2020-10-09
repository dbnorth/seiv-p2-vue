<template>
<div>
  <h2>Semester {{semester}}</h2>
  <v-data-table
      :headers="headers"
      :items="studentCourses"
      :items-per-page="10"
      class="elevation - 1"
      @click:row="selectRow"
  >
  </v-data-table>
  </div>
</template>
<script>
export default {
  props: {
    studentCourses :[]
  },
  data() {
        return { 
            semester :{},         
            headers: [
                {
                    text: 'Semester',
                    align: 'left',
                    sortable: true,
                    value: "semester.code",
                },
                {
                    text: 'Course',
                    value: 'course.number',
                    align: 'left',
                    sortable: false,
                },
                {
                    text: 'Grade',
                    value: 'grade',
                    align: 'left',
                    sortable: false,
                },
              
            ],
            message: 'Enter click on course to edit'
        };
    },
    created (){
      this.semester = this.studentCourses[0].semester.code;
    },
    methods: {
        selectRow(event) {
            let id = event.id;
            this.$router.push({ name: 'studentcourseedit', params: { id: id } });
        }
        
  
}
}
</script>