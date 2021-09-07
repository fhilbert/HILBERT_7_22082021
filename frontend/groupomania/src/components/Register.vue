<template>
	<div class="register">
		<Nav />
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
	</div>
</template>
<script>
import Nav from "./Nav.vue";

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
		},
	},
};
</script>
<style></style>
