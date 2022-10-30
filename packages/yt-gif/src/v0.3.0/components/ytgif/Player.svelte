<script lang="ts">
	import Player from './components/Player.svelte'
	import Formatters from './components/Formatters.svelte'
	import TimeDisplay from './components/TimeDisplay.svelte'
	import Inserts from './components/Inserts.svelte'
	import type { ComponentProps } from 'svelte'

	export let width = '300px'
	export let props: Partial<ComponentProps<Player>> = {}
</script>

<div style="width: {width}">
	<Player {...props}>
		<Formatters />
		<TimeDisplay />
		<Inserts />
	</Player>
</div>

<style lang="scss">
	div {
		overflow: auto;
		overscroll-behavior: none; /* so you can scroll back and forward in time and not the actual document */
		:global(.popover) {
			background: transparent;
			padding: 0;
		}
		:global(.controls > span > .popover) {
			transition: all 0.2s;

			color: transparent;
			opacity: 0;
			border-color: transparent;
			&:hover {
				opacity: 1;
				color: inherit;
			}
		}
	}
</style>
