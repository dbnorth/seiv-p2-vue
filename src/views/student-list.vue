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
                
              >
                <template v-slot:item.actions="{ item }">
                    <v-icon
                      small
                      class="mr-2"
                      @click="editStudent(item)"
                    >
                      mdi-pencil
                    </v-icon>
                                        <v-icon
                      small
                      class="mr-2"
                      @click="viewStudentCourses(item)"
                    >
                      mdi-format-list-bulleted-type
                    </v-icon>
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
                    text: 'Action',
                    value: 'actions',
                    align: 'left',
                    sortable: false,
                },
            ],
            message: 'Enter click on student to view course plan',
        };
    },
    created() {
        StudentServices.getStudents()
            .then(response => {
                this.students = response.data;
            })
            .catch(error => {
                this.message = error.response.data.message;
            });
    },
    methods: {
        viewStudentCourses(student) {
            this.$router.push({ name: 'studentcourselist', params: { id: student.id } });
        },
        editStudent(student) {
            this.$router.push({ name: 'studentedit', params: { id: student.id } });
        }
    },
};
</script>

<style></style>
