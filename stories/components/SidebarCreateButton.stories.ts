import type { Meta, StoryObj } from "@storybook/vue3";
import SidebarCreateButton from "~/components/SidebarCreateButton/SidebarCreateButton.vue";

const meta = {
	title: "UI/SidebarCreateButton",
	component: SidebarCreateButton,
	render: (args: any) => ({
		components: { SidebarCreateButton },
		setup() {
			return { args };
		},
		template: '<SidebarCreateButton  v-bind="args" />',
	}),
	args: {},
} satisfies Meta<typeof SidebarCreateButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {},
};
