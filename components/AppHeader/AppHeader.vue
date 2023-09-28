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
					<button v-if="isMobile" @click="isOpen = !isOpen">
						<h1
							:class="{
								'app-header__title--open': isOpen,
							}"
							class="app-header__title app-header__title--mobile"
						>
							{{ boardName }}
						</h1>
					</button>
					<h1 v-else class="app-header__title">{{ boardName }}</h1>
				</div>
				<div class="app-header__controls-right">
					<PrimaryButton class="app-header__add-task-button">
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
						:edit-fn="() => {}"
						:delete-fn="() => {}"
					/>
				</div>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import OptionDropdown from "~/components/OptionDropdown/OptionDropdown.vue";
import PrimaryButton from "~/components/PrimaryButton/PrimaryButton.vue";
import { Theme } from "~/constants/theme";
import { ThemeType } from "~/types/theme";

import darkLogoPath from "~/assets/icons/logo-dark.svg";
import lightLogoPath from "~/assets/icons/logo-light.svg";

interface Props {
	boardName: string;
}

defineProps<Props>();

const isOpen = ref<boolean>(false);
const isMobile = useMediaQuery("(max-width: 767px)");

// temp
const theme: ThemeType = Theme.Light;
const logoPath = theme === Theme.Light ? darkLogoPath : lightLogoPath;
</script>

<style scoped lang="scss">
@use "./AppHeader.scss";
</style>
