// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ["@nuxtjs/stylelint-module", "@nuxtjs/storybook", "@pinia/nuxt"],
	css: ["~/assets/scss/index.scss"],
	components: {
		dirs: [],
	},
	pages: true,
});
