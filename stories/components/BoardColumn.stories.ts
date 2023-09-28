import type { Meta, StoryObj } from "@storybook/vue3";
import BoardColumn from "~/components/BoardColumn/BoardColumn.vue";

const column = {
	id: "1",
	name: "Column 1",
	tasks: [
		{
			id: "1",
			name: "Task 1",
			subtasks: [],
			status: "Column 1",
		},
		{
			id: "2",
			name: "Task 2",
			subtasks: [],
			status: "Column 1",
		},
	],
};

const columnWithoutTasks = {
	id: "1",
	name: "Column 1",
	tasks: [],
};

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
		column,
	},
} satisfies Meta<typeof BoardColumn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const Empty: Story = {
	args: {
		column: columnWithoutTasks,
	},
};
