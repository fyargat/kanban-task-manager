import { v4 } from "uuid";
import { ValidationStatus } from "~/constants/validation";
import { TaskId } from "~/types";
import { TaskModalSubtask } from "~/types/modal";

export const getInitSubtaskData = (taskId: TaskId): TaskModalSubtask => ({
	id: v4(),
	name: "",
	checked: false,
	taskId,
	validationStatus: ValidationStatus.Idle,
});
