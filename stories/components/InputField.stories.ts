import type { Meta, StoryObj } from "@storybook/vue3";
import InputField from "~/components/InputField/InputField.vue";

const meta = {
	title: "UI/InputField",
	component: InputField,
	decorators: [
		() => ({ template: '<div style="maxWidth: 50%"><story/></div>' }),
	],
	render: (args: any) => ({
		components: { InputField },
		setup() {
			const value = ref<string>(args.modelValue ?? "");

			return { label: args.label, value };
		},
		template: '<InputField :modelValue="value" :label="label" />',
	}),

	args: {
		modelValue: "",
	},
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		label: "Title",
	},
};

export const WithoutLabel: Story = {
	args: {},
};
