<template>
	<div class="board-column__container">
		<div class="board-column__head">
			<div class="board-column__color"></div>
			<h3 class="board-column__title">{{ name }} ({{ tasks.length }})</h3>
		</div>
		<div
			class="board-column__body"
			:class="{
				'board-column__body--empty': !tasks.length,
			}"
		>
			<TaskCard v-for="task in tasks" :key="task.id" :task="task" />
		</div>
	</div>
</template>

<script setup lang="ts">
import TaskCard from "~/components/TaskCard/TaskCard.vue";
import { Task } from "~/types";

interface Props {
	name: string;
	tasks: Task[];
}

defineProps<Props>();
</script>

<style scoped lang="scss">
@use "./BoardColumn.scss";
</style>
