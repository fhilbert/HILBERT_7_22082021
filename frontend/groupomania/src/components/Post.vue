<template>
	<div class="post">
		<h1></h1>
		<div class="post_header">
			<div class="post_header_left">
				<img class="post_owner_photo" src="../images/IMG_7377.jpg" alt="photo" />
				<!-- <img class="post_owner_photo" src="../images/IMG_7377.jpg" alt="photo" /> -->
				<div class="post_owner">
					<div class="owner_name">
						{{ post.UserId }}
					</div>
					<div class="published">
						<div class="space">Publié le</div>
						<div class="space">{{ moment(post.createdAt).format("DD-MM-YYYY") }}</div>
						<div class="space">à</div>
						<div class="space">{{ moment(post.createdAt).format("HH:MM") }}</div>
					</div>
				</div>
			</div>
			<div class="post_header_right">
				<i @click="onDelete(post.id)" class="fas fa-trash-alt"></i>
			</div>
		</div>
		<br />
		<img :src="post.attachment" alt="photo" />
		{{ post.content }}
		<div class="thumb">
			<div class="like" @click="onLike(post.id)"><i class="far fa-thumbs-up"></i></div>
			<div class="dislike" @click="onDislike(post.id)"><i class="far fa-thumbs-down"></i></div>
		</div>
	</div>
</template>

<script>
const moment = require("moment");
import axios from "axios";

export default {
	name: "Post",
	props: {
		post: Object,
	},
	data() {
		return {
			moment: moment,
			content: "",
			attachment: "",
			createAt: "",
		};
	},

	methods: {
		onDelete(id) {
			console.log(id);
			this.$emit("delete_post", id);
		},
		async onLike(id) {
			console.log(id);
			console.log("like");
			const postLike = 1;
			const like = {
				like: postLike,

				UserId: 4,
				PostId: id,
			};
			const data = await axios.post("/posts/likes", like);

			// onCreateLike(id, 1);
		},
		async onDislike(id) {
			console.log(id);
			console.log("dislike");
			// onCreateLike(id, -1);
			const postLike = 0;
			const like = {
				like: postLike,

				UserId: 4,
				PostId: id,
			};
			const data = await axios.post("/posts/likes", like);
		},
		onCreateLike(id, like) {
			console.log("onCreate", like);
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
.published {
	display: flex;
}
.space {
	padding-right: 5px;
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
.like {
	margin-top: 10px;

	border: seagreen;
	color: seagreen;
	width: 2.4em;
	height: 2.4em;
	font-size: 1.5em;
}
.dislike {
	margin-top: 10px;
	border: red;
	color: red;
	width: 2.4em;
	height: 2.4em;
	font-size: 1.5em;
}
</style>
