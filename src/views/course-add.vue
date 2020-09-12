<template>
    <div>
        <H1>Course Add</H1>
        <h4>{{ course.name }}</h4>
        <h4>{{ message }}</h4>

        <form @submit.prevent="addCourse">
            Dept:
            <input v-model="course.dept" type="text" id="id" />
            <br />Number:
            <input v-model="course.number" type="text" />
            <br />Name:
            <input v-model="course.name" type="text" id="id" />

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
    data() {
        return {
            course: {},
            message: 'Enter data and click Save',
        };
    },

    methods: {
        addCourse() {
            CourseServices.addCourse(this.course)
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

<style scoped></style>
