import { INVALID_STATUSES, ValidationStatus } from "~/constants/validation";
import { Column, Subtask } from "~/types";

export const isEmpty = (value: string): boolean => !value.trim();

// remove
export const isEveryEmpty = <T extends Column | Subtask>(items: T[]) =>
	items.every((v) => isEmpty(v.name));

export const isValidationInvalid = (statuses: ValidationStatus[]) =>
	statuses.some((v) => INVALID_STATUSES.includes(v));
