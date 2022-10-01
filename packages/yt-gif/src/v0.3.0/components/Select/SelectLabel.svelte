<script lang="ts">
	import type { TOptions } from './Options'
	import Select from './Select.svelte'

	type TLabel = {
		id: s
		'data-tooltip'?: s
		name: s
	}
	export let options = {
		label: <TLabel>{},
		options: <TOptions>{},
	}
	const _ = options.label
</script>

<div class="wrapper rounded-2">
	<label for={_.id} data-tooltip={_['data-tooltip']}>{_.name}</label>
	<Select options={options.options} id={_.id} on:change on:option />
</div>

<style lang="scss">
	.wrapper {
		display: grid;
		width: 100%;
		grid-template-columns: 0.9fr 1fr;
		align-items: center;
		justify-content: center;
		gap: 1em;
	}
	label {
		justify-self: end;

		width: max-content;

		margin: 5px 0px;
		padding: 0.1em 0px;

		border: 1pxsolidvar (--ddm-400);
		border-radius: 5px;

		color: var(--ddm-200);
		cursor: default;
	}
</style>
