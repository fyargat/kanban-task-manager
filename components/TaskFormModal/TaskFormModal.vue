<template>
	<ModalDialog :on-close="onClose">
		<div class="task-form-modal__container">
			<h3 class="task-form-modal__title">
				{{ isEdit ? "Edit Task" : "Add New Task" }}
			</h3>

			<form @submit.prevent="handleSubmit">
				<div class="task-form-modal__box">
					<InputField v-model="task.name" label="Title" />
				</div>

				<div class="task-form-modal__box">
					<label>
						<p class="task-form-modal__subtitle">Description</p>
						<textarea
							v-model="task.description"
							class="task-form-modal__description"
						/>
					</label>
				</div>

				<div class="task-form-modal__box">
					<RemovableInputList
						title="Subtasks"
						button-text="+Add New Subtask"
						:list="task.subtasks"
					/>
				</div>

				<div class="task-form-modal__box">
					<p class="task-form-modal__subtitle">Status</p>
					<SelectBox :columns="columns" :current-column="columns[0]" />
				</div>

				<div>
					<PrimaryButton class="task-form-modal__create-button" type="submit">
						{{ isEdit ? "Save Changes" : "Create Task" }}
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
import { Column, Task } from "~/types";
import { getTaskTemplate } from "~/utils/task";

interface Props {
	task?: Task;
	onClose: () => void;
}

const props = defineProps<Props>();

const task = reactive<Task>(props.task ?? getTaskTemplate());

const isEdit = computed(() => !!props.task);

const handleSubmit = () => {};

// temp
const columns: Column[] = [
	{
		id: "1",
		name: "Column 1",
	},
	{
		id: "2",
		name: "Column 2",
	},
	{
		id: "3",
		name: "Column 3",
	},
];
</script>

<style scoped lang="scss">
@use "./TaskFormModal.scss";
</style>
