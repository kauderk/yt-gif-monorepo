<script lang="ts">
	import { state } from '../../basic/store'
	import Layouts from './Layouts.svelte'
	import Modal from './Modal.svelte'
	import Tab from './Tab.svelte'
	import Add from './views/Add.svelte'
	import Chips from './views/Chips.svelte'
	import Settings from './views/Settings.svelte'
	import YouTubeIDs from './youtube/YouTubeIDs.svelte'
	import Playlist from './youtube/Playlist.svelte'
	import UrlProcesor from './youtube/UrlProcesor.svelte'
	import Idle from './youtube/Idle.svelte'
	import { layout } from './store'
	import { onMount } from 'svelte'

	const tabs = {
		Layouts: { cmp: Layouts },
		Add: { cmp: Add },
		Chips: { cmp: Chips },
		Settings: { cmp: Settings },
		YouTubeIDs: { cmp: YouTubeIDs },
		Playlist: { cmp: Playlist },
		UrlProcesor: { cmp: UrlProcesor },
		Idle: { cmp: Idle },
	}
	onMount(() => layout.useLocalStorage())
</script>

<Modal
	isOpen={$state.active == 'Layouts'}
	on:close={() => ($state.active = 'fullGraph')}>
	<div class="wrapper">
		<div class="tabs">
			{#each Object.keys(tabs) as k}
				<Tab value={k} bind:layout={$layout}>{k}</Tab>
			{/each}
		</div>
		<br />
		<svelte:component this={tabs[$layout].cmp} />
	</div>
</Modal>

<style>
	.wrapper {
		width: auto;
		aspect-ratio: 1 / 1;
		position: inherit;
	}
	.tabs {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
</style>
