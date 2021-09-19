import Vue from "vue";

import Router from "vue-router";

import Home from "./views/Home.vue";

import Login from "./views/Login.vue";

import Register from "./views/Register.vue";

import Profile from "./views/Profile.vue";

import Users from "./views/Users.vue";

Vue.use(Router);

export default new Router({
	mode: "history",
	routes: [
		{ path: "/login", name: "Login", component: Login },
		{ path: "/posts", name: "Home", component: Home },
		{ path: "/register", name: "Register", component: Register },
		{ path: "/users", name: "Users", component: Users },
		{ path: "/profile", name: "Profile", component: Profile },
		{ path: "/", name: "Login", component: Login },
	],
});
