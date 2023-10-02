<template>
	<div>
		<div
			:class="{
				'sidebar-desktop__container--hide': isHidden,
			}"
			class="sidebar-desktop__container"
		>
			<header class="sidebar-desktop__wrap">
				<h3 class="sidebar-desktop__title">All Boards ({{ boards.length }})</h3>
			</header>

			<div class="sidebar-desktop__boards">
				<perfect-scrollbar>
					<ul class="sidebar-desktop__list">
						<li
							v-for="board in boards"
							:key="board.id"
							class="sidebar-desktop__item"
						>
							<SidebarItem
								:board="board"
								:is-active="selectedBoardId === board.id"
								@click="() => selectBoard(board.id)"
							/>
						</li>
					</ul>
				</perfect-scrollbar>

				<div
					class="sidebar-desktop__wrap sidebar-desktop__create-button-container"
				>
					<SidebarCreateButton @click="setModal(Modal.BoardAdd)" />
				</div>
			</div>

			<footer class="sidebar-desktop__wrap sidebar-desktop__footer">
				<ThemeSwitcher class="sidebar-desktop__theme-switcher" />

				<div>
					<button class="sidebar-desktop__hide-button" @click="hide">
						<div>
							<img src="~/assets/icons/icon-hide-sidebar.svg" alt="" />
						</div>
						Hide Sidebar
					</button>
				</div>
			</footer>
		</div>

		<button type="button" class="sidebar-desktop__show-button" @click="show">
			<img src="~/assets/icons/icon-show-sidebar.svg" alt="" />
		</button>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import SidebarCreateButton from "~/components/SidebarCreateButton/SidebarCreateButton.vue";
import SidebarItem from "~/components/SidebarItem/SidebarItem.vue";
import ThemeSwitcher from "~/components/ThemeSwitcher/ThemeSwitcher.vue";
import { Modal } from "~/constants/modal";
import { useBoardStore } from "~/store/useBoardStore";
import { useModalStore } from "~/store/useModalStore";
import { useSidebarStore } from "~/store/useSidebarStore";

const modalStore = useModalStore();

const { setModal } = modalStore;

const sidebarStore = useSidebarStore();
const { isHidden } = storeToRefs(sidebarStore);
const { show, hide } = sidebarStore;

const boardStore = useBoardStore();
const { boards, selectedBoardId } = storeToRefs(boardStore);
const { selectBoard } = boardStore;
</script>

<style scoped lang="scss">
@use "./SidebarDesktop.scss";
</style>
