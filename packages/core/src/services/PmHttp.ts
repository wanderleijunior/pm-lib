import { Http } from '@zeedhi/core';
import { LoadingService } from '@zeedhi/common';
import { PmDialogService } from './PmDialogService';

export class PmHttp extends Http {
	public static async $get(url: string) {
		try {
			LoadingService.show();
			const response = await this.get(url);
			LoadingService.hide();
			return response;
		} catch (e) {
			LoadingService.hide();
			PmDialogService.showErrorBackend(e);
			throw new Error('');
		}
	}

	public static async $post(url: string, data?: any, config?: any) {
		try {
			LoadingService.show();
			await this.post(url, data, config);
			LoadingService.hide();
		} catch (e) {
			LoadingService.hide();
			PmDialogService.showErrorBackend(e);
			throw new Error('');
		}
	}

	public static async $put(url: string, data?: any, config?: any) {
		try {
			LoadingService.show();
			await this.put(url, data, config);
			LoadingService.hide();
			return true;
		} catch (e) {
			LoadingService.hide();
			PmDialogService.showErrorBackend(e);
			throw new Error('');
		}
	}

	public static async $delete(url: string, data?: any) {
		try {
			LoadingService.show();
			await this.delete(url, { data });
			LoadingService.hide();
		} catch (e) {
			LoadingService.hide();
			PmDialogService.showErrorBackend(e);
			throw new Error('');
		}
	}
}
