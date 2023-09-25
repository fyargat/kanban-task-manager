import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/vue3";
import TaskCard from "~/components/TaskCard/TaskCard.vue";

const meta = {
	title: "UI/TaskCard",
	component: TaskCard,
	decorators: [
		() => ({ template: '<div style="maxWidth: 278px"><story/></div>' }),
	],
	render: (args: any) => ({
		components: { TaskCard },
		setup() {
			return { args };
		},
		template: '<TaskCard v-bind="args" />',
		methods: {
			onClick: action("show task"),
		},
	}),
	args: {
		title: "Launch version one",
		doneSubtaskCount: 1,
		subtaskCount: 10,
	},
} satisfies Meta<typeof TaskCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {},
};
