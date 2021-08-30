<template>
	<div>
		<div :key="post.id" v-for="post in posts">
			{{ post.text }}
			<!-- <Post @delete_post="$emit('delete_post', post.id)" :post="post" /> -->
			<div>toto</div>
		</div>
	</div>
</template>

<script>
import Post from "./Post.vue";

export default {
	name: "Posts",
	props: {
		posts: Array,
	},
	components: {
		Post,
	},
	emits: ["delete_post", "toggle-reminder"],
};
</script>
