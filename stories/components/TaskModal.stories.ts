import type { Meta, StoryObj } from "@storybook/vue3";
import TaskModal from "~/components/TaskModal/TaskModal.vue";
import { Column, Task } from "~/types";

const tasks: Task[] = [
	{
		id: "1",
		name: "Task 1",
		subtasks: [
			{ id: "1", name: "Subtask 1", checked: false },
			{ id: "2", name: "Subtask 2", checked: true },
		],
		description: "Lorem Ipsum is simply dummy text of the printing and",
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

	{
		id: "3",
		name: "Long description",
		subtasks: [
			{ id: "1", name: "Subtask 1", checked: false },
			{ id: "2", name: "Subtask 2", checked: true },
		],
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		status: "Doing",
	},

	{
		id: "4",
		name: "Without description",
		subtasks: [
			{ id: "1", name: "Subtask 1", checked: false },
			{ id: "2", name: "Subtask 2", checked: true },
		],
		status: "Doing",
	},
];

const columns: Column[] = [
	{
		id: "1",
		name: "Column 1",
	},
	{
		id: "2",
		name: "Column 2",
	},
	{
		id: "3",
		name: "Column 3",
	},
];

const meta = {
	title: "UI/TaskModal",
	component: TaskModal,
	render: (args: any) => ({
		components: { TaskModal },
		setup() {
			return { args };
		},
		template: '<TaskModal  v-bind="args" />',
	}),
	args: {
		task: tasks[0],
		columns,
		currentColumn: columns[0],
	},
} satisfies Meta<typeof TaskModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {},
};

export const LongTaskName: Story = {
	args: {
		task: tasks[1],
	},
};

export const LongDescription: Story = {
	args: {
		task: tasks[2],
	},
};

export const WithoutDescription: Story = {
	args: {
		task: tasks[3],
	},
};
