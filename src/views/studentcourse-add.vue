<template>
    <v-container>
        <v-row>
            <v-col>
                <H1>Student Course Add</H1>
                <h2>{{student.firstName}} {{student.lastName}}</h2>
                <h4>{{ message }}</h4>
                <v-form>
                    <v-select :items="semesters"
                      label="Semester"
                      item-text ="code"
                      item-value= "id" 
                      v-model="studentCourse.semesterId" />
                                      
                    <v-select :items="courses"
                      label="Course"
                      item-text ="fullCourse"
                      item-value= "id" 
                      v-model="studentCourse.courseId" />
                    <v-select :items="grades"
                      label="Grade"
                      item-text ="grade"
                      item-value= "grade" 
                      v-model="studentCourse.grade" />   
                    <v-row justify="center">
                        <v-col col="3"> </v-col>
                        <v-col col="2">
                    <v-btn color="success" @click="addStudentCourse()">Add</v-btn>
                        </v-col>
                        <v-col col="2">
                            <v-btn color="info" @click="cancel()">Cancel</v-btn>
                        </v-col>
                        <v-col col="3"> </v-col>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import StudentServices from '@/services/StudentServices.js';
import SemesterServices from '@/services/SemesterServices.js';
import CourseServices from '@/services/CourseServices.js';
import StudentCourseServices from '@/services/StudentCourseServices.js';

export default {
   props: ['id'],
    data() {
        return {
            student: {},
            studentCourse: {},
            semesters : [],
            courses: [],
            grades:[{grade:"A"},{grade:"B"},{grade:"C"},{grade:"D"},{grade:"F"},{grade:"TE"},{grade:"IP"},{grade:"EN"},{grade:"PL"}],
            message: 'Enter data and click Add',
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
        SemesterServices.getSemesters()
            .then(response => {
                this.semesters = response.data;
            })
            .catch(error => {
                this.message = error.response.data.message;
            });
        CourseServices.getCourses()
            .then(response => {
                this.courses = response.data;
                this.courses.forEach(function (course) {
                  course.fullCourse = course.number+" "+course.name;
                })
            })
            .catch(error => {
                this.message = error.response.data.message;
            });
    },

    methods: {
        addStudentCourse() {
            this.studentCourse.studentId=this.id;
            StudentCourseServices.addStudentCourse(this.studentCourse)
                .then(() => {
                    this.$router.push({ name: 'studentcourselist', params: { id: this.id } });
                })
                .catch(error => {
                    this.message = error.response.data.message;
                });
        },
        cancel() {
            this.$router.push({ name: 'studentcourselist',params: { id: this.id }});
        },
    },
};
</script>

<style scoped></style>
