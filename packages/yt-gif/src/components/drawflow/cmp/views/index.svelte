<!-- 
	styles like https://ayushk7.github.io/CodeWire/
 -->
<script lang="ts">
	import Toolbar from './Toolbar.svelte'
	import Sidebar from './Sidebar.svelte'
	import RightSidebar from './RightSidebar.svelte'
	import { toggleActiveView, state } from '../basic/store'

	import { onMount } from 'svelte'

	onMount(() => state.useLocalStorage())
</script>

<svelte:window
	on:keydown={e => e.key == 'º' && toggleActiveView($state.previous)()} />

<Toolbar />
<Sidebar />
<RightSidebar />
