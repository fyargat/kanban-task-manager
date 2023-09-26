<template>
	<div class="input-field__container">
		<label>
			<p v-if="label" class="input-field__label">{{ label }}</p>
			<input
				class="input-field__input"
				type="text"
				:value="modelValue"
				@input="updateInputValue"
			/>
		</label>
	</div>
</template>

<script setup lang="ts">
interface Props {
	label?: string;
	modelValue: string;
}

const emit = defineEmits(["update:modeValue"]);

defineProps<Props>();

const updateInputValue = (event: Event) => {
	const { value } = event.target as HTMLInputElement;

	emit("update:modeValue", value);
};
</script>

<style scoped lang="scss">
@use "./InputField.scss";
</style>
