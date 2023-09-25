import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/vue3";
import ThemeSwitcher from "~/components/ThemeSwitcher/ThemeSwitcher.vue";

const meta = {
	title: "UI/ThemeSwitcher",
	component: ThemeSwitcher,
	render: (args: any) => ({
		components: { ThemeSwitcher },
		setup() {
			return { args };
		},
		template: '<ThemeSwitcher :updateTheme="updateTheme" v-bind="args" />',
		methods: {
			updateTheme: action("update Theme"),
		},
	}),
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {},
};
