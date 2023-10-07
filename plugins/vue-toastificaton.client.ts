import Toast, { PluginOptions } from "vue-toastification";

import "~/assets/scss/_toast.scss";

const options: PluginOptions = {
	timeout: 3000,
	closeButton: false,
};

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(Toast, options);
});
