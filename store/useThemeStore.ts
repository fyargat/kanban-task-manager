import { defineStore } from "pinia";
import { Theme } from "~/constants/theme";
import { ThemeType } from "~/types/theme";

export const useThemeStore = defineStore("themeStore", () => {
	const theme = ref<ThemeType>(Theme.Dark);

	const toggleTheme = () => {
		const newTheme = theme.value === Theme.Dark ? Theme.Light : Theme.Dark;
		theme.value = newTheme;
	};

	return {
		theme,
		toggleTheme,
	};
});
