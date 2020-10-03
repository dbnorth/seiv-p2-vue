<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Student Course Edit</h1>
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
                        <v-col col="2"> </v-col>
                        <v-col col="2">
                            <v-btn color="success" @click="saveStudentCourse()"
                                >Save</v-btn
                            >
                        </v-col>
                        <v-col col="2">
                            <v-btn color="warning" @click="deleteStudentCourse()"
                                >Delete</v-btn
                            >
                        </v-col>
                        <v-col col="2">
                            <v-btn color="info" @click="cancel()">Cancel</v-btn>
                        </v-col>
                        <v-col col="2"> </v-col>
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
    components: {},
    props: ['id'],
    data() {
        return {
            student :{},
            studentCourse: {},
            semesters:[],
            courses:[],
            grades:[{grade:"A"},{grade:"B"},{grade:"C"},{grade:"D"},{grade:"F"},{grade:"TE"},{grade:"IP"},{grade:"EN"},{grade:"PL"}],
            message: 'Make changes to the studentCourse and Save',
        };
    },
    created() {

        StudentCourseServices.getStudentCourse(this.id)
            .then(response => {
                this.studentCourse = response.data;
                StudentServices.getStudent(this.studentCourse.studentId)
                  .then(response => {
                    this.student = response.data;
                })
                .catch(error => {
                    this.message = error.response.data.message;
                });
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
                });
            })
            .catch(error => {
                this.message = error.response.data.message;
            });
    },

    methods: {
        saveStudentCourse() {
            StudentCourseServices.updateStudentCourse(this.studentCourse)
                .then(() => {
                    this.$router.push({ name: 'studentcourselist', params: { id: this.student.id } });
                })
                .catch(error => {
                    this.message = error.response.data.message;
                });
        },
        deleteStudentCourse() {
            StudentCourseServices.deleteStudentCourse(this.studentCourse.id)
                .then(() => {
                    this.$router.push({ name: 'studentcourselist', params: { id: this.student.id } });
                })
                .catch(error => {
                    this.message = error.response.data.message;
                });
        },
        cancel() {
            this.$router.push({ name: 'studentcourselist', params: { id: this.student.id }  });
        },
    },
};
</script>

<style></style>
