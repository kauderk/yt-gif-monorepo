<script lang="ts">
	import '../../../styles/drop-down-menu.scss'
	import Popover from '$v3/components/svelte-popover/index.svelte'
	import { onMount, setContext } from 'svelte'
	import { writable } from 'svelte/store'
	import { Detail, Flow } from './Flow'
	import { ddmAction } from '$v3/stores/ddm-actions'

	export let type = 'sub-ddm'
	export let action: 'click' | 'hover' = 'click'
	export let persist = true

	const tryHideIfBlured = (b: b) => console.log('tryHideIfBlured')
	const open = (b: b) => console.log('open')

	let content: HTMLElement
	export let overlay = true
	export let forceOpen = false
	export let inject: Function = () => {}
	export let initial = false
	export let state = <ReturnType<typeof Flow>>{}

	const detail = writable({ ...Detail, forceOpen })

	ddmAction.subscribe(a => (action = a))

	onMount(async () => {
		state = Flow(content, detail)
		state.openClose(forceOpen)
	})
	const offset = <const>{
		bottom: {
			center: {
				x: 3,
			},
		},
	}
	setContext('detail', detail)
</script>

<Popover
	on:close
	{overlay}
	{inject}
	{initial}
	{action}
	placement="bottom-center"
	{persist}
	{type}
	body={true}
	{offset}
	arrow={true}>
	<svelte:fragment slot="target">
		<slot name="top" />
	</svelte:fragment>
	<svelte:fragment slot="content">
		<slot
			clazz={'bp3-elevation-3 bp3-menu ' + type}
			focus={false}
			{tryHideIfBlured}
			{open}
			{detail} />
	</svelte:fragment>
</Popover>
