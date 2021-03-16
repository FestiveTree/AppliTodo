export function load(state, data) {
	state.todoLists = data
}

export function createTodoList(state, data) { // data={name}
	// Find the first free id
	let ids = [];
	state.todoLists.forEach(todoList => ids.push(todoList.id));
	let id = 0;
	for (let j = 0; j < state.todoLists.length + 1; j++) {
		if (ids.indexOf(id) >= 0) {
			id++;
		} else {
			break;
		}
	}

	// Add the new todo list
	state.todoLists.push(
		{
			"id": id,
			"name": data.name,
			"todos": []
		}
	);
}

export function deleteTodoList(state, data) { // data={id}
	state.todoLists = state.todoLists.filter((todoList) => todoList.id != data.id);
}

export function createTodo(state, data) { // data={id,name}
	const todoList = state.todoLists.find(todoList => todoList.id === data.id);
	
	// Find the first free id
	let ids = [];
	todoList.todos.forEach(todo => ids.push(todo.id));
	let id = 0;
	for (let j = 0; j < todoList.todos.length + 1; j++) {
		if (ids.indexOf(id) >= 0) {
			id++;
		} else {
			break;
		}
	}

	// Add the new todo
	todoList.todos.push(
		{
			"id": id,
			"name": data.name,
			"completed": false
		}
	);
}

export function completeTodo(state, data) { // data={id,idTodo}
	const todoList = state.todoLists.find(todoList => todoList.id === data.id);
	const todo = todoList.find(todo => todo.id === data.idTodo);

	todo.completed = true;
}

export function updateTodo(state, data) { // data={id,idTodo}
	const todoList = state.todoLists.find(todoList => todoList.id === data.id);
	const todo = todoList.find(todo => todo.id === data.idTodo);
	
	todo.name = data.todo.name;
	todo.completed = data.todo.completed;
}

export function deleteTodo(state, data) { // data={id,idTodo}
	const todoList = state.todoLists.find(todoList => todoList.id === data.id);
	todoList.todos = todoList.todos.filter((todo) => todo.id != data.idTodo);
}
