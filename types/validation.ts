import { ValidationStatus } from "~/constants/validation";
import { Column, Subtask } from "~/types";

export interface ColumnWithValidationStatus extends Column {
	validationStatus: ValidationStatus;
}

export interface SubtaskWithValidationStatus extends Subtask {
	validationStatus: ValidationStatus;
}
