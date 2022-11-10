<!-- 
	styles like https://ayushk7.github.io/CodeWire/
 -->
<script lang="ts">
	import { createWritableStore } from '$lib/local-storage-store'
	import { onMount } from 'svelte'

	import Controls from './sidebar/Controls.svelte'
	import Sidebar from './sidebar/Sidebar.svelte'
	import type { TView } from './types'

	const localStore = createWritableStore<TView>('view', 'left-sidebar')

	onMount(() => localStore.useLocalStorage())
</script>

<Controls bind:state={$localStore} />
<Sidebar />
