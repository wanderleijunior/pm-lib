import { VueConstructor } from 'vue';
import { IDictionary } from '@zeedhi/core';

import PmTitle from './pm-title/PmTitle.vue';
import PmFormSave from './pm-form-save/PmFormSave.vue';

export const components: IDictionary<VueConstructor> = {
	PmTitle,
	PmFormSave,
};
