<template>
	<ModalDialog :on-close="() => {}">
		<div class="task-modal__container">
			<div class="task-modal__head">
				<h4 :title="task.name" class="task-modal__title">{{ task.name }}</h4>
				<OptionDropdown
					:edit-fn="() => {}"
					:delete-fn="() => {}"
					edit-text="Edit task"
					delete-text="Delete task"
				/>
			</div>
			<div class="task-modal__body">
				<p class="task-modal__description">
					{{ task.description ?? "No description" }}
				</p>
				<div class="task-modal__subtasks subtasks">
					<h5 class="subtasks__title task-modal__subtitle">
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
				<div class="task-modal__status">
					<h5 class="task-modal__status-title task-modal__subtitle"></h5>
					<SelectBox :columns="columns" :current-column="currentColumn" />
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
	task: Task;
	columns: Column[];
	currentColumn: Column;
}

const { task } = defineProps<Props>();

const doneSubtaskCount = computed(
	() => task.subtasks.filter((v) => v.checked).length,
);
</script>

<style scoped lang="scss">
@use "./TaskModal.scss";
</style>
