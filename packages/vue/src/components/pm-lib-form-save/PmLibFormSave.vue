<template>
	<span>
		<zd-header v-bind="instance.header"></zd-header>

		<zd-divider :name="`${instance.name}PmFormSaveDivider`"
					cssClass="zd-mb-2"
					:isVisible="instance.header.isVisible"
		></zd-divider>

		<zd-form
			:cssStyle="getStyleHeightCalc"
			:name="`${instance.name}PmFormSave`"
			:instance-object="instance"
		></zd-form>

		<zd-footer v-bind="instance.footer"></zd-footer>
	</span>
</template>

<script lang="ts" src="./PmLibFormSave.ts">

</script>

<style lang="scss">
</style>
