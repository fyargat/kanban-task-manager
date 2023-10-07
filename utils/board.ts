import { v4 } from "uuid";
import { Board } from "~/types";

export const getInitBoardData = (): Board => ({
	id: v4(),
	name: "",
});
