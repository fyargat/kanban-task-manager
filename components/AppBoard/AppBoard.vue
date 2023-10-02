<template>
	<div
		:class="{
			'app-board__container--full': isHidden,
		}"
		class="app-board__container"
	>
		<ul v-if="columns.length" class="app-board__columns">
			<li v-for="column in columns" :key="column.id" class="app-board__column">
				<BoardColumn :column="column" />
			</li>
		</ul>

		<div v-if="columns.length < MAX_COLUMNS" class="app-board__new-column">
			<button
				type="button"
				class="app-board__new-column-button"
				@click="addNewColumn"
			>
				+ New Column
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import BoardColumn from "~/components/BoardColumn/BoardColumn.vue";
import { MAX_COLUMNS } from "~/constants/column";
import { Modal } from "~/constants/modal";
import { useBoardStore } from "~/store/useBoardStore";
import { useColumnStore } from "~/store/useColumnStore";
import { useModalStore } from "~/store/useModalStore";
import { useSidebarStore } from "~/store/useSidebarStore";

const modalStore = useModalStore();
const { setModal } = modalStore;

const sidebarStore = useSidebarStore();
const { isHidden } = storeToRefs(sidebarStore);

const boardStore = useBoardStore();
const { selectedBoardId } = storeToRefs(boardStore);

const columnStore = useColumnStore();
const { getColumnsByBoardId } = columnStore;

const columns = computed(() => getColumnsByBoardId(selectedBoardId.value));

const addNewColumn = () => {
	setModal(Modal.ColumnAdd);
};
</script>

<style scoped lang="scss">
@use "./AppBoard.scss";
</style>
~/composable/useSidebar
