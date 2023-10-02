<template>
	<div class="board-column__container">
		<div class="board-column__head">
			<div
				class="board-column__color"
				:style="{
					backgroundColor: column.color,
				}"
			></div>
			<h3 class="board-column__title">
				{{ column.name }} ({{ tasks.length }})
			</h3>
		</div>
		<draggable
			:list="tasks"
			item-key="task"
			tag="div"
			class="board-column__body"
			:class="{
				'board-column__body--empty': !tasks.length,
			}"
			group="column"
			@change="handleDraggableChange"
		>
			<template #item="{ element }">
				<TaskCard :key="element.id" :task="element" />
			</template>
		</draggable>
	</div>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
import TaskCard from "~/components/TaskCard/TaskCard.vue";
import { DraggableEvent } from "~/constants/order";
import { useTaskStore } from "~/store/useTaskStore";
import { Column, Task } from "~/types";
import { DraggableChangeEvent } from "~/types/order";

interface Props {
	column: Column;
}

const props = defineProps<Props>();

const taskStore = useTaskStore();
const { getTasksByColumnId, editTask, reorderColumnTasks } = taskStore;

const tasks = computed(() => getTasksByColumnId(props.column.id));

const handleDraggableChange = (e: DraggableChangeEvent<Task>) => {
	const addedEvent = e.added;
	const removedEvent = e.removed;
	const movedEvent = e.moved;

	if (addedEvent) {
		const task = addedEvent.element as Task;
		const newOrder = addedEvent.newIndex!;

		reorderColumnTasks(DraggableEvent.Added, props.column.id, null, newOrder);
		editTask(task.id, {
			...task,
			columnId: props.column.id,
			order: newOrder,
		});
	}

	if (removedEvent) {
		const oldOrder = removedEvent.oldIndex!;

		reorderColumnTasks(DraggableEvent.Removed, props.column.id, oldOrder, null);
	}

	if (movedEvent) {
		const oldOrder = movedEvent.oldIndex!;
		const newOrder = movedEvent.newIndex!;

		reorderColumnTasks(
			DraggableEvent.Moved,
			props.column.id,
			oldOrder,
			newOrder,
		);
	}
};
</script>

<style scoped lang="scss">
@use "./BoardColumn.scss";
</style>
