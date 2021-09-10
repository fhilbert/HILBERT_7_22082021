<template>
	<div class="home">
		<Nav />
		<Header @toggle_add_post="toggleAddPost" title="Publications" :showAddPost="showAddPost" />
		<div v-show="showAddPost">
			<AddPost @add_post="addPost" />
		</div>
		<!-- <router-view :showAddPost="showAddPost"></router-view> -->
		<Posts @delete_post="deletePost" :posts="posts" />

		<!-- <Footer /> -->
	</div>
</template>
<script>
import axios from "axios";

import Nav from "./Nav.vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import Posts from "./Posts.vue";
import AddPost from "./AddPost.vue";

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
		};
	},
	methods: {
		toggleAddPost() {
			this.showAddPost = !this.showAddPost;
		},
		async addPost(post) {
			console.log("post", post);
			const data = await axios.post("/posts", post, {
				// headers: {
				// 	"Content-Type": "multipart/form-data",
				// },
			});
			console.log(data.data);
			this.posts = [...this.posts, data.data];
			console.log(this.posts);
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

			// const res = await fetch("api/posts");

			// const data = await res.json();
			// return data;
			return response;
		},
		async fetchPost(id) {
			const res = await fetch(`api/posts/${id}`);

			const data = await res.json();
			return data;
		},
	},
	async created() {
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

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

body {
	font-family: "Poppins", sans-serif;
	width: 100%;
	margin: 0 auto;
}
.home {
	width: 75vw;
	max-width: 600px;
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
</style>
