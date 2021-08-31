<template>
	<div class="container">
		<div class="col mt-5">
			<div class="row d-flex flex-column-reverse flex-md-row">
				<div class="col-12 greybg mx-auto my-3 p-3 shadow">
					<form id="dataUser" class="greybg">
						<h5 class="font-weight-bold text-center mt-2">Informations personnelles</h5>
						<div class="grey">info</div>
						<div class="p-3 col-6">
							<input
								name="email"
								type="email"
								class="form-control"
								id="email"
								pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
								aria-describedby="emailHelp"
								placeholder="Email"
								required=""
							/>
						</div>
						<div class="d-flex">
							<div class="p-3">
								<input
									type="text"
									class="form-control"
									id="lastName"
									placeholder="Nom"
									pattern="[A-Za-z ]{1,32}"
									required
								/>
							</div>
							<div class="p-3">
								<input
									type="text"
									class="form-control"
									id="firstName"
									placeholder="Prénom"
									pattern="[A-Za-z ]{1,32}"
									required
								/>
							</div>
						</div>
						<div class="p-3">
							<input type="text" class="form-control" id="Bio " placeholder="Bio" pattern="[A-Za-z ]{1,32}" required />
						</div>
						<Button @btn_click="$emit('toggle_add_post')" :text="Enregitrer" :color="green" />

						<div class="text-center">
							<p id="error" class="primary"></p>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Button from "./Button.vue";
export default {
	name: "Profile",
};
</script>

<style></style>
