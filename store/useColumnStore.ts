import { defineStore } from "pinia";
import { StorageKey } from "~/constants/storage";
import columnsData from "~/data/columns.json";
import { StoreName } from "~/store/constants";
import { useTaskStore } from "~/store/useTaskStore";
import { BoardId, Column, ColumnId } from "~/types";

const getColumnsFromStorage = () => {
	const columns = storage.get<Column[]>(StorageKey.Columns) ?? columnsData;

	return columns;
};

export const useColumnStore = defineStore(StoreName.Column, () => {
	const columns = ref<Column[]>(getColumnsFromStorage());

	const taskStore = useTaskStore();
	const { deleteTasksByColumnId } = taskStore;

	const getColumnsByBoardId = (boardId: BoardId | null) => {
		if (!boardId) return [];

		return columns.value.filter((v) => v.boardId === boardId);
	};

	const getColumn = (columnId?: ColumnId | null) => {
		if (!columnId) return null;

		const board = columns.value.find((v) => v.id === columnId) ?? null;

		return board;
	};

	const addColumns = (newColumns: Column[]) => {
		columns.value.push(...newColumns);
	};

	const editColumns = (boardId: BoardId, newColumns: Column[]) => {
		deleteColumnsByBoardId(boardId);

		addColumns(newColumns);
	};

	const deleteColumnsByBoardId = (boardId: BoardId) => {
		const result = [] as Column[];

		for (const column of columns.value) {
			if (column.boardId !== boardId) {
				result.push(column);
			} else {
				deleteTasksByColumnId(column.id);
			}
		}

		columns.value = result;
	};

	watch(
		columns,
		(newValue) => {
			storage.set(StorageKey.Columns, newValue);
		},
		{ deep: true },
	);

	return {
		columns,
		getColumn,
		addColumns,
		editColumns,
		deleteColumnsByBoardId,
		getColumnsByBoardId,
	};
});
