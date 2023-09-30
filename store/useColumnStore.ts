import { defineStore } from "pinia";
import { BoardId, Column } from "../types";

const mockColumns: Column[] = [
	{
		id: "0ac8b1ee-315c-4d1c-b223-f799dcdd3ba1",
		name: "Column 1",
		color: "#000000",
		boardId: "0ac8b1ee-315c-4d1c-b223-f799dcdd3bb6",
	},
	{
		id: "0ac8b1ee-315c-4d1c-b223-f799dcdd3ba2",
		name: "Column 2",
		color: "#000124",
		boardId: "0ac8b1ee-315c-4d1c-b223-f799dcdd3bb6",
	},
	{
		id: "0ac8b1ee-315c-4d1c-b223-f799dcdd3ba3",
		name: "Column 1",
		color: "#120000",
		boardId: "0ac8b1ee-315c-4d1c-b223-f799dcdd3bb7",
	},
];

export const useColumnStore = defineStore("columnStore", () => {
	const columns = ref<Column[]>(mockColumns ?? []);

	const getColumnsByBoardId = (boardId: BoardId | null) => {
		if (!boardId) return [];

		return columns.value.filter((v) => v.boardId === boardId);
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
		addColumns,
		editColumns,
		deleteColumns,
		getColumnsByBoardId,
	};
});
