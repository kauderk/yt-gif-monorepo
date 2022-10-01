<svelte:options accessors />

<script lang="ts">
	import '../../../../styles/drop-down-menu.scss'

	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'
	import { slide } from 'svelte/transition'
	import { Detail, Flow } from '$v3/components/Sub/Flow'

	export let type = 'sub-ddm'

	let el: HTMLElement
	export let forceOpen = false
	export let state = <ReturnType<typeof Flow>>{}

	const detail = writable({ ...Detail, forceOpen })

	onMount(async () => {
		state = Flow(el, detail)
		state.openClose(forceOpen)
	})
</script>

<svelte:window on:click={state.hideIfBlured} />
<div
	transition:slide
	class="ddm-slot {type}"
	class:hidden={!$detail.opened}
	class:show={$detail.opened}
	bind:this={el}
	on:mouseenter={() => state.open(true)}
	on:mouseleave={() => state.tryClose()}>
	<slot {...state} focus={$detail.anyFocus} />
</div>

<style>
	.show {
		z-index: 10;
	}
</style>
