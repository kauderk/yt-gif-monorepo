<script lang="ts">
	import { root } from 'src/styles/roam-classes'

	import Content from './Content.svelte'
	// @ts-ignore
	import inject from 'svelte-inject'
	import Overlay from './Overlay.svelte'

	export let props: any
	export let body = false
	export let hidden = true
	export let onOpen = () => {}
	export let setOpen = () => {}

	const handleOutClick = () => {
		if (!props.overlay) {
			setOpen()
		}
	}
</script>

{#if body}
	{#if !hidden}
		<Overlay {...props} on:setOpen={setOpen} />
	{/if}
	<div class="body-inject {root}" use:inject class:hidden>
		{#if !hidden && props.action == 'click'}
			<Overlay
				{...props}
				overlayColor="transparent"
				on:setOpen={setOpen} />
		{/if}
		<Content
			{...props}
			on:open={onOpen}
			on:setOpen={setOpen}
			on:outclick={handleOutClick}>
			<slot />
		</Content>
	</div>
{:else}
	<Content {...props} on:open={onOpen} on:setOpen={setOpen}>
		<slot />
	</Content>
{/if}
