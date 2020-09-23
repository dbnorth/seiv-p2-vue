<template>
    <v-container>
        <v-row>
            <v-col>
                <H1>Semester Add</H1>
                <h4>{{ message }}</h4>
                <v-form>
                    <v-text-field label="Code" v-model="semester.code" />
                    <v-text-field
                        label="Start Date"
                        v-model="semester.startDate"
                    />
                    <v-row justify="center">
                        <v-col col="3"> </v-col>
                        <v-col col="2">
                            <v-btn color="success" @click="addSemester()"
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
import SemesterServices from '@/services/SemesterServices.js';

export default {
    data() {
        return {
            semester: {},
            message: 'Enter data and click Add',
        };
    },

    methods: {
        addSemester() {
            SemesterServices.addSemester(this.semester)
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

<style scoped></style>
