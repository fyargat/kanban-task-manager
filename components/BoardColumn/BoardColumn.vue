<template>
	<div class="board-column__container">
		<div class="board-column__head">
			<div class="board-column__color"></div>
			<h3 class="board-column__title">
				{{ column.name }} ({{ column.tasks.length }})
			</h3>
		</div>
		<div
			class="board-column__body"
			:class="{
				'board-column__body--empty': !column.tasks.length,
			}"
		>
			<TaskCard v-for="task in column.tasks" :key="task.id" :task="task" />
		</div>
	</div>
</template>

<script setup lang="ts">
import TaskCard from "~/components/TaskCard/TaskCard.vue";
import { Column } from "~/types";

interface Props {
	column: Column;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
@use "./BoardColumn.scss";
</style>
