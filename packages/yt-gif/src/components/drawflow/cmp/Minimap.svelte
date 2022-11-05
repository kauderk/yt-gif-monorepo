<!-- 
	Meke this component look nicer, using cascade style sheets
	https://www.w3schools.com/css/
 -->
<script>
	import { getContext } from './store'
	const ctx = getContext()
</script>

<div>
	<div id="minimap" bind:this={$ctx.minimap} />
</div>

<style lang="scss">
	//
</style>
