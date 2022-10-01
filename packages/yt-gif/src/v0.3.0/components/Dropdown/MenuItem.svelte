<script lang="ts">
	import { ddm_item } from 'src/styles/roam-classes'

	import Icon from './Icon.svelte'
	import IconButton from './IconButton.svelte'
	import type { TVisit } from './types'

	export let leftIcon: s | null = null
	export let rightIcon: s | null = null
	export let go: Function

	export let visit: TVisit | null = null
	const to = () => {
		go()
		visit?.set(leftIcon && rightIcon ? 'right' : leftIcon ? 'left' : null)
	}
</script>

<div class={ddm_item} data-visited={visit?.get()} on:click|preventDefault={to}>
	<span data-visit={'left'}>
		<IconButton path={leftIcon ?? ''} />
	</span>
	<!-- svelte-ignore a11y-missing-attribute -->
	<a class="text-color-100"><slot /></a>

	{#if rightIcon}
		<span data-visit={'right'} class="text-color-SA00">
			<Icon path={rightIcon ?? ''} />
		</span>
	{/if}
</div>

<style lang="scss">
	div {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 8px;
		align-items: center;
		transition: background var(--speed);

		&[data-visited*='left'] > [data-visit='left'],
		&[data-visited*='right'] > [data-visit='right'] {
			font-size: 1.5em;
			filter: brightness(120%);
		}
	}
</style>
