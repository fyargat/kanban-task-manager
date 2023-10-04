import { v4 } from "uuid";
import { Color } from "~/constants/column";
import { ValidationStatus } from "~/constants/validation";
import { BoardId } from "~/types";
import { ColumnWithValidationStatus } from "~/types/validation";

export const getInitColumn = (
	boardId: BoardId,
	color: Color,
): ColumnWithValidationStatus => ({
	id: v4(),
	name: "",
	color,
	boardId,
	validationStatus: ValidationStatus.Idle,
});
