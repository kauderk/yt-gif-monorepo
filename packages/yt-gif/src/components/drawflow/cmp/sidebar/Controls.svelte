<script lang="ts">
	import Toolbar from './Toolbar.svelte'
	import Sidebar from './Sidebar.svelte'

	import { openCloseSidebar } from '../basic/store'
</script>

<svelte:window on:keydown={e => e.key == 'º' && openCloseSidebar()} />

<Toolbar />
<Sidebar />
