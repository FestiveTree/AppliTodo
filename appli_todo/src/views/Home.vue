<template>

  <p>Welcome: HOME page</p>
  
  <div>
    <h1 v-if="getTodoLists != null"> ToDoList ({{ getTodoLists.length }}) </h1>
    
    <Sidebar v-on:currentTodoList="changeCurrentTodoList($event.todolist)"/>
    
    <button v-if="currentTodoList" v-on:click="deleteTodoList_">Supprimer la liste</button>
    <br v-if="currentTodoList">
    <TodoList v-if="currentTodoList" v-bind="{id: currentTodoList.id, name: currentTodoList.name}"/>
    <p v-else style="color: white">Sélectionnez une liste de todo</p>
  </div>

  <div v-if="!loggedOn">
    <h1>Veuillez vous connecter</h1>
  </div>

</template>

<script>
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

// import components:
import Sidebar from '../components/Sidebar.vue'
import TodoList from '../components/TodoList.vue'

export default defineComponent({
  name: 'Home',
  data() {
    return {
      currentTodoList: null
    }
  },
  mounted() {
    if (localStorage.getItem('token') !== null) {
      this.load();
    }
  },
  methods: {
    ...mapActions('todolist', ['load', 'deleteTodoList']),
    ...mapActions('account', ['login', 'getUser']),
    generateKey(todolist) {
      return '$' + todolist.id + 
        '$' + todolist.name + 
        '$';
    },
    changeCurrentTodoList(todolist) {
      this.currentTodoList = todolist;
    },
    deleteTodoList_() {
      if (this.currentTodoList != null) {
        this.deleteTodoList({
          id: this.currentTodoList.id
        });
        this.currentTodoList = null;
      }
    }
  },
  computed: {
    ...mapGetters('todolist', ['getTodoLists']),
    ...mapGetters('account', ['getterToken']),

    loggedOn() {
      return localStorage.getItem('token') !== null;
    }

  },
  components: {
    Sidebar,
    TodoList
  }
})

</script>
