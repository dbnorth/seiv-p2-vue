<template>
    <div>
        <H1>Course Delete</H1>

        <h4>Delete {{ course.name }} ?</h4>
        <h4>{{ message }}</h4>
        <button v-on:click="deleteCourse()">Delete</button>
        <button v-on:click="cancel()">Cancel</button>
    </div>
</template>

<script>
import TodoServices from '@/services/CourseServices.js';
export default {
    props: ['id'],

    data() {
        return {
            course: Object,
            message: 'Click the Delete button to delete list.',
        };
    },
    created() {
        TodoServices.getCourse(this.id)
            .then(response => {
                this.course = response.data.course;
            })
            .catch(error => {
                this.message = error.response.data.message;
            });
    },

    methods: {
        deleteCourse() {
            TodoServices.deleteCourse(this.id)
                .then(() => {
                    this.$router.push({ name: 'course' });
                })
                .catch(error => {
                    this.message = error.response.data.message;
                });
        },

        cancel() {
            this.$router.push({ name: 'course' });
        },
    },
};
</script>

<style></style>
