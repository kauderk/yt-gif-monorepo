<script lang="ts">
	import { top_icon } from 'src/styles/roam-classes'
	import { Icon } from 'sveltestrap'

	import { createEventDispatcher, onMount } from 'svelte'
	const dispatch = createEventDispatcher()

	export let checked = false

	export let click = (enabled: b) => {
		checked = enabled
	}

	export let self = false
	export let on = ''
	export let off = self ? 'dot' : on + '-fill'
	let name = on
	export let selected = false
	$: enabled = name == on

	export let tooltip = '...'
	export let data: { [key: s]: s } = {}
	export let placement: 'top' | 'bottom' | 'left' | 'right' = 'top'

	export const setOpenClose = (open: b) => {
		if (open) {
			click(enabled)
		}
		flip(open)
		dispatch('flip', enabled)
	}

	const flip = (b: b) => (name = !b ? on : off)
	export let show: b | undefined = undefined

	$: if (show != undefined) {
		flip(show)
	}

	onMount(() => flip(selected))

	// I could use some {#key blocks...}
	export let type: 'toggle' | 'check' | 'disabled' = 'toggle'
	let tout: any
	let lastTout: any
	export let propagation = false
	const evt = (e: Event) => (propagation ? e.stopPropagation() : '')
</script>

<span
	data-tooltip={tooltip}
	data-tooltip-conf={placement}
	{...data}
	class="hover-bg {top_icon} text-color-400"
	on:mouseup={e => {
		evt(e)
		if (type == 'check') {
			setOpenClose(!enabled)
		} else if (lastTout == tout && type == 'toggle') {
			setOpenClose(false)
		}
	}}
	on:click={e => {
		evt(e)
		if (type == 'check') {
			setOpenClose(enabled)
		} else if (type == 'toggle') {
			setOpenClose(true)
			clearTimeout((lastTout = tout))
			tout = setTimeout(() => flip(false), 200)
		}
	}}>
	<Icon {name} />
</span>

<style lang="scss">
	span {
		all: unset;

		min-width: 24px;
		border-radius: 5px;

		display: flex;
		align-items: center;
		justify-content: center;

		border: transparent 1px solid;

		padding: 5px;
		&:focus {
			outline: transparent auto 0px;
		}
	}
</style>
