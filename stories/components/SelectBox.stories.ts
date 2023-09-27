import type { Meta, StoryObj } from "@storybook/vue3";
import SelectBox from "~/components/SelectBox/SelectBox.vue";
import { Column } from "~/types";

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

const meta = {
	title: "UI/SelectBox",
	component: SelectBox,
	decorators: [
		() => ({ template: '<div style="maxWidth: 50%;"><story/></div>' }),
	],
	render: (args: any) => ({
		components: { SelectBox },
		setup() {
			const selectedOption = ref<Column>(args.selectedOption as Column);

			const updateSelectedOption = (option: Column) =>
				(selectedOption.value = option);

			return { options: args.options, selectedOption, updateSelectedOption };
		},
		template:
			'<SelectBox  :selectedOption="selectedOption" @updateSelectedOption="updateSelectedOption" :options="options" />',
	}),
	args: {
		columns,
		currentColumn: columns[0],
	},
} satisfies Meta<typeof SelectBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {},
};
