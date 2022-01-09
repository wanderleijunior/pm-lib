import { LoadingService } from '@zeedhi/common';
import TekLibAuthApi from './TekLibAuthApi';
import TekLibAuthService from './TekLibAuthService';
import { Util } from '../Utilities/Util';

export class TekLibAuth {
	private static tekLibAuthService: TekLibAuthService = TekLibAuthService.getInstance();

	public static async startSession(userData: any) {
		LoadingService.show();
		await this.tekLibAuthService.startSession(userData);
		LoadingService.hide();
	}

	public static showMessageExpiredMenu() {
		this.tekLibAuthService.showMessageExpiredMenu();
	}

	public static async logout() {
		await this.tekLibAuthService.logout();
	}

	public static async logoutConfirm() {
		await this.tekLibAuthService.logoutConfirm();
	}

	public static async updateSession(user: object, accessProfile: object[], otherSessionValues: object) {
		return new Promise((resolve, reject) => {
			TekLibAuthApi.updateSession(user, accessProfile, otherSessionValues)
				.then((response) => {
					if (!response.data.user) {
						reject(response);
					}
					localStorage.setItem('LOGIN_USER', response.data.user);
					resolve(true);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	public static saveCollectedData(collectionIds: any, operationId: any, productId = null,
									operatorCode = null, operatorName = null, organizationId = null): Promise<any> {
		return TekLibAuthApi.saveCollectedData(collectionIds, operationId, productId, operatorCode, operatorName, organizationId);
	}

	public static async startLib() {
		window.addEventListener('message', this.handleMessageEvent);
		await this.tekLibAuthService.checkExpiredSession();
		if (Util.isProduct()) {
			TekLibAuthService.getInstance().setInitLocalStorage();
		}
	}

	private static handleMessageEvent(event: any) {
		if (event.data.type === 'createSessionTime') {
			TekLibAuthService.getInstance().factoryExpiredSessionMethod();
		}
	}
}
