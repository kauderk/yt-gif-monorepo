<script>
	import { getContext } from './store'
	import { lockToggle } from '../lib/utils'

	const ctx = getContext()
	$: _lockToggle = lockToggle($ctx.editor)
</script>

<!-- NODES WILL BE INJECTED HERE -->
<!-- ... -->
<!-- Footer alike -->
<div class="btn-export">Export</div>
<div class="btn-clear" on:click={$ctx.editor.clearModuleSelected}>Clear</div>
<div class="btn-lock" on:click={_lockToggle}>
	<i class={'fas fa-lock'} />
</div>
<div class="bar-zoom">
	<i class="fas fa-search-minus" on:click={$ctx.editor.zoom_out} />
	<i class="fas fa-search" on:click={$ctx.editor.zoom_reset} />
	<i class="fas fa-search-plus" on:click={$ctx.editor.zoom_in} />
</div>
