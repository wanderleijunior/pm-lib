import { Form } from '@zeedhi/common';
import { IDictionary, IEventParam } from '@zeedhi/core';
import { IFooter, IHeader, IPmFormSave, IPmFormSaveEvents } from './Interfaces';

export class PmFormSave extends Form implements IPmFormSave {
	/* Form name */
	public name!: string;

	/* PmFormSave: pixelsCalcStyle */
	public pixelsCalcStyle = undefined;

	/* PmFormSave: HeaderProps */
	public headerProps: IHeader = {};

	/* PmFormSave: HeaderProps Default */
	private headerDefaultProps: IHeader = {
		isVisible: true,
		title: '',
		closeButton: {
			isVisible: true,
			disabled: false,
		},
	};

	/* PmFormSave: FooterProps */
	public footerProps: IFooter = {};

	/* PmFormSave: FooterProps Default */
	private footerDefaultProps: IFooter = {
		isVisible: true,
		cancelButton: {
			isVisible: true,
			disabled: false,
		},
		saveButton: {
			isVisible: true,
			disabled: false,
		},
	};

	/* Form events */
	public events!: IPmFormSaveEvents;

	public header: any = {
		name: `${this.name}PmFormSaveHeader`,
		component: 'ZdHeader',
		color: 'white',
		isVisible: true,
		padless: true,
		elevation: 0,
		leftSlot: [
			{
				name: `${this.name}PmFormSaveHeaderTitle`,
				component: 'ZdText',
				isVisible: true,
				tag: 'h3',
				text: '',
			},
		],
		rightSlot: [
			{
				name: `${this.name}PmFormSaveHeaderCloseButton`,
				component: 'ZdButton',
				icon: true,
				iconName: 'mdi-close',
				isVisible: false,
				disabled: false,
				events: {
					click: this.closeButtonClick.bind(this),
				},
			},
		],
	};

	public footer: any = {
		name: `${this.name}PmFormSaveFooter`,
		component: 'ZdFooter',
		color: 'white',
		isVisible: true,
		cssClass: 'zd-mt-4',
		padless: true,
		elevation: 0,
		leftSlot: [],
		rightSlot: [
			{
				name: `${this.name}PmFormSaveHeaderCancelButton`,
				component: 'ZdButton',
				label: 'Cancelar',
				outline: true,
				isVisible: true,
				events: {
					click: this.cancelClick.bind(this),
				},
			},
			{
				name: `${this.name}PmFormSaveHeaderSaveButton`,
				component: 'ZdButton',
				label: 'Salvar',
				isVisible: true,
				events: {
					click: this.saveClick.bind(this),
				},
			},
		],
	};

	/**
	 * Form Save constructor
	 * @param props Form Save properties
	 */
	constructor(props: IPmFormSave) {
		super(props);

		this.name = this.getInitValue('name', props.name, this.name);
		this.pixelsCalcStyle = this.getInitValue('pixelsCalcStyle', props.pixelsCalcStyle, this.pixelsCalcStyle);
		this.headerProps = this.getInitValue('headerProps', props.headerProps, this.headerProps);
		this.footerProps = this.getInitValue('footerProps', props.footerProps, this.footerProps);

		this.createAccessors();

		if (this.header) {
			this.createObjAccessors(this.header, 'header');
			this.setHeaderSlot();
		}

		if (this.footerProps) {
			this.createObjAccessors(this.footerProps, 'footer');
			this.setFooterSlot();
		}
	}

	/** ********************************
	 ******* Header Slot Section *******
	 ********************************* */

	private setHeaderSlot() {
		this.setHeaderVisible();
		this.setHeaderLeftSlot();
		this.setHeaderRightSlot();
	}

	/** Header Left Slot */

	private setHeaderLeftSlot() {
		this.setHeaderTitle();

		this.headerProps.leftSlot?.forEach((item) => {
			this.header.leftSlot.push(<any>item);
		});
	}

	/** Header Right Slot */

	private setHeaderRightSlot() {
		this.setCloseButtonVisible();
		this.setCloseButtonDisable();

		this.headerProps.rightSlot?.forEach((item) => {
			this.header.rightSlot.unshift(<any>item);
		});
	}

	private getPositionInArrayCloseButton() {
		return this.header.rightSlot.length - 1;
	}

	/** ********************************
	 ******* Footer Slot Section *******
	 ********************************* */

	private setFooterSlot() {
		this.setFooterVisible();
		this.setFooterLeftSlot();
		this.setFooterRightSlot();
	}

	/** Footer Left Slot */

	private setFooterLeftSlot() {
		this.footerProps.leftSlot?.forEach((item) => {
			this.footer.leftSlot.push(<IDictionary>item);
		});
	}

	/** Footer Right Slot */

	private setFooterRightSlot() {
		this.setCancelButtonVisible();
		this.setCancelButtonDisable();
		this.setSaveButtonVisible();
		this.setSaveButtonDisable();

		this.footerProps.rightSlot?.forEach((item) => {
			this.footer.rightSlot.unshift(<IDictionary>item);
		});
	}

	private getPositionInArrayCancelButton() {
		return this.footer.rightSlot.length - 2;
	}

	private getPositionInArraySaveButton() {
		return this.footer.rightSlot.length - 1;
	}

	/** ******************************************
	 ******** Methods To Set Properties  *********
	 ******************************************* */

	public setHeaderVisible(value?: boolean) {
		this.headerProps.isVisible = value ?? this.headerProps.isVisible ?? this.headerDefaultProps.isVisible;
		this.header.isVisible = this.headerProps.isVisible;
	}

	public setHeaderTitle(title?: string) {
		this.header.leftSlot[0].text = title || this.headerProps.title || this.headerDefaultProps.title;
	}

	public setCloseButtonVisible(value?: boolean) {
		this.createObjectIfUndefined(this.headerProps, 'closeButton');
		this.headerProps.closeButton!.isVisible = value ?? this.headerProps.closeButton?.isVisible ?? this.headerDefaultProps.closeButton?.isVisible;
		this.header.rightSlot[this.getPositionInArrayCloseButton()].isVisible = this.headerProps.closeButton?.isVisible;
	}

	public setCloseButtonDisable(value?: boolean) {
		this.createObjectIfUndefined(this.headerProps, 'closeButton');
		this.headerProps.closeButton!.disabled = value ?? this.headerProps.closeButton?.disabled ?? this.headerDefaultProps.closeButton?.disabled;
		this.header.rightSlot[this.getPositionInArrayCloseButton()].disabled = this.headerProps.closeButton?.disabled;
	}

	public setFooterVisible(value?: boolean) {
		this.footerProps.isVisible = value ?? this.footerProps.isVisible ?? this.footerDefaultProps.isVisible;
		this.footer.isVisible = this.footerProps.isVisible;
	}

	public setCancelButtonVisible(value?: boolean) {
		this.createObjectIfUndefined(this.footerProps, 'cancelButton');

		if (value !== undefined) {
			this.footer.rightSlot[this.getPositionInArrayCancelButton()].isVisible = value;
			this.footerProps.cancelButton!.isVisible = value;
		} else if (typeof this.footerProps.cancelButton?.isVisible !== 'undefined') {
			this.footer.rightSlot[this.getPositionInArrayCancelButton()].isVisible = this.footerProps.cancelButton?.isVisible;
		} else {
			this.footer.rightSlot[this.getPositionInArrayCancelButton()].isVisible = this.footerDefaultProps.cancelButton?.isVisible;
			this.footerProps.cancelButton!.isVisible = this.footerDefaultProps.cancelButton?.isVisible;
		}
	}

	public setCancelButtonDisable(value?: boolean) {
		this.createObjectIfUndefined(this.footerProps, 'cancelButton');
		this.footerProps.cancelButton!.disabled = value ?? this.footerProps.cancelButton?.disabled ?? this.footerDefaultProps.cancelButton?.disabled;
		this.footer.rightSlot[this.getPositionInArrayCancelButton()].disabled = this.footerProps.cancelButton?.disabled;
	}

	public setSaveButtonVisible(value?: boolean) {
		this.createObjectIfUndefined(this.footerProps, 'saveButton');

		if (value !== undefined) {
			this.footer.rightSlot[this.getPositionInArraySaveButton()].isVisible = value;
			this.footerProps.saveButton!.isVisible = value;
		} else if (typeof this.footerProps.saveButton?.isVisible !== 'undefined') {
			this.footer.rightSlot[this.getPositionInArraySaveButton()].isVisible = this.footerProps.saveButton?.isVisible;
		} else {
			this.footer.rightSlot[this.getPositionInArraySaveButton()].isVisible = this.footerDefaultProps.saveButton?.isVisible;
			this.footerProps.saveButton!.isVisible = this.footerDefaultProps.saveButton?.isVisible;
		}
	}

	public setSaveButtonDisable(value?: boolean) {
		this.createObjectIfUndefined(this.footerProps, 'saveButton');
		this.footerProps.saveButton!.disabled = value ?? this.footerProps.saveButton?.disabled ?? this.footerDefaultProps.saveButton?.disabled;
		this.footer.rightSlot[this.getPositionInArraySaveButton()].disabled = this.footerProps.saveButton?.disabled;
	}

	/** *******************************
	 ******** Methods Events  *********
	 ******************************** */

	private closeButtonClick({ event, element }: IEventParam<PmFormSave>) {
		if (this.events.closeButtonClick) {
			this.events.closeButtonClick({ event, element, component: this });
		}
	}

	private cancelClick({ event, element }: IEventParam<PmFormSave>) {
		if (this.events.cancelClick) {
			this.events.cancelClick({ event, element, component: this });
		}
	}

	private saveClick({ event, element }: IEventParam<PmFormSave>) {
		if (this.validate() && this.events.saveClick) {
			this.events.saveClick({ event, element, component: this });
		}
	}

	/** ********************************
	 ******** Methods Helpers  *********
	 ********************************* */

	private isTypeofUndefined(data: any) {
		return typeof data === 'undefined';
	}

	public createObjectIfUndefined(property: any, obj: string) {
		if (this.isTypeofUndefined(property[obj])) {
			property[obj] = {};
		}
	}
}
