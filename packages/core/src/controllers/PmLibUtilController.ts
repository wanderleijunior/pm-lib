import { Singleton } from '@zeedhi/core';

@Singleton
export class PmLibUtilController {
	public getColumnStyle(params: any) {
		return params.row.IDATIVO === 'N' ? 'grid-column-inactive' : '';
	}
}
