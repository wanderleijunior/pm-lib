import { DialogService } from '@zeedhi/common';
import { PmUtil } from '../utilities/PmUtil';

export class PmDialogService extends DialogService {
	public static showSuccess(text: string) {
		this.show({
			name: PmUtil.getNameDynamic('success_dialog'),
			type: 'success',
			title: 'Sucesso',
			text,
		});
	}

	public static showError(text: string) {
		this.show({
			name: PmUtil.getNameDynamic('error_dialog'),
			type: 'error',
			title: 'Erro',
			text,
		});
	}

	public static showErrorBackend(error: any) {
		let msg = '';
		if (error.response && error.response.data && error.response.data.error) {
			msg = `<b>${error.response.data.error}</b>`;
		} else {
			msg = 'Ocorreu um erro inesperado. Contate um administrador';
		}
		this.show({
			name: 'error_dialog',
			type: 'error',
			title: 'Erro',
			text: msg,
		});
	}

	public static async confirmDialog(msg: string, type: string = 'warning') {
		return new Promise((resolve) => {
			this.show({
				name: PmUtil.getNameDynamic('confirmDialog'),
				type,
				title: 'Confirmação',
				text: msg,
				buttons: [
					{
						name: PmUtil.getNameDynamic('no'),
						component: 'ZdButton',
						label: 'Não',
						outline: true,
						events: {
							click: () => {
								this.hide();
								resolve(false);
							},
						},
					},
					{
						name: PmUtil.getNameDynamic('yes'),
						component: 'ZdButton',
						label: 'Sim',
						events: {
							click: () => {
								this.hide();
								resolve(true);
							},
						},
					},
				],
			});
		});
	}
}
