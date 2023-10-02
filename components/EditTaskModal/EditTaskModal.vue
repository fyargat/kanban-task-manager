<template>
	<TaskFormModal :on-close="onClose" />
</template>

<script setup lang="ts">
import TaskFormModal from "~/components/TaskFormModal/TaskFormModal.vue";

interface Props {
	onClose: () => void;
}

defineProps<Props>();
</script>
