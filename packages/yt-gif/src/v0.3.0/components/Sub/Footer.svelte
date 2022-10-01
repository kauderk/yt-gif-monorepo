<script lang="ts">
	import Tutorials from '../Tutorials.svelte'
	import Separator from '../Separator.svelte'

	import type { TOptions } from '$v3/components/Select/Options'

	export let tutOptions: TOptions
</script>

<slot />
<Separator />
<span class="my-1" />
<Tutorials options={tutOptions} />
