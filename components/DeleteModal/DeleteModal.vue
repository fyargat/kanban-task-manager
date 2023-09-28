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
					@click="() => {}"
				>
					Delete
				</PrimaryButton>
				<PrimaryButton
					class="delete-modal__button delete-modal__button--cancel"
					type="button"
					@click="() => {}"
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
	onClose: () => void;
}

defineProps<Props>();

// temp
const title = "Delete this task?";
const text = "Are you sure you want to delete the 'Task 1' task?";
</script>

<style scoped lang="scss">
@use "./DeleteModal.scss";
</style>
