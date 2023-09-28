import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/vue3";
import TaskFormModal from "~/components/TaskFormModal/TaskFormModal.vue";
import { Task } from "~/types";

const task: Task = {
	id: "1",
	name: "Task 1",
	description: "Task Description",
	subtasks: [
		{ id: "1", name: "Subtask 1", checked: false },
		{ id: "2", name: "Subtask 2", checked: true },
	],
	status: "Doing",
};

// const columns: Column[] = [
// 	{
// 		id: "1",
// 		name: "Column 1",
// 	},
// 	{
// 		id: "2",
// 		name: "Column 2",
// 	},
// 	{
// 		id: "3",
// 		name: "Column 3",
// 	},
// ];

const meta = {
	title: "UI/TaskFormModal",
	component: TaskFormModal,
	render: (args: any) => ({
		components: { TaskFormModal },
		setup() {
			return { args };
		},
		template: '<TaskFormModal  v-bind="args" />',
	}),
	args: {
		onClose: action("close"),
	},
} satisfies Meta<typeof TaskFormModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Add: Story = {
	args: {},
};

export const Edit: Story = {
	args: {
		task,
	},
};
