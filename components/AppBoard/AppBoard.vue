<template>
	<div
		:class="{
			'app-board__container--full': isHidden,
		}"
		class="app-board__container"
	>
		<ul class="app-board__list">
			<li
				v-for="column in selectedBoard.columns"
				:key="column.id"
				class="app-board__item"
			>
				<BoardColumn :column="column" />
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import BoardColumn from "~/components/BoardColumn/BoardColumn.vue";
import { useBoardStore } from "~/store/useBoardStore";
import { useSidebarStore } from "~/store/useSidebarStore";

const sidebarStore = useSidebarStore();
const { isHidden } = storeToRefs(sidebarStore);

const boardStore = useBoardStore();
const { selectedBoard } = storeToRefs(boardStore);
</script>

<style scoped lang="scss">
@use "./AppBoard.scss";
</style>
~/composable/useSidebar
