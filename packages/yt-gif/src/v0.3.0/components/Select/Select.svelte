<script lang="ts">
	import { isSelected } from '$v3/lib/backend-frontend/option'

	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	import type { TOptions } from './Options'

	export let options: TOptions

	export let id: s
	let keys = Object.keys(options)
	export let value = keys.find(k => options[k].selected) || keys[0]

	// prettier-ignore
	const handleChange = (e:Event & { currentTarget: EventTarget & HTMLSelectElement; }) => {
		// select
		dispatch('change', e)
		// option
		const value = e.currentTarget.value
		dispatch('option', {
			value,
			selected: !!isSelected(e.currentTarget,value)
		})
	}
	const label = (b: b) => {
		if (options['hide'])
			options['hide'].name = (b ? 'Show' : 'Hide') + ' Tutorials'
	}
	$: label(value == 'hide')
</script>

<span data-tooltip={options[value]['data-tooltip']}>
	<select bind:value {id} on:change={handleChange} class="text-color-100">
		{#each Object.entries(options) as [value, o]}
			<option {value} {...o} title={o['data-tooltip']}>{o.name}</option>
		{/each}
	</select>
</span>

<style lang="scss">
	select {
		align-self: center;
		height: fit-content;

		background-color: var(--ddm-400) !important;

		border: 1px solid var(--ddm-300);
		margin: 5px 0px;
		padding: 3px;
		width: 100%;

		cursor: pointer;
	}
</style>
