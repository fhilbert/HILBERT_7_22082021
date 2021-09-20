<template>
	<div class="addPost">
		<form @submit.prevent="refresh" enctype="multipart/form-data">
			<!-- <form @submit.prevent="selectFile" enctype="multipart/form-data"> -->
			<!-- <form enctype="multipart/form-data"> -->
			<div>Ajouter une publication</div>
			<textarea v-model="content" placeholder="  Exprimez-vous" rows="4" columns="65" max-rows="8"></textarea>

			<div class="postPhoto"><img v-if="selectedFile" :src="imageUrl" alt="photo" /></div>

			<input id="inputImage" type="file" ref="fileInput" @change="selectFile" />
			<button class="button" @click="$refs.fileInput.click()"><i class="fas fa-camera"></i></button>

			<button class="button" @click.prevent="buttonNewPost">Envoyer</button>
		</form>
	</div>
</template>

<script>
import jwt from "jsonwebtoken";

export default {
	name: "AddPost",
	data() {
		return {
			content: "",
			imageUrl: null,
			selectedFile: null,
			image: "",
		};
	},
	methods: {
		refresh() {
			console.log("refresh");
		},
		buttonNewPost() {
			console.log("button new post");
			if (!this.content) {
				alert("Please add a post");
				return;
			}

			const token = localStorage.getItem("token");
			const userId = localStorage.getItem("login");

			const post = new FormData();
			if (this.file !== null) {
				post.append("content", this.content);
				post.append("image", this.selectedFile);
				post.append("UserId", userId);
			} else {
				post.append("content", this.content);
				post.append("UserId", userId);
			}
			this.$emit("add_post", post);
			this.content = "";
			this.selectedFile = "";
		},

		selectFile(event) {
			// this.selectedFile = this.$refs.file.files[0];
			this.selectedFile = event.target.files[0];
			let reader = new FileReader();
			reader.onload = e => {
				this.previewImage = e.target.result;
			};
			reader.readAsDataURL(this.selectedFile);
			console.log(this.selectedFile);

			// const bfile = this.$refs.file.files[0];
			const bfile = event.target.files[0];
			this.imageUrl = URL.createObjectURL(bfile);
		},
	},
};
</script>

<style scoped>
.fa-camera {
	font-size: 25px;
}

#inputImage {
	display: none;
}

#uploadInput {
	display: inline-block;
}
textarea {
	font-size: 1.2rem;
	width: 100%;
	margin-bottom: 10px;
	border-radius: 15px;
}
img {
	width: 100%;
	border-radius: 15px;
}

.button-size {
	width: 30%;
}

/* ----- */

label {
	font-size: 12px;
}
input {
	color: blue;
	border: solid rgb(206, 206, 206) 1px;
	text-decoration: none;
	margin-bottom: 20px;
	width: 50%;
}
button {
	background-color: blue;
	color: white;
	padding: 6px;
	margin-bottom: 10px;
	border-radius: 15px;
	text-decoration: none;
	width: 150px;
}
.error {
	font-size: 13px;
	background-color: blue;
	color: rgb(53, 21, 21);
	margin: 20px;
	padding: 10px;
}
</style>
