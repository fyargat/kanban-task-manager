import type { Meta, StoryObj } from "@storybook/vue3";
import SubtaskCheckbox from "~/components/SubtaskCheckbox/SubtaskCheckbox.vue";
import { Subtask } from "~/types";

const subtasks: Subtask[] = [
	{ id: "1", name: "Subtask 1", checked: false },
	{ id: "2", name: "Subtask 2", checked: true },
];

const meta = {
	title: "UI/SubtaskCheckbox",
	component: SubtaskCheckbox,
	decorators: [
		() => ({
			template:
				'<div style="maxWidth: 50%; background-color: white;"><story/></div>',
		}),
	],
	render: (args: any) => ({
		components: { SubtaskCheckbox },
		setup() {
			const subtask = ref<Subtask>(args.subtask as Subtask);

			const toggleCheckedSubtask = (checked: boolean) =>
				(subtask.value.checked = checked);

			return { subtask, toggleCheckedSubtask };
		},
		template:
			'<SubtaskCheckbox  :subtask="subtask" @toggleCheckedSubtask="toggleCheckedSubtask" />',
	}),
	args: {
		subtask: subtasks[0],
	},
} satisfies Meta<typeof SubtaskCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {},
};

export const Checked: Story = {
	args: {
		subtask: subtasks[1],
	},
};
