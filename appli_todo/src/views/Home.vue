<template>
  <p>Welcome: HOME page</p>
  
  <h1> ToDoList ({{ getTodoLists.length }}) </h1>

  <ul v-for="todoList in getTodoLists" :key="generateKey(todoList)">
    <li> <TodoList v-bind="{id: todoList.id, name: todoList.name}"/> </li>
  </ul>

  <input type="text" name="newTodoListName" v-model="newTodoListName">
  <button v-on:click="addTodoList">Ajouter</button>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

// import components:
import TodoList from '../components/TodoList.vue'

export default defineComponent({
  name: 'Home',
  data() {
    return {
      newTodoListName: '',
    }
  },
  created() {
    this.load()
  },
  methods: {
    ...mapActions('todolist', ['load', 'createTodoList']),
    generateKey(todolist) {
      return '$' + todolist.id + 
        '$' + todolist.name + 
        '$';
    },
    addTodoList() {
      if (this.newTodoListName == '')
        return;
      
      this.createTodoList(
        {
          name: this.newTodoListName
        }
      );
      this.newTodoListName = '';
    }
  },
  computed: {
    ...mapGetters('todolist', ['getTodoLists'])
  },
  components: {
    TodoList
  }
})

</script>
