<template>
	<div class="input-field__container">
		<label>
			<p v-if="label" class="input-field__label">{{ label }}</p>
			<input
				:disabled="disabled"
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
	modelValue: string;
	disabled?: boolean;
	label?: string;
}

const emit = defineEmits(["update:modelValue"]);

withDefaults(defineProps<Props>(), {
	disabled: false,
	label: "",
});

const updateInputValue = (event: Event) => {
	const { value } = event.target as HTMLInputElement;

	emit("update:modelValue", value);
};
</script>

<style scoped lang="scss">
@use "./InputField.scss";
</style>
