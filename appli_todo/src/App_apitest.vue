<template>

  <!--
  <TodoList idList="f3b4"/>
  -->
  
  <h1>Online: {{ this.onLine }}</h1>
  <p>Int test</p>

  <div class="container">

    
      <div id="control" class="left">

        <input v-model="testid"/>

      <!--    <button v-on:click="showID">Show ID</button>  -->

        <button v-on:click="doRegister">Test Register</button>

      <!--  <button v-on:click="showRegisterToken">Show Register Token</button>  -->

        <button v-on:click="doLogin">Test Login</button>

      <!--  <button v-on:click="showLoginToken">Show Login Token</button>  -->

        <button v-on:click="getUser">Test getUser</button>
        <button v-on:click="load">Test load</button>
        <br/><br/>


        Create TodoList: <input v-model="newTodoListName"/> <button v-on:click="doCreateTodoList">Create todoList</button>
        <br/>

        Delete first TodoList: <button v-on:click="doDeleteTodoList">Delete</button>
        <br/><br/>


        Create Todo: <input v-model="newTodoName"/> <button v-on:click="doCreateTodo">Create todo</button>
        <br/>

        Delete first Todo: <button v-on:click="doDeleteTodo">Delete</button>
        <br/><br/>


        <button v-on:click="loadDataTemp">Load Data</button>
        <br/>
        
        Name: <input v-model="currTodoName"/>
        <br/>
        Fini: <input type="checkbox" v-model="currTodoCompleted"/>
        <br/>
        Id: <input v-model="currTodoId"/>
        <br/>
        IdList: <input v-model="currTodoIdList"/>
        <br/>

        <button v-on:click="doCompleteTodo">Complete Todo</button>
        <button v-on:click="doModifyTodo">Modify Todo</button>
        <br/>

      </div>
      


      <div id="output" class="right">

        ID: {{ this.testid }}
        <br/><br/>

        Token: <p style="font-size: 10px;"> {{ this.loginToken }} </p>

        UserData: {{ this.userData }}
        <br/><br/>

        TodoListsGet: {{ this.todoListsGet }}
        <br/><br/>

        NewTodoListName: {{ this.newTodoListName }}
        <br/><br/>

        NewTodoName: {{ this.newTodoName }}
        <br/><br/>

      </div>


  </div>


  <!--
  <TodoList  v-for="(item, index) in getListOfTodos" :key="index" v-bind:idList="item.unique_id"/>
  -->

</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: 'App',

  data() {
    return {

      //testid: Math.random().toString(36).substring(7),
      testid: '33t6ws',

      newTodoListName: '',
      newTodoName: '',

      currTodoName: '',
      currTodoId: '',
      currTodoIdList: '',
      currTodoCompleted: false,


      onLine: navigator.onLine,
      showBackOnline: false
    }
  },

  computed: {
    ...mapGetters(
      "account", 
      { 
        loginToken: 'getterToken',
        userData: 'getterUser',
        //todoListsGet: 'getterTodos'
      }
    ),

    ...mapGetters(
      "todolist", 
      { 
        todoListsGet: 'getTodoLists'
      }
    )
  },

  mounted() {
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  },
  beforeUnmount() {
    window.removeEventListener('online', this.updateOnlineStatus);
    window.removeEventListener('offline', this.updateOnlineStatus);
  },

  methods: {

    updateOnlineStatus(e) {
      const {
        type
      } = e;
      this.onLine = type === 'online';
    },

//#region API

    ...mapActions(
        "account", 
        [
          'login',
          'getUser'
        ]
    ),

    ...mapActions(
        "todolist", 
        [
          'load',
          'createTodoList',
          'deleteTodoList',
          'createTodo',
          'deleteTodo',
          'completeTodo',
        ]
    ),
    ...mapActions(
      "todolist", 
      { 
        modifyTodo: 'updateTodo'
      }
    ),

    showID() {
      console.log(this.testid);
    },

    showRegisterToken() {
      console.log(this.registerToken);
    },

    showLoginToken() {
      console.log(this.loginToken);
    },

    doRegister() {
      this.register(
        { 
          username: 'TestAPI' + this.testid,
          email: 'TestAPI' + this.testid + '@monmail.fr.nf', 
          password: 'Toto1234##',

          callback: (result) => {
            if (result.status == 200) {
              console.log('Connection effectuee')
              this.load();
              this.getUser();
            } else {
              console.log('Erreur de connection')
            }
          }

        }
      );
    },


    doLogin() {
      this.login(
        { 

          email: 'TestAPI' + this.testid + '@monmail.fr.nf', 
          password: 'Toto1234##',
          
          callback: (result) => {
            if (result.status == 200) {
              console.log('Connection effectuee')
              this.load();
              this.getUser();
            } else {
              console.log('Erreur de connection')
            }
          }
          

        }
      );
    },


    doCreateTodoList() {
      this.createTodoList(
        {
          name: this.newTodoListName,
          callback: () => {
            this.load();
          }
        }
      );
    },


    doDeleteTodoList() {
      this.deleteTodoList(
        {
          id: this.todoListsGet[0]['id'],
          callback: this.load
        }
      );
    },


    doCreateTodo() {
      this.createTodo(
        {
          name: this.newTodoName,
          completed: 0,
          id: this.todoListsGet[0]['id'],
          callback: () => {
            //console.log(res)
            this.load()
          }
        }
      )
    },


    doDeleteTodo() {
      this.deleteTodo(
        {
          id: this.todoListsGet[0]['id'],
          idTodo: this.todoListsGet[0]['todos'][0]['id'],
          callback: this.load
        }
      )
    },


    loadDataTemp() {
      var tmptodosstuff = this.todoListsGet.map( x => x['todos']).flat();

      this.currTodoName = tmptodosstuff[0].name;
      this.currTodoCompleted = (tmptodosstuff[0].completed ? true : false);
      this.currTodoId = tmptodosstuff[0].id;
      this.currTodoIdList = tmptodosstuff[0].todolist_id;

    },


    doCompleteTodo() {
      this.completeTodo(
        {
          idTodo: this.currTodoId,
          id: this.currTodoIdList,
          callback: () => {
            this.load({
              callback: () => {
                this.loadDataTemp();
              }
            });
          }
        }
      );
    },


    doModifyTodo() {
      this.modifyTodo(
        {
          idTodo: this.currTodoId,
          id: this.currTodoIdList,
          todo: {
            name: this.currTodoName,
            completed: this.currTodoCompleted,
          },
          callback: () => {
            this.load({
              callback: () => {
                this.loadDataTemp();
              }
            });
          }
        }
      );
    }
//#endregion

  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  display: flex;
}

.left {
  width:25%;
  background:lightblue;
  display:inline-block;

}
.right {
  width:70%;
  background:white;
  display:inline-block;
  padding-left: 40px;
  position: relative;
  word-wrap: break-word;

}



</style>
