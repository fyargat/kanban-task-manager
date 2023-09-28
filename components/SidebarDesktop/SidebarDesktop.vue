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
				<ul class="sidebar-desktop__list">
					<li
						v-for="board in boards"
						:key="board.id"
						class="sidebar-desktop__item"
					>
						<SidebarItem
							:board="board"
							:is-active="selectedBoard.id === board.id"
						/>
					</li>
				</ul>

				<div
					class="sidebar-desktop__wrap sidebar-desktop__create-button-container"
				>
					<SidebarCreateButton />
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
import { useSidebarStore } from "~/store/sidebar";
import { Board } from "~/types";

interface Props {
	boards: Board[];
	selectedBoard: Board;
}

defineProps<Props>();

const sidebarStore = useSidebarStore();
const { isHidden } = storeToRefs(sidebarStore);
const { show, hide } = sidebarStore;
</script>

<style scoped lang="scss">
@use "./SidebarDesktop.scss";
</style>
