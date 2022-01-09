import { DialogService, IComponentRender } from '@zeedhi/common';
import { I18n } from '@zeedhi/core';

export class TekLibMessageServices {
	public static showMessage(message: string, params: any = {}, type: string = 'warning', buttons?: IComponentRender[]) {
		DialogService.show({
			name: 'lib-dialog',
			type,
			title: `ALE_${type.toUpperCase()}`,
			text: I18n.translate(message, params),
			buttons,
		});
	}

	public static defaultError(response: any) {
		const defaultMessage = 'ERR_UNEXPECTED_ERROR';
		if (response && response.data && response.data.error) {
			let { data } = response;
			const { error } = data;
			if (TekLibMessageServices.isJson(data)) {
				data = JSON.parse(data);
			}
			const params = data.messageParams || {};
			const messageCode = data.messageCode || error || 'ERR_UNEXPECTED_ERROR';
			const message = messageCode.split('Exception: ').pop();
			TekLibMessageServices.showMessage(message, params, 'error');
		} else {
			this.showMessage(defaultMessage, {}, 'error');
		}
	}

	private static isJson(str: string) {
		let result = null;
		try {
			result = JSON.parse(str);
		} catch (e) {
			// nothing to do
		}
		return result;
	}
}
