<template>
	<div class="post">
		<h1></h1>
		<div class="postHeader">
			<div class="postHeaderLeft">
				<img class="postOwnerPhoto" :src="post.User.photo" alt="photo" />
				<!-- <img class="postOwnerPhoto" src="../images/IMG_7377.jpg" alt="photo" /> -->
				<div class="postOwner">
					<div class="ownerName">
						<strong>{{ post.User.firstName }}</strong>
						<strong>{{ post.User.lastName }}</strong>
						{{ post.UserId }}-login-{{ userId }}
					</div>
					<div class="published">
						<div class="space">Publié le</div>
						<div class="space">{{ moment(post.createdAt).format("DD-MM-YYYY") }}</div>
						<div class="space">à</div>
						<div class="space">{{ moment(post.createdAt).format("HH:MM") }}</div>
					</div>
				</div>
			</div>
			<div v-if="post.UserId == userId" @click="onDelete(post.id)" class="postHeaderRight">
				<i class="fas fa-trash-alt"></i>
			</div>
		</div>
		<br />
		<img class="postPhoto" :src="post.image" alt="photo" />
		<div>{{ post.id }}</div>
		<div>{{ post.content }}</div>

		<div class="thumb">
			<div class="like" @click="onLike(post.id)">
				<i :class="postLike ? 'fas fa-thumbs-up' : 'far fa-thumbs-up'"></i>
				<!-- <i class="fas fa-thumbs-up">2</i> -->
			</div>
			<div class="dislike" @click="onDislike(post.id)"><i class="far fa-thumbs-down">3</i></div>
		</div>

		<div class="postComment">
			<div class="com">Commentaires</div>
			<div class="postComments" :key="comment.id" v-for="comment in comments">
				<div v-if="comment.PostId == post.id" class="commentHeader">
					<div class="commentHeaderLeft">
						<!-- <img class="commentOwnerPhoto" src="../images/IMG_7377.jpg" alt="photo" /> -->
						<img class="postOwnerPhoto" :src="comment.User.image" alt="photo" />
						<div class="commentOwner">
							<div class="published">
								<div class="ownerName space">{{ comment.User.firstName }}-{{ comment.User.lastName }}</div>
								<div class="space">le</div>
								<!-- <div class="space">05/02/2003</div> -->
								<div class="space">{{ moment(comment.createdAt).format("DD-MM-YYYY") }}</div>
								<div class="space">à</div>
								<!-- <div class="space">22:03</div> -->
								<div class="space">{{ moment(comment.createdAt).format("HH:MM") }}</div>
							</div>
							<div class="commentText">{{ comment.comment }}</div>
						</div>
					</div>
					<div v-if="comment.UserId == userId" @click="onDeleteComment(comment.id)" class="commentHeaderRight">
						<i class="fas fa-trash-alt"></i>
					</div>
				</div>
			</div>
			<div class="postCommentInput">
				<!-- <img class="commentOwnerPhoto" :src="comment.User.image" alt="photo" /> -->
				<img class="commentOwnerPhoto" src="../images/IMG_7377.jpg" alt="photo" />
				<div class="postCommentInputCard">
					<div class="commentTextInput">
						<input type="text" v-model="inputComment" placeholder="commentaire ..." />
					</div>
					<button class="check" @click="buttonNewComment(post.id)"><i class="fas fa-plus-circle"></i></button>
					<!-- <input class="commentTextInput" value="Commentaire ..." type="text" /> -->
					<!-- <div class="check">
						<button type="submit"><i class="fas fa-plus-circle"></i></button>
					</div> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
const moment = require("moment");
const userId = localStorage.getItem("login");

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
			image: "",
			createAt: "",
			comments: [],
			userId,
			inputComment: "",
			postLike: false,
			postDislike: false,
		};
	},

	methods: {
		onDelete(id) {
			console.log(id);
			this.$emit("delete_post", id);
		},
		async buttonNewComment(postid) {
			console.log("input");
			console.log(postid);
			console.log(this.inputComment);
			const userId = localStorage.getItem("login");

			const newComment = {
				comment: this.inputComment,
				PostId: postid,
				UserId: userId,
			};
			console.log("newComment", newComment);

			if (!this.inputComment) {
				return;
			}
			const token = localStorage.getItem("token");

			console.log("axios");
			console.log(this.comments);
			const data = await axios
				.post("/posts/comments", newComment, {
					headers: { Authorization: "Bearer " + token },
				})
				.then(() => {
					alert("Commentaire a bien été envoyé !");
					// document.location.reload();
					// this.$router.push("/posts");
				})
				.catch(error => {
					this.error = error.response.data;
				});

			console.log("erreur 2");
			this.comments = [...this.comments, newComment];
			console.log("erreur 2");
			this.inputComment = "";
		},
		async onDeleteComment(id) {
			console.log("delete comment");

			const res = await axios.delete(`/posts/comments/${id}`);
			res.status === 200
				? (this.comments = this.comments.filter(comment => comment.id !== id))
				: alert("Error deleting post");
		},
		onLike(id) {
			console.log(id);
			console.log("like");
			console.log(postLike);

			postLike = !postLike;
			console.log(postLike);

			// this.onCreateLike(id, postLike);
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
	async created() {
		const response = await axios.get("/posts/comments", {
			params: {
				date: "YYYY-MM-DD",
			},
		});

		this.comments = response.data;
		// console.log("this.comments");
		// console.log("commentss", this.comments);
		// // const userId = await localStorage.getItem("login");
	},
	async beforeMount() {
		const userId = await localStorage.getItem("login");
	},
};
</script>

<style scoped>
input {
	width: 100%;
	height: 100%;
	border-radius: 15px;
	font-size: 1rem;
	padding-left: 5px;
}
strong {
	margin-left: 5px;
}
.fa-trash-alt {
	color: red;
	font-size: 25px;
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
.postcomments {
	width: 100%;
}
.postHeader,
.commentHeader {
	width: 100%;

	display: flex;
	justify-content: space-between;
}
.postHeaderLeft,
.commentHeaderLeft {
	display: flex;
}
.postOwner {
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
.postOwnerPhoto,
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
.postPhoto {
	width: 100%;
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
	font-style: italic;
	padding-right: 5px;
}
.postCommentInputCard {
	display: flex;
	justify-content: space-between;

	margin-left: 20px;
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
	width: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
}
.check i {
	font-size: 30px;
	color: rgb(112, 145, 216);
}
</style>
