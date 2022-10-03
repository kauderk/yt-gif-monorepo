<script lang="ts">
	import { getContext } from 'svelte'

	import { fly } from 'svelte/transition'
	import type { TWDetail } from '../Sub/Flow'

	export let clazz: StrSearch = undefined
	export let offsetHeight: n
	export let x: 1 | -1 = 1
	export let v: b

	let detail: TWDetail = getContext('detail') // DAMN
	const closing = () =>
		$detail.opened && v ? { x: 300 * x, duration: 500 } : { duration: 200 }
</script>

<div
	class={clazz}
	class:absolute={!$detail.opened || v}
	bind:offsetHeight
	in:fly={closing()}
	out:fly={closing()}>
	<slot />
</div>

<style>
	/* tailwind seems to override something else... */
	.absolute {
		position: absolute !important;
	}
</style>
