<template>
	<form @submit.prevent="onSubmit" class="add-form">
		<div class="form-control">
			<label>Ajouter une publication</label>
			<input type="text-area" v-model="text" name="text" placeholder="Add Post" />
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
			<button class="button  button-size">Pulier</button>
		</div>

		<input type="submit" value="Save Post" class="btn btn-block" />
	</form>
</template>

<script>
export default {
	name: "AddPost",
	data() {
		return {
			text: "",
			day: "",
			reminder: false,
		};
	},
	methods: {
		onSubmit() {
			if (!this.text) {
				alert("Please add a post");
				return;
			}

			const newPost = {
				text: this.text,
				day: this.day,
				reminder: this.reminder,
			};

			this.$emit("add_post", newPost);

			this.text = "";
			this.day = "";
			this.reminder = false;
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
	width: 25%;
}
</style>
