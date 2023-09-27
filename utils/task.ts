import { v4 } from "uuid";

export const getTaskTemplate = () => ({
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
