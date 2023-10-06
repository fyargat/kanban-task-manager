class Storage {
	set = <T>(key: string, data: T) =>
		typeof window !== "undefined"
			? localStorage.setItem(key, JSON.stringify(data))
			: null;

	get = <T>(key: string): T | null => {
		const data =
			typeof window !== "undefined" ? localStorage.getItem(key) : null;

		if (!data) {
			return null;
		}

		return JSON.parse(data);
	};

	clear = (key = "false") => {
		if (key) {
			typeof window !== "undefined" && localStorage.removeItem(key);
			return;
		}

		typeof window !== "undefined" && localStorage.clear();
	};
}

export const storage = new Storage();
