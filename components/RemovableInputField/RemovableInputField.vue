<template>
	<div class="removable-input-field__container">
		<InputField :model-value="modelValue" />

		<button
			v-if="!isHideButton"
			type="button"
			:disabled="isDisabled"
			class="removable-input-field__icon"
			@click="onRemove"
		>
			<img src="~/assets/icons/icon-cross.svg" alt="Cross Icon" />
		</button>
	</div>
</template>

<script setup lang="ts">
import InputField from "~/components/InputField/InputField.vue";

interface Props {
	modelValue: string;
	onRemove: () => void;
	isDisabled?: boolean;
	isHideButton?: boolean;
}

withDefaults(defineProps<Props>(), {
	isDisabled: false,
	isHideButton: false,
});
</script>

<style scoped lang="scss">
@use "./RemovableInputField.scss";
</style>
