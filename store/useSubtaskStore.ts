import { defineStore } from "pinia";
import { Subtask, SubtaskId, TaskId } from "../types";

// temp
const mockSubtasks: Subtask[] = [
	{
		id: "0ac8b1ee-315c-4d1c-b223-f799dcddsbt1",
		taskId: "0ac8b1ee-315c-4d1c-b223-f799dcdd3task1",
		name: "Task 1",
		checked: true,
	},
	{
		id: "0ac8b1ee-315c-4d1c-b223-f799dcddsbt2",
		taskId: "0ac8b1ee-315c-4d1c-b223-f799dcdd3task1",
		name: "Task 2",
		checked: false,
	},
];

export const useSubtaskStore = defineStore("subtaskStore", () => {
	const subtasks = ref<Subtask[]>(mockSubtasks ?? []);

	const getSubtasksByTaskId = (taskId: TaskId) => {
		return subtasks.value.filter((v) => v.taskId === taskId);
	};

	const createSubtask = (subtask: Subtask) => {
		subtasks.value.push(subtask);
	};

	const editSubtask = (subtaskId: SubtaskId, updatedSubtask: Subtask) => {
		subtasks.value = subtasks.value.map((subtask) => {
			if (subtask.id === subtaskId) {
				return {
					...subtask,
					...updatedSubtask,
				};
			}

			return subtask;
		});
	};

	const deleteSubtask = () => {
		console.log("delete");
	};

	return {
		subtasks,
		createSubtask,
		editSubtask,
		deleteSubtask,
		getSubtasksByTaskId,
	};
});
