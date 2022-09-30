import { Component, Prop } from 'vue-property-decorator';
import { ZdComponent } from '@zeedhi/vuetify';
import { PmLibAlert as PmLibAlertClass } from '@zeedhi/pm-lib-common';

@Component
export default class PmLibAlert extends ZdComponent {
	@Prop({ type: String, default: '' }) public type: string | undefined;

	@Prop({ type: String, default: '' }) public text: string | undefined;

	@Prop({ type: String, default: '' }) public color: string | undefined;

	@Prop({ type: String, default: undefined }) public border: string | undefined;

	@Prop({ type: String, default: '' }) public elevation: string | undefined;

	@Prop({ type: Boolean, default: false }) public coloredBorder: false | undefined;

	@Prop({ type: Boolean, default: false }) public dense: false | undefined;

	@Prop({ type: Boolean, default: false }) public dismissible: false | undefined;

	@Prop({ type: Boolean, default: false }) public outlined: false | undefined;

	@Prop({ type: Boolean, default: false }) public prominent: false | undefined;

	@Prop({ type: Boolean, default: false }) public shaped: false | undefined;

	@Prop({ type: Boolean, default: false }) public textMode: false | undefined;

	public instance!: PmLibAlertClass;

	public instanceType: typeof PmLibAlertClass = PmLibAlertClass;
}
