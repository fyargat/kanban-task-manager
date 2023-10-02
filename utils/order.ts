import { DraggableEvent } from "../constants/order";
import { DraggableEventType } from "../types/order";

interface Orders {
	oldOrder: number | null;
	newOrder: number | null;
}

const reorderByMovedEvent = <T extends { order: number }>(
	list: T[],
	{ oldOrder, newOrder }: Orders,
): T[] => {
	return list.map((item) => {
		if (item.order === oldOrder) {
			return {
				...item,
				order: newOrder,
			};
		}

		if (item.order > oldOrder! && item.order <= newOrder!) {
			return {
				...item,
				order: item.order - 1,
			};
		}

		if (item.order < oldOrder! && item.order >= newOrder!) {
			return {
				...item,
				order: item.order + 1,
			};
		}

		return item;
	});
};

const reorderByAddedEvent = <T extends { order: number }>(
	list: T[],
	{ newOrder }: Orders,
): T[] => {
	return list.map((item) => {
		if (item.order >= newOrder!) {
			return {
				...item,
				order: item.order + 1,
			};
		}

		return item;
	});
};

const reorderByRemovedEvent = <T extends { order: number }>(
	list: T[],
	{ oldOrder }: Orders,
): T[] => {
	return list.map((item) => {
		if (item.order > oldOrder!) {
			return {
				...item,
				order: item.order - 1,
			};
		}

		return item;
	});
};

export const getReorderFnByDraggableEvent = (event: DraggableEventType) => {
	const map = {
		[DraggableEvent.Added]: reorderByAddedEvent,
		[DraggableEvent.Removed]: reorderByRemovedEvent,
		[DraggableEvent.Moved]: reorderByMovedEvent,
	};

	return map[event];
};
