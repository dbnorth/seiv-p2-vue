<template>
    <v-container>
        <v-row>
            <v-col>
                <H1>Student Course List</H1>
                <H2>{{student.firstName}} {{student.lastName}}</H2>
                <v-btn :to="{ name:'studentcourseadd', params: { id: id }}" color="black" text rounded>Add</v-btn>
                <SemesterCourse :studentCourses="studentCourses" />
               
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
    }
}
</script>

<style></style>
