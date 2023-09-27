import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/vue3";
import TaskCard from "~/components/TaskCard/TaskCard.vue";
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
		name: "Long name Long name Long name Long name Long name Long name Long name Long name Long name Long name Long name Long name Long name Long name Long name Long name",
		subtasks: [
			{ id: "1", name: "Subtask 1", checked: false },
			{ id: "2", name: "Subtask 2", checked: true },
		],
		status: "Doing",
	},
];

const meta = {
	title: "UI/TaskCard",
	component: TaskCard,
	decorators: [
		() => ({ template: '<div style="maxWidth: 278px"><story/></div>' }),
	],
	render: (args: any) => ({
		components: { TaskCard },
		setup() {
			return { args };
		},
		template: '<TaskCard v-bind="args" />',
		methods: {
			onClick: action("show task"),
		},
	}),
	args: {
		task: tasks[0],
	},
} satisfies Meta<typeof TaskCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {},
};

export const LongName: Story = {
	args: {
		task: tasks[1],
	},
};
