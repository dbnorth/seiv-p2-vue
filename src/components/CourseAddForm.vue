<template>
    <tr>
        <td>
            <input type="text" v-model="course.dept" />
        </td>
        <td>
            <input type="text" v-model="course.number" />
        </td>
        <td>
            <input type="text" v-model="course.name" />
        </td>
        <td>
            <input type="text" v-model="course.description" />
        </td>
        <td>
            <input type="text" v-model="course.hours" />
        </td>
        <td>
            <input type="text" v-model="course.level" />
        </td>
        <td>
            <button @click="addCourse">save</button>
        </td>
    </tr>
</template>

<script>
export default {
    data() {
        return {
            course: {},
        };
    },

    methods: {
        addCourse() {
            this.$emit('addCourse', this.course);
        },
    },
};
</script>

<style></style>
