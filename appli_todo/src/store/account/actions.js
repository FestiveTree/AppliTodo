export function load({ commit }) {
	
	commit("load", {
		"name": "user1",
		"email": "user1@user1.com",
		"token": ""
	});
	
}

export function signup({ commit }, data) { // data={name, email, password}
	commit("signup", data);
}

export function login({ commit }, data) { // data={email, password}
	commit("login", data);
}

export function logout({ commit }, data) { // data={}
	commit("logout", data);
}
