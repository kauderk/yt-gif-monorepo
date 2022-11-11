<!-- 
	styles like https://ayushk7.github.io/CodeWire/
 -->
<script lang="ts">
	import Toolbar from './toolbar/Toolbar.svelte'
	import LeftSidebar from './sidebars/Left.svelte'
	import RightSidebar from './sidebars/Right.svelte'
	import Layouts from './layouts/index.svelte'
	import { toggleActiveView, state } from '../basic/store'

	import { onMount } from 'svelte'

	onMount(() => state.useLocalStorage())
</script>

<svelte:window
	on:keydown={e => e.key == 'º' && toggleActiveView($state.previous)()} />

<Toolbar />
<LeftSidebar />
<RightSidebar />
<Layouts />
