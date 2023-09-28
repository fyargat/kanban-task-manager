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
				<button type="button" class="sidebar-mobile__create-button">
					<div class="sidebar-mobile__create-button-icon">
						<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
								fill="currentColor"
							></path>
						</svg>
					</div>
					+ Create new board
				</button>
			</div>

			<div class="sidebar-mobile__wrap">
				<ThemeSwitcher class="sidebar-mobile__theme-switcher" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
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
