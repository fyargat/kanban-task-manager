import { defineStore } from "pinia";
import { StorageKey } from "~/constants/storage";
import columnsData from "~/data/columns.json";
import { StoreName } from "~/store/constants";
import { BoardId, Column, ColumnId } from "~/types";

const getColumnsFromStorage = () => {
	const columns = storage.get<Column[]>(StorageKey.Columns) ?? columnsData;

	return columns;
};

export const useColumnStore = defineStore(StoreName.Column, () => {
	const columns = ref<Column[]>(getColumnsFromStorage());

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
		deleteColumns(boardId);

		addColumns(newColumns);
	};

	const deleteColumns = (boardId: BoardId) => {
		columns.value = columns.value.filter(
			(column) => column.boardId !== boardId,
		);
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
		deleteColumns,
		getColumnsByBoardId,
	};
});
