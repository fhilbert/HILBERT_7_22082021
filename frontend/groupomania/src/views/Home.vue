<template>
	<div class="home">
		<!-- <Nav /> -->
		<div class="homeFeed">
			<div class="homeUser">
				<div class="space"><img class="imgHomeUser" :src="user.image" alt="photo" /></div>
				<div class="space">{{ user.firstName }}</div>
				<div class="space">{{ user.lastName }}</div>
				<div>est connecté</div>
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

			const data = await axios.post("/posts", post, {
				headers: { Authorization: "Bearer " + token },
			});
			console.log(data);
			this.posts = [...this.posts, data];
			console.log(this.posts);
			document.location.reload();
		},
		async addComment(newComment) {
			console.log(newComment);
			const token = localStorage.getItem("token");

			const data = await axios.post("/posts/comments", newComment, {
				headers: { Authorization: "Bearer " + token },
			});
			console.log(data);
			this.comments = [...this.comments, data];
			document.location.reload();
		},
		async deletePost(id) {
			// if (confirm("Are you sure ?")) {
			// 	this.posts = this.posts.filter(post => post.id !== id);
			// }
			const token = localStorage.getItem("token");
			console.log("id", id);
			console.log("token", token);

			const res = await axios.delete(`/posts/${id}`, {
				headers: { Authorization: "Bearer " + token },
			});

			res.status === 200 ? (this.posts = this.posts.filter(post => post.id !== id)) : alert("Error deleting post");
		},
		async fetchPosts() {
			const response = await axios.get("/posts");
			console.log("response");

			return response;
		},
		async fetchPost(id) {
			const res = await fetch(`api/posts/${id}`);

			const data = await res.json();
			return data;
		},
	},
	async created() {
		const userId = localStorage.getItem("login");
		const res = await axios.get(`/auth/profile/${userId}`);
		this.user = res.data;
		const isAdmin = this.user.isAdmin;
		this.isAdmin = isAdmin;

		console.log("this.user", this.user.image);

		const response = await axios.get("/posts", {
			params: {
				date: "YYYY-MM-DD",
			},
		});

		this.posts = response.data;
		console.log("this.posts");
		console.log("posts", this.posts);
	},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");

body {
	/* font-family: "Poppins", sans-serif; */
	/* width: 100vw; */
}
.home {
	/* width: 100vw; */
}
.homeFeed {
	margin: 40px auto 0 auto;
	width: 75vw;
	max-width: 600px;
	/* margin: 20px 15vw 0 15vw; */
	justify-content: center;
}
.btn {
	display: inline-block;
	background: #000;
	color: #fff;
	border: none;
	padding: 10px 20px;
	margin: 5px;
	border-radius: 5px;
	cursor: pointer;
	text-decoration: none;
	font-size: 15px;
	font-family: inherit;
}

.btn:focus {
	outline: none;
}

.btn:active {
	transform: scale(0.98);
}

.btn-block {
	display: block;
	width: 100%;
}
.homeUser {
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.5rem;
}
.imgHomeUser {
	width: 70px;
	height: 70px;
	border-radius: 15px;
}
</style>
