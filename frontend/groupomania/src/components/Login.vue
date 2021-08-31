<template>
	<div class="container">
		<form @submit.prevent="handleSubmit">
			<h3>Login</h3>
			<br /><br />
			<div class="form-group">
				<label>Email</label>
				<input type="email" class="form-control" v-model="email" placeholder="Email" />
			</div>
			<div class="form-group">
				<label>Password</label>
				<input type="password" class="form-control" v-model="password" placeholder="Password" />
			</div>
			<button class="btn btn-primary btn-block">Login</button>
		</form>
	</div>
</template>
<script>
import axios from "axios";

export default {
	name: "Login",
	data() {
		return {
			email: "",
			password: "",
		};
	},
	methods: {
		async handleSubmit() {
			const response = await axios.post("auth/login", {
				email: this.email,
				password: this.password,
				passwordConfirm: this.passwordConfirm,
			});
			localStorage.setItem("token", response.data.token);
			this.$router.push("/posts");
		},
	},
};
</script>
<style scoped>
body {
	/* background-image: url("./assets/images/icon-above-font.png");
	background-repeat: no-repeat; */
	background-color: rgb(231, 231, 148);
	min-height: 100vh;
	display: flex;
	font-weight: 400;
	font-family: "Fira Sans", sans-serif;
}
.container {
	background-color: slategrey;
	margin-top: 100px;
	height: 50vh;
	width: 60vw;
}
h1,
h2,
h3,
h4,
label,
span {
	font-weight: 500;
	font-family: "Fira Sans", sans-serif;
}
body,
html,
#app,
#root,
.auto-wrapper {
	width: 100%;
	height: 100%;
}

#app {
	display: flex;
	justify-content: center;

	flex-direction: column;

	text-align: center;
}

.navbar-light {
	background-color: #ffffff;
	box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
}
.nav-item {
	margin-left: 10px;
}

.auto-wrapper {
	display: flex;
	justify-content: center;
	flex-direction: column;
	text-align: left;
}
.auth-inner {
	width: 600px;
	margin: auto;
	background-color: sandybrown;
	box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
	padding: 40px 55px 45px 55px;
	border-radius: 15px;
	transition: all 0.3s;
}

.auto-wrapper .form-control:focus {
	border-color: #167bff;
	box-shadow: none;
}

.auto-wrapper h3 {
	text-align: center;
	margin: 0;
	line-height: 1;
	padding-bottom: 20px;
}
.custom-control-label {
	font-weight: 400;
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
