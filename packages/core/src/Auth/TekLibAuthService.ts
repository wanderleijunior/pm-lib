import { Config, I18n, Metadata, Router, } from '@zeedhi/core';
import { DialogService, Form, LoadingService, Modal, ModalService, } from '@zeedhi/common';
import TekLibAuthApi from './TekLibAuthApi';
import { Util } from '../Utilities/Util';
import { TekLibMessageServices } from '../Helpers/TekLibMessageServices';
import { TekLibLocalStorage } from '../Helpers/TekLibLocalStorage';

export default class TekLibAuthService {
	private static instance: TekLibAuthService;

	public expiredSessionMethod: any = null;
	private expiredSessionModal!: Modal;
	private attemptsPassword: number = 0;

	public static getInstance(): TekLibAuthService {
		if (!TekLibAuthService.instance) {
			TekLibAuthService.instance = new TekLibAuthService();
		}
		return TekLibAuthService.instance;
	}

	public async startSession(userData: any) {
		try {
			this.setLocalStorageAfterLogin(userData);
			const { data } = await TekLibAuthApi.startSession(userData);
			this.setLoginOperatorprops(data);
			userData.loginUser = data.LOGIN_USER;
			userData.CDOPERADOR = data.USER_ID;
			this.setLocalStorageAfterLogin(userData);
			this.setUserInfoLocalStorage(userData);
			await this.buildMenu(data.VISIBLE_ELEMENTS, data.EXPIRED_ELEMENTS);
			this.redirectProduct();
		} catch (error) {
			TekLibMessageServices.defaultError(error.response);
		}
	}

	public setLocalStorageAfterLogin(userData: any) {
		localStorage.setItem('LOGIN_TOKEN', userData.loginToken);
		localStorage.setItem('LOGIN_USER', userData.loginUser);
		localStorage.setItem('LOGIN_USER_NAME', userData.loginUserName);
		localStorage.setItem('LOGIN_HASH', userData.loginHash);
		localStorage.setItem('LOGIN_LANGUAGE', userData.loginLanguage);
		localStorage.setItem('LOGIN_KEEP_CONNECTED', userData.loginKeepConnected);
	}

	public setUserInfoLocalStorage(userData: any) {
		localStorage.setItem('CDOPERADOR', userData.CDOPERADOR);
	}

	public setLocalStorageInLogout() {
		localStorage.removeItem('LOGIN_TOKEN');
		localStorage.removeItem('LOGIN_USER');
		localStorage.removeItem('LOGIN_USER_NAME');
		localStorage.removeItem('MENU');
	}

	public redirectProduct() {
		Router.replace('/');
	}

	public redirectLogin() {
		window.location.href = `${Config.env.product.url}${Config.env.loginRoutePath}`;
	}

	public async buildMenu(visibleElements: string[], expiredElements: string[]): Promise<any> {
		try {
			const response = await TekLibAuthApi.buildMenu(visibleElements, expiredElements);
			localStorage.setItem('MENU', JSON.stringify(response.data));
			return response;
		} catch (error) {
			return error;
		}
	}

	public showMessageExpiredMenu() {
		DialogService.show({
			name: 'success_dialog',
			type: 'warning',
			title: 'ALE_WARNING',
			text: I18n.translate('ALE_EXPIRED_MENU'),
		});
	}

	public async validateExpiredSession(this: TekLibAuthService) {
		try {
			const response = await TekLibAuthApi.validateExpiredSession(Config.env.product.sessionTime);
			if (response.data && response.data.IS_EXPIRED) {
				await this.createExpiredSessionModal();
				this.expiredSessionModal.show();
				TekLibLocalStorage.setItem('LOGIN_EXPIRED_SESSION', true);
			} else {
				if (this.expiredSessionMethod) {
					clearTimeout(this.expiredSessionMethod);
				}
				const timeout = response.data.TIMEOUT || Config.env.product.sessionTime;
				Util.doAsync(this.validateExpiredSession.bind(this), timeout);
			}
		} catch (error) {
			TekLibMessageServices.defaultError(error.response);
		}
	}

	public factoryExpiredSessionMethod() {
		if (Config.env && Config.env.product && Config.env.product.sessionTime) {
			if (this.expiredSessionMethod) {
				clearTimeout(this.expiredSessionMethod);
			}
			this.expiredSessionMethod = Util.doAsync(this.validateExpiredSession.bind(this), Config.env.product.sessionTime);
		}
	}

	public async logout() {
		try {
			LoadingService.show();

			if (Util.isNext()) {
				await TekLibAuthApi.logout();
			}

			this.setLocalStorageInLogout();
			TekLibLocalStorage.setItem('LOGIN_EXPIRED_SESSION', false);

			if (Util.isNext()) {
				this.redirectLogin();
			} else {
				this.doLogoutZhAngular();
			}

			LoadingService.hide();
		} catch (error) {
			LoadingService.hide();
			TekLibMessageServices.defaultError(error.response);
		}
	}

	public async logoutConfirm() {
		const buttonsDoLogout = [
			{
				name: 'no',
				component: 'ZdButton',
				label: I18n.translate('NO'),
				outline: true,
				events: {
					click: (() => {
						DialogService.hide();
					}),
				},
			},
			{
				name: 'yes',
				component: 'ZdButton',
				label: I18n.translate('YES'),
				events: {
					click: (() => {
						DialogService.hide();
						this.logout();
					}),
				},
			},
		];
		TekLibMessageServices.showMessage('ALE_LOGOUT', {}, 'warning', buttonsDoLogout);
	}

	public async checkExpiredSession() {
		if (!TekLibLocalStorage.getItem('IS_NEXT')) {
			TekLibLocalStorage.setItem('LOGIN_EXPIRED_SESSION', false);
		}

		if (TekLibLocalStorage.getItem('LOGIN_EXPIRED_SESSION')) {
			TekLibMessageServices.showMessage('ERR_EXPIRED_SESSION_LOGIN', {}, 'warning', this.buttonOkLogout());
		}
	}

	public setInitLocalStorage() {
		const productId = TekLibLocalStorage.getItem('IS_NEXT') ? Config.env.product.id : TekLibLocalStorage.getItem('PRODUCT_ID');
		localStorage.setItem('PRODUCT_ID', productId);
		localStorage.setItem('PRODUCT_URL', Config.env.product.url);
	}

	public getCurrentPage() {
		const location = window.location;
		return location.pathname;
	}

	private setLoginOperatorprops(data: any) {
		TekLibLocalStorage.setItem('LOGIN_USER_NAME', data.USER_NAME);
		if (data.IS_SUPPORT_OPERATOR) {
			TekLibLocalStorage.setItem('IS_SUPPORT_OPERATOR', data.IS_SUPPORT_OPERATOR);
		}
	}

	private doLogoutZhAngular() {
		window.parent.postMessage({
			type: 'logoutByZdNext',
			realData: [],
		}, window.location.ancestorOrigins[0]);
	}

	private async createExpiredSessionModal() {
		this.expiredSessionModal = ModalService.create({
			name: 'expiredSessionModal',
			persistent: true,
			children: [
				{
					name: 'expiredSessionModalHeader',
					component: 'ZdHeader',
					color: 'transparent',
					cssClass: 'zd-mb-5',
					padless: true,
					elevation: 0,
					leftSlot: [
						{
							name: 'expiredSessionModaltitleText',
							component: 'ZdText',
							text: 'Sessão Expirada',
							cssClass: 'zd-theme-font-title',
						},
					],
					rightSlot: [],
				},
				{
					name: 'expiredSessionform',
					component: 'ZdForm',
					children: [
						{
							name: 'PASSWORD',
							label: 'Senha',
							dense: false,
							component: 'ZdPassword',
							validations: {
								required: {},
							},
							grid: {
								sm: 12,
							},
							events: {
								keydown: this.callValidateUser.bind(this),
							},
						},
					],
				},
				{
					name: 'expiredSessionModalFooter',
					component: 'ZdFooter',
					color: 'transparent',
					cssClass: 'zd-mt-5',
					padless: true,
					rightSlot: [
						{
							name: 'expiredSessionModalCancelButton',
							component: 'ZdButton',
							label: 'Sair',
							outline: true,
							events: {
								click: () => {
									this.destroyExpiredSessionModal();
									this.logout();
								},
							},
						},
						{
							name: 'expiredSessionModalSaveButton',
							component: 'ZdButton',
							label: 'Confirme',
							events: {
								click: () => {
									this.validateUser();
								},
							},
						},
					],
				},
			],
		});
	}

	private destroyExpiredSessionModal() {
		this.expiredSessionModal.destroy();
	}

	private callValidateUser(param: any) {
		if (param.event.key === 'Enter') {
			this.validateUser();
		}
	}

	private async validateUser() {
		const expiredSessionform = Metadata.getInstance<Form>('expiredSessionform');
		TekLibLocalStorage.setItem('LOGIN_EXPIRED_SESSION', true);
		if (expiredSessionform.validate()) {
			try {
				LoadingService.show();
				const password = expiredSessionform.value.PASSWORD;
				const isSupportOperator = TekLibLocalStorage.getItem('IS_SUPPORT_OPERATOR');
				await TekLibAuthApi.validateUser(password, isSupportOperator);
				TekLibLocalStorage.setItem('LOGIN_EXPIRED_SESSION', false);
				this.attemptsPassword = 0;
				LoadingService.hide();
				this.destroyExpiredSessionModal();
			} catch (error) {
				LoadingService.hide();

				if (error.response.data && error.response.data.code && error.response.data.code === 5) {
					this.attemptsPassword += 1;
					if (this.attemptsPassword < 3) {
						TekLibMessageServices.showMessage('ERR_ATTEMPT_PARTIAL', { attempts: this.attemptsPassword });
					} else {
						this.destroyExpiredSessionModal();
						TekLibMessageServices.showMessage('ERR_ATTEMPT_END', {}, 'warning', this.buttonOkLogout());
					}
				} else {
					TekLibMessageServices.defaultError(error.response);
				}
			}
		}
	}

	private buttonOkLogout() {
		return [
			{
				name: 'ok',
				component: 'ZdButton',
				label: I18n.translate('OK'),
				events: {
					click: (() => {
						DialogService.hide();
						this.logout();
					}),
				},
			},
		];
	}
}
