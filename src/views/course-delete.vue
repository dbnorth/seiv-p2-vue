<template>
  <div>
    <H1>Todo Delete</H1>

    <h4>Delete {{ list.name }} ?</h4>
    <h4>{{ message }}</h4>
    <button v-on:click="deleteList()">Delete</button>
    <button v-on:click="cancel()">Cancel</button>
  </div>
</template>

<script>
import TodoServices from "@/services/TodoServices.js";
export default {
  props: ["id"],

  data() {
    return {
      list: Object,
      message: "Click the Delete button to delete list."
    };
  },
  created() {
    TodoServices.getList(this.id)
      .then(response => {
        this.list = response.data.list;
      })
      .catch(error => {
        this.message = error.response.data.message;
      });
  },

  methods: {
    deleteList() {
      TodoServices.deleteList(this.id)
        .then(() => {
          this.$router.push({ name: "list" });
        })
        .catch(error => {
          this.message = error.response.data.message;
        });
    },

    cancel() {
      this.$router.push({ name: "list" });
    }
  }
};
</script>

<style></style>
