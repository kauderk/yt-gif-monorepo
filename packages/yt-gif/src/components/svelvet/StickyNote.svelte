<script context="module">
	let zIndex = 1
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let index: n
	let left = 20
	let top = 20
	let inMotion = false
	let _zIndex = 1

	function handleMouseDown() {
		inMotion = true
		zIndex += 1
		_zIndex = zIndex
	}

	function handleMouseMove(e: any) {
		if (inMotion) {
			left += e.movementX
			top += e.movementY
		}
	}

	function handleMouseUp() {
		inMotion = false
	}

	function deleteNote() {
		dispatch('remove', { index })
	}
</script>

<div
	on:mousedown={handleMouseDown}
	style="left: {left + index * 5}px; top: {top +
		index * 5}px; z-index: {_zIndex}"
	class="note">
	<button class="close" on:click|stopPropagation={deleteNote}>&times;</button>
	<slot name="text" />
</div>

<svelte:window on:mouseup={handleMouseUp} on:mousemove={handleMouseMove} />

<style>
	.note {
		user-select: none;
		cursor: move;
		border: solid 1px var(--ddm-400);
		position: absolute;
		padding: 0.5em;
		border-radius: 1em;
		background-color: var(--ddm-500);
		min-width: 125px;
		min-height: 125px;
		color: var(--ddm-100);
	}

	.close {
		font-weight: 600;
		cursor: pointer;
		position: absolute;
		top: 3%;
		right: 3%;
		padding: 3px;
		color: var(--ddm-100);
		background-color: var(--ddm-300);
		border: none;
	}
	button {
		z-index: 1;
	}
</style>
