export function load({ commit }) {
	
	commit("load", [
		{
			"id": 0,
			"name": "todo list 0",
			"todos": [
				{
					"id": 0,
					"name": "todo 0 in list 0",
					"completed": false
				},
				{
					"id": 1,
					"name": "todo 1 in list 0",
					"completed": true
				}
			]
		},
		{
			"id": 1,
			"name": "todo list 1",
			"todos": [
				{
					"id": 0,
					"name": "todo 0 in list 1",
					"completed": false
				},
				{
					"id": 1,
					"name": "todo 1 in list 1",
					"completed": false
				}
			]
		}
	]);
	
}

export function createTodoList({ commit }, data) { // data={name}
	commit("createTodoList", data);
}

export function createTodo({ commit }, data) { // data={id,name}
	commit("createTodo", data);
}

export function completeTodo({ commit }, data) { // data={id,idTodo}
	commit("completeTodo", data);
}

export function updateTodo({ commit }, data) { // data={id,idTodo}
	commit("updateTodo", data);
}

export function deleteTodo({ commit }, data) { // data={id,idTodo}
	commit("deleteTodo", data);
}
