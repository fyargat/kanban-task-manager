import type { Meta, StoryObj } from "@storybook/vue3";
import BoardFormModal from "~/components/BoardFormModal/BoardFormModal.vue";
import { Board, Column } from "~/types";

const columns: Column[] = [
	{
		id: "1",
		name: "Column 1",
	},
	{
		id: "2",
		name: "Column 2",
	},
	{
		id: "3",
		name: "Column 3",
	},
];

const board: Board = {
	id: "1",
	name: "Board 1",
	columns,
};

const meta = {
	title: "UI/BoardFormModal",
	component: BoardFormModal,
	render: (args: any) => ({
		components: { BoardFormModal },
		setup() {
			return { args };
		},
		template: '<BoardFormModal  v-bind="args" />',
	}),
	args: {},
} satisfies Meta<typeof BoardFormModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Add: Story = {
	args: {},
};

export const Edit: Story = {
	args: {
		board,
	},
};
