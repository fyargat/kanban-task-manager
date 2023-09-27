<template>
	<div class="removable-input-list__container">
		<h4 v-if="title" class="removable-input-list__title">
			{{ title }}
		</h4>

		<ul class="removable-input-list__list">
			<li
				v-for="item in list"
				:key="item.id"
				class="removable-input-list__item"
			>
				<RemovableInputField v-model="item.name" :on-remove="() => {}" />
			</li>
		</ul>

		<PrimaryButton v-if="!isHideButton" class="removable-input-list__button">
			{{ buttonText }}
		</PrimaryButton>
	</div>
</template>

<script setup lang="ts">
import PrimaryButton from "~/components/PrimaryButton/PrimaryButton.vue";
import RemovableInputField from "~/components/RemovableInputField/RemovableInputField.vue";
import { Column, Subtask } from "~/types";

interface Props {
	title: string;
	buttonText: string;
	list: Subtask[] | Column[];
	isHideButton?: boolean;
}

withDefaults(defineProps<Props>(), {
	isHideButton: false,
});
</script>

<style scoped lang="scss">
@use "./RemovableInputList.scss";
</style>
