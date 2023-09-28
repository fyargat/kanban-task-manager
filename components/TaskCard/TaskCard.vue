<template>
	<div class="task-card__container" @click="viewTask">
		<h4 class="task-card__title">{{ task.name }}</h4>
		<p class="task-card__subtask-count">
			{{ doneSubtaskCount }} of {{ task.subtasks.length }} subtasks
		</p>
	</div>
</template>

<script setup lang="ts">
import { Modal } from "~/constants/modal";
import { useModalStore } from "~/store/useModalStore";
import { Task } from "~/types";

interface Props {
	task: Task;
}

const { task } = defineProps<Props>();

const doneSubtaskCount = computed(
	() => task.subtasks.filter((v) => v.checked).length,
);

const modalStore = useModalStore();
const { setModal } = modalStore;

const viewTask = () => {
	setModal(Modal.TaskView);
};
</script>

<style scoped lang="scss">
@use "./TaskCard.scss";
</style>
