<template>
	<div>
		<div>Ajouter une publication</div>
		<textarea v-model="content" placeholder="Exprimez-vous" rows="4" columns="65" max-rows="8"></textarea>
		<div>
			<label for="file">(Facultatif)</label><br />
			<input type="file" ref="file" @change="selectFile()" />
		</div>
		<div><img :src="this.attachment" alt="photo" /></div>
		<button type="submit" @click.prevent="buttonNewMessage">Envoyer</button> -->
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "AddPost",
	data() {
		return {
			content: "",
			attachment: "",
		};
	},
	methods: {
		onclick() {
			console.log("choisir", 1);
		},
		buttonNewMessage() {
			console.log("this.content", this.content);

			if (!this.content) {
				alert("Please add a post");
				return;
			}

			const newPost = {
				content: this.content,
				attachment: this.attachment,
				UserId: 4,
			};
			// const response = axios.post("/posts", newPost);

			console.log("newPost", newPost);
			this.$emit("add_post", newPost);

			this.content = "";
			this.attachment = "";

			// let token = localStorage.getItem("token");
			// const data = new FormData();
			// if (this.file !== null) {
			// 	data.append("title", this.title);
			// 	data.append("content", this.content);
			// 	data.append("image", this.file, this.file.name);
			// } else {
			// 	data.append("title", this.title);
			// 	data.append("content", this.content);
			// }
			// axios
			// 	.post("http://localhost:3000/api/messages/", data, {
			// 		headers: { Authorization: "Bearer " + token },
			// 	})
			// 	.then(() => {
			// 		alert("Votre message a bien été envoyé !");
			// 		document.location.reload();
			// 		this.$router.push("/feed");
			// 	})
			// 	.catch(error => {
			// 		this.error = error.response.data;
			// });
		},
		selectFile(event) {
			// this.file = event.target.files[0];

			// console.log(this.$refs.file.files[0]);
			this.file = this.$refs.file.files[0];

			this.attachment = this.file.name;
			console.log("this", this.content);
			console.log("this at", this.attachment);
		},
		onFilePicked(event) {
			this.file = event.target.files[0];
		},
		removeFile() {
			this.$refs["file-input"].reset();
		},
		submitForm() {
			console.log("this.content", this.content);

			if (!this.content) {
				alert("Please add a post");
				return;
			}

			const newPost = {
				content: this.content,
				attachment: this.files,
				UserId: 4,
			};
			// const response = axios.post("/posts", newPost);

			console.log("newPost", newPost);
			this.$emit("add_post", newPost);

			this.content = "";
			this.attachment = "";
		},
	},
};
</script>

<style scoped>
.add-form {
	margin-bottom: 40px;
}

.form-control {
	margin: 20px 0;
}

.form-control label {
	display: block;
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
.form-control input {
	width: 100%;
	height: 40px;
	margin: 5px;
	padding: 3px 7px;
	font-size: 17px;
}

.form-control-check {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.form-control-check label {
	flex: 1;
}

.form-control-check input {
	flex: 2;
	height: 20px;
}

.actions {
	display: flex;
	justify-content: space-between;
}
.button-size {
	width: 30%;
}

/* ----- */

.feed {
	display: flex;
	flex-direction: column;
	align-items: center;
}
form {
	background-color: #192a48;
	width: 50%;
	padding: 10px;
	color: white;
	margin-bottom: 40px;
}
textarea {
	width: 80%;
	margin-bottom: 10px;
}
label {
	font-size: 12px;
}
input {
	border: solid rgb(206, 206, 206) 1px;
	text-decoration: none;
	margin-bottom: 20px;
	width: 50%;
}
button {
	background-color: #c46e78;
	color: white;
	padding: 6px;
	margin-bottom: 10px;
	border: none;
	text-decoration: none;
}
.error {
	font-size: 13px;
	background-color: rgb(231, 185, 185);
	color: rgb(53, 21, 21);
	margin: 20px;
	padding: 10px;
}
</style>
