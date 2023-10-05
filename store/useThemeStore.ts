import { defineStore } from "pinia";
import { StorageKey } from "~/constants/storage";
import { Theme } from "~/constants/theme";
import { StoreName } from "~/store/constants";
import { ThemeType } from "~/types/theme";
import { storage } from "~/utils/storage";

const getTheme = () => {
	const theme = storage.get<ThemeType>(StorageKey.Theme) ?? Theme.Light;

	return theme;
};

export const useThemeStore = defineStore(StoreName.Theme, () => {
	const theme = ref<ThemeType>(getTheme());

	const toggleTheme = () => {
		const newTheme = theme.value === Theme.Dark ? Theme.Light : Theme.Dark;
		theme.value = newTheme;
	};

	watch(theme, (newValue) => {
		storage.set<ThemeType>(StorageKey.Theme, newValue);
	});

	return {
		theme,
		toggleTheme,
	};
});
