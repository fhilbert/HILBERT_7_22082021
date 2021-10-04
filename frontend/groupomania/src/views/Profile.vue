<template>
	<div class="user">
		<Nav />
		<div class="card">
			<form @submit.prevent="refresh" enctype="multipart/form-data">
				<div class="firstRow">
					<div class="photoProfile">
						<div><img class="imgProfile" v-if="selectedFile" :src="imageUrl" alt="photo" /></div>

						<img class="imgProfile" v-if="!selectedFile && user.image" :src="user.image" alt="photo" />
						<input id="inputImage" type="file" ref="fileInput" @change="selectFile" />

						<button class="button" @click="$refs.fileInput.click()"><i class="fas fa-camera"></i></button>
					</div>
					<div class="userProfile">
						<div class="cardProfile">{{ user.firstName }}</div>
						<div class="cardProfile">{{ user.lastName }}</div>
						<div class="cardProfile">{{ user.email }}</div>
					</div>
				</div>
				<div class="secondRow">
					<textarea :placeholder="user.bio" v-model="bio" rows="4" columns="65" max-rows="8"></textarea>
				</div>
				<div class="thirdRow">
					<div class="buttonProfile">
						<button class="button" @click.prevent="deleteUser(user.id)">Supprimer mon compte</button>
						<button class="button" @click.prevent="updateUser(user.id)">Valider profil</button>
					</div>
				</div>
				<div>
					<br />
					<div>{{ message }}</div>
				</div>
			</form>
		</div>
		<!-- <Footer /> -->
	</div>
</template>
<script>
import axios from "axios";

import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue";

import Button from "../components/Button.vue";
export default {
	name: "profile",
	components: {
		Nav,
		Footer,
	},
	data() {
		return {
			isAdmin: false,
			bio: "",
			user: Object,
			userId: "",
			imageUrl: null,
			selectedFile: null,
			message: "",
		};
	},
	methods: {
		refresh() {
			console.log("refresh");
		},

		selectFile(event) {
			this.selectedFile = event.target.files[0];

			let reader = new FileReader();
			reader.onload = e => {
				this.previewImage = e.target.result;
			};
			reader.readAsDataURL(this.selectedFile);

			const bfile = event.target.files[0];
			this.imageUrl = URL.createObjectURL(bfile);
			this.user.image = this.imageUrl;
		},

		updateUser(id) {
			const token = localStorage.getItem("token");
			const userId = localStorage.getItem("login");

			const newUser = new FormData();

			newUser.append("bio", this.bio);

			if (this.file !== null) {
				newUser.append("image", this.selectedFile);
			}
			axios
				.put(`http://localhost:3000/api/auth/profile/${userId}`, newUser, {
					headers: { Authorization: "Bearer " + token },
				})
				.then(() => {
					this.message = "Votre profil a bien été mis à jour !";
				})
				.catch(error => {
					this.message = error.response.data;
				});
			this.selectedFile = "";
		},
		deleteUser(id) {
			const token = localStorage.getItem("token");

			axios
				.delete(`auth/profile/${id}`, { headers: { Authorization: "Bearer " + token } })
				.then((this.users = this.users.filter(user => user.id !== id)))
				.catch(error => {
					this.message = error.response.data;
				});
			this.$router.push("/login");
		},
	},
	created() {
		const userId = localStorage.getItem("login");
		const token = localStorage.getItem("token");

		axios
			.get(`auth/profile/${userId}`, { headers: { Authorization: "Bearer " + token } })
			.then(response => {
				this.user = response.data;
				// this.admin = this.user.isAdmin;
			})
			.catch(error => {
				this.message = error.response.data;
			});
	},
};
</script>

<style scoped>
.fa-camera {
	font-size: 25px;
}
#inputImage {
	display: none;
}
.firstRow {
	display: flex;
}
.secondRow {
	width: 100%;
}
textarea {
	font-size: 1.2rem;
	width: 100%;
	margin: 10px 0px;
	border-radius: 15px;
	padding-left: 10px;
}
.thirdRow {
	display: flex;
}
.photoProfile {
	width: 40%;
	border-radius: 15px;
}
.imgProfile {
	width: 170px;
	height: 170px;
	border-radius: 15px;

	object-fit: cover;
}
.userProfile {
	width: 60%;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
}
.cardProfile {
	width: 100%;
	border-radius: 15px;
	text-align: center;
}

.buttonProfile {
	width: 100%;
	display: flex;
	gap: 10px;
}
</style>
