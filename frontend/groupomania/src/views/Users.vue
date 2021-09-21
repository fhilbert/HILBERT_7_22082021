<template>
	<div class="Users">
		<Nav />
		<h1>Liste des utilisateurs</h1>
		<div class="usersCard">
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
		Nav,
	},
	data() {
		return {
			users: [],
			profile: Object,
			imageUrl: null,
			userId: "",
			selectedFile: null,
		};
	},
	methods: {
		async onDeleteUser(id) {
			if (confirm("Are you sure ?")) {
				this.users = this.users.filter(user => user.id !== id);
			}
			const token = localStorage.getItem("token");
			console.log("id", id);
			console.log("token", token);

			await axios
				.delete(`auth/profile/${id}`, { headers: { Authorization: "Bearer " + token } })
				.then((this.users = this.users.filter(user => user.id !== id)))
				.catch(error => {
					this.message = error.response.data;
				});
			if (!data.isAdmin) {
				this.$router.push("/login");
			}
		},
	},
	async created() {
		const userId = await localStorage.getItem("login");
		const token = localStorage.getItem("token");
		this.userId = userId;

		await axios
			.get(`auth/profile/${userId}`, { headers: { Authorization: "Bearer " + token } })
			.then(response => {
				this.data = response.data;
				console.log("this.user", this.data.isAdmin);
			})
			.catch(error => {
				this.message = error.response.data;
			});

		await axios
			.get(`auth/profile`, { headers: { Authorization: "Bearer " + token } })
			.then(response => {
				this.profile = response.data;
				console.log("this.profile", this.profile);

				this.users = response.data;
			})
			.catch(error => {
				this.message = error.response.data;
			});

		// const res = await axios.get(`/auth/profile/${userId}`);

		// this.data = res.data;
		// console.log("this.user", this.data.isAdmin);

		// const response = await axios.get("/auth/profile");

		// this.profile = response.data;
		// console.log("this.profile", this.profile);

		// this.users = response.data;
	},
};
</script>

<style scoped>
.Users {
	/* margin-top: 40px; */
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
