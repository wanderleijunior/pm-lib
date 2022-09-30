import { IComponentRender } from '@zeedhi/common';

export interface IPmLibAlert extends IComponentRender {
	type?: string | undefined,
	text?: string,
	color?: string | undefined,
	border?: string | undefined,
	elevation?: string | undefined,
	coloredBorder?: boolean,
	dense?: boolean,
	dismissible?: boolean,
	outlined?: boolean,
	prominent?: boolean,
	shaped?: boolean,
	dark?: boolean,
	light?: boolean,
	textMode?: boolean,
}
