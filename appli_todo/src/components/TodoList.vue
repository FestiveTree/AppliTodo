<template>
  <h2> {{ name }} : </h2>

  <ul v-for="todo in getTodos(id,filter)" :key="generateKey(todo)">
    <li style="list-style-type: none"> 
      <input type="checkbox" v-model="todo.completed" @update:modelValue="completeTodo_(todo)">
      {{ todo.name }}
      <button v-on:click="removeTodo(todo.id)"> Supprimer </button>
    </li>
  </ul>

  <input type="text" name="newTodoName" v-model="newTodoName">
  <button v-on:click="addTodo">Ajouter</button>
  <br> <br>
  <button v-on:click="changeFilter('all')"> Toutes </button>
  <button v-on:click="changeFilter('not completed')"> A faire </button>
  <button v-on:click="changeFilter('completed')"> Faites </button>
  <!-- show('filter')-->
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

// import components:

export default defineComponent({
  name: 'TodoList',
  data() {
    return {
      newTodoName: '',
      filter: 'all'
    }
  },
  props: {
    id: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: ''
    }
  },
  methods: {
    ...mapActions('todolist', ['createTodo', 'completeTodo', 'deleteTodo']),
    generateKey(todo) {
      return '$' + todo.id + 
        '$' + todo.name + 
        '$';
    },
    addTodo() {
      if (this.newTodoName == '')
        return;
      
      this.createTodo(
        {
          id: this.id,
          name: this.newTodoName,
        }
      );

      this.newTodoName = '';
    },
    completeTodo_(todo) {
      this.completeTodo(
        {
          id: this.id,
          idTodo: todo.id,
          todo: todo
        }
      );
    },
    changeFilter(filter) {
      this.filter = filter;
    },
    removeTodo(idTodo) {
      this.deleteTodo(
        {
          id: this.id,
          idTodo: idTodo,
        }
      )
    }
  },
  computed: {
    ...mapGetters('todolist', ['getTodos', 'getTodoLists'])
  }
})

</script>
