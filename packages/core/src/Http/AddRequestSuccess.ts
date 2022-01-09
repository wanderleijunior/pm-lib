import { AxiosRequestConfig } from 'axios';
import TekLibAuthService from '../Auth/TekLibAuthService';
import { Config } from '@zeedhi/core';

export class AddRequestSuccess {
	public static routesIgnoredInRequest = ['/lib_logout', '/login'];

	public static validateUserRoute = '/validateUser';

	public static validateExpiredSessionRoute = '/lib_validateExpiredSession';

	public static authRoutes = ['/lib_startSession', '/lib_buildMenu']

	public static addHeaders(config: AxiosRequestConfig) {
		const route: string = config.url || '';

		if (!AddRequestSuccess.routesIgnoredInRequest.includes(route)) {
			const token = localStorage.getItem('LOGIN_TOKEN');
			const hash = localStorage.getItem('LOGIN_HASH');
			const productId = localStorage.getItem('PRODUCT_ID');
			let keepConnected = localStorage.getItem('LOGIN_KEEP_CONNECTED');

			if (token
				&& (TekLibAuthService.getInstance().getCurrentPage() !== Config.env.loginRoutePath)
					|| this.authRoutes.includes(route)) {
				config.headers['OAuth-Token'] = token;
			}

			if (hash
				&& (TekLibAuthService.getInstance().getCurrentPage() !== Config.env.loginRoutePath)
					|| this.authRoutes.includes(route)) {
				config.headers['OAuth-Hash'] = hash;
				config.headers['OAuth-Project'] = productId;
			}

			if (route === AddRequestSuccess.validateUserRoute) {
				keepConnected = 'Yes';
			}

			config.headers['OAuth-KeepConnected'] = keepConnected;
		}
	}

	public static createSessionTime(config: AxiosRequestConfig) {
		if (
			config.url && !AddRequestSuccess.isValidateExpiredSessionRoute(config.url)
			&& TekLibAuthService.getInstance().getCurrentPage() !== Config.env.loginRoutePath
		) {
			if (AddRequestSuccess.isModule(config.baseURL, config.url)) {
				window.parent.postMessage({
					type: 'createSessionTime',
				}, <string>localStorage.getItem('PRODUCT_URL'));
			} else {
				TekLibAuthService.getInstance().factoryExpiredSessionMethod();
			}
		}
	}

	public static isModule(baseUrl = '', configUrl = '') {
		const urlSearchModules = '/modules/';

		if (process.env.NODE_ENV === 'production') {
			return window.location.href.includes(urlSearchModules);
		}

		if (AddRequestSuccess.isMetadataPage(configUrl)) {
			const { searchParams } = new URL(window.location.href);
			return !!searchParams.get('page');
		}

		return baseUrl.includes(urlSearchModules);

	}

	private static isMetadataPage(configUrl = '') {
		return configUrl.includes('/metadata/') && configUrl.includes('.json');
	}

	private static isValidateExpiredSessionRoute(configUrl = '') {
		return configUrl === AddRequestSuccess.validateExpiredSessionRoute;
	}
}
