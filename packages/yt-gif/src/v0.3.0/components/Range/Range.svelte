<script lang="ts">
	import { onMount } from 'svelte'
	import { UpdateOnScroll_RTM } from '$v3/init/dom/scroll'
	import type { TRange } from '$v3/App/Miscellaneous'

	let scroll: HTMLInputElement
	onMount(() => UpdateOnScroll_RTM(scroll)) // I love this shit

	export let options: TRange
</script>

<div>
	<span class="flex">
		<input type="range" {...options.attr} bind:this={scroll} />
		<label for={options.attr.id} {...options.counter}
			>{options.attr.value}</label>
	</span>
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		align-items: normal;

		width: 100%;

		border-radius: 5px;
	}
	.flex {
		display: flex;
		margin: 0px 5px;
		gap: 10px;
	}
	input {
		display: block;
		width: 100%;

		margin-left: 0;

		width: 100%;
		cursor: col-resize;
	}
	label {
		display: block;

		min-width: 12.8px;
		max-width: 100%;

		margin-left: 0;
		margin-bottom: 5px;

		text-decoration: none;
		font-weight: normal;
		text-align: center;

		color: var(--ddm-100);

		&:active {
			color: var(--ddm-50);
		}
	}

	input {
		opacity: 0.8;
		accent-color: var(--ddm-s-300);
	}
</style>
