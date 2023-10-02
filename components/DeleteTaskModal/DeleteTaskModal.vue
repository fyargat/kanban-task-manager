<template>
	<DeleteModal
		title="Delete this task?"
		:text="`Are you sure you want to delete the '${selectedTask?.name}' task?`"
		:on-close="onClose"
		:on-confirm="handleConfirmDeletion"
		:on-cancel="onClose"
	/>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import DeleteModal from "~/components/DeleteModal/DeleteModal.vue";
import { useModalStore } from "~/store/useModalStore";
import { useTaskStore } from "~/store/useTaskStore";

interface Props {
	onClose: () => void;
}

defineProps<Props>();

const modalStore = useModalStore();
const { closeModal } = modalStore;

const taskStore = useTaskStore();
const { selectedTask } = storeToRefs(taskStore);
const { deleteTask } = taskStore;

const handleConfirmDeletion = () => {
	deleteTask();
	closeModal();
};
</script>
