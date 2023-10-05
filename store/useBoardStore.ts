import { defineStore } from "pinia";
import { StorageKey } from "~/constants/storage";
import boardsData from "~/data/boards.json";
import { StoreName } from "~/store/constants";
import { useColumnStore } from "~/store/useColumnStore";
import { Board, BoardId } from "~/types";
import { storage } from "~/utils/storage";

const getBoardsFromStorage = () => {
	const boards = storage.get<Board[]>(StorageKey.Boards) ?? boardsData;

	return boards;
};

const getSelectedBoardIdFromStorage = (defaultId: BoardId) => {
	const selectedBoardId =
		storage.get<BoardId | null>(StorageKey.SelectedBoardId) ?? defaultId;

	return selectedBoardId;
};

export const useBoardStore = defineStore(StoreName.Board, () => {
	const boards = ref<Board[]>(getBoardsFromStorage());
	const selectedBoardId = ref<BoardId | null>(
		getSelectedBoardIdFromStorage(boards.value[0].id),
	);

	const columnStore = useColumnStore();
	const { deleteColumnsByBoardId } = columnStore;

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
		const boardId = selectedBoardId.value;
		deleteColumnsByBoardId(boardId!);
		boards.value = boards.value.filter((v) => v.id !== boardId);

		selectBoard(boards.value.length ? boards.value[0].id : null);
	};

	watch(
		boards,
		(newValue) => {
			if (!newValue.length) {
				storage.clear(StorageKey.Boards);
				storage.clear(StorageKey.Columns);
				storage.clear(StorageKey.Tasks);
				storage.clear(StorageKey.Subtasks);
				return;
			}

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
