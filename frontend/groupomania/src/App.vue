<template>
	<div>
		<!-- <Nav /> -->
		<!-- <Header @toggle_add_post="toggleAddPost" title="Post Tracker" :showAddPost="showAddPost" /> -->
		<router-view></router-view>
		<!-- <Footer /> -->
	</div>
</template>
<script>
import Nav from "./components/Nav.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
	name: "App",
	components: {
		Header,
		Footer,
	},
	data() {
		return {
			showAddPost: false,
		};
	},
	methods: {
		toggleAddPost() {
			this.showAddPost = !this.showAddPost;
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
	width: 100%;
}
</style>
