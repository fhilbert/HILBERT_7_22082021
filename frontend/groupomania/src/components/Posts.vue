<template>
	<div>
		<!-- <div>{{ isAdmin }}</div> -->
		<div :key="post.id" v-for="post in posts">
			<Post @delete_post="$emit('delete_post', post.id)" :post="post" @add_comment="addComment" :isAdmin="isAdmin" />
			<!-- <Post
				@delete_post="$emit('delete_post', post.id)"
				:post="post"
				@add_comment="this.$emit('add-comment', newComment)"
			/> -->
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
		isAdmin: String,
	},
	components: {
		Post,
	},
	methods: {
		async addComment(newComment) {
			console.log("newComment", newComment);
			this.$emit("add-comment", newComment);
		},
	},
	emits: ["delete_post"],
};
</script>
