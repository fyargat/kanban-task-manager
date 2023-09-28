<template>
	<div>
		<BoardFormModal v-if="modal === Modal.BoardForm" :on-close="closeModal" />
		<DeleteModal v-if="modal === Modal.Delete" :on-close="closeModal" />
		<TaskFormModal v-if="modal === Modal.TaskForm" :on-close="closeModal" />
		<TaskViewModal v-if="modal === Modal.TaskView" :on-close="closeModal" />
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import BoardFormModal from "~/components/BoardFormModal/BoardFormModal.vue";
import DeleteModal from "~/components/DeleteModal/DeleteModal.vue";
import TaskFormModal from "~/components/TaskFormModal/TaskFormModal.vue";
import TaskViewModal from "~/components/TaskViewModal/TaskViewModal.vue";

import { Modal } from "~/constants/modal";
import { useModalStore } from "~/store/useModalStore";

const modalStore = useModalStore();
const { modal } = storeToRefs(modalStore);
const { closeModal } = modalStore;
</script>
