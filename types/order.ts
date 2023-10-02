import { DraggableEvent } from "~/constants/order";

export type DraggableEventType = `${DraggableEvent}`;

interface DraggableChangeEventValue<T> {
	element: T;
	oldIndex?: number;
	newIndex?: number;
}

export type DraggableChangeEvent<T> = {
	[key in DraggableEvent]: DraggableChangeEventValue<T>;
};
