<template>
	<ModalDialog :on-close="onClose">
		<div class="task-form-modal__container">
			<h3 class="task-form-modal__title">
				{{ title }}
			</h3>

			<form @submit.prevent="onSubmit">
				<div class="task-form-modal__box">
					<InputField
						label="Title"
						:model-value="task.name"
						@input="updateName"
					/>
				</div>

				<div class="task-form-modal__box">
					<label>
						<p class="task-form-modal__subtitle">Description</p>
						<textarea
							class="task-form-modal__description"
							:model-value="task.description"
							@input="updateDescription"
						/>
					</label>
				</div>

				<div class="task-form-modal__box">
					<RemovableInputList
						title="Subtasks"
						button-text="+Add New Subtask"
						:list="subtasks"
						:add="addSubtask"
						:remove="removeSubtask"
						:is-hide-button="subtasks.length >= MAX_TASKS"
						@update-item="updateSubtask"
					/>
				</div>

				<div class="task-form-modal__box">
					<p class="task-form-modal__subtitle">Status</p>
					<SelectBox
						:columns="columns"
						:current-column-id="task.columnId"
						@update-current-column="updateColumn"
					/>
				</div>

				<div>
					<PrimaryButton class="task-form-modal__create-button" type="submit">
						{{ buttonText }}
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
import RemovableInputList from "~/components/RemovableInputList/RemovableInputList.vue";
import SelectBox from "~/components/SelectBox/SelectBox.vue";
import { MAX_TASKS } from "~/constants/task";
import { Column, ColumnId, Subtask, SubtaskId, Task } from "~/types";

interface Props {
	title: string;
	buttonText: string;
	task: Task;
	subtasks: Subtask[];
	columns: Column[];
	onClose: () => void;
	onSubmit: () => void;
	addSubtask: () => void;
	updateSubtask: (itemId: SubtaskId, name: string) => void;
	removeSubtask: (id: SubtaskId) => void;
	updateColumn: (columId: ColumnId) => void;
}

defineProps<Props>();

const emit = defineEmits(["update-name", "update-description"]);

const updateName = (event: Event) => {
	const { value } = event.target as HTMLInputElement;

	emit("update-name", value);
};

const updateDescription = (event: Event) => {
	const { value } = event.target as HTMLInputElement;

	emit("update-description", value);
};
</script>

<style scoped lang="scss">
@use "./TaskFormModal.scss";
</style>
