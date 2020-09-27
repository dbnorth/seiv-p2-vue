<template>
    <v-container>
        <v-row>
            <v-col>
                <H1>Student Course List</H1>
                <H2>{{student.firstName}} {{student.lastName}}</H2>
                <v-btn :to="{ name:'studentcourseadd', params: { id: id }}" color="black" text rounded>Add</v-btn>

                <v-data-table
                    :headers="headers"
                    :items="studentCourses"
                    :items-per-page="10"
                    class="elevation - 1"
                    @click:row="selectRow"
                >
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import StudentServices from '@/services/StudentServices.js';
import StudentCourseServices from '@/services/StudentCourseServices.js';

export default {
    components: {},
    props :["id"],
    data() {
        return {
            student: {},
            studentCourses :[],
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
    created() {
        StudentServices.getStudent(this.id)
            .then(response => {
                this.student = response.data;  
                
            })
            .catch(error => {
                this.message = error.response.data.message;
            });
        StudentCourseServices.getStudentCoursesForStudent(this.id) 
            .then(response => {
                this.studentCourses = response.data;
                
            })
            .catch(error => {
                this.message = error.response.data.message;
            });
    },
    methods: {
        selectRow(event) {
            let id = event.id;
            this.$router.push({ name: 'studentcourseedit', params: { id: id } });
        }
       
    },
};
</script>

<style></style>
