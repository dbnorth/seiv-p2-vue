<template>
    <v-container>
        <v-row>
            <v-col>
                <H1>Student Add</H1>
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
                    <v-text-field label="Major" v-model="student.major" />
                    <v-row justify="center">
                        <v-col col="3"> </v-col>
                        <v-col col="2">
                            <v-btn color="success" @click="addStudent()"
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
import StudentServices from '@/services/StudentServices.js';

export default {
    data() {
        return {
            student: {},
            message: 'Enter data and click Add',
        };
    },

    methods: {
        addStudent() {
            StudentServices.addStudent(this.student)
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

<style scoped></style>
