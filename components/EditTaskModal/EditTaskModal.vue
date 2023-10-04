<template>
	<TaskFormModal
		title="Edit Task"
		button-text="Save changes"
		:task="task"
		:subtasks="subtasks"
		:columns="columns"
		:task-name-validation-status="taskNameValidationStatus"
		:subtasks-validation-status="subtasksValidationStatus"
		:on-close="onClose"
		:on-submit="handleSubmit"
		:add-subtask="addSubtask"
		:update-subtask="updateSubtask"
		:remove-subtask="removeSubtask"
		:update-column="updateColumn"
		@update-name="updateName"
		@update-description="updateDescription"
	/>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import TaskFormModal from "~/components/TaskFormModal/TaskFormModal.vue";
import { MAX_TASKS, MIN_TASKS } from "~/constants/task";
import { ValidationStatus } from "~/constants/validation";
import { useBoardStore } from "~/store/useBoardStore";
import { useColumnStore } from "~/store/useColumnStore";
import { useSubtaskStore } from "~/store/useSubtaskStore";
import { useTaskStore } from "~/store/useTaskStore";
import { ColumnId, Subtask, SubtaskId, Task } from "~/types";
import { getInitSubtask } from "~/utils/subtask";

interface Props {
	onClose: () => void;
}

const props = defineProps<Props>();

const boardStore = useBoardStore();
const { selectedBoardId } = storeToRefs(boardStore);

const columnStore = useColumnStore();
const { getColumnsByBoardId } = columnStore;

const columns = computed(() => getColumnsByBoardId(selectedBoardId.value));

const taskStore = useTaskStore();
const { selectedTask, selectedTaskId } = storeToRefs(taskStore);
const { editTask } = taskStore;

const subtaskStore = useSubtaskStore();
const { getSubtasksByTaskId, editSubtasksByTaskId } = subtaskStore;

const task = reactive<Task>({ ...selectedTask.value! });
const subtasks = ref<Subtask[]>(getSubtasksByTaskId(selectedTaskId.value!));

const taskNameValidationStatus = ref<ValidationStatus>(ValidationStatus.Idle);
const subtasksValidationStatus = ref<ValidationStatus>(ValidationStatus.Idle);

const isValid = () => {
	if (isEmpty(task.name)) {
		taskNameValidationStatus.value = ValidationStatus.Invalid;
	}

	if (isEveryEmpty(subtasks.value)) {
		subtasksValidationStatus.value = ValidationStatus.Invalid;
	}

	if (
		taskNameValidationStatus.value === ValidationStatus.Invalid ||
		subtasksValidationStatus.value === ValidationStatus.Invalid
	) {
		return false;
	}

	return true;
};

const handleSubmit = () => {
	if (!isValid()) return;

	const subtasksWithName = subtasks.value.filter((v) => !isEmpty(v.name));

	editTask(selectedTaskId.value!, task);
	editSubtasksByTaskId(selectedTaskId.value!, subtasksWithName);
	props.onClose();
};

const updateName = (name: string) => {
	if (taskNameValidationStatus.value === ValidationStatus.Invalid) {
		taskNameValidationStatus.value = ValidationStatus.Idle;
	}

	task.name = name;
};
const updateDescription = (description: string) =>
	(task.description = description);
const updateColumn = (columnId: ColumnId) => (task.columnId = columnId);

const addSubtask = () => {
	if (subtasks.value.length >= MAX_TASKS) return;

	const subtaskData = getInitSubtask(task.id);
	subtasks.value.push(subtaskData);
};

const updateSubtask = (itemId: SubtaskId, name: string) => {
	if (subtasksValidationStatus.value === ValidationStatus.Invalid) {
		subtasksValidationStatus.value = ValidationStatus.Idle;
	}

	subtasks.value = subtasks.value.map((subtask) => {
		if (subtask.id === itemId) {
			return {
				...subtask,
				name,
			};
		}

		return subtask;
	});
};

const removeSubtask = (id: SubtaskId) => {
	if (subtasks.value.length <= MIN_TASKS) return;

	subtasks.value = subtasks.value.filter((subtask) => subtask.id !== id);
};
</script>
