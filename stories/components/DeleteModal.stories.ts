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
		onClose: action("close"),
	},
} satisfies Meta<typeof DeleteModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DeleteTask: Story = {
	args: {},
};
