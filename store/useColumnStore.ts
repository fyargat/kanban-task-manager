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

	const createColumn = (newColumns: Column[]) => {
		console.log("newColumns", newColumns);
		columns.value.push(...newColumns);
	};

	const editColumn = () => {
		console.log("edit column");
	};

	const deleteColumn = () => {
		console.log("delete column");
	};

	return {
		columns,
		createColumn,
		editColumn,
		deleteColumn,
		getColumnsByBoardId,
	};
});
