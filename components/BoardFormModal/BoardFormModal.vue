<template>
	<ModalDialog :on-close="() => {}">
		<div class="board-form-modal__container">
			<h3 class="board-form-modal__title">
				{{ isEdit ? "Edit Board" : "Add New Board" }}
			</h3>

			<form @submit.prevent="handleSubmit">
				<div class="board-form-modal__box">
					<InputField v-model="board.name" label="Title" />
				</div>

				<div class="board-form-modal__box">
					<RemovableInputList
						title="Columns"
						button-text="+Add New Column"
						:list="board.columns"
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
import { Board } from "~/types";
import { getBoardTemplate } from "~/utils/board";

interface Props {
	board?: Board;
}

const props = defineProps<Props>();

const board = reactive<Board>(props.board ?? getBoardTemplate());

const isEdit = computed(() => !!props.board);

const handleSubmit = () => {};
</script>

<style scoped lang="scss">
@use "./BoardFormModal.scss";
</style>
