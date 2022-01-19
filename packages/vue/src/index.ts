import { PluginFunction, VueConstructor } from 'vue';
import { components } from './components';

const PmLibComponents: { install: PluginFunction<any> } = {
	install(Vue: VueConstructor): void {
		Object.keys(components)
			.forEach((id) => {
				Vue.component(id, components[id]);
			});
	},
};

export default PmLibComponents;
export * from './components/public';
