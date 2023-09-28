<template>
	<div class="app-board__container">
		<ul class="app-board__list">
			<li
				v-for="column in board.columns"
				:key="column.id"
				class="app-board__item"
			>
				<BoardColumn :column="column" />
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import BoardColumn from "~/components/BoardColumn/BoardColumn.vue";
import { Board } from "~/types";

interface Props {
	board: Board;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
@use "./AppBoard.scss";
</style>
