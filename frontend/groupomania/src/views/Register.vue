<template>
	<div class="register">
		<Nav />
		<div class="card">
			<form @submit.prevent="handleSubmit">
				<h1 class="cardTitle">Inscription</h1>
				<p class="cardSubtitle">Déjà inscrit ? <span class="cardAction" @click="loginAccount()">Se connecter</span></p>
				<div class="cardForm">
					<input type="email" class="cardFormInput" v-model="email" placeholder="Email" />
				</div>
				<div class="cardForm">
					<input type="text" class="cardFormInput" v-model="firstName" placeholder=" Prénom" />
					<input type="text" class="cardFormInput" v-model="lastName" placeholder=" Nom" />
				</div>
				<div class="cardForm">
					<input type="password" class="cardFormInput" v-model="password" placeholder="Mot de Passe" />
				</div>
				<div class="cardForm">
					<input
						type="password"
						class="cardFormInput"
						v-model="passwordConfirm"
						placeholder="Confirmation Mot de Passe"
					/>
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
				})
				.catch(error => {
					this.message = error.response.data.message;
				});
		},
	},
};
</script>
<style></style>
