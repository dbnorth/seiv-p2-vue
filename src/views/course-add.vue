<template>
    <v-container>
        <v-row>
            <v-col>
                <H1>Course Add</H1>
                <h4>{{ course.name }}</h4>
                <h4>{{ message }}</h4>
                <v-form>
                    <v-text-field label="Dept" v-model="course.dept" />
                    <v-text-field label="Number" v-model="course.number" />
                    <v-text-field label="Name" v-model="course.name" />
                    <v-text-field
                        label="Description"
                        v-model="course.description"
                    />
                    <v-text-field label="Hours" v-model="course.hours" />
                    <v-text-field label="Level" v-model="course.level" />
                    <v-btn @click="addCourse()">Add</v-btn>
                    <v-btn @click="cancel()">Cancel</v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import CourseServices from '@/services/CourseServices.js';

export default {
    data() {
        return {
            course: {},
            message: 'Enter data and click Add',
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
