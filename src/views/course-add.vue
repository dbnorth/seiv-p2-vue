<template>
  <div>
    <H1>Todo Add</H1>
    <h4>{{ list.name }}</h4>
    <h4>{{ message }}</h4>

    <form @submit.prevent="addList">
      Name:
      <input v-model="list.name" type="text" id="id" />
      <input type="submit" name="submit" value="Save" />
      <button name="cancel" v-on:click.prevent="cancel()">Cancel</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      list: {},
      message: "Enter data and click Save"
    };
  },

  methods: {
    addList() {
      axios
        .post("http://localhost/todoapi/lists/", this.list, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            crossDomain: true
          }
        })
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

<style scoped></style>
