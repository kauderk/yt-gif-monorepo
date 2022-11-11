<!-- 
	styles like https://ayushk7.github.io/CodeWire/
 -->
<script lang="ts">
	import Toolbar from './Toolbar.svelte'
	import Sidebar from './Sidebar.svelte'
	import { openCloseSidebar } from '../basic/store'

	import { onMount } from 'svelte'
	import { viewStore } from './store'

	onMount(() => viewStore.useLocalStorage())
</script>

<svelte:window on:keydown={e => e.key == 'º' && openCloseSidebar()} />

<Toolbar />
<Sidebar />
