import { Modal } from "~/constants/modal";
import { ValidationStatus } from "~/constants/validation";
import { Column, Subtask } from "~/types";

export type ModalType = `${Modal}`;

export interface BoardModalColumn extends Column {
	validationStatus: ValidationStatus;
	isRemoveDisabled: boolean;
}

export interface TaskModalSubtask extends Subtask {
	validationStatus: ValidationStatus;
}
