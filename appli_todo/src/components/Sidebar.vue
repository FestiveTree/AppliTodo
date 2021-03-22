<template>

<div >
  <div class="mt-4 ">
  <ul class="mt-1 text-center" >
    <li style="list-style-type: none" v-for="todolist in getTodoLists" :key="generateKey(todolist)"> 
      <SidebarItem v-bind:class="{ 'bg-green-700 border-green-500': todolist.id == (currentTodoList != null ? currentTodoList.id : -1) }" v-bind="{id: todolist.id, name: todolist.name}" v-on:click="changeCurrentTodoList(todolist)"/>
    </li>
  </ul>
  </div>
  
  <input class="bg-gray-200 focus:bg-white m-1 rounded" type="text" name="newTodoListName" v-model="newTodoListName" v-on:keypress.enter="addTodoList">
  <button class ="my-1 bg-gray-500 hover:bg-gray-400 text-white font-bold py-1 px-1 border-b-4 border-gray-700 hover:border-gray-500 rounded" v-on:click="addTodoList">Ajouter</button>
</div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

// Import components:
import SidebarItem from './SidebarItem.vue'

export default defineComponent({
  name: 'Sidebar',
  data() {
    return {
      newTodoListName: '',
      currentTodoList: null
    }
  },
  methods: {
    ...mapActions('todolist', ['createTodoList']),
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
          name: this.newTodoListName,
          callback: (res) => {
            if (res.status == 200) {
              const todoList = this.getTodoLists.find((todoList) => todoList.id === res.data.id);
              this.$emit('currentTodoList', {todolist: todoList});
              this.currentTodoList = todoList;
            }
          }
        }
      );
      
      this.newTodoListName = '';
    },
    // Inspiration: https://stackoverflow.com/questions/40915436/vuejs-update-parent-data-from-child-component
    changeCurrentTodoList(todolist) {
      this.$emit('currentTodoList', {todolist: todolist});
      if (todolist == this.currentTodoList) {
        this.currentTodoList = null;
        return;
      }
      this.currentTodoList = todolist;
    }
  },
  computed: {
    ...mapGetters('todolist', ['getTodoLists'])
  },
  components: {
    SidebarItem
  }
})

</script>
