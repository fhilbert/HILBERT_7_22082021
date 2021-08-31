<template>
	<div id="app">
		<!-- <Nav /> -->
		<div class="auth-wrapper">
			<div class="auth-inner">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>
// import Nav from "./components/Nav.vue";

export default {
	name: "App",
	components: {
		// Nav,
	},
};
</script>

<style>
/* @import url("https://fonts.googleapsis.com/css?family=Fira+Sans:400,500,600,700"); */

* {
	box-sizing: border-box;
}

body {
	/* background-image: url("./assets/images/icon-above-font.png");
	background-repeat: no-repeat; */
	background-color: rgb(231, 231, 148);
	min-height: 100vh;
	display: flex;
	font-weight: 400;
	font-family: "Fira Sans", sans-serif;
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
