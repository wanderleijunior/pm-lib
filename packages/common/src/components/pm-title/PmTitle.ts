import { IPmTitle } from './Interfaces';
import { ComponentRender } from '@zeedhi/common';

export class PmTitle extends ComponentRender implements IPmTitle {
	public text!: string;

	public name!: string;

	constructor(props: IPmTitle) {
		super(props);
		this.text = this.getInitValue('cardWidth', props.text, this.text);
		this.name = this.getInitValue('cardWidth', props.name, this.name);
		this.createAccessors();
	}
}
