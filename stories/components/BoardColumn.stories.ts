import type { Meta, StoryObj } from "@storybook/vue3";
import BoardColumn from "~/components/BoardColumn/BoardColumn.vue";
import { Task } from "~/types";

const tasks: Task[] = [
	{
		id: "1",
		name: "Task 1",
		subtasks: [
			{ id: "1", name: "Subtask 1", checked: false },
			{ id: "2", name: "Subtask 2", checked: true },
		],
		status: "Doing",
	},
	{
		id: "2",
		name: "Task 2",
		subtasks: [{ id: "1", name: "Subtask 1", checked: false }],
		status: "Doing",
	},
];

const meta = {
	title: "UI/BoardColumn",
	component: BoardColumn,
	render: (args: any) => ({
		components: { BoardColumn },
		setup() {
			return { args };
		},
		template: '<BoardColumn  v-bind="args" />',
	}),
	args: {
		tasks,
		name: "Preparing",
	},
} satisfies Meta<typeof BoardColumn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const Empty: Story = {
	args: {
		name: "Empty",
		tasks: [],
	},
};
