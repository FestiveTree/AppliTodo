export function setToken(state, token) {
    state.token = token;
}

export function clearToken(state) {
    state.token = null;
    localStorage.removeItem('token');
    console.log("Token cleared");
}

export function tryLoadTokenFromMemory(state) {
    if (localStorage.getItem('token') != null) {
        state.token = localStorage.getItem('token');
    }
}

export function setUser(state, userData) {
    this.userData = userData;
}