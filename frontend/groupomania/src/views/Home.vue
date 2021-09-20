<template>
	<div class="home">
		<Nav />
		<div class="homeFeed">
			<div class="homeUser">
				<div class="space"><img class="imgHomeUser" :src="user.image" alt="photo" /></div>
				<div class="space">Bienvenue</div>
				<div class="space">{{ user.firstName }}</div>
				<div class="space">{{ user.lastName }}</div>
			</div>
			<Header @toggle_add_post="toggleAddPost" title="Publications" :showAddPost="showAddPost" />
			<div v-show="showAddPost">
				<AddPost @add_post="addPost" />
			</div>
			<!-- <router-view :showAddPost="showAddPost"></router-view> -->
			<Posts @delete_post="deletePost" :posts="posts" @add-comment="addComment" :isAdmin="isAdmin" />

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
		};
	},
	methods: {
		toggleAddPost() {
			this.showAddPost = !this.showAddPost;
		},
		async addPost(post) {
			const token = localStorage.getItem("token");

			await axios
				.post("/posts", post, { headers: { Authorization: "Bearer " + token } })
				.then(response => {
					console.log(response.data);
					this.posts = [...this.posts, response.data];
					console.log(this.posts);
				})
				.catch(error => {
					this.message = error.response.data;
				});
			document.location.reload();
		},
		async addComment(newComment) {
			console.log(newComment);
			const token = localStorage.getItem("token");

			await axios
				.post("/posts/comments", newComment, {
					headers: { Authorization: "Bearer " + token },
				})
				.then(response => {
					// console.log(response.data);
					this.comments = [...this.comments, response.data];
				})
				.catch(error => {
					this.message = error.response.data;
				});
			document.location.reload();
		},
		async deletePost(id) {
			if (confirm("Are you sure ?")) {
				this.posts = this.posts.filter(post => post.id !== id);
			}
			const token = localStorage.getItem("token");
			console.log("id", id);
			console.log("token", token);

			await axios
				.delete(`/posts/${id}`, {
					headers: { Authorization: "Bearer " + token },
				})
				.then((this.posts = this.posts.filter(post => post.id !== id)))
				.catch(error => {
					this.message = error.response.data;
				});
		},
		// async fetchPosts() {
		// 	const response = await axios.get("/posts");
		// 	console.log("response");

		// 	return response;
		// },
		// async fetchPost(id) {
		// 	const res = await fetch(`api/posts/${id}`);

		// 	const data = await res.json();
		// 	return data;
		// },
	},
	async created() {
		const userId = localStorage.getItem("login");
		const token = localStorage.getItem("token");

		await axios
			.get(`auth/profile/${userId}`, { headers: { Authorization: "Bearer " + token } })
			.then(response => {
				this.user = response.data;
				const isAdmin = this.user.isAdmin;
				this.isAdmin = isAdmin;
			})
			.catch(error => {
				this.message = error.response.data;
			});

		console.log("this.user", this.user.image);

		await axios
			.get("/posts", { params: { date: "YYYY-MM-DD" } })
			.then(response => {
				this.posts = response.data;
				console.log("this.posts");
				console.log("posts", this.posts);
			})
			.catch(error => {
				this.message = error.response.data;
			});
	},
};
</script>

<style></style>
