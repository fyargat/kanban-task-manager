import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/vue3";
import DeleteModal from "~/components/DeleteModal/DeleteModal.vue";

const meta = {
	title: "UI/DeleteModal",
	component: DeleteModal,
	render: (args: any) => ({
		components: { DeleteModal },
		setup() {
			return { args };
		},
		template: '<DeleteModal  v-bind="args" />',
	}),
	args: {
		onDelete: action("delete"),
		onCancel: action("cancel"),
	},
} satisfies Meta<typeof DeleteModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DeleteTask: Story = {
	args: {
		title: "Delete this task?",
		text: "Are you sure you want to delete the 'Task 1' task?",
	},
};

export const DeleteBoard: Story = {
	args: {
		title: "Delete this board?",
		text: "Are you sure you want to delete the 'Board 1' board? This action will remove all columns and tasks and cannot be reversed.",
	},
};
