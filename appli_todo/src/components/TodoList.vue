<template>
  <p>Todo list: {{name}}</p>
  
  Todos:
  <ul v-for="todo in getTodos(id)" :key="generateKey(todo)">
    <li>
      {{ todo }}
    </li>
  </ul>
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
          data: this.newTodoListName
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
          data: this.newTodoListName
        }
      );
      this.newTodoName = '';
    }
  },
  computed: {
    ...mapGetters('todolist', ['getTodos'])
  },
  components: {
    
  }
})

</script>
