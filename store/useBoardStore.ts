import { defineStore } from "pinia";
import { ref } from "../.nuxt/imports";
import { Board, BoardId } from "../types";

const mockBoards: Board[] = [
	{
		id: "0ac8b1ee-315c-4d1c-b223-f799dcdd3bb6",
		name: "Board 1",
	},
	{
		id: "0ac8b1ee-315c-4d1c-b223-f799dcdd3bb7",
		name: "Board 2",
	},
];

export const useBoardStore = defineStore("boardStore", () => {
	const boards = ref<Board[]>(mockBoards ?? []);
	const selectedBoardId = ref<BoardId | null>(mockBoards[0].id ?? null);

	const selectBoard = (boardId: BoardId) => {
		console.log("boardId", boardId);
		selectedBoardId.value = boardId;
	};

	const getBoard = (boardId: BoardId | null) => {
		if (!boardId) return null;

		const board = boards.value.find((v) => v.id === boardId) ?? null;

		return board;
	};

	const createBoard = (board: Board) => {
		console.log("board", board);
		boards.value.push(board);
		selectedBoardId.value = board.id;
	};

	const editBoard = () => {
		console.log("edit board");
	};

	const deleteBoard = () => {
		console.log("delete board");
	};

	return {
		boards,
		selectedBoardId,
		createBoard,
		editBoard,
		deleteBoard,
		selectBoard,
		getBoard,
	};
});
