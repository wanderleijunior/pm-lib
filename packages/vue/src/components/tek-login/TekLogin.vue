<template>
	<zd-login
		:instance-object="instance"
		:name="instance.name+'_teklogin'"
	/>
</template>

<script lang="ts" src="./TekLogin.ts"></script>

<style lang="scss">
.tek-login {
	.layout {
		.zd-login-card {
			margin: 0px;
			height: 100vh;

			.zd-login-toolbar {
				text-align: center;
			}
		}

		@media only screen and (max-width: 730px) {
			.zd-login-card {
				margin: 0px;
				height: 100%;
			}
		}
	}
}
</style>
