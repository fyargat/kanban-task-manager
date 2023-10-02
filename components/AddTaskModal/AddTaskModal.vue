<template>
	<TaskFormModal
		title="Add New Task"
		button-text="Create Task"
		:task="task"
		:subtasks="subtasks"
		:columns="columns"
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
const { createTask } = taskStore;

const subtaskStore = useSubtaskStore();
const { addSubtasks } = subtaskStore;

const task = reactive<Task>(getTaskTemplate(columns.value[0].id));
const subtasks = ref<Subtask[]>([getInitSubtask(task.id)]);

const validate = () => {
	console.log("validate");
};

const handleSubmit = () => {
	validate();

	createTask(task);
	addSubtasks(subtasks.value);
	props.onClose();
};

const updateName = (name: string) => (task.name = name);
const updateDescription = (description: string) =>
	(task.description = description);
const updateColumn = (columnId: ColumnId) => (task.columnId = columnId);

const addSubtask = () => {
	if (subtasks.value.length >= MAX_TASKS) return;

	const subtaskData = getInitSubtask(task.id);
	subtasks.value.push(subtaskData);
};

const updateSubtask = (itemId: SubtaskId, name: string) => {
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
