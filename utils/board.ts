import { v4 } from "uuid";
import { Board } from "~/types";

export const getBoardTemplate = (): Board => ({
	id: v4(),
	name: "",
});
