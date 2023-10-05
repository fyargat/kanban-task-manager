import { defineStore } from "pinia";
import { StorageKey } from "~/constants/storage";
import { StoreName } from "~/store/constants";
import { Board, BoardId } from "~/types";
import { storage } from "~/utils/storage";

const getBoardsFromStorage = () => {
	const boards = storage.get<Board[]>(StorageKey.Boards) ?? [];

	return boards;
};

const getSelectedBoardIdFromStorage = () => {
	const selectedBoardId =
		storage.get<BoardId | null>(StorageKey.SelectedBoardId) ?? null;

	return selectedBoardId;
};

export const useBoardStore = defineStore(StoreName.Board, () => {
	const boards = ref<Board[]>(getBoardsFromStorage());
	const selectedBoardId = ref<BoardId | null>(getSelectedBoardIdFromStorage());

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
		boards.value = boards.value.filter((v) => v.id !== selectedBoardId.value!);

		selectBoard(boards.value.length ? boards.value[0].id : null);
	};

	watch(
		boards,
		(newValue) => {
			storage.set(StorageKey.Boards, newValue);
		},
		{ deep: true },
	);

	watch(selectedBoardId, (newValue) => {
		storage.set(StorageKey.SelectedBoardId, newValue);
	});

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
