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

export default {
    components: {},
    props: ['id'],

    data() {
        return {
            course: {},
            message: 'Make changes to the course and Save',
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
            CourseServices.deleteCourse(this.course.id)
                .then(() => {
                    this.$router.push({ name: 'courselist' });
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
