<template>
    <v-container>
        <v-row>
            <v-col>
                <H1>Advisor Add</H1>
                <h4>{{ message }}</h4>
                <v-form>

                    <v-text-field
                        label="First Name"
                        v-model="advisor.firstName"
                    />
                    <v-text-field
                        label="Last Name"
                        v-model="advisor.lastName"
                    />
                    <v-text-field label="Email" v-model="advisor.email" />

                    <v-text-field label="Department" v-model="advisor.dept" />
                    <v-select :items="roles"
                      label="Role"
                      item-text ="role"
                      item-value= "role" 
                      v-model="advisor.roles" /> 
                    
                    <v-row justify="center">
                        <v-col col="3"> </v-col>
                        <v-col col="2">
                            <v-btn color="success" @click="addAdvisor()"
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
import AdvisorServices from '@/services/AdvisorServices.js';


export default {
    data() {
        return {
            advisor: {},
            message: 'Enter data and click Add',
            roles : [{role:"Admin"},{role:"Advisor"},{role:"Student"}]
        };
    },
    created() {

    },

    methods: {
        addAdvisor() {
            AdvisorServices.addAdvisor(this.advisor)
                .then(() => {
                    this.$router.push({ name: 'advisorlist' });
                })
                .catch(error => {
                    this.message = error.response.data.message;
                });
        },
        cancel() {
            this.$router.push({ name: 'advisorlist' });
        },
    },
};
</script>

<style scoped></style>
