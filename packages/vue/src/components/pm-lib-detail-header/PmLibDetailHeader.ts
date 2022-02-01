import { Component, Prop } from 'vue-property-decorator';
import { ZdComponentRender } from '@zeedhi/vuetify';
import { PmLibDetailHeader as PmLibDetailHeaderClass } from '@zeedhi/pm-lib-common';
// import { IEventParam } from '@zeedhi/core';

/**
 * FormSave component
 */
@Component
export default class pmLibDetailHeader extends ZdComponentRender {
	@Prop({ type: String, default: '' }) public title: string | undefined;

	public instance!: PmLibDetailHeaderClass;

	public instanceType: typeof PmLibDetailHeaderClass = PmLibDetailHeaderClass;

	// public backButtonClick(e: IEventParam<PmLibDetailHeaderClass>) {
	// 	this.instance.backButtonClick(e);
	// }
}
