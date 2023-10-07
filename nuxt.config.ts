// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	// modules: ["@nuxtjs/stylelint-module", "@nuxtjs/storybook", "@pinia/nuxt"],
	modules: ["@nuxtjs/stylelint-module", "@pinia/nuxt"],

	css: ["@/assets/scss/index.scss"],
	components: {
		dirs: [],
	},
	pages: true,
	app: {
		head: {
			title: "Kanban Task Manager",
		},
		buildAssetsDir: "assets",
	},
	experimental: {
		payloadExtraction: false,
	},
	vite: {
		server: {
			hmr: {
				protocol: "ws",
				host: "localhost",
			},
		},
	},
	ssr: false,
});
