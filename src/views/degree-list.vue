<template>
    <v-container>
        <v-row>
            <v-col>
                <H1>Degree List</H1>
                <h3>{{message}}</h3>
                <v-btn to="/degree-add" color="black" text rounded>Add</v-btn>

                <v-data-table
                    :headers="headers"
                    :items="degrees"
                    :items-per-page="10"
                    class="elevation - 1"
                    @click:row="selectRow"
                    mobile-breakpoint="0"
                >
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import DegreeServices from '@/services/DegreeServices.js';
export default {
    components: {},
    data() {
        return {
            degrees: [],
            headers: [
                {
                    text: 'Dept',
                    align: 'left',
                    sortable: true,
                    value: 'dept',
                },
                {
                    text: 'Description',
                    value: 'description',
                    align: 'left',
                    sortable: false,
                },
            ],
            message: 'Enter click on degree to edit',
        };
    },
    created() {
        DegreeServices.getDegrees()
            .then(response => {
                this.degrees = response.data;
                console.log(this.degrees);
            })
            .catch(error => {
                this.message = error.response.data.message;
            });
    },
    methods: {
        selectRow(event) {
            let id = event.id;
            this.$router.push({ name: 'degreeedit', params: { id: id } });
        }
    },
};
</script>

<style></style>
