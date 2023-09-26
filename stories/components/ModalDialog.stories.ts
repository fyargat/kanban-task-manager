import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/vue3";
import ModalDialog from "~/components/ModalDialog/ModalDialog.vue";

const meta = {
	title: "UI/ModalDialog",
	component: ModalDialog,
	render: (args: any) => ({
		components: { ModalDialog },
		setup() {
			return { args };
		},
		template: '<ModalDialog  v-bind="args">Base</ModalDialog>',
	}),

	args: {
		onClose: action("close"),
	},
} satisfies Meta<typeof ModalDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {},
};
