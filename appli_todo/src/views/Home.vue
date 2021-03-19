<template>
  <p>Welcome: HOME page</p>
  
  <h1 v-if="getTodoLists != null"> ToDoList ({{ getTodoLists.length }}) </h1>

  <ul v-for="todoList in getTodoLists" :key="generateKey(todoList)">
    <li> <TodoList v-bind="{id: todoList.id, name: todoList.name}"/> </li>
  </ul>

  <input type="text" name="newTodoListName" v-model="newTodoListName">
  <button v-on:click="addTodoList">Ajouter</button>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

// import components:
import TodoList from '../components/TodoList.vue'

export default defineComponent({
  name: 'Home',
  data() {
    return {
      newTodoListName: '',
    }
  },
  created() {

    this.login(
      { 
        
        email: 'TestAPI33t6ws@monmail.fr.nf', 
        password: 'Toto1234##',
          
        callback: (result) => {

          console.log(result);
          
          if (result.status == 200) {
            console.log('Connection effectuee')

            this.load({
              callback: (res) => {
                console.log(res);
              }
            });

            this.getUser();

          } else {
            console.log('Erreur de connection')
          }
        }
      }
    );
  },
  methods: {
    ...mapActions('todolist', ['load', 'createTodoList']),
    ...mapActions('account', ['login', 'getUser']),
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
