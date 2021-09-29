<template>
	<div class="home">
		<Nav :token="token" />
		<div class="homeFeed">
			<div class="homeUser">
				<div v-if="user.image" class="space"><img class="imgHomeUser" :src="user.image" alt="photo" /></div>
				<div class="space">Bienvenue</div>
				<div class="space">{{ user.firstName }}</div>
				<div class="space">{{ user.lastName }}</div>
			</div>
			<Header @toggle_add_post="toggleAddPost" title="Publications" :showAddPost="showAddPost" />
			<div v-show="showAddPost">
				<AddPost @add_post="addPost" />
			</div>
			<Posts @delete_post="deletePost" :posts="posts" :isAdmin="isAdmin" />

			<!-- <Footer /> -->
		</div>
	</div>
</template>
<script>
import axios from "axios";

import Nav from "../components/Nav.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Posts from "../components/Posts.vue";
import AddPost from "../components/AddPost.vue";

export default {
	name: "Home",
	components: {
		Header,
		Posts,
		AddPost,
		Footer,
		Nav,
	},
	data() {
		return {
			showAddPost: false,
			posts: [],
			user: Object,
			isAdmin: 0,
			token: "",
		};
	},
	methods: {
		toggleAddPost() {
			this.showAddPost = !this.showAddPost;
		},
		addPost(post) {
			const token = localStorage.getItem("token");

			axios
				.post("/posts", post, { headers: { Authorization: "Bearer " + token } })
				.then(response => {
					// console.log(response.data);
					// this.posts = [...this.posts, response.data];
					this.posts = [response.data, ...this.posts];
				})
				.catch(error => {
					console.log("il y une erreur : " + error.response);
				});
		},

		deletePost(id) {
			if (confirm("Are you sure ?")) {
				this.posts = this.posts.filter(post => post.id !== id);
			}
			const token = localStorage.getItem("token");

			axios
				.delete(`/posts/${id}`, {
					headers: { Authorization: "Bearer " + token },
				})
				.then((this.posts = this.posts.filter(post => post.id !== id)))
				.catch(error => {
					console.log("il y une erreur : " + error.response);
				});
		},
	},
	created() {
		const userId = localStorage.getItem("login");
		const token = localStorage.getItem("token");

		axios
			.get(`auth/profile/${userId}`, { headers: { Authorization: "Bearer " + token } })
			.then(response => {
				this.user = response.data;
				const isAdmin = this.user.isAdmin;
				this.isAdmin = isAdmin;
			})
			.catch(error => {
				console.log("il y une erreur : " + error.response);
			});

		// console.log("this.user", this.user.image);

		axios
			.get("/posts", { params: { date: "YYYY-MM-DD" } })
			.then(response => {
				this.posts = response.data;
			})
			.catch(error => {
				console.log("il y une erreur : " + error.response);
			});
	},
};
</script>

<style></style>
