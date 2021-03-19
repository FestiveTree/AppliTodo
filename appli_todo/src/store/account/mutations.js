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
export function register(state, data) {
    
    axios.post(
            "http://138.68.74.39/api/register?" 
            + "name="       + data.username 
            + "&email="     + data.email
            + "&password="  + data.password
        )
        .then(result => (localStorage.setItem('token', result.data['token']), state.token = result.data['token'], callbackHandler(data, result)))
        .catch(error => (console.log('error', error), state.token = null, callbackHandler(data, error.response)));
}


// Login
// data: { email: '', password: '' }
// Returns => Auth token
export function login(state, data) {

    axios.post(
            "http://138.68.74.39/api/login?"
            + "email="      + data.email
            + "&password="  + data.password
        )
        .then(result => (localStorage.setItem('token', result.data['token']), state.token = result.data['token'], callbackHandler(data, result)))
        .catch(error => (console.log('error', error), state.token = null, callbackHandler(data, error.response)));
    
}


// getUser
// Returns => User info: { "id", "name", "email", "email_verified_at", "created_at", "updated_at" }
export function getUser(state, data) {

    axios.get("http://138.68.74.39/api/user", 
        {
            headers: {
                'Authorization': 'Bearer ' + state.token,
                'Content-Type': 'application/json'
            }
        }
    )
    .then(result => (state.currentUser = result.data, callbackHandler(data, result)))
    .catch(error => (console.log('error', error), state.token = null, callbackHandler(data, error.response)));

}
