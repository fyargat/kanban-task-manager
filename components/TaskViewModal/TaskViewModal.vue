<template>
	<ModalDialog :on-close="onClose">
		<div class="task-view-modal__container">
			<div class="task-view-modal__head">
				<h4 :title="task.name" class="task-view-modal__title">
					{{ task.name }}
				</h4>
				<OptionDropdown
					:edit-fn="() => {}"
					:delete-fn="() => {}"
					edit-text="Edit task"
					delete-text="Delete task"
				/>
			</div>
			<div class="task-view-modal__body">
				<p class="task-view-modal__description">
					{{ task.description ?? "No description" }}
				</p>
				<div class="task-view-modal__subtasks subtasks">
					<h5 class="subtasks__title task-view-modal__subtitle">
						Subtasks ({{ doneSubtaskCount }} of {{ task.subtasks.length }})
					</h5>
					<ul class="subtasks__list">
						<li
							v-for="subtask in task.subtasks"
							:key="subtask.id"
							class="subtasks__item"
						>
							<SubtaskCheckbox :subtask="subtask" />
						</li>
					</ul>
				</div>
				<div class="task-view-modal__status">
					<h5
						class="task-view-modal__status-title task-view-modal__subtitle"
					></h5>
					<SelectBox :columns="columns" :current-column="columns[0]" />
				</div>
			</div>
		</div>
	</ModalDialog>
</template>

<script setup lang="ts">
import ModalDialog from "~/components/ModalDialog/ModalDialog.vue";
import OptionDropdown from "~/components/OptionDropdown/OptionDropdown.vue";
import SelectBox from "~/components/SelectBox/SelectBox.vue";
import SubtaskCheckbox from "~/components/SubtaskCheckbox/SubtaskCheckbox.vue";
import { Column, Task } from "~/types";

interface Props {
	onClose: () => void;
}

defineProps<Props>();

// temp
const task: Task = {
	id: "1",
	name: "Task 1",
	description: "Task Description",
	subtasks: [
		{ id: "1", name: "Subtask 1", checked: false },
		{ id: "2", name: "Subtask 2", checked: true },
	],
	status: "Doing",
};

const columns: Column[] = [
	{
		id: "1",
		name: "Column 1",
	},
	{
		id: "2",
		name: "Column 2",
	},
	{
		id: "3",
		name: "Column 3",
	},
];

const doneSubtaskCount = computed(
	() => task.subtasks.filter((v) => v.checked).length,
);
</script>

<style scoped lang="scss">
@use "./TaskViewModal.scss";
</style>
