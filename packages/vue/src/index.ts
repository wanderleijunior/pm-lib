import { PluginFunction, VueConstructor } from 'vue';
import { components } from './components';

const PmComponents: { install: PluginFunction<any> } = {
	install(Vue: VueConstructor): void {
		Object.keys(components)
			.forEach((id) => {
				Vue.component(id, components[id]);
			});
	},
};

export default PmComponents;
export * from './components/public';
