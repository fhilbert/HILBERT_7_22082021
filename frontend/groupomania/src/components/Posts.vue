<template>
	<div>
		<div :key="post.id" v-for="post in posts">
			<Post @delete_post="$emit('delete_post', post.id)" :post="post" :isAdmin="isAdmin" />
		</div>
	</div>
</template>

<script>
import Post from "./Post.vue";

export default {
	name: "Posts",
	props: {
		posts: Array,
		comments: Array,
		isAdmin: Number,
	},
	components: {
		Post,
	},
	emits: ["delete_post"],
};
</script>
