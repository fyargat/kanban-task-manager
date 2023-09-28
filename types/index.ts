export interface Subtask {
	id: string;
	name: string;
	checked: boolean;
}

export interface Task {
	id: string;
	name: string;
	description?: string;
	subtasks: Subtask[];
	status: string;
}

export interface Column {
	id: string;
	name: string;
	tasks: Task[];
}

export interface Board {
	id: string;
	name: string;
	columns: Column[];
}
