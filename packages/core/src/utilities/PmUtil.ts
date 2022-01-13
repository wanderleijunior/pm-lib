import { Http } from '@zeedhi/core';
import { LoadingService } from '@zeedhi/common';

export class PmUtil {
	public static isProduct(): boolean {
		return window.parent === window;
	}

	public static getNameDynamic(name: string) {
		const date = new Date();
		return name + date.getTime();
	}

	public static async validateNovocodigo() {
		await Http.post('/novocodigo/validate');
	}

	public static getOnlyNumberInString(string: string) {
		if (string) {
			return string.split(/\D+/).join('');
		}
		return '';
	}

	public static fill(value: any, length: any, toRight: any, filler: any) {
		if (value) {
			value = value.toString();

			if (filler) {
				filler = filler.toString()[0];
			} else {
				filler = '0';
			}

			if (toRight) {
				while (value.length + filler.length <= length) {
					value += filler;
				}
			} else {
				while (value.length + filler.length <= length) {
					value = filler + value;
				}
			}
		}
		return value;
	}

	public static clone(jsonObject: any) {
		return JSON.parse(JSON.stringify(jsonObject));
	}

	public static async timeout(time: number) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	public static async doAsync(callBack: Function, time: number) {
		return new Promise<void>((resolve) => {
			this.timeout(time).then(() => {
				callBack();
				resolve();
			});
		});
	}

	public static async setLoadingByTime(time: number) {
		LoadingService.show();
		await this.timeout(time);
		LoadingService.hide();
	}
}
