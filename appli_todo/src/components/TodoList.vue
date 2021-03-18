<template>
  <h2> {{ name }} : </h2>

  <ul v-for="todo in getTodos(id)" :key="generateKey(todo)">
    <li style="list-style-type: none"> 
      <input type="checkbox" v-model="todo.completed">
      {{ todo.name }}
    </li>
  </ul>

  <input type="text" name="newTodoName" v-model="newTodoName">
  <button v-on:click="addTodo">Ajouter</button>
  <br> <br>
  <button> Toutes </button>
  <button> A faire </button>
  <button> Faites </button>
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
      newTodoListName: '',
      newTodoName: ''
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
    ...mapActions('todolist', ['createTodoList', 'createTodo']),
    generateKey(todo) {
      return '$' + todo.id + 
        '$' + todo.name + 
        '$';
    },
    /*---------- lists ----------*/
    addTodoList() {
      if (this.newTodoListName == '')
        return;
      
      this.createTodoList(
        {
          name: this.newTodoListName
        }
      );
      this.newTodoListName = '';
    },
    /*---------- todos ----------*/
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
    }
  },
  computed: {
    ...mapGetters('todolist', ['getTodos', 'getTodoLists'])
  },
  components: {
  }
})

</script>
