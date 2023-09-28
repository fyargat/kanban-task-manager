import type { Meta, StoryObj } from "@storybook/vue3";
import AppBoard from "~/components/AppBoard/AppBoard.vue";
import { Board } from "~/types";

const board: Board = {
	id: "1",
	name: "Board 1",
	columns: [
		{
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
					status: "Column 2",
				},
			],
		},

		{
			id: "2",
			name: "Column 2",
			tasks: [],
		},

		{
			id: "3",
			name: "Column 3",
			tasks: [
				{
					id: "1",
					name: "Task 1",
					subtasks: [],
					status: "Column 1",
				},
			],
		},
	],
};

const meta = {
	title: "UI/AppBoard",
	component: AppBoard,
	parameters: {
		layout: "fullscreen",
	},
	render: (args: any) => ({
		components: { AppBoard },
		setup() {
			return { args };
		},
		template: '<AppBoard  v-bind="args" />',
	}),
	args: {
		board,
	},
} satisfies Meta<typeof AppBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {},
};
