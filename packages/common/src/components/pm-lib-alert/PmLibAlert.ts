import { ComponentRender } from '@zeedhi/common';
import { IPmLibAlert } from './Interfaces';

export class PmLibAlert extends ComponentRender implements IPmLibAlert {
	public type: string | undefined = undefined;

	public text!: string;

	public color: string | undefined = undefined;

	public border: string | undefined = undefined;

	public elevation: string | undefined = undefined;

	public coloredBorder: boolean = false;

	public dense: boolean = false;

	public dismissible: boolean = false;

	public outlined: boolean = false;

	public prominent: boolean = false;

	public shaped: boolean = false;

	public light: boolean = false;

	public dark: boolean = false;

	public textMode: boolean = false;

	constructor(props: IPmLibAlert) {
		super(props);

		this.type = this.getInitValue('type', props.type, this.type);
		this.text = this.getInitValue('text', props.text, this.text);
		this.color = this.getInitValue('color', props.color, this.color);
		this.border = this.getInitValue('border', props.border, this.border);
		this.elevation = this.getInitValue('elevation', props.elevation, this.elevation);
		this.coloredBorder = this.getInitValue('coloredBorder', props.coloredBorder, this.coloredBorder);
		this.dense = this.getInitValue('dense', props.dense, this.dense);
		this.dismissible = this.getInitValue('dismissible', props.dismissible, this.dismissible);
		this.outlined = this.getInitValue('outlined', props.outlined, this.outlined);
		this.prominent = this.getInitValue('prominent', props.prominent, this.prominent);
		this.dark = this.getInitValue('dark', props.dark, this.dark);
		this.light = this.getInitValue('light', props.light, this.light);
		this.textMode = this.getInitValue('textMode', props.textMode, this.textMode);

		this.createAccessors();
	}
}
