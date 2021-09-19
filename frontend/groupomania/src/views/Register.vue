<template>
	<div class="register">
		<!-- <Nav /> -->
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
	name: "Register",
	components: {
		Nav,
	},

	data() {
		return {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			passwordConfirm: "",
			message: "",
		};
	},
	methods: {
		loginAccount() {
			this.$router.push("/");
		},
		async handleSubmit() {
			console.log("this", this.firstName);
			if (!this.email || !this.firstName || !this.lastName || !this.password || !this.passwordConfirm) {
				this.message = "Certains champs non remplis !!!";
				return;
			}
			if (this.password !== this.passwordConfirm) {
				this.message = "Mots de passe diférents !!!";
				return;
			}

			const data = await axios
				.post("auth/signup", {
					firstName: this.firstName,
					lastName: this.lastName,
					email: this.email,
					password: this.password,
					passwordConfirm: this.passwordConfirm,
				})
				.then(() => {
					alert("Vous êtes inscrit !");
					this.$router.push("/login");

					// document.location.reload();
				})
				.catch(error => {
					this.message = error.response.data.message;
				});
		},
	},
};
</script>
<style>
.register {
	display: flex;
	margin-top: 100px;
	justify-content: center;
}
</style>
