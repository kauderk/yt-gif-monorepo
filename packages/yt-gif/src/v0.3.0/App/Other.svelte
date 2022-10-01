<script lang="ts">
	import Player from '$v3/components/ytgif/Player.svelte'
	import Timestamp from '$v3/components/ytgif/Timestamp.svelte'
</script>

<Player />

<div>
	<span>hello</span>
	<span>hello</span><span><Timestamp /></span><span>hello</span>
	<span><Timestamp type="end" /></span>
	<span>hello</span>
	{#each new Array(20) as item}
		<span>hello</span>
	{/each}
</div>

<style lang="scss">
	div {
		//.roam-block {
		min-height: calc(1.5em + 8px);
		box-sizing: border-box;
		white-space: pre-wrap;
		overflow-wrap: break-word;
		margin-top: -1px;
		min-width: 100px;
		width: 100%;
		line-height: 1.5em;
		cursor: text;
		padding-top: 4px;
		padding-bottom: 4px;

		max-width: 100%;
		margin: 100px;

		span:hover {
			background: rgba(0, 174, 255, 0.212);
		}
	}
</style>
