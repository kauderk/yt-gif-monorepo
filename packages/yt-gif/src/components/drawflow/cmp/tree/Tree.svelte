<script>
	import TreeLeaf from './TreeLeaf.svelte'
	import { onMount } from 'svelte'
	import { createEventDispatcher } from 'svelte'

	export let expanded = false
	export let title
	export let treeData
	export let visible = true
	export let disabled = false

	export let treeConfig = {
		icons: {
			expanded: 'bi bi-folder2-open',
			folder: 'bi bi-folder2',
			document: 'bi bi-file-earmark',
			disabled: 'bi bi-folder-x',
		},
	}

	let iconClass = treeConfig.icons.folder

	onMount(function () {
		if (disabled == false) {
			if (expanded) {
				iconClass = treeConfig.icons.expanded
			} else {
				iconClass = treeConfig.icons.folder
			}
		} else {
			iconClass = treeConfig.icons.disabled
		}
	})

	function toggle() {
		if (disabled === false) {
			expanded = !expanded
			if (expanded) {
				iconClass = treeConfig.icons.expanded
			} else {
				iconClass = treeConfig.icons.folder
			}
		}
	}

	//Functions for interacting with the nodes
	const dispatch = createEventDispatcher()
	export let treeNodeDoubleClick = function () {
		dispatch('treeNodeDoubleClick', {
			title: title,
		})
	}
</script>

{#if visible}
	<span on:click={toggle} on:dblclick={treeNodeDoubleClick}>
		<i class={iconClass} />
		<span class="p-2">{title}</span>
	</span>
{/if}

{#if expanded}
	<ul>
		{#each treeData as treeNode}
			<li class:px-4={visible}>
				{#if treeNode.children}
					<!-- show folder -->
					{#if treeNode.children}
						<svelte:self
							title={treeNode.title}
							treeData={treeNode.children}
							expanded={treeNode.expanded}
							{treeConfig}
							disabled={treeNode.disabled}
							on:treeNodeDoubleClick={treeNodeDoubleClick} />
					{:else}
						<TreeLeaf
							title={treeNode.title}
							visible={treeNode.visible}
							iconClass={treeConfig.icons.document}
							on:treeLeafDoubleClick={treeNodeDoubleClick} />
					{/if}
				{:else}
					<TreeLeaf
						title={treeNode.title}
						visible={treeNode.visible}
						iconClass={treeConfig.icons.document}
						on:treeLeafDoubleClick={treeNodeDoubleClick} />
				{/if}
			</li>
		{/each}
	</ul>
{/if}

<style>
	span {
		cursor: pointer;
	}

	.expanded {
		background-image: url(/./folder-open.svg);
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		border-left: 1px solid rgb(184, 182, 182);
	}
</style>
