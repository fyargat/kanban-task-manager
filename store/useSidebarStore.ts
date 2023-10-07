import { defineStore } from "pinia";
import { StorageKey } from "~/constants/storage";
import { StoreName } from "~/store/constants";

import { storage } from "~/utils/storage";

const getSidebar = () => {
	const sidebar = storage.get<boolean>(StorageKey.isSidebarHidden) ?? false;

	return sidebar;
};

export const useSidebarStore = defineStore(StoreName.Sidebar, () => {
	const isHidden = ref<boolean>(getSidebar());

	const show = () => {
		isHidden.value = false;
		storage.set(StorageKey.isSidebarHidden, false);
	};

	const hide = () => {
		isHidden.value = true;
		storage.set(StorageKey.isSidebarHidden, true);
	};

	watch(isHidden, (newValue) => {
		storage.set(StorageKey.isSidebarHidden, newValue);
	});

	return {
		isHidden,
		show,
		hide,
	};
});
