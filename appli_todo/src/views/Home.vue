<template>

  <h2 class="text-2xl my-2 text-center">Page de principale</h2>
  
  <div class="flex ">
    <div class="w-3/12 mb-2 bg-gray-400 border-t-2 border-r-2 border-l-2 border-b-2 text-center rounded mx-3 flex-inital"  >
      <h1 class="text-center " v-if="getTodoLists != null"> ToDoList ({{ getTodoLists.length }}) </h1>
      
      <Sidebar v-on:currentTodoList="changeCurrentTodoList($event.todolist)"/>
      
      <button class="my-2 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded" v-if="currentTodoList" v-on:click="deleteTodoList_">Supprimer la liste</button>
      <br v-if="currentTodoList">
      
      <!--<p class="w-64 text-center text-red-600 text-xl " v-else >Sélectionnez une liste de todo</p>-->
    </div>
    <div class="w-screen mr-4">
    <TodoList v-if="currentTodoList" v-bind="{id: currentTodoList.id, name: currentTodoList.name}"/>
    </div>
  </div>

  <div v-if="!loggedOn">
    <h1>Veuillez vous connecter</h1>
  </div>
<!--
  
  <div class="grid grid-flow-col">

    <div class="w-64  bg-gray-400 border-t-2 border-r-2 border-l-2 text-center rounded-t" >
      <h1 class="text-center " v-if="getTodoLists != null"> Vous avez {{ getTodoLists.length }} listes </h1>
      <Sidebar v-on:currentTodoList="changeCurrentTodoList($event.todolist)"/>
      <div class="w-64  bg-gray-400 border-b-2 border-r-2 border-l-2 text-center rounded-b" v-if="getTodoLists != null">
        <button class="my-2 bg-gray-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-red-500 rounded" v-on:click="deleteTodoList_">Supprimer la liste</button>
        <br>
      </div>
    </div>
    <TodoList v-if="getTodoLists != null" v-bind="{id: currentTodoList.id, name: currentTodoList.name}"/>
    <p class="w-64  bg-gray-400 border-b-2 border-r-2 border-l-2 text-center rounded-b text-red-600 text-xl " v-else >Sélectionnez une liste de todo</p>
  </div>
======= -->
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
      if (todolist == this.currentTodoList) {
        this.currentTodoList = null;
        return;
      }
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
