<template>
    <v-container>
        <v-row>
            <v-col>
                <H1>Course Plan</H1>

                <h2 v-if=user>Hello, {{user.user}}</h2>
                
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {getStore}  from '@/config/utils';

export default {

    data() {
        return {
            user: {},
        };
    },
    created() {
        this.user = getStore('user');
    }
}
</script>

<style></style>
