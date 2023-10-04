<template>
	<TaskFormModal
		title="Add New Task"
		button-text="Create Task"
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
import { getTaskTemplate } from "~/utils/task";

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
const { createTask, getTasksByColumnId } = taskStore;

const columnTasksCount = computed(
	() => getTasksByColumnId(columns.value[0].id!).length,
);

const subtaskStore = useSubtaskStore();
const { addSubtasks } = subtaskStore;

const task = reactive<Task>(
	getTaskTemplate(columns.value[0].id, columnTasksCount.value),
);
const subtasks = ref<Subtask[]>([getInitSubtask(task.id)]);

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

	createTask(task);
	addSubtasks(subtasksWithName);
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
const updateColumn = (columnId: ColumnId) => {
	const columnTasksCount = getTasksByColumnId(columns.value[0].id!).length;

	task.columnId = columnId;
	task.order = columnTasksCount;
};

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
