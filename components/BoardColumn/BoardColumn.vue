<template>
	<div class="board-column__container">
		<div class="board-column__head">
			<div class="board-column__color"></div>
			<h3 class="board-column__title">
				{{ column.name }} ({{ tasks.length }})
			</h3>
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
import { useTaskStore } from "~/store/useTaskStore";
import { Column } from "~/types";

interface Props {
	column: Column;
}

const props = defineProps<Props>();

const taskStore = useTaskStore();
const { getTasksByColumnId } = taskStore;

const tasks = computed(() => getTasksByColumnId(props.column.id));
</script>

<style scoped lang="scss">
@use "./BoardColumn.scss";
</style>
