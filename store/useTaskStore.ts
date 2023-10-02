import { defineStore } from "pinia";
import { ColumnId, Task, TaskId } from "../types";
import { DraggableEventType } from "../types/order";

// temp
const mockTasks: Task[] = [
	{
		id: "0ac8b1ee-315c-4d1c-b223-f799dcdd3task1",
		name: "Task 1",
		description: "Task 1 Description",
		order: 0,
		columnId: "0ac8b1ee-315c-4d1c-b223-f799dcdd3ba1",
	},
	{
		id: "0ac8b1ee-315c-4d1c-b223-f799dcdd3task2",
		name: "Task 2",
		description: "Task 2 Description",
		order: 1,
		columnId: "0ac8b1ee-315c-4d1c-b223-f799dcdd3ba1",
	},
	{
		id: "0ac8b1ee-315c-4d1c-b223-f799dcdd3task3",
		name: "Task 3",
		description: "Task 3 Description",
		order: 2,
		columnId: "0ac8b1ee-315c-4d1c-b223-f799dcdd3ba1",
	},
	{
		id: "0ac8b1ee-315c-4d1c-b223-f799dcdd3task4",
		name: "Task 4",
		description: "Task 4 Description",
		order: 3,
		columnId: "0ac8b1ee-315c-4d1c-b223-f799dcdd3ba1",
	},
	{
		id: "0ac8b1ee-315c-4d1c-b223-f799dcdd3task5",
		name: "Task 5",
		description: "Task 5 Description",
		order: 4,
		columnId: "0ac8b1ee-315c-4d1c-b223-f799dcdd3ba1",
	},
	{
		id: "0ac8b1ee-315c-4d1c-b223-f799dcdd3task4121",
		name: "Other Task",
		description: "",
		order: 0,
		columnId: "0ac8b1ee-315c-4d1c-b223-f799dcdd3ba2",
	},
];

export const useTaskStore = defineStore("taskStore", () => {
	const tasks = ref<Task[]>(mockTasks ?? []);
	const selectedTaskId = ref<TaskId | null>(null);

	const selectedTask = computed(() => {
		return getTask(selectedTaskId.value);
	});

	const selectTask = (taskId: TaskId | null) => {
		selectedTaskId.value = taskId;
	};

	const getTask = (taskId: TaskId | null): Task | null => {
		if (!taskId) return null;

		const task = tasks.value.find((v) => v.id === taskId) ?? null;

		return task;
	};

	const getTasksByColumnId = (columnId: ColumnId) => {
		return tasks.value
			.filter((v) => v.columnId === columnId)
			.sort((a, b) => a.order - b.order);
	};

	const createTask = (task: Task) => {
		tasks.value.push(task);
	};

	const reorderColumnTasks = (
		event: DraggableEventType,
		columnId: ColumnId,
		oldOrder: number | null,
		newOrder: number | null,
	) => {
		const tasks = getTasksByColumnId(columnId);

		const tasksWithNewOrder = getReorderFnByDraggableEvent(event)(tasks, {
			oldOrder,
			newOrder,
		});

		tasksWithNewOrder.forEach((task) => {
			editTask(task.id, task);
		});
	};

	const editTask = (taskId: TaskId, updatedTask: Task) => {
		tasks.value = tasks.value.map((task) => {
			if (task.id === taskId) {
				return {
					...task,
					...updatedTask,
				};
			}

			return task;
		});
	};

	const deleteTask = () => {
		tasks.value = tasks.value.filter((v) => v.id !== selectedTaskId.value);

		selectTask(null);
	};

	return {
		tasks,
		selectedTaskId,
		selectedTask,

		selectTask,
		getTask,
		createTask,
		reorderColumnTasks,
		editTask,
		deleteTask,
		getTasksByColumnId,
	};
});
