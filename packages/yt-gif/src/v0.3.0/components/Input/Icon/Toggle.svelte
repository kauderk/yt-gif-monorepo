<script lang="ts">
	import type { ComponentProps } from 'svelte'
	import Icon from './index.svelte'

	export let props: Partial<ComponentProps<Icon>>
</script>

<Icon {...props} down={() => true} up={() => false} />
