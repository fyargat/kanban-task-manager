import type { Meta, StoryObj } from "@storybook/vue3";
import RemovableInputList from "~/components/RemovableInputList/RemovableInputList.vue";
import { Subtask } from "~/types";

const subtasks: Subtask[] = [
	{ id: "1", name: "Subtask 1", checked: false },
	{ id: "2", name: "Subtask 2", checked: true },
];

const meta = {
	title: "UI/RemovableInputList",
	component: RemovableInputList,
	decorators: [
		() => ({ template: '<div style="maxWidth: 400px"><story/></div>' }),
	],
	render: (args: any) => ({
		components: { RemovableInputList },
		setup() {
			return { args };
		},
		template: '<RemovableInputList  v-bind="args" />',
	}),
	args: {
		title: "Subtasks",
		buttonText: "+Add New Subtask",
		list: subtasks,
	},
} satisfies Meta<typeof RemovableInputList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {},
};

export const HideButton: Story = {
	args: {
		isHideButton: true,
	},
};
