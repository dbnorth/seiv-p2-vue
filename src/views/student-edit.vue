<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Student Edit</h1>
                <h4>{{ message }}</h4>
                <h5 ref="fn">{{student.firstName}}</h5>
                <v-form>
                    <v-text-field ref="idNumber"
                        label="Id Number"
                        v-model ="student.idNumber"
                    />
                    <v-text-field ref="firstName"
                        label="First Name"
                        v-model="student.firstName"
                    />
                    <v-text-field ref="lastName"
                        label="Last Name"
                        v-model="student.lastName"
                    />
                    <v-text-field ref="email"
                        label="Email" 
                        v-model="student.email" />
                    <v-text-field ref="gradDate"
                        v-model="student.gradDate"
                        label="Graduation Date"
                        hint="MM/DD/YYYY format"
                        persistent-hint
                      ></v-text-field>

                    <v-select :items="degrees"
                      label="Major"
                      item-text ="description"
                      item-value= "id" 
                      v-model="student.degreeId" />
                    <v-select :items="advisors"
                      label="Advisor"
                      item-text ="fullName"
                      item-value= "id" 
                      v-model="student.advisorId" />
                    <v-row justify="center">
                        <v-col col="2"> </v-col>
                        <v-col col="2">
                            <v-btn ref="saveBtn" color="success" @click="saveStudent()"
                                >Save</v-btn
                            >
                        </v-col>
                        <v-col col="2">
                            <v-btn v-if="isAdvisor || isAdmin" ref="deleteBtn" color="warning" @click="deleteStudent()"
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
import StudentServices from '@/services/StudentServices.js';
import DegreeServices from '@/services/DegreeServices.js';
import AdvisorServices from '@/services/AdvisorServices.js';
import Utils from '@/utils/utils';

export default {
    components: {},
    props: ['id'],

    data() {
        return {
            student: {},
            user : {},
            isAdmin : false,
            isAdvisor : false,
            degrees:[],
            advisors: [],
            message: 'Make changes to the student and Save',
        };
    },
    async created() {
        this.user = Utils.getStore("user");
        if (this.user.roles =="Admin") this.isAdmin=true;
        if (this.user.roles =="Advisor") this.isAdvisor=true;
        await StudentServices.getStudent(this.id)
            .then(response => {
                this.student = response.data;
            })
            .catch(error => {
                this.message = error.response.data.message;
            });
            

        DegreeServices.getDegrees()
            .then(response => {
                this.degrees = response.data;
            })
            .catch(error => {
                this.message = error.response.data.message;
            });

        AdvisorServices.getAdvisors()
            .then(response => {
                this.advisors = response.data;
                this.advisors.forEach(function (advisor) {
                  advisor.fullName = advisor.firstName+" "+advisor.lastName;
                });
                
            })
            .catch(error => {
                this.message = error.response.data.message;
            });
            
    },

    methods: {
        saveStudent() {
            StudentServices.updateStudent(this.student)
                .then(() => {
                    if (this.isAdmin || this.isAdvisor) 
                      this.$router.push({ name: 'studentlist' });
                    else
                      this.$router.push({ name: 'main' });
                })
                .catch(error => {
                    this.message = error.response.data.message;
                });
        },
        deleteStudent() {
            StudentServices.deleteStudent(this.student.id)
                .then(() => {
                    this.$router.push({ name: 'studentlist' });
                })
                .catch(error => {
                    this.message = error.response.data.message;
                });
        },
        cancel() {
            if (this.isAdmin || this.isAdvisor) 
                      this.$router.push({ name: 'studentlist' });
                    else
                      this.$router.push({ name: 'main' });
        },
    },
};
</script>

<style></style>
