<template>
	<ModalDialog :on-close="() => {}">
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
					<SelectBox :columns="columns" :current-column="currentColumn" />
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
	columns: Column[];
	currentColumn: Column;
	task?: Task;
}

const props = defineProps<Props>();

const task = reactive<Task>(props.task ?? getTaskTemplate());

const isEdit = computed(() => !!props.task);

const handleSubmit = () => {};
</script>

<style scoped lang="scss">
@use "./TaskFormModal.scss";
</style>
