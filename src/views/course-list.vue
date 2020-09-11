<template>
    <div>
        <H1>Course List</H1>
        <h4>{{ message }}</h4>
        <CourseDisplay v-for="course in courses" :key="course.id" :course="course" />
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
};
</script>

<style></style>
