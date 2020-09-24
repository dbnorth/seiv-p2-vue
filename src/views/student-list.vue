<template>
    <v-container>
        <v-row>
            <v-col>
                <H1>Student List</H1>
                <v-btn to="/student-add" color="black" text rounded>Add</v-btn>

                <v-data-table
                    :headers="headers"
                    :items="students"
                    :items-per-page="10"
                    class="elevation - 1"
                    @click:row="selectRow"
                >
                <template v-slot:item.actions="{ student }">
                  <v-icon
                    small
                    class="mr-2"
                    @click="displayStudentCourse(student)"
                  />
                  </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import StudentServices from '@/services/StudentServices.js';
export default {
    components: {},
    data() {
        return {
            students: [],
            headers: [
                {
                    text: 'Id',
                    align: 'left',
                    sortable: true,
                    value: 'idNumber',
                },
                {
                    text: 'First Name',
                    value: 'firstName',
                    align: 'left',
                    sortable: false,
                },
                {
                    text: 'Last Name',
                    value: 'lastName',
                    align: 'left',
                    sortable: false,
                },
                                {
                    text: 'Actions',
                    value: 'actions',
                    align: 'left',
                    sortable: false,
                },
            ],
            message: 'Enter click on student to edit',
        };
    },
    created() {
        StudentServices.getStudents()
            .then(response => {
                this.students = response.data;
                console.log(this.students);
            })
            .catch(error => {
                this.message = error.response.data.message;
            });
    },
    methods: {
        selectRow(event) {
            let id = event.id;
            this.$router.push({ name: 'studentedit', params: { id: id } });
        },
        displayStudentCourse(student) {
            let id = student.id;
            this.$router.push({ name: 'studentcourselist', params: { id: id } });
  

        }
    },
};
</script>

<style></style>
