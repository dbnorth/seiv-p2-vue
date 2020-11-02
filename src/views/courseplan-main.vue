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
import Utils from '@/utils/utils';

export default {

    data() {
        return {
            user: {},
        };
    },
    created() {
        this.user = Utils.getStore('user');
        document.title = "OC Course Plan"
    }
}
</script>

<style></style>
