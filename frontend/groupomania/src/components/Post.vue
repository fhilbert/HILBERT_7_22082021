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
		<div>{{ post.content }}</div>

		<div class="thumb">
			<div class="like" @click="onLike(post.id)">
				<!-- <i :class="like ? 'fas fa-thumbs-up' : 'far fa-thumbs-up'"></i> -->
				<i class="far fa-thumbs-up">2</i>
			</div>
			<div class="dislike" @click="onDislike(post.id)"><i class="far fa-thumbs-down">3</i></div>
		</div>
		<!-- <div class="postComment">
			<div>Commentaires</div>
			<div class="postComments">
			<div class="postComments" :key="comment.id" v-for="comment in comments">
				<div class="commentOwnerPhoto">
					<img src="../images/IMG_7377.jpg" alt="photo" />
				</div>

				<div class="commentOwner">
					<div class="ownerName">
						{{ comment.UserId }}
					</div>
					<div class="commentPublished">
						<div class="space">Publié le</div>
						<div class="space">{{ moment(comment.createdAt).format("DD-MM-YYYY") }}</div>
						<div class="space">à</div>
						<div class="space">{{ moment(comment.createdAt).format("HH:MM") }}</div>
					</div>
				</div>
				<div class="commentText">Il fait beau le soleil brille</div>
				<div class="commentText">{{ comment.comment }}</div>
			</div>
			<div class="postCommentInput">
				<div class="commentOwnerPhoto">
					<img src="../images/IMG_7377.jpg" alt="photo" />
				</div>
				<div class="postCommentInputCard">
					<input class="commentTextInput" value="Commentaire ..." type="text" />
					<div>
						<button type="submit"><i class="fas fa-plus-circle"></i></button>
					</div>
				</div>
			</div>
		</div> -->
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
			// comments: [],
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

			this.onCreateLike(id, postLike);
		},
		async onDislike(id) {
			console.log(id);
			console.log("dislike");
		},
		async onCreateLike(id, postLike) {
			console.log("onCreate", id);
			console.log("onCreate", postLike);

			const response = await axios.get(`/posts/likes/${id}`);
			console.log("response", response);
			if (response.data) {
				console.log("trouvé");
				const res = await axios.delete(`/posts/likes/${id}`);
			} else {
				console.log("non trouvé");
			}
			const newLike = {
				like: postLike,

				UserId: 4,
				PostId: id,
			};
			console.log("creation", newLike);
			const data = await axios.post("/posts/likes", newLike);
			// like = postLike;
		},
	},
};
</script>

<style scoped>
.fa-trash-alt {
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
.post_owner_photo,
commentOwnerPhoto {
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
