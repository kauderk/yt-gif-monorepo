<script lang="ts">
	import Toolbar from './toolbar/Toolbar.svelte'
	import LeftSidebar from './sidebars/Left.svelte'
	import Explorer from './sidebars/Explorer.svelte'
	import RightSidebar from './sidebars/Right.svelte'
	import Layouts from './layouts/index.svelte'
	import { toggleActiveView, state } from '../basic/store'

	import { onMount } from 'svelte'
	import DrawflowNode from './layouts/DrawflowNode.svelte'

	onMount(() => state.useLocalStorage())
</script>

<svelte:window
	on:keydown={e => e.key == 'º' && toggleActiveView($state.previous)()} />

<Toolbar />
<Explorer />
<LeftSidebar />
<RightSidebar />
<Layouts />
<DrawflowNode />
