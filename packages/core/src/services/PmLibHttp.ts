import { Http } from '@zeedhi/core';
import { LoadingService } from '@zeedhi/common';
import { PmLibDialogService } from './PmLibDialogService';
import { AxiosRequestConfig } from 'axios';

export class PmLibHttp extends Http {
	public static async $get(url: string, config?: AxiosRequestConfig ): Promise<any> {
		try {
			LoadingService.show();
			const response = await this.get(url, config);
			LoadingService.hide();
			return response;
		} catch (e) {
			LoadingService.hide();
			PmLibDialogService.showErrorBackend(e);
			throw new Error('');
		}
	}

	public static async $post(url: string, data?: any, config?: any): Promise<any> {
		try {
			LoadingService.show();
			const response = await this.post(url, data, config);
			LoadingService.hide();
			return response;
		} catch (e) {
			LoadingService.hide();
			PmLibDialogService.showErrorBackend(e);
			throw new Error('');
		}
	}

	public static async $put(url: string, data?: any, config?: any): Promise<any> {
		try {
			LoadingService.show();
			const response =  await this.put(url, data, config);
			LoadingService.hide();
			return response;
		} catch (e) {
			LoadingService.hide();
			PmLibDialogService.showErrorBackend(e);
			throw new Error('');
		}
	}

	public static async $delete(url: string, config?: AxiosRequestConfig) : Promise<any> {
		try {
			LoadingService.show();
			const response = await this.delete(url, config);
			LoadingService.hide();
			return response;
		} catch (e) {
			LoadingService.hide();
			PmLibDialogService.showErrorBackend(e);
			throw new Error('');
		}
	}
}
