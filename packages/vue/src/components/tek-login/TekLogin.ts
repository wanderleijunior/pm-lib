import { components } from '@zeedhi/vuetify';
import { Component, Prop } from 'vue-property-decorator';
import { IComponentRender } from '@zeedhi/common';
import { TekLogin as TekLoginClass } from '@zeedhi/tek-lib-common';

// eslint-disable-next-line prefer-destructuring
const ZdLogin = components.ZdLogin;

/**
 * TekAuthLogin component
 */
@Component
export default class TekLogin extends ZdLogin {
	@Prop({
		type: [String, Number],
		default: 450
	}) public cardWidth!: string;

	@Prop({
		type: String,
		default: 'right'
	}) public layout!: string;

	@Prop({
		type: String,
		default: ''
	}) public endPoint!: string;

	@Prop({
		type: Boolean,
		default: true
	}) public isProduct!: string;

	@Prop({ type: Array }) public children!: IComponentRender[];

	public instance!: TekLoginClass;

	public instanceType: typeof TekLoginClass = TekLoginClass;

	created() {
		this.instance.cssClass += ' tek-login';
	}
}
