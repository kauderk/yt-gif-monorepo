<script lang="ts">
	import Modal from '$cmp/drawflow/cmp/views/layouts/Modal.svelte'
	import UrlProcesor from '$cmp/drawflow/cmp/views/layouts/youtube/UrlProcesor.svelte'
	import { state } from '$cmp/drawflow/cmp/basic/store'
	import { onMount } from 'svelte'
	import { getSugestion, LoadJQuery } from './query'

	let jq: any = null
	onMount(() => LoadJQuery().then($ => (jq = $)))

	let inputElm: HTMLInputElement
	let suggestions: HTMLElement

	// run this block when ever these variables change
	$: if (inputElm && suggestions && jq) {
		// clean up previous suggestions
		try {
			jq('#youtube').autocomplete('destroy')
		} catch (error) {}

		// register to get suggestions
		jq('#youtube').autocomplete({
			source: getSugestion,
			appendTo: suggestions,
			// @ts-ignore
			select: function (_, ui) {
				console.log(ui.item)
			},
		})
	}

	function showSelectedSuggestion() {
		console.log(inputElm.value)
	}
</script>

<button on:click={() => ($state.active = 'Layouts')}>open UrlProcesor</button>
<Modal
	isOpen={$state.active == 'Layouts'}
	on:close={() => ($state.active = 'fullGraph')}>
	<div>
		<UrlProcesor />
		<div class="arama">
			<form action="" on:submit|preventDefault>
				<h2>Youtube API jQuery AutoComplete</h2>
				<div class="ui-widget">
					<label for="youtube">Youtube Arama: </label>
					<input id="youtube" bind:this={inputElm} />
					<button id="submit" on:click={showSelectedSuggestion}
						><i class="fa-solid fa-magnifying-glass" /></button>
				</div>
				<div class="suggestions" bind:this={suggestions} />
			</form>
		</div>
		<div id="sonuc" />
	</div>
</Modal>

<style>
	div {
		width: auto;
		aspect-ratio: 1 / 1;
		position: inherit;
	}
	:global(span.ui-helper-hidden-accessible) {
		display: none;
	}
</style>
