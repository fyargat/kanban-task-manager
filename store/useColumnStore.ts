import { defineStore } from "pinia";
import { Color } from "~/constants/column";
import { BoardId, Column, ColumnId } from "~/types";

const mockColumns: Column[] = [
	{
		id: "0ac8b1ee-315c-4d1c-b223-f799dcdd3ba1",
		name: "Column 1",
		color: Color.Aqua,
		boardId: "0ac8b1ee-315c-4d1c-b223-f799dcdd3bb6",
	},
	{
		id: "0ac8b1ee-315c-4d1c-b223-f799dcdd3ba2",
		name: "Column 2",
		color: Color.Purple,
		boardId: "0ac8b1ee-315c-4d1c-b223-f799dcdd3bb6",
	},
	{
		id: "0ac8b1ee-315c-4d1c-b223-f799dcdd3ba3",
		name: "Column 1",
		color: Color.Aqua,
		boardId: "0ac8b1ee-315c-4d1c-b223-f799dcdd3bb7",
	},
];

export const useColumnStore = defineStore("columnStore", () => {
	const columns = ref<Column[]>(mockColumns ?? []);

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

	return {
		columns,
		getColumn,
		addColumns,
		editColumns,
		deleteColumns,
		getColumnsByBoardId,
	};
});
