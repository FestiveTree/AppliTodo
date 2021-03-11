<template>
  <p>Welcome: HOME page</p>
  
  Lists:
  <ul v-for="todoList in getTodoLists" :key="generateKey(todoList)">
    <li>
      <TodoList v-bind="{id: todoList.id, name: todoList.name}"/>
    </li>
  </ul>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

// import components:
import TodoList from '../components/TodoList.vue'

export default defineComponent({
  name: 'Home',
  created() {
    this.load()
  },
  methods: {
    ...mapActions('todolist', ['load']),
    generateKey(todolist) {
      return '$' + todolist.id + 
        '$' + todolist.name + 
        '$';
    }
  },
  computed: {
    ...mapGetters('todolist', ['getTodoLists'])
  },
  components: {
    TodoList
  }
})

</script>
