export function getTodoLists(state) {
	return state.todoLists;
}

export const getTodoList = (state) => (id) => {
	return state.todoLists.find((todoList) => todoList.id === id);
}
