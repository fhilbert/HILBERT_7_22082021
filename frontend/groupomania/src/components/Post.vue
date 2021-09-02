<template>
	<div class="post">
		<h1></h1>
		<div class="post_header">
			<div class="post_header_left">
				<img class="post_owner_photo" src="../images/IMG_7377.jpg" alt="photo" />
				<div class="post_owner">
					<div class="owner_name">
						Frank Hilbert
					</div>
					<div>Publié le 02/09/2021 à 21:12</div>
				</div>
			</div>
			<div class="post_header_right">
				<i @click="onDelete(post.id)" class="fas fa-trash-alt"></i>
			</div>
		</div>
		<!-- <i @click="onDelete(post.id)" class="fas fa-trash-alt"></i> -->
		<br />
		<img src="../images/etretat.jpg" alt="photo" />
		{{ post.text }}
		<div class="thumb">
			<div class="like"><i class="far fa-thumbs-up"></i></div>
			<div class="dislike"><i class="far fa-thumbs-down"></i></div>
		</div>
		<!-- <p>{{ post.day }}</p> -->
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
	border-radius: 15px;

	cursor: pointer;
}

.post.reminder {
	border-left: 5px solid green;
}
.post_header {
	display: flex;
	justify-content: space-between;
}
.post_header_left {
	display: flex;
}
.post_owner {
	display: flex;
	flex-direction: column;
	margin-left: 20px;
}

.post_owner_photo {
	width: 60px;
	height: 60px;
}
.post h3 {
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-radius: 15px;
}
.thumb {
	margin-top: 20px;
	border-top: solid black 2px;
	display: flex;
	justify-content: space-around;
}
</style>
