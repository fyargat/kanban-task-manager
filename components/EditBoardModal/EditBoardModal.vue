<template>
	<BoardFormModal
		title="Edit Board"
		button-text="Save Changes"
		:board="board"
		:columns="columns"
		:on-submit="handleSubmit"
		:add-column="addColumn"
		:update-column="updateColumn"
		:remove-column="removeColumn"
		:on-close="onClose"
		@update-name="updateName"
	/>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import BoardFormModal from "~/components/BoardFormModal/BoardFormModal.vue";
import { Color, MAX_COLUMNS, MIN_COLUMNS } from "~/constants/column";
import { useBoardStore } from "~/store/useBoardStore";
import { useColumnStore } from "~/store/useColumnStore";
import { Board, Column, ColumnId } from "~/types";
import { getInitColumn } from "~/utils/column";

interface Props {
	onClose: () => void;
}

const props = defineProps<Props>();

const boardStore = useBoardStore();
const { selectedBoard, selectedBoardId } = storeToRefs(boardStore);
const { editBoard } = boardStore;

const columnStore = useColumnStore();
const { getColumnsByBoardId, editColumns } = columnStore;

const board = reactive<Board>({ ...selectedBoard.value! });
const columns = ref<Column[]>(getColumnsByBoardId(selectedBoardId.value));

const validate = () => {
	console.log("validate");
};

const handleSubmit = () => {
	validate();

	editBoard(selectedBoardId.value!, board);
	editColumns(selectedBoardId.value!, columns.value);
	props.onClose();
};

const updateName = (name: string) => {
	board.name = name;
};

const addColumn = () => {
	if (columns.value.length >= MAX_COLUMNS) return;

	const columnData = getInitColumn(board.id, Color.Aqua);
	columns.value.push(columnData);
};

const updateColumn = (itemId: string, name: string) => {
	columns.value = columns.value.map((column) => {
		if (column.id === itemId) {
			return {
				...column,
				name,
			};
		}

		return column;
	});
};

const removeColumn = (id: ColumnId) => {
	if (columns.value.length <= MIN_COLUMNS) return;

	columns.value = columns.value.filter((column) => column.id !== id);
};
</script>
