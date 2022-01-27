import { Component, Prop } from 'vue-property-decorator';
import { ZdForm } from '@zeedhi/vuetify';
import { PmLibFormSave as PmLibFormSaveClass, IHeader, IFooter } from '@zeedhi/pm-lib-common';

/**
 * FormSave component
 */
@Component
export default class PmLibFormSave extends ZdForm {
	@Prop({ type: [String, Number], default: undefined }) public styleHeightCalc: string | number | undefined;

	@Prop({ type: Object }) public headerProps!: IHeader;

	@Prop({ type: Object }) public footerProps!: IFooter;

	public instance!: PmLibFormSaveClass;

	public instanceType: typeof PmLibFormSaveClass = PmLibFormSaveClass;

	get getStyleHeightCalc() {
		if (this.styleHeightCalc) {
			return this.heightCalcStyleApplication;
		}
		return this.heightCalcStyleNone;
	}

	private get heightCalcStyleApplication() {
		return {
			height: `calc(100vh - ${this.styleHeightCalc}px)`
		}
	};

	private heightCalcStyleNone = {};

	created() {}
}
