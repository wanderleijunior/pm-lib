import { Component, Prop } from 'vue-property-decorator';
import { ZdComponentRender } from '@zeedhi/vuetify';
import { PmLibDetailHeader as PmLibDetailHeaderClass } from '@zeedhi/pm-lib-common';

/**
 * FormSave component
 */
@Component
export default class pmLibDetailHeader extends ZdComponentRender {
	@Prop({ type: String, default: '' }) public title: string | undefined;

	public instance!: PmLibDetailHeaderClass;

	public instanceType: typeof PmLibDetailHeaderClass = PmLibDetailHeaderClass;
}
