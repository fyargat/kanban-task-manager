<template>
	<BoardFormModal
		title="Add New Board"
		button-text="Create New Board"
		:board-name-validation-status="boardNameValidationStatus"
		:board="board"
		:columns="columns"
		:on-submit="submit"
		:add-column="addColumn"
		:update-column="updateColumn"
		:remove-column="removeColumn"
		:on-close="onClose"
		@update-name="updateName"
	/>
</template>

<script setup lang="ts">
import BoardFormModal from "~/components/BoardFormModal/BoardFormModal.vue";
import { BoardModalEvent } from "~/constants/modal";

interface Props {
	onClose: () => void;
}

const props = defineProps<Props>();

const {
	board,
	columns,
	boardNameValidationStatus,
	submit,
	addColumn,
	updateName,
	updateColumn,
	removeColumn,
} = useBoardModal({
	event: BoardModalEvent.BoardAdd,
	onClose: props.onClose,
});
</script>
