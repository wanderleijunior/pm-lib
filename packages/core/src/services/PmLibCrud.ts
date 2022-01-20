import { DialogService, LoadingService, Modal } from '@zeedhi/common';
import { Http } from '@zeedhi/core';
import { PmLibInstance } from './PmLibInstance';
import { PmLibAlertService } from './PmLibAlertService';
import { PmLibDialogService } from './PmLibDialogService';
import Messages from '../utilities/Messages';

export class PmLibCrud {
	private static deleteRoute: string = '';

	private static deleteTekGridName: string = '';

	public static async genericAddModalTekGrid(formName: string, modal: Modal, route: string, tekGridName: string) {
		const form = PmLibInstance.getInstanceZdForm(formName);
		const grid = PmLibInstance.getInstanceTekGrid(tekGridName);
		if (form.validate()) {
			try {
				modal.hide();
				LoadingService.show();
				await Http.post(route, form.value);
				LoadingService.hide();
				PmLibAlertService.showSuccess(Messages.SUCCESS_SAVE_DEAFULT);
				grid.datasource.get();
			} catch (e) {
				LoadingService.hide();
				PmLibDialogService.showErrorBackend(e);
			}
		}
	}

	public static async genericBeforeSaveTekGrid(params: any, route: string, tekGridName: string) {
		params.event.preventDefault();
		try {
			LoadingService.show();
			await Http.post(route, params.component.getEditedRows());
			LoadingService.hide();
			PmLibAlertService.showSuccess(Messages.SUCCESS_SAVE_DEAFULT);
			params.component.cancelEditedRows();
			PmLibInstance.getInstanceTekGrid(tekGridName).datasource.get();
		} catch (e) {
			LoadingService.hide();
			PmLibDialogService.showErrorBackend(e);
		}
	}

	public static async genericBeforeDeleteTekGrid(params: any, route: string, tekGridName: string) {
		params.event.preventDefault();
		this.deleteRoute = route;
		this.deleteTekGridName = tekGridName;

		DialogService.show({
			name: `confirm_${tekGridName}`,
			type: 'warning',
			title: 'Confirmação de Exclusão',
			text: 'Deseja realmente excluir os registros selecionados?',
			buttons: [
				{
					name: 'no',
					component: 'ZdButton',
					label: 'Não',
					outline: true,
					events: {
						click: () => DialogService.hide(),
					},
				},
				{
					name: 'yes',
					component: 'ZdButton',
					label: 'Sim',
					events: PmLibCrud.deleteTekGrid,
				},
			],
		});
	}

	private static deleteTekGrid: any = {
		click: () => PmLibCrud.doDeleteTekGrid(),
	};

	private static async doDeleteTekGrid() {
		DialogService.hide();
		try {
			const grid = PmLibInstance.getInstanceTekGrid(this.deleteTekGridName);
			LoadingService.show();
			await Http.post(this.deleteRoute, grid.selectedRows);
			LoadingService.hide();
			PmLibAlertService.showSuccess(Messages.SUCCESS_DELETE_DEAFULT);
			grid.datasource.get();
			grid.selectedRows = [];
		} catch (e) {
			LoadingService.hide();
			PmLibDialogService.showErrorBackend(e);
		}
		this.deleteRoute = '';
		this.deleteTekGridName = '';
	}

}
