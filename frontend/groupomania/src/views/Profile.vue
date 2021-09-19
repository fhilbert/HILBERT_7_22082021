<template>
	<div class="user">
		<!-- <Nav /> -->
		<div class="card">
			<form @submit.prevent="updateUser(user.id)" enctype="multipart/form-data">
				<div class="first__row">
					<div class="photo__profile">
						<div><img class="imgProfile" v-if="selectedFile" :src="imageUrl" alt="photo" /></div>

						<img class="imgProfile" v-if="!selectedFile" :src="user.image" alt="photo" />
						<input id="inputImage" type="file" ref="fileInput" @change="selectFile" />

						<button class="button" @click="$refs.fileInput.click()"><i class="fas fa-camera"></i></button>
					</div>
					<div class="userProfile">
						<div class="card__profile">
							<label class="space">Admin</label>
							<input type="checkbox" v-model="admin" />
						</div>
						<div class="card__profile">{{ user.firstName }}</div>
						<div class="card__profile">{{ user.lastName }}</div>
						<div class="card__profile">{{ user.email }}</div>
					</div>
				</div>
				<div class="second__row">
					<textarea :placeholder="user.bio" v-model="bio" rows="4" columns="65" max-rows="8"></textarea>
				</div>
				<div class="third__row">
					<div class="button__profile">
						<button class="button" @click.prevent="deleteUser(user.id)">Supprimer mon compte</button>
						<button class="button" @click.prevent="updateUser(user.id)">Valider profil</button>
					</div>
				</div>
				<div>
					<div>
						<!-- <label for="file">(Facultatif)</label><br />
						<input type="file" ref="file" @change="selectFile" /> -->
					</div>
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
			admin: false,
			bio: "",
			user: Object,
			userId: "",
			imageUrl: null,
			selectedFile: null,
			message: "",
		};
	},
	methods: {
		selectFile(event) {
			console.log(this.selectedFile);

			// this.selectedFile = this.$refs.file.files[0];
			this.selectedFile = event.target.files[0];

			let reader = new FileReader();
			reader.onload = e => {
				this.previewImage = e.target.result;
			};
			reader.readAsDataURL(this.selectedFile);
			console.log(this.selectedFile);

			// const bfile = this.$refs.file.files[0];
			const bfile = event.target.files[0];
			this.imageUrl = URL.createObjectURL(bfile);
		},

		async updateUser(id) {
			console.log(id);
			/////----------------------------------
			const token = localStorage.getItem("token");
			const userId = localStorage.getItem("login");

			const newUser = new FormData();
			if (this.file !== null) {
				newUser.append("image", this.selectedFile);
				newUser.append("isAdmin", this.admin);
				newUser.append("bio", this.bio);
			} else {
				newUser.append("isAdmin", this.admin);
				newUser.append("bio", this.bio);
			}
			axios
				.put(`http://localhost:3000/api/auth/profile/${userId}`, newUser, {
					headers: { Authorization: "Bearer " + token },
				})
				.then(() => {
					// alert("Votre profil a bien été mis à jour !");
					this.message = "Votre profil a bien été mis à jour !";
					// document.location.reload();
				})
				.catch(error => {
					this.message = error.response.data;
				});
			this.selectedFile = "";
		},
		async deleteUser(id) {
			// if (confirm("Are you sure ?")) {
			// 	this.posts = this.posts.filter(post => post.id !== id);
			// }
			const token = localStorage.getItem("token");
			console.log("id", id);
			console.log("token", token);

			const res = await axios.delete(`/auth/profile/${id}`, {
				headers: { Authorization: "Bearer " + token },
			});

			res.status === 200 ? (this.users = this.users.filter(user => user.id !== id)) : alert("Error deleting user");
			document.location.reload();
			this.$router.push("/login");
		},
	},
	async created() {
		const userId = localStorage.getItem("login");
		const response = await axios.get(`/auth/profile/${userId}`);

		this.user = response.data;
		this.admin = this.user.isAdmin;
		console.log("this.user", this.user);
		console.log("this.user", this.user.isAdmin);
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
.user {
	display: flex;
	margin-top: 100px;
	justify-content: center;
}
.space {
	padding-right: 5px;
}

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
	width: 40vw;
	background: rgb(184, 214, 219);
	border-radius: 16px;
	padding: 32px;
}
.imgProfile {
	width: 170px;
	height: 170px;
	border-radius: 15px;

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
	width: 40%;
	border-radius: 15px;
}
.userProfile {
	width: 60%;
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
