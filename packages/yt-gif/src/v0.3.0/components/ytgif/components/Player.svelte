<script context="module" lang="ts">
	// prettier-ignore
	let available = ['oBM4Ip3ibjo','qTgPSKKjfVg','fuDbpn8aZr8','eGJ2an8_ujU','I2ziPw1SlH4','XNpqNXN8KL8','kYdOljz7NPg','B7ecyNfJOwo',]
</script>

<script lang="ts">
	//#region imports
	import { CreateXload } from '$lib/dom'
	import { onMount } from 'svelte'
	import { URLResults } from '$v3/api-ready/setup/url-result'
	import {
		CheckFalsePositive,
		CreateConfigParams,
		CreateRecordID,
		GetNewID,
	} from '$v3/api-ready/setup/query'
	import { playerConfig } from '$v3/api-ready/deploy/config'
	import F from './F.svelte'
	onMount(async () => {
		if (!window.YT) {
			await CreateXload('https://www.youtube.com/iframe_api')
		}
	})
	//#endregion

	export let videoId = ''

	if (!videoId) {
		newVideoId()
	}

	let playerID: s

	const Fire = async () => {
		// search and get urlIndex and uid
		const uidResult = await URLResults(wrapper)
		const { url } = uidResult

		// don't add up false positives
		if (CheckFalsePositive({ ...uidResult, wrapper })) return null

		// OnPlayerReady video params point of reference
		const configParams = CreateConfigParams(playerID, url)

		// target's point of reference
		const { record } = CreateRecordID(uidResult)

		deploy()

		return wrapper

		function deploy() {
			record.wTarget = new window.YT.Player(
				playerID,
				playerConfig(configParams)
			)
		}
	}

	let wrapper: HTMLDivElement
	let repaint = 0

	function newVideoId() {
		return (videoId =
			available[Math.floor(Math.random() * available.length)])
	}
	function newPlayerID() {
		return (playerID = GetNewID())
	}
</script>

<div class="dwn-yt-gif-player-container" id="F">
	<div class="dropdown-content" id="F">
		{#key repaint}
			<F
				bind:wrapper
				attr={{
					targetClass: 'rm-xparser-default-yt-gif',
					dataCreation: 'null',
					url: `https://youtu.be/${newVideoId()}`,
					accUrlIndex: 0,
					playerID: newPlayerID(),
					customSpan: undefined,
				}} />
		{/key}
	</div>
</div>

<button on:click={Fire}>Fire</button>
<button on:click={() => (repaint += 1)}>Repaint</button>
