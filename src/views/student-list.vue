<template>
    <v-container>
        <v-row>
            <v-col>
                <H1>Student List</H1>

                <v-data-table
                    :headers="headers"
                    :items="students"
                    :items-per-page="10"
                    class="elevation - 1"
                    @click:row="selectRow"
                >
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
                    value: 'studnetID',
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
            ],
            message:
                'Enter Dept in search field to display courses for department',
        };
    },
    created() {
        StudentServices.getStudents()
            .then(response => {
                this.courses = response.data;
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
    },
};
</script>

<style></style>
