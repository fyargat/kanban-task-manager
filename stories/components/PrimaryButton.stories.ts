import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/vue3";
import PrimaryButton from "~/components/PrimaryButton/PrimaryButton.vue";

const meta = {
	title: "UI/PrimaryButton",
	component: PrimaryButton,
	render: (args: any) => ({
		components: { PrimaryButton },
		setup() {
			return { args };
		},
		template:
			'<PrimaryButton @click="onClick" v-bind="args">Base</PrimaryButton>',
		methods: {
			onClick: action("click"),
		},
	}),
} satisfies Meta<typeof PrimaryButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {},
};
