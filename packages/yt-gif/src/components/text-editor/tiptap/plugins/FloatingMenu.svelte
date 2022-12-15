<script lang="ts">
	import { FloatingMenu } from 'svelte-tiptap'
	import type { createActions } from './lib/utils'
	import type { Editor } from 'svelte-tiptap'
	import type { Readable } from 'svelte/store'
	import cx from 'classnames'

	export let editor: Readable<Editor>
	export let actions: ReturnType<typeof createActions>
	$: ({ toggleBold, toggleItalic, isActive, toggleHeading } = actions)
</script>

{#if $editor}
	<FloatingMenu editor={$editor}>
		<div data-test-id="floating-menu">
			<button
				class={cx(
					'border border-black rounded px-2 hover:bg-black hover:text-white',
					{
						'bg-black text-white': isActive('heading', {
							level: 1,
						}),
					}
				)}
				on:click={() => toggleHeading(1)}>h1</button>
			<button
				class={cx(
					'border border-black rounded px-2 hover:bg-black hover:text-white',
					{
						'bg-black text-white': isActive('bold'),
					}
				)}
				on:click={toggleBold}>bold</button>
			<button
				class={cx(
					'border border-black rounded px-2 hover:bg-black hover:text-white',
					{
						'bg-black text-white': isActive('italic'),
					}
				)}
				on:click={toggleItalic}>italic</button>
		</div>
	</FloatingMenu>
{/if}
