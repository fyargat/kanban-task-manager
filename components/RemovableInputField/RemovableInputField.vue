<template>
	<div class="removable-input-field__container">
		<InputField
			:model-value="modelValue"
			:validation-status="validationStatus"
			@input="updateInput"
		/>

		<button
			v-if="!isHideButton"
			type="button"
			:disabled="isDisabled"
			class="removable-input-field__icon"
			@click="remove"
		>
			<img src="~/assets/icons/icon-cross.svg" alt="Cross Icon" />
		</button>
	</div>
</template>

<script setup lang="ts">
import InputField from "~/components/InputField/InputField.vue";
import { ValidationStatus } from "~/constants/validation";

interface Props {
	modelValue: string;
	remove: () => void;
	validationStatus: ValidationStatus;
	isDisabled?: boolean;
	isHideButton?: boolean;
}

withDefaults(defineProps<Props>(), {
	isDisabled: false,
	isHideButton: false,
});

const emit = defineEmits(["update-input"]);

const updateInput = (event: Event) => {
	const { value } = event.target as HTMLInputElement;

	emit("update-input", value);
};
</script>

<style scoped lang="scss">
@use "./RemovableInputField.scss";
</style>
