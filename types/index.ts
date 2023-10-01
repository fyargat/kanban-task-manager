export type SubtaskId = string;
export type TaskId = string;
export type ColumnId = string;
export type BoardId = string;

export interface Subtask {
	id: SubtaskId;
	name: string;
	checked: boolean;
	taskId: TaskId;
}

export interface Task {
	id: TaskId;
	name: string;
	description?: string;
	columnId: ColumnId;
	order: number;
}

export interface Column {
	id: ColumnId;
	name: string;
	color: string;
	boardId: BoardId;
}

export interface Board {
	id: BoardId;
	name: string;
}
