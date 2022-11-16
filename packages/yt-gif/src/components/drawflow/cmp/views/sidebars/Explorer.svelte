<script lang="ts">
	import Wrapper from '../../basic/Side.svelte'
	import YTAutocomplete from '../../../../../routes/Widgets/sort/YTAutocomplete.svelte'
	import FolderView from '../../tree/FolderView.svelte'
</script>

<svelte:component this={Wrapper} active="Explorer">
	<FolderView />
	<div>
		<YTAutocomplete endpoint="./app" />
	</div>
</svelte:component>

<style>
	div :global(.input) {
		background-color: inherit !important;
		border-radius: 0 !important;
	}
</style>
