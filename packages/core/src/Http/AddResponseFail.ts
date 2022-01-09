import { DialogService } from '@zeedhi/common';
import { I18n } from '@zeedhi/core';

import TekLibAuthService from '../Auth/TekLibAuthService';
import { TekLibMessageServices } from '../Helpers/TekLibMessageServices';


export class AddResponseFail {
	/**
	 * Error code 100 = invalid token
	 * Error code 101 = expired token
	 */
	public static libInvalidToken(errorCode: number) {
		if (errorCode === 100) {
			TekLibAuthService.getInstance().logout();
		} else if (errorCode === 101) {
			TekLibMessageServices.showMessage('ALE_EXPIRED_SESSION', {}, 'warning', AddResponseFail.buttonOkLogout());
		}
	}

	public static libInvalidTokenSupportOperator() {
		TekLibMessageServices.showMessage('ALE_EXPIRED_SESSION_SUPPORT_OPERATOR', {}, 'warning', AddResponseFail.buttonOkLogout());
	}

	public static libConcurrentAccess() {
		TekLibMessageServices.showMessage('ALE_SESSION_WILL_BE_ENDED', {}, 'warning', AddResponseFail.buttonOkLogout());
	}

	private static buttonOkLogout() {
		return [
			{
				name: 'ok',
				component: 'ZdButton',
				label: I18n.translate('OK'),
				events: {
					click: (() => {
						DialogService.hide();
						TekLibAuthService.getInstance().logout();
					}),
				},
			},
		];
	}
}
