import { PluginFunction, VueConstructor } from 'vue';
import { components } from './components';

const TekLibComponents: { install: PluginFunction<any> } = {
	install(Vue: VueConstructor): void {
		Object.keys(components)
			.forEach((id) => {
				Vue.component(id, components[id]);
			});
	},
};

export default TekLibComponents;
export * from './components/public';
