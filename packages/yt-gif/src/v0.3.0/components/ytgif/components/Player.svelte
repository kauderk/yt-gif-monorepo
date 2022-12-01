<script context="module" lang="ts">
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
	import { CreateXload } from '$lib/dom'
	import { onYouTubePlayerAPIReady } from '$v3/api-ready'
	import F from './F.svelte'

	count += 1
	const id = 'yt-gif-player-' + count

	onMount(async () => {
		if (!window.YT) {
			await CreateXload('https://www.youtube.com/iframe_api')
			// @ts-ignore
			//window.onYouTubeIframeAPIReady
		}
	})

	export let videoId = ''
	export let type: 'click' | 'hover' = 'click'
	$: handler = type === 'click' ? Fire : null

	if (!videoId) {
		videoId = available[Math.floor(Math.random() * available.length)]
	}

	const Fire = () => {
		onYouTubePlayerAPIReady({
			wrapper,
			dataCreation: 'force-awaiting',
			targetClass: 'yt-gif-ddm-tutorial',
			message: 'testing manual ty gif tutorial',
		})
	}
	let wrapper: HTMLDivElement
	/*
	 .rm-block__input
	 data-video-url="https://youtu.be/{id}"
	 yt-gif-timestamp
	*/
	let repaint = 0
</script>

<div class="dwn-yt-gif-player-container" id="F">
	<div class="dropdown-content" id="F">
		<!-- container state -->
		<div
			class="roam-block-container"
			data-yt-gif-block-uid={'0123456789'}
			id="yt-gif-block"
			data-timestamp-observer={undefined}>
			<!-- input -->
			<div class="rm-block__input" id="input-block">
				{#key repaint}
					<F bind:wrapper />
				{/key}
			</div>
		</div>
	</div>
</div>

<button on:click={Fire}>Fire</button>
<button on:click={() => repaint + 1}>Repaint</button>
