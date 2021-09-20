<template>
	<nav class="nav">
		<div class="logo">
			<router-link to="./">
				<img class="logoImg" src="../images/icon-left-font-monochrome-black.svg" alt="logo" />
			</router-link>
		</div>
		<div class="items">
			<div class="item">
				<router-link :to="{ name: 'Users' }" class="link"
					><i class="fas fa-users" title="Utilisateurs"></i
				></router-link>
			</div>

			<div class="item">
				<router-link :to="{ name: 'Profile' }" class="link"><i class="far fa-grin" title="Profil"></i></router-link>
			</div>
			<!-- <div v-if="token" class="item"> -->
			<div class="item">
				<router-link :to="{ name: 'Home' }" class="link"
					><i class="fas fa-scroll" title="Publications"></i
				></router-link>
			</div>
			<div class="item">
				<router-link :to="{ name: 'Login' }" class="link deconnexion"
					><i class="fas fa-bolt" title="Connexion"></i
				></router-link>
			</div>
			<div class="item">
				<router-link :to="{ name: 'Register' }" class="link"
					><i class="far fa-keyboard" title="Inscription"></i
				></router-link>
			</div>
			<div class="item">
				<router-link :to="{ name: 'Login' }" class="link"
					><i class="fas fa-power-off" title="Déconnexion"></i
				></router-link>
			</div>
			<br />
			<br />
			<br />
			<br />
		</div>
	</nav>
</template>
<script>
export default {
	name: "Nav",
};
</script>
<style>
nav {
	margin-bottom: 15px;
	display: block;
	display: flex;
	font-size: 1.1em;
	/* width: 100%; */

	height: 100%;
	background-color: lightgrey;
	align-content: center;
}
.logo {
	width: 45%;
	margin-left: 15px;
	text-decoration: none;
	display: flex;
	/* justify-content: center; */
	align-items: center;
}
.logoImg {
	width: 250px;
	font-size: 60px;
	color: rgb(255, 0, 0);
	filter: invert(10%) sepia(99%) saturate(6480%) hue-rotate(1deg) brightness(106%) contrast(98%);
}
.items {
	width: 70%;
	text-decoration: none;
	display: flex;
	justify-content: space-evenly;
	transition: transform 400ms ease-in-out;
}
.item {
	display: flex;
	justify-content: center;
	align-items: center;
}
nav a {
	color: darkblue;
}
nav a:hover {
	color: #fff;
	/* border-top: 3px solid #0065fc; */
	transition: transform 400ms ease-in-out;

	transform: scale(2);
}
.deconnexion :hover {
	content: "deconnexion";
}
@media screen and (max-width: 420px) {
	nav {
		display: inline-block;
	}
	.logo {
		width: 100vw;
	}
	.items {
		height: 50px;
		width: 100vw;
	}
}
</style>
