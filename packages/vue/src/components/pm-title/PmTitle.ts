import { Component, Prop } from 'vue-property-decorator';
import { PmTitle as PmTitleClass } from '@zeedhi/pm-lib-common';
import { ZdComponentRender } from '@zeedhi/vuetify';

/**
 * TekAuthLogin component
 */
@Component
export default class PmTitle extends ZdComponentRender{
	@Prop({	type: String }) public text!: string;

	@Prop({	type: String }) public name!: string;

	public instance!: PmTitleClass;

	public instanceType: typeof PmTitleClass = PmTitleClass;
}
