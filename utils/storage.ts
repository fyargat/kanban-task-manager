class Storage {
	set = <T>(key: string, data: T) =>
		localStorage.setItem(key, JSON.stringify(data));

	get = <T>(key: string): T | null => {
		const data = localStorage.getItem(key);

		if (!data) {
			return null;
		}

		return JSON.parse(data);
	};

	clear = (key = "false") => {
		if (key) {
			localStorage.removeItem(key);
			return;
		}

		localStorage.clear();
	};
}

export const storage = new Storage();
