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

	let value: s | undefined
	let text: any

	const tryExportJSON = () => {
		// https://stackoverflow.com/a/72503071/13914180
		let data: any
		try {
			data = $ctx.editor.export()
			const blob = new Blob([JSON.stringify(data)], {
				type: 'application/json',
			})
			const url = URL.createObjectURL(blob)
			const link = document.createElement('a')
			link.download = 'data.json'
			link.href = url
			link.click()
			URL.revokeObjectURL(url) // Object URLs should be revoked after use
		} catch (error) {
			console.error(error)
			console.log(data)
		}
	}
</script>

<svelte:component this={Wrapper} active="Explorer">
	<form
		on:submit|preventDefault={() => {
			if (text) {
				try {
					const drawflow = JSON.parse(text)
					$ctx.editor.import(drawflow, true)
				} catch (error) {
					console.error(error)
				}
			}
			text = undefined
		}}
		class="import-export">
		<div class="flex">
			<input
				accept="application/json"
				bind:value={text}
				type="text"
				class="file-input file-input-bordered file-input-xs w-full max-w-xs" />
			<button class="btn btn-xs" on:click={tryExportJSON} type="submit"
				>Import</button>
			<button class="btn btn-xs" on:click={tryExportJSON}>Export</button>
		</div>
	</form>
	<form
		on:submit|preventDefault={() => {
			if (value) $ctx.editor.addModule(value)
			value = undefined
		}}
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
	<progress class="progress" value="0" max="100" />

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
