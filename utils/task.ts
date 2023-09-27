import { v4 } from "uuid";
import { Task } from "~/types";

export const getTaskTemplate = (): Task => ({
	id: v4(),
	name: "",
	description: "",
	subtasks: [
		{
			id: v4(),
			name: "",
			checked: false,
		},
	],
	status: "",
});
