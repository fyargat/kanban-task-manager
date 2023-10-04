<template>
	<BoardFormModal
		title="Add New Column"
		button-text="Save Changes"
		:is-board-name-disabled="true"
		:columns-validation-status="columnsValidationStatus"
		:board="board"
		:columns="columns"
		:on-submit="handleSubmit"
		:add-column="addColumn"
		:update-column="updateColumn"
		:remove-column="removeColumn"
		:on-close="onClose"
	/>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import BoardFormModal from "~/components/BoardFormModal/BoardFormModal.vue";
import { COLUMN_COLORS, MAX_COLUMNS, MIN_COLUMNS } from "~/constants/column";
import { ValidationStatus } from "~/constants/validation";
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

const columnStore = useColumnStore();
const { getColumnsByBoardId, editColumns } = columnStore;

const board = reactive<Board>({ ...selectedBoard.value! });
const columns = ref<Column[]>(getColumnsByBoardId(selectedBoardId.value));
const columnsValidationStatus = ref<ValidationStatus>(ValidationStatus.Idle);

const isValid = () => {
	if (isEveryEmpty(columns.value)) {
		columnsValidationStatus.value = ValidationStatus.Invalid;
	}

	if (columnsValidationStatus.value === ValidationStatus.Invalid) {
		return false;
	}

	return true;
};

const handleSubmit = () => {
	if (!isValid()) return;

	const columnsWithName = columns.value.filter((v) => !isEmpty(v.name));

	editColumns(selectedBoardId.value!, columnsWithName);
	props.onClose();
};

const addColumn = () => {
	const columnsLength = columns.value.length;

	if (columnsLength >= MAX_COLUMNS) return;

	const color = COLUMN_COLORS[columnsLength];

	const columnData = getInitColumn(board.id, color);
	columns.value.push(columnData);
};

const updateColumn = (itemId: string, name: string) => {
	if (columnsValidationStatus.value === ValidationStatus.Invalid) {
		columnsValidationStatus.value = ValidationStatus.Idle;
	}

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
