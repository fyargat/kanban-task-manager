import { Column, Subtask } from "~/types";

export const isEmpty = (value: string): boolean => !value.trim();

export const isEveryEmpty = <T extends Column | Subtask>(items: T[]) =>
	items.every((v) => isEmpty(v.name));
