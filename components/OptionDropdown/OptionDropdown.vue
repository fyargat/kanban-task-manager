<template>
	<div class="option-dropdown__container">
		<button class="option-dropdown__control" @click="isVisible = !isVisible">
			<svg
				width="5"
				height="20"
				xmlns="http://www.w3.org/2000/svg"
				style="pointer-events: none"
			>
				<g fill="currentColor" fill-rule="evenodd">
					<circle cx="2.308" cy="2.308" r="2.308"></circle>
					<circle cx="2.308" cy="10" r="2.308"></circle>
					<circle cx="2.308" cy="17.692" r="2.308"></circle>
				</g>
			</svg>
		</button>
		<ul
			v-if="isVisible"
			v-click-outside="handleClickOutside"
			class="option-dropdown__list"
		>
			<li class="option-dropdown__item">
				<button @click="handleEdit">{{ editText ?? "Edit" }}</button>
			</li>
			<li class="option-dropdown__item option-dropdown__item--delete">
				<button @click="handleDelete">{{ deleteText ?? "Delete" }}</button>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
interface Props {
	editText?: string;
	deleteText?: string;
	onEdit: () => void;
	onDelete: () => void;
}

const { onDelete, onEdit } = defineProps<Props>();

const isVisible = ref<boolean>(false);

const handleClickOutside = () => {
	if (!isVisible) return;

	isVisible.value = false;
};

const handleEdit = () => {
	isVisible.value = false;
	onEdit();
};

const handleDelete = () => {
	isVisible.value = false;
	onDelete();
};
</script>

<style scoped lang="scss">
@use "./OptionDropdown.scss";
</style>
