export function getTodoLists(state) {
	return state.todoLists;
}

// filter: ['all', 'completed', 'not completed']
export const getTodos = (state) => (id, filter) => {
	const todoList = state.todoLists.find((todoList) => todoList.id === id);
	const todos = todoList ? todoList.todos : null;
	
	if (todos !== null) {
		if (filter === 'completed') {
			return todos.filter((todo) => todo.completed == 1);
		} else if (filter === 'not completed') {
			return todos.filter((todo) => todo.completed == 0);
		}
	}
	
	return todos;
}
