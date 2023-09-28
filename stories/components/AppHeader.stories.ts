import type { Meta, StoryObj } from "@storybook/vue3";
import AppHeader from "~/components/AppHeader/AppHeader.vue";

const meta = {
	title: "UI/AppHeader",
	component: AppHeader,
	render: (args: any) => ({
		components: { AppHeader },
		setup() {
			return { args };
		},
		template: '<AppHeader  v-bind="args" />',
	}),
	args: {
		boardName: "Platform Launch",
	},
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {},
};
