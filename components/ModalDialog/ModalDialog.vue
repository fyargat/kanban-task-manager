<template>
	<div class="modal-dialog__overlay" @mousedown="onClose">
		<div class="modal-dialog__content" @mousedown.stop="">
			<button type="button" class="modal-dialog__close" @click="onClose">
				<svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
					<g fill="#828FA3" fill-rule="evenodd">
						<path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"></path>
						<path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"></path>
					</g>
				</svg>
			</button>
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
