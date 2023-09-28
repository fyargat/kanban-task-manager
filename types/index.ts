type SubtaskId = string;
type TaskId = string;
type ColumnId = string;
type BoardId = string;

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
	subtasks: Subtask[];
	status: string;
	columnId: ColumnId;
	order: number;
}

export interface Column {
	id: ColumnId;
	name: string;
	tasks: Task[];
	color: string;
	boardId: BoardId;
}

export interface Board {
	id: BoardId;
	name: string;
	columns: Column[];
}
