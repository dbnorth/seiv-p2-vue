<template>
    <v-container>
        <v-row>
            <v-col>
                <H1>Advisor List</H1>
                <h3>{{message}}</h3>
                <v-btn to="/advisor-add" color="black" text rounded>Add</v-btn>

              <v-data-table
                    :headers="headers"
                    :items="advisors"
                    :items-per-page="10"
                    @click:row="selectRow"
              >
                
              </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import AdvisorServices from '@/services/AdvisorServices.js';
export default {
    components: {},
    data() {
        return {
            advisors: [],
            headers: [

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
            message: 'Click on advisor to edit',
        };
    },
    created() {
        AdvisorServices.getAdvisors()
            .then(response => {
                this.advisors = response.data;
                 
            })
            .catch(error => {
                this.message = error.response.data.message;
            });
    },
    methods: {
        selectRow(event) {
            let id = event.id;
            this.$router.push({ name: 'advisoredit', params: { id: id } });
        }
    },
};
</script>

<style></style>
