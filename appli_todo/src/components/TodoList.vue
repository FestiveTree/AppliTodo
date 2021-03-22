<template>
<div class="bg-gray-600 items-center border-4 rounded">
  <h2 class="text-4xl pb-4 px-4 underline "> {{ name }} : </h2>
  
  <ul  v-for="todo in getTodos(id,filter)" :key="generateKey(todo)">
    <li class="pl-8 pb-2" style="list-style-type: none"> 
      <input class="mx-2 w-6 h-6 form-checkbox " type="checkbox" v-model="todo.completed" @update:modelValue="completeTodo_(todo)">
      <span class="text-2xl " :id="'spa'+todo.id" style="" v-on:click="modify(todo)">{{ todo.name }}</span>
      <input class="text-2xl rounded" :id="'mod'+todo.id" type="hidden" v-model="newName">
      <button class="ml-2 bg-amber-500 hover:bg-orange-300 text-white font-bold px-2 pt-2 border-b-2 border-orange-500 hover:border-orange-400 rounded" :id="'but'+todo.id" style="display: none" v-on:click="changeTodo(todo, newName), modify(todo)"> ✏ </button>
      <button class="mx-2 bg-red-500 hover:bg-red-400 text-white font-bold px-2 pt-2 border-b-2 border-red-700 hover:border-red-500 rounded" v-on:click="removeTodo(todo.id)"> 🗑️ </button>
    </li>
  </ul>

  <input class="ml-5 rounded" type="text" name="newTodoName" v-model="newTodoName">
  <button class="mx-2 bg-green-600 hover:bg-green-400 text-white font-bold px-2  border-b-4 border-green-800 hover:border-green-500 rounded" v-on:click="addTodo">➕</button>
  <br> <br>
  <button :disabled="filter == 'all'" class="disabled:bg-red-500 ml-5 mx-1 my-1 bg-gray-500 hover:bg-gray-400 text-white font-bold py-1 px-1 border-b-4 border-gray-700 hover:border-gray-500 rounded" v-on:click="changeFilter('all')"> Toutes </button>
  <button :disabled="filter == 'not completed'" class="disabled:bg-red-500 mx-1 my-1 bg-gray-500 hover:bg-gray-400 text-white font-bold py-1 px-1 border-b-4 border-gray-700 hover:border-gray-500 rounded" v-on:click="changeFilter('not completed')"> A faire </button>
  <button :disabled="filter == 'completed'" class="disabled:bg-red-500 mx-1 my-1 bg-gray-500 hover:bg-gray-400 text-white font-bold py-1 px-1 border-b-4 border-gray-700 hover:border-gray-500 rounded" v-on:click="changeFilter('completed')"> Faites </button>
  </div>
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
      filter: 'all',
      newName: ''
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
    ...mapActions('todolist', ['createTodo', 'completeTodo', 'deleteTodo', 'updateTodo']),
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
    },
    changeTodo(todo, newName) {
      if (todo.name == newName){
        this.newName = '';
        return;
      }
      todo.name = newName;
      this.updateTodo( 
        {
          id: this.id,
          idTodo: todo.id,
          todo: todo
        }
      )
      this.newName = '';
    },
    modify(todo) {
      this.getTodos(this.id).forEach(elm => { 
        if (elm.id != todo.id) {
          document.getElementById('mod'+elm.id).type = "hidden";
          document.getElementById('spa'+elm.id).style.display = "";
          document.getElementById('but'+elm.id).style.display = "none";
        }
      });
      document.getElementById('mod'+todo.id).type = (document.getElementById('mod'+todo.id).type == "text" ? "hidden" : "text");
      document.getElementById('spa'+todo.id).style.display = (document.getElementById('spa'+todo.id).style.display == "" ? "none" : "");
      document.getElementById('but'+todo.id).style.display = (document.getElementById('but'+todo.id).style.display == "" ? "none" : "");
      this.newName = todo.name;
    }
  },
  computed: {
    ...mapGetters('todolist', ['getTodos', 'getTodoLists'])
  }
})

</script>
