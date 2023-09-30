import { defineStore } from "pinia";
import { ColumnId, Task } from "../types";

export const useTaskStore = defineStore("taskStore", () => {
	const tasks = ref<Task[]>([]);

	const getTasksByColumnId = (columnId: ColumnId) => {
		return tasks.value.filter((v) => v.columnId === columnId);
	};

	const createTask = (task: Task) => {
		tasks.value.push(task);
	};

	const editTask = () => {
		console.log("edit");
	};

	const deleteTask = () => {
		console.log("delete");
	};

	return {
		tasks,
		createTask,
		editTask,
		deleteTask,
		getTasksByColumnId,
	};
});
