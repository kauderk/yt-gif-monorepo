<script lang="ts">
	import Icon from './Icon.svelte'
	import Select from './Select/Select.svelte'
	import type { TOptions } from '$v3/components/Select/Options'

	import { slide } from 'svelte/transition'
	import { linear } from 'svelte/easing'

	import { onMount } from 'svelte'
	import { createEventDispatcher } from 'svelte'
	import Tutorial from './ytgif/Tutorial.svelte'
	const dispatch = createEventDispatcher()

	const icons = <const>{
		on: 'menu-button-wide-fill',
		off: 'menu-button',
		tooltip: 'Video Tutorials'
	}
	export let options: TOptions
	export let id = 'experience_tut'

	let focus = false
	let wrapper: HTMLSpanElement
	const setFocus = (b: b) => {
		focus = b
		wrapper[b ? 'focus' : 'blur']()
		//console.log(wrapper.matches(':focus'))
		dispatch('tutfocus', b)
	}

	//#region open - close
	let value = Object.keys(options)[0]
	let i: Icon
	const visible = () => value != 'hide'
	$: i?.setOpenClose(visible())

	let iddle = true
	const tryOpen = (open: b) => {
		if (visible() && !open) {
			return // they requested the tutorial, exit
		}
		iddle = !open
		i?.setOpenClose(open)
	}
	//#endregion

	onMount(() => tryOpen(visible()))
</script>

<div class="outter">
	<div
		class="mid top-label"
		on:mouseenter={() => tryOpen(true)}
		on:mouseleave={() => tryOpen(false)}
	>
		<span class="btn-icon-main">
			<Icon {...icons} type="disabled" bind:this={i} />
		</span>
		<span class:iddle>
			<Select {id} {options} bind:value />
		</span>
	</div>
	{#if value != 'hide'}
		<!-- FIXME: breakes the ddm
			transition:slide={{ easing: linear, duration: 0 }}	 -->
		<div
			class="wrapper my-3"
			bind:this={wrapper}
			tabindex="-1"
			on:mouseenter={() => setFocus(true)}
			on:blur={() => setFocus(false)}
			class:ddmFocus={focus}
		>
			<Tutorial />
		</div>
	{/if}
</div>

<style lang="scss">
	.outter {
		// self - center
		display: flex;
		flex-direction: column;
		align-self: center;

		min-width: 240px;

		z-index: 4;
	}
	.top-label {
		@extend .mid;

		align-self: flex-start;
		text-align: center;

		max-width: max-content;
		height: 3ch;

		padding: 0;
		margin: 0;

		left: 0px;
		top: -20px;
	}
	.wrapper {
		@extend .mid;

		align-self: center;
		justify-self: center;

		height: 144px;
		width: auto;

		aspect-ratio: 16 / 9;

		background: var(--ddm-600);

		border-radius: 10px;
		border: transparent 1px solid;

		outline: 0; // ok...
	}
	.mid {
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
	}
</style>
