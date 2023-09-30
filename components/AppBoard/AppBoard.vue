<template>
	<div
		:class="{
			'app-board__container--full': isHidden,
		}"
		class="app-board__container"
	>
		<ul v-if="columns.length" class="app-board__list">
			<li v-for="column in columns" :key="column.id" class="app-board__item">
				<BoardColumn :column="column" />
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import BoardColumn from "~/components/BoardColumn/BoardColumn.vue";
import { useBoardStore } from "~/store/useBoardStore";
import { useColumnStore } from "~/store/useColumnStore";
import { useSidebarStore } from "~/store/useSidebarStore";

const sidebarStore = useSidebarStore();
const { isHidden } = storeToRefs(sidebarStore);

const boardStore = useBoardStore();
const { selectedBoardId } = storeToRefs(boardStore);

const columnStore = useColumnStore();
const { getColumnsByBoardId } = columnStore;

const columns = computed(() => getColumnsByBoardId(selectedBoardId.value));
</script>

<style scoped lang="scss">
@use "./AppBoard.scss";
</style>
~/composable/useSidebar
