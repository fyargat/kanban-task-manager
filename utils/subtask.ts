import { v4 } from "uuid";
import { Subtask, TaskId } from "~/types";

export const getInitSubtask = (taskId: TaskId): Subtask => ({
	id: v4(),
	name: "",
	checked: false,
	taskId,
});
