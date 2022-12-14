<script lang="ts">
	import Wrapper from '../../basic/Side.svelte'
	import YTAutocomplete from '../../../../../routes/Widgets/sort/YTAutocomplete.svelte'
	import FolderView from '../../tree/FolderView.svelte'
	import { getContext } from '../../store'

	const ctx = getContext()

	$: Modules = Object.entries($ctx.editor?.drawflow?.drawflow ?? []).map(
		([key, { data }]) => ({
			Module: key,
			ModuleData: data,
		})
	)

	let value: s
</script>

<svelte:component this={Wrapper} active="Explorer">
	<form
		on:submit|preventDefault={() => $ctx.editor.addModule(value)}
		class="add-module">
		<input
			type="text"
			placeholder="New Module"
			bind:value
			class="input input-bordered input-sm w-full max-w-xs" />
		<button class="btn btn-sm gap-2" type="submit">
			<i class="fa-light fa-plus" />
		</button>
	</form>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	{#key Modules}
		{#each Modules as entry}
			<div class="folder-view">
				<FolderView {...entry} />
			</div>
		{/each}
	{/key}
</svelte:component>

<style>
	.add-module {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}
	.folder-view {
		display: block;
	}
</style>
