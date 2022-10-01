<script lang="ts">
	import type { ComponentProps } from 'svelte'
	import Icon from './index.svelte'

	let enabled = false
	export let props: Partial<ComponentProps<Icon>>
</script>

<Icon {...props} bind:enabled down={() => enabled} up={() => !enabled} />
