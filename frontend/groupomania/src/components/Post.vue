<template>
	<div class="post">
		<h1></h1>
		<div class="post_header">
			<div class="post_header_left">
				<img class="post_owner_photo" src="../images/IMG_7377.jpg" alt="photo" />
				<!-- <img class="post_owner_photo" src="../images/IMG_7377.jpg" alt="photo" /> -->
				<div class="post_owner">
					<div class="owner_name">{{ post.UserId }}</div>
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

		<div class="postComment">
			<div class="com">Commentaires</div>
			<!-- <div class="postComments" :key="comment.id" v-for="comment in comments"> -->
			<div class="commentHeader">
				<div class="commentHeaderLeft">
					<img class="commentOwnerPhoto" src="../images/IMG_7377.jpg" alt="photo" />
					<div class="commentOwner">
						<div class="published">
							<div class="ownerName">
								<!-- {{ comment.UserId }} -->
								Frank HILBERT
							</div>
							<div class="space">le</div>
							<div class="space">05/02/2003</div>
							<!-- <div class="space">{{ moment(comment.createdAt).format("DD-MM-YYYY") }}</div> -->
							<div class="space">à</div>
							<div class="space">22:03</div>
							<!-- <div class="space">{{ moment(comment.createdAt).format("HH:MM") }}</div> -->
						</div>

						<div class="commentText">Il fait beau le soleil brille</div>
						<!-- <div class="commentText">{{ comment.comment }}</div> -->
					</div>
				</div>
				<div class="commentHeaderRight">
					<i @click="onDelete(post.id)" class="fas fa-trash-alt"></i>
				</div>
			</div>
			<div class="postCommentInput">
				<img class="commentOwnerPhoto" src="../images/IMG_7377.jpg" alt="photo" />
				<div class="postCommentInputCard">
					<div class="commentTextInput">Ceci est la saisie d'un commentaire pour voir la long ueur de la ligne</div>
					<!-- <input class="commentTextInput" value="Commentaire ..." type="text" /> -->
					<!-- <div> -->
					<!-- <button type="submit"><i class="fas fa-plus-circle"></i></button> -->
					<!-- </div> -->
					<div class="check"><i class="fas fa-plus-circle"></i></div>
				</div>
			</div>
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
	width: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
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
.post_header,
.commentHeader {
	display: flex;
	justify-content: space-between;
}
.post_header_left,
.commentHeaderLeft {
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
.commentOwnerPhoto {
	width: 50px;
	height: 50px;
	object-fit: cover;
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
.com {
	margin-bottom: 10px;
}
.postComments,
.postCommentInput {
	margin-bottom: 10px;
	display: flex;
}
.postCommentsCard {
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-left: 20px;
}
.commentOwner {
	margin-left: 20px;
	margin-bottom: 10px;
}
.commentsPublished {
	display: flex;
	font-style: italic;
}
.ownerName {
	color: blue;
	padding-right: 5px;
}
.postCommentInputCard {
	display: flex;
	justify-content: space-between;

	margin-left: 20px;
	background-color: lightsteelblue;
	border-color: steelblue;
	width: 100%;
	border-radius: 15px;
}
.commentTextInput {
	display: flex;
	padding-left: 5px;
	width: 90%;
	align-items: center;
}
.check {
	width: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
