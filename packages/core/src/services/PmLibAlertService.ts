import { AlertService } from '@zeedhi/common';
import { PmLibUtil } from '../utilities/PmLibUtil';

export class PmLibAlertService extends AlertService {
	public static showSuccess(msg: string) {
		this.show({
			name: PmLibUtil.getNameDynamic('success_alert'),
			color: 'success',
			text: msg,
			timeout: 3000,
			showDismiss: true,
			top: true,
			right: true,
		});
	}

	public static showError(msg: string) {
		this.show({
			name: PmLibUtil.getNameDynamic('success_alert'),
			color: 'error',
			text: msg,
			timeout: 3000,
			showDismiss: true,
			top: true,
			right: true,
		});
	}
}
