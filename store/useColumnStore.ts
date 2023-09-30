import { defineStore } from "pinia";
import { Column } from "../types";

export const useColumnStore = defineStore("columnStore", () => {
	const columns = ref<Column[]>([]);
	const selectedColumn = ref<Column>();

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
		selectedColumn,
		createColumn,
		editColumn,
		deleteColumn,
	};
});
