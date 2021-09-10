<template>
	<div class="profile">
		<Nav />
		<div class="card">
			<form @submit.prevent="updateUser(profile.id)" enctype="multipart/form-data">
				<div class="first__row">
					<div class="photo__profile">
						<img class="img__profile" :src="profile.photo" alt="photo" />
						<button class="button">Photo</button>
					</div>
					<div class="user__profile">
						<div class="card__profile">
							<label class="space">Admin</label>
							<input type="checkbox" v-model="admin" name="admin" />
						</div>
						<div class="card__profile">{{ profile.firstName }}</div>
						<div class="card__profile">{{ profile.lastName }}</div>
						<div class="card__profile">{{ profile.email }}</div>
					</div>
				</div>
				<div class="second__row">
					<textarea placeholder=" Description" rows="4" columns="65" max-rows="8"></textarea>
				</div>
				<div class="third__row">
					<div class="button__profile">
						<button class="button">Supprimer mon compte</button>
						<button class="button" @click.prevent="updateUser(profile.id)">Valider profil</button>
					</div>
				</div>
			</form>
		</div>
		<!-- <Footer /> -->
	</div>
</template>
<script>
import axios from "axios";

import Nav from "./Nav.vue";
import Footer from "./Footer.vue";

import Button from "./Button.vue";
export default {
	name: "Profile",
	components: {
		Nav,
		Footer,
	},
	data() {
		return {
			admin: false,
			profile: Object,
		};
	},
	methods: {
		async updateUser(id) {
			console.log(id);
		},
		async deleteUser(id) {
			// if (confirm("Are you sure ?")) {
			// 	this.posts = this.posts.filter(post => post.id !== id);
			// }
			const token = localStorage.getItem("token");
			console.log("id", id);
			console.log("token", token);

			const res = await axios.delete(`/profile/${id}`, {
				headers: { Authorization: "Bearer " + token },
			});

			res.status === 200 ? (this.posts = this.posts.filter(post => post.id !== id)) : alert("Error deleting post");
		},
		async fetchPosts() {
			const response = await axios.get("auth/profile");
			console.log("response");

			// const res = await fetch("api/posts");

			// const data = await res.json();
			// return data;
			return response;
		},
	},
	async created() {
		const login = localStorage.getItem("login");
		const response = await axios.get(`/auth/profile/${login}`);

		this.profile = response.data;
		console.log("this.profile", this.profile);
	},
};
</script>

<style>
.profile {
	max-width: 600px;
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
