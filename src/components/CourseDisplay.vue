<template>
    <div>
        <tr>
            <td width="100">
                <span>{{ course.number }}</span>
            </td>
            <td width="300">
                <div class="tooltip">
                    <span>{{ course.name }}</span>
                    <span class="tooltiptext">{{ course.number }}-{{course.description}}</span>
                </div>
            </td>
            <td width="100">
                <router-link :to="{ name: 'edit', params: { id: course.id } }">
                    <span>edit</span>
                </router-link>
                <span>|</span>
                <router-link :to="{ name: 'delete', params: { id: course.id } }">
                    <span>delete</span>
                </router-link>
            </td>
        </tr>
    </div>
</template>

<script>
export default {
    props: {
        course: Object,
    },
};
</script>

<style scoped>
/* Tooltip container */
.tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}

/* Tooltip text */
.tooltip .tooltiptext {
    visibility: hidden;
    width: 300px;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;

    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
    visibility: visible;
}
</style>

