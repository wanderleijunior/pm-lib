import { ComponentRender } from '@zeedhi/common';
import { IEventParam } from '@zeedhi/core';
import { IPmLibDetailHeader, IPmLibDetailHeaderEvents } from './Interfaces';

export class PmLibDetailHeader extends ComponentRender implements IPmLibDetailHeader{
	/* Header name */
	public name!: string;

	/* Header title */
	public title!: string

	/* Form events */
	public events!: IPmLibDetailHeaderEvents;

	public header: any = {
		name: `${this.name}PmLibDetailHeader`,
		component: 'ZdHeader',
		color: 'white',
		padless: true,
		elevation: 0,
		leftSlot: [
			{
				name: `${this.name}PmLibDetailHeaderButtonBack`,
				component: 'ZdButton',
				icon: true,
				small: true,
				iconName: 'mdi-arrow-left',
				events: {
					click: this.backButtonClick.bind(this),
				},
			},
			{
				name: `${this.name}PmLibDetailHeaderTitle`,
				component: 'ZdText',
				tag: 'h3',
				text: '{{AclLabelsController.currentProjectName}}'
			}
		],
	};

	constructor(props: IPmLibDetailHeader) {
		super(props);

		this.name = this.getInitValue('name', props.name, this.name);
		this.title = this.getInitValue('title', props.title, this.title);

		this.createAccessors();

		this.setTitle();
	}

	public setTitle() {
		this.header.leftSlot[1].text = this.title;
	}

	private backButtonClick({ event, element }: IEventParam<PmLibDetailHeader>) {
		if (this.events.backButtonClick) {
			this.events.backButtonClick({ event, element, component: this });
		}
	}

}
