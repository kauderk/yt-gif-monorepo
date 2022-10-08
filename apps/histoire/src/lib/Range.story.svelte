<script>
	export let Hst
	import Range from '@packages/yt-gif/src/v0.3.0/components/Range/Range.svelte'
	import { iframe_buffer_slider } from '@packages/yt-gif/src/v0.3.0/App/Miscellaneous.ts'
</script>

<Hst.Story title="Range">
	<Range options={iframe_buffer_slider.range} />
</Hst.Story>
