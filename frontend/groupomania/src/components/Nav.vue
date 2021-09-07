<template>
	<nav class="nav">
		<!-- <dir class="container"> -->
		<div class="logo">
			<router-link to="./">
				Home
			</router-link>
		</div>
		<div class="items">
			<div class="item">
				<router-link to="/profile" class="link">Profile</router-link>
			</div>
			<!-- <div class="item">
					<router-link to="/posts" class="link">Posts</router-link>
				</div> -->
			<div class="item">
				<router-link to="/" class="link">Connexion</router-link>
			</div>
			<div class="item">
				<router-link to="/register" class="link">Inscription</router-link>
			</div>
			<div class="item">
				<router-link to="/login" class="link">Deconnexion</router-link>
			</div>
			<br />
			<br />
			<br />
			<br />
		</div>
		<!-- </dir> -->
	</nav>
</template>
<script>
export default {
	name: "Nav",
};
</script>
<style>
nav {
	display: block;
	display: flex;
	font-size: 1.1em;
	/* justify-content: space-around;
	align-items: flex-end; */
}
.logo {
	width: 30%;
	text-decoration: none;
}
.items {
	width: 70%;
	text-decoration: none;
	display: flex;
	justify-content: space-evenly;
}
nav a:hover {
	color: #0065fc;
	border-top: 3px solid #0065fc;
}
</style>
