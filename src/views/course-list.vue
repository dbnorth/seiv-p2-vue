<template>
    <v-container>
        <v-row>
            <v-col>
                <H1>Course List</H1>
                <h3>{{message}}</h3>
                <v-btn to="/course-add" color="black" text rounded>Add</v-btn>
                <v-form>
                    <v-text-field label="Enter Department" v-model="dept" />
                </v-form>
                <v-btn color="success" v-on:click="search()">Search</v-btn>

                <v-data-table
                    :headers="headers"
                    :items="courses"
                    :items-per-page="25"
                    class="elevation - 1"
                    mobile-breakpoint="0"
                    @click:row="selectRow"
                >
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import CourseServices from '@/services/CourseServices.js';
export default {
    components: {},
    data() {
        return {
            dept: '',
            courses: [],
            headers: [
                {
                    text: 'Course Number',
                    align: 'left',
                    sortable: true,
                    value: 'number',
                    width: "150"
                },
                {
                    text: 'Course Name',
                    value: 'name',
                    align: 'left',
                    sortable: false,
                },
            ],
            message:
                'Enter Dept in search field to display courses for department',
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
        selectRow(event) {
            let id = event.id;
            this.$router.push({ name: 'courseedit', params: { id: id } });
        },
    },
};
</script>

<style></style>
