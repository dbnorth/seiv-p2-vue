<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Student Edit</h1>
                <h4>{{ message }}</h4>
                <v-form>
                    <v-text-field
                        label="Id Number"
                        v-model="student.idNumber"
                    />
                    <v-text-field
                        label="First Name"
                        v-model="student.firstName"
                    />
                    <v-text-field
                        label="Last Name"
                        v-model="student.lastName"
                    />
                    <v-text-field label="Email" v-model="student.email" />

                    <v-select :items="degrees"
                      label="Major"
                      item-text ="description"
                      item-value= "id" 
                      v-model="student.degreeId" />
                    <v-select :items="advisors"
                      label="Advisor"
                      item-text ="lastName"
                      item-value= "id" 
                      v-model="student.advisorId" />
                    <v-row justify="center">
                        <v-col col="2"> </v-col>
                        <v-col col="2">
                            <v-btn color="success" @click="saveStudent()"
                                >Save</v-btn
                            >
                        </v-col>
                        <v-col col="2">
                            <v-btn color="warning" @click="deleteStudent()"
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

export default {
    components: {},
    props: ['id'],

    data() {
        return {
            student: {},
            degrees:{},
            advisor: {},
            message: 'Make changes to the student and Save',
        };
    },
    created() {
        StudentServices.getStudent(this.id)
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
            })
            .catch(error => {
                this.message = error.response.data.message;
            });
    },

    methods: {
        saveStudent() {
            StudentServices.updateStudent(this.student)
                .then(() => {
                    this.$router.push({ name: 'studentlist' });
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
            this.$router.push({ name: 'studentlist' });
        },
    },
};
</script>

<style></style>
