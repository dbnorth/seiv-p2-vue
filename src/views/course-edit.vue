<template>
    <div>
        <h1>Course Edit</h1>
        <h4>{{ course.name }}</h4>
        <h4>{{ message }}</h4>
        <v-form>
            <v-text-field label="Dept" v-model="course.dept" />
            <v-text-field label="Number" v-model="course.number" />
            <v-text-field label="Name" v-model="course.name" />
            <v-text-field label="Description" v-model="course.description" />
            <v-text-field label="Hours" v-model="course.hours" />
            <v-text-field label="Level" v-model="course.level" />
            <v-btn @click="saveCourse()">Save</v-btn>
            <v-btn @click="deleteCourse()">Delete</v-btn>
            <v-btn @click="cancel()">Cancel</v-btn>
        </v-form>
    </div>
</template>

<script>
import CourseServices from '@/services/CourseServices.js';

export default {
    components: {},
    props: ['id'],

    data() {
        return {
            course: {},
            message: 'Make changes to the course and save',
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
                    this.$router.push({ name: 'list' });
                })
                .catch(error => {
                    this.message = error.response.data.message;
                });
        },
        deleteCourse() {
            CourseServices.deleteCourse(this.course.id)
                .then(() => {
                    this.$router.push({ name: 'list' });
                })
                .catch(error => {
                    this.message = error.response.data.message;
                });
        },
        cancel() {
            this.$router.push({ name: 'list' });
        },
    },
};
</script>

<style></style>
