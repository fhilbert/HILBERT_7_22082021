<template>
	<div>
		<div :key="post.id" v-for="post in posts">
			<Post
				@delete_post="$emit('delete_post', post.id)"
				:post="post"
				@add_comment="$emit('add_comment', comment.id)"
				:comment="comment"
			/>
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
	},
	components: {
		Post,
	},
	emits: ["delete_post", "add_comment"],
};
</script>
