<script lang="ts">
	import type { TAction } from '$v3/stores/ddm-actions'

	const DEFAULT_ZINDEX = 1000
	let targetRef: HTMLDivElement

	import { createEventDispatcher, getContext, onMount } from 'svelte'
	import TopBarWrapper from '../BlueprintJS/TopBarWrapper.svelte'
	import type { TWDetail } from '../Sub/Flow'
	import Overlay from './Overlay.svelte'
	import type { TOffset } from './types'
	import Wrapper from './Wrapper.svelte'
	const dispatch = createEventDispatcher()

	const onOpen = () => {
		dispatch('open')
	}

	let detail: TWDetail = getContext('detail')

	export let action: TAction = 'click'
	export let initial = false
	export let offset: TOffset
	export let type = ''
	export let inject: Function = () => {}
	export let zIndex = DEFAULT_ZINDEX
	export let arrow = true
	export let placement = 'auto'
	export let arrowColor = ''

	export let overlay = true
	export let overlayColor = 'rgba(0,0,0,0.5)'

	export let preventDefault = false
	export let stopPropagation = false

	export let open = false
	export let persist = false
	export let body = false
	$: hidden = !open && persist

	const setOpen = () => {
		open = !open
		$detail.opened = open
		if (!open) {
			dispatch('close')
		}
	}
	const eventClick = (e: Event) => {
		if (preventDefault) e.preventDefault()
		if (stopPropagation) e.stopPropagation()
		setOpen()
	}
	const eventMouseOut = ({ relatedTarget }: MouseEvent) => {
		// @ts-ignore
		if (relatedTarget?.id === 'overlay' && !open) {
			setOpen()
		}
	}

	$: onTouchEnd = action === 'click' ? eventClick : null
	$: onClick = action === 'click' ? eventClick : null

	$: setOpenTrue = () => (open = true)

	$: onMouseOver = action === 'hover' ? setOpenTrue : null
	$: onMouseOut = action === 'hover' ? eventMouseOut : null

	$: props = {
		overlay,
		offset,
		type,
		persist,
		open,
		body,
		// 'on:open': onOpen,
		// 'on:setOpen': setOpen,
		placement,
		targetRef,
		zIndex,
		arrow,
		action,
		overlayColor,
		arrowColor,
		preventDefault,
		stopPropagation,
		hidden,
	}
	onMount(() => (initial ? setOpenTrue() : ''))
</script>

<div class="s-popover">
	<TopBarWrapper {inject}>
		<!-- svelte-ignore a11y-mouse-events-have-key-events -->
		<div
			bind:this={targetRef}
			class="target"
			style={open ? `z-index: ${zIndex + 10}` : ''}
			on:click={onClick}
			on:touchend={onTouchEnd}
			on:mouseover={onMouseOver}
			on:mouseout={onMouseOut}>
			<slot name="target" {open} />
		</div>
	</TopBarWrapper>
	{#if !persist}
		{#if open}
			<Wrapper {props} {body} {hidden} {onOpen} {setOpen}>
				<slot name="content" {open} />
			</Wrapper>
		{/if}
	{:else if targetRef}
		<Wrapper {props} {body} {hidden} {onOpen} {setOpen}>
			<slot name="content" {open} />
		</Wrapper>
	{/if}
</div>
<slot {setOpen} />

<style>
	.target {
		display: inline-block;
		position: relative;
	}
	.s-popover {
		position: relative;
	}
</style>
