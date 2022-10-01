<script lang="ts">
	import Range from './Range.svelte'
	import type { TLabel, TRange } from '$v3/App/Miscellaneous'
	export let options: { label: TLabel; range: TRange }
</script>

<div class="rounded-2">
	<span {...options.label}>{options.label.name}</span>
	<Range options={options.range} />
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		align-self: center;
		width: 97%;
		padding: 0px 10px;
	}
	span {
		font-size: 0.9em;
		cursor: help;
		text-align: center;

		color: var(--ddm-200);
		&:hover {
			color: var(--ddm-100);
		}
		&:active {
			color: var(--ddm-50);
		}
	}
</style>
