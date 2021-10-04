<template>
	<div class="addPost">
		<form @submit.prevent="refresh" enctype="multipart/form-data">
			<div>Ajouter une publication</div>
			<textarea v-model="content" placeholder="  Exprimez-vous" rows="4" columns="65" max-rows="8"></textarea>

			<div class="postPhoto"><img v-if="selectedFile" :src="imageUrl" alt="photo" /></div>

			<input id="inputImage" type="file" ref="fileInput" @change="selectFile" />
			<div class="buttons">
				<button class="button" @click="$refs.fileInput.click()"><i class="fas fa-camera"></i></button>
				<button class="button" @click.prevent="buttonNewPost">Envoyer</button>
			</div>
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
			image: null,
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
			post.append("content", this.content);
			post.append("UserId", userId);

			if (this.file !== null) {
				post.append("image", this.selectedFile);
			}

			this.$emit("add_post", post);
			this.content = "";
			this.selectedFile = "";
		},

		selectFile(event) {
			this.selectedFile = event.target.files[0];
			let reader = new FileReader();
			reader.onload = e => {
				this.previewImage = e.target.result;
			};
			reader.readAsDataURL(this.selectedFile);

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
textarea {
	font-size: 1.2rem;
	width: 100%;
	margin-bottom: 10px;
	border-radius: 15px;
	padding-left: 10px;
}
img {
	width: 100%;
	border-radius: 15px;
}
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
.buttons {
	display: flex;
	justify-content: space-evenly;
}
.button {
	background-color: #2196f3;
	color: white;
	padding: 6px;
	margin-bottom: 10px;
	border-radius: 15px;
	text-decoration: none;
	width: 150px;
	height: 35px;
	font-size: 1.2rem;
}
</style>
