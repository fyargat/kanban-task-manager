import { storeToRefs } from "pinia";
import {
	COLUMN_COLORS,
	Color,
	MAX_COLUMNS,
	MIN_COLUMNS,
} from "~/constants/column";
import { BoardModalEvent } from "~/constants/modal";
import { ValidationStatus } from "~/constants/validation";
import { useBoardStore } from "~/store/useBoardStore";
import { useColumnStore } from "~/store/useColumnStore";
import { Board, Column, ColumnId } from "~/types";
import { ColumnWithValidationStatus } from "~/types/validation";
import { getBoardTemplate } from "~/utils/board";
import { getInitColumn } from "~/utils/column";
import { isValidationInvalid } from "~/utils/validation";

interface Props {
	event: BoardModalEvent;
	onClose: () => void;
}

export const useBoardModal = ({ event, onClose }: Props) => {
	const boardStore = useBoardStore();
	const { selectedBoard, selectedBoardId } = storeToRefs(boardStore);
	const { createBoard, editBoard } = boardStore;

	const columnStore = useColumnStore();
	const { addColumns, editColumns, getColumnsByBoardId } = columnStore;

	const board =
		event === BoardModalEvent.BoardAdd
			? getBoardTemplate()
			: ({ ...selectedBoard.value } as Board);

	const boardData = reactive<Board>(board);

	const columns =
		event === BoardModalEvent.BoardAdd
			? [getInitColumn(boardData.id, Color.Aqua)]
			: [
					...getColumnsByBoardId(selectedBoardId.value).map((v) => ({
						...v,
						validationStatus: ValidationStatus.Idle,
					})),
			  ];

	const columnsData = ref<ColumnWithValidationStatus[]>(columns);
	const boardNameValidationStatus = ref<ValidationStatus>(
		ValidationStatus.Idle,
	);

	const validate = () => {
		boardNameValidationStatus.value = isEmpty(boardData.name)
			? ValidationStatus.Invalid
			: ValidationStatus.Idle;

		columnsData.value = columnsData.value.map((v, index) => {
			const result = { ...v } as ColumnWithValidationStatus;

			if (isEmpty(v.name)) {
				result.validationStatus = ValidationStatus.Invalid;

				return result;
			}

			const columnsName = columnsData.value
				.slice(0, index)
				.map((v) => v.name.toLowerCase());

			if (columnsName.includes(v.name.toLowerCase())) {
				result.validationStatus = ValidationStatus.Used;

				return result;
			}

			return result;
		});
	};

	const isInvalid = () => {
		const validationStatuses = [
			boardNameValidationStatus.value,
			...columnsData.value.map((v) => v.validationStatus),
		];

		return isValidationInvalid(validationStatuses);
	};

	const submit = () => {
		validate();

		if (isInvalid()) return;

		const columnsWithName = columnsData.value
			.filter((v) => !isEmpty(v.name))
			.map(({ validationStatus: _, ...v }) => ({
				...v,
			})) as Column[];

		if (event === BoardModalEvent.BoardAdd) {
			createBoard(boardData);
			addColumns(columnsWithName);
		}

		if (event === BoardModalEvent.BoardEdit) {
			editBoard(selectedBoardId.value!, boardData);
			editColumns(selectedBoardId.value!, columnsWithName);
		}

		if (event === BoardModalEvent.ColumnAdd) {
			editColumns(selectedBoardId.value!, columnsWithName);
		}

		onClose();
	};

	const updateName = (name: string) => {
		if (boardNameValidationStatus.value === ValidationStatus.Invalid) {
			boardNameValidationStatus.value = ValidationStatus.Idle;
		}

		boardData.name = name;
	};

	const addColumn = () => {
		const columnsLength = columnsData.value.length;

		if (columnsLength >= MAX_COLUMNS) return;

		const color = COLUMN_COLORS[columnsLength];

		const columnData = getInitColumn(boardData.id, color);
		columnsData.value.push(columnData);
	};

	const updateColumn = (itemId: string, name: string) => {
		columnsData.value = columnsData.value.map((column) => {
			if (column.id === itemId) {
				return {
					...column,
					name,
					validationStatus: ValidationStatus.Idle,
				};
			}

			return column;
		});
	};

	const removeColumn = (id: ColumnId) => {
		if (columnsData.value.length <= MIN_COLUMNS) return;

		columnsData.value = columnsData.value.filter((column) => column.id !== id);
	};

	return {
		board: boardData,
		columns: columnsData,
		boardNameValidationStatus,
		submit,
		addColumn,
		updateName,
		updateColumn,
		removeColumn,
	};
};
