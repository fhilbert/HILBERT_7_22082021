<template>
	<div class="post">
		<h3></h3>
		<div class="postHeader">
			<div class="postHeaderLeft">
				<img class="postOwnerPhoto" :src="post.User.image" alt="photo" />
				<div class="postOwner">
					<div class="ownerName">
						<strong>{{ post.User.firstName }}</strong>
						<strong>{{ post.User.lastName }}</strong>
					</div>
					<div class="published">
						<!-- <div class="space">{{ this.isAdmin }}</div> -->
						<div class="space">Publié le</div>
						<div class="space">{{ moment(post.createdAt).format("DD-MM-YYYY") }}</div>
						<div class="space">à</div>
						<div class="space">{{ moment(post.createdAt).format("HH:MM") }}</div>
					</div>
				</div>
			</div>
			<div v-if="post.UserId == userId || isAdmin" @click="onDelete(post.id)" class="postHeaderRight">
				<i class="fas fa-trash-alt"></i>
			</div>
		</div>
		<br />
		<img v-if="post.image" class="postPhoto" :src="post.image" alt="photo" />
		<div>{{ post.id }}</div>
		<div>{{ post.content }}</div>

		<div class="thumb">
			<div class="like" @click="onCreateLike(1)">
				<i :class="like ? 'fas fa-thumbs-up' : 'far fa-thumbs-up'">{{ nbLikes }}</i>
			</div>
			<div class="disLike" @click="onCreateLike(0)">
				<i :class="disLike ? 'fas fa-thumbs-up' : 'far fa-thumbs-up'">{{ nbDislikes }}</i>
			</div>
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
								<div class="space">{{ moment(comment.createdAt).format("DD-MM-YYYY") }}</div>
								<div class="space">à</div>
								<div class="space">{{ moment(comment.createdAt).format("HH:MM") }}</div>
							</div>
							<div class="commentText">{{ comment.comment }}</div>
						</div>
					</div>
					<div
						v-if="comment.UserId == userId || isAdmin"
						@click="onDeleteComment(comment.id)"
						class="commentHeaderRight"
					>
						<i class="fas fa-trash-alt"></i>
					</div>
				</div>
			</div>
			<div class="postCommentInput">
				<!-- <img class="commentOwnerPhoto" :src="user.image" alt="photo" /> -->
				<!-- <img class="commentOwnerPhoto" src="../images/IMG_7377.jpg" alt="photo" /> -->
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
		user: Object,
		isAdmin: Number,
	},
	data() {
		return {
			moment: moment,
			content: "",
			// image: "",
			createAt: "",
			comments: [],
			// isAdmin: "",
			userId: "",
			inputComment: "",
			like: 0,
			disLike: 0,
			nbLikes: 0,
			nbDislikes: 0,
			postLike: true,
			newLike: Object,
		};
	},

	methods: {
		onDelete(id) {
			console.log(id);
			this.$emit("delete_post", id);
		},
		async buttonNewComment(postid) {
			console.log("input");
			const userId = localStorage.getItem("login");
			if (!this.inputComment) {
				return;
			}
			const newComment = {
				comment: this.inputComment,
				PostId: postid,
				UserId: userId,
			};
			console.log("newComment");
			console.log(newComment);

			// console.log("this.comments- ");
			// console.log(this.comments);
			// this.comments.push(newComment);
			// console.log("this.comments+ ");
			// console.log(this.comments);

			// console.log("this.comments ... :");
			// console.log(...this.comments);
			// this.comments = [this.comments, newComment];
			this.inputComment = "";

			this.$emit("add_comment", newComment);
		},
		async onDeleteComment(id) {
			console.log("delete comment");
			const token = localStorage.getItem("token");

			await axios
				.delete(`/posts/comments/${id}`, { headers: { Authorization: "Bearer " + token } })
				.then(response => {
					this.comments = this.comments.filter(comment => comment.id !== id);
				})
				.catch(error => {
					console.log("il y une erreur : " + error.response);
				});
		},
		onLike(id) {
			console.log(id);
			console.log("like");
			// console.log(postLike);

			this.postLike = !this.postLike;
			// onCreateLike(id, post.id);
			// console.log(postLike);

			// this.onCreateLike(id, postLike);
		},
		onDislike(id) {
			console.log(id);
			console.log("onDislike");
			onCreateLike(id, post.id);
		},
		async onCreateLike(valeurLike) {
			console.log("onCreate", valeurLike);

			// const response = await axios.get(`/posts/like/${this.post.id}`);

			console.log("userId", userId);
			console.log("PostId", this.post.id);
			console.log("like ", this.like);
			console.log("dislike ", this.disLike);

			const token = localStorage.getItem("token");

			const newLike = {
				valeur: valeurLike,
				UserId: userId,
				PostId: this.post.id,
			};
			if (!this.like && !this.disLike) {
				console.log("create-like");
				//creation like
				await axios
					.post("/posts/like", newLike, { headers: { Authorization: "Bearer " + token } })
					.then(response => {
						// console.log(response.data);
						if (valeurLike === 1) {
							this.nbLikes++;
						} else {
							this.nbDislikes++;
						}
					})
					.catch(error => {
						console.log("il y une erreur : " + error.response);
					});
			} else if ((this.like && valeurLike === 1) || (this.disLike && valeurLike === 0)) {
				//destroy
				console.log("destroy-like");

				let getLikeid = 0;

				await axios
					.get(`/posts/like/${this.post.id}`)
					.then(response => {
						console.log("getlike");
						// console.log(response.data);
						getLikeid = response.data.id;
					})
					.catch(error => {
						console.log("il y une erreur : " + error.response);
					});
				// const getLike = await axios.get(`/posts/like/${this.post.id}`);

				// veifier le userid
				await axios
					.delete(`/posts/like/${getLikeid}`)
					.then(response => {
						// console.log(response.data);
						if (valeurLike === 1) {
							this.nbLikes--;
						} else {
							this.nbDislikes--;
						}
					})
					.catch(error => {
						console.log("il y une erreur : " + error.response);
					});
			} else {
				console.log("update-like", newLike.valeur);
				// update
				let getLikeid = 0;
				await axios
					.get(`/posts/like/${this.post.id}`)
					.then(response => {
						getLikeid = response.data.id;
						console.log(getLikeid);
					})
					.catch(error => {
						console.log("il y une erreur : " + error.response);
					});
				// const getLike = await axios.get(`/posts/like/${this.post.id}`);
				//-----
				console.log("newLike", newLike);

				// await axios.put(`/posts/like/${getLike.data.id}`, newLike);

				await axios
					.put(`/posts/like/${getLikeid}`, newLike, {
						headers: { Authorization: "Bearer " + token },
					})
					.then(response => {
						// alert("Like mis a jour");
						if (valeurLike === 1) {
							this.nbLikes++;
							this.nbDislikes--;
						} else {
							this.nbLikes--;
							this.nbDislikes++;
						}
					})
					.catch(error => {
						console.log("il y une erreur : " + error.response);
					});

				//-----
			}
			if (valeurLike === 1) {
				this.like = !this.like;
				this.disLike = 0;
			} else {
				this.disLike = !this.disLike;
				this.like = 0;
			}
			// document.location.reload();
		},
	},
	async created() {
		// await axios
		// 	.get(`/posts/comments/${this.post.id}`, { params: { date: "YYYY-MM-DD" } })
		// 	.then(response => {
		// 		console.log("comments", response.data);
		// 	})
		// 	.catch(error => {
		// 		this.message = error.response.data;
		// 	});
		console.log("createdPost");
		const response = await axios.get(`/posts/comments/${this.post.id}`, {
			params: {
				date: "YYYY-MM-DD",
			},
		});
		//tous les likes d'un post

		const resLike = await axios.get(`/posts/likes/${this.post.id}`);
		let like = 0;
		let disLike = 0;
		let nbLikes = 0;
		let nbDislikes = 0;
		const userId = localStorage.getItem("login");
		this.userId = userId;
		// console.log("resLike ", resLike.data.Likes);
		const countLikes = resLike.data.Likes;
		countLikes.forEach(e => {
			// console.log("likeee", e);
			if (e.valeur == 1) {
				nbLikes++;
			}
			if (e.valeur == 0) {
				nbDislikes++;
			}
			if (e.UserId == userId) {
				if (e.valeur == 1) {
					like = 1;
					return;
				} else {
					disLike = 1;
					return;
				}
			}
		});
		// console.log("like", like);

		//	obtenir le like du post

		this.like = like;
		this.disLike = disLike;

		this.nbLikes = nbLikes;
		this.nbDislikes = nbDislikes;
		this.comments = response.data;
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
	border-radius: 15px;
}
.post h3 {
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-radius: 15px;
}
.postPhoto {
	width: 100%;
	border-radius: 15px 15px 0 0;
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
.disLike {
	margin-top: 10px;
	border: red;
	color: red;
	width: 2.4em;
	height: 2.4em;
	font-size: 1.5em;
}
.com {
	margin-bottom: 10px;
	font-size: 1.2rem;
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
	width: 95%;
	align-items: center;
}
.check {
	width: 40px;
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
