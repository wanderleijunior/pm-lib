import { VueConstructor } from 'vue';
import { IDictionary } from '@zeedhi/core';

import PmLibFormSave from './pm-lib-form-save/PmLibFormSave.vue';
import PmLibDetailHeader from './pm-lib-detail-header/PmLibDetailHeader.vue';
import PmLibAlert from './pm-lib-alert/PmLibAlert.vue';

export const components: IDictionary<VueConstructor> = {
	PmLibFormSave,
	PmLibDetailHeader,
	PmLibAlert,
};
