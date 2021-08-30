<template>
	<nav class="navbar navbar-expand navbar-light fixed-top">
		<dir class="container">
			<router-link to="./" class="nav-brand">
				Home
			</router-link>
			<div class=" collapse navbar-collapse">
				<ul class="navbar-nav ml-auto">
					<li class="nav-item">
						<router-link to="./login" class="nav-link">Login</router-link>
					</li>
					<li class="nav-item">
						<router-link to="./register" class="nav-link">Sign Up</router-link>
					</li>
				</ul>
			</div>
		</dir>
	</nav>
</template>
<script>
export default {
	name: "Nav",
};
</script>
<style></style>
