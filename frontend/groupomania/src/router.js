import Vue from "vue";

import Router from "vue-router";

import Home from "./components/Home.vue";

import Login from "./components/Login.vue";

import Register from "./components/Register.vue";

import Profile from "./components/Profile.vue";

import Users from "./components/Users.vue";

Vue.use(Router);

export default new Router({
	mode: "history",
	routes: [
		{ path: "/login", component: Login },
		{ path: "/posts", component: Home },
		{ path: "/register", component: Register },
		{ path: "/users", component: Users },
		{ path: "/profile", component: Profile },
		{ path: "/", component: Login },
	],
});
