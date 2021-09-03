<template>
	<div class="card">
		<h1></h1>
		<form @submit.prevent="handleSubmit">
			<div>
				<img src="../images/IMG_7377.jpg" alt="photo" />
				<button class="button">Connexion</button>
			</div>
			<div>
				<div class="card__subtitle">Frank</div>
				<div class="card__subtitle">HILBERT</div>
				<div class="card__subtitle">frank@gmail.com</div>
			</div>
			<div>
				<button class="button">Supprimer mon compte</button>
				<button class="button">Valider</button>
			</div>
			<div>
				<div>
					Bio
				</div>
			</div>

			<div class="card__form">
				<input type="email" class="card__form-input" v-model="email" placeholder="Email" />
			</div>
			<button class="button">Inscription</button>
		</form>
	</div>
	<!-- 
	<div class="card">
		<div class="col mt-5">
			<div class="row d-flex flex-column-reverse flex-md-row">
				<div class="col-12 greybg mx-auto my-3 p-3 shadow">
					<form id="dataUser" class="greybg">
						<h5 class="font-weight-bold text-center mt-2">Informations personnelles</h5>
						<div class="grey">info</div>
						<div class="p-3 col-6">
							<input
								name="email"
								type="email"
								class="form-control"
								id="email"
								pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
								aria-describedby="emailHelp"
								placeholder="Email"
								required=""
							/>
						</div>
						<div class="d-flex">
							<div class="p-3">
								<input
									type="text"
									class="form-control"
									id="lastName"
									placeholder="Nom"
									pattern="[A-Za-z ]{1,32}"
									required
								/>
							</div>
							<div class="p-3">
								<input
									type="text"
									class="form-control"
									id="firstName"
									placeholder="Prénom"
									pattern="[A-Za-z ]{1,32}"
									required
								/>
							</div>
						</div>
						<div class="p-3">
							<input type="text" class="form-control" id="Bio " placeholder="Bio" pattern="[A-Za-z ]{1,32}" />
						</div>
						<label for="photo_profile">Choisir une photo :</label>

						<input class="btn" type="file" id="photo_profile" name="photo_profile" accept="image/png, image/jpeg" />

						<Button @btn_click="$emit('toggle_add_post')" :text="Enregitrer" :color="green" />

						<div class="text-center">
							<p id="error" class="primary"></p>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div> -->
</template>
<script>
import Button from "./Button.vue";
export default {
	name: "Profile",
};
</script>

<style></style>
