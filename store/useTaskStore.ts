import { defineStore } from "pinia";
import { StorageKey } from "~/constants/storage";
import tasksData from "~/data/tasks.json";
import { StoreName } from "~/store/constants";
import { useSubtaskStore } from "~/store/useSubtaskStore";
import { ColumnId, Task, TaskId } from "~/types";
import { DraggableEventType } from "~/types/order";

const getTasksFromStorage = () => {
	const tasks = storage.get<Task[]>(StorageKey.Tasks) ?? tasksData;

	return tasks;
};

const getSelectedTaskIdFromStorage = () => {
	const selectedTaskId =
		storage.get<TaskId | null>(StorageKey.SelectedTaskId) ?? null;

	return selectedTaskId;
};

export const useTaskStore = defineStore(StoreName.Task, () => {
	const tasks = ref<Task[]>(getTasksFromStorage());
	const selectedTaskId = ref<TaskId | null>(getSelectedTaskIdFromStorage());

	const subtaskStore = useSubtaskStore();
	const { deleteSubtasksByTaskId } = subtaskStore;

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

	const deleteTasksByColumnId = (columnId: ColumnId) => {
		const result = [] as Task[];

		for (const task of tasks.value) {
			if (task.columnId !== columnId) {
				result.push(task);
			} else {
				deleteSubtasksByTaskId(task.id);
			}
		}

		tasks.value = result;
	};

	watch(
		tasks,
		(newValue) => {
			storage.set(StorageKey.Tasks, newValue);
		},
		{ deep: true },
	);

	watch(selectedTaskId, (newValue) => {
		storage.set(StorageKey.SelectedTaskId, newValue);
	});

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
		deleteTasksByColumnId,
		getTasksByColumnId,
	};
});
