import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/vue3";
import SidebarItem from "~/components/SidebarItem/SidebarItem.vue";

const meta = {
	title: "UI/SidebarItem",
	component: SidebarItem,
	render: (args: any) => ({
		components: { SidebarItem },
		setup() {
			return { args };
		},
		template: '<SidebarItem @click="onClick"  v-bind="args" />',
		methods: {
			onClick: action("clicked"),
		},
	}),
	args: {
		isActive: false,
		text: "Sidebar Item",
	},
} satisfies Meta<typeof SidebarItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {},
};

export const Active: Story = {
	args: {
		isActive: true,
		text: "Sidebar item is active",
	},
};
