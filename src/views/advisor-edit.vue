<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Advisor Edit</h1>
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
                    <v-text-field   v-if="!isAdmin" label="Role" v-model="advisor.roles" readonly />    
                    <v-select v-if="isAdmin" :items="roles"
                      label="Role"
                      item-text ="role"
                      item-value= "role" 
                      v-model="advisor.roles" /> 
                   
                    <v-row justify="center">
                        <v-col col="2"> </v-col>
                        <v-col col="2">
                            <v-btn color="success" @click="saveAdvisor()"
                                >Save</v-btn
                            >
                        </v-col>
                        <v-col col="2">
                            <v-btn v-if="isAdmin" color="warning" @click="deleteAdvisor()"
                                >Delete</v-btn
                            >
                        </v-col>
                        <v-col col="2">
                            <v-btn color="info" @click="cancel()">Cancel</v-btn>
                        </v-col>
                        <v-col col="2"> </v-col>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import AdvisorServices from '@/services/AdvisorServices.js';
import Utils from '@/utils/utils';

export default {
    components: {},
    props: ['id'],

    data() {
        return {
            advisor: {},
            isAdmin: false,
            user : {},
            roles : [{role:"Admin"},{role:"Advisor"}],

            message: 'Make changes to the advisor and Save',
        };
    },
    created() {
        this.user = Utils.getStore("user");
        if (this.user.roles =="Admin") this.isAdmin=true;
        console.log(this.user);
        console.log(this.isAdmin);
        AdvisorServices.getAdvisor(this.id)
            .then(response => {
                this.advisor = response.data;
            })
            .catch(error => {
                this.message = error.response.data.message;
            });
    },

    methods: {
        saveAdvisor() {
            AdvisorServices.updateAdvisor(this.advisor)
                .then(() => {
                    this.$router.push({ name: 'advisorlist' });
                })
                .catch(error => {
                    this.message = error.response.data.message;
                });
        },
        deleteAdvisor() {
            AdvisorServices.deleteAdvisor(this.advisor.id)
                .then(() => {
                    if (this.isAdmin)
                        this.$router.push({ name: 'advisorlist' });
                    else 
                      this.$router.push({ name: 'main' });
                      
                })
                .catch(error => {
                    this.message = error.response.data.message;
                });
        },
        cancel() {
           if (this.isAdmin)
                        this.$router.push({ name: 'advisorlist' });
                    else 
                      this.$router.push({ name: 'main' });
        },
    },
};
</script>

<style></style>
