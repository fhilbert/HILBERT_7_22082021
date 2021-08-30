<template>
	<div class="container">
		<Header @toggle_add_post="toggleAddPost" title="Post Tracker" :showAddPost="showAddPost" />
		<div v-show="showAddPost">
			<AddPost @add_post="addPost" />
		</div>

		<Posts @delete_post="deletePost" :posts="posts" />
	</div>
</template>
<script>
import axios from "axios";

import Header from "./Header.vue";
import Posts from "./Posts.vue";
import AddPost from "./AddPost.vue";
import test from "./test.vue";

export default {
	name: "Home",
	components: {
		Header,
		Posts,
		AddPost,
		test,
	},

	data() {
		return {
			// user: null,
			posts: [],
			showAddPost: false,
		};
	},
	methods: {
		deletePost(id) {
			if (confirm("Are you sure ?")) {
				this.posts = this.posts.filter(post => post.id !== id);
			}
		},
		addPost(post) {
			this.posts = [...this.posts, post];
		},
		toggleAddPost() {
			this.showAddPost = !this.showAddPost;
		},
		created() {
			// const response = await axios.get("/auth/login");
			// console.log(response);
			// this.user = response.data;

			this.posts = [
				{
					id: 1,
					text: "Doctors appointment",
					day: "March 1st  at 2:00pm",
					reminder: true,
				},
				{
					id: 2,
					text: "Meeting at School",
					day: "March 3rd  at 2:30pm",
					reminder: true,
				},
				{
					id: 3,
					text: "Food shopping",
					day: "March 1st  at 4:00pm",
					reminder: false,
				},
				{
					id: 4,
					text: "Run trainning",
					day: "March 2nd  at 6:00pm",
					reminder: false,
				},
			];
		},
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
}

.container {
	max-width: 500px;
	margin: 30px auto;
	overflow: auto;
	min-height: 300px;
	border: 1px solid steelblue;
	padding: 30px;
	border-radius: 5px;
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
