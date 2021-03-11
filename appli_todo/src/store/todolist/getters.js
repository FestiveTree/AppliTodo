export function getTodoLists(state) {
	return state.todoLists;
}

export const getTodos = (state) => (id) => {
	const todoList = state.todoLists.find((todoList) => todoList.id === id);
	return todoList ? todoList.todos : null;
}
