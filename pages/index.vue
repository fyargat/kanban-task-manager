<template>
	<div :class="`page__container ${theme}`">
		<AppModals />
		<AppHeader />
		<main class="page__main">
			<SidebarDesktop v-if="!isMobile" />
			<AppBoard />
		</main>
	</div>
</template>

<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import { storeToRefs } from "pinia";
import AppBoard from "~/components/AppBoard/AppBoard.vue";
import AppHeader from "~/components/AppHeader/AppHeader.vue";
import AppModals from "~/components/AppModals/AppModals.vue";
import SidebarDesktop from "~/components/SidebarDesktop/SidebarDesktop.vue";
import { useThemeStore } from "~/store/useThemeStore";

const isMobile = useMediaQuery("(max-width: 767px)");
const themeStore = useThemeStore();
const { theme } = storeToRefs(themeStore);
</script>

<style scoped lang="scss">
.page {
	&__container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background-color: var(--color-bg);
	}

	&__main {
		position: relative;

		overflow: auto;
		display: flex;

		width: 100%;
		height: 100%;

		background-color: var(--color-background);
	}
}
</style>
