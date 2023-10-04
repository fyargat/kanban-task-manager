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
				<RemovableInputField
					v-model="item.name"
					:remove="() => remove(item.id)"
					:validation-status="item.validationStatus!"
					@update-input="updateInput(item.id, $event)"
				/>
			</li>
		</ul>

		<PrimaryButton
			v-if="!isHideButton"
			class="removable-input-list__button"
			@click="add"
		>
			{{ buttonText }}
		</PrimaryButton>
	</div>
</template>

<script setup lang="ts">
import PrimaryButton from "~/components/PrimaryButton/PrimaryButton.vue";
import RemovableInputField from "~/components/RemovableInputField/RemovableInputField.vue";
import {
	ColumnWithValidationStatus,
	SubtaskWithValidationStatus,
} from "~/types/validation";

interface Props<T> {
	title: string;
	buttonText: string;
	list: T[];
	isHideButton?: boolean;
	add: () => void;
	remove: (id: string) => void;
}

withDefaults(
	defineProps<
		Props<ColumnWithValidationStatus | SubtaskWithValidationStatus>
	>(),
	{
		isHideButton: false,
	},
);

const emit = defineEmits(["update-item"]);

const updateInput = (itemId: string, inputValue: string) => {
	emit("update-item", itemId, inputValue);
};
</script>

<style scoped lang="scss">
@use "./RemovableInputList.scss";
</style>
