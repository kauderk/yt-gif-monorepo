<script lang="ts">
	import { top_icon } from 'src/styles/roam-classes'
	import { Icon } from 'sveltestrap'

	import { onMount } from 'svelte'

	export let checked = false

	export let onOpen = (enabled: b) => {
		/* callback */
	}

	export let self = false
	export let on = ''
	export let off = self ? 'dot' : on + '-fill'
	let name = on
	export let enabled: b
	$: enabled = name == on

	export let tooltip = '...'
	export let data: { [key: s]: s } = {}
	export let placement: 'top' | 'bottom' | 'left' | 'right' = 'top'

	const setOpenClose = (open: b) => {
		if (disabled) {
			return
		}
		if (open) {
			checked = enabled
			onOpen(enabled)
		}
		flip(open)
	}
	export let up: () => b
	export let down: () => b

	const flip = (b: b) => (name = !b ? on : off)

	export let selected = false
	export let disabled = false
	export let show: b | undefined = undefined

	$: if (show != undefined) {
		flip(show)
	}

	onMount(() => flip(selected))
</script>

<span
	data-tooltip={tooltip}
	data-tooltip-conf={placement}
	{...data}
	class="hover-bg {top_icon} text-color-400"
	on:click|stopPropagation={e => setOpenClose(down())}
	on:mouseup|stopPropagation={e => setOpenClose(up())}>
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
