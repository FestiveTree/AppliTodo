export function load(state, data) {
	state.todoLists = data
}

export function updateTodoList(state, data) {
	const todoList = state.todoLists.find((todoList) => todoList.id === data.id);
	console.log("updateTodoList: " + todoList)

	// TODO: update todoList
}
