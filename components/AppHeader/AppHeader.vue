<template>
	<header class="app-header__container">
		<div class="app-header__wrapper">
			<div class="app-header__logo">
				<picture>
					<source
						srcset="~/assets/icons/logo-mobile.svg"
						media="(max-width: 767px)" />
					<img :src="logoPath" alt="Logo"
				/></picture>
			</div>
			<div class="app-header__controls">
				<div class="app-header__controls-left">
					<template v-if="isMobile">
						<button @click="isOpen = !isOpen">
							<h1
								:title="selectedBoard?.name ?? 'No Board Found'"
								:class="{
									'app-header__title--open': isOpen,
								}"
								class="app-header__title app-header__title--mobile"
							>
								{{ selectedBoard?.name ?? "No Board Found" }}
							</h1>
						</button>

						<SidebarMobile
							v-if="isOpen"
							:on-close="() => (isOpen = false)"
							:boards="boards"
							:selected-board-id="selectedBoardId"
							:create-board="createBoard"
						/>
					</template>

					<h1
						v-else
						:title="selectedBoard?.name ?? 'No Board Found'"
						class="app-header__title"
					>
						{{ selectedBoard?.name ?? "No Board Found" }}
					</h1>
				</div>
				<div class="app-header__controls-right">
					<PrimaryButton
						class="app-header__add-task-button"
						@click="addNewTask"
					>
						<img
							v-if="isMobile"
							src="~/assets/icons/icon-plus.svg"
							alt="Plus Icon"
						/>
						<template v-else> + Add New Task </template>
					</PrimaryButton>
					<OptionDropdown
						edit-text="Edit Board"
						delete-text="Delete Board"
						:on-edit="editBoard"
						:on-delete="deleteBoard"
					/>
				</div>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import { storeToRefs } from "pinia";
import OptionDropdown from "~/components/OptionDropdown/OptionDropdown.vue";
import PrimaryButton from "~/components/PrimaryButton/PrimaryButton.vue";
import SidebarMobile from "~/components/SidebarMobile/SidebarMobile.vue";
import { Theme } from "~/constants/theme";

import darkLogoPath from "~/assets/icons/logo-dark.svg";
import lightLogoPath from "~/assets/icons/logo-light.svg";
import { useBoardStore } from "~/store/useBoardStore";
import { useThemeStore } from "~/store/useThemeStore";

import { Modal } from "~/constants/modal";
import { useModalStore } from "~/store/useModalStore";

const isOpen = ref<boolean>(false);
const isMobile = useMediaQuery("(max-width: 767px)");

const themeStore = useThemeStore();
const { theme } = storeToRefs(themeStore);

const logoPath = computed(() =>
	theme.value === Theme.Light ? darkLogoPath : lightLogoPath,
);

const modalStore = useModalStore();
const { setModal } = modalStore;

const boardStore = useBoardStore();
const { boards, selectedBoardId, selectedBoard } = storeToRefs(boardStore);

const createBoard = () => {
	isOpen.value = false;
	setModal(Modal.BoardAdd);
};

const addNewTask = () => {
	setModal(Modal.TaskForm);
};

const editBoard = () => {
	setModal(Modal.BoardEdit);
};

const deleteBoard = () => {
	setModal(Modal.BoardDelete);
};
</script>

<style scoped lang="scss">
@use "./AppHeader.scss";
</style>
