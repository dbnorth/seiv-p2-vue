<template>
    <div>
        <H1>Course Delete</H1>

        <h4>Delete {{ course.number }}{{ course.name }} ?</h4>
        <h4>{{ message }}</h4>
        <button v-on:click="deleteCourse()">Delete</button>
        <button v-on:click="cancel()">Cancel</button>
    </div>
</template>

<script>
import CourseServices from '@/services/CourseServices.js';
export default {
    props: ['id'],

    data() {
        return {
            course: Object,
            message: 'Click the Delete button to delete list.',
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
        deleteCourse() {
            CourseServices.deleteCourse(this.id)
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
