<template>
	<div class="login">
		<!-- <Nav /> -->
		<div class="card">
			<form @submit.prevent="handleSubmit">
				<h1 class="card__title">Connexion</h1>
				<p class="card__subtitle">
					Pas inscrit ? <span class="card__action" @click="createAccount()">Créer un compte</span>
				</p>
				<br />
				<div class="card__form">
					<input type="email" class="card__form-input" v-model="email" placeholder="Email" />
				</div>
				<div class="card__form">
					<input type="password" class="card__form-input" v-model="password" placeholder="Password" />
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
			// .catch(error => {
			// 	this.message = "Email et/ou mot de passe incorrect !!!";
			// 	console.log("login");
			// 	return;
			// });
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
<style scoped>
body {
	/* background-image: url("./assets/images/icon-above-font.png");
	background-repeat: no-repeat; */
	background-color: rgb(231, 231, 148);
	display: flex;
	font-weight: 400;
	font-family: "Fira Sans", sans-serif;
}
.login {
	display: flex;
	margin-top: 100px;
	justify-content: center;
}
.forgot-password,
.forgot-password a {
	text-align: right;
	font-size: 13px;
	padding-top: 10px;
	color: #7f7d7d;
	margin: 0;
}
.forgot-password a {
	color: #167bff;
}
</style>
