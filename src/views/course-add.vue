<template>
    <v-container>
        <v-row>
            <v-col>
                <H1>Course Add</H1>
                <h4>{{ message }}</h4>
                <v-form>
                    <v-text-field label="Dept" v-model="course.dept" />
                    <v-text-field label="Number" v-model="course.number" />
                    <v-text-field label="Name" v-model="course.name" />
                    <v-textarea
                        label="Description"
                        v-model="course.description"
                    />
                    <v-text-field label="Hours" v-model="course.hours" />
                    <v-text-field label="Level" v-model="course.level" />
                    <v-row justify="center">
                        <v-col col="3"> </v-col>
                        <v-col col="2">
                            <v-btn color="success" @click="addCourse()"
                                >Add</v-btn
                            >
                        </v-col>
                        <v-col col="2">
                            <v-btn color="info" @click="cancel()">Cancel</v-btn>
                        </v-col>
                        <v-col col="3"> </v-col>
                    </v-row>
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
                    this.$router.push({ name: 'courselist' });
                })
                .catch(error => {
                    this.message = error.response.data.message;
                });
        },
        cancel() {
            this.$router.push({ name: 'courselist' });
        },
    },
};
</script>

<style scoped></style>
