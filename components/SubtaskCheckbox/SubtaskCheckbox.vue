<template>
	<label
		class="subtask-checkbox__container"
		:class="{
			'subtask-checkbox__container--checked': subtask.checked,
		}"
	>
		<input
			class="subtask-checkbox__input"
			type="checkbox"
			:checked="subtask.checked"
			@change="onChange"
		/>

		{{ subtask.name }}
	</label>
</template>

<script setup lang="ts">
import { Subtask } from "~/types";

interface Props {
	subtask: Subtask;
}

const emit = defineEmits(["toggle-checked-subtask"]);

const { subtask } = defineProps<Props>();

const onChange = (event: Event) => {
	const { checked } = event.target as HTMLInputElement;

	emit("toggle-checked-subtask", subtask.id, {
		...subtask,
		checked,
	});
};
</script>

<style scoped lang="scss">
@use "./SubtaskCheckbox.scss";
</style>
