<template>
    <div>
        <H1>Course Edit</H1>
        <h4>{{ course.name }}</h4>
        <h4>{{ message }}</h4>

        <form @submit.prevent="updateList">
            Name:
            <input v-model="course.name" type="text" />
            <input type="submit" name="submit" value="Save" />
            <button name="cancel" v-on:click.prevent="cancel()">Cancel</button>
        </form>
        <br />
        <button name="add" v-on:click.prevent="addCourseForm()">Add</button>
        <br />
    </div>
</template>

<script>
import CourseServices from '@/services/CourseServices.js';

export default {
    components: {},
    props: ['id'],

    data() {
        return {
            list: {},
            items: {},
            message: 'Make changes to the list',
        };
    },
    created() {
        CourseServices.getCourse(this.id)
            .then(response => {
                this.list = response.data.course;
            })
            .catch(error => {
                this.message = error.response.data.message;
            });
    },

    methods: {
        updateCourse() {
            CourseServices.updateCourse(this.updateCourse)
                .then(() => {})
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

<style>
table,
th,
td {
    border: 1px solid black;
    text-align: left;
}
table.center {
    width: 70%;
    margin-left: 15%;
    margin-right: 15%;
    border-collapse: collapse;
}
</style>
