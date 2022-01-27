import { VueConstructor } from 'vue';
import { IDictionary } from '@zeedhi/core';

import PmLibFormSave from './pm-lib-form-save/PmLibFormSave.vue';
import PmLibDetailHeader from './pm-lib-detail-header/PmLibDetailHeader.vue';

export const components: IDictionary<VueConstructor> = {
	PmLibFormSave,
	PmLibDetailHeader,
};
