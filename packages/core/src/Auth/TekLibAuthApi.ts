import { Config, Http } from '@zeedhi/core';

export default class TekLibAuthApi {
	public static startSession(userData: any) {
		const data = {
			USER: userData.loginUser,
			LOGIN_TOKEN: userData.loginToken,
			LOGIN_LANGUAGE: userData.loginLanguage,
		};
		return Http.post('/lib_startSession', data);
	}

	public static logout() {
		const data = {
			PRODUCT_ID: localStorage.getItem('PRODUCT_ID') || null,
			HASH: localStorage.getItem('LOGIN_HASH') || null,
		};
		return Http.post('/lib_logout', data);
	}

	public static updateSession(user: any, accessProfile: any, otherSessionValues: any) {
		const data = {
			USER: user,
			ACCESS_PROFILE: accessProfile,
			OTHER_SESSION_VALUES: otherSessionValues,
			LOGIN_USER: localStorage.getItem('LOGIN_USER'),
		};
		return Http.post('/lib_updateSession', data);
	}

	public static validateExpiredSession(timeout: number) {
		const data = {
			TIMEOUT: timeout,
		};
		return Http.get('/lib_validateExpiredSession', { params: data });
	}

	public static saveCollectedData(collectionIds: any, operationId: any, productId = null, operatorCode = null, operatorName = null, organizationId = null) {
		const data = {
			COLLECTION_IDS: collectionIds,
			OPERATION_ID: operationId,
			PRODUCT_ID: productId,
			OPERATOR_CODE: operatorCode,
			OPERATOR_NAME: operatorName,
			ORGANIZATION_ID: organizationId,
		};
		return Http.post('/lib_collectedData', data);
	}

	public static buildMenu(visibleElements: string[], expiredElements: string[]) {
		const newExpiredElements = !expiredElements.length ? [''] : expiredElements;
		const data = {
			VISIBLE_ELEMENTS: visibleElements,
			EXPIRED_ELEMENTS: newExpiredElements,
		};
		return Http.post('/lib_buildMenu', data);
	}

	public static validateUser(password: string, isSupportOperator: boolean) {
		const data = {
			PASSWORD: password,
			IS_SUPPORT_OPERATOR: isSupportOperator,
		};
		return Http.post(`${Config.env.loginEndPoint}/validateUser`, data);
	}
}
