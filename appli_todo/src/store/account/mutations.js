export function load(state, data) {
	state.account = data
}

export function signup(state, data) { // data={name, email, password}
	state.account.name = data.name;
	state.account.email = data.email;
	state.account.token = "1";
}

export function login(state, data) { // data={email, password}
	state.account.name = "user";
	state.account.email = data.email;
	state.account.token = "1";
}

export function logout(state, data) { // data={}
	data == data;
	state.account.name = "";
	state.account.email = "";
	state.account.token = "";
}
