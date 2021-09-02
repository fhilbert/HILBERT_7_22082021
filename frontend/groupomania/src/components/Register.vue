<template>
	<div class="card">
		<form @submit.prevent="handleSubmit">
			<h1 class="card__title">Inscription</h1>
			<p class="card__subtitle">
				Déjà inscrit ? <span class="card__action" @click="loginAccount()">Se connecter</span>
			</p>
			<div class="card__form">
				<input type="email" class="card__form-input" v-model="email" placeholder="Email" />
			</div>
			<div class="card__form">
				<input type="text" class="card__form-input" v-model="firstName" placeholder="First Name" />
				<input type="text" class="card__form-input" v-model="lastName" placeholder="Last Name" />
			</div>
			<div class="card__form">
				<input type="password" class="card__form-input" v-model="password" placeholder="Password" />
			</div>
			<div class="card__form">
				<input type="password" class="card__form-input" v-model="passwordConfirm" placeholder="Confirm Password" />
			</div>
			<button class="button">Inscription</button>
		</form>
	</div>
</template>
<script>
import axios from "axios";
export default {
	name: "Register",
	data() {
		return {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			passwordConfirm: "",
		};
	},
	methods: {
		loginAccount() {
			this.$router.push("/");
		},
		async handleSubmit() {
			const response = await axios.post("auth/signup", {
				firstName: this.firstName,
				lastName: this.lastName,
				email: this.email,
				password: this.password,
				passwordConfirm: this.passwordConfirm,
			});
			console.log(response);
			this.$router.push("/");

			// const url = "http://localhost:3000/api/auth/signup";

			// const response = await axios.post("/auth/signup", data);

			// const options = {
			// 	method: "POST",
			// 	headers: {
			// 		Accept: "application/json",
			// 		"Content-Type": "application/json",
			// 	},
			// 	body: JSON.stringify(data),
			// };
			// fetch(url, options)
			// 	.then(res => res.json())
			// 	.then(data => {
			// 		console.log(data);
			// 		console.log("Enregistré ");
			// 		this.$router.push("./login");
			// 	})
			// 	.catch(error => console.log("Erreur : " + error));
		},
	},
};
</script>
<style>
.container {
	background-color: sandybrown;
	margin-top: 100px;
	height: 80vh;
	width: 60vw;
}
</style>
