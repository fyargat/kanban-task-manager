<template>
	<BoardFormModal
		title="Add New Column"
		button-text="Save Changes"
		:is-board-name-disabled="true"
		:board="board"
		:columns="columns"
		:on-submit="submit"
		:add-column="addColumn"
		:update-column="updateColumn"
		:remove-column="removeColumn"
		:on-close="onClose"
	/>
</template>

<script setup lang="ts">
import BoardFormModal from "~/components/BoardFormModal/BoardFormModal.vue";
import { BoardModalEvent } from "~/constants/modal";

interface Props {
	onClose: () => void;
}

const props = defineProps<Props>();

const { board, columns, submit, addColumn, updateColumn, removeColumn } =
	useBoardModal({
		event: BoardModalEvent.ColumnAdd,
		onClose: props.onClose,
	});
</script>
