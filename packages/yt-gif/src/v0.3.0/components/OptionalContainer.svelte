<script lang="ts">
	import MainOptional from './MainOptional.svelte'

	let _class = 'flex justify-content-center'
	export { _class as class }

	export let checked = false
	export let fragment = false

	export let options: {
		id: s
		tooltip: s
		name: s
		placement?: 'top' | 'bottom'
	}
</script>

<MainOptional bind:checked {...options}>{options.name}</MainOptional>
<span class:hidden={!checked} class="{_class} w-full">
	{#if fragment}
		<slot />
	{:else}
		<span>
			<slot />
		</span>
	{/if}
</span>
