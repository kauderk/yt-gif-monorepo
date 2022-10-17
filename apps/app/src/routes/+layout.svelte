<script>
	import { useHistory } from '$stores/route'
	import { onMount } from 'svelte'
	import '../app.postcss'

	onMount(useHistory)
</script>

<!-- a +layout's slot is everthing where the layout cascades, siblings or nested +pages -->
<slot />
