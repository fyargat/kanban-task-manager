<template>
	<div>
		<AddBoardModal v-if="modal === Modal.BoardAdd" :on-close="closeModal" />
		<EditBoardModal v-if="modal === Modal.BoardEdit" :on-close="closeModal" />
		<DeleteBoardModal
			v-if="modal === Modal.BoardDelete"
			:on-close="closeModal"
		/>
		<AddTaskModal v-if="modal === Modal.TaskAdd" :on-close="closeModal" />
		<EditTaskModal v-if="modal === Modal.TaskEdit" :on-close="closeModal" />
		<TaskViewModal v-if="modal === Modal.TaskView" :on-close="closeModal" />
		<DeleteTaskModal v-if="modal === Modal.TaskDelete" :on-close="closeModal" />
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import AddBoardModal from "~/components/AddBoardModal/AddBoardModal.vue";
import AddTaskModal from "~/components/AddTaskModal/AddTaskModal.vue";
import DeleteBoardModal from "~/components/DeleteBoardModal/DeleteBoardModal.vue";
import DeleteTaskModal from "~/components/DeleteTaskModal/DeleteTaskModal.vue";
import EditBoardModal from "~/components/EditBoardModal/EditBoardModal.vue";
import EditTaskModal from "~/components/EditTaskModal/EditTaskModal.vue";
import TaskViewModal from "~/components/TaskViewModal/TaskViewModal.vue";

import { Modal } from "~/constants/modal";
import { useModalStore } from "~/store/useModalStore";

const modalStore = useModalStore();
const { modal } = storeToRefs(modalStore);
const { closeModal } = modalStore;
</script>
