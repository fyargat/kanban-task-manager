<template>
	<BoardFormModal
		title="Add New Board"
		button-text="Create New Board"
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
import BoardFormModal from "~/components/BoardFormModal/BoardFormModal.vue";
import {
	COLUMN_COLORS,
	Color,
	MAX_COLUMNS,
	MIN_COLUMNS,
} from "~/constants/column";
import { useBoardStore } from "~/store/useBoardStore";
import { useColumnStore } from "~/store/useColumnStore";
import { Board, Column, ColumnId } from "~/types";
import { getBoardTemplate } from "~/utils/board";
import { getInitColumn } from "~/utils/column";

interface Props {
	onClose: () => void;
}

const props = defineProps<Props>();

const boardStore = useBoardStore();
const { createBoard } = boardStore;

const columnStore = useColumnStore();
const { addColumns } = columnStore;

const board = reactive<Board>(getBoardTemplate());
const columns = ref<Column[]>([getInitColumn(board.id, Color.Aqua)]);

const validate = () => {
	console.log("validate");
};

const handleSubmit = () => {
	validate();

	createBoard(board);
	addColumns(columns.value);
	props.onClose();
};

const updateName = (name: string) => (board.name = name);

const addColumn = () => {
	const columnsLength = columns.value.length;

	if (columnsLength >= MAX_COLUMNS) return;

	const color = COLUMN_COLORS[columnsLength];

	const columnData = getInitColumn(board.id, color);
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
