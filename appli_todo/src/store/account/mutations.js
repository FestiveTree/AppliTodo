import axios from 'axios';

// Register
// data: { username:   '', email:      '', password:   '' }
// Returns => Auth token
export function register(state, data) {
    
    // Todo: Validation
    axios.post(
            "http://138.68.74.39/api/register?" 
            + "name="       + data.username 
            + "&email="     + data.email
            + "&password="  + data.password
        )
        .then(result => state.token = result.data['token'])
        .catch(error => console.log('error', error));
}


// Login
// data: { email: '', password:   '' }
// Returns => Auth token
export function login(state, data) {

    // Todo: Validation
    axios.post(
            "http://138.68.74.39/api/login?"
            + "email="      + data.email
            + "&password="  + data.password
        )
        .then(result => state.token = result.data['token'])
        .catch(error => (console.log(error), state.token = null));
}


// getUser
// Returns => User info: { "id", "name", "email", "email_verified_at", "created_at", "updated_at" }
export function getUser(state) {

    axios.get("http://138.68.74.39/api/user", 
        {
            headers: {
                'Authorization': 'Bearer ' + state.token,
                'Content-Type': 'application/json'
            }
        }
    )
    .then(result => state.currentUser = result.data)
    .catch(error => (console.log(error), state.token = null));

}


// getTodos
// Returns => Todos
export function getTodos(state) {


    axios.get("http://138.68.74.39/api/todolists", 
        {
            headers: {
                'Authorization': 'Bearer ' + state.token,
                'Content-Type': 'application/json'
            }
        }
    )
    .then(result => state.todos = result.data)
    .catch(error => console.log('error', error));

}


// createTodoList
// data: { name: '' }
export function createTodoList(state, data) {
    axios.post("http://138.68.74.39/api/todolist?name=" + data.name, {},
        {
            headers: {
                'Authorization': 'Bearer ' + state.token,
                'Content-Type': 'application/json'
            }
        }
    )
    //.then(() => this.getTodoLists())
    .catch(error => console.log('error', error));
}


// deleteTodoList
// data: { id: '' }
export function deleteTodoList(state, data) {
    axios.delete("http://138.68.74.39/api/todolist/" + data.id,
        {
            headers: {
                'Authorization': 'Bearer ' + state.token,
                'Content-Type': 'application/json'
            }
        }
    )
    .catch(error => console.log('error', error));
}


// createTodo
// data: { name: '', completed: 0/1, todolist_id: 0 }
export function createTodo(state, data) {

    axios.post(
        "http://138.68.74.39/api/todo?" 
        + "name="           + data.name 
        + "&completed="     + data.completed 
        + "&todolist_id="   + data.todolist_id
        ,
        {},
      {
        headers: {
          'Authorization': 'Bearer ' + state.token,
          'Content-Type': 'application/json'
        }
      }
    )
      .catch(error => console.log('error', error));
    
}


// deleteTodo
// data: { id: 0 }
export function deleteTodo(state, data) {

    axios.delete("http://138.68.74.39/api/todo/" + data.id,
        {
            headers: {
                'Authorization': 'Bearer ' + state.token,
                'Content-Type': 'application/json'
            }
        }
    )
    .catch(error => console.log('error', error));
    
}


// completeTodo
// data: { id:0, name: '', completed: 0/1, todolist_id: 0 }
export function completeTodo(state, data) {

    axios.post("http://138.68.74.39/api/completeTodo/" + data.id 
    + "?name="          + data.name 
    + "&completed="     + data.completed
    + "&todolist_id="   + data.todolist_id,
    {},
        {
            headers: {
                'Authorization': 'Bearer ' + state.token,
                'Content-Type': 'application/json'
            }
        }
    )
    .catch(error => console.log('error', error));
    
}


// modifyTodo
// data: { id:0, name: '', completed: 0/1, todolist_id: 0 }
export function modifyTodo(state, data) {

    axios.patch("http://138.68.74.39/api/todo/" + data.id 
    + "?name="          + data.name 
    + "&completed="     + data.completed
    + "&todolist_id="   + data.todolist_id,
    {},
    {
      headers: {
        'Authorization': 'Bearer ' + state.token,
        'Content-Type': 'application/json'
      }
    }
  )
    .catch(error => console.log('error', error));
    
}
