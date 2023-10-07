<template>
	<div>
		<ClientOnly>
			<perfect-scrollbar
				v-dragscroll
				:class="{
					'app-board__container--full': isHidden,
					'app-board__container--no-boards': !boards.length,
				}"
				class="app-board__container"
			>
				<template v-if="boards.length">
					<ul v-if="columns.length" class="app-board__columns">
						<li
							v-for="column in columns"
							:key="column.id"
							class="app-board__column"
						>
							<BoardColumn :column="column" />
						</li>
					</ul>

					<div
						v-if="columns.length < MAX_COLUMNS"
						class="app-board__new-column"
					>
						<button
							type="button"
							class="app-board__new-column-button"
							@click="handleColumnAdd"
						>
							+ New Column
						</button>
					</div>
				</template>
				<div v-else class="app-board__no-boards">
					<p class="app-board__no-boards-text">
						This board is empty. Create new board to get started.
					</p>
					<PrimaryButton
						class="app-board__no-boards-button"
						@click="handleBoardAdd"
					>
						+ Create New Board
					</PrimaryButton>
				</div>
			</perfect-scrollbar>
		</ClientOnly>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import BoardColumn from "~/components/BoardColumn/BoardColumn.vue";
import PrimaryButton from "~/components/PrimaryButton/PrimaryButton.vue";
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
const { selectedBoardId, boards } = storeToRefs(boardStore);

const columnStore = useColumnStore();
const { getColumnsByBoardId } = columnStore;

const columns = computed(() => getColumnsByBoardId(selectedBoardId.value));

const handleColumnAdd = () => {
	setModal(Modal.ColumnAdd);
};

const handleBoardAdd = () => {
	setModal(Modal.BoardAdd);
};
</script>

<style scoped lang="scss">
@use "./AppBoard.scss";
</style>
~/composable/useSidebar
