import { IComponentEvents, IComponentRender } from '@zeedhi/common';
import { IEvent } from '@zeedhi/core';
export interface IPmLibDetailHeaderEvents extends IComponentEvents {
	backButtonClick?: IEvent<any>;
}

export interface IPmLibDetailHeader extends IComponentRender {
	title?: string | undefined;
	events?: IPmLibDetailHeaderEvents;
}
