<script>
	//import '../styles/css-variables.scss'
	import { Styles } from 'sveltestrap'
	import '../styles/tooltip.scss'

	debugger
	console.log('hello')
	import SvelteTheme from 'svelte-themes/SvelteTheme.svelte'
</script>

<Styles />
<SvelteTheme
	attribute="data-theme-ytgif"
	enableColorScheme={false}
	browser={true} />

<slot />

<style global lang="scss">
	@import './../styles/css-variables.scss';
	@import './../styles/shades.scss';
	@import './../styles/mixin.scss';

	@tailwind base;
	@tailwind components;
	@tailwind utilities;
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
	}
	.iddle:hover {
		opacity: 1;
	}
	.ddmFocus {
		border-color: var(--ddm-s-700) !important;
	}
	.use-ddm-vars {
		.bp3-menu {
			background-color: var(--ddm-500);
		}
	}
</style>
