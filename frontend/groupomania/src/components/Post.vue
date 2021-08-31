<template>
	<div class="post">
		<h3>
			{{ post.text }}
			<i @click="onDelete(post.id)" class="fas fa-trash-alt"></i>
		</h3>
		<p>{{ post.day }}</p>
	</div>
</template>

<script>
export default {
	name: "Post",
	props: {
		post: Object,
	},
	methods: {
		onDelete(id) {
			console.log(id);
			this.$emit("delete_post", id);
		},
	},
};
</script>

<style scoped>
.fas {
	color: red;
}

.post {
	background: #f4f4f4;
	margin: 5px;
	padding: 10px 20px;
	cursor: pointer;
}

.post.reminder {
	border-left: 5px solid green;
}

.post h3 {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
</style>
