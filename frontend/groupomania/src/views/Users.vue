<template>
	<div class="Users">
		<h1>Liste des utilisateurs</h1>

		<div class="usersCard">
			<!-- <div :key="user.id" v-for="user in users"> -->
			<div class="cardUsers" :key="user.id" v-for="user in users">
				<div class="cardLeft">
					<div class="cardPhoto">
						<img :src="user.image" alt="user" />
					</div>
					<div class="cardContact">
						<div>{{ user.firstName }}</div>
						<div>{{ user.lastName }}</div>
						<div>{{ user.email }}</div>
					</div>
				</div>

				<div v-if="user.id == userId || data.isAdmin == 1" class="cardRight" @click="onDeleteUser(user.id)">
					<i class="fas fa-trash-alt"></i>
				</div>
			</div>
			<!-- <Post @delete_post="$emit('delete_post', post.id)" :post="post" /> -->
		</div>
	</div>
</template>
<script>
import axios from "axios";

import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue";

import Button from "../components/Button.vue";
export default {
	name: "Users",
	components: {
		Footer,
	},
	data() {
		return {
			users: [],
			admin: false,
			profile: Object,
			imageUrl: null,
			userId: "",
			selectedFile: null,
		};
	},
	methods: {
		async onDeleteUser(id) {
			// if (confirm("Are you sure ?")) {
			// 	this.posts = this.posts.filter(post => post.id !== id);
			// }
			const token = localStorage.getItem("token");
			console.log("id", id);
			console.log("token", token);

			const res = await axios.delete(`auth/profile/${id}`, {
				headers: { Authorization: "Bearer " + token },
			});

			res.status === 200 ? (this.users = this.users.filter(user => user.id !== id)) : alert("Error deleting user");
			// document.location.reload();
			this.$router.push("/login");
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
		const userId = await localStorage.getItem("login");
		this.userId = userId;
		const res = await axios.get(`/auth/profile/${userId}`);

		this.data = res.data;
		console.log("this.user", this.data.isAdmin);

		const response = await axios.get("/auth/profile");

		this.profile = response.data;
		console.log("this.profile", this.profile);

		this.users = response.data;

		// console.log("this.comments");
		// console.log("commentss", this.comments);
		// // const userId = await localStorage.getItem("login");
	},
	async beforeMount() {
		// const userId = await localStorage.getItem("login");
		// // console.log("userId", userId);
	},
};
</script>

<style scoped>
.Users {
	margin-top: 40px;
}
h1 {
	margin-bottom: 40px;
	text-align: center;
}
.fa-trash-alt {
	color: red;
	font-size: 25px;
	width: 40px;
	/* display: flex; */
	/* align-items: center;
	justify-content: center; */
}

.usersCard {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
	padding: 0 10vw;
}
.cardUsers {
	background-color: mediumaquamarine;
	width: 350px;
	height: 100px;
	border-radius: 15px;
	display: flex;
	margin: 0em 1em 3em 0em;
}
.cardLeft {
	display: flex;
	width: 80%;
}

.cardPhoto {
	width: 100px;
	height: 100%;
	border-radius: 15px 0px 0px 15px;
	object-fit: cover;
}
img {
	width: 100%;
	height: 100%;
	border-radius: 15px 0px 0px 15px;
}

.cardContact {
	display: flex;
	flex-direction: column;
	padding: 10px 0 0 25px;
	/* align-items: center;
	justify-content: center; */
}
.cardRight {
	width: 20%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.img__profile {
	width: 170px;
	height: 170px;
	object-fit: cover;
}
.photo__profile {
	width: 50%;
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
</style>
