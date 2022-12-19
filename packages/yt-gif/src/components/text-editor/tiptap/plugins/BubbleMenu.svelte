<script lang="ts">
	import { BubbleMenu } from 'svelte-tiptap'
	import type { createActions } from './lib/utils'
	import type { Editor } from 'svelte-tiptap'
	import type { Readable } from 'svelte/store'
	import cx from 'classnames'

	export let editor: Readable<Editor>
	export let actions: ReturnType<typeof createActions>
	$: ({ toggleBold, toggleItalic, isActive } = actions)
</script>

{#if $editor}
	<BubbleMenu editor={$editor}>
		<div data-test-id="bubble-menu" class="flex">
			<button
				class={cx('px-2 bg-black text-white/90 hover:text-white', {
					'!text-white': isActive('bold'),
				})}
				on:click={toggleBold}>bold</button>
			<button
				class={cx('px-2 bg-black text-white/90 hover:text-white', {
					'!text-white': isActive('italic'),
				})}
				on:click={toggleItalic}>italic</button>
		</div>
	</BubbleMenu>
{/if}
