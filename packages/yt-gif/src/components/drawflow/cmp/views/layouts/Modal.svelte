<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { cubicOut } from 'svelte/easing'
	import { scale, fade } from 'svelte/transition'

	const dispatch = createEventDispatcher()

	export let isOpen = false
	export const open = () => (isOpen = true)
	export const close = () => {
		isOpen = false
		dispatch('close', {})
	}

	function inject(node: HTMLElement, argument = 'body') {
		var targetNode: any

		if (typeof argument !== 'string') {
			targetNode = argument
		} else {
			targetNode = document.querySelector(argument)
		}
		targetNode.insertAdjacentElement('beforeend', node)

		return {
			destroy() {
				node.remove()
			},
		}
	}
</script>

{#if isOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="modal"
		use:inject
		transition:fade={{ duration: 90, easing: cubicOut }}
		on:click={close}>
		<div
			class="view"
			transition:scale={{ duration: 100, easing: cubicOut }}
			on:click|stopPropagation>
			<button aria-label="Close modal" on:click={close}>
				<i class="fa-solid fa-x" />
			</button>
			<div class="content">
				<slot />
			</div>
		</div>
	</div>
{/if}

<style>
	.modal {
		position: fixed;
		z-index: 1000;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100vw;
		height: 100vh;

		backdrop-filter: blur(4px);
		background: rgba(0, 0, 0, 0.66);

		background-image: initial;
		background-color: rgba(6, 6, 6, 0.66);
	}
	.view {
		position: relative;
		width: 40rem;
		max-width: 100%;
		max-height: 100%;
		margin: 2rem auto;
		color: black;
		border-radius: 0.5rem;
		background: white;

		color: rgb(227, 225, 222);
		background-image: initial;
		background-color: rgb(29, 31, 32);
	}
	.content {
		position: relative;
		padding: 1rem;
		max-height: calc(100vh - 4rem);
		overflow: auto;
	}
	button {
		display: block;
		box-sizing: border-box;
		position: absolute;
		z-index: 1000;
		top: 1rem;
		right: 1rem;
		margin: 0;
		padding: 0;
		width: 1.5rem;
		height: 1.5rem;
		border: 0;
		color: black;
		border-radius: 1.5rem;
		background: white;
		box-shadow: 0 0 0 1px black;
		transition: transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1),
			background 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
		-webkit-appearance: none;
	}
</style>
