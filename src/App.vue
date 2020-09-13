<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <v-toolbar-title>Courses</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn to="/">List</v-btn>
            <v-btn to="/add">Add</v-btn>
        </v-app-bar>

        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'App',

    data: () => ({
        //
    }),
};
</script>
