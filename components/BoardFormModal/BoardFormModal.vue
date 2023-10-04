<template>
	<ModalDialog :on-close="onClose">
		<div class="board-form-modal__container">
			<h3 class="board-form-modal__title">
				{{ title }}
			</h3>

			<form @submit.prevent="onSubmit">
				<div class="board-form-modal__box">
					<InputField
						label="Title"
						:model-value="board.name"
						:validation-status="boardNameValidationStatus"
						:disabled="isBoardNameDisabled"
						@input="updateName"
					/>
				</div>

				<div class="board-form-modal__box">
					<RemovableInputList
						title="Columns"
						button-text="+Add New Column"
						:list="columns"
						:columns-validation-status="columnsValidationStatus"
						:add="addColumn"
						:remove="removeColumn"
						:is-hide-button="columns.length >= MAX_COLUMNS"
						@update-item="updateColumn"
					/>
				</div>

				<div>
					<PrimaryButton class="board-form-modal__button" type="submit">
						{{ buttonText }}
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
import { MAX_COLUMNS } from "~/constants/column";
import { ValidationStatus } from "~/constants/validation";
import { Board, Column, ColumnId } from "~/types";

interface Props {
	title: string;
	buttonText: string;
	board: Board;
	columns: Column[];
	boardNameValidationStatus?: ValidationStatus;
	columnsValidationStatus: ValidationStatus;
	onClose: () => void;
	onSubmit: () => void;
	addColumn: () => void;
	updateColumn: (itemId: string, name: string) => void;
	removeColumn: (id: ColumnId) => void;
	isBoardNameDisabled?: boolean;
}

const { board } = defineProps<Props>();

const emit = defineEmits(["update-name"]);

const updateName = (event: Event) => {
	const { value } = event.target as HTMLInputElement;

	emit("update-name", value);
};
</script>

<style scoped lang="scss">
@use "./BoardFormModal.scss";
</style>
