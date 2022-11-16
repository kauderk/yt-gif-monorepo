<script lang="ts">
	import Item from './Item.svelte'
	import { createEventDispatcher } from 'svelte'

	export let node
	export let lastChild

	const dispatch = createEventDispatcher()

	const addSibling = e => {
		dispatch('addItem', {
			id: Math.random(), // quickly creating a random ID
			name: '',
			parent: node.parent.data.id,
		})
	}

	const addItem = e => {
		dispatch('addItem', {
			id: Math.random(), // quickly creating a random ID
			name: '',
			parent: node.data.id,
		})
	}

	// since Items can contain Items as children, it needs to be passed all the way to the 'root' in order for the event to be actually processed
	const bubbleUpAdd = e => {
		dispatch('addItem', e.detail)
	}

	const deleteItem = e => {
		dispatch('deleteItem', { id: node.data.id })
	}

	// since Items can contain Items as children, it needs to be passed all the way to the 'root' in order for the event to be actually processed
	const bubbleUpDelete = e => {
		dispatch('deleteItem', e.detail)
	}
</script>

<div style="margin-left: {node.depth * 40}px;">
	<input
		type="text" /><!-- demo purpose only, nothing is done with the text input at the moment -->
	{#if !node.children}
		<button on:click={addItem}>add child</button>
		{#if !node.children && node.depth > 0}<button on:click={deleteItem}
				>delete</button
			>{/if}
	{/if}
</div>
{#if node.children}
	{#each node.children as child, i}
		<Item
			node={child}
			lastChild={i === node.children.length - 1}
			on:addItem={bubbleUpAdd}
			on:deleteItem={bubbleUpDelete} />
	{/each}
{/if}
{#if lastChild && node.depth > 0}
	<div style="margin-left: {node.depth * 40}px;">
		<button on:click={addSibling}>add sibling</button>
	</div>
{/if}
