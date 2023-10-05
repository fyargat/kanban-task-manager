import { defineStore } from "pinia";
import { StorageKey } from "~/constants/storage";
import { StoreName } from "~/store/constants";
import { ModalType } from "~/types/modal";
import { storage } from "~/utils/storage";

const getModal = () => {
	const modal = storage.get<ModalType | null>(StorageKey.Modal) ?? null;

	return modal;
};

export const useModalStore = defineStore(StoreName.Modal, () => {
	const modal = ref<ModalType | null>(getModal());

	const setModal = (modalValue: ModalType) => {
		modal.value = modalValue;
	};

	const closeModal = () => {
		modal.value = null;
	};

	watch(modal, (newValue) => {
		storage.set(StorageKey.Modal, newValue);
	});

	return {
		closeModal,
		setModal,
		modal,
	};
});
