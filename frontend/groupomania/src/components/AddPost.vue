<template>
	<div>
		<form @submit.prevent="buttonNewPost" enctype="multipart/form-data">
			<div>Ajouter une publication</div>
			<textarea v-model="content" placeholder="  Exprimez-vous" rows="4" columns="65" max-rows="8"></textarea>
			<div>
				<label for="file">(Facultatif)</label><br />
				<input type="file" ref="file" @change="selectFile" />
			</div>
			<div><img v-if="selectedFile" :src="imageUrl" alt="photo" /></div>
			<button class="button" type="submit" @click.prevent="buttonNewPost">Envoyer</button>
		</form>
	</div>
</template>

<script>
import axios from "axios";
import jwt from "jsonwebtoken";

export default {
	name: "AddPost",
	data() {
		return {
			content: "",
			imageUrl: null,
			selectedFile: null,
		};
	},
	methods: {
		buttonNewPost() {
			if (!this.content) {
				alert("Please add a post");
				return;
			}

			const token = localStorage.getItem("token");
			const userId = localStorage.getItem("login");

			const data = new FormData();
			if (this.file !== null) {
				data.append("content", this.content);
				data.append("image", this.selectedFile);
				data.append("UserId", userId);
			} else {
				data.append("content", this.content);
				data.append("UserId", userId);
			}
			this.$emit("add_post", data);
			this.content = "";
			this.selectedFile = "";

			// const res = axios
			// 	.post("http://localhost:3000/api/posts/", data, {
			// 		// headers: { Authorization: "Bearer " + token },
			// 		headers: { headers: data.getHeaders() },
			// 	})
			// 	.then(() => {
			// 		alert("Votre message a bien été envoyé !");
			// 		// document.location.reload();
			// 	})
			// 	.catch(error => {
			// 		this.error = error.response.data;
			// 	});
		},

		selectFile(event) {
			// this.file = event.target.files[0];

			// console.log(this.$refs.file.files[0]);
			this.selectedFile = this.$refs.file.files[0];

			//
			let reader = new FileReader();
			reader.onload = e => {
				this.previewImage = e.target.result;
			};
			reader.readAsDataURL(this.selectedFile);
			console.log(this.selectedFile);

			//

			const bfile = this.$refs.file.files[0];
			this.imageUrl = URL.createObjectURL(bfile);
		},
		submitForm() {
			console.log("this.content", this.content);

			if (!this.content) {
				alert("Please add a post");
				return;
			}

			// const newPost = {
			// 	content: this.content,
			// 	image: this.files,
			// 	UserId: 4,
			// };
			// const response = axios.post("/posts", newPost);

			console.log("newPost", newPost);
			this.$emit("add_post", newPost);

			this.content = "";
			this.image = "";
		},
	},
};
</script>

<style scoped>
#uploadInput {
	display: inline-block;
}
textarea {
	font-size: 1.2rem;
	width: 100%;
	margin-bottom: 10px;
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
	border: none;
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
