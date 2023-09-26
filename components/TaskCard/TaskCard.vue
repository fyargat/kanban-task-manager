<template>
	<div class="task-card__container">
		<h4 class="task-card__title">{{ task.name }}</h4>
		<p class="task-card__subtask-count">
			{{ doneSubtaskCount }} of {{ task.subtasks.length }} subtasks
		</p>
	</div>
</template>

<script setup lang="ts">
import { Task } from "~/types";

interface Props {
	task: Task;
}

const { task } = defineProps<Props>();

const doneSubtaskCount = computed(
	() => task.subtasks.filter((v) => v.checked).length,
);
</script>

<style scoped lang="scss">
@use "./TaskCard.scss";
</style>
