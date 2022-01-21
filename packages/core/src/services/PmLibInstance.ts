import { Metadata } from '@zeedhi/core';
import { TekGrid } from '@zeedhi/teknisa-components-common';
import { Form, Select, SelectMultiple, Tabs, TextInput } from '@zeedhi/common';

export class PmLibInstance {
	public static getInstanceTekGrid(name: string): TekGrid {
		return Metadata.getInstance<TekGrid>(name);
	}

	public static getInstanceZdForm(name: string): Form {
		return Metadata.getInstance<Form>(name);
	}

	public static getInstanceZdTextInput(name: string): TextInput {
		return Metadata.getInstance<TextInput>(name);
	}

	public static getInstanceZdSelect(name: string): Select {
		return Metadata.getInstance<Select>(name);
	}

	public static getInstanceZdSelectMultiple(name: string): SelectMultiple {
		return Metadata.getInstance<SelectMultiple>(name);
	}

	public static getInstanceZdTabs(name: string): Tabs {
		return Metadata.getInstance<Tabs>(name);
	}
}
