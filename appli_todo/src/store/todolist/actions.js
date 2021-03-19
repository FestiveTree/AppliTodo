export function load({ commit }, data) {
	commit("load", data);
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
