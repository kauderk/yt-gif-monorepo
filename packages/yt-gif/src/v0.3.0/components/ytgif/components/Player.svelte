<script context="module" lang="ts">
	// prettier-ignore
	let available = ['oBM4Ip3ibjo','qTgPSKKjfVg','fuDbpn8aZr8','eGJ2an8_ujU','I2ziPw1SlH4','XNpqNXN8KL8','kYdOljz7NPg','B7ecyNfJOwo',]
</script>

<script lang="ts">
	//#region imports
	import { CreateXload } from '$lib/dom'
	import { onMount } from 'svelte'
	import {
		CheckFalsePositive,
		CreateConfigParams,
		CreateRecordID,
		GetNewID,
	} from '$v3/api-ready/setup/query'
	import { playerConfig } from '$v3/api-ready/deploy/config'
	import F from './F.svelte'
	import { createState } from './store'
	onMount(async () => {
		if (!window.YT) {
			await CreateXload('https://www.youtube.com/iframe_api')
		}
	})
	//#endregion

	export let uid = ''
	export let videoId = ''

	if (!videoId) {
		newVideoId()
	}

	export let idPrefix = 'player'
	const state = createState(idPrefix)

	const Fire = async () => {
		const search = {
			uid: 'irrelvant-uid',
			preUrlIndex: 0,
			accUrlIndex: 0,
			url: atributes.url,
			grandParentBlock,
			nestedComponentMap: <Trm_map>{},
			earlyReturnKey: '',
		}

		// don't add up false positives
		if (CheckFalsePositive({ ...search, wrapper })) {
			state.setPartial({ state: 'invalid' })
			return
		}

		deploy()

		function deploy() {
			// YT API player
			const { playerID } = atributes
			const { record } = CreateRecordID(search)
			// OnPlayerReady video params point of reference
			const config = CreateConfigParams(playerID, search.url)

			record.wTarget = new window.YT.Player(
				playerID,
				playerConfig(config)
			)
			state.setPartial({ state: 'loading' })
		}
	}

	let grandParentBlock: HTMLDivElement
	let wrapper: HTMLDivElement
	let repaint = 0

	function newVideoId() {
		return (videoId =
			available[Math.floor(Math.random() * available.length)])
	}

	let atributes = {
		targetClass: 'rm-xparser-default-yt-gif',
		dataCreation: 'null',
		url: `https://youtu.be/${newVideoId()}`,
		accUrlIndex: 0,
		playerID: GetNewID(),
		customSpan: undefined,
	}
	function newAttributes() {
		atributes.url = `https://youtu.be/${newVideoId()}`
		atributes.playerID = GetNewID()

		return atributes
	}
</script>

<div class="dwn-yt-gif-player-container" id="F">
	<div class="dropdown-content" bind:this={grandParentBlock} id="F">
		{#key repaint}
			<F bind:wrapper attr={newAttributes()} />
		{/key}
	</div>
</div>

<button on:click={Fire}>Fire</button>
<button on:click={() => (repaint += 1)}>Repaint</button>

<style>
	button {
		border: 1px dotted black;
		padding: 0.25em 0.5em;
		background: rgba(128, 128, 128, 0.238);
	}
</style>
