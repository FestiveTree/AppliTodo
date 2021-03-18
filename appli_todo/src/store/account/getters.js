export function getterToken(state) {
    return state.token;
}

export function getterUser(state) {
    return state.currentUser;
}

export function getterTodos(state) {
    return state.todos;
}

export function getSpecificList(state) {
    return function (idTodoList) {
        if (state.todos != null) {
            return state.todos.find((todo) => todo.unique_id === idTodoList);
        }
        return null;
    }
}