<template>
  <div>
    <H1>Todo Edit</H1>
    <h4>{{ list.name }}</h4>
    <h4>{{ message }}</h4>

    <form @submit.prevent="updateList">
      Name:
      <input v-model="list.name" type="text" />
      <input type="submit" name="submit" value="Save" />
      <button name="cancel" v-on:click.prevent="cancel()">Cancel</button>
    </form>
    <br />
    <button name="add" v-on:click.prevent="addItemForm()">Add</button>
    <br />
    <table class="center">
      <TodoListItemDisplay
        v-for="item in items"
        :key="item.id"
        :item="item"
        @deleteItem="deleteItem(item.id)"
        @updateItem="updateItem(item)"
      />
      <TodoItemAddForm v-if="addItemFormFlag" @addItem="addItem" />
    </table>
  </div>
</template>

<script>
import TodoServices from "@/services/TodoServices.js";
import TodoListItemDisplay from "@/components/TodoListItemDisplay.vue";
import TodoItemAddForm from "@/components/TodoItemAddForm.vue";

export default {
  components: {
    TodoListItemDisplay,
    TodoItemAddForm
  },
  props: ["id"],

  data() {
    return {
      list: {},
      items: {},
      message: "Make changes to the list",
      addItemFormFlag: false
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
    TodoServices.getListItems(this.id)
      .then(response => {
        this.items = response.data.items;
      })
      .catch(error => {
        this.message = error.response.data.message;
      });
  },

  methods: {
    addItemForm() {
      this.addItemFormFlag = true;
    },
    updateList() {
      TodoServices.updateList(this.list)
        .then(() => {})
        .catch(error => {
          this.message = error.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "list" });
    },

    addItem(item) {
      TodoServices.addListItem(this.id, item)

        .then(() => {
          this.items.push(item);
          this.addItemFormFlag = false;
        })
        .catch(error => {
          this.message = error.response.data.message;
        });
    },
    updateItem(item) {
      TodoServices.updateListItem(this.id, item.id, item)
        .then(() => {})
        .catch(error => {
          this.message = error.response.data.message;
        });
    },
    deleteItem(id) {
      TodoServices.deleteListItem(this.id, id)
        .then(() => {
          //     this.items = this.items.filter(item => item.id != id)
          this.items.forEach((item, i) => {
            if (item.id == id) {
              this.items.splice(i, 1);
            }
          });
        })
        .catch(error => {
          this.message = error.response.data.message;
        });
    }
  }
};
</script>

<style>
table,
th,
td {
  border: 1px solid black;
  text-align: left;
}
table.center {
  width: 70%;
  margin-left: 15%;
  margin-right: 15%;
  border-collapse: collapse;
}
</style>
