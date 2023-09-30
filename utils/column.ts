import { v4 } from "uuid";
import { Color } from "~/constants/column";
import { BoardId, Column } from "~/types";

export const getInitColumn = (boardId: BoardId, color: Color): Column => ({
	id: v4(),
	name: "",
	color,
	boardId,
});
