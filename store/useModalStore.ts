import { defineStore } from "pinia";
import { ModalType } from "~/types/modal";

export const useModalStore = defineStore("modalStore", () => {
	const modal = ref<ModalType | null>(null);

	const setModal = (modalValue: ModalType) => {
		modal.value = modalValue;
	};

	const closeModal = () => {
		console.log("close");
		modal.value = null;
	};

	return {
		closeModal,
		setModal,
		modal,
	};
});
