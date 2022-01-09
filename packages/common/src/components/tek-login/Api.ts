import { Http } from '@zeedhi/core';

export class Api {
	static endpoint = "";

	public static _initialize(endpoint: string) {
		this.endpoint = endpoint;
	}

	static getUrl(route: string) {
		return this.endpoint + route;
	}

    static async login(user: string, password: string, productId: string | null, attempts: number, showFullOperator: boolean,
                       hash: string, confirmSessionChange: boolean, keepConnected: string, requesterUrl: string) {
        const data = {
            EMAIL: user,
            PASSWORD: password,
            PRODUCT_ID: productId,
            REQUESTER_URL: requesterUrl,
            ATTEMPTS: attempts,
            SHOW_FULL_OPERATOR: showFullOperator,
            HASH: hash,
            SESSION_CHANGE: confirmSessionChange,
            KEEP_CONNECTED: keepConnected,
        };
        return Http.post(this.getUrl('/login'), data);
    }

    static async updatePassword(actualPassword: string, newPassword: string, newPasswordConfirmation: string, email: string) {
        const data = {
            actualPassword,
            newPassword,
            newPasswordConfirmation,
            email,
        };
        return Http.post(this.getUrl('/updatePassword'), data);
    }

    static async requestNewPassword(email: string, style: string) {
        const data = {
            email,
            style
        };
        return Http.post(this.getUrl('/requestNewPassword'), data);
    }

    static async productLanguages(productId: string | null) {
        const params = { params: { productId } };
        return Http.get(this.getUrl('/productLanguages'), params);
    }

    static async findPrivacyPolicyByAuthentication(user: string) {
        const params = { params: { user } };
        return Http.get(this.getUrl('/privacyPolicyByAuthentication'), params);
    }
}
