import { v4 } from "uuid";
import { Color } from "~/constants/column";
import { ValidationStatus } from "~/constants/validation";
import { BoardId } from "~/types";
import { BoardModalColumn } from "~/types/modal";

export const getInitColumnData = (
	boardId: BoardId,
	color: Color,
): BoardModalColumn => ({
	id: v4(),
	name: "",
	color,
	boardId,
	validationStatus: ValidationStatus.Idle,
	isRemoveDisabled: false,
});
