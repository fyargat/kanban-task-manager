import { v4 } from "uuid";
import { ColumnId, Task } from "~/types";

export const getTaskTemplate = (columnId: ColumnId, order: number): Task => ({
	id: v4(),
	name: "",
	description: "",
	columnId,
	order,
});
