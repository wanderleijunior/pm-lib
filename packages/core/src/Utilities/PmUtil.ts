export class PmUtil {
	public static doAsync(callBack: any, time: number) {
		return setTimeout(() => {
			callBack();
		}, time);
	}

	public static isProduct(): boolean {
		return window.parent === window;
	}
}
