<template>
	<div class="card">
		<h1></h1>
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
				<input type="textarea" class="card__form-input" v-model="bio" placeholder="bio" />
			</div>
			<div class="third__row">
				<div class="button__profile">
					<button class="button">Supprimer mon compte</button>
					<button class="button">Valider profil</button>
				</div>
			</div>
		</form>
		<input type="textarea">
   <nom>demande</nom>
   <libellé>formulez votre demande</libellé>
</input>

	</div>
</template>
<script>
import Button from "./Button.vue";
export default {
	name: "Profile",
};
</script>

<style>
.first__row {
	display: flex;
}
.second__row {
	width: 100%;
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
	width: 100%;
	height: 260px;
	object-fit: cover;
}
.photo__profile {
	width: 50%;
	border-radius: 15px;
}
.card__profile {
	width: 50%;
	background-color: moccasin;
	border-radius: 15px;
}
.img__profile {
	width: 100%;
	height: 260px;
	object-fit: cover;
}
.photo__profile {
	width: 50%;
	border-radius: 15px;
}
.card__profile {
	width: 50%;
	background-color: moccasin;
	border-radius: 15px;
}
.user__profile {
	width: 40%;
}

.button__profile {
	width: 100%;
	display: flex;
	gap: 10px;
}
</style>
