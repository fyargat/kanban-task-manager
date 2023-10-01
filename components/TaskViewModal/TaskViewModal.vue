<template>
	<ModalDialog :on-close="onClose">
		<div class="task-view-modal__container">
			<div class="task-view-modal__head">
				<h4 :title="selectedTask?.name" class="task-view-modal__title">
					{{ selectedTask?.name }}
				</h4>
				<OptionDropdown
					:on-edit="editTask"
					:on-delete="deleteTask"
					edit-text="Edit task"
					delete-text="Delete task"
				/>
			</div>
			<div class="task-view-modal__body">
				<p class="task-view-modal__description">
					{{ selectedTask?.description ?? "No description" }}
				</p>
				<div class="task-view-modal__subtasks subtasks">
					<h5 class="subtasks__title task-view-modal__subtitle">
						Subtasks ({{ doneSubtaskCount }} of {{ subtasks.length }})
					</h5>
					<ul class="subtasks__list">
						<li
							v-for="subtask in subtasks"
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
					<SelectBox :columns="columns" :current-column="taskColumn!" />
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
import { Modal } from "~/constants/modal";
import { useBoardStore } from "~/store/useBoardStore";
import { useColumnStore } from "~/store/useColumnStore";
import { useModalStore } from "~/store/useModalStore";
import { useSubtaskStore } from "~/store/useSubtaskStore";
import { useTaskStore } from "~/store/useTaskStore";

interface Props {
	onClose: () => void;
}

defineProps<Props>();

const modalStore = useModalStore();
const { setModal } = modalStore;

const boardStore = useBoardStore();
const { selectedBoardId } = boardStore;

const columnStore = useColumnStore();
const { getColumnsByBoardId, getColumn } = columnStore;

const columns = computed(() => getColumnsByBoardId(selectedBoardId));

const taskStore = useTaskStore();
const { selectedTask, selectedTaskId } = taskStore;
const taskColumn = getColumn(selectedTask?.columnId);

const subtaskStore = useSubtaskStore();
const { getSubtasksByTaskId } = subtaskStore;

const subtasks = getSubtasksByTaskId(selectedTaskId!);

const doneSubtaskCount = computed(
	() => subtasks.filter((v) => v.checked).length,
);

const editTask = () => {
	setModal(Modal.TaskEdit);
};

const deleteTask = () => {
	setModal(Modal.TaskDelete);
};
</script>

<style scoped lang="scss">
@use "./TaskViewModal.scss";
</style>
