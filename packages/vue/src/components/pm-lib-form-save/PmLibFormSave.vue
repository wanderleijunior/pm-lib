<template>
	<span>
		<zd-header v-bind="instance.header"></zd-header>

		<zd-divider
			:name="`${instance.name}PmFormSaveDivider`"
			cssClass="zd-mb-2"
			:isVisible="instance.header.isVisible"
		></zd-divider>

		<zd-container :name="`${instance.name}PmFormContainerForm`" scrollView>
			<zd-form
				:cssStyle="getStyleHeightCalc"
				:name="`${instance.name}PmFormSave`"
				:instance-object="instance"
			></zd-form>
		</zd-container>

		<zd-footer v-bind="instance.footer"></zd-footer>
	</span>
</template>

<script lang="ts" src="./PmLibFormSave.ts"></script>

<style lang="scss"></style>
