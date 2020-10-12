<template>
    <v-container>
        <v-row>
            <v-col>
                <H1>Degree Add</H1>
                <h4>{{ message }}</h4>
                <v-form>
                    <v-text-field label="Dept" v-model="degree.dept" />
                    <v-text-field label="Degree" v-model="degree.description" />
                    <v-text-field label="Total Hours" v-model="degree.hours" />
                    <v-row justify="center">
                        <v-col col="3"> </v-col>
                        <v-col col="2">
                            <v-btn color="success" @click="addDegree()"
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
import DegreeServices from '@/services/DegreeServices.js';

export default {
    data() {
        return {
            degree: {},
            message: 'Enter data and click Add',
        };
    },

    methods: {
        addDegree() {
            DegreeServices.addDegree(this.degree)
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

<style scoped></style>
