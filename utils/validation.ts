import { INVALID_STATUSES, ValidationStatus } from "~/constants/validation";

export const isEmpty = (value: string): boolean => !value.trim();

export const isValidationInvalid = (statuses: ValidationStatus[]) =>
	statuses.some((v) => INVALID_STATUSES.includes(v));
