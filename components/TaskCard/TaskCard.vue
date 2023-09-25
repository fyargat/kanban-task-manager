<template>
	<div class="task-card__container">
		<h3 class="task-card__title">{{ title }}</h3>
		<p class="task-card__subtask-count">
			{{ doneSubtaskCount }} of {{ subtaskCount }} subtasks
		</p>
	</div>
</template>

<script setup lang="ts">
interface Props {
	title: string;
	doneSubtaskCount: number;
	subtaskCount: number;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
@use "./TaskCard.scss";
</style>
