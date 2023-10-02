import { v4 } from "uuid";
import { ColumnId, Task } from "~/types";

export const getTaskTemplate = (columnId: ColumnId): Task => ({
	id: v4(),
	name: "",
	description: "",
	columnId,
	// temp
	order: 0,
});
