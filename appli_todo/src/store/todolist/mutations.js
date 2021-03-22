export function load(state, data) {
	state.todoLists = data;
	if (state.todoLists) {
		state.todoLists.forEach((list) => {
			list.todos.forEach((todo) => {
				todo.completed = todo.completed == 1 ? true : false
			})
		})
	}
}


export function createTodoList(state, data) {
	state.todoLists.push(
		{
			"id": data.id,
			"name": data.name,
			"todos": []
		}
	);
}


export function deleteTodoList(state, id) {
	state.todoLists = state.todoLists.filter((todoList) => todoList.id != id);
}


export function createTodo(state, data) {

	const todoList = state.todoLists.find(todoList => todoList.id === data.todolist_id);

	todoList.todos.push(
		{
			"id": data.id,
			"name": data.name,
			"completed": false
		}
	);
}


export function deleteTodo(state, data) {

	const todoList = state.todoLists.find(todoList => todoList.id === data.id);
	todoList.todos = todoList.todos.filter((todo) => todo.id != data.idTodo);
}


export function completeTodo(state, data) {
	
	const todoList = state.todoLists.find(todoList => todoList.id === data.id);
	const todo = todoList.todos.find(todo => todo.id === data.idTodo);

	todo.completed = true;
}


export function updateTodo(state, data) {

	const todoList = state.todoLists.find(todoList => todoList.id === data.id);
	const todo = todoList.todos.find(todo => todo.id === data.idTodo);
	
	todo.name = data.todo.name;
	todo.completed = data.todo.completed;
}
