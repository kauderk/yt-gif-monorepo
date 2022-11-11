<script context="module" lang="ts">
	let onTop: HTMLElement //keeping track of which open modal is on top
	type cb = (callback: (m: TMod) => void) => void
	export type TMod = { open: cb; openDefault: Function; close: Function }
	const modals: { [key: string]: TMod } = {} //all modals get registered here for easy future access

	// 	returns an object for the modal specified by `id`, which contains the API functions (`open` and `close` )
	export function getModal(id = '') {
		return modals[id]
	}
</script>

<script lang="ts">
	import { onDestroy } from 'svelte'
	import { fade } from 'svelte/transition'

	let topDiv: HTMLElement
	let visible = false
	let prevOnTop: HTMLElement
	let closeCallback: Function

	export let id = ''

	function keyPress(ev: KeyboardEvent) {
		//only respond if the current modal is the top one
		if (ev.key == 'Escape' && onTop == topDiv) close() //ESC
	}

	/**  API **/
	function open(callback: Function) {
		closeCallback = callback
		if (visible) return
		prevOnTop = onTop
		onTop = topDiv
		window.addEventListener('keydown', keyPress)

		//this prevents scrolling of the main window on larger screens
		document.body.style.overflow = 'hidden'

		visible = true
		//Move the modal in the DOM to be the last child of <BODY> so that it can be on top of everything
		document.body.appendChild(topDiv)
	}

	function close(retVal?: any) {
		if (!visible) return
		window.removeEventListener('keydown', keyPress)
		onTop = prevOnTop
		if (onTop == null) document.body.style.overflow = ''
		visible = false
		if (closeCallback) closeCallback(retVal)
	}

	//expose the API
	modals[id] = { open, close, openDefault: () => open(() => {}) }

	onDestroy(() => {
		delete modals[id]
		window.removeEventListener('keydown', keyPress)
	})
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="topModal" class:visible bind:this={topDiv} on:click={() => close()}>
	<div id="modal" on:click|stopPropagation={() => {}}>
		<svg id="close" on:click={() => close()} viewBox="0 0 12 12">
			<circle cx="6" cy="6" r="6" />
			<line x1="3" y1="3" x2="9" y2="9" />
			<line x1="9" y1="3" x2="3" y2="9" />
		</svg>
		<div id="modal-content">
			<slot />
		</div>
	</div>
</div>

<style>
	#topModal {
		visibility: hidden;
		z-index: 9999;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		backdrop-filter: blur(4px);

		background: rgba(6, 6, 6, 0.66);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	#modal {
		position: relative;
		border-radius: 6px;
		background: white;
		border: 2px solid #000;
		filter: drop-shadow(5px 5px 5px #555);
		padding: 1em;
	}

	.visible {
		visibility: visible !important;
	}

	#close {
		position: absolute;
		top: -12px;
		right: -12px;
		width: 24px;
		height: 24px;
		cursor: pointer;
		fill: #f44;
		transition: transform 0.3s;
	}

	#close:hover {
		transform: scale(2);
	}

	#close line {
		stroke: #fff;
		stroke-width: 2;
	}
	#modal-content {
		max-width: calc(100vw - 20px);
		max-height: calc(100vh - 20px);
		overflow: auto;
	}
</style>
