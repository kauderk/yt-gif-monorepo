<script context="module">
	let count = -1
	let available = [
		'oBM4Ip3ibjo',
		'qTgPSKKjfVg',
		'fuDbpn8aZr8',
		'eGJ2an8_ujU',
		'I2ziPw1SlH4',
		'XNpqNXN8KL8',
		'kYdOljz7NPg',
		'B7ecyNfJOwo',
	]
</script>

<script lang="ts">
	import { onMount } from 'svelte'
	import parse from '$v3/api-ready/parse'
	import { Deploy } from '$v3/api-ready/query'
	import { load } from '$v3/api-ready/setup/load-yt-iframe'

	count += 1
	const id = 'yt-gif-player-' + count

	let YT: any
	onMount(() => load((yt: any) => (YT = yt)))

	export let videoId = ''
	export let type: 'click' | 'hover' = 'click'
	$: handler = type === 'click' ? Fire : null

	if (!videoId) {
		videoId = available[Math.floor(Math.random() * available.length)]
	}

	const Fire = () => {
		const res = parse(id, videoId)
		if (!res) return console.warn('failed to load video')
		Deploy({ ...res }, YT)
	}
	let player: HTMLDivElement
</script>

<div class="outter">
	<div class="wrapper dont-focus-block" data-anim="pulse input thumbnail">
		<!-- @ts-ignore -->
		<div class="iframe-wrapper" bind:this={player}>
			{#key videoId}
				<div {id} />
			{/key}
		</div>
		<div class="controls" style:display="none">
			<slot />
		</div>
	</div>
</div>

<svelte:window
	on:keydown={() => {
		if (player?.matches(':hover')) {
			handler?.()
		}
	}} />

<style lang="scss">
	.outter > .wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	// IFRAME
	.iframe-wrapper :global(iframe) {
		width: 100%;
		height: 100%;
	}
	// location: mid center
	.controls {
		height: fit-content;
		width: 100%;

		display: flex;
		gap: 10px;

		position: absolute;
		bottom: 20%; // Y axis
		//transform: translateY(15px);

		justify-content: center;
		align-items: center;

		cursor: initial;

		z-index: 4;
	}
	// ---------------------------------------------
	.wrapper,
	.iframe-wrapper {
		display: -webkit-inline-box;
	}
	// supported target components
	.outter > :is(.rm-xparser-default-yt-gif,.rm-video-player__spacing-wrapper),
	// video size
	.wrapper,
	.iframe-wrapper {
		height: 100%;
		aspect-ratio: 16 / 9;
	}
	// Hmmm yes go on
	.wrapper {
		// multiple videos are annoying and too bright
		filter: brightness(0.75);
		position: relative;

		// &.dont-focus-block {
		// 	margin: 2px;
		// }
	}
	.outter {
		height: 100%;
		aspect-ratio: 16 / 9;
		cursor: initial;
	}
	// ----------------------
	// initialize_yt_gif_on_mouseenter feature
	[data-anim*='input'] {
		background: var(--ddm-600);
		border-radius: 10px;
	}
	[data-anim*='thumbnail'] {
		background-image: url();
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}
	[data-anim*='pulse'] {
		cursor: pointer;
		animation: pulse 6s infinite;
		transition: 0.5s all ease;
		&:hover {
			animation: none;
		}
	}
	@keyframes pulse {
		0% {
			box-shadow: inset 0 0 2px 1px var(--ddm-500);
		}
		50% {
			box-shadow: inset 0 0 8px 4px var(--ddm-500);
		}
		100% {
			box-shadow: inset 0 0 2px 1px var(--ddm-500);
		}
	}
</style>
