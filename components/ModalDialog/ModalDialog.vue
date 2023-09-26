<template>
	<div class="modal-dialog__overlay" @mousedown="onClose">
		<div class="modal-dialog__content" @mousedown.stop="">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Props {
	onClose: () => void;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
@use "./ModalDialog.scss";
</style>
