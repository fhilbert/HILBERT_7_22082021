<template>
	<header>
		<h1>{{ title }}</h1>
		<Button
			@btn_click="$emit('toggle_add_post')"
			:text="showAddPost ? 'Fermer' : 'Ajout Post'"
			:color="showAddPost ? 'blue' : 'green'"
		/>
	</header>
</template>

<script>
import Button from "./Button.vue";

export default {
	name: "Header",
	props: {
		title: String,
		showAddPost: Boolean,
	},
	components: {
		Button,
	},
};
</script>

<style scoped>
header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
}
</style>
