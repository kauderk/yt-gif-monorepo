<script lang="ts">
	import Wrapper from '../../basic/Side.svelte'
	import Tree from '../../tree/Index.svelte'
	import YTAutocomplete from '../../../../../routes/Widgets/sort/YTAutocomplete.svelte'
</script>

<svelte:component this={Wrapper} active="Explorer">
	<Tree />
	<div>
		<YTAutocomplete endpoint="Widgets/sort" />
	</div>
</svelte:component>

<style>
	div :global(.input) {
		background-color: inherit !important;
		border-radius: 0 !important;
	}
</style>
