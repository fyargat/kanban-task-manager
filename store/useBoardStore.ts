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

	const selectedBoard = computed(() => getBoard(selectedBoardId.value));

	const selectBoard = (boardId: BoardId | null) => {
		selectedBoardId.value = boardId;
	};

	const getBoard = (boardId: BoardId | null): Board | null => {
		if (!boardId) return null;

		const board = boards.value.find((v) => v.id === boardId) ?? null;

		return board;
	};

	const createBoard = (board: Board) => {
		boards.value.push(board);
		selectedBoardId.value = board.id;
	};

	const editBoard = (boardId: BoardId, updatedBoard: Board) => {
		boards.value = boards.value.map((board) => {
			if (board.id === boardId) {
				return {
					...board,
					...updatedBoard,
				};
			}

			return board;
		});
	};

	const deleteBoard = () => {
		boards.value = boards.value.filter((v) => v.id !== selectedBoardId.value);

		selectBoard(boards.value[0].id ?? null);
	};

	return {
		boards,
		selectedBoardId,
		selectedBoard,
		createBoard,
		editBoard,
		deleteBoard,
		selectBoard,
		getBoard,
	};
});
