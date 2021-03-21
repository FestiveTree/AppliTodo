<template>
<!-- div for debug -->
<div >
  <div class="mt-10">
  <ul class="mt-1 text-center" v-for="todolist in getTodoLists" :key="generateKey(todolist)">
    <li style="list-style-type: none"> 
      <SidebarItem v-bind="{id: todolist.id, name: todolist.name}" v-on:click="changeCurrentTodoList(todolist)"/>
    </li>
  </ul>
  </div>
  
  <input class="bg-gray-200 focus:bg-white m-1" type="text" name="newTodoListName" v-model="newTodoListName">
  <button class ="my-1 bg-gray-500 hover:bg-gray-400 text-white font-bold py-1 px-1 border-b-4 border-gray-700 hover:border-gray-500 rounded" v-on:click="addTodoList">Ajouter</button>
</div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

// import components:
import SidebarItem from './SidebarItem.vue'

export default defineComponent({
  name: 'Sidebar',
  data() {
    return {
      newTodoListName: ''
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
          name: this.newTodoListName
        }
      );
      
      this.newTodoListName = '';
    },
    // inspiration: https://stackoverflow.com/questions/40915436/vuejs-update-parent-data-from-child-component
    changeCurrentTodoList(todolist) {
      this.$emit('currentTodoList', {todolist: todolist});
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
