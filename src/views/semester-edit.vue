<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Semester Edit</h1>
                <h4>{{ message }}</h4>
                <v-form>
                    <v-text-field label="Code" v-model="semester.code" />
                    <v-text-field
                        label="Start Date"
                        v-model="semester.startDate"
                    />
                    <v-row justify="center">
                        <v-col col="2"> </v-col>
                        <v-col col="2">
                            <v-btn color="success" @click="saveSemester()"
                                >Save</v-btn
                            >
                        </v-col>
                        <v-col col="2">
                            <v-btn color="warning" @click="deleteSemester()"
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
import SemesterServices from '@/services/SemesterServices.js';

export default {
    components: {},
    props: ['id'],

    data() {
        return {
            semester: {},
            message: 'Make changes to the semester and Save',
        };
    },
    created() {
        SemesterServices.getSemester(this.id)
            .then(response => {
                this.semester = response.data;
            })
            .catch(error => {
                this.message = error.response.data.message;
            });
    },

    methods: {
        saveSemester() {
            SemesterServices.updateSemester(this.semester)
                .then(() => {
                    this.$router.push({ name: 'semesterlist' });
                })
                .catch(error => {
                    this.message = error.response.data.message;
                });
        },
        deleteSemester() {
            SemesterServices.deleteSemester(this.semester.id)
                .then(() => {
                    this.$router.push({ name: 'semesterlist' });
                })
                .catch(error => {
                    this.message = error.response.data.message;
                });
        },
        cancel() {
            this.$router.push({ name: 'semesterlist' });
        },
    },
};
</script>

<style></style>
