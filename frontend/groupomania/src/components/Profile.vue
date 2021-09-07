<template>
	<div class="profile">
		<Nav />
		<div class="card">
			<form @submit.prevent="handleSubmit">
				<div class="first__row">
					<div class="photo__profile">
						<img CLASS="img__profile" src="../images/IMG_7377.jpg" alt="photo" />
						<button class="button">Photo</button>
					</div>
					<div class="user__profile">
						<div class="card__profile">Frank</div>
						<div class="card__profile">HILBERT</div>
						<div class="card__profile">frank@gmail.com</div>
					</div>
				</div>
				<div class="second__row">
					<textarea placeholder=" Description" rows="4" columns="65" max-rows="8"></textarea>
					<!-- <textarea v-model="bio" placeholder=" Description" rows="4" columns="65" max-rows="8"></textarea> -->
				</div>
				<div class="third__row">
					<div class="button__profile">
						<button class="button">Supprimer mon compte</button>
						<button class="button">Valider profil</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>
<script>
import Nav from "./Nav.vue";

import Button from "./Button.vue";
export default {
	name: "Profile",
	components: {
		Nav,
	},
};
</script>

<style>
.first__row {
	display: flex;
}
.second__row {
	width: 100%;
}
textarea {
	font-size: 1.2rem;
	width: 100%;
	margin: 10px 0px;
	border-radius: 15px;
}

.third_row {
	display: flex;
}
.card {
	max-width: 100%;
	width: 50vw;
	background: rgb(184, 214, 219);
	border-radius: 16px;
	padding: 32px;
}
.img__profile {
	width: 170px;
	height: 170px;
	object-fit: cover;
}
.photo__profile {
	width: 50%;
	border-radius: 15px;
}
.card__profile {
	width: 100%;

	border-radius: 15px;
	text-align: center;
}
.photo__profile {
	width: 50%;
	border-radius: 15px;
}
.user__profile {
	width: 50%;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
}

.button__profile {
	width: 100%;
	display: flex;
	gap: 10px;
}
</style>
