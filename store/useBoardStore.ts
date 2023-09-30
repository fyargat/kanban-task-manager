import { defineStore } from "pinia";
import { ref } from "../.nuxt/imports";
import { Board, BoardId } from "../types";

// temp
const tempBoards: Board[] = [
	{
		id: "1",
		name: "Board 1",
		columns: [
			{
				id: "1",
				name: "Column 1",
				tasks: [
					{
						id: "1",
						name: "Task 1",
						subtasks: [],
						status: "Column 1",
					},
					{
						id: "2",
						name: "Task 2",
						subtasks: [],
						status: "Column 2",
					},
				],
			},

			{
				id: "2",
				name: "Column 2",
				tasks: [],
			},

			{
				id: "3",
				name: "Column 3",
				tasks: [
					{
						id: "1",
						name: "Task 1",
						subtasks: [],
						status: "Column 1",
					},
				],
			},

			{
				id: "4",
				name: "Column 4",
				tasks: [
					{
						id: "1",
						name: "Task 1",
						subtasks: [],
						status: "Column 1",
					},
				],
			},

			{
				id: "5",
				name: "Column 5",
				tasks: [
					{
						id: "1",
						name: "Task 1",
						subtasks: [],
						status: "Column 1",
					},
				],
			},

			{
				id: "6",
				name: "Column 6",
				tasks: [
					{
						id: "1",
						name: "Task 1",
						subtasks: [],
						status: "Column 1",
					},
				],
			},
		],
	},
	{
		id: "2",
		name: "Board 2",
		columns: [],
	},
	{
		id: "3",
		name: "Board 3",
		columns: [],
	},
];

export const useBoardStore = defineStore("boardStore", () => {
	const boards = ref<Board[]>(tempBoards);
	const selectedBoardId = ref<Board>(tempBoards[0]);

	const selectBoard = (boardId: BoardId) => {
		selectedBoardId.value = boardId;
	};

	const createBoard = (board: Board) => {
		console.log("board", board);
		boards.value.push(board);
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
	};
});
