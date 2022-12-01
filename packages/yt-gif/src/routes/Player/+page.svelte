<script lang="ts">
	// import { init } from '$v3/index'
	// import { onMount } from 'svelte'
	import { AvoidCircularDependency } from '$lib/global/AssignSrrGlobal'
	import Player from '$v3/components/ytgif/components/Player.svelte'

	// onMount(async () => {
	// 	debugger
	// })
	AvoidCircularDependency()
</script>

<div>
	<Player />
</div>

<style>
	div {
		width: 500px;
		aspect-ratio: 16 / 9;
	}
</style>
