<script>
	import { state } from '../../basic/store'
	import Layouts from './Layouts.svelte'
	import Modal from './Modal.svelte'
	import Add from './views/Add.svelte'
	import Chips from './views/Chips.svelte'
	import Settings from './views/Settings.svelte'
	import YouTubeIDs from './youtube/YouTubeIDs.svelte'
	import Playlist from './youtube/Playlist.svelte'
	import UrlProcesor from './youtube/UrlProcesor.svelte'
</script>

<Modal
	isOpen={$state.active == 'Layouts'}
	on:close={() => ($state.active = 'fullGraph')}>
	<div>
		<UrlProcesor />
	</div>
</Modal>

<style>
	div {
		width: auto;
		aspect-ratio: 1 / 1;
		position: inherit;
	}
</style>
