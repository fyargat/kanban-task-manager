<template>
	<DeleteModal
		title="Delete this board?"
		:text="`Are you sure you want to delete the '${selectedBoard?.name}' board? This action will remove all columns and tasks and cannot be reversed.`"
		:on-close="onClose"
		:on-confirm="handleConfirm"
		:on-cancel="onClose"
	/>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import DeleteModal from "~/components/DeleteModal/DeleteModal.vue";
import { useBoardStore } from "~/store/useBoardStore";
import { useModalStore } from "~/store/useModalStore";

interface Props {
	onClose: () => void;
}

defineProps<Props>();

const modalStore = useModalStore();
const { closeModal } = modalStore;

const boardStore = useBoardStore();
const { selectedBoard } = storeToRefs(boardStore);
const { deleteBoard } = boardStore;

const handleConfirm = () => {
	deleteBoard();
	closeModal();
};
</script>
