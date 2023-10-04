import { useMediaQuery } from "@vueuse/core";
import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebarStore", () => {
	const isMobile = useMediaQuery("(max-width: 767px)");

	const isHidden = ref<boolean>(false);

	const show = () => {
		isHidden.value = false;
	};

	const hide = () => {
		isHidden.value = true;
	};

	watch(isMobile, (newValue) => {
		isHidden.value = newValue;
	});

	return {
		isHidden,
		show,
		hide,
	};
});
