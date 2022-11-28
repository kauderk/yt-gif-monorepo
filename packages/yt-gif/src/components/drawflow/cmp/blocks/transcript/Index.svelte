<script lang="ts">
	import type { TranscriptResponse } from 'youtube-transcript'
	export let row = {
		text: 'Title',
		duration: 0,
		offset: 0,
	}
	export let transcript: TranscriptResponse[] = [row]
</script>

<div>
	{#each transcript as { text, duration, offset }}
		<div>{text}</div>
		<div>
			duration: {duration}
		</div>
		<div>
			timestamp: {offset}
		</div>
	{/each}
</div>
