<template>
	<div class="sidebar-mobile__overlay" @mousedown="onClose">
		<div class="sidebar-mobile__content" @mousedown.stop="">
			<div class="sidebar-mobile__wrap">
				<h3 class="sidebar-mobile__title">All Boards ({{ boards.length }})</h3>
			</div>
			<ul class="sidebar-mobile__list">
				<li
					v-for="board in boards"
					:key="board.id"
					class="sidebar-mobile__item"
				>
					<SidebarItem
						:board="board"
						:is-active="selectedBoard.id === board.id"
					/>
				</li>
			</ul>

			<div class="sidebar-mobile__wrap sidebar-mobile__create-button-container">
				<SidebarCreateButton />
			</div>

			<div class="sidebar-mobile__wrap">
				<ThemeSwitcher class="sidebar-mobile__theme-switcher" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import SidebarCreateButton from "~/components/SidebarCreateButton/SidebarCreateButton.vue";
import SidebarItem from "~/components/SidebarItem/SidebarItem.vue";
import ThemeSwitcher from "~/components/ThemeSwitcher/ThemeSwitcher.vue";
import { Board } from "~/types";

interface Props {
	boards: Board[];
	selectedBoard: Board;
	onClose: () => void;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
@use "./SidebarMobile.scss";
</style>
