<template>
	<ModalDialog :on-close="onClose">
		<div class="board-form-modal__container">
			<h3 class="board-form-modal__title">
				{{ isEdit ? "Edit Board" : "Add New Board" }}
			</h3>

			<form @submit.prevent="handleSubmit">
				<div class="board-form-modal__box">
					<InputField v-model="boardData.name" label="Title" />
				</div>

				<div class="board-form-modal__box">
					<RemovableInputList
						title="Columns"
						button-text="+Add New Column"
						:list="columnsData"
						:add="addColumn"
						:remove="removeColumn"
						:is-hide-button="columnsData.length >= MAX_COLUMNS"
						@update-column="updateColumn"
					/>
				</div>

				<div>
					<PrimaryButton class="board-form-modal__button" type="submit">
						{{ isEdit ? "Save Changes" : "Create New Board" }}
					</PrimaryButton>
				</div>
			</form>
		</div>
	</ModalDialog>
</template>

<script setup lang="ts">
import InputField from "~/components/InputField/InputField.vue";
import ModalDialog from "~/components/ModalDialog/ModalDialog.vue";
import PrimaryButton from "~/components/PrimaryButton/PrimaryButton.vue";
import RemovableInputList from "~/components/RemovableInputList/RemovableInputList.vue";
import { Color, MAX_COLUMNS, MIN_COLUMNS } from "~/constants/column";
import { useBoardStore } from "~/store/useBoardStore";
import { useColumnStore } from "~/store/useColumnStore";
import { Board, Column, ColumnId } from "~/types";
import { getBoardTemplate } from "~/utils/board";
import { getInitColumn } from "~/utils/column";

interface Props {
	board?: Board;
	onClose: () => void;
}

const props = defineProps<Props>();

const boardStore = useBoardStore();
const { createBoard } = boardStore;

const columnStore = useColumnStore();
const { createColumn } = columnStore;

const boardData = reactive<Board>(getBoardTemplate());
const columnsData = ref<Column[]>([getInitColumn(boardData.id, Color.Aqua)]);

const isEdit = computed(() => !!props.board);

const validate = () => {
	console.log("validate");
};

const handleSubmit = () => {
	validate();

	createBoard(boardData);
	createColumn(columnsData.value);
	props.onClose();
};

const addColumn = () => {
	if (columnsData.value.length >= MAX_COLUMNS) return;

	const columnData = getInitColumn(boardData.id, Color.Aqua);
	columnsData.value.push(columnData);
};

const updateColumn = (itemId: string, name: string) => {
	columnsData.value = columnsData.value.map((column) => {
		if (column.id === itemId) {
			return {
				...column,
				name,
			};
		}

		return column;
	});
};

const removeColumn = (id: ColumnId) => {
	if (columnsData.value.length <= MIN_COLUMNS) return;

	columnsData.value = columnsData.value.filter((column) => column.id !== id);
};
</script>

<style scoped lang="scss">
@use "./BoardFormModal.scss";
</style>
