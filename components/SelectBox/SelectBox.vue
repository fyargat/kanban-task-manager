<template>
	<div class="select-box__container">
		<button
			type="button"
			class="select-box__control control"
			:class="{
				'control--open': isOpen,
			}"
			@click="isOpen = !isOpen"
		>
			<p class="control__text">{{ currentColumn?.name! }}</p>

			<div class="control__icon">
				<svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
					<path
						stroke="#635FC7"
						stroke-width="2"
						fill="none"
						d="m1 1 4 4 4-4"
					></path>
				</svg>
			</div>
		</button>

		<ul
			v-if="isOpen"
			v-click-outside="handleClickOutside"
			class="select-box__list list"
			@click.stop=""
		>
			<li v-for="option in columns" :key="option.id" class="list__item">
				<button class="list__item-button" @click="selectOption(option.id)">
					{{ option.name }}
				</button>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { Column, ColumnId } from "~/types";

interface Props {
	columns: Column[];
	currentColumnId: ColumnId;
}

const emit = defineEmits(["update-current-column"]);

const props = defineProps<Props>();

const isOpen = ref<boolean>(false);

const currentColumn = computed(() => {
	return props.columns.find((column) => column.id === props.currentColumnId);
});

const selectOption = (optionId: ColumnId) => {
	emit("update-current-column", optionId);
	isOpen.value = false;
};

const handleClickOutside = () => {
	if (!isOpen) return;

	isOpen.value = false;
};
</script>

<style scoped lang="scss">
@use "./SelectBox.scss";
</style>
