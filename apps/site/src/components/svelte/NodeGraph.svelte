<script is:inline>
	import { onMount } from 'svelte'

	onMount(() => {
		// @ts-ignore
		new Graph({
			target: document.querySelector('yt-gif-graph'),
		})
	})
</script>

<yt-gif-graph />

<style>
	yt-gif-graph {
		font-size: 16px;
	}
	yt-gif-graph > :global(div):first-child {
		text-align: center;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		gap: 1em;
	}
	yt-gif-graph :global(:is(button, label)) {
		display: inline-block;
		font-weight: 400;
		text-align: center;
		white-space: nowrap;
		vertical-align: middle;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		border: 0px solid transparent;
		padding: 0.375rem 0.75rem;
		font-size: 1rem;
		line-height: 1.5;
		border-radius: 0.25rem;
		transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
			border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
		font-size: 15px;
		transition: all 0.4s;
		background: rgb(170, 21, 51);
		border-color: var(--ddm-A100);
		color: white !important;
		padding: 11px 28px;
		font-size: 13px;
		letter-spacing: 0.9px;
		font-weight: 600;
		text-transform: uppercase;
	}
	yt-gif-graph :global(label) {
		filter: brightness(90%);
	}
	yt-gif-graph :global(.card) {
		border-color: #7c7467 !important;
	}


</style>
