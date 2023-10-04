<template>
	<TaskFormModal
		title="Edit Task"
		button-text="Save changes"
		:task="task"
		:subtasks="subtasks"
		:columns="columns"
		:task-name-validation-status="taskNameValidationStatus"
		:on-close="onClose"
		:on-submit="submit"
		:add-subtask="addSubtask"
		:update-subtask="updateSubtask"
		:remove-subtask="removeSubtask"
		:update-column="updateColumn"
		@update-name="updateName"
		@update-description="updateDescription"
	/>
</template>

<script setup lang="ts">
import TaskFormModal from "~/components/TaskFormModal/TaskFormModal.vue";
import { TaskModalEvent } from "~/constants/modal";

interface Props {
	onClose: () => void;
}

const props = defineProps<Props>();

const {
	task,
	subtasks,
	columns,
	taskNameValidationStatus,
	submit,
	updateName,
	updateDescription,
	addSubtask,
	updateSubtask,
	removeSubtask,
	updateColumn,
} = useTaskModal({
	event: TaskModalEvent.TaskEdit,
	onClose: props.onClose,
});
</script>
