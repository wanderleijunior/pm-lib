export class TekLibLocalStorage {
	public static setItem(name: string, value: any) {
		localStorage.setItem(name, JSON.stringify(value));
	}

	public static getItem(name: string) {
		return JSON.parse(<string>localStorage.getItem(name));
	}

	public static removeItem(name: string) {
		localStorage.removeItem(name);
	}

	public static clearAll() {
		localStorage.clear();
	}
}
