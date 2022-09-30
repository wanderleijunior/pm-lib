<template>
	<v-alert
		v-if="instance.isVisible"
		:type="instance.type"
		:color="instance.color"
		:border="instance.border"
		:elevation="instance.elevation"
		:coloredBorder="instance.coloredBorder"
		:dense="instance.dense"
		:dismissible="instance.dismissible"
		:outlined="instance.outlined"
		:prominent="instance.prominent"
		:shaped="instance.shaped"
		:dark="instance.dark"
		:text="instance.textMode"
	>
		{{ instance.text }}
	</v-alert>
</template>

<script lang="ts" src="./PmLibAlert.ts"></script>
