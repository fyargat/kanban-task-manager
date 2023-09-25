import type { Preview } from "@storybook/vue3";

import "../assets/scss/index.scss";

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
	decorators: [
		(story) => ({
			components: { story },
			template:
				'<div class="light" style="background-color: white;"><story /></div>',
		}),
	],
};

export default preview;
