import { Component, Prop } from 'vue-property-decorator';
import { ZdForm } from '@zeedhi/vuetify';
import { PmFormSave as PmFormSaveClass, IHeader, IFooter } from '@zeedhi/pm-lib-common';

/**
 * FormSave component
 */
@Component
export default class PmFormSave extends ZdForm {
	@Prop({ type: [String, Number], default: undefined }) public pixelsCalcStyle: string | number | undefined;

	@Prop({ type: Object }) public headerProps!: IHeader;

	@Prop({ type: Object }) public footerProps!: IFooter;

	public instance!: PmFormSaveClass;

	public instanceType: typeof PmFormSaveClass = PmFormSaveClass;

	private get heightCalcStyle() {
		if (this.pixelsCalcStyle) {
			return this.heightCalcStyleApplication;
		}
		return this.heightCalcStyleNone;
	}

	private heightCalcStyleApplication = {
		height: `calc(100vh - ${this.pixelsCalcStyle}px)`,
	};

	private heightCalcStyleNone = {};

	created() {}
}
