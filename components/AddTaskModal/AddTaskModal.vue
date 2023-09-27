<template>
	<ModalDialog :on-close="() => {}">
		<div class="add-task-modal__container">
			<h3 class="add-task-modal__title">Add New Task</h3>

			<form @submit.prevent="handleSubmit">
				<div class="add-task-modal__box">
					<InputField v-model="titleInput" label="Title" />
				</div>

				<div class="add-task-modal__box">
					<label>
						<p class="add-task-modal__subtitle">Description</p>
						<textarea class="add-task-modal__description" />
					</label>
				</div>

				<div class="add-task-modal__box">
					<p class="add-task-modal__subtitle">Subtasks</p>
					<InputField />
					<PrimaryButton class="add-task-modal__add-subtask-button">
						+Add New Subtask
					</PrimaryButton>
				</div>

				<div class="add-task-modal__box">
					<p class="add-task-modal__subtitle">Status</p>
					<SelectBox :columns="[]" />
				</div>

				<div>
					<PrimaryButton class="add-task-modal__create-button" type="submit">
						Create Task
					</PrimaryButton>
				</div>
			</form>
		</div>
	</ModalDialog>
</template>

<script setup lang="ts">
import InputField from "~/components/InputField/InputField.vue";
import ModalDialog from "~/components/ModalDialog/ModalDialog.vue";
import PrimaryButton from "~/components/PrimaryButton/PrimaryButton.vue";
import SelectBox from "~/components/SelectBox/SelectBox.vue";

const titleInput = ref<string>("");

const handleSubmit = () => {
	console.log("submit");
};
</script>

<style scoped lang="scss">
@use "./AddTaskModal.scss";
</style>
