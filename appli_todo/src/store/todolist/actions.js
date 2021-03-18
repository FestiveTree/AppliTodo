export function load({ commit }) {
	
	commit("load", [
		{
			"id": 0,
			"name": "Liste 1",
			"todos": [
				{
					"id": 0,
					"name": "Test 1",
					"completed": false
				},
				{
					"id": 1,
					"name": "Test 2",
					"completed": true
				}
			]
		},
		{
			"id": 1,
			"name": "Liste 2",
			"todos": [
				{
					"id": 0,
					"name": "Test 3",
					"completed": false
				},
				{
					"id": 1,
					"name": "Test 4",
					"completed": false
				}
			]
		}
	]);
	
}

export function createTodoList({ commit }, data) { // data={name}
	commit("createTodoList", data);
}

export function deleteTodoList({ commit }, data) { // data={id}
	commit("deleteTodoList", data);
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
