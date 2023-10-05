<template>
	<ModalDialog :on-close="handleModalClose">
		<div class="task-view-modal__container">
			<div class="task-view-modal__head">
				<h4 :title="selectedTask?.name" class="task-view-modal__title">
					{{ selectedTask?.name }}
				</h4>
				<OptionDropdown
					:on-edit="handleTaskEdit"
					:on-delete="handleTaskDelete"
					edit-text="Edit task"
					delete-text="Delete task"
				/>
			</div>
			<div class="task-view-modal__body">
				<p class="task-view-modal__description">
					{{ selectedTask?.description || "No description" }}
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
							<SubtaskCheckbox
								:subtask="subtask"
								@toggle-checked-subtask="toggleCheckedSubtask"
							/>
						</li>
					</ul>
				</div>
				<div class="task-view-modal__status">
					<h5
						class="task-view-modal__status-title task-view-modal__subtitle"
					></h5>
					<SelectBox
						:columns="columns"
						:current-column-id="selectedTask?.columnId!"
						@update-current-column="updateTaskColumn"
					/>
				</div>
			</div>
		</div>
	</ModalDialog>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
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
import { ColumnId, Subtask, SubtaskId, Task } from "~/types";

interface Props {
	onClose: () => void;
}

const props = defineProps<Props>();

const modalStore = useModalStore();
const { setModal } = modalStore;

const boardStore = useBoardStore();
const { selectedBoardId } = storeToRefs(boardStore);

const columnStore = useColumnStore();
const { getColumnsByBoardId } = columnStore;

const columns = computed(() => getColumnsByBoardId(selectedBoardId.value));

const taskStore = useTaskStore();
const { selectedTaskId, selectedTask } = storeToRefs(taskStore);
const { editTask, selectTask, getTasksByColumnId } = taskStore;

const subtaskStore = useSubtaskStore();
const { getSubtasksByTaskId, editSubtask } = subtaskStore;

const subtasks = computed(() => getSubtasksByTaskId(selectedTaskId.value!));

const doneSubtaskCount = computed(
	() => subtasks.value.filter((v) => v.checked).length,
);

const handleTaskEdit = () => {
	setModal(Modal.TaskEdit);
};

const handleTaskDelete = () => {
	setModal(Modal.TaskDelete);
};

const handleModalClose = () => {
	selectTask(null);
	props.onClose();
};

const updateTaskColumn = (columnId: ColumnId) => {
	const columnTasksCount = getTasksByColumnId(columnId).length;

	editTask(selectedTaskId.value!, {
		...selectedTask.value,
		columnId,
		order: columnTasksCount,
	} as Task);
};

const toggleCheckedSubtask = (
	subtaskId: SubtaskId,
	updatedSubtask: Subtask,
) => {
	editSubtask(subtaskId, updatedSubtask);
};
</script>

<style scoped lang="scss">
@use "./TaskViewModal.scss";
</style>
