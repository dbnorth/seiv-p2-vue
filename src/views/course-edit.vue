<template>
    <div>
        <h1>Course Edit</h1>
        <h4>{{ course.name }}</h4>
        <h4>{{ message }}</h4>

        <form @submit.prevent="updateCourse">
            Number:
            <input v-model="course.number" type="text" />
            <br />Name:
            <input v-model="course.name" type="text" />
            <br />Description:
            <input v-model="course.description" type="text" />
            <br />Level:
            <input v-model="course.level" type="text" />
            <br />Hours:
            <input v-model="course.hours" type="text" />
            <br />
            <br />
            <input type="submit" name="submit" value="Save" />
            <button name="cancel" v-on:click.prevent="cancel()">Cancel</button>
        </form>
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
            message: 'Make changes to the list',
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
        updateCourse() {
            CourseServices.updateCourse(this.course)
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

<style>
</style>
