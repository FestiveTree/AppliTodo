import axios from 'axios';

// If the data has a callback and the callback is valid, call it with the response as a parameter.
export function callbackHandler(data, response) {
    if (typeof data !== "undefined") {
        if (typeof data.callback === "function") {
            data.callback(response)
        }
    }
}


export function load({ commit }, data) {
	axios.get("http://138.68.74.39/api/todolists", 
	{
		headers: {
			'Authorization': 'Bearer ' + localStorage.getItem('token'),
			'Content-Type': 'application/json'
		}
	}
	)
	.then(result => (commit("load", result.data), callbackHandler(data, result)))
	.catch(error => {
		if (error.response.status == 401) {
			console.log("Unauthorized");
			commit('account/clearToken', null, { root: true });
		}
		callbackHandler(data , error.response);
	}
);
}


// createTodoList
// data: { name, (callback: Optional: Function to call after completion) }
export function createTodoList({ commit }, data) { // data={name}

	axios.post("http://138.68.74.39/api/todolist?name=" + data.name, {},
	{
		headers: {
			'Authorization': 'Bearer ' + localStorage.getItem('token'),
			'Content-Type': 'application/json'
		}
	}
	)
	.then(result => (commit("createTodoList", { id: result.data.id, name: data.name }), callbackHandler(data, result)))
	.catch(error => {
		if (error.response.status == 401) {
			console.log("Unauthorized");
			commit('account/clearToken', null, { root: true });
		}
		callbackHandler(data , error.response);
	}
);
}


// deleteTodoList
// data: { id, (callback: Optional: Function to call after completion) }
export function deleteTodoList({ commit }, data) {

	commit("deleteTodoList", data.id)

	//Delete remotely
	axios.delete("http://138.68.74.39/api/todolist/" + data.id,
	{
		headers: {
			'Authorization': 'Bearer ' + localStorage.getItem('token'),
			'Content-Type': 'application/json'
		}
	}
	)
	.then(result => (callbackHandler(data, result)))
	.catch(error => {
		if (error.response.status == 401) {
			console.log("Unauthorized");
			commit('account/clearToken', null, { root: true });
		}
		callbackHandler(data , error.response);
	}
);
}


// createTodo
// data: { id, name, callback: Optional: Function to call after completion) }
export function createTodo({ commit }, data) {

	axios.post(
        "http://138.68.74.39/api/todo?" 
        + "name="           + data.name 
        + "&completed="     + 0 
        + "&todolist_id="   + data.id
        ,
        {},
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      }
    )
	.then(result => (commit("createTodo", result.data), callbackHandler(data, result)))
	.catch(error => {
		if (error.response.status == 401) {
			console.log("Unauthorized");
			commit('account/clearToken', null, { root: true });
		}
		callbackHandler(data , error.response);
	}
);
}


// deleteTodo
// data: { id, idTodo (callback: Optional: Function to call after completion) }
export function deleteTodo({ commit }, data) {

	commit("deleteTodo", data)

	//Delete remotely
	axios.delete("http://138.68.74.39/api/todo/" + data.idTodo,
	{
		headers: {
			'Authorization': 'Bearer ' + localStorage.getItem('token'),
			'Content-Type': 'application/json'
		}
	}
	)
	.then(result => (callbackHandler(data, result)))
	.catch(error => {
		if (error.response.status == 401) {
			console.log("Unauthorized");
			commit('account/clearToken', null, { root: true });
		}
		callbackHandler(data , error.response);
	}
);
}


// completeTodo
// data: { id, idTodo, todo, (callback: Optional: Function to call after completion) }
// eslint-disable-next-line no-unused-vars
export function completeTodo({ commit }, data) {

    axios.post("http://138.68.74.39/api/completeTodo/" + data.idTodo
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
	.catch(error => {
		if (error.response.status == 401) {
			console.log("Unauthorized");
			commit('account/clearToken', null, { root: true });
		}
		callbackHandler(data , error.response);
	}
);
}

// updateTodo
// data: { id, idTodo, todo, (callback: Optional: Function to call after completion) }
// eslint-disable-next-line no-unused-vars
export function updateTodo({ commit }, data) {

	commit("updateTodo", data);
	
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
	.catch(error => {
		if (error.response.status == 401) {
			console.log("Unauthorized");
			commit('account/clearToken', null, { root: true });
		}
		callbackHandler(data , error.response);
	}
);
}
