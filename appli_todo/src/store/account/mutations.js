import axios from 'axios';


// If the callback is an actual callback, call it with the response as a parameter.
export function callbackHandler(data, response) {
    if (typeof data !== "undefined") {
        if (typeof data.callback === "function") {
            data.callback(response)
        }
    }
}



// Register
// data: { username:   '', email:      '', password:   '' }
// Returns => Auth token
export function register(state, data) {
    
    axios.post(
            "http://138.68.74.39/api/register?" 
            + "name="       + data.username 
            + "&email="     + data.email
            + "&password="  + data.password
        )
        .then(result => (state.token = result.data['token'], callbackHandler(data, result)))
        .catch(error => (console.log('error', error), state.token = null, callbackHandler(data, error.response)));
}


// Login
// data: { email: '', password: '' }
// Returns => Auth token
export function login(state, data) {

    axios.post(
            "http://138.68.74.39/api/login?"
            + "email="      + data.email
            + "&password="  + data.password
        )
        .then(result => (state.token = result.data['token'], callbackHandler(data, result)))
        .catch(error => (console.log('error', error), state.token = null, callbackHandler(data, error.response)));
}


// getUser
// Returns => User info: { "id", "name", "email", "email_verified_at", "created_at", "updated_at" }
export function getUser(state, data) {

    axios.get("http://138.68.74.39/api/user", 
        {
            headers: {
                'Authorization': 'Bearer ' + state.token,
                'Content-Type': 'application/json'
            }
        }
    )
    .then(result => (state.currentUser = result.data, callbackHandler(data, result)))
    .catch(error => (console.log('error', error), state.token = null, callbackHandler(data, error.response)));

}


// getTodos
// Returns => Todos
export function getTodos(state, data) {

    axios.get("http://138.68.74.39/api/todolists", 
        {
            headers: {
                'Authorization': 'Bearer ' + state.token,
                'Content-Type': 'application/json'
            }
        }
    )
    .then(result => (state.todos = result.data, callbackHandler(data, result)))
    .catch(error => (console.log('error', error), callbackHandler(data, error.response)));

}


// createTodoList
// data: { name: '', (callback: Optional: Function to call after completion) }
export function createTodoList(state, data) {
    axios.post("http://138.68.74.39/api/todolist?name=" + data.name, {},
        {
            headers: {
                'Authorization': 'Bearer ' + state.token,
                'Content-Type': 'application/json'
            }
        }
    )
    .then(result => callbackHandler(data, result))
    .catch(error => (console.log('error', error), callbackHandler(data, error.response)));
}


// deleteTodoList
// data: { id: '', (callback: Optional: Function to call after completion) }
export function deleteTodoList(state, data) {
    axios.delete("http://138.68.74.39/api/todolist/" + data.id,
        {
            headers: {
                'Authorization': 'Bearer ' + state.token,
                'Content-Type': 'application/json'
            }
        }
    )
    .then(result => callbackHandler(data, result))
    .catch(error => (console.log('error', error), callbackHandler(data, error.response)));
}


// createTodo
// data: { name: '', completed: 0/1, todolist_id: 0, (callback: Optional: Function to call after completion) }
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
    .then(result => callbackHandler(data, result))
    .catch(error => (console.log('error', error), callbackHandler(data, error.response)));
    
}


// deleteTodo
// data: { id: 0, (callback: Optional: Function to call after completion) }
export function deleteTodo(state, data) {

    axios.delete("http://138.68.74.39/api/todo/" + data.id,
        {
            headers: {
                'Authorization': 'Bearer ' + state.token,
                'Content-Type': 'application/json'
            }
        }
    )
    .then(result => callbackHandler(data, result))
    .catch(error => (console.log('error', error), callbackHandler(data, error.response)));
    
}


// completeTodo
// data: { id:0, name: '', completed: 0/1, todolist_id: 0, (callback: Optional: Function to call after completion) }
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
    .then(result => callbackHandler(data, result))
    .catch(error => (console.log('error', error), callbackHandler(data, error.response)));
    
}


// modifyTodo
// data: { id:0, name: '', completed: 0/1, todolist_id: 0, (callback: Optional: Function to call after completion) }
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
    .then(result => callbackHandler(data, result))
    .catch(error => (console.log('error', error), callbackHandler(data, error.response)));
    
}
