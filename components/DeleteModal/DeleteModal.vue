<template>
	<ModalDialog :on-close="onClose">
		<div class="delete-modal__container">
			<h3 class="delete-modal__title">{{ title }}</h3>
			<p class="delete-modal__text">
				{{ text }}
			</p>
			<div class="delete-modal__buttons">
				<PrimaryButton
					class="delete-modal__button delete-modal__button--delete"
					type="button"
					@click="onConfirm"
				>
					Delete
				</PrimaryButton>
				<PrimaryButton
					class="delete-modal__button delete-modal__button--cancel"
					type="button"
					@click="onCancel"
				>
					Cancel
				</PrimaryButton>
			</div>
		</div>
	</ModalDialog>
</template>

<script setup lang="ts">
import ModalDialog from "~/components/ModalDialog/ModalDialog.vue";
import PrimaryButton from "~/components/PrimaryButton/PrimaryButton.vue";

interface Props {
	title: string;
	text: string;
	onClose: () => void;
	onConfirm: () => void;
	onCancel: () => void;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
@use "./DeleteModal.scss";
</style>
