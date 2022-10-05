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
<Player width="100%" />
<Styles />

<style global lang="scss">
	@import './open-props.scss';
	@import './../styles/css-variables.scss';
	@import './../styles/shades.scss';
	@import './../styles/mixin.scss';

	body {
		background-color: var(--surface3);
	}

	.hover-bg:hover {
		background-color: var(--surface5);
	}
	.sub:hover {
		background-color: var(--surface4);
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
		border-color: var(--surface4) !important;
	}
	.use-ddm-vars {
		// FIXME: style: migrar app y player a css open props 3a0fbbc26a12b2c6923e25b80ba9e8cd15bbfda2
		// &:hover and &:active should respect previous "accent colors" var(--ddm-s-A
		.bp3-menu {
			background-color: var(--surface3);
		}
		.body-inject .bp3-popover-arrow-fill {
			fill: var(--surface3);
		}

		.btn-icon-inline span.bp3-button {
			color: var(--brand1);
			&:hover {
				color: var(--brand2);
			}
			&:active {
				color: var(--brand3);
			}
		}
		.btn-icon-main span.bp3-button {
			color: var(--brand1);
			&:hover {
				color: var(--brand2);
			}
			&:active {
				color: var(--brand3);
			}
		}

		.text-color-SA00 {
			color: var(--brand1);
			&:hover {
				color: var(--brand2);
			}
			&:active {
				color: var(--brand3);
			}
		}
		.text-color-A00 {
			color: var(--brand1);
			&:hover {
				color: var(--brand2);
			}
			&:active {
				color: var(--brand3);
			}
		}
	}
</style>
