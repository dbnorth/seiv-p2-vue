<template>
    <div>
        <H1>Course List</H1>
        <h4>{{ message }}</h4>

        <p>
            Search:
            <input type="text" v-model="dept" />
        </p>
        <button v-on:click="search()">Search</button>
        <table align="center">
            <CourseDisplay v-for="course in courses" :key="course.id" :course="course" />
        </table>
    </div>
</template>

<script>
import CourseDisplay from '@/components/CourseDisplay.vue';
import CourseServices from '@/services/CourseServices.js';
export default {
    components: {
        CourseDisplay,
    },
    data() {
        return {
            dept: '',
            courses: [],
            message: 'Click on list to edit',
        };
    },
    created() {
        CourseServices.getCourses()
            .then(response => {
                this.courses = response.data;
                console.log(this.courses);
            })
            .catch(error => {
                this.message = error.response.data.message;
            });
    },
    methods: {
        search() {
            CourseServices.getCoursesForDept(this.dept)
                .then(response => {
                    this.courses = response.data;
                    console.log(this.courses);
                })
                .catch(error => {
                    this.message = error.response.data.message;
                });
        },
    },
};
</script>

<style>
table {
    border-collapse: collapse;
}
</style>
