<template>
	<div :class="`page__container ${theme}`">
		<AppHeader :boards="boards" :selected-board="boards[0]" />
		<main class="page__main">
			<SidebarDesktop
				v-if="!isMobile"
				:boards="boards"
				:selected-board="boards[0]"
			/>
			<AppBoard :board="board" />
		</main>
	</div>
</template>

<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import { storeToRefs } from "pinia";
import AppBoard from "~/components/AppBoard/AppBoard.vue";
import AppHeader from "~/components/AppHeader/AppHeader.vue";
import SidebarDesktop from "~/components/SidebarDesktop/SidebarDesktop.vue";
import { useThemeStore } from "~/store/useThemeStore";
import { Board } from "~/types";

const isMobile = useMediaQuery("(max-width: 767px)");
const themeStore = useThemeStore();
const { theme } = storeToRefs(themeStore);

const board: Board = {
	id: "1",
	name: "Board 1",
	columns: [
		{
			id: "1",
			name: "Column 1",
			tasks: [
				{
					id: "1",
					name: "Task 1",
					subtasks: [],
					status: "Column 1",
				},
				{
					id: "2",
					name: "Task 2",
					subtasks: [],
					status: "Column 2",
				},
			],
		},

		{
			id: "2",
			name: "Column 2",
			tasks: [],
		},

		{
			id: "3",
			name: "Column 3",
			tasks: [
				{
					id: "1",
					name: "Task 1",
					subtasks: [],
					status: "Column 1",
				},
			],
		},

		{
			id: "4",
			name: "Column 4",
			tasks: [
				{
					id: "1",
					name: "Task 1",
					subtasks: [],
					status: "Column 1",
				},
			],
		},

		{
			id: "5",
			name: "Column 5",
			tasks: [
				{
					id: "1",
					name: "Task 1",
					subtasks: [],
					status: "Column 1",
				},
			],
		},

		{
			id: "6",
			name: "Column 6",
			tasks: [
				{
					id: "1",
					name: "Task 1",
					subtasks: [],
					status: "Column 1",
				},
			],
		},
	],
};

const boards: Board[] = [
	{
		id: "1",
		name: "Board 1",
		columns: [],
	},
	{
		id: "2",
		name: "Board 2",
		columns: [],
	},
	{
		id: "3",
		name: "Board 3",
		columns: [],
	},
	{
		id: "4",
		name: "Board 4",
		columns: [],
	},
	{
		id: "5",
		name: "Board 5",
		columns: [],
	},
];
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
