import { AlertService } from '@zeedhi/common';
import { PmUtil } from '../utilities/PmUtil';

export class PmAlertService extends AlertService {
	public static showSuccess(msg: string) {
		this.show({
			name: PmUtil.getNameDynamic('success_alert'),
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
			name: PmUtil.getNameDynamic('success_alert'),
			color: 'error',
			text: msg,
			timeout: 3000,
			showDismiss: true,
			top: true,
			right: true,
		});
	}
}
