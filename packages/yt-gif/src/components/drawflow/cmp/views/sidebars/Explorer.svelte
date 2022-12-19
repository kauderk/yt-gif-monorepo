<script lang="ts">
	import Wrapper from '../../basic/Side.svelte'
	import FolderView from '../../tree/FolderView.svelte'
	import { getContext } from '../../store'
	import { onMount } from 'svelte'
	import { listenAndRefreshEditor } from '$cmp/drawflow/lib/refresh'
	import type { DrawflowExport } from '$cmp/drawflow/src/drawflow/types'

	const ctx = getContext()

	let CopyModules: DrawflowExport
	onMount(() => {
		let unsub: Function
		unsub = ctx.subscribe(o => {
			if ($ctx.editor?.drawflow) {
				listenAndRefreshEditor(
					ctx,
					() => (CopyModules = $ctx.editor?.drawflow)
				)
				unsub?.()
			}
		})
	})

	$: Modules = Object.entries(CopyModules?.drawflow ?? []).map(
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
			// FIXME!
			$ctx.editor.drawflow = $ctx.editor.drawflow
			//
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
			console.log(error)
			console.log(data)
		}
	}
</script>

<svelte:component this={Wrapper} active="Explorer">
	<form
		on:submit|preventDefault={e => {
			if (text) {
				try {
					const drawflow = JSON.parse(text)
					$ctx.editor.import(drawflow, true)
				} catch (error) {
					console.log(error)
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
			<button class="btn btn-xs" type="submit">Import</button>
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
