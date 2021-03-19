import axios from 'axios';

// If the data has a callback and the callback is valid, call it with the response as a parameter.
export function callbackHandler(data, response) {
    if (typeof data !== "undefined") {
        if (typeof data.callback === "function") {
            data.callback(response)
        }
    }
}

export function load(state, data) {

	axios.get("http://138.68.74.39/api/todolists", 
	{
		headers: {
			'Authorization': 'Bearer ' + localStorage.getItem('token'),
			'Content-Type': 'application/json'
		}
	}
	)
	.then(result => (state.todoLists = result.data, callbackHandler(data, result)))
	.then(() => {
		if (state.todoLists) {
			state.todoLists.forEach((list) => {
				list.todos.forEach((todo) => {
					todo.completed = todo.completed == 1 ? true : false
				})
			})
		}
	})
	.catch(error => (console.log('error', error), callbackHandler(data, error.response)));

}


// createTodoList
// data: { name, (callback: Optional: Function to call after completion) }
export function createTodoList(state, data) {

	axios.post("http://138.68.74.39/api/todolist?name=" + data.name, {},
	{
		headers: {
			'Authorization': 'Bearer ' + localStorage.getItem('token'),
			'Content-Type': 'application/json'
		}
	}
	)
	.then(result => (console.log(result), callbackHandler(data, result), result))
	.then((result) => {
		// Add the new todo list
		state.todoLists.push(
			{
				"id": result.data.id,
				"name": data.name,
				"todos": []
			}
		);
	})
	.catch(error => (console.log('error', error), callbackHandler(data, error.response)));

}


// deleteTodoList
// data: { id, (callback: Optional: Function to call after completion) }
export function deleteTodoList(state, data) {

	//Delete locally
	state.todoLists = state.todoLists.filter((todoList) => todoList.id != data.id);

	//Delete remotely
	axios.delete("http://138.68.74.39/api/todolist/" + data.id,
	{
		headers: {
			'Authorization': 'Bearer ' + localStorage.getItem('token'),
			'Content-Type': 'application/json'
		}
	}
	)
	.then(result => (callbackHandler(data, result), result))
	.catch(error => (console.log('error', error), callbackHandler(data, error.response)));
}


// createTodo
// data: { id, name, callback: Optional: Function to call after completion) }
export function createTodo(state, data) {

	const todoList = state.todoLists.find(todoList => todoList.id === data.id);

	axios.post(
        "http://138.68.74.39/api/todo?" 
        + "name="           + data.name 
        + "&completed="     + 0 
        + "&todolist_id="   + todoList.id
        ,
        {},
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      }
    )
	.then(result => (console.log(result), callbackHandler(data, result), result))
	.then((result) => {
		// Add the new todo
		todoList.todos.push(
			{
				"id": result.data.id,
				"name": data.name,
				"completed": false
			}
		);
	})
    .catch(error => (console.log('error', error), callbackHandler(data, error.response)));
}


// deleteTodo
// data: { id, idTodo (callback: Optional: Function to call after completion) }
export function deleteTodo(state, data) {

	//Delete locally
	const todoList = state.todoLists.find(todoList => todoList.id === data.id);
	todoList.todos = todoList.todos.filter((todo) => todo.id != data.idTodo);

	//Delete remotely
	axios.delete("http://138.68.74.39/api/todo/" + data.idTodo,
	{
		headers: {
			'Authorization': 'Bearer ' + localStorage.getItem('token'),
			'Content-Type': 'application/json'
		}
	}
	)
	.then(result => (console.log(result), callbackHandler(data, result)))
	.catch(error => (console.log('error', error), callbackHandler(data, error.response)));
}


// completeTodo
// data: { id, idTodo, todo, (callback: Optional: Function to call after completion) }
export function completeTodo(state, data) {
		
	const todoList = state.todoLists.find(todoList => todoList.id === data.id);
	const todo = todoList.todos.find(todo => todo.id === data.idTodo);

    axios.post("http://138.68.74.39/api/completeTodo/" + data.idTodo
    + "?name="          + todo.name 
    + "&completed="     + (todo.completed ? 1 : 0)
    + "&todolist_id="   + data.id,
    {},
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }
    )
    .then(result => callbackHandler(data, result))
    .catch(error => (console.log('error', error), callbackHandler(data, error.response)));
}


// updateTodo
// data: { id, idTodo, todo, (callback: Optional: Function to call after completion) }
export function updateTodo(state, data) {

	const todoList = state.todoLists.find(todoList => todoList.id === data.id);
	const todo = todoList.todos.find(todo => todo.id === data.idTodo);
	
	todo.name = data.todo.name;
	todo.completed = data.todo.completed;
	
	axios.patch("http://138.68.74.39/api/todo/" + data.idTodo
    + "?name="          + data.todo.name 
    + "&completed="     + (data.todo.completed ? 1 : 0)
    + "&todolist_id="   + data.id,
    {},
    {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    }
    )
    .then(result => callbackHandler(data, result))
    .catch(error => (console.log('error', error), callbackHandler(data, error.response)));
}
