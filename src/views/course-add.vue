<template>
    <div>
        <H1>Course Add</H1>
        <h4>{{ course.name }}</h4>
        <h4>{{ message }}</h4>

        <form @submit.prevent="addCourse">
            Name:
            <input v-model="course.name" type="text" id="id" />
            <input type="submit" name="submit" value="Save" />
            <button name="cancel" v-on:click.prevent="cancel()">Cancel</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            course: {},
            message: 'Enter data and click Save',
        };
    },

    methods: {
        addCourse() {
            axios
                .post('http://localhost/api/courses', this.course, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        crossDomain: true,
                    },
                })
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

<style scoped></style>
