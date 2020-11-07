<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Course Edit</h1>
                <h4>{{ message }}</h4>
                <v-form>
                    <v-text-field label="Dept" v-model="course.dept" />
                    <v-text-field label="Number" v-model="course.number" />
                    <v-text-field label="Name" v-model="course.name" />
                    <v-textarea
                        label="Description"
                        v-model="course.description"
                    />
                    <v-text-field label="Hours" v-model="course.hours" />
                    <v-text-field label="Level" v-model="course.level" />
                    <v-text-field label="Semesters Offered" v-model="course.semestersOffered" />
                    <h4>Include in Degrees</h4>
                    <v-data-table
                      :headers="headers"
                      :items="courseDegrees"
                      hide-default-footer
                      class="elevation - 1">
                      <template v-slot:item.actions="{ item }">
                          <v-icon
                            small
                            class="mr-2"
                            @click="deleteDegreeCourse(item)"
                          >
                            mdi-trash-can-outline
                          </v-icon>
                      </template>
                    </v-data-table>
                    <v-row justify="center">
                      <v-col col="2">  
                            <v-btn color="success" @click="addDegreeCourse()"
                                >Add</v-btn
                            >
                      </v-col>
                      <v-col justify="left" col="2"> 
                          <v-select :items="degrees"
                            label="Major"
                            item-text ="description"
                            item-value= "id" 
                            v-model="degree.id" />
                        </v-col>
                     </v-row>
                    <v-row justify="center">
                        <v-col col="2"> </v-col>
                        <v-col col="2">
                            <v-btn color="success" @click="saveCourse()"
                                >Save</v-btn
                            >
                        </v-col>
                        <v-col col="2">
                            <v-btn color="warning" @click="deleteCourse()"
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
import CourseServices from '@/services/CourseServices.js';
import DegreeCourseServices from '@/services/DegreeCourseServices.js';
import DegreeServices from '@/services/DegreeServices.js';

export default {
    components: {},
    props: ['id'],

    data() {
        return {
            course: {},
            courseDegrees : [],
            degrees :[],
            degree : {},
            message: 'Make changes to the course and Save',
            headers: [
                {
                    text: 'Degree',
                    align: 'left',
                    value: 'degree.description',
                },
                {
                    text: 'Action',
                    value: 'actions',
                    align: 'left',
                    sortable: false,
                }

            ],
        };
    },
    created() {
        CourseServices.getCourse(this.id)
            .then(response => {
                this.course = response.data;
            })
            .catch(error => {
                this.message = error.response.data.message;
            });
        DegreeCourseServices.getDegreeCoursesForCourse(this.id)
            .then(response => {
                this.courseDegrees = response.data;
                console.log(this.courseDegrees);
            })
            .catch(error => {
                this.message = error.response.data.message;
            });
        DegreeServices.getDegrees()
            .then(response => {
                this.degrees = response.data;
            })
            .catch(error => {
                this.message = error.response.data.message;
            });
    },

    methods: {
        saveCourse() {
            CourseServices.updateCourse(this.course)
                .then(() => {
                    this.$router.push({ name: 'courselist' });
                })
                .catch(error => {
                    this.message = error.response.data.message;
                });
        },
        deleteCourse() {
            DegreeCourseServices.deleteAllDegreeCourseForCourse(this.course.id)
              .catch(error => {
                    this.message = error.response.data.message;
                });

            CourseServices.deleteCourse(this.course.id)
              .then(() => {
                  this.$router.push({ name: 'courselist' });
              })
              .catch(error => {
                  this.message = error.response.data.message;
              });
        },
        deleteDegreeCourse(degreecourse) {
            DegreeCourseServices.deleteDegreeCourse(degreecourse.id)
                .then(() => {  
                  this.courseDegrees = this.courseDegrees.filter(courseDegree => courseDegree.id!=degreecourse.id);
                })
                .catch(error => {
                    this.message = error.response.data.message;
                });
        },
        addDegreeCourse() {
            let degreeCourse = {};
            degreeCourse.degreeId = this.degree.id;
            degreeCourse.courseId = this.course.id;
            DegreeCourseServices.addDegreeCourse(degreeCourse)
                .then(() => {                
                  DegreeCourseServices.getDegreeCoursesForCourse(this.id)
                  .then(response => {
                      this.courseDegrees = response.data;
                      console.log(this.courseDegrees);
                  })
            .catch(error => {
                this.message = error.response.data.message;
            });
                })
                .catch(error => {
                    this.message = error.response.data.message;
                });
        },
        cancel() {
            this.$router.push({ name: 'courselist' });
        },
    },
};
</script>

<style></style>
