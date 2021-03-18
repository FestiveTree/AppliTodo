export function register({ commit }, data) {
    commit("register", data);
}

export function login({ commit }, data) {
    commit("login", data);
}

export function getUser({ commit }) {
    commit("getUser");
}

export function getTodos({ commit }) {
    commit("getTodos");
}

export function createTodoList({ commit }, data) {
    commit("createTodoList", data);
}

export function deleteTodoList({ commit }, data) {
    commit("deleteTodoList", data);
}

export function createTodo({ commit }, data) {
    commit("createTodo", data);
}

export function deleteTodo({ commit }, data) {
    commit("deleteTodo", data);
}

export function completeTodo({ commit }, data) {
    commit("completeTodo", data);
}

export function modifyTodo({ commit }, data) {
    commit("modifyTodo", data);
}
