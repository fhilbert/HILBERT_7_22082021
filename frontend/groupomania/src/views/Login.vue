<template>
	<div class="login">
		<Nav />
		<div class="card">
			<form @submit.prevent="handleSubmit">
				<h1 class="cardTitle">Connexion</h1>
				<p class="cardSubtitle">
					Pas inscrit ? <span class="cardAction" @click="createAccount()">Créer un compte</span>
				</p>
				<br />
				<div class="cardForm">
					<input type="email" class="cardFormInput" v-model="email" placeholder="Email" />
				</div>
				<div class="cardForm">
					<input type="password" class="cardFormInput" v-model="password" placeholder="Mot de Passe" />
				</div>
				<button @click="handleSubmit" class="button">Connexion</button>
				<br />
				<div>{{ message }}</div>
			</form>
		</div>
	</div>
</template>
<script>
import Nav from "../components/Nav.vue";

import axios from "axios";
export default {
	name: "Login",
	components: {
		Nav,
	},
	data() {
		return {
			email: "",
			password: "",
			userId: "",
			message: "",
		};
	},
	methods: {
		createAccount() {
			this.$router.push("/register");
		},
		async handleSubmit() {
			if (!this.email || !this.password) {
				this.message = "Certains champs non remplis !!!";
				return;
			}
			const response = await axios.post("auth/login", {
				email: this.email,
				password: this.password,
				passwordConfirm: this.passwordConfirm,
			});

			localStorage.setItem("token", response.data.token);
			localStorage.setItem("login", response.data.userId);

			this.$router.push("/posts");
		},
	},
	created() {
		localStorage.clear();
	},
};
</script>
<style></style>
