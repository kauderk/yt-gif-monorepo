<script lang="ts">
	import StickyNote from './StickyNote.svelte'
	import YTGIF from './graph-node/YTGIF.svelte'
	export let stickyNotesList = Array<IStickyNote>()
</script>

{#each stickyNotesList as stickyNote (stickyNote.index)}
	<StickyNote index={stickyNote.index} on:remove>
		<div slot="text" data-index={stickyNote.index}>
			<YTGIF />
		</div>
	</StickyNote>
{/each}
