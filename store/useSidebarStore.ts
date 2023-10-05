import { useMediaQuery } from "@vueuse/core";
import { defineStore } from "pinia";
import { StorageKey } from "~/constants/storage";
import { StoreName } from "~/store/constants";

import { storage } from "~/utils/storage";

const getSidebar = () => {
	const sidebar = storage.get<boolean>(StorageKey.isSidebarHidden) ?? false;

	return sidebar;
};

export const useSidebarStore = defineStore(StoreName.Sidebar, () => {
	const isMobile = useMediaQuery("(max-width: 767px)");

	const isHidden = ref<boolean>(getSidebar());

	const show = () => {
		isHidden.value = false;
		storage.set(StoreName.Sidebar, false);
	};

	const hide = () => {
		isHidden.value = true;
		storage.set(StoreName.Sidebar, true);
	};

	watch(isMobile, (newValue) => {
		if (newValue) {
			isHidden.value = newValue;
			storage.set(StoreName.Sidebar, newValue);
		}
	});

	watch(isHidden, (newValue) => {
		storage.set(StorageKey.isSidebarHidden, newValue);
	});

	return {
		isHidden,
		show,
		hide,
	};
});
