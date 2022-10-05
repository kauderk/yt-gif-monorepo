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
	@import 'https://unpkg.com/open-props';
	@import './../styles/css-variables.scss';
	@import './../styles/shades.scss';
	@import './../styles/mixin.scss';

	.roam-app {
		--brand1-light: var(--orange-6);
		--brand2-light: var(--orange-8);
		--brand3-light: var(--orange-9);
		--text1-light: var(--gray-8);
		--text2-light: var(--gray-7);
		--surface1-light: var(--gray-0);
		--surface2-light: var(--gray-1);
		--surface3-light: var(--gray-2);
		--surface4-light: var(--gray-3);
		--surface5-light: var(--gray-4);
	}

	.hover-bg:hover {
		background-color: var(--surface5-light);
	}
	.sub:hover {
		background-color: var(--surface4-light);
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
		border-color: var(--surface4-light) !important;
	}
	.use-ddm-vars {
		.bp3-menu {
			background-color: var(--surface3-light);
		}
		.body-inject .bp3-popover-arrow-fill {
			fill: var(--surface3-light);
		}

		.btn-icon-inline span.bp3-button {
			color: var(--brand1-light);
			&:hover {
				color: var(--brand2-light);
			}
			&:active {
				color: var(--brand3-light);
			}
		}
		.btn-icon-main span.bp3-button {
			color: var(--brand1-light);
			&:hover {
				color: var(--brand2-light);
			}
			&:active {
				color: var(--brand3-light);
			}
		}

		.text-color-SA00 {
			color: var(--brand1-light);
			&:hover {
				color: var(--brand2-light);
			}
			&:active {
				color: var(--brand3-light);
			}
		}
		.text-color-A00 {
			color: var(--brand1-light);
			&:hover {
				color: var(--brand2-light);
			}
			&:active {
				color: var(--brand3-light);
			}
		}
	}
</style>
