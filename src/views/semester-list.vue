<template>
    <v-container>
        <v-row>
            <v-col>
                <H1>Semester List</H1>
                <h3>{{message}}</h3>
                <v-btn to="/semester-add" color="black" text rounded>Add</v-btn>

                <v-data-table
                    :headers="headers"
                    :items="semesters"
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
import SemesterServices from '@/services/SemesterServices.js';
export default {
    components: {},
    data() {
        return {
            semesters: [],
            headers: [
                {
                    text: 'Code',
                    align: 'left',
                    sortable: true,
                    value: 'code',
                },
                {
                    text: 'Start Date',
                    value: 'startDate',
                    align: 'left',
                    sortable: false,
                },
            ],
            message: 'Enter click on semester to edit',
        };
    },
    created() {
        SemesterServices.getSemesters()
            .then(response => {
                this.semesters = response.data;
                console.log(this.semesters);
            })
            .catch(error => {
                this.message = error.response.data.message;
            });
    },
    methods: {
        selectRow(event) {
            let id = event.id;
            this.$router.push({ name: 'semesteredit', params: { id: id } });
        },
    },
};
</script>

<style></style>
