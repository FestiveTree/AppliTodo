export function register({ commit }, data) {
    commit("register", data);
}

export function login({ commit }, data) {
    commit("login", data);
}

export function getUser({ commit }) {
    commit("getUser");
}
