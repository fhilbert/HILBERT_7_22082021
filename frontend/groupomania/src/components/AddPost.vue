<template>
	<form @submit.prevent="onSubmit" class="add-form">
		<label for="story">Tell us your story:</label>

<textarea id="story" name="story"
          rows="5" cols="33">
It was a dark and stormy night...
</textarea>

		<div class="form-control">
			<label>Ajouter une publication</label>
			<input type="textarea"           rows="5" cols="50">

  				 <nom>demande</nom>
  				 <libellé>formulez votre demande</libellé>
			</input>

			<input type="text" v-model="content" name="text" placeholder="Exprimez-vous" />
		</div>
		<!-- <div class="form-control">
			<label>Day & Time</label>
			<input type="text" v-model="day" name="day" placeholder="Add Day & Time" />
		</div> -->
		<!-- <div class="form-control form-control-check">
			<label>Set Reminder</label>
			<input type="checkbox" v-model="reminder" name="reminder" />
		</div> -->
		<div class="actions">
			<button class="button button-size">Choisir une image</button>
			<button class="button  button-size">Publier</button>
		</div>

		<input type="submit" value="Save Post" class="btn btn-block" />
	</form>
</template>

<script>
export default {
	name: "AddPost",
	data() {
		return {
			content: "",
			attachment: "",
		};
	},
	methods: {
		onSubmit() {
			if (!this.content) {
				alert("Please add a post");
				return;
			}

			const newPost = {
				content: this.content,
				attachment: this.attachment
			
			};

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
</style>
