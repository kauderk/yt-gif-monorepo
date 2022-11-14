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
		<span data-visit={'right'}>
			<!--text-color-SA00-->
			<Icon path={rightIcon ?? ''} />
		</span>
	{/if}
</div>

<style lang="scss">
	div {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 12px;
		align-items: center;
		transition: background var(--speed);
		background-color: rgba(42, 42, 42, 0.705);
		border-radius: 7px;
		margin: 12px 0 25px 0;
		padding: 18px;
		font-size: 15px;
		font-weight: 700;
		border: 1px solid rgba(255, 255, 255, 0.283);
		width: 100%;
		&[data-visited*='left'] > [data-visit='left'],
		&[data-visited*='right'] > [data-visit='right'] {
			font-size: 1.5em;
			filter: brightness(120%);
		}
	}

	div:hover {
		background-color: rgba(76, 76, 76, 0.705);
		box-shadow: none;
		color: rgb(255, 255, 255);
		border: 1px solid rgba(248, 255, 219, 0.322);
	}
</style>
