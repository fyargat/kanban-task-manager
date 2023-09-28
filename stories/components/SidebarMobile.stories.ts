import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/vue3";
import SidebarMobile from "~/components/SidebarMobile/SidebarMobile.vue";
import { Board } from "~/types";

const boards: Board[] = [
	{
		id: "1",
		name: "Board 1",
		columns: [],
	},
	{
		id: "2",
		name: "Board 2",
		columns: [],
	},
	{
		id: "3",
		name: "Board 3",
		columns: [],
	},
	{
		id: "4",
		name: "Board 4",
		columns: [],
	},
	{
		id: "5",
		name: "Board 5",
		columns: [],
	},
];

const meta = {
	title: "UI/SidebarMobile",
	component: SidebarMobile,
	render: (args: any) => ({
		components: { SidebarMobile },
		setup() {
			return { args };
		},
		template: '<SidebarMobile  v-bind="args" />',
	}),
	args: {
		boards,
		selectedBoard: boards[0],
		onClose: action("close"),
	},
} satisfies Meta<typeof SidebarMobile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {},
};
