<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Degree Edit</h1>
                <h4>{{ message }}</h4>
                <v-form>
                    <v-text-field label="Dept" v-model="degree.dept" />
                    <v-text-field label="Degree" v-model="degree.description" />
                    <v-text-field label="Total Hours" v-model="degree.hours" />
                    <v-row justify="center">
                        <v-col col="2"> </v-col>
                        <v-col col="2">
                            <v-btn color="success" @click="saveDegree()"
                                >Save</v-btn
                            >
                        </v-col>
                        <v-col col="2">
                            <v-btn color="warning" @click="deleteDegree()"
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
import DegreeServices from '@/services/DegreeServices.js';

export default {
    components: {},
    props: ['id'],

    data() {
        return {
            degree: {},
            message: 'Make changes to the degree and Save',
        };
    },
    created() {
        DegreeServices.getDegree(this.id)
            .then(response => {
                this.degree = response.data;
            })
            .catch(error => {
                this.message = error.response.data.message;
            });
    },

    methods: {
        saveDegree() {
            DegreeServices.updateDegree(this.degree)
                .then(() => {
                    this.$router.push({ name: 'degreelist' });
                })
                .catch(error => {
                    this.message = error.response.data.message;
                });
        },
        deleteDegree() {
            DegreeServices.deleteDegree(this.degree.id)
                .then(() => {
                    this.$router.push({ name: 'degreelist' });
                })
                .catch(error => {
                    this.message = error.response.data.message;
                });
        },
        cancel() {
            this.$router.push({ name: 'degreelist' });
        },
    },
};
</script>

<style></style>
