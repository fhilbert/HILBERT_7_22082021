<template>
	<div class="container">
		<form @submit.prevent="handleSubmit">
			<h3>Sign Up</h3>
			<div class="form-group">
				<label>Prénom</label>
				<input type="text" class="form-control" v-model="firstName" placeholder="First Name" />
			</div>
			<div class="form-group">
				<label>Nom</label>
				<input type="text" class="form-control" v-model="lastName" placeholder="Last Name" />
			</div>
			<div class="form-group">
				<label>Email</label>
				<input type="email" class="form-control" v-model="email" placeholder="Email" />
			</div>
			<div class="form-group">
				<label>Password</label>
				<input type="password" class="form-control" v-model="password" placeholder="Password" />
			</div>
			<div class="form-group">
				<label>Confirm Password</label>
				<input type="password" class="form-control" v-model="passwordConfirm" placeholder="Password" />
			</div>
			<button class="btn btn-primary btn-block">Sign Up</button>
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
		async handleSubmit() {
			const response = await axios.post("auth/signup", {
				firstName: this.firstName,
				lastName: this.lastName,
				email: this.email,
				password: this.password,
				passwordConfirm: this.passwordConfirm,
			});
			console.log(response);
			this.$router.push("./login");

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
