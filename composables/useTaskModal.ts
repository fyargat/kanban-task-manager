import { storeToRefs } from "pinia";
import { TaskModalEvent } from "~/constants/modal";
import { MAX_TASKS, MIN_TASKS } from "~/constants/task";
import { ValidationStatus } from "~/constants/validation";
import { useBoardStore } from "~/store/useBoardStore";
import { useColumnStore } from "~/store/useColumnStore";
import { useSubtaskStore } from "~/store/useSubtaskStore";
import { useTaskStore } from "~/store/useTaskStore";
import { ColumnId, Subtask, SubtaskId, Task } from "~/types";
import { SubtaskWithValidationStatus } from "~/types/validation";
import { getInitSubtask } from "~/utils/subtask";
import { getTaskTemplate } from "~/utils/task";

interface Props {
	event: TaskModalEvent;
	onClose: () => void;
}

export const useTaskModal = ({ event, onClose }: Props) => {
	const boardStore = useBoardStore();
	const { selectedBoardId } = storeToRefs(boardStore);

	const columnStore = useColumnStore();
	const { getColumnsByBoardId } = columnStore;

	const columns = computed(() => getColumnsByBoardId(selectedBoardId.value));

	const taskStore = useTaskStore();
	const { selectedTask, selectedTaskId } = storeToRefs(taskStore);
	const { createTask, getTasksByColumnId, editTask } = taskStore;

	const columnTasksCount = computed(
		() => getTasksByColumnId(columns.value[0].id!).length,
	);

	const subtaskStore = useSubtaskStore();
	const { addSubtasks, getSubtasksByTaskId, editSubtasksByTaskId } =
		subtaskStore;

	const task =
		event === TaskModalEvent.TaskAdd
			? getTaskTemplate(columns.value[0].id, columnTasksCount.value)
			: { ...selectedTask.value! };
	const taskData = reactive<Task>(task);

	const subtasks =
		event === TaskModalEvent.TaskAdd
			? [getInitSubtask(taskData.id)]
			: getSubtasksByTaskId(selectedTaskId.value!).map((v) => ({
					...v,
					validationStatus: ValidationStatus.Idle,
			  }));

	const subtasksData = ref<SubtaskWithValidationStatus[]>(subtasks);

	const taskNameValidationStatus = ref<ValidationStatus>(ValidationStatus.Idle);

	const validate = () => {
		taskNameValidationStatus.value = isEmpty(taskData.name)
			? ValidationStatus.Invalid
			: ValidationStatus.Idle;

		subtasksData.value = subtasksData.value.map((v) => {
			const result = { ...v } as SubtaskWithValidationStatus;

			if (isEmpty(v.name)) {
				result.validationStatus = ValidationStatus.Invalid;

				return result;
			}

			return result;
		});
	};

	const isInvalid = () => {
		const validationStatuses = [
			taskNameValidationStatus.value,
			...subtasksData.value.map((v) => v.validationStatus),
		];

		return isValidationInvalid(validationStatuses);
	};

	const submit = () => {
		validate();

		if (isInvalid()) return;

		const subtasksWithName = subtasksData.value
			.filter((v) => !isEmpty(v.name))
			.map(({ validationStatus: _, ...v }) => ({
				...v,
			})) as Subtask[];

		if (event === TaskModalEvent.TaskAdd) {
			createTask(taskData);
			addSubtasks(subtasksWithName);
		}

		if (event === TaskModalEvent.TaskEdit) {
			editTask(selectedTaskId.value!, task);
			editSubtasksByTaskId(selectedTaskId.value!, subtasksWithName);
		}

		onClose();
	};

	const updateName = (name: string) => {
		if (taskNameValidationStatus.value === ValidationStatus.Invalid) {
			taskNameValidationStatus.value = ValidationStatus.Idle;
		}

		taskData.name = name;
	};
	const updateDescription = (description: string) =>
		(taskData.description = description);

	const updateColumn = (columnId: ColumnId) => {
		const columnTasksCount = getTasksByColumnId(columns.value[0].id!).length;

		taskData.columnId = columnId;
		taskData.order = columnTasksCount;
	};

	const addSubtask = () => {
		if (subtasksData.value.length >= MAX_TASKS) return;

		const subtaskData = getInitSubtask(taskData.id);
		subtasksData.value.push(subtaskData);
	};

	const updateSubtask = (itemId: SubtaskId, name: string) => {
		subtasksData.value = subtasksData.value.map((subtask) => {
			if (subtask.id === itemId) {
				return {
					...subtask,
					name,
					validationStatus: ValidationStatus.Idle,
				};
			}

			return subtask;
		});
	};

	const removeSubtask = (id: SubtaskId) => {
		if (subtasksData.value.length <= MIN_TASKS) return;

		subtasksData.value = subtasksData.value.filter(
			(subtask) => subtask.id !== id,
		);
	};

	return {
		task: taskData,
		subtasks: subtasksData,
		columns,
		taskNameValidationStatus,
		submit,
		updateName,
		updateDescription,
		addSubtask,
		updateSubtask,
		removeSubtask,
		updateColumn,
	};
};
