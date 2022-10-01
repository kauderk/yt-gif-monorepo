<script lang="ts">
	import SubBtn from '../../components/Sub/Button.svelte'

	import { isSelected, getOption } from '$v3/lib/backend-frontend/option'

	import { createEventDispatcher, onMount } from 'svelte'
	const dispatch = createEventDispatcher()

	// prettier-ignore
	type TOption = { name: s; 'data-tooltip'?: s; hide?: b; selected?: b; disabled?: b }

	export let single: undefined | true = undefined
	let multiple: BolSearch = single !== true ? true : undefined
	export let props: {
		id: s
		row?: true
		options: { [key: string]: TOption }
	}

	// prettier-ignore
	const handleChange = (e:Event & { currentTarget: EventTarget & HTMLSelectElement; }) => {
		// select
		dispatch('change', e)
		// option
		const value = e.currentTarget.value
		dispatch('option', {
			value,
			selected: !!isSelected(e.currentTarget,value),
			selection: Array.from(select.selectedOptions).map(o => o.value)
		})
	}
	let select: HTMLSelectElement
	const change = (v: s, b: b) => {
		props.options[v].selected = b
		getOption(select, v).selected = b
	}
	const update = (v: s, selected: b) => {
		if (single) {
			Object.keys(props.options).forEach(v => change(v, false))
		}
		change(v, selected)
		select.dispatchEvent(new Event('change'))
	}
</script>

<div class="options" class:horizontal={props.row}>
	{#each Object.entries(props.options) as [v, o]}
		<span data-tooltip={o['data-tooltip']} class:hidden={o.hide}>
			<SubBtn
				on:change={e => update(v, e.detail)}
				bind:selected={o.selected}
				bind:disabled={o.disabled}>{o.name}</SubBtn>
		</span>
	{/each}
	<slot />
</div>

<!-- prettier-ignore -->
<select class="hidden" {multiple} bind:this={select} id={props.id} on:change={handleChange}>
	{#each Object.entries(props.options) as [value, o]}
		<option {value} {...o} selected={o.selected}>{o.name}</option>
	{/each}
</select>

<style>
	.options {
		display: flex;
		flex-direction: column;
		align-items: flex-end;

		gap: 7px;
	}
	.horizontal {
		flex-direction: row;
		align-items: center;

		gap: 15px;
	}
</style>
