import type { Meta, StoryObj } from "@storybook/vue3";
import AddTaskModal from "~/components/AddTaskModal/AddTaskModal.vue";

const meta = {
	title: "UI/AddTaskModal",
	component: AddTaskModal,
	render: (args: any) => ({
		components: { AddTaskModal },
		setup() {
			return { args };
		},
		template: '<AddTaskModal  v-bind="args" />',
	}),
	args: {},
} satisfies Meta<typeof AddTaskModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {},
};
