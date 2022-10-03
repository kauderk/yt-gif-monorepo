<script lang="ts">
	import App from '$v3/components/Dropdown/App.svelte'
	import Styles from 'src/styles/Styles.svelte'

	import {
		themeStore,
		useDmmVars,
		UpdateCssVars,
		useDdmVars,
	} from '$v3/App/Footer/ThemeStore'
	import { onMount } from 'svelte'
	import Player from '$v3/components/ytgif/Player.svelte'

	onMount(() => {
		themeStore.useLocalStorage()
		useDmmVars.useLocalStorage()

		UpdateCssVars($themeStore.theme)

		useDdmVars(null, $useDmmVars)
	})
</script>

<App />
<Styles />
<Player width="100%" />

<style global lang="scss">
	@import './../styles/css-variables.scss';
	@import './../styles/shades.scss';
	@import './../styles/mixin.scss';

	.hover-bg:hover {
		background-color: var(--ddm-300);
	}
	.sub:hover {
		background-color: rgba(74, 190, 195, 0.3);
	}
	.hidden {
		display: none !important;
	}
	.iddle {
		opacity: 0;
		&:hover {
			opacity: 1;
		}
	}
	.ddmFocus {
		border-color: var(--ddm-s-700) !important;
	}
	.use-ddm-vars {
		.bp3-menu {
			background-color: var(--ddm-500);
		}
		.body-inject .bp3-popover-arrow-fill {
			fill: var(--ddm-500);
		}

		.btn-icon-inline span.bp3-button {
			color: var(--ddm-A200);
			&:hover {
				color: var(--ddm-A100);
			}
			&:active {
				color: var(--ddm-A400);
			}
		}
		.btn-icon-main span.bp3-button {
			color: var(--ddm-s-A200);
			&:hover {
				color: var(--ddm-s-A100);
			}
			&:active {
				color: var(--ddm-s-A400);
			}
		}

		.text-color-SA00 {
			color: var(--ddm-s-A200);
			&:hover {
				color: var(--ddm-s-A100);
			}
			&:active {
				color: var(--ddm-s-A400);
			}
		}
		.text-color-A00 {
			color: var(--ddm-A200);
			&:hover {
				color: var(--ddm-A100);
			}
			&:active {
				color: var(--ddm-A400);
			}
		}
	}
</style>
