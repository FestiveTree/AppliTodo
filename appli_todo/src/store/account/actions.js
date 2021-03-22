import axios from 'axios';

// If the callback is an actual callback, call it with the response as a parameter.
export function callbackHandler(data, response) {
    if (typeof data !== "undefined") {
        if (typeof data.callback === "function") {
            data.callback(response)
        }
    }
}


// Register
// data: { username:   '', email:      '', password:   '' }
// Returns => Auth token
export function register({ commit }, data) {

    axios.post(
        "http://138.68.74.39/api/register?" 
        + "name="       + data.username 
        + "&email="     + data.email
        + "&password="  + data.password
    )
    .then(result => (commit("setToken", result.data['token']), localStorage.setItem('token', result.data['token']), callbackHandler(data, result)))
    .catch(error => (commit('clearToken'), console.log('error', error), callbackHandler(data, error.response)));
}


// Login
// data: { email: '', password: '' }
// Returns => Auth token
export function login({ commit }, data) {

    axios.post(
            "http://138.68.74.39/api/login?"
            + "email="      + data.email
            + "&password="  + data.password
        )
        .then(result => (commit("setToken", result.data['token']), localStorage.setItem('token', result.data['token']), callbackHandler(data, result)))
        .catch(error => (commit('clearToken'), console.log('error', error), callbackHandler(data, error.response)));
    
}


// getUser
// Returns => User info: { "id", "name", "email", "email_verified_at", "created_at", "updated_at" }
export function getUser({ commit }, data) {

    axios.get("http://138.68.74.39/api/user", 
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }
    )
    .then(result => (commit('setUser', result.data), callbackHandler(data, result)))
    .catch(error => (commit('clearToken'), console.log('error', error), callbackHandler(data, error.response)));

}

export function tryLoadTokenFromMemory({ commit }) {
    commit("tryLoadTokenFromMemory");
}


export function disconnect({ commit }) {
    commit("clearToken");
}
