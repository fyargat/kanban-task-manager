import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/vue3";
import RemovableInputField from "~/components/RemovableInputField/RemovableInputField.vue";

const meta = {
	title: "UI/RemovableInputField",
	component: RemovableInputField,
	decorators: [
		() => ({ template: '<div style="maxWidth: 400px"><story/></div>' }),
	],
	render: (args: any) => ({
		components: { RemovableInputField },
		setup() {
			const { modelValue, ...rest } = args;
			const value = ref<string>(modelValue ?? "");

			return {
				rest,
				value,
			};
		},
		template: '<RemovableInputField  v-model="value" v-bind="rest" />',
	}),
	args: {
		modelValue: "",
		onRemove: action("remove"),
	},
} satisfies Meta<typeof RemovableInputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {},
};

export const Disabled: Story = {
	args: {
		isDisabled: true,
	},
};

export const HideButton: Story = {
	args: {
		isHideButton: true,
	},
};
