<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <v-toolbar-title>Course Plan</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn to="/" color="white" text rounded>Home</v-btn>
            <v-btn to="/student-list" color="white" text rounded
                >Students</v-btn
            >
            <v-btn to="/advisor-list" color="white" text rounded
                >Advisors</v-btn
            >
            <v-btn to="/course-list" color="white" text rounded>Courses</v-btn>
            <v-btn to="/semester-list" color="white" text rounded
                >Semesters</v-btn
            >
            <v-btn to="/degree-list" color="white" text rounded>Degrees</v-btn>
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
