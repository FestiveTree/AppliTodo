<template>

  <div>
    <h2 class="text-2xl my-2 text-center">Page principale</h2>
    
    <div class="flex" v-if="getterToken !== null">
      <div class="w-3/12 mb-2 text-center rounded mx-3 flex-inital"  >
        <h1 class="text-center mt-4 font-semibold text-2xl" v-if="getTodoLists != null"> ToDoList ({{ getTodoLists.length }}) </h1>
        
        <Sidebar v-on:currentTodoList="changeCurrentTodoList($event.todolist)"/>
        
        <button v-if="currentTodoList" class="my-2 mx-1 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded focus:outline-none" v-on:click="deleteTodoList_">
           {{ (!confirmedDeletion ? 'Supprimer la liste ?' : 'Supprimer') }}
        </button>
        <button v-if="confirmedDeletion && currentTodoList" class="mx-1 my-2 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded focus:outline-none" v-on:click="cancelDelete">
          Annuler
        </button>
        
        <br v-if="currentTodoList"/>
        
      </div>
      <div class="w-screen">
        <TodoList ref="todolistDisplay" v-if="currentTodoList" v-bind="{id: currentTodoList.id, name: currentTodoList.name}"/>
      </div>
    </div>

    <div v-if="getterToken === null">
      <h1 class="text-red-600 font-bold text-xl">Veuillez vous connecter</h1>
    </div>

  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

// Import components:
import Sidebar from '../components/Sidebar.vue'
import TodoList from '../components/TodoList.vue'

export default defineComponent({
  name: 'Home',
  data() {
    return {
      currentTodoList: null,
      confirmedDeletion: false
    }
  },
  mounted() {
    if (localStorage.getItem('token') !== null) {
      this.load();
    }
  },

  created() {
    this.tryLoadTokenFromMemory();
    document.title = 'ToDo List';
  },

  methods: {
    ...mapActions('todolist', ['load', 'deleteTodoList']),
    ...mapActions('account', ['login', 'getUser', 'tryLoadTokenFromMemory']),
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
      if (this.currentTodoList != null && this.$refs.todolistDisplay != null) {
        this.$refs.todolistDisplay.changeFilter('all');
      }
      this.confirmedDeletion = false;
    },
    deleteTodoList_() {
      if (this.confirmedDeletion) {
        if (this.currentTodoList != null) {
          this.deleteTodoList({
            id: this.currentTodoList.id
          });
          this.currentTodoList = null;
        }
      }
      this.confirmedDeletion = !this.confirmedDeletion;
    },
    cancelDelete() {
      this.confirmedDeletion = false;
    }
  },
  computed: {
    ...mapGetters('todolist', ['getTodoLists']),
    ...mapGetters('account', ['getterToken'])
  },
  components: {
    Sidebar,
    TodoList
  }
})

</script>
