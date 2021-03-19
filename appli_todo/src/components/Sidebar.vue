<template>
<!-- div for debug -->
<div style="background-color: orange">
  
  <ul v-for="todolist in getTodoLists" :key="generateKey(todolist)">
    <li style="list-style-type: none"> 
      <SidebarItem v-bind="{id: todolist.id, name: todolist.name}" v-on:click="changeCurrentTodoList(todolist)"/>
    </li>
  </ul>
  
  <input type="text" name="newTodoListName" v-model="newTodoListName">
  <button v-on:click="addTodoList">Ajouter</button>
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
