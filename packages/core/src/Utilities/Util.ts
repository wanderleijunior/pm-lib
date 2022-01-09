import { TekLibLocalStorage } from '../Helpers/TekLibLocalStorage';

export class Util {
	public static doAsync(callBack: any, time: number) {
		return setTimeout(() => {
			callBack();
		}, time);
	}

	public static isNext(): boolean {
		return TekLibLocalStorage.getItem('IS_NEXT');
	}

	public static isProduct(): boolean {
		return window.parent === window;
	}
}
