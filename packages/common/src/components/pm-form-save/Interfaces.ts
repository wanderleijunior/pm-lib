import { IForm, IFormEvents, IFormEvent } from '@zeedhi/common';
import { IDictionary, IEvent } from '@zeedhi/core';

export interface IPmFormSaveEvents extends IFormEvents {
	cancelButtonClick?: IEvent<IFormEvent>;
	saveButtonClick?: IEvent<IFormEvent>;
	closeButtonClick?: IEvent<IFormEvent>;
}

export interface ISlot {
	leftSlot?: Array<IDictionary>;
	rightSlot?: Array<IDictionary>;
}

export interface ICloseButton {
	isVisible?: boolean,
	disabled?: boolean;
}

export interface ICancelButton {
	isVisible?: boolean;
	disabled?: boolean;
}

export interface ISaveButton {
	isVisible?: boolean;
	disabled?: boolean;
}

export interface IHeader extends ISlot {
	isVisible?: boolean,
	title?: string,
	closeButton?: ICloseButton;
}

export interface IFooter extends ISlot {
	isVisible?: boolean,
	cancelButton?: ICancelButton;
	saveButton?: ISaveButton;
}

export interface IPmFormSave extends IForm {
	styleHeightCalc?: string | number;
	headerProps: IHeader;
	footerProps: IFooter;
	events?: IPmFormSaveEvents;
}
