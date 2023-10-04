export enum ValidationStatus {
	Idle = "idle",
	Invalid = "invalid",
	Used = "used",
	Valid = "valid",
}

export const INVALID_STATUSES = [
	ValidationStatus.Invalid,
	ValidationStatus.Used,
];
