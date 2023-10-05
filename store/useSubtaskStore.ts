import { defineStore } from "pinia";
import { StorageKey } from "~/constants/storage";
import subtasksData from "~/data/subtasks.json";
import { StoreName } from "~/store/constants";
import { Subtask, SubtaskId, TaskId } from "~/types";

const getSubtasksFromStorage = () => {
	const subtasks = storage.get<Subtask[]>(StorageKey.Subtasks) ?? subtasksData;

	return subtasks;
};

export const useSubtaskStore = defineStore(StoreName.Subtask, () => {
	const subtasks = ref<Subtask[]>(getSubtasksFromStorage());

	const getSubtasksByTaskId = (taskId: TaskId) => {
		return subtasks.value.filter((v) => v.taskId === taskId);
	};

	const addSubtasks = (newSubtasks: Subtask[]) => {
		subtasks.value.push(...newSubtasks);
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

	const editSubtasksByTaskId = (taskId: TaskId, newSubtasks: Subtask[]) => {
		deleteSubtasks(taskId);

		addSubtasks(newSubtasks);
	};

	const deleteSubtasks = (taskId: TaskId) => {
		subtasks.value = subtasks.value.filter(
			(subtask) => subtask.taskId !== taskId,
		);
	};

	watch(
		subtasks,
		(newValue) => {
			storage.set(StorageKey.Subtasks, newValue);
		},
		{ deep: true },
	);

	return {
		subtasks,
		addSubtasks,
		editSubtask,
		editSubtasksByTaskId,
		deleteSubtasks,
		getSubtasksByTaskId,
	};
});
