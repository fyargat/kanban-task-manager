<template>
	<DeleteModal
		title="Delete this task?"
		:text="`Are you sure you want to delete the '${selectedBoard?.name}' board?`"
		:on-close="onClose"
		:on-confirm="handleConfirm"
		:on-cancel="onClose"
	/>
</template>

<script setup lang="ts">
import DeleteModal from "~/components/DeleteModal/DeleteModal.vue";
import { useModalStore } from "~/store/useModalStore";

interface Props {
	onClose: () => void;
}

defineProps<Props>();

const modalStore = useModalStore();
const { closeModal } = modalStore;

// temp
const selectedBoard = {
	name: "Task 1",
};

const handleConfirm = () => {
	closeModal();
};
</script>
