import type { Meta, StoryObj } from "@storybook/vue3";
import SidebarDesktop from "~/components/SidebarDesktop/SidebarDesktop.vue";
import { Board } from "~/types";

const getBoards = (number: number, name?: string): Board[] =>
	Array(number)
		.fill("_")
		.map((_, index) => ({
			id: (index + 1).toString(),
			name: name ? `${name} ${index + 1}` : `Board ${index + 1}`,
			columns: [],
		}));

const boards = getBoards(5);
const manyBoards = getBoards(100);
const boardsWithLongName = getBoards(
	4,
	"Long Name Long Name Long Name Long Name Long Name Long Name Long Name Long Name",
);

const meta = {
	title: "UI/SidebarDesktop",
	component: SidebarDesktop,
	parameters: {
		layout: "fullscreen",
	},
	decorators: [
		() => ({
			template: `<div>
		<header style="min-height: 96px; width: 100%; border-bottom: 1px solid #e4ebfa; padding: 2rem;" >Header</header>
		<story/>
		</div>`,
		}),
	],
	render: (args: any) => ({
		components: { SidebarDesktop },
		setup() {
			return { args };
		},
		template: '<SidebarDesktop  v-bind="args" />',
	}),
	args: {
		boards,
		selectedBoard: boards[0],
	},
} satisfies Meta<typeof SidebarDesktop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {},
};

export const ManyBoards: Story = {
	args: {
		boards: manyBoards,
		selectedBoard: manyBoards[0],
	},
};

export const LongBoardName: Story = {
	args: {
		boards: boardsWithLongName,
		selectedBoard: boardsWithLongName[0],
	},
};
