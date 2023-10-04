import { v4 } from "uuid";
import { ValidationStatus } from "~/constants/validation";
import { TaskId } from "~/types";
import { SubtaskWithValidationStatus } from "~/types/validation";

export const getInitSubtask = (
	taskId: TaskId,
): SubtaskWithValidationStatus => ({
	id: v4(),
	name: "",
	checked: false,
	taskId,
	validationStatus: ValidationStatus.Idle,
});
