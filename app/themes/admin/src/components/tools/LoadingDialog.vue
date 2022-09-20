<template>
	<v-dialog persistent v-model="loading_show" max-width="290" content-class="prompt">
		<div class="card">
			<div class="card-body text-center">
				<div class="d-flex flex-column justify-center align-center">
					<!-- <img
						:src="require('~/assets/img/vectors/logo.png')"
						style="cursor: pointer; width: 100px"
						alt="logo"
						class="logo img-fluid mb-2"
					/> -->
					<v-progress-circular
						:size="50"
						:width="4"
						color="primary"
						indeterminate
					></v-progress-circular>
					<p class="font-size-sm fw-bold mt-3" dir="ltr" v-text="loading.title"></p>
				</div>
			</div>
		</div>
	</v-dialog>
</template>

<script>
export default {
	computed: {
		loading: {
			get() {
				return this.$store.state.loading;
			},
			set() {
				//
			}
		},
		loading_show: {
			get() {
				return this.$store.state.loading.show;
			},
			set() {
				//
			}
		},
	}
}
</script>

<style lang="scss">
.v-dialog.prompt {
	.v-card__title {
		word-break: break-word;
	}
}

.v-snack__wrapper {
	position: fixed !important;
	bottom: 0px;
	// left: 0px;
}
</style>
