<template>
    <div>
        <span>{{ course.name }} (</span>
        <router-link :to="{ name: 'edit', params: { id: course.id } }">
            <span>edit</span>
        </router-link>
        <span>|</span>
        <router-link :to="{ name: 'delete', params: { id: course.id } }">
            <span>delete</span>
        </router-link>
        <span>)</span>
    </div>
</template>

<script>
export default {
    props: {
        course: Object,
    },
};
</script>

<style></style>
